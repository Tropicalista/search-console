<?php
/**
 * Api class.
 *
 * @package Search_Console
 */

namespace Search_Console;

defined( 'ABSPATH' ) || exit;

/**
 * Class to perform oAuth request.
 */
class Api {

	/**
	 * Default client id.
	 *
	 * @var $client_id string.
	 */
	private $client_id = '';

	/**
	 * Default client secret.
	 *
	 * @var $client_secret string.
	 */
	private $client_secret = '';

	/**
	 * Default redirect uri.
	 *
	 * @var $redirect_uri string.
	 */
	private $redirect_uri = '';

	/**
	 * Empty constructor.
	 *
	 * @var $option_key string.
	 */
	private $option_key = 'search_console';

	/**
	 * Empty constructor.
	 */
	public function __construct() {
		$options = get_option( $this->option_key );
		if ( is_array( $options ) ) {
			$this->client_id = $options['credentials']['client_id'];
			$this->client_secret = $options['credentials']['client_secret'];
			$this->redirect_uri = get_site_url();
		}
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
				'Content-Type' => 'application/x-www-form-urlencoded',
			);
		}

		$args = array(
			'headers' => $headers,
		);
		if ( $bodyArgs ) {
			$args['body'] = $bodyArgs;
		}

		$args['method'] = $type;

		$response = wp_remote_request( $url, $args );

		if ( is_wp_error( $response ) ) {
			$message = $response->get_error_message();
			return new \WP_Error( 423, $message );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

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
			'redirect_uri'  => 'postmessage',
			'client_id'     => $this->client_id,
			'client_secret' => $this->client_secret,
		);
		return $this->make_request( 'https://oauth2.googleapis.com/token', $body, 'POST' );
	}

	/**
	 * Retrieve an access token.
	 */
	public function get_access_token() {
		$option = get_option( $this->option_key );

		if ( empty( $option['token'] ) ) {
			return false;
		}

		$token = $option['token'];

		if ( ( $token['created_at'] + $token['expires_in'] - 30 ) < time() ) {
			// It's expired so we have to re-issue again.
			$refreshToken = $this->refresh_token( $token );

			if ( ! is_wp_error( $refreshToken ) ) {
				$token['access_token'] = $refreshToken['access_token'];
				$token['expires_in'] = $refreshToken['expires_in'];
				$token['created_at'] = time();
				$updated_option = wp_parse_args( array( 'token' => $token ), $option );
				update_option( $this->option_key, $updated_option );
			} else {
				return false;
			}
		}

		return $token['access_token'];
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
			'refresh_token' => $token['refresh_token'] ?? '',
			'grant_type' => 'refresh_token',
		);

		return $this->make_request( 'https://accounts.google.com/o/oauth2/token', $args, 'POST' );
	}

	/**
	 * Refresh access token.
	 *
	 * @param mixed $token the secret token.
	 */
	public function revoke_token( $token ) {
		return $this->make_request( 'https://accounts.google.com/o/oauth2/revoke?token=' . $token, 'POST' );
	}

	/**
	 * Get token info.
	 *
	 * @param mixed $token the secret token.
	 */
	public function token_info( $token ) {
		return $this->make_request( 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' . $token, 'GET' );
	}
}
