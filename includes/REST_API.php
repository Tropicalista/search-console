<?php
namespace Tropicalista\SearchConsole;

/**
 * REST_API Handler
 */
class REST_API {

    public function __construct() {
    	$this->register_routes();
    }

	public function register_routes() {
		$config = new \Tropicalista\SearchConsole\Rest\Rest_Config(); 
		$settings = new \Tropicalista\SearchConsole\Rest\Rest_Settings(); 
		$token = new \Tropicalista\SearchConsole\Rest\Rest_Token(); 
	}

}