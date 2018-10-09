<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://tropicalseo.net
 * @since      1.0.0
 *
 * @package    SearchConsole
 * @subpackage SearchConsole/admin
 */
/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    SearchConsole
 * @subpackage SearchConsole/admin
 * @author     Tropicalista <tropicalseotool@gmail.com>>
 */
class SearchConsole_Rest
{

    private  $plugin_name ;
    private  $version ;
    private  $key ;

    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->key = $this->getKey();
    }

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {

		$version = '1';
		$namespace = $this->plugin_name . '/api';

		register_rest_route( $namespace, '/token', array(
			array(
				'methods'         => WP_REST_Server::READABLE,
				'callback'        => array($this, 'getOptionsAndRefreshToken'),
				'args'            => array(
					'author' => get_current_user_id(),
				),
			)
		) );

	}

    function getOptionsAndRefreshToken()
    {
        $options = get_option( $this->plugin_name . '-general' );
        $provider = new League\OAuth2\Client\Provider\Google( $this->key );
        
        if ( !empty($options['token']) ) {
            $token = new League\OAuth2\Client\Token\AccessToken( $options['token'] );
            
            if ( $token->hasExpired() ) {
                $grant = new League\OAuth2\Client\Grant\RefreshToken();
                $token = $provider->getAccessToken( $grant, $options['token'] );
            }
            
            $token = $token->jsonSerialize();
            $token['refresh_token'] = $options['token']['refresh_token'];
            $options['token'] = $token;
	        update_option( $this->plugin_name . '-general', $options );
        }
        
        return $token['access_token'];
    }

    public function getKey()
    {
        $options = get_option( $this->plugin_name . '-advanced' );
        if ( isset( $options['oauth'] ) ) {
            return $options['oauth'];
        }
        return [
            'clientId'     => '192245718841-t3c0koqbc835srj1i4ss8ve778k9risj.apps.googleusercontent.com',
            'clientSecret' => 'wgje7OszHWz_kZQMjlCpvcL7',
            'redirectUri'  => 'urn:ietf:wg:oauth:2.0:oob',
        ];
    }

}