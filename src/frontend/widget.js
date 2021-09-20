import { loadGoogleScript } from './loadGapi';
import { chartOptions } from './chartOptions';

let chart = '';
let token = '';
let chartQuery = {
	'siteUrl': '',
	'rowLimit': null,
	'searchType': 'web',
	'startDate': moment().subtract(14, 'days').format('YYYY-MM-DD'),
	'endDate': moment().format('YYYY-MM-DD'),
	'dimensions': ['date']
}

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
 
	const _gapi = window.gapi; // set gapi globally 
	
	google.charts.load('current', {'packages':['corechart']});

	// get settings
	wp.apiRequest( { path: '/searchconsole/settings/' } )
			.then(
				(result) => {

					token = result.token
					chartQuery.siteUrl = result.site
					gapi.load( 'client', start );

				}
			).catch(
				(error) => console.log(error.responseText)
			);
}

function start(){
	gapi.client.load('webmasters', 'v3')
	.then( () => {
        gapi.auth.setToken( {access_token:token} )
      	getReport()
	} ) 
}

function getReport(){
	
	gapi.client.webmasters.searchanalytics.query(chartQuery)
		.then( function(response) {

			let dataChart = formatData(response.result.rows)
			chart = new google.visualization.LineChart( document.getElementById('search-console-chart') );
			chart.draw( dataChart, chartOptions );
			google.visualization.events.addListener( chart, 'select', selectHandler );

		})
		.then(null, function(err) {
			console.log(err);
		});

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

loadGoogleScript();