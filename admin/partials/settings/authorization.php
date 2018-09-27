<p><?php _e( 'To allow the plugin to fetch your Google Search Console information, please enter your Google Authorization Code. Clicking the button below will open a new window.', 'search-console' ); ?></p>
<p>
    <a href="#" class="button button-primary" onclick="requestGoogleoAuthCode()"><?php _e('Get Google authorization code', 'search-console'); ?></a>
</p>

    <legend><span><?php _e('After authorization, copy/paste the response code in the input field.', 'search-console'); ?></span></legend>
    <input type="text" class="regular-text" id="<?php echo $this->plugin_name; ?>-general-code" name="<?php echo $this->plugin_name; ?>-general[code]" value="" />

<script type="text/javascript">

function requestGoogleoAuthCode() {

    var popupurl = '<?php echo $authUrl; ?>';
    var win =   window.open(popupurl, "googleauthwindow", 'width=800, height=600'); 

}

</script>