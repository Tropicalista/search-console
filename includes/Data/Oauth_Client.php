<?php
namespace Tropicalista\SearchConsole\Data;

/**
 * Admin Pages Handler
 */
class Oauth_Client {

    /**
     * Holds various class instances
     *
     * @var array
     */
    protected $credentials;
    protected $provider;
    protected $encryption;
    protected $oauth;


    public function __construct() {
        $this->oauth = new Oauth();
        $this->credentials = new \Tropicalista\SearchConsole\Data\Credentials();
        $this->encryption = new \Tropicalista\SearchConsole\Data\Encrypted_Options();  
        $this->provider = new \League\OAuth2\Client\Provider\Google($this->credentials->get());
    }

    public function authorize_user() {

        session_start();  

        if (!empty($_GET['error'])) {

            // Got an error, probably user denied access
            exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));

        } elseif (empty($_GET['code'])) {

            // If we don't have an authorization code then get one
            $authUrl = $this->provider->getAuthorizationUrl($this->oauth->scopes());
            $_SESSION['oauth2state'] = $this->provider->getState();
            wp_redirect($authUrl);
            exit;

        } elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

            // State is invalid, possible CSRF attack in progress
            unset($_SESSION['oauth2state']);
            exit('Invalid state');

        } else {

            // Try to get an access token (using the authorization code grant)
            $token = $this->provider->getAccessToken('authorization_code', [
                'code' => $_GET['code']
            ]);

            // Optional: Now you have a token you can look up a users profile data
            try {

                $refreshToken = $token->jsonSerialize();
                // safely store
                $this->encryption->set( 'searchconsole_token' , $refreshToken );

                wp_redirect(admin_url() . 'admin.php?page=searchconsole#/settings');

                exit;

            } catch (Exception $e) {

                // Failed to get user details
                exit('Something went wrong: ' . $e->getMessage());

            }

        }

    }



}
