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

<?php
if ( sc_fs()->can_use_premium_code() ) {
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div id="app" v-cloak></div>

<?php }else{ ?>

<div id="searchconsole-app">

  <div class="searchconsole" class="container">
    <div id="gsc-chart"></div>
  </div>
  
  <div class="container">
    <div><i class="hidden dashicons dashicons-update spin" id="showSpinner"></i></div>
    <b>Change period:</b> 
    <select id="searchconsole-sel-period">
      <option value="14" selected="selected">Last 14 days</option>
      <option value="30">Last 30 days</option>
      <option value="60">Last 60 days</option>
    </select>
    <span class="cta">
    <b>Do you want more data? 
    <?php echo '<a href="' . sc_fs()->get_upgrade_url() . '&trial=true">' .
        esc_html__('Upgrade Now!', 'searchconsole') .
        '</a>'; ?>
    </b>
    <br>
    <b>Free trial, no credit card required!!!</b>
    </span>
  </div>

  <div class="container">
    <div id="gsc-top10"></div>    
  </div>

</div>

<?php
}
?>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.core.min.js"></script>

<script type="text/javascript">

// global variables
var access_token = "<?php echo($options['token']['access_token']) ?>";
var site = "<?php echo($options['site']) ?>";
      
google.charts.load('current', {'packages':['corechart']});

</script>

<?php 
            if ( !sc_fs()->can_use_premium_code() ) {

?>
<script type="text/javascript">

var period = jQuery('select[id=searchconsole-sel-period]').val();

jQuery('select[id=searchconsole-sel-period]').change(function(){
  period= jQuery(this).val();
  changePeriod()
  getReport();
});

var chartQuery = {
              'siteUrl': site,
              'rowLimit': null,
              'searchType': 'web',
              'startDate': moment().subtract(period, 'days').format('YYYY-MM-DD'),
              'endDate': moment().format('YYYY-MM-DD'),
              'dimensions': ['date']
          }

var chartTable = {
              'siteUrl': site,
              'rowLimit': 10,
              'searchType': 'web',
              'startDate': moment().subtract(period, 'days').format('YYYY-MM-DD'),
              'endDate': moment().format('YYYY-MM-DD'),
              'dimensions': ['query']
          }

function changePeriod(){
  chartQuery.startDate = moment().subtract(period, 'days').format('YYYY-MM-DD');
  chartTable.startDate = moment().subtract(period, 'days').format('YYYY-MM-DD');
}

;(function( $ ) {
    'use strict';

    if(access_token){
        gapi.load('client', start);
    }

    function start(){

        $('#showSpinner').toggleClass('hidden');

        gapi.client.load('webmasters', 'v3')
            .then(function(){

                gapi.auth.setToken({access_token:access_token})

                getReport();
                $('#showSpinner').toggleClass('hidden');
            
        })  

    }

})( jQuery );
</script>

<?php 
    }
?>