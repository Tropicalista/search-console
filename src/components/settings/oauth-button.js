import { Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useContext } from '@wordpress/element';
import { useGoogleLogin } from '@react-oauth/google';
import apiFetch from '@wordpress/api-fetch';
import { SettingsContext } from '../../context/settings-context';
import { hasGrantedAnyScopeGoogle } from '@react-oauth/google';

const GoogleOauthButton = () => {
	const { updateSetting, settings } = useContext( SettingsContext );

	const [ message, setMessage ] = useState( false );

	const hasAccess = hasGrantedAnyScopeGoogle(
		settings.token,
		'https://www.googleapis.com/auth/webmasters.readonly'
	);

	const googleLogin = useGoogleLogin( {
		flow: 'auth-code',
		onSuccess: async ( { code } ) => {
			getToken( code );
		},
		scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification',
	} );

	const getToken = ( code ) => {
		apiFetch( {
			path: '/searchconsole/v1/credentials',
			method: 'POST',
			data: {
				code,
			},
		} )
			.then( ( result ) => {
				updateSetting( 'token', result );
				setMessage( {
					status: 'success',
					text: __( 'Logged in', 'search-console' ),
				} );
			} )
			.catch( ( error ) => {
				setMessage( {
					status: 'error',
					text: error.message,
				} );
			} )
			.finally( () => console.log( 'Success' ) );
	};

	return (
		<Fragment>
			<Button
				variant="primary"
				onClick={ () => googleLogin() }
				icon={ 'google' }
			>
				{ __( 'Login with Google', 'search-console' ) }
			</Button>
			{ hasAccess && (
				<Notice status="success" isDismissible={ false }>
					{ __( "You're logged in", 'search-console' ) }
				</Notice>
			) }
			{ message && (
				<Notice status={ message.status } isDismissible={ false }>
					{ message.text }
				</Notice>
			) }
		</Fragment>
	);
};

export default GoogleOauthButton;
