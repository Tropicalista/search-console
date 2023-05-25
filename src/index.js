import { __ } from '@wordpress/i18n';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/loading-spinner.js';

import { useState, render, useEffect } from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';
import { Modal } from '@wordpress/components';

import menuFix from './utils/menuFix';
import './style.scss';
import './store';

import Dashboard from './routes/dashboard';
import Settings from './routes/settings';
import Header from './components/Header';
import Footer from './components/Footer';
import apiFetch from '@wordpress/api-fetch';
import { gapi } from 'gapi-script';

const App = () => {

	const [ gapiLoaded, setGapiLoaded ] = useState( false );

	const { settings, isReady } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings(),
			isReady: select( 'searchconsole' ).isReady(),
		};
	}, [] );

	const { setSettings, setSites } = useDispatch( 'searchconsole' );

	const token = settings?.token ?? false;

	useEffect( () => {

		if ( ! token ) {
			return;
		}

		loadGapi();

	}, [ token ] );

	const loadGapi = () => {
		if( gapi?.client ){
			return
		}
		gapi?.load( 'client', async () => {
			await gapi?.client?.load( 'searchconsole', 'v1' ).then( () => {
				gapi.client.init({
					token: token
				})
				getSites()
			} );
		} );
	}

	const refreshToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} )
			.then( ( result ) => {
				setSettings( {
					...settings,
					token: result,
				} );
				gapi.client.setToken( result );
			} )
			.catch( ( error ) => {
				console.log( error );
			} )
			.finally( () => console.log( 'refreshed' ) );
	};

	const getSites = () => {
		const sites = [{ value: '', label: __( 'Select a site', 'search-console' ) }];
		
		gapi.client.setToken( token );

		gapi.client?.webmasters.sites
			.list()
			.then( ( s ) => {
				s.result.siteEntry.map( ( t ) => {
					sites.push( { value: t.siteUrl, label: t.siteUrl } );
				} );
				sites.sort( function ( a, b ) {
					if ( a.value < b.value ) {
						return -1;
					}
					return 0;
				} );
				setSites( sites.sort() );
			} )
			.catch( (error) => {
				if ( 401 === error.status ) {
					refreshToken()
				}
			} );
	};

	if ( ! isReady ) {
		return <LoadingSpinner text={ __( 'Loading…', 'search-console' ) } />;
	}

	return (
		<React.StrictMode>
			<HashRouter basename="/">
				<Header title={ 'Search Console' } />
				<Routes>
					<Route
						path="/"
						element={
							<Dashboard
								settings={ settings }
								//gapi={ gapi }
								refreshToken={ refreshToken }
								getSites={ getSites }
							/>
						}
					/>
					<Route
						path="/settings"
						element={
							<Settings
								settings={ settings }
								gapi={ gapi }
								refreshToken={ refreshToken }
								getSites={ getSites }
							/>
						}
					/>
				</Routes>
				<Footer />
			</HashRouter>
		</React.StrictMode>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	render( <App />, document.getElementById( 'search-console-wrapper' ) );
} );

// fix the admin menu for the slug "search-console"
menuFix( 'search-console' );
