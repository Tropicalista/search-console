import {
	Notice,
	Card,
	CardBody,
	CardHeader,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { useState, Fragment, useEffect, RawHTML } from '@wordpress/element';

import GoogleOauthButton from './oauth-button';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const GoogleOAuth = ( props ) => {

	const { settings, isReady } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings(),
			isReady: select( 'searchconsole' ).isReady(),
		};
	}, [] );

	return (
		<Card>
			<CardHeader>{ __( 'Google Oauth', 'formello' ) }</CardHeader>

			<CardBody>
				{ ( ! settings?.credentials?.client_id ||
					! settings?.credentials?.client_secret ) && (
					<Notice status="warning" isDismissible={ false }>
						{ __(
							'You must insert a Client Id and a Client secret to correctly request your authentication token.'
						) }
					</Notice>
				) }
				{ settings?.credentials?.client_id && settings?.credentials?.client_secret && (
					<GoogleOAuthProvider clientId={ settings?.credentials?.client_id }>
						<GoogleOauthButton { ...props } />
					</GoogleOAuthProvider>
				) }
			</CardBody>
		</Card>
	);
};

export default GoogleOAuth;
