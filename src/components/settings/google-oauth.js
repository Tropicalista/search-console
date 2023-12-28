import { Notice, Card, CardBody, CardHeader } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { useContext } from '@wordpress/element';
import { SettingsContext } from '../../context/settings-context';

import GoogleOauthButton from './oauth-button';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleOAuth = ( props ) => {
	const { settings } = useContext( SettingsContext );

	return (
		<Card>
			<CardHeader>{ __( 'Google Oauth', 'search-console' ) }</CardHeader>

			<CardBody>
				{ ( ! settings?.credentials?.client_id?.length ||
					! settings?.credentials?.client_secret?.length ) && (
					<Notice status="warning" isDismissible={ false }>
						{ __(
							'You must insert a Client Id and a Client secret to correctly request your authentication token.',
							'search-console'
						) }
					</Notice>
				) }
				{ settings?.credentials?.client_id &&
					settings?.credentials?.client_secret && (
						<GoogleOAuthProvider
							clientId={ settings?.credentials?.client_id }
						>
							<GoogleOauthButton { ...props } />
						</GoogleOAuthProvider>
					) }
			</CardBody>
		</Card>
	);
};

export default GoogleOAuth;
