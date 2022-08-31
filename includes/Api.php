<?php
/**
 * Api class.
 *
 * @package Search_Console
 */

namespace Search_Console;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class to perform oAuth request.
 */
class Api {

	/**
	 * Default client id.
	 *
	 * @var $client_id string.
	 */
	private $client_id = '447159129054-penpradideh7rc13boh1upfqafv3n6pp.apps.googleusercontent.com';

	/**
	 * Default client secret.
	 *
	 * @var $client_secret string.
	 */
	private $client_secret = 'ZpCiemNSNmpgO8IgWDKhhV32';

	/**
	 * Default redirect uri.
	 *
	 * @var $redirect_uri string.
	 */
	private $redirect_uri = 'urn:ietf:wg:oauth:2.0:oob';

	/**
	 * Empty constructor.
	 *
	 * @var $option_key string.
	 */
	private $option_key = 'search_console';

	/**
	 * Default client id.
	 *
	 * @var $token_key  string.
	 */
	private $token_key = 'search_console_token';

	/**
	 * Empty constructor.
	 */
	public function __construct() {
		$options = get_option( $this->option_key );
		$this->client_id = $options['client_id'];
		$this->client_secret = $options['client_secret'];
		$this->redirect_uri = $options['redirect_uri'];
	}

	/**
	 * Make request to api.
	 *
	 * @param string $url The url posting to.
	 * @param array  $bodyArgs Array of body arguments.
	 * @param string $type Type of request.
	 * @param array  $headers Array of headers to pass.
	 */
	public function make_request( $url, $bodyArgs, $type = 'GET', $headers = false ) {
		if ( ! $headers ) {
			$headers = array(
				'Content-Type' => 'application/http',
				'Content-Transfer-Encoding' => 'binary',
				'MIME-Version' => '1.0',
			);
		}

		$args = array(
			'headers' => $headers,
		);
		if ( $bodyArgs ) {
			$args['body'] = wp_json_encode( $bodyArgs );
		}

		$args['method'] = $type;
		$request = wp_remote_request( $url, $args );

		if ( is_wp_error( $request ) ) {
			$message = $request->get_error_message();
			return new \WP_Error( 423, $message );
		}

		$body = json_decode( wp_remote_retrieve_body( $request ), true );

		if ( ! empty( $body['error'] ) ) {
			$error = 'Unknown Error';
			if ( isset( $body['error_description'] ) ) {
				$error = $body['error_description'];
			} elseif ( ! empty( $body['error']['message'] ) ) {
				$error = $body['error']['message'];
			}
			return new \WP_Error( 423, $error );
		}

		return $body;
	}

	/**
	 * Empty constructor.
	 *
	 * @param string $code Code to send.
	 */
	public function generate_access_key( $code ) {
		$body = array(
			'code'          => $code,
			'grant_type'    => 'authorization_code',
			'redirect_uri'  => $this->redirect_uri,
			'client_id'     => $this->client_id,
			'client_secret' => $this->client_secret,
		);
		return $this->make_request( 'https://accounts.google.com/o/oauth2/token', $body, 'POST' );
	}

	/**
	 * Retrieve an access token.
	 */
	public function get_access_token() {
		$token = get_option( $this->option_key );

		if ( ! $token ) {
			return false;
		}

		if ( ( $token['created_at'] + $token['expires_in'] - 30 ) < time() ) {
			// It's expired so we have to re-issue again.
			$refreshToken = $this->refreshToken( $token );

			if ( ! is_wp_error( $refreshToken ) ) {
				$token['access_token'] = $refreshToken['access_token'];
				$token['expires_in'] = $refreshToken['expires_in'];
				$token['created_at'] = time();
				update_option( $this->option_key, $token, false );
			} else {
				return false;
			}
		}

		return $token['access_token'];
	}

	/**
	 * Exchange token
	 */
	public function exchange_token() {
		session_start();

		if ( ! empty( $_GET['error'] ) ) {

			// Got an error, probably user denied access.
			exit( 'Got error: ' . wp_kses_post( $_GET['error'] ) );
		} elseif ( empty( $_GET['code'] ) ) {

			// If we don't have an authorization code then get one.
			$authUrl = $this->get_authurl();
			wp_safe_redirect( $authUrl );
			exit;
		} else {
			// phpcs:ignore
			$token = $this->generate_access_key( sanitize_text_field( $_GET['code'] ) );

			if ( ! is_wp_error( $token ) ) {
				update_option( $this->token_key, $token );
			}

			?>
				<html>
				<head></head>
				<body>
					<script>
						window.addEventListener("message", function (event) {
							if (event.data.message === "requestResult") {
								event.source.postMessage({
									"message": "deliverResult", 
									result: <?php echo wp_json_encode( $token ); ?>
								}, "*");
							}
						});
					</script>
				</body>
				</html>			
			<?php

		}
	}

	/**
	 * Build auth url.
	 */
	public function get_authurl() {
		$params = array(
			'client_id' => $this->client_id,
			'redirect_uri' => $this->redirect_uri,
			'scope' => 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification',
			'response_type' => 'code',
			'access_type' => 'offline',
		);
		return 'https://accounts.google.com/o/oauth2/auth?' . http_build_query( $params );
	}

	/**
	 * Refresh access token.
	 *
	 * @param mixed $token the secret token.
	 */
	public function refresh_token( $token ) {
		$args = array(
			'client_id' => $this->client_id,
			'client_secret' => $this->client_secret,
			'refresh_token' => $token['refresh_token'],
			'grant_type' => 'refresh_token',
		);

		return $this->make_request( 'https://accounts.google.com/o/oauth2/token', $args, 'POST' );
	}
}
