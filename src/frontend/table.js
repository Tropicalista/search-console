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
	'dimensions': ['page']
}

var allUrls = [];

jQuery( document ).ready(function() {
  jQuery('.gsc-url').each(function( index ) {
	console.log(jQuery( this ).data('url'))
	allUrls.push(jQuery( this ).data('url'))
  });   
});

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
 
	const _gapi = window.gapi; // set gapi globally 

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

loadGoogleScript();