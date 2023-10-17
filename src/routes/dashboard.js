import { __ } from '@wordpress/i18n';
import {
	Card,
	CardBody,
	Notice,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseNavigator as useNavigator,
	Button,
} from '@wordpress/components';
import { useContext, createInterpolateElement } from '@wordpress/element';
import LoadingSpinner from '../components/loading-spinner.js';
import { MyChart } from '../components/dashboard/chart/index.js';
import { MyTable } from '../components/dashboard/table';
import { Filters } from '../components/dashboard/filters';
import Ads from '../components/ads/index';
import { SettingsContext } from '../context/settings-context';

const Dashboard = () => {
	const navigator = useNavigator();
	const { settings, ready } = useContext( SettingsContext );

	if ( ! ready ) {
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
						navigator.goTo( '/search-console-settings' )
					}
					variant="link"
				/>
			),
		} );

	if ( ! settings.token || ! settings.token?.refresh_token ) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<p>
					{ noticeString(
						__(
							'Please provide an API key on <a />.',
							'tropical-juice'
						)
					) }
				</p>
			</Notice>
		);
	}

	if (
		! settings.credentials?.client_secret ||
		! settings.credentials?.client_id
	) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<p>
					{ noticeString(
						__(
							'Please provide an API key on <a />.',
							'tropical-juice'
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
						__( 'Please select a site on <a />.', 'tropical-juice' )
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
			<Ads />
			<Card>
				<CardBody>
					<Filters />
				</CardBody>
			</Card>
			<Card>
				<CardBody>
					<MyTable />
				</CardBody>
			</Card>
		</div>
	);
};

export default Dashboard;
