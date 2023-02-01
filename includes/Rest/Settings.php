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
class Settings {

	/**
	 * Namespace.
	 *
	 * @var $namespace string.
	 */
	private $namespace = 'searchconsole/v1';

	/**
	 * Default client id.
	 *
	 * @var $option_key string.
	 */
	private $option_key = 'search_console';

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
			'settings',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'save_settings' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'settings',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'            => array( $this, 'get_settings' ),
			)
		);

	}

	/**
	 * Get settings.
	 *
	 * @return \WP_REST_Response.
	 */
	public function get_settings() {

		$settings = get_option( $this->option_key );

		if ( ! $settings['postTypes'] ) {
			$settings['postTypes'] = array();
		}

		return new \WP_REST_Response( $settings );

	}

	/**
	 * Save settings.
	 *
	 * @param \WP_REST_Request $request Full data about the request.
	 * @return $token.
	 */
	public function save_settings( \WP_REST_Request $request ) {

		$req = $request->get_params();

		$res = update_option( $this->option_key, $req['settings'] );

		return new \WP_REST_Response( $res );
	}

	/**
	 * Get defaults.
	 *
	 * @param array $data Full data about the request.
	 * @return defaults.
	 */
	public function parse_defaults( $data ) {

		$defaults = array(
			'wp_url' => get_site_url(),
			'title' => get_bloginfo( 'name' ),
			'site' => '',
			'siteVerification' => '',
			'meta' => '',
			'custom_credentials' => true,
			'client_id' => '',
			'client_secret' => '',
			'redirect_uri' => get_site_url() . '?sc-oauth2callback=1',
		);
		return wp_parse_args( $data, $defaults );

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
\Search_Console\Rest\Settings::get_instance();
