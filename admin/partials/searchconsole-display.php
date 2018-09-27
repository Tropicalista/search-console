<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://tropicalseo.net
 * @since      1.0.0
 *
 * @package    DashyLite 
 * @subpackage DashyLite/admin/partials
 */

//Grab all options
$options = $this->getOptionsAndRefreshToken();

// Cleanup
$site = $options['site'];

if(empty($options['site'])){
  echo('<h1>Go to settings to choose your site from Search Console</h1>');
  echo('<a href="' . admin_url( 'admin.php?page=' . $this->plugin_name ) . '-settings">' . __('Settings', $this->plugin_name) . '</a>');
  die;
}
?>

<style>
[v-cloak] {
  display: none;
}
</style>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div id="app" v-cloak>

</div>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script src="https://apis.google.com/js/api.js"></script>


<script>

// global variables
var access_token = "<?php echo($token['access_token']) ?>";
var site = "<?php echo($options['site']) ?>";

</script>