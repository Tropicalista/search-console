//Get today's date from the computer
var endDate = dayjs().format('YYYY-MM-DD');
var startDate = dayjs().add(-7, 'day').format('YYYY-MM-DD');

var endDate2 = dayjs().add(-7, 'day').format('YYYY-MM-DD');
var startDate2 = dayjs().add(-14, 'day').format('YYYY-MM-DD');

console.log(endDate,endDate2)
console.log(startDate,startDate2)

var allUrls = [];

jQuery( document ).ready(function() {
  jQuery('.gsc-url').each(function( index ) {
    allUrls.push(jQuery( this ).data('url'))
  });   
});

function getReport(chartQuery){
  /*var batch = gapi.client.newBatch();

  var searchRequest = function(name,query) {
    console.log(query)
    return gapi.client.request({
      'path': 'webmasters/v3/',
      'params':  query 
     });
  };
  var searchAlvin = gapi.client.webmasters.searchanalytics.query(chartQuery[0]);
  var searchSimon = gapi.client.webmasters.searchanalytics.query(chartQuery[1]);

  // Adding just the request
  batch.add(searchAlvin, {'id': 'thisWeek'});
  // Adding the request with an ID
  batch.add(searchSimon, {'id': 'lastWeek'});

  batch.then( function(res){
    console.log(res)
  })*/

  gapi.client.webmasters.searchanalytics.query(chartQuery[0])
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

function onSuccess(res){

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
        var chartQuery2 = {
                      'siteUrl': config.site,
                      'rowLimit': null,
                      'searchType': 'web',
                      'startDate': startDate2,
                      'endDate': endDate2,
                      'dimensions': ['page']
                  }

        $('#showSpinner').toggleClass('hidden');

        gapi.client.load('webmasters', 'v3')
            .then(function(){

                gapi.auth.setToken({access_token:config.token})
                if( !jQuery('.column-asc_gsc').hasClass('hidden') ){
                  getReport([chartQuery,chartQuery2]);
                }
                $('#showSpinner').toggleClass('hidden');
            
        })  

    }

})( jQuery );