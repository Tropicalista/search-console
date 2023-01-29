import { Button, Notice } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML, useEffect, useState } from '@wordpress/element';
import classnames from 'classnames';

import {
	GoogleLogin,
	GoogleOAuthProvider,
	useGoogleLogin,
	hasGrantedAllScopesGoogle,
} from '@react-oauth/google';

import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const GoogleOauthButton = ( props ) => {
	const { settings } = props;

	const [ message, setMessage ] = useState( false );
	const { setSettings } = useDispatch( 'searchconsole' );

	const googleLogin = useGoogleLogin( {
		flow: 'auth-code',
		onSuccess: async ( { code } ) => {
			getToken( code );
		},
		scope:
			'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification	',
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
				console.log( result );
				setSettings( {
					...settings,
					token: result,
				} );
				setMessage( {
					status: 'success',
					text: __( 'Logged in', 'search-console' ),
				} );
			} )
			.catch( ( error ) => {
				console.log( error );
				setMessage( {
					status: 'error',
					text: error.message,
				} );
			} )
			.finally( () => console.log( 233323 ) );
	};

	return (
		<Fragment>
			<Button isPrimary onClick={ () => googleLogin() } icon={ 'google' }>
				{ __( 'Login with Google', 'search-console' ) }
			</Button>
			{ message && (
				<Notice status={ message.status }>{ message.text }</Notice>
			) }
		</Fragment>
	);
};

export default GoogleOauthButton;
