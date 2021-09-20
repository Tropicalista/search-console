<?php
/**
 * Api class.
 *
 * @package SearchConsole
 */

namespace Tropicalista\SearchConsole;

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
	private $option_key = 'search_console_token';

	/**
	 * Empty constructor.
	 */
	public function __construct() {}

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

	public function exchange_token() {

	    session_start();  

	    if (!empty($_GET['error'])) {

	        // Got an error, probably user denied access
	        exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));

	    } elseif (empty($_GET['code'])) {

	        // If we don't have an authorization code then get one
	        $authUrl = $this->get_authurl();
	        //$_SESSION['oauth2state'] = $this->provider->getState();
	        wp_redirect($authUrl);
	        exit;

	    } elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

	        // State is invalid, possible CSRF attack in progress
	        unset($_SESSION['oauth2state']);
	        exit('Invalid state');

	    } else {

	        // Try to get an access token (using the authorization code grant)
	        $token = $this->provider->get_access_token('authorization_code', [
	            'code' => $_GET['code']
	        ]);

	        // Optional: Now you have a token you can look up a users profile data
	        try {

	            $refreshToken = $token->jsonSerialize();
	            // safely store
	            $this->encryption->set( 'searchconsole_token' , $refreshToken );

	            wp_redirect(admin_url() . 'admin.php?page=searchconsole#/settings');

	            exit;

	        } catch (Exception $e) {

	            // Failed to get user details
	            exit('Something went wrong: ' . $e->getMessage());

	        }

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
