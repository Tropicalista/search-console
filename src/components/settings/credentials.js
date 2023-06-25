import { TextControl, Card, CardBody, CardHeader } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';

const Credentials = ( props ) => {

	const { setSettings } = useDispatch( 'searchconsole' );

	const { settings, isReady } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings(),
			isReady: select( 'searchconsole' ).isReady(),
		};
	}, [] );

	function setCredentials( key, val ) {
		const credentials = Object.assign( {}, settings.credentials );

		setSettings( {
			...settings,
			credentials: {
				...credentials,
				[ key ]: val,
			},
		} );
	}

	const authUrl = sprintf(
		'https://developers.google.com/web/site-kit?sitename=%s&siteurl=%s',
		settings.title,
		settings.wp_url
	);

	return (
		<Card>
			<CardHeader>
				{ __( 'Google Credentials', 'search-console' ) }
			</CardHeader>

			<CardBody>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							'<p>You need to create a <a target="_blank" href="%s">Google Developer Console</a> account before proceeding to authorization.</p>',
							'formello'
						),
						`https://console.developers.google.com/`
					) }
				</RawHTML>

				<RawHTML>
					{ sprintf(
						/* translators: Google Site Kit url. */
						__(
							'<p>The simplest way to get your own credentials is to go to <a target="_blank" href="%s">Google Site Kit</a> site and follow step. Don\'t forget to add your site url as authorized Javascript origin.</p>',
							'formello'
						),
						authUrl
					) }
				</RawHTML>

				<TextControl
					placeholder={ 'CLIENT ID' }
					value={ settings?.credentials?.client_id }
					label={ __( 'Client ID', 'search-console' ) }
					help={ __(
						'Please go to Developer Console to obtain your credentials.',
						'search-console'
					) }
					onChange={ ( val ) => {
						setCredentials( 'client_id', val );
					} }
				/>
				<TextControl
					placeholder={ 'CLIENT SECRET' }
					value={ settings?.credentials?.client_secret }
					label={ __( 'Client secret', 'search-console' ) }
					help={ __(
						'Please go to Developer Console to obtain your credentials.',
						'search-console'
					) }
					onChange={ ( val ) => {
						setCredentials( 'client_secret', val );
					} }
				/>
			</CardBody>
		</Card>
	);
};

export default Credentials;
