<?php

$options = get_option($this->plugin_name . '-advanced', $this->optionsAdvancedDefault);

if($options['custom_oauth']){
    $clientId = $options['oauth']['clientId'];
    $clientSecret = $options['oauth']['clientSecret'];
    $redirectUri = $options['oauth']['redirectUri'];
}else{
    $clientId = '';
    $clientSecret = '';
    $redirectUri = '';
}
$optionsGeneral = $this->getOptionsAndRefreshToken();
$site = $optionsGeneral['site'];
$token = $optionsGeneral['token'];

if(!empty($token) && !empty($site)){
?>
<tr>
    <th scope="row">
        <label for="my-text-field">Meta tag</label>
    </th>
    <td>
        <a href="#" class="button button-primary" id="requestVerificationCode"><?php _e('Get site verification', 'searchconsole') ?></a>
        <br>
        <span class="description"><?php _e('Get your meta tag verification code.', 'searchconsole') ?></span>
    </td>
</tr>
<?php
}
?>
<tr>
    <th scope="row">
        <label for="my-text-field"><?php _e('Add meta tag', 'searchconsole') ?></label>
    </th>
    <td>
        <input type="text" class="regular-text" 
            placeholder="your meta tag"
            id="<?php echo $this->plugin_name; ?>-advanced-meta" 
            name="<?php echo $this->plugin_name; ?>-advanced[meta]" 
            value="<?php echo esc_html( wp_unslash( $options['meta'] ) ); ?>"/>
        <br>
        <span class="description"><?php _e('Insert your meta tag verification code.', 'searchconsole') ?></span>
    </td>
</tr>
<tr>
    <th scope="row">
        <label for="my-text-field"><?php _e('Custom credentials?', 'searchconsole') ?></label>
    </th>
    <td>
        <input type="checkbox" class="regular-text" 
            id="<?php echo $this->plugin_name; ?>-advanced-custom_oauth" 
            name="<?php echo $this->plugin_name; ?>-advanced[custom_oauth]" 
            <?php echo ($options['custom_oauth']==1 ? 'checked' : '');?> />
        <br>
        <span class="description"><?php _e('If you want use your custom app, fill the form.', 'searchconsole') ?></span>
    </td>
</tr>
<tr class="custom <?php echo ($options['custom_oauth']==1 ? '' : 'hidden');?>">
    <th scope="row">
        <label for="my-text-field">Client ID</label>
    </th>
    <td>
        <input type="text" class="regular-text" 
            id="<?php echo $this->plugin_name; ?>-advanced-oauth" 
            name="<?php echo $this->plugin_name; ?>-advanced[oauth][clientId]" 
            value="<?php echo ($clientId);?>"/>
        <br>
        <span class="description"><?php _e( 'Add your client ID.', 'searchconsole' ); ?></span>
    </td>
</tr>
<tr class="custom <?php echo ($options['custom_oauth']==1 ? '' : 'hidden');?>">
    <th scope="row">
        <label for="my-text-field">Client secret</label>
    </th>
    <td>
        <input type="text" class="regular-text" 
            id="<?php echo $this->plugin_name; ?>-advanced-oauth" 
            name="<?php echo $this->plugin_name; ?>-advanced[oauth][clientSecret]" 
            value="<?php echo ($clientSecret);?>"/>
        <br>
        <span class="description"><?php _e( 'Add your client secret.', 'searchconsole' ); ?></span>
    </td>
</tr>
<tr class="custom <?php echo ($options['custom_oauth']==1 ? '' : 'hidden');?>">
    <th scope="row">
        <label for="my-text-field">Redirect url</label>
    </th>
    <td>
        <input type="text" class="regular-text" 
            id="<?php echo $this->plugin_name; ?>-advanced-oauth" 
            name="<?php echo $this->plugin_name; ?>-advanced[oauth][redirectUri]" 
            value="<?php echo ($redirectUri);?>"/>
        <br>
        <span class="description"><?php _e( 'Add your redirect url.', 'searchconsole' ); ?></span>
    </td>
</tr>
<script src="https://apis.google.com/js/api.js"></script>

<script>

var site = "<?php echo($site) ?>";
var access_token = "<?php echo($token['access_token']) ?>";

    (function( $ ) {
        'use strict';
        
        $(document).ready(function () {

            $('#search-console-advanced-custom_oauth').click(function(){
                $('tr.custom').toggleClass('hidden')
            });
            
            $('#requestVerificationCode').click(requestVerificationCode)

            function requestVerificationCode() {
              gapi.load('client:auth2', makeApiCall);
            }

            function makeApiCall() {

              gapi.client.load('siteVerification', 'v1').then(function(r){

                gapi.auth.setToken({access_token:access_token})
                gapi.client.siteVerification.webResource.getToken({
                  "verificationMethod": "META",
                  "site": {
                    "identifier": site,
                    "type": "SITE"
                  }
                }).then(function(r){
                  var data = htmlEncode(r.result.token);
                  $('#search-console-advanced-meta').val(r.result.token);
                })

              })
            }

            function htmlEncode(value){
              //create a in-memory div, set it's inner text(which jQuery automatically encodes)
              //then grab the encoded contents back out.  The div never exists on the page.
              return $('<div/>').text(value).html();
            }

        })

    })( jQuery );


    </script>