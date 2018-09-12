<?php

//Grab all options
$options = $this->getOptionsAndRefreshToken();

$provider = new League\OAuth2\Client\Provider\Google($this->key);

$token = $options['token'];

$authUrl = $provider->getAuthorizationUrl([
    'scope' => [
        'https://www.googleapis.com/auth/webmasters.readonly', 'email', 'profile', 'https://www.googleapis.com/auth/siteverification'
    ]
]);

?>
<script src="https://apis.google.com/js/api.js"></script>

<?php 
    if(empty($token)){
        include_once( WP_PLUGIN_DIR . '/' . $this->plugin_name . '/admin/partials/settings/authorization.php' );
    }else{
        include_once( WP_PLUGIN_DIR . '/' . $this->plugin_name . '/admin/partials/settings/sitechoose.php' );
    }
?>