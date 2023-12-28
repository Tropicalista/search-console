import { Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useContext } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { SettingsContext } from '../../context/settings-context';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const GoogleOauthButton = () => {
	const { updateSetting, email, settings, revokeToken } =
		useContext( SettingsContext );

	const [ message, setMessage ] = useState( false );

	const googleLogin = useGoogleLogin( {
		flow: 'auth-code',
		onSuccess: async ( { code } ) => {
			getToken( code );
		},
		scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification email',
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
					text: __( "You're logged in", 'search-console' ),
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
				{ email || __( 'Login with Google', 'search-console' ) }
			</Button>
			{ settings.token.refresh_token && (
				<p>
					<Button
						text={ __( 'Revoke token', 'search-console' ) }
						onClick={ () => revokeToken() }
						isDestructive
						isSmall
					/>
				</p>
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
