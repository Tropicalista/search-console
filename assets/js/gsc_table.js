//Get today's date from the computer
var endDate = dayjs().format('YYYY-MM-DD');
var startDate = dayjs().startOf('month').add(-60, 'day').format('YYYY-MM-DD')

var allUrls = [];

jQuery( document ).ready(function() {
  jQuery('.gsc-url').each(function( index ) {
    allUrls.push(jQuery( this ).data('url'))
  });   
});

function getReport(chartQuery){
  gapi.client.webmasters.searchanalytics.query(chartQuery)
          .then(function(response) {

            response.result.rows.forEach(function (x) {

                if( allUrls.indexOf(x.keys[0]) > -1){
                  jQuery('span[data-url="' + x.keys[0] + '"]').html(
                    '<b>Clicks:</b> '+ x.clicks +
                    '<br>' +
                    '<b>Position:</b> '+ Math.round(x.position * 100) / 100 +
                    '<br>' +
                    '<b>CTR:</b> '+ (Math.round(x.ctr * 10000) / 100) + '%' +
                    '<br>' +
                    '<b>Impressions:</b> '+ x.impressions
                  )
                }
              
            });

          })
          .then(null, function(err) {
              console.log(err);
          });    
}


;(function( $ ) {
    'use strict';

    gapi.load('client', start);

    function start(){

      // Fire the AJAX request!
      $.ajax({
          method: 'GET',
          url: wpApiSettings.root + 'searchconsole/api/config',
          beforeSend: function ( xhr ) {
              xhr.setRequestHeader( 'X-WP-Nonce', _nonce );
          },
          success : function( response ) {
            initialize(response)
          },
          fail : function( response ) {
            console.log(response.data.message);
          }
      });    
      
    }


    function initialize(config){

        var chartQuery = {
                      'siteUrl': config.site,
                      'rowLimit': null,
                      'searchType': 'web',
                      'startDate': startDate,
                      'endDate': endDate,
                      'dimensions': ['page']
                  }

        $('#showSpinner').toggleClass('hidden');

        gapi.client.load('webmasters', 'v3')
            .then(function(){

                gapi.auth.setToken({access_token:config.token})
                if( !jQuery('.column-asc_gsc').hasClass('hidden') ){
                  getReport(chartQuery);
                }
                $('#showSpinner').toggleClass('hidden');
            
        })  

    }

})( jQuery );