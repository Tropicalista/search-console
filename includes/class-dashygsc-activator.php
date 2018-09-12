<?php

/**
 * Fired during plugin activation
 *
 * @link       https://tropicalseo.net
 * @since      1.0.0
 *
 * @package    DashyLite
 * @subpackage DashyLite/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    DashyLite
 * @subpackage DashyLite/includes
 * @author     Tropicalista <tropicalseotool@gmail.com>
 */
class DashyGsc_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

	    $options = [
	        'site' => '',
	        'token' => null
	    ];
	    update_option( 'dashygsc_general', $options );
	    
	    $options = [
	        'meta' => '',
	        'custom_oauth' => false,
	        'oauth' => null
	    ];
	    update_option( 'dashygsc_advanced', $options );

	}

}
