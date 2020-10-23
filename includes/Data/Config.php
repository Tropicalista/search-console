<?php
namespace Tropicalista\SearchConsole\Data;

/**
 * Admin Pages Handler
 */
class Config {

    /**
     * Holds various class instances
     *
     * @var array
     */
    protected $oauth;
    protected $options;
    protected $encryption;


    public function __construct() {
        $this->oauth = new \Tropicalista\SearchConsole\Data\Oauth();
        $this->options = new \Tropicalista\SearchConsole\Data\Options();
        $this->encryption = new \Tropicalista\SearchConsole\Data\Encrypted_Options();  
    }

    /**
     * Register our menu page
     *
     * @return void
     */
    public function get_config() {
        $config = $this->options->get("searchconsole_settings");

        $config = array(
            "authUrl" => $this->oauth->authUrl(),
            "site" => $this->get_site($config),
            "token" => $this->oauth->get_token(),
        );
        if( defined( 'GOOGLESITEKIT_PLUGIN_BASENAME' ) ) {
            // Google SiteKit is active
            //require_once GOOGLESITEKIT_PLUGIN_DIR_PATH . 'vendor/autoload.php';
            $config['sitekit'] = true;
            //return new \Google\Site_kit\Plugin( GOOGLESITEKIT_PLUGIN_MAIN_FILE );

        }
        return $config;
    }

    function get_site($config) {

        if(isset($config['webmasters']['site'])){
            return $config['webmasters']['site'];
        }

        return "";

    }

}
