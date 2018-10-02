//Get today's date from the computer
var endDate = dayjs().format('YYYY-MM-DD');
var startDate = dayjs().startOf('month').add(-60, 'day').format('YYYY-MM-DD')

var allUrls = [];

jQuery('.gsc-url').each(function( index ) {
  allUrls.push(jQuery( this ).data('url'))
});

var chartQuery = {
              'siteUrl': site,
              'rowLimit': null,
              'searchType': 'web',
              'startDate': startDate,
              'endDate': endDate,
              'dimensions': ['page']
          }

function getReport(){
  gapi.client.webmasters.searchanalytics.query(chartQuery)
          .then(function(response) {

            response.result.rows.forEach(function (x) {

                if( allUrls.indexOf(x.keys[0]) > -1){
                  jQuery('span[data-url="' + x.keys[0] + '"]').html(
                    '<b>Clicks:</b> '+ x.clicks +
                    ' | <b>Impressions:</b> '+ x.impressions +
                    ' | <b>CTR:</b> '+ (Math.round(x.ctr * 10000) / 100) + '%' +
                    ' | <b>Position:</b> '+ Math.round(x.position * 100) / 100 
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

    if(access_token){
        gapi.load('client', start);
    }

    function start(){

        $('#showSpinner').toggleClass('hidden');

        gapi.client.load('webmasters', 'v3')
            .then(function(){

                gapi.auth.setToken({access_token:access_token})
                if( !jQuery('.column-asc_gsc').hasClass('hidden') ){
                  getReport();
                }
                $('#showSpinner').toggleClass('hidden');
            
        })  

    }

})( jQuery );