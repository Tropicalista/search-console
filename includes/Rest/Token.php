<?php
/**
 * Rest class
 *
 * @package Search_Console
 */

namespace Search_Console\Rest;

/**
 * REST_SETTINGS Handler
 */
class Token {

	/**
	 * Namespace.
	 *
	 * @var $namespace string.
	 */
	private $namespace = 'searchconsole/v1';

	/**
	 * Default client id.
	 *
	 * @var $token_key  string.
	 */
	private $token_key = 'search_console';

	/**
	 * Default client id.
	 *
	 * @var $api string.
	 */
	private $api;

	/**
	 * COnstructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'init', array( $this, 'oauth_callback' ) );
	}

	/**
	 * Class instance.
	 *
	 * @access private
	 * @var $instance Class instance.
	 */
	private static $instance;

	/**
	 * Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'revoke',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'revoke_token' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'refresh',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'refresh_token' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'credentials',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'get_credentials' ),
			)
		);
	}

	/**
	 * Get credentials.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return $token.
	 */
	public function get_credentials( \WP_REST_Request $request ) {

		$code = $request->get_param( 'code' );
		$token = $this->api->generate_access_key( $code );

		if ( ! is_wp_error( $token ) ) {
			$this->save_token( $token );
			return $token;
		}
		return $token;
	}

	/**
	 * Revoke token.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return $token.
	 */
	public function revoke_token( \WP_REST_Request $request ) {

		$req = $request->get_params();

		delete_option( $this->token_key );

		return new \WP_REST_Response( $req );
	}

	/**
	 * Get token.
	 *
	 * @return $token.
	 */
	public function refresh_token() {

		$options = get_option( $this->token_key );

		$token = $options['token'];

		// It's expired so we have to re-issue again.
		$refreshToken = $this->api->refresh_token( $token );

		if ( ! is_wp_error( $refreshToken ) ) {
			$newToken = array_merge( $token, $refreshToken );
			$this->save_token( $newToken );
		}

		return $newToken;

	}

	/**
	 * Store token in DB.
	 *
	 * @param array $token The token.
	 */
	private function save_token( $token ) {

		$options = get_option( $this->token_key );

		$options['token'] = $token;

		update_option( $this->token_key, $options );

	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function permissions_check( $request ) {
		return current_user_can( 'search_console' );
	}

	/**
	 * Render the oauthcallback
	 */
	public function oauth_callback() {
		$this->api = new \Search_Console\Api();
		if ( filter_input( INPUT_GET, 'sc-oauth2callback' ) ) {
			$this->api->exchange_token();
			wp_die();
		}
	}

}
\Search_Console\Rest\Token::get_instance();