//Get today's date from the computer
var endDate = dayjs().format('YYYY-MM-DD');
var startDate = dayjs().startOf('month').add(-60, 'day').format('YYYY-MM-DD')

var allUrls = [];

jQuery('.gsc-url').each(function( index ) {
  allUrls.push({'dimension':'page','operator':'equals','expression':jQuery( this ).data('url')})
});


var chartQuery = {
              'siteUrl': site,
              'rowLimit': null,
              'searchType': 'web',
              'startDate': startDate,
              'endDate': endDate,
              'dimensions': ['page'],
              'dimensionFilterGroups': [
                  {'filters': allUrls }
                ]
          }

function getReport(){
  gapi.client.webmasters.searchanalytics.query(chartQuery)
          .then((response) => {
            //var options = chartOptions
            console.log(response.result.rows)
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

                getReport();
                $('#showSpinner').toggleClass('hidden');
            
        })  

    }

})( jQuery );