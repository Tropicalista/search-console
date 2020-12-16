<?php
namespace Tropicalista\SearchConsole\Rest;

class Base_Rest {

	private $config;

    public function __construct() {
    }

	/**
	 * Check if a given request has access to get items
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public function permissions_check( $request ) {
        return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? true : current_user_can( 'manage_options' );
	}

}