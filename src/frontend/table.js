import { loadGoogleScript } from './loadGapi';
import { dateI18n } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';

const chart = '';
let token = '';
const chartQuery = {
	siteUrl: '',
	rowLimit: null,
	searchType: 'web',
    startDate: dateI18n( 'Y-m-d', new Date().setDate( new Date().getDate() - 29 ) ),
    endDate: dateI18n( 'Y-m-d', new Date().setDate( new Date().getDate() - 1 ) ),
	dimensions: [ 'page' ],
};

const allUrls = [];

jQuery( document ).ready( function () {
	jQuery( '.gsc-url' ).each( function ( index ) {
		console.log( jQuery( this ).data( 'url' ) );
		allUrls.push( jQuery( this ).data( 'url' ) );
	} );
} );

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
	const _gapi = window.gapi; // set gapi globally

	// get settings
	apiFetch( { path: '/searchconsole/v1/settings/' } )
		.then( ( result ) => {
			token = result.token;
			chartQuery.siteUrl = result.site;
			gapi.load( 'client', start );
		} )
		.catch( ( error ) => console.log( error.responseText ) );
};

function start() {
	gapi.client.load( 'searchconsole', 'v1' ).then( () => {
		gapi.auth.setToken( token );
		getReport();
	} );
}

function getReport() {
	gapi.client.webmasters.searchanalytics
		.query( chartQuery )
		.then( function ( response ) {
			response.result.rows.forEach( function ( x ) {
				if ( allUrls.indexOf( x.keys[ 0 ] ) > -1 ) {
					jQuery( 'span[data-url="' + x.keys[ 0 ] + '"]' ).html(
						'<b>Clicks:</b> ' +
							x.clicks +
							'<br>' +
							'<b>Position:</b> ' +
							Math.round( x.position * 100 ) / 100 +
							'<br>' +
							'<b>CTR:</b> ' +
							Math.round( x.ctr * 10000 ) / 100 +
							'%' +
							'<br>' +
							'<b>Impressions:</b> ' +
							x.impressions
					);
				}
			} );
		} )
		.then( null, function ( err ) {
			console.log( err );
		} );
}

loadGoogleScript();
