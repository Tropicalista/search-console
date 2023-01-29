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
 * Register plugin settings.
 *
 * @since 1.0.0
 */
function register_settings() {
	$settings = array(
		'wp_url' => array(
			'type' => 'string',
		),
		'title' => array(
			'type' => 'string',
		),
		'site' => array(
			'type' => 'string',
		),
		'siteVerification' => array(
			'type' => 'string',
		),
		'meta' => array(
			'type' => 'string',
		),
		'credentials' => array(
			'type'       => 'object',
			'properties' => array(
				'client_id' => array(
					'type' => 'string',
				),
				'client_secret'     => array(
					'type' => 'string',
				),
				'redirect_uri'          => array(
					'type' => 'string',
				),
			),
		),
		'token' => array(
			'type'       => 'object',
			'properties' => array(
				'access_token'  => array(
					'type' => 'string',
				),
				'expires_in'    => array(
					'type' => 'number',
				),
				'id_token'      => array(
					'type' => 'string',
				),
				'refresh_token' => array(
					'type' => 'string',
				),
				'scope'         => array(
					'type' => 'string',
				),
				'token_type'    => array(
					'type' => 'string',
				),
			),
		),
	);

	$defaults = array(
		'wp_url' => get_site_url(),
		'title' => get_bloginfo( 'name' ),
		'site' => '',
		'siteVerification' => '',
		'meta' => '',
		'token' => false,
		'credentials' => array(
			'client_id' => '',
			'client_secret' => '',
			'redirect_uri' => get_site_url() . '?sc-oauth2callback=1',
		),
	);

	register_setting(
		'search_console',
		'search_console',
		array(
			'description'  => __(
				'Settings for the Search Console plugin.',
				'search-console'
			),
			'type'         => 'object',
			'show_in_rest' => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => $settings,
				),
			),
			//'sanitize_callback' => 'sanitize_text_field',
			'default'      => $defaults,
		)
	);

	register_setting( 'options', 'searchconsole_token', array( 'show_in_rest' => true ) );

}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_settings' );
add_action( 'admin_init', __NAMESPACE__ . '\register_settings' );
