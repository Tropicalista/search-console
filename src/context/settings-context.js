import { useState, createContext, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { dateI18n } from '@wordpress/date';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';

export const SettingsContext = createContext();

function SettingsContextProvider( props ) {
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

	const [ ready, setReady ] = useState( false );
	const [ query, setQuery ] = useState( defaultQuery );
	const [ loading, setLoading ] = useState( false );
	const [ email, setEmail ] = useState( false );

	const [ settings, setSettings ] = useEntityProp(
		'root',
		'site',
		'search_console'
	);

	const { saveEntityRecord } = useDispatch( coreStore );

	const saveSettings = () => {
		return saveEntityRecord( 'root', 'site', {
			search_console: settings,
		} );
	};

	const { isSaving } = useSelect(
		( select ) => ( {
			isSaving: select( coreStore ).isSavingEntityRecord(
				'root',
				'site'
			),
		} ),
		[]
	);

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
				window.gapi.client.setToken( result );
				loadSearchConsole();
			} )
			.catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.log( error );
				loadSearchConsole();
			} )
			// eslint-disable-next-line no-console
			.finally( () => setLoading( false ) );
	};

	const revokeToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/revoke',
			method: 'POST',
			data: {
				token: settings.token.refresh_token,
			},
		} ).then( () => {
			updateSetting( 'token', {
				access_token: '',
				expires_in: 3600,
				id_token: '',
				refresh_token: '',
				scope: '',
				token_type: '',
			} );
			setEmail( false );
		} );
	};

	const updateSetting = ( key, value ) => {
		setSettings( { ...settings, [ key ]: value } );
	};

	const updateQuery = ( key, value ) => {
		setQuery( { ...query, [ key ]: value } );
	};

	useEffect( () => {
		const handleClientLoad = async () =>
			await window.gapi.load( 'client', loadSearchConsole );

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

	const loadSearchConsole = () => {
		window.gapi.client.load( 'searchconsole', 'v1' ).then( () => {
			setReady( true );
		} );
	};

	return (
		<SettingsContext.Provider
			value={ {
				query,
				updateQuery,
				settings,
				updateSetting,
				setSettings,
				saveSettings,
				isSaving,
				ready,
				refreshToken,
				revokeToken,
				email,
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
}

export default SettingsContextProvider;
