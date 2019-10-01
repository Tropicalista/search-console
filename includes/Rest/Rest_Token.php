<?php
namespace Tropicalista\SearchConsole\Rest;

/**
 * REST_TOKEN Handler
 */
class Rest_Token extends Base_Rest {

	const OPTION = 'searchconsole_token';

	private $oauth;

    public function __construct() {
    	$this->register_routes();
    	$this->credentials = new \Tropicalista\SearchConsole\Data\Credentials();
    	$this->oauth = new \Tropicalista\SearchConsole\Data\Oauth();
		$this->encryption = new \Tropicalista\SearchConsole\Data\Encrypted_Options();  
    }

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$version = '1';
		$namespace = 'searchconsole' . '/api';

		register_rest_route( $namespace, 'token', array(
			array(
				'methods'         => \WP_REST_Server::CREATABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'request_token')
			),
			array(
				'methods'         => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'get_token')
			),
			array(
				'methods'         => \WP_REST_Server::EDITABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'update_token')
			),
			array(
				'methods'         => \WP_REST_Server::DELETABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'delete_token')
			),
		) );
	}

	function request_token($request){

		$req = $request->get_param('code');

		$provider = new \League\OAuth2\Client\Provider\Google($this->credentials->get());

		$token = $provider->getAccessToken('authorization_code', [
		    'code' => $req
		]);

		// persist the token in a database
		$refreshToken = $token->jsonSerialize();
		$this->store_token($refreshToken);

		return new \WP_REST_Response( $refreshToken );
	}

	function get_token(){

		$token = get_option( self::OPTION );
		if ( ! $token ) {
			return false;
		}
		$token = $this->encryption->decrypt( $token );

		$token = $this->oauth->validate_token($token);

		return new \WP_REST_Response( $token );
	}

	function store_token($token){

		$this->encryption->set( self::OPTION , $token );

		return new \WP_REST_Response( 200 );
	}

	function delete_token($token){

		update_option( self::OPTION, NULL );

		return new \WP_REST_Response( 200 );
	}

}