<?php
/**
 * Plugin main file.
 *
 * Plugin Name:    Search Console
 * Plugin URI:     https://www.francescopepe.com/
 * Description:    This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:        3.0.5
 * Author:         Tropicalista
 * Author URI:     https://www.francescopepe.com
 * License:        GPL-2.0+
 * License URI:    http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:    search-console
 *
 * @package        search-console
 */

require __DIR__ . '/vendor/autoload.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/manage-plugin.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/register-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Api.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Encryption.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Rest/Token.php';

/**
 * Register our menu page
 *
 * @return void
 */
function search_console_admin_menu() {
	global $submenu;

	$capability = 'search_console';
	$slug       = 'search-console';
	$title      = __( 'Search Console', 'search-console' );

	$hook = add_menu_page( $title, $title, $capability, 'search-console', 'search_console_load_admin_view', 'dashicons-chart-bar' );

	$dashboard_hook = add_submenu_page(
		$slug,
		'Dashboard',
		'Dashboard',
		'manage_options',
		'search-console',
		'search_console_load_admin_view'
	);
	$settings_hook = add_submenu_page(
		$slug,
		__( 'Settings' ),
		__( 'Settings' ),
		'manage_options',
		'search-console-settings',
		'search_console_load_admin_view'
	);

	add_action( 'load-' . $hook, 'search_console_load_assets' );
	add_action( 'load-' . $dashboard_hook, 'search_console_load_assets' );
	add_action( 'load-' . $settings_hook, 'search_console_load_assets' );
}
add_action( 'admin_menu', 'search_console_admin_menu' );

/**
 * Load view
 */
function search_console_load_admin_view() {
	$option = get_option( 'search_console' );
	if ( $option && is_string( $option['siteVerification'] ) ) {
		$option['siteVerification'] = false;
		update_option( 'search_console', $option );
	}

	echo '<div id="search-console-wrapper"></div>';
}

/**
 * Load assets
 *
 * @throws \Error The error.
 */
function search_console_load_assets() {
	$script_asset_path = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	if ( ! file_exists( $script_asset_path ) ) {
		throw new \Error(
			'You need to run `npm start` or `npm run build` for the "create-block/formello" block first.'
		);
	}

	$script_asset = require $script_asset_path;

	load_plugin_textdomain( 'search-console', false, plugin_dir_path( __FILE__ ) . 'languages/' );

	wp_register_script(
		'search-console',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_enqueue_script( 'search-console' );
	wp_set_script_translations( 'search-console', 'search-console', plugin_dir_path( __FILE__ ) . 'languages' );

	wp_localize_script(
		'search-console',
		'search_console',
		array(
			'token' => get_option( 'search_console' )['token'],
		)
	);

	wp_enqueue_style(
		'search-console-bundle-styles',
		plugin_dir_url( __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' ),
		$script_asset['version']
	);
}

/**
 * Search Console widget
 *
 * @throws \Error The error.
 */
function search_console_dashboard_widgets() {

	$script_asset_path = plugin_dir_path( __FILE__ ) . 'build/widget.asset.php';
	if ( ! file_exists( $script_asset_path ) ) {
		throw new \Error(
			'You need to run `npm start` or `npm run build` for the "create-block/formello" block first.'
		);
	}

	$script_asset = require $script_asset_path;

	wp_register_script(
		'search-console-widget',
		plugin_dir_url( __FILE__ ) . 'build/widget.js',
		$script_asset['dependencies'],
		array(),
		true
	);

	wp_localize_script(
		'search-console-widget',
		'search_console',
		array(
			'token' => get_option( 'search_console' )['token'],
		)
	);

	wp_enqueue_script( 'search-console-widget' );
	wp_enqueue_style(
		'search-console-bundle-styles',
		plugin_dir_url( __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' ),
		$script_asset['version']
	);
	wp_add_dashboard_widget( 'custom_help_widget', __( 'Search Console', 'search-console' ), 'search_console_dashboard_help' );
}
add_action( 'wp_dashboard_setup', 'search_console_dashboard_widgets' );

/**
 * Dashboard widget
 */
function search_console_dashboard_help() {
	echo '<div id="search-console-widget"></div>';
}

/**
 * Rating stars
 *
 * @throws \Error The error.
 */
function search_console_add_table_scripts() {

	$script_asset_path = plugin_dir_path( __FILE__ ) . 'build/table.asset.php';
	if ( ! file_exists( $script_asset_path ) ) {
		throw new \Error(
			'You need to run `npm start` or `npm run build` for the "create-block/formello" block first.'
		);
	}

	$script_asset = require $script_asset_path;

	wp_register_script(
		'searchconsole-table',
		plugin_dir_url( __FILE__ ) . 'build/table.js',
		$script_asset['dependencies'],
		array(),
		true
	);

	wp_localize_script(
		'searchconsole-table',
		'search_console',
		array(
			'token' => get_option( 'search_console' )['token'],
		)
	);

	wp_enqueue_style(
		'search-console-bundle-styles',
		plugin_dir_url( __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' ),
		$script_asset['version']
	);
}
add_action( 'admin_enqueue_scripts', 'search_console_add_table_scripts' );

/**
 * Updating the role
 */
function search_console_activate() {

	$plugin_data    = get_plugin_data( __FILE__ );
	$version        = get_option( 'serach_console_version', false );
	$plugin_version = $version ? $version : $plugin_data['Version'];

	if ( version_compare( $plugin_version, '2.6.0', '<' ) ) {
		delete_option( 'search_console' );
		delete_option( 'search_console_token' );
		delete_option( 'searchconsole_token' );
	}

	update_option( 'search_console_version', $plugin_version );

	$administrator_role = get_role( 'administrator' );

	// Adding a new capability to role.
	$administrator_role->add_cap( 'search_console' );
}
register_activation_hook( __FILE__, 'search_console_activate' );

/**
 * Fires after tracking permission allowed (optin)
 *
 * @param array $data The Appsero data.
 *
 * @return void
 */
function search_console_tracker_optin( $data ) {
	$data['project'] = 'search-console';
	$response = wp_remote_post(
		'https://hook.eu1.make.com/dplrdfggemll51whv3b21yjabuk8po0b',
		array(
			'headers'     => array( 'Content-Type' => 'application/json; charset=utf-8' ),
			'body'        => wp_json_encode( $data ),
			'method'      => 'POST',
			'data_format' => 'body',
		)
	);
}
add_action( 'search-console_tracker_optin', 'search_console_tracker_optin', 10 );

/**
 * Initialize the plugin tracker
 *
 * @return void
 */
function search_console_init_tracker() {

	$client = new Appsero\Client( '3db07d4b-1867-49ea-8338-be9adc5fa614', 'Search Console', __FILE__ );

	// Active insights.
	$client->insights()
		->add_plugin_data()
		->init();
}
search_console_init_tracker();
