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
        return $config;
    }

    function get_site($config) {

        if(isset($config['webmasters']['site'])){
            return $config['webmasters']['site'];
        }

        return "";

    }

}
