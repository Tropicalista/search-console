<?php
namespace Tropicalista\SearchConsole;

/**
 * Frontend Pages Handler
 */
class Frontend {

    protected $auth_client;
    protected $options;
    
    public function __construct() {
        $this->options = get_option('searchconsole_settings');
        $this->auth_client = new \Tropicalista\SearchConsole\Data\Oauth_Client();
        $this->oauth();

        add_action('wp_head', [ $this, 'add_meta' ]);
    }

    /**
     * Render frontend app
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function oauth() {

        // Handles Direct OAuth client request.
        if ( filter_input( INPUT_GET, 'oauth2callback' ) ) {
            $this->auth_client->authorize_user();
            exit;
        }

    }

    public function add_meta() {
        if(!empty($this->options['webmasters']['siteVerification'])){
            echo $this->options['webmasters']['meta'];
        }
    }

}
