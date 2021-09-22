import {
	BaseControl,
	Button,
	Notice,
	PanelRow,
	Placeholder,
	Spinner,
	TextControl,
	__experimentalInputControl as InputControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	useState,
	Fragment
} from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';
import Chooser from './chooser'

import {
	useSelect,
	useDispatch,
	dispatch,
	select
} from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

const Auth = ( props ) => {

	const { settings } = props;

	const { setSettings, setSetting } = useDispatch( 'searchconsole' );

	const [ token, setToken ] = useState( false );
	const [ active, setActive ] = useState( false );
	const [ code, setCode ] = useState( '' );
    const [ loading, setLoading ] = useState( false );

	const { createNotice, removeNotice } = useDispatch( noticesStore );

	const authenticate = () => {
		window.open( settings.authUrl, '', 'width=400,height=600' )
		setActive(true)
	}

	const getToken = () => {
		if ( '' === code ) {
			createNotice( 'error', __( 'Empty code', 'search-console' ) )
			return 
		}
		setLoading(true)
		apiFetch( {
			path: '/searchconsole/credentials',
			method: 'POST',
			data: {
				code: code
			},
		} ).then( ( result ) => {
			// save token in store
			setSetting( 'token', result.access_token)
			// save token in DB
			saveToken(result)
		} )
		.catch( ( error ) => {
			let errors = error.message
			createNotice( 'error', error.message )
			console.log(error)
		} )
		.finally( () => setLoading(false) )
	}

	// save token in DB
	const saveToken = ( token ) => {
		settings.token = token
		apiFetch( {
			path: '/searchconsole/settings',
			method: 'POST',
			data: {
				settings: settings
			},
		} ).then( ( result ) => {
			setActive( false )
		} )
		.catch( ( error ) => {
			let errors = error.message
			console.log(error)
		} )
	}

	const revokeToken = () => {
		setSetting( 'token', '' )
		apiFetch( {
			path: '/searchconsole/revoke',
			method: 'POST',
		} ).then( ( result ) => {
			setActive( false )
		} )
		.catch( ( error ) => {
			let errors = error.message
			console.log(error)
		} )

	}

	return (
		<Fragment>
			{
				settings.token === '' ?
					<div>
						<p>
							<Button isPrimary={ true } onClick={ authenticate }>Get authorization code</Button>
						</p>
					{   active && 
						<InputControl 
							label={ __( 'Authorization code', 'search-console' ) }
							value={ code }
							onChange={ (val) => setCode( val ) }
							labelPosition="top"
							suffix={ 
								<Button 
									isPrimary={ true } 
									isBusy={ loading }
									aria-disabled={ loading }
									onClick={ getToken }>{ __( 'Authenticate', 'search-console' ) }
								</Button>
							}
						/>
					}
					</div>
				:
				<Fragment>
				<div className="components-base-control">
					<Button isSecondary={ true } onClick={ revokeToken }>{ __( 'Revoke token', 'search-console' ) }</Button>
				</div>
				<hr />
				</Fragment>
			}
		</Fragment>
	)
}

export default Auth;