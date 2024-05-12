<?php
/**
 * Register the plugin settings
 *
 * @package formello
 * @since   1.0.0
 */

namespace Search_Console;

defined( 'ABSPATH' ) || exit;

/**
 * Adds Search Console column to Posts list column.
 * Not adding to Pages.
 *
 * @param array  $columns An array of column names.
 * @param string $post_type The post type id.
 * @return array $columns An array of column names.
 */
function column_posts( $columns, $post_type ) {

	$options = get_option( 'search_console' );

	if ( in_array( $post_type, $options['postTypes'] ) ) {
		// Remove Date.
		unset( $columns['date'] );
		$columns['search-console'] = __( 'Search Console', 'search-console' );
		$columns['date']           = 'Date';
		wp_enqueue_script( 'searchconsole-table' );
	}

	return $columns;
}

/**
 * Register plugin settings.
 *
 * @param array $columns An array of column names.
 */
function column_pages( $columns ) {

	$options = get_option( 'search_console' );

	if ( in_array( 'page', $options['postTypes'] ) ) {
		// Remove Date.
		unset( $columns['date'] );
		$columns['search-console'] = __( 'Search Console', 'search-console' );
		$columns['date']           = 'Date';
		wp_enqueue_script( 'searchconsole-table' );
	}

	return $columns;
}

/**
 * Search console column
 *
 * @param string $column_name The name.
 * @param int    $id The id.
 */
function column_data( $column_name, $id ) {
	if ( 'search-console' === $column_name ) {
		$post_slug = get_permalink( $id );
		echo '<span class="gsc-url" data-url="' . esc_attr( $post_slug ) . '"></span>';
	}
}

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

/**
 * Function to retrieve unencrypted settings
 *
 * @param mixed $settings The general settings.
 */
function search_console_encrypt_option( $settings ) {
	$crypto = new \Search_Console\Encryption();

	return $crypto->encrypt( maybe_serialize( $settings ) );
}


/**
 * Search Console meta tag
 */
function search_console_add_meta() {
	$options = get_option( 'search_console' );

	if ( $options && $options['siteVerification'] && is_home() ) {
		$args = array(
			'meta' => array(
				'content' => array(),
				'name'    => array(),
			),
		);

		echo wp_kses( $options['meta'], $args );
	}
}

add_filter( 'manage_posts_columns', __NAMESPACE__ . '\column_posts', 10, 2 );
add_filter( 'manage_pages_columns', __NAMESPACE__ . '\column_pages' );
add_action( 'manage_pages_custom_column', __NAMESPACE__ . '\column_data', 10, 2 );
add_action( 'manage_posts_custom_column', __NAMESPACE__ . '\column_data', 10, 2 );
add_filter( 'option_search_console', __NAMESPACE__ . '\search_console_decrypt_option' );
add_filter( 'pre_update_option_search_console', __NAMESPACE__ . '\search_console_encrypt_option' );
add_action( 'wp_head', __NAMESPACE__ . '\search_console_add_meta' );
add_action(
	'all_admin_notices',
	function () {

		$options = get_option( 'search_console' );
		$screen = get_current_screen();

		if ( in_array( $screen->post_type, $options['postTypes'] ) ) {
			echo '<div id="search-console-table"></div>';
		}
	}
);
