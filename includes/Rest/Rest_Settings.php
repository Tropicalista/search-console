<?php
namespace Tropicalista\SearchConsole\Rest;

/**
 * REST_SETTINGS Handler
 */
class Rest_Settings extends Base_Rest {

	private $credentials;
	private $encryption;
	private $oauth;

    public function __construct() {
    	$this->register_routes();   
		$this->credentials = new \Tropicalista\SearchConsole\Data\Credentials();
		$this->encryption = new \Tropicalista\SearchConsole\Data\Encrypted_Options();  
        $this->oauth = new \Tropicalista\SearchConsole\Data\Oauth();
    }

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$version = '1';
		$namespace = 'searchconsole' . '/api';

		register_rest_route( $namespace, 'settings', array(
			array(
				'methods'         => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'save_settings'),
			)
		) );
		register_rest_route( $namespace, 'settings', array(
			array(
				'methods'         => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'get_settings'),
			)
		) );
		register_rest_route( $namespace, 'settings/credentials', array(
			array(
				'methods'         => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'get_credentials'),
			)
		) );
	}


	public function get_settings() {

		$settings = $this->parse_defaults(
			get_option('searchconsole_settings')
		);
		return new \WP_REST_Response( $settings );

	}

	public function get_credentials() {

		$settings = $this->encryption->get('searchconsole_credentials');
		return new \WP_REST_Response( $settings );

	}

	public function save_settings($request){

		$req = $request->get_params();

		if( !empty( $req['settings']['reset_token'] ) ){

			update_option( 'searchconsole_token', '' );
			$req['settings']['reset_token'] = false;

		}
		if( !empty( $req['settings']['credentials'] ) ){

			$this->credentials->set( $req['settings']['credentials'] );

		}
		if(isset($req['settings']['credentials'])){
			unset($req['settings']['credentials']);
		}
		if(empty($req['settings'])){
			unset($req['settings']);
		}
		update_option( 'searchconsole_settings', $req['settings'] );

		return new \WP_REST_Response( $this->parse_defaults($req['settings']) );
	}

	public function parse_defaults( $data ) {
		$defaults = [
			'webmasters' => [
				'site' => '',
				'siteVerification' => '',
				'meta' => ''
			],
            "authUrl" => $this->oauth->authUrl(),
			'custom_credentials' => false,
			'credentials' => $this->encryption->get('searchconsole_credentials') ? $this->encryption->get('searchconsole_credentials') : [
				'redirectUri' => home_url() . '/?oauth2callback=1'
			]
		];
		return wp_parse_args( $data, $defaults );

	}

}