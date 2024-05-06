import { loadGoogleScript } from './loadGapi';
import { dateI18n } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';

let token = '';
const chartQuery = {
	siteUrl: '',
	rowLimit: null,
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
		window.gapi.client.init( {
			discoveryDocs: [
				'https://www.googleapis.com/discovery/v1/apis/webmasters/v3/rest',
			],
		} );
		getReport();
	} );
}

function getReport() {
	window.gapi.client.webmasters.searchanalytics
		.query( chartQuery )
		.then( function ( response ) {
			response.result.rows.forEach( function ( x ) {
				if ( allUrls.indexOf( x.keys[ 0 ] ) > -1 ) {
					window
						.jQuery( 'span[data-url="' + x.keys[ 0 ] + '"]' )
						.html( createReportHtml( x ) );
				}
			} );
		} )
		.catch( ( error ) => {
			if ( 401 === error.status ) {
				refreshToken();
			}
		} );
}

const createReportHtml = ( { clicks, position, impressions, ctr } ) => `
	<b>Clicks:</b> ${ clicks }<br />
	<b>Position:</b> ${ Math.round( position * 100 ) / 100 }<br />
	<b>CTR:</b> ${ Math.round( ctr * 10000 ) / 100 }%<br />
	<b>Impressions:</b> ${ impressions }<br />`;

loadGoogleScript();
