import { loadGoogleScript } from './loadGapi';
import { dateI18n } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';

let token = '';
const chartQuery = {
	siteUrl: '',
	searchType: 'web',
	startDate: dateI18n(
		'Y-m-d',
		new Date().setDate( new Date().getDate() - 29 )
	),
	endDate: dateI18n(
		'Y-m-d',
		new Date().setDate( new Date().getDate() - 1 )
	),
	dimensions: [ 'page' ],
	dimensionFilterGroups: {},
	//aggregationType: 'byPage',
	startRow: 0,
	rowLimit: 1,
};

const allUrls = [];

window.jQuery( document ).ready( function () {
	window.jQuery( '.gsc-url' ).each( ( index, el ) => {
		allUrls.push( window.jQuery( el ).data( 'url' ) );
	} );
} );

function refreshToken() {
	apiFetch( {
		path: '/searchconsole/v1/refresh',
		method: 'POST',
	} ).then( ( result ) => {
		window.gapi.client.setToken( result );
		getReport();
	} );
}

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
	// get settings
	apiFetch( { path: '/wp/v2/settings/' } ).then( ( result ) => {
		token = result.search_console.token;
		chartQuery.siteUrl = result.search_console.site;
		window.gapi.load( 'client', start );
	} );
};

function start() {
	window.gapi.client.load( 'searchconsole', 'v1' ).then( () => {
		window.gapi.client.setToken( token );
		check();
	} );
}

function check() {
	window.gapi.client.webmasters.sitemaps
		.list( { siteUrl: chartQuery.siteUrl } )
		.then( function () {
			getReport();
		} )
		.catch( ( error ) => {
			if ( 401 === error.status ) {
				refreshToken();
			}
		} );
}

function getReport() {
	const batch = window.gapi.client.newBatch();

	for ( const url of allUrls ) {
		const req = [
			{
				filters: [
					{
						dimension: 'page',
						operator: 'EQUALS',
						expression: url,
					},
				],
			},
		];
		batch.add(
			window.gapi.client.webmasters.searchanalytics.query( {
				...chartQuery,
				dimensionFilterGroups: req,
			} ),
			{
				id: url,
			}
		);
	}

	batch.then( ( data ) => {
		for ( const url in data.result ) {
			if (
				allUrls.indexOf( url ) > -1 &&
				data.result[ url ].result.rows
			) {
				window
					.jQuery( 'span[data-url="' + url + '"]' )
					.html(
						createReportHtml( data.result[ url ].result.rows[ 0 ] )
					);
			}
		}
	} );
}

const createReportHtml = ( { clicks, position, impressions, ctr } ) => `
	<b>Clicks:</b> ${ clicks || 'n/a' }<br />
	<b>Position:</b> ${ Math.round( position * 100 ) / 100 || 'n/a' }<br />
	<b>CTR:</b> ${ Math.round( ctr * 10000 ) / 100 || 'n/a' }<br />
	<b>Impressions:</b> ${ impressions || 'n/a' }<br />`;

loadGoogleScript();
