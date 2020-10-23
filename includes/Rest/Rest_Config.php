<?php
namespace Tropicalista\SearchConsole\Rest;

/**
 * REST_CONFIG Handler
 */
class Rest_Config extends Base_Rest {

	private $config;

    public function __construct() {
    	$this->register_routes();   
    	$this->config = new \Tropicalista\SearchConsole\Data\Config();
    }

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$version = '1';
		$namespace = 'searchconsole' . '/api';

		register_rest_route( $namespace, 'config', array(
			array(
				'methods'         => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'permissions_check' ),
				'callback'        => array($this, 'get_config'),
			)
		) );
	}


	function get_config() {

		return new \WP_REST_Response( $this->config->get_config() );

	}

}