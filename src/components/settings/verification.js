import {
	Button,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalInputControl as InputControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { Fragment, useContext } from '@wordpress/element';
import { SettingsContext } from '../../context/settings-context';

const Verification = () => {
	const { settings, updateSetting, refreshToken, saveSettings } =
		useContext( SettingsContext );

	const getMeta = () => {
		if ( settings.siteVerification && settings.site ) {
			window.gapi.client.load( 'siteVerification', 'v1' ).then( () => {
				window.gapi.client.siteVerification.webResource
					.getToken( {
						verificationMethod: 'META',
						site: {
							identifier: settings.site.replace(
								'sc-domain:',
								''
							),
							type: 'SITE',
						},
					} )
					.then( ( r ) => {
						updateSetting( 'meta', r.result.token );
						saveSettings();
					} )
					.catch( ( error ) => {
						if ( 401 === error.status ) {
							refreshToken();
						}
					} );
			} );
		}
	};

	return (
		<VStack>
			{ settings.site && (
				<Fragment>
					<p>
						{ __(
							'Do you want to add meta tag verification on your site?',
							'search-console'
						) }
					</p>
					<ToggleControl
						label={ __(
							'Add verification to site?',
							'search-console'
						) }
						help={ __(
							'Check this if you want output meta verification on frontend.',
							'search-console'
						) }
						checked={ settings.siteVerification }
						onChange={ ( val ) => {
							updateSetting( 'siteVerification', val );
							saveSettings();
						} }
						__nextHasNoMarginBottom
					/>
				</Fragment>
			) }
			{ settings.siteVerification && (
				<InputControl
					help={ __(
						'Please click on icon to generate your meta verification tag.',
						'search-console'
					) }
					label={ __(
						'Your meta verification tag',
						'search-console'
					) }
					value={ settings.meta }
					onChange={ ( val ) => {
						updateSetting( 'meta', val );
					} }
					suffix={ <Button onClick={ getMeta } icon={ 'update' } /> }
					__next40pxDefaultSize
				/>
			) }
		</VStack>
	);
};

export default Verification;
