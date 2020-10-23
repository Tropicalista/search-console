var dataChart,chart,table,dataTable,token,chartQuery;

var chartOptions = {
  width: '100%',
  height: '400',
  colors: [
    '#4285f4', '#00bcd4', '#009688', '#673ab7'
  ],
  //curveType: 'function',
  smoothline: 'true',
  focusTarget: 'category',
  chartArea: {
    // leave room for y-axis labels
    width: '100%',
    height: '80%'
  },
  hAxis: {
    showTextEvery: 1,
    format: 'MMM dd'
  },
  vAxis: {
    gridlines: {
      count: 0,
      minSpacing: 100
    },
    minorGridlines: { count: 2 },
    showTextEvery: 2
  },
  vAxes: {
      //0: {direction: -1, maxValue:1, textPosition: 'none'},
      0: {direction: -1, textPosition: 'none'},
      1: {textPosition: 'none' },
      2: {textPosition: 'none' },
      3: {textPosition: 'none' }
  },
  series: {
      0: { type: "line", targetAxisIndex: 1, tooltip: true },
      1: { type: "line", targetAxisIndex: 2, tooltip: true },
      2: { type: "line", targetAxisIndex: 3, tooltip: true },
      3: { type: "line", targetAxisIndex: 0, tooltip: true },
      4: { type: "line", targetAxisIndex: 0, tooltip: true }
  }
}

function formatData(rows, isTable) {
    var data = new google.visualization.DataTable();
    isTable ? data.addColumn('string', 'Keyword') : data.addColumn('date', 'Keys');
    data.addColumn('number', 'Clicks');
    data.addColumn('number', 'Impressions');
    data.addColumn('number', 'CTR');
    data.addColumn('number', 'Position');

    if(!isTable){
      chartOptions.hAxis.format === 'MMM dd'
    }

    _.forEach(rows, function(row){
      data.addRow([
        isTable ? row.keys[0] : dayjs(row.keys[0]).toDate(),
        row.clicks,
        row.impressions,
        (row.ctr * 100),
        parseFloat(row.position)
      ]);
    })
  return data      
}

function selectHandler(){

  var col = chart.getSelection()[0].column
  if(!col){return}

  var selection = chart.getSelection();       

  // click and data index are one off
  var i = selection[0].column - 1;
  chartOptions.series[i].tooltip = !chartOptions.series[i].tooltip

  // just simple reverse
  if (chartOptions.series[i].lineWidth == 0) {
      chartOptions.series[i].lineWidth = 2;
      chartOptions.series[i].areaOpacity = 0.3;
  }
  else {
      chartOptions.series[i].lineWidth = 0;
      chartOptions.series[i].areaOpacity = 0.0;            
  }

  chart.draw(dataChart, chartOptions);

}

jQuery( document ).ready(function() {

  google.charts.load('current', {'packages':['corechart','table']});

    // Fire the AJAX request!
    jQuery.ajax({
        method: 'GET',
        url: wpApiSettings.root + 'searchconsole/api/config',
        beforeSend: function ( xhr ) {
            xhr.setRequestHeader( 'X-WP-Nonce', _nonce );
        },
        success : function( data ) {
          token = data.token
          chartQuery = {
                        'siteUrl': data.site,
                        'rowLimit': null,
                        'searchType': 'web',
                        'startDate': dayjs().subtract(14, 'days').format('YYYY-MM-DD'),
                        'endDate': dayjs().format('YYYY-MM-DD'),
                        'dimensions': ['date']
                    }
          gapi.load('client', start);

        },
        fail : function( response ) {
          console.log(response.data.message);
        }
    }); 

});


function start(){
  gapi.client.load('webmasters', 'v3')
      .then(function(){

          gapi.auth.setToken({access_token:token})

          getReport();
          jQuery('#showSpinner').toggleClass('hidden');
      
  }) 
}

function getReport(){
  gapi.client.webmasters.searchanalytics.query(chartQuery)
          .then( function(response) {
            //var options = chartOptions
            dataChart = formatData(response.result.rows)
            chart = new google.visualization.LineChart(document.getElementById('gsc-chart'));
            chart.draw(dataChart, chartOptions);
            google.visualization.events.addListener(chart, 'select', selectHandler);

          })
          .then(null, function(err) {
              console.log(err);
          });      
}
