import {
	Notice,
	Card,
	CardBody,
	CardHeader,
	__experimentalInputControl as InputControl
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	useState,
	Fragment,
	useEffect,
	RawHTML
} from '@wordpress/element';

import GoogleOauthButton from './oauth-button';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

import {
	useSelect,
	useDispatch,
	dispatch,
	select
} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const GoogleOAuth = ( props ) => {

	const { settings } = props;
	const credentials = settings?.credentials ?? { client_id: 'not working' };

	return (
		<Card>
			<CardHeader>
				{ __( 'Google Oauth', 'formello' ) }
			</CardHeader>

			<CardBody>

				<RawHTML>
					{ sprintf(
						/* translators: Addon license. */
						__(
							'<p>Your %s key provides access to addons. You can still using Formello without a license key.</p>',
							'formello'
						),
						`<strong>free license</strong>`
					) }
				</RawHTML>
				{
					(!credentials.client_id || !credentials.client_secret) &&
					<Notice status="warning" isDismissible={ false }>
						{ __( 'You must insert a Client Id and a Client secret to correctly request your authentication token.' ) }
					</Notice>
				}
				{
					credentials.client_id && credentials.client_secret &&
					<GoogleOAuthProvider clientId={ credentials.client_id }>
						<GoogleOauthButton {...props} />
					</GoogleOAuthProvider>
				}
			</CardBody>
		</Card>
	)
}

export default GoogleOAuth;