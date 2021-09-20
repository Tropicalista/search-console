<?php
namespace Tropicalista\SearchConsole\Rest;

/**
 * REST_SETTINGS Handler
 */
class Settings {

	private $option_key = 'search_console';
	private $token_key = 'search_console_token';
	private $api;

	public function __construct() {
		$this->api = new \Tropicalista\SearchConsole\Api();
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
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

		$namespace = 'searchconsole';

		register_rest_route(
			$namespace,
			'settings',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'save_settings' ),
			)
		);
		register_rest_route(
			$namespace,
			'settings',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'get_settings' ),
			)
		);
		register_rest_route(
			$namespace,
			'revoke',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'revoke_token' ),
			),
		);
		register_rest_route(
			$namespace,
			'credentials',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'get_credentials' ),
			)
		);
	}


	public function get_settings() {

		$settings = $this->parse_defaults(
			get_option( $this->option_key )
		);

		$settings['token'] = $this->get_token();

		return new \WP_REST_Response( $settings );

	}

	public function get_credentials( \WP_REST_Request $request ) {

		$code = $request->get_param( 'code' );
		$token = $this->api->generate_access_key( $code );

		if ( ! is_wp_error( $token ) ) {
			update_option( $this->token_key, $token );
		}


		return $token;

	}

	public function save_settings( \WP_REST_Request $request ){

		$req = $request->get_params();

		update_option( $this->option_key, $req['settings'] );

		return new \WP_REST_Response( $req );
	}

	public function revoke_token( \WP_REST_Request $request ){

		$req = $request->get_params();

		delete_option( $this->token_key );

		return new \WP_REST_Response( $req );
	}

	public function parse_defaults( $data ) {

		$defaults = [
			'wp_url' => get_site_url(),
			'site' => '',
			'siteVerification' => '',
			'meta' => '',
			'authUrl' => $this->api->get_authurl(),
			'custom_credentials' => false,
		];
		return wp_parse_args( $data, $defaults );

	}

	public function get_token() {

		$token = get_option( $this->token_key );

		if ( empty( $token ) ) {
			return '';
		}

		if ( ( $token['created_at'] + $token['expires_in'] - 30 ) < time() ) {
			// It's expired so we have to re-issue again
			$refreshToken = $this->api->refresh_token( $token );

			if ( !is_wp_error( $refreshToken ) ) {
				$token['access_token'] = $refreshToken['access_token'];
				$token['expires_in'] = $refreshToken['expires_in'];
				$token['created_at'] = time();
				update_option( $this->token_key, $token );
			}
		}
		return $token['access_token'];

	}

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}

}
\Tropicalista\SearchConsole\Rest\Settings::get_instance();