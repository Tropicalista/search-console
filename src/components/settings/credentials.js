import {
	TextControl,
	Card,
	CardBody,
	CardHeader,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';
import {
	RawHTML
} from '@wordpress/element';

import GoogleOauthButton from './oauth-button';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const Credentials = ( props ) => {

	const { settings } = props;
	const credentials = settings?.credentials ?? {};
    const { setSettings } = useDispatch( 'searchconsole' );

	function setCredentials( key, val ) {
		setSettings( {
			...settings,
			credentials: {
				...credentials,
				[key]: val
			},
		} );
	}

	return (
		<Card>
			<CardHeader>
				{ __( 'Google Credentials', 'search-console' ) }
			</CardHeader>

			<CardBody>

				<RawHTML>
					{ sprintf(
						/* translators: Addon license. */
						__(
							'<p>You need to create a %s account before proceeding to authorization.</p>',
							'formello'
						),
						`<a>Google Search Console</a>`
					) }
				</RawHTML>

                <TextControl
                    placeholder={ 'CLIENT ID' }
                    value={ credentials.client_id || '' }
                    label={ __( 'Client ID', 'search-console' ) }
                    help={ __( 'Please go to Developer Console to set up your credentials.', 'search-console' ) }
                    onChange={ (val) => {
                        setCredentials( 'client_id', val )
                    } }
                />
                <TextControl
                    placeholder={ 'CLIENT SECRET' }
                    value={ credentials.client_secret || '' }
                    label={ __( 'Client secret', 'search-console' ) }
                    help={ __( 'Please go to Developer Console to set up your credentials.', 'search-console' ) }
                    onChange={ (val) => {
                        setCredentials( 'client_secret', val )
                    } }
                />
			</CardBody>
		</Card>
	)
}

export default Credentials;