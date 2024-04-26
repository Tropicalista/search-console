import { __ } from '@wordpress/i18n';
import { Card, CardBody, Notice, Button } from '@wordpress/components';
import { useContext, createInterpolateElement } from '@wordpress/element';
import LoadingSpinner from '../components/loading-spinner.js';
import { MyChart } from '../components/dashboard/chart/index.js';
import { Table } from '../components/dashboard/table/index.js';
import { Filters } from '../components/dashboard/table/filters.js';
import Ads from '../components/ads/index';
import { SettingsContext } from '../context/settings-context';
import { useHistory } from '../router';

const Dashboard = () => {
	const history = useHistory();
	const { settings, ready } = useContext( SettingsContext );

	if ( ! ready || ! settings ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	const noticeString = ( text ) =>
		createInterpolateElement( text, {
			a: (
				<Button
					text={ __( 'settings page', 'search-console' ) }
					onClick={ () =>
						history.push( { page: 'search-console-settings' } )
					}
					variant="link"
				/>
			),
		} );

	if ( ! settings.token || ! settings.token.refresh_token ) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<p>
					{ noticeString(
						__( 'Please authenticate on <a />.', 'search-console' )
					) }
				</p>
			</Notice>
		);
	}

	if (
		! settings.credentials.client_secret ||
		! settings.credentials.client_id
	) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<p>
					{ noticeString(
						__(
							'Please provide a Client Secret and a Client ID on <a />.',
							'search-console'
						)
					) }
				</p>
			</Notice>
		);
	}

	if ( ! settings.site ) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<p>
					{ noticeString(
						__( 'Please select a site on <a />.', 'search-console' )
					) }
				</p>
			</Notice>
		);
	}

	return (
		<div className={ 'search-console-dashboard' }>
			<Card>
				<CardBody>
					<MyChart />
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<Filters />
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<Table />
				</CardBody>
			</Card>
		</div>
	);
};

export default Dashboard;
