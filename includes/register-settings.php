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
 * Recursive sanitation for an array
 *
 * @param mixed $data the array of data.
 *
 * @return mixed
 */
function recursive_sanitize_text_field( $data ) {
	if ( ! is_array( $data ) ) {
		return sanitize_text_field( $data );
	}
	foreach ( $data as $key => &$value ) {
		if ( is_array( $value ) ) {
			$value = recursive_sanitize_text_field( $value );
		} else {
			if ( ! is_bool( $value ) ) {
				$value = sanitize_text_field( $value );
			};
		}
	}
	return $data;
}

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
		'postTypes' => array(
			'type' => 'array',
		),
		'site' => array(
			'type' => 'string',
		),
		'siteVerification' => array(
			'type' => 'boolean',
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
			'additionalProperties' => true,
		),
	);

	$defaults = array(
		'wp_url' => get_site_url(),
		'title' => get_bloginfo( 'name' ),
		'postTypes' => array(),
		'site' => '',
		'siteVerification' => false,
		'meta' => '',
		'token' => array(
			'access_token'  => '',
			'expires_in'    => 3600,
			'id_token'      => '',
			'refresh_token' => '',
			'scope'         => '',
			'token_type'    => '',
			'created_at'    => time(),
		),
		'credentials' => array(
			'client_id' => '',
			'client_secret' => '',
			'redirect_uri' => 'postmessage',
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
			//'sanitize_callback' => __NAMESPACE__ . '\recursive_sanitize_text_field',
			'default'      => $defaults,
		)
	);
}
add_action( 'rest_api_init', __NAMESPACE__ . '\register_settings' );
add_action( 'init', __NAMESPACE__ . '\register_settings' );
