import {
	useContext,
	createContext,
	useMemo,
	useState,
} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { useLoadGapi } from './use-load-gapi';

const GapiContext = createContext();

export function GapiProvider( options ) {
	const { token, discoveryDocs, children } = options;

	const [ ready, setReady ] = useState();
	const [ settings, setSettings ] = useEntityProp( 'root', 'site', 'popper' );
	const { createNotice } = useDispatch( noticesStore );
	const { saveEditedEntityRecord } = useDispatch( coreDataStore );

	const loadDiscovery = () => {
		window.gapi.client
			.init( {
				discoveryDocs,
			} )
			.then( () => {
				setReady( true );
			} );
	};

	const setToken = () => {
		window.gapi.client.setToken( token );
	};

	const loadClient = () => {
		window.gapi.load( 'client', loadDiscovery );
	};

	const scriptLoadedSuccessfully = useLoadGapi( {
		onScriptLoadSuccess: loadClient,
	} );

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
				saveEditedEntityRecord( 'root', 'site' );
				setToken();
			} )
			.catch( ( error ) => {
				createNotice(
					'error',
					'⚠️ ' + error.message.error_description,
					{
						type: 'snackbar',
						explicitDismiss: true,
					}
				);
			} );
	};

	const handleError = ( err ) => {
		if (
			err.result.error.code === 401 ||
			( err.result.error.code === 403 &&
				err.result.error.status === 'PERMISSION_DENIED' )
		) {
			refreshToken();
		} else {
			createNotice( 'error', '⚠️ ' + err.result.error.message, {
				type: 'snackbar',
				explicitDismiss: true,
			} );
		}
	};

	const contextValue = useMemo(
		() => ( {
			ready,
			scriptLoadedSuccessfully,
			handleError,
			refreshToken,
		} ),
		[ scriptLoadedSuccessfully, ready ]
	);

	return (
		<GapiContext.Provider value={ contextValue }>
			{ children }
		</GapiContext.Provider>
	);
}

export function useGapi() {
	const context = useContext( GapiContext );
	if ( ! context ) {
		throw new Error( 'Gapi components must be used within GapiProvider' );
	}
	return context;
}
