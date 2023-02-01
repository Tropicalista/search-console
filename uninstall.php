<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @link       https://formello.net
 * @since      2.6.0
 *
 * @package    Search_Console
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

$search_console_option = get_option( 'search_console', false );

if ( $search_console_option ) {
	delete_option( 'search_console_version' );
	delete_option( 'search_console_token' );
	delete_option( 'search_console' );
}
