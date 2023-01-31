<?php
/**
 * Plugin main file.
 *
 * Plugin Name:       Search Console
 * Plugin URI:        https://www.formello.net/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           2.6.2
 * Author:            Tropicalista
 * Author URI:        https://www.formello.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       search-console
 *
 * @package           Search_Console
 */

require_once plugin_dir_path( __FILE__ ) . 'includes/register-settings.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Api.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Encryption.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Rest/Settings.php';
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
	$title = __( 'Search Console', 'search-console' );

	$hook = add_menu_page( $title, $title, $capability, 'search-console', 'search_console_load_admin_view', 'dashicons-chart-bar' );

	if ( current_user_can( $capability ) ) {
		$submenu[ $slug ][] = array( __( 'Dashboard' ), $capability, 'admin.php?page=' . $slug . '#/' );
		$submenu[ $slug ][] = array( __( 'Settings' ), $capability, 'admin.php?page=' . $slug . '#/settings' );
	}

	add_action( 'load-' . $hook, 'search_console_load_assets' );
}

/**
 * Load view
 */
function search_console_load_admin_view() {
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

	wp_enqueue_style(
		'search-console-bundle-styles',
		plugin_dir_url( __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' ),
		$script_asset['version']
	);

	add_filter( 'update_footer', 'search_console_remove_footer_admin' );
	add_filter( 'admin_footer_text', 'search_console_add_rating' );
}
add_action( 'admin_menu', 'search_console_admin_menu' );

/**
 * Function to retrieve unencrypted settings
 *
 * @param mixed $settings The general settings.
 */
function search_console_decrypt_option( $settings ) {
	if ( is_array( $settings ) ) {
		return $settings;
	}
	$crypto = new \Search_Console\Encryption();

	$settings = $crypto->decrypt( $settings );
	return maybe_unserialize( $settings );
}
add_filter( 'option_search_console', 'search_console_decrypt_option' );

/**
 * Function to retrieve unencrypted settings
 *
 * @param mixed $settings The general settings.
 */
function search_console_encrypt_option( $settings ) {
	$crypto = new \Search_Console\Encryption();

	return $crypto->encrypt( maybe_serialize( $settings ) );
}
add_filter( 'pre_update_option_search_console', 'search_console_encrypt_option' );

/**
 * My footer
 */
function search_console_remove_footer_admin() {
	echo 'Made with <span class="dashicons dashicons-heart red"></span> by <a href="https://www.formello.net">Tropicalista</a>';
}

/**
 * Rating stars
 */
function search_console_add_rating() {
	echo 'If you like <b>Search Console</b> please add <i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i><i class="dashicons dashicons-star-filled star"></i> review on <a href="https://wordpress.org/support/plugin/search-console/reviews/" target="_blank">WordPress.org</a>';
}

add_action( 'wp_dashboard_setup', 'search_console_dashboard_widgets' );

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
	wp_enqueue_script( 'search-console-widget' );
	wp_enqueue_style(
		'search-console-bundle-styles',
		plugin_dir_url( __FILE__ ) . 'build/style-index.css',
		array( 'wp-components' ),
		$script_asset['version']
	);
	wp_add_dashboard_widget( 'custom_help_widget', __( 'Search Console', 'search-console' ), 'search_console_dashboard_help' );
}

/**
 * Dashboard widget
 */
function search_console_dashboard_help() {
	echo '<div id="search-console-widget"></div>';
}

/**
 * Search console column
 *
 * @param string $column_name The name.
 * @param int    $id The id.
 */
function search_console_posts_data( $column_name, $id ) {
	if ( 'search-console' === $column_name ) {
		$post_slug = get_permalink( $id );
		echo '<span class="gsc-url" data-url="' . esc_attr( $post_slug ) . '"></span>';
	}
}

/**
 * Adds Search Console column to Posts/Pages list column
 *
 * @param array $columns An array of column names.
 * @return array $columns An array of column names.
 */
function search_console_posts( $columns ) {
	$columns['search-console'] = __( 'Search Console', 'search-console' );
	return $columns;
}

add_filter( 'manage_posts_columns', 'search_console_posts' );
add_filter( 'manage_pages_columns', 'search_console_posts' );
add_action( 'manage_pages_custom_column', 'search_console_posts_data', 10, 2 );
add_action( 'manage_posts_custom_column', 'search_console_posts_data', 10, 2 );

/**
 * Rating stars
 *
 * @param string $hook The hook.
 * @throws \Error The error.
 */
function search_console_add_table_scripts( $hook ) {
	$screen = get_current_screen()->id;

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

	if ( 'edit-post' === $screen || 'edit-page' === $screen || 'edit-product' === $screen ) {
		wp_enqueue_script( 'searchconsole-table' );
	}
}

add_action( 'admin_enqueue_scripts', 'search_console_add_table_scripts' );

add_action( 'wp_head', 'search_console_add_meta' );

/**
 * Search Console meta tag
 */
function search_console_add_meta() {
	$options = get_option( 'search_console' );

	if ( $options ) {
		$args = array(
			'meta'     => array(
				'content' => array(),
				'name' => array(),
			),
		);

		echo wp_kses( $options['meta'], $args );
	}

}

/**
 * Updating the role
 */
function search_console_activate() {

	$plugin_data = get_plugin_data( __FILE__ );
	$version = get_option( 'serach_console_version', false );
	$plugin_version = $version ? $version : $plugin_data['Version'];

	if ( version_compare( $plugin_version, '2.6.0', '<' ) ) {
		delete_option( 'search_console' );
		delete_option( 'search_console_token' );
	}

	update_option( 'serach_console_version', $plugin_version );

	$administrator_role = get_role( 'administrator' );

	// Adding a new capability to role.
	$administrator_role->add_cap( 'search_console' );

}
register_activation_hook( __FILE__, 'search_console_activate' );
