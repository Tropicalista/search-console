import { useState, createContext, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalUseNavigator as useNavigator } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { getQueryArg } from '@wordpress/url';

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
		apiFetch( { path: '/searchconsole/v1/settings/' } ).then(
			( options ) => {
				setSettings( options );
			}
		);
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

	const refreshToken = () => {
		setLoading( true );
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} )
			.then( ( result ) => {
				setSettings( {
					...settings,
					token: result,
				} );
				saveToken( result );
				window.gapi.client.setToken( result );
			} )
			.catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.log( error );
			} )
			// eslint-disable-next-line no-console
			.finally( () => setLoading( false ) );
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
				setReady( true );
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

	const navigator = useNavigator();

	const handleChange = ( e ) => {
		const slug = getQueryArg( e.detail, 'page' );
		const url = new URL( window.location );
		url.searchParams.set( 'page', slug );
		window.history.pushState( null, '', url.toString() );

		navigator.goTo( '/' + slug );
	};

	const handlePopstate = ( e ) => {
		const slug = getQueryArg( e.target.location, 'page' );
		navigator.goTo( '/' + slug );
	};

	useEffect( () => {
		window.addEventListener( 'changePage', handleChange );
		window.addEventListener( 'popstate', handlePopstate );

		return () => {
			window.removeEventListener( 'changePage', handleChange );
			window.removeEventListener( 'popstate', handlePopstate );
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
				refreshToken,
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
}

export default SettingsContextProvider;
