import { createRoot, useEffect, Fragment } from '@wordpress/element';
import { getQueryArg } from '@wordpress/url';
import {
	Card,
	CardHeader,
	CardBody,
	Navigator,
	SnackbarList,
	Button,
	useNavigator,
} from '@wordpress/components';
import './style.scss';
import { Dashboard, Settings } from './routes';
import SettingsContextProvider from './context/settings-context';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { Menu } from './components/menu';
import { Header } from './components/header';
import { useEntityProp } from '@wordpress/core-data';
import { LoadingSpinner } from './components/loading-spinner';
import { GapiProvider } from './context/gapi';

function Notifications() {
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);
	const { removeNotice } = useDispatch( noticesStore );
	const snackbarNotices = notices.filter(
		( { type } ) => type === 'snackbar'
	);

	return (
		<SnackbarList notices={ snackbarNotices } onRemove={ removeNotice } />
	);
}

function GoToSettings() {
	const navigator = useNavigator();
	return (
		<Card>
			<CardHeader>{ __( 'Missing settings', 'search-console' ) }</CardHeader>
			<CardBody>
				{ __(
					'Please set your settings first.',
					'search-console'
				) }
				<p>
					<Button
						variant="primary"
						onClick={ () =>
							navigator.goTo( '/settings', {
								skipFocus: true,
							} )
						}
						size="small"
						text={ __( 'Go to settings', 'search-console' ) }
					/>
				</p>
			</CardBody>
		</Card>
	);
}

const App = () => {
	const [ settings ] = useEntityProp( 'root', 'site', 'search_console' );

	if ( ! settings ) {
		return <LoadingSpinner text={ __( 'Loading…', 'search-console' ) } />;
	}
	const tab = getQueryArg( window.location.href, 'subpage' );

	return (
		<SettingsContextProvider>
			<GapiProvider
				discoveryDocs={ [
					'https://www.googleapis.com/discovery/v1/apis/searchconsole/v1/rest',
					'https://www.googleapis.com/discovery/v1/apis/siteVerification/v1/rest',
				] }
			>
				<Navigator
					initialPath={ tab ? `/${ tab }` : '/dashboard' }
					className="container"
				>
					<div className="sidebar">
						<Header text="Search Console" />
						<Menu />
					</div>
					<div className="content">
						<Navigator.Screen path={ '/dashboard' }>
						{
							settings?.token ?
							<Dashboard />
							:
							<GoToSettings />
						}
						</Navigator.Screen>
						<Navigator.Screen path={ '/settings' }>
							<Settings />
						</Navigator.Screen>					
					</div>
				</Navigator>
				<Notifications />
			</GapiProvider>
		</SettingsContextProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-wrapper' );
	const root = createRoot( domNode );

	root.render( <App /> );
} );
