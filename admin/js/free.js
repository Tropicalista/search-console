var dataChart,chart,table,dataTable;


google.charts.load('current', {'packages':['corechart','table']});

var chartOptions = {
  width: '100%',
  height: 400,
  focusTarget: 'category',
  chartArea: {
    // leave room for y-axis labels
    width: '100%'
  },
  hAxis: {
    showTextEvery: 2,
    format: 'MMM dd'
  },
  vAxes: {
      0: {direction: -1, maxValue:1, textPosition: 'none'},
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
        isTable ? row.keys[0] : moment(row.keys[0]).toDate(),
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

function getReport(){
  gapi.client.webmasters.searchanalytics.query(chartQuery)
          .then((response) => {
            //var options = chartOptions
            dataChart = formatData(response.result.rows)
            chart = new google.visualization.LineChart(document.getElementById('gsc-chart'));
            chart.draw(dataChart, chartOptions);
            google.visualization.events.addListener(chart, 'select', selectHandler);
            if(chartTable !== "undefined"){
              getTop10();
            }

          })
          .then(null, function(err) {
              console.log(err);
          });      
}

function getTop10(){
  gapi.client.webmasters.searchanalytics.query(chartTable)
          .then((response) => {
            var options = chartOptions
            dataTable = formatData(response.result.rows, true)
            table = new google.visualization.Table(document.getElementById('gsc-top10'));
            table.draw(dataTable, chartOptions);


          })
          .then(null, function(err) {
              console.log(err);
          });      
}

