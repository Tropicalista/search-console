/**
 * WordPress dependencies
 */
import { RawHTML, useContext } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { MyChart } from '../components/dashboard/chart';
import LoadingSpinner from '../components/loading-spinner.js';
import { SettingsContext } from '../context/settings-context';
import '../store';

const Widget = () => {
	const { settings, ready } = useContext( SettingsContext );
	const settingsUrl = addQueryArgs( 'admin.php', {
		page: 'search-console',
	} );

	if ( ! ready ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	if (
		! settings?.site ||
		! settings?.credentials?.client_secret ||
		! settings?.credentials?.client_id
	) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							'<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',
							'formello'
						),
						settingsUrl + '#/settings'
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
						'<p>More data on <a href="%s">Search Console dashboard</a>.</p>',
						'formello'
					),
					settingsUrl + '#/'
				) }
			</RawHTML>
		</div>
	);
};

export default Widget;
