import { __ } from '@wordpress/i18n';
import { Card, CardBody, Notice } from '@wordpress/components';

import { useState, RawHTML, Fragment, useEffect } from '@wordpress/element';

import LoadingSpinner from '../components/loading-spinner.js';

import { MyChart } from '../components/dashboard/chart';
import { MyTable } from '../components/dashboard/table';
import { Filters } from '../components/dashboard/filters';
import Ads from '../components/ads/index';

import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';
import { gapi } from 'gapi-script';

const Dashboard = ( props ) => {
	const { refreshToken, settings } = props;
	const token = settings?.token ?? false;

	const { query } = useSelect( ( select ) => {
		return {
			query: select( 'searchconsole' ).getQuery(),
		};
	}, [] );

    if ( token && ! gapi?.client ) {
        return (
            <LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
        );
    }

	if ( ! token || ! settings?.site || ! settings?.credentials?.client_secret || ! settings?.credentials?.client_id ) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							'<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',
							'formello'
						),
						`#/settings`
					) }
				</RawHTML>
			</Notice>
		);
	}

	return (
		<div className={ 'search-console-dashboard' }>
			<Card>
				<CardBody>
					<MyChart
						gapi={ gapi }
						token={ token }
						query={ query }
						site={ settings.site }
						refreshToken={ refreshToken }
					/>
				</CardBody>
			</Card>
			<Ads />
			<Card>
				<CardBody>
					<Filters />
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<MyTable
						gapi={ gapi }
						token={ token }
						query={ query }
						site={ settings.site }
						refreshToken={ refreshToken }
					/>
				</CardBody>
			</Card>
		</div>
	);
};

export default Dashboard;
