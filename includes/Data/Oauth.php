<?php
namespace Tropicalista\SearchConsole\Data;

/**
 * Admin Pages Handler
 */
class Oauth {

    const OPTION = 'searchconsole_token';

    protected $token = array();
    protected $provider;
    protected $grant;
    protected $credentials;

    public function __construct() {
        $this->credentials = new \Tropicalista\SearchConsole\Data\Credentials();
        $this->encrypted_options = new \Tropicalista\SearchConsole\Data\Encrypted_Options();
        $this->provider = new \League\OAuth2\Client\Provider\Google($this->credentials->get());
        $this->grant = new \League\OAuth2\Client\Grant\RefreshToken();
    }

    function get_token(){
        $token = $this->encrypted_options->get( self::OPTION );
        if(empty($token)){
            return '';
        }
        return $this->validate_token($token);
    }

    /**
     * Return a fresh token
     *
     * @return void
     */
    function validate_token($token) {

        if( !isset($token) || $this->isExpired($token) ){
            
            try {
                // run your code here
                $newToken = $this->provider->getAccessToken($this->grant, ['refresh_token' => $token['refresh_token']]);

                $token['expires'] = $newToken->getExpires();
                $token['access_token'] = $newToken->__toString();

                $settings = $this->encrypted_options->set( self::OPTION, $token );

                return $newToken->__toString();
            }
            catch (exception $e) {
                //code to handle the exception
                return '';
            }
            finally {
                //optional code that always runs
            }

        }
        return $token['access_token'];
    }

    /**
     * Check if token is expired
     *
     * @return void
     */
    function isExpired( $token ){

        $expired = ($token['expires'] - 30) < time();

        return $expired;

    }

    function authUrl(){
        $authUrl = $this->provider->getAuthorizationUrl($this->scopes());
        return $authUrl;
    }

    function scopes() {
        return array(
                "scope" => array(
                    'https://www.googleapis.com/auth/webmasters.readonly',
                    'https://www.googleapis.com/auth/siteverification'
                ),
                "approval_prompt" => "force",
                "access_type" => "offline",
        );
    }

}
