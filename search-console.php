<?php
/**
 * Plugin main file.
 *
 * Plugin Name:       Search Console
 * Plugin URI:        https://www.formello.net/
 * Description:       This plugin displays your Google Search Console Analytics data inside your WordPress.
 * Version:           2.4.7
 * Author:            Tropicalista
 * Author URI:        https://www.formello.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       search-console
 *
 * @package           Search_Console
 */

require_once plugin_dir_path( __FILE__ ) . 'includes/Api.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Encryption.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/Rest/Settings.php';

/**
 * Add menu
 */
function search_console_admin_menu() {
	$title = __( 'Search Console', 'search-console' );

	$hook_suffix = add_menu_page( $title, $title, 'export', 'search-console', 'search_console_load_admin_view', 'dashicons-chart-bar' );

	add_action( 'load-' . $hook_suffix, 'search_console_load_assets' );
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

	wp_register_script( 'search-console', plugin_dir_url( __FILE__ ) . 'build/index.js', $script_asset['dependencies'], $script_asset['version'], 'all' );

	wp_enqueue_script( 'search-console' );
	wp_set_script_translations( 'search-console', 'search-console', plugin_dir_path( __FILE__ ) . 'languages' );

	wp_enqueue_style( 'search-console-bundle-styles', plugin_dir_url( __FILE__ ) . 'build/style-index.css', array( 'wp-components' ), $script_asset['version'], 'all' );

	add_filter( 'update_footer', 'search_console_remove_footer_admin' );
	add_filter( 'admin_footer_text', 'search_console_add_rating' );
}
add_action( 'admin_menu', 'search_console_admin_menu' );

/**
 * Filter to retrieve unencrypted key
 *
 * @param mixed $settings The general settings.
 */
function search_console_option( $settings ) {
	$crypto   = new \Tropicalista\SearchConsole\Encryption();
	$settings = $crypto->decrypt( $settings );
	return $settings;
}
add_filter( 'option_searchconsole', 'search_console_option' );

/**
 * Action to store encrypted key
 *
 * @param mixed $token The token.
 */
function search_console_update( $token ) {
	if ( ! empty( $token ) ) {
		$crypto = new \Tropicalista\SearchConsole\Encryption();
		$key    = $crypto->encrypt( $token );
		update_option( 'search_console', $key );
	}
}

register_setting( 'options', 'searchconsole_token', array( 'show_in_rest' => true ) );

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
 */
function search_console_dashboard_widgets() {
	global $wp_meta_boxes;
	wp_register_script( 'search-console-visualization', 'https://www.gstatic.com/charts/loader.js', array(), array(), true );
	wp_register_script( 'search-console-widget', plugin_dir_url( __FILE__ ) . 'build/widget.js', array( 'wp-api', 'moment', 'search-console-visualization' ), array(), 'all' );
	wp_enqueue_script( 'search-console-widget' );
	wp_add_dashboard_widget( 'custom_help_widget', __( 'Search Console', 'search-console' ), 'search_console_dashboard_help' );
}

/**
 * Dashboard widget
 */
function search_console_dashboard_help() {
	echo '<div id="search-console-chart"></div>';
	$message = wp_sprintf( '<p>%s: %s</p>', __( 'Report generated by', 'search-console' ), '<a href="https://wordpress.org/plugins/search-console/">Search Console</a>' );
	echo wp_kses_post( $message );
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
 * @param array $defaults An array of column names.
 */
function search_console_posts( $defaults ) {
	$defaults['search-console'] = __( 'Search Console', 'search-console' );
	return $defaults;
}

add_filter( 'manage_posts_columns', 'search_console_posts' );
add_filter( 'manage_pages_columns', 'search_console_posts' );
add_action( 'manage_pages_custom_column', 'search_console_posts_data', 10, 2 );
add_action( 'manage_posts_custom_column', 'search_console_posts_data', 10, 2 );

/**
 * Rating stars
 *
 * @param string $hook The hook.
 */
function search_console_add_table_scripts( $hook ) {
	$screen = get_current_screen()->id;

	if ( 'edit-post' === $screen || 'edit-page' === $screen || 'edit-product' === $screen ) {
		wp_register_script( 'searchconsole-table', plugin_dir_url( __FILE__ ) . 'build/table.js', array( 'jquery', 'moment', 'wp-api' ), array(), true );
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

	$args = array(
		'meta'     => array(
			'content' => array(),
			'name' => array(),
		),
	);

	echo wp_kses( $options['meta'], $args );
}
