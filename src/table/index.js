import { loadGoogleScript } from './loadGapi';
import { dateI18n } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';
import './app';

const elements = document.getElementsByClassName(
	'search-console column-search-console'
);

Array.from( elements ).forEach( function ( element ) {
	const children = element.querySelector( 'span.gsc-url' );

	element.addEventListener( 'click', ( e ) => {
		const url = children.getAttribute( 'data-url' );
		const urlFound = new CustomEvent( 'search-console-details', {
			bubbles: true,
			detail: {
				url,
			},
		} );
		window.dispatchEvent( urlFound );
	} );
} );

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
	const batchPrev = window.gapi.client.newBatch();

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
		batchPrev.add(
			window.gapi.client.webmasters.searchanalytics.query( {
				...chartQuery,
				dimensionFilterGroups: req,
				startDate: dateI18n(
					'Y-m-d',
					new Date().setDate( new Date().getDate() - 57 )
				),
				endDate: dateI18n(
					'Y-m-d',
					new Date().setDate( new Date().getDate() - 30 )
				),
			} ),
			{
				id: url,
			}
		);
	}

	Promise.all( [ batch, batchPrev ] ).then( ( values ) => {
		const current = values[ 0 ].result;
		const previous = values[ 1 ].result;

		const result = {};

		for ( const url in current ) {
			if ( ! previous[ url ].result?.rows?.[ 0 ] ) {
				continue;
			}
			result[ url ] = {
				current: current[ url ].result.rows[ 0 ],
				previous: previous[ url ].result.rows[ 0 ],
			};

			if ( allUrls.indexOf( url ) > -1 && result[ url ] ) {
				window
					.jQuery( 'span[data-url="' + url + '"]' )
					.html( createReportHtml( result[ url ] ) );
			}
		}
	} );
}

const createReportHtml = ( { current, previous } ) => `
	<b>Clicks:</b> ${ current.clicks || 'n/a' } (${
		previous.clicks || 'n/a'
	})<br />
	<b>Position:</b> ${ Math.round( current.position * 100 ) / 100 || 'n/a' } (${
		Math.round( previous.position * 100 ) / 100 || 'n/a'
	})<br />
	<b>CTR:</b> ${ ( current.ctr * 100 ).toFixed( 2 ) + '%' || 'n/a' } (${
		( previous.ctr * 100 ).toFixed( 2 ) + '%' || 'n/a'
	})<br />
	<b>Impressions:</b> ${ current.impressions || 'n/a' } (${
		previous.impressions || 'n/a'
	})<br />`;
loadGoogleScript();
