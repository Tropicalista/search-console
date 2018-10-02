<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Only run plugin in the admin
if ( ! is_admin() ) {
	return false;
}

Class SearchConsole_Table {

	/**
	* Constructor for SearchConsole_Table Class
	*/
	public function __construct() {

		add_action( 'manage_posts_custom_column',        array( $this, 'gsc_posts_data' ), 10, 2 );
		add_action( 'manage_pages_custom_column',        array( $this, 'gsc_posts_data' ), 10, 2 );
		add_filter( 'manage_posts_columns',              array( $this, 'gsc_posts' ) );
		add_filter( 'manage_pages_columns',              array( $this, 'gsc_posts' ) );

	}

	function add_table_scripts( $hook ) {
	    $screen = get_current_screen()->id;

	    if ( $screen == 'edit-post' || $screen == 'edit-page' ) {
            wp_enqueue_script( 'gsc_script-gapi', 'https://apis.google.com/js/api.js' );
	        wp_enqueue_script(  'dayjs', 'https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.7.5/dayjs.min.js', array(), null, true );
	        wp_enqueue_script(  'table-js', plugin_dir_url( __FILE__ ) . '/js/gsc-table.js', array(), null, true );
	    }
	}

	/**
	 * Adds Search Console column to Posts/Pages list column
	 *
	 * @param array $defaults An array of column names.
	 */
	public function gsc_posts( $defaults ) {
		$defaults['asc_gsc'] = __( 'Search Console', 'searchconsole' );
		return $defaults;
	}

	/**
	 * Gets the post name from get_post function and displays the slug
	 *
	 * @param string $column_name Name of the column
	 * @param int    $id          post id
	 *
	 * @see https://developer.wordpress.org/reference/functions/get_post/
	 */
	public function gsc_posts_data( $column_name, $id ) {
		if ( $column_name == 'asc_gsc' ) {
			$post_slug = get_permalink( $id );
			echo '<span class="gsc-url" data-url="' . esc_attr( $post_slug ) . '"></span>';
		}
	}

}
