import { useState, createContext, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import { dateI18n } from '@wordpress/date';

export const SettingsContext = createContext();

function SettingsContextProvider( props ) {
	const defaultSettings = {
		credentials: {},
		token: false,
		site: '',
		siteVerification: '',
		postTypes: [],
		meta: '',
	};

	const defaultQuery = {
		customDate: false,
		dimension: 'query',
		searchType: 'web',
		startDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 29 )
		),
		endDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 1 )
		),
		dimensionFiltersGroup: {
			filters: [],
		},
	};

	const [ settingsSaved, setSettingsSaved ] = useState( false );
	const [ settings, setSettings ] = useState( defaultSettings );
	const [ query, setQuery ] = useState( defaultQuery );
	const [ loading, setLoading ] = useState( false );
	const [ ready, setReady ] = useState( false );

	const getSettings = () => {
		apiFetch( { path: '/searchconsole/v1/settings/' } )
			.then( ( options ) => {
				setSettings( options );
			} )
			.then( () => setReady( true ) );
	};

	const saveSettings = () => {
		setLoading( true );
		apiFetch( {
			path: '/searchconsole/v1/settings/',
			method: 'POST',
			data: { settings },
		} ).then( () => setLoading( false ) );
	};

	const saveToken = ( token ) => {
		apiFetch( {
			path: '/searchconsole/v1/save/token/',
			method: 'POST',
			data: { token },
		} ).then( () => setLoading( false ) );
	};

	const updateSetting = ( key, value ) => {
		setSettings( { ...settings, [ key ]: value } );
	};

	const updateQuery = ( key, value ) => {
		setQuery( { ...query, [ key ]: value } );
	};

	useEffect( () => {
		getSettings();
	}, [] );

	useEffect( () => {
		const handleClientLoad = async () =>
			await window.gapi.load( 'client', initClient );

		const initClient = () => {
			window.gapi.client.load( 'searchconsole', 'v1' ).then( () => {
				window.gapi.client.init( {
					token: settings.token,
				} );
			} );
			// eslint-disable-next-line no-console
			console.log( 'Google loaded' );
		};

		const script = document.createElement( 'script' );

		script.src = 'https://apis.google.com/js/api.js';
		script.async = true;
		script.defer = true;
		script.onload = handleClientLoad;

		document.body.appendChild( script );

		return () => {
			document.body.removeChild( script );
		};
	}, [] );

	return (
		<SettingsContext.Provider
			value={ {
				query,
				updateQuery,
				saveToken,
				settings,
				settingsSaved,
				setSettingsSaved,
				updateSetting,
				setSettings,
				saveSettings,
				loading,
				ready,
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
}

export default SettingsContextProvider;
