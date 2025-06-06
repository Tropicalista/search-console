/**
 * WordPress dependencies
 */
import { RawHTML, useContext } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { MyChart } from './chart';
import LoadingSpinner from '../components/loading-spinner.js';
import { SettingsContext } from '../context/settings-context';
import '../store';

const Widget = () => {
	const { settings } = useContext( SettingsContext );

	if ( ! settings ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	if (
		! settings?.site ||
		! settings?.credentials?.client_secret ||
		! settings?.credentials?.client_id ||
		! settings.token.refresh_token
	) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<RawHTML>
					{ sprintf(
						/* translators: Search console settings url. */
						__(
							'<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',
							'formello'
						),
						addQueryArgs( 'admin.php', {
							page: 'search-console-settings',
						} )
					) }
				</RawHTML>
			</Notice>
		);
	}

	return (
		<div>
			<MyChart />
			<RawHTML>
				{ sprintf(
					/* translators: Developer console url. */
					__(
						'More data on <a href="%s">Search Console dashboard</a>.',
						'formello'
					),
					addQueryArgs( 'admin.php', {
						page: 'search-console',
					} )
				) }
			</RawHTML>
		</div>
	);
};

export default Widget;
