import { useState, createContext, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { dateI18n } from '@wordpress/date';
import { __ } from '@wordpress/i18n';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

export const SettingsContext = createContext();

function SettingsContextProvider( props ) {
	const defaultQuery = {
		customDate: false,
		type: 'web',
		startDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 29 )
		),
		endDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 1 )
		),
		dimensions: [ 'QUERY' ],
		fields: 'rows',
		dimensionFilterGroups: {
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

	const { saveEditedEntityRecord } = useDispatch( coreStore );
	const { createNotice } = useDispatch( noticesStore );

	const saveSettings = async () => {
		return saveEditedEntityRecord( 'root', 'site' )
			.then( () => {
				createNotice(
					'info',
					'🎯 ' + __( 'Settings saved.', 'formello' ),
					{
						type: 'snackbar',
					}
				);
			} )
			.catch( ( error ) => {
				createNotice( 'error', '⚠️ ' + error.message, {
					type: 'snackbar',
					explicitDismiss: true,
				} );
			} );
	};

	const showError = ( error ) => {
		if ( 401 !== error.status ) {
			createNotice( 'error', '⚠️ ' + error.result.error.message, {
				type: 'snackbar',
				explicitDismiss: true,
			} );
		}
		if ( 401 === error.status ) {
			refreshToken();
		}
	};

	const { isSaving, hasEdits } = useSelect(
		( select ) => ( {
			isSaving: select( coreStore ).isSavingEntityRecord(
				'root',
				'site'
			),
			hasEdits: select( coreStore ).hasEditsForEntityRecord(
				'root',
				'site',
				undefined,
				'search_console'
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
		window.gapi.client.setToken( window.search_console.token );
		window.gapi.client.load( 'searchconsole', 'v1' ).then( () => {
			check();
		} );
	};

	const check = () => {
		setReady( true );
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
				hasEdits,
				showError,
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
}

export default SettingsContextProvider;
