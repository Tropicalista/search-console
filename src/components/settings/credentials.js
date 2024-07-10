import { TextControl, Card, CardBody, CardHeader } from '@wordpress/components';

import { __, sprintf } from '@wordpress/i18n';
import { RawHTML, useContext } from '@wordpress/element';
import { SettingsContext } from '../../context/settings-context';

const Credentials = () => {
	const { settings, updateSetting } = useContext( SettingsContext );

	function setCredentials( key, val ) {
		const credentials = Object.assign( {}, settings.credentials );
		credentials[ key ] = val;

		updateSetting( 'credentials', credentials );
	}

	const authUrl = sprintf(
		'https://developers.google.com/web/site-kit',
		settings.title,
		settings.wp_url
	);

	return (
		<Card>
			<CardHeader>
				<b>{ __( 'Google Credentials', 'search-console' ) }</b>
			</CardHeader>

			<CardBody>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							'<p>You need to create a <a target="_blank" href="%1$s">Google Developer Console</a> account before proceeding to authorization.</p>',
							'search-console'
						),
						`https://console.developers.google.com/`,
						settings.wp_url
					) }
				</RawHTML>

				<RawHTML>
					{ sprintf(
						/* translators: Google Site Kit url. */
						__(
							'<p><b>Tip</b>: the simplest way to get your own credentials is to go to <a target="_blank" href="%s">Google Site Kit</a> site and follow step. Don\'t forget to add your site url as authorized Javascript origin.</p>',
							'search-console'
						),
						authUrl
					) }
				</RawHTML>

				<TextControl
					placeholder={ 'CLIENT ID' }
					value={ settings?.credentials?.client_id ?? '' }
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
					value={ settings?.credentials?.client_secret ?? '' }
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
