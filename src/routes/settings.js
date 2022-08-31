import {
	BaseControl,
	Button,
	PanelRow,
	Placeholder,
	Spinner,
	TextControl,
	__experimentalInputControl as InputControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Notices } from '@wordpress/data';

import {
	useState,
	Fragment,
	useEffect
} from '@wordpress/element';

import Chooser from '../settings/chooser'
import Advanced from '../settings/advanced'
import Verification from '../settings/verification'

import {
	useSelect,
	useDispatch,
	dispatch,
	select
} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import OAuth2Login from 'react-simple-oauth2-login';

const Settings = ( props ) => {

    const [ loading, setLoading ] = useState( false );

	const { settings } = useSelect( ( select ) => { 
		return { 
			settings:  select( 'searchconsole' ).getSettings(),
		}
	}, [] );

	const { setSettings, setSetting } = useDispatch( 'searchconsole' );

	const saveSettings = (s) => {

		setLoading(true);
		apiFetch( {
			path: '/searchconsole/settings',
			method: 'POST',
			data: {
				settings: settings
			},
		} ).then( ( result ) => {
			setSetting( 'site', settings.site )
		} )
		.catch( ( error ) => {
			let errors = error.message

		} )
		.finally( () => setLoading(false) )
	}

	const getToken = (code) => {
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
		} )
		.catch( ( error ) => {
			let errors = error.message
			createNotice( 'error', error.message )
			console.log(error)
		} )
		.finally( () => setLoading(false) )
	}

    const revokeToken = () => {
		let cred = gapi.client.getToken();
		console.log(cred)
		if (cred !== null) {
			//google.accounts.oauth2.revoke(cred.access_token, () => {console.log('Revoked: ' + cred.access_token)});
			gapi.client.setToken( '' );
			deleteToken();
		}
    }

    const deleteToken = () => {
		setLoading(true)
		apiFetch( {
			path: '/searchconsole/revoke',
			method: 'POST'
		} ).then( ( result ) => {
			// save token in store
			setSetting( 'token', '' )
		} )
		.catch( ( error ) => {
			let errors = error.message
			createNotice( 'error', error.message )
			console.log(error)
		} )
		.finally( () => setLoading(false) )
    }

	const onSuccess = response => {
		setSetting( 'token', response.access_token )
	};
	const onFailure = response => console.error(response);

	if( !Object.keys(settings).length ){
		return <Spinner />
	}

	return (
		<div className='search-console-settings'>

			<OAuth2Login
				className={ 'components-button is-primary' }
				buttonText={ 'Authenticate' }
				authorizationUrl="https://accounts.google.com/o/oauth2/auth"
				scope='https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification'
				responseType="code"
				clientId={ settings.client_id }
				redirectUri={ settings.redirect_uri }
				extraParams={{ approval_prompt: 'force', access_type: 'offline' }}
				isCrossOrigin={ true }
				onSuccess={onSuccess}
				onFailure={onFailure}/>
			
			{
				'' !== settings.token &&
				<Button 
					aria-disabled={ loading } 
					isBusy={ loading } 
					onClick={ revokeToken }
				>
					{ __( 'Revoke token', 'search-console' ) }
				</Button>
			}

			{ '' !== settings.token ? <Chooser token={ settings.token } settings={ settings } /> : null }
			{ '' !== settings.token ? <Verification token={ settings.token } settings={ settings } /> : null }

			<Advanced settings={ settings } />

			<Button 
				aria-disabled={ loading } 
				isPrimary 
				isBusy={ loading } 
				onClick={ saveSettings }
			>
				{ __( 'Save', 'search-console' ) }
			</Button>

		</div>
	)
}

export default Settings;