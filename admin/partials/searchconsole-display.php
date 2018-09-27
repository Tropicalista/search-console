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
  echo('<a href="' . admin_url( 'admin.php?page=' . $this->plugin_name ) . '-settings">' . __('Settings', 'searchconsole') . '</a>');
  wp_die();
}
?>

<style>
[v-cloak] {
  display: none;
}
</style>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div id="app" v-cloak></div>

<?php
if ( sc_fs()->is_plan( 'free', true ) ) {
?>
<div id="search-console-widget">
  <div><i class="hidden dashicons dashicons-update spin" id="showSpinner"></i></div>
  <select id="searchconsole-sel-period">
    <option value="14" selected="selected">Last 14 days</option>
    <option value="30">Last 30 days</option>
    <option value="60">Last 60 days</option>
  </select>

  <div id="searchconsole-app" class="searchconsole-app"></div>

</div>

<?php
}
?>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script src="https://apis.google.com/js/api.js"></script>


<script>

// global variables
var access_token = "<?php echo($options['token']['access_token']) ?>";
var site = "<?php echo($options['site']) ?>";

</script>

<?php 

if ( sc_fs()->is_not_paying() ) {
    echo '<section><h1>' . esc_html__('Awesome Premium Features', 'searchconsole') . '</h1>';
    echo '<a href="' . sc_fs()->get_upgrade_url() . '">' .
        esc_html__('Upgrade Now!', 'searchconsole') .
        '</a>';
    echo '</section>';
}

?>