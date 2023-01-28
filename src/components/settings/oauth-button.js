import {
	Button,
	Notice,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
	Fragment,
	RawHTML,
	useEffect
} from '@wordpress/element';
import classnames from 'classnames';

import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';

import {
	useSelect,
	useDispatch,
	dispatch,
	select
} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';


const GoogleOauthButton = ( props ) => {

	const { settings } = props;

    const { setSettings } = useDispatch( 'searchconsole' );

	const googleLogin = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: async ({ code }) => {
			getToken(code)
		},
		scope: 'https://www.googleapis.com/auth/webmasters.readonly'
	});

	const getToken = (code) => {
		apiFetch( {
			path: '/searchconsole/v1/credentials',
			method: 'POST',
			data: {
				code: code
			},
		} ).then( ( result ) => {
			console.log( result )
			setSettings( {
				...settings,
				token: result,
			} );
		} )
		.catch( ( error ) => {
			console.log(error)
		} )
		.finally( () => console.log(233323) )
	}

	return (
		<Fragment>
			<Button
				isPrimary
				onClick={ () => googleLogin() }
				icon={ 'google' }
			>
				{ __( 'Login with Google', 'search-console' ) }
			</Button>
		</Fragment>
	)
}

export default GoogleOauthButton;