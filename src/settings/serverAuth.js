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

const ServerAuth = ( props ) => {

	const { settings } = props;

	const { setSettings, setSetting } = useDispatch( 'searchconsole' );

	const [ token, setToken ] = useState( false );
	const [ active, setActive ] = useState( false );
	const [ code, setCode ] = useState( '' );
    const [ loading, setLoading ] = useState( false );

	const authenticate = () => {
		window.open( settings.authUrl, '', 'width=400,height=600' )
		setActive(true)
	}

	const getToken = () => {
		if ( '' === code ) {
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
			<p>
				<Button isPrimary={ true } onClick={ authenticate }>Authenticate</Button>
			</p>
		</Fragment>
	)
}

export default ServerAuth;