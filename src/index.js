import { __ } from '@wordpress/i18n';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/loading-spinner.js';

import { useState, render, useEffect } from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';

import menuFix from './utils/menuFix';
import './style.scss';
import './store';

import Dashboard from './routes/dashboard';
import Settings from './routes/settings';
import Header from './components/Header';
import apiFetch from '@wordpress/api-fetch';
import { gapi } from 'gapi-script';

const App = () => {

	const { settings, isReady } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings() ?? null,
			isReady: select( 'searchconsole' ).isReady(),
		};
	}, [] );

	const { setSettings, setSites } = useDispatch( 'searchconsole' );

	const [ mounted, setMounted ] = useState( false );
	const token = settings?.token ?? false;

	useEffect( () => {
		if ( ! token ) {
			return;
		}

		gapi.load( 'client:auth', () => {
			gapi.client.load( 'searchconsole', 'v1' ).then( () => {
				gapi.auth.setToken( token );
				setMounted( true );
				getSites()
			} );
		} );
	}, [ token ] );

	const refreshToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} )
			.then( ( result ) => {
				console.log( result );
				setSettings( {
					...settings,
					token: result,
				} );
				gapi.auth.setToken( result );
			} )
			.catch( ( error ) => {
				console.log( error );
			} )
			.finally( () => setMounted( true ) );
	};

	const getSites = () => {
		const sites = [];

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
			.catch( () => refreshToken() );
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
								gapi={ gapi }
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
			</HashRouter>
		</React.StrictMode>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	render( <App />, document.getElementById( 'search-console-wrapper' ) );
} );

// fix the admin menu for the slug "search-console"
menuFix( 'search-console' );
