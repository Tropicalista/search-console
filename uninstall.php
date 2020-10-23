<?php
// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

function uninstall() {
	delete_option( 'dashy_installed' );
	delete_option( 'dashy_token' );
	delete_option( 'dashy_api_key' );
	delete_option( 'dashy_credentials' );
	delete_option( 'dashy_settings' );
	delete_option( 'dashy_widgets' );
	delete_option( 'dashy_custom_widgets' );
	 
	// drop a custom database table
	global $wpdb;
	$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}dashy_dashboard");	
}
