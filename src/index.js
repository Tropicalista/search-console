import { __ } from '@wordpress/i18n';

import { createRoot, useEffect, useState } from '@wordpress/element';
import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';

import menuFix from './utils/menuFix';
import './style.scss';
import './store';

import Dashboard from './routes/dashboard';
import Settings from './routes/settings';
import Header from './components/Header';
import Footer from './components/Footer';
import { getQueryArg } from '@wordpress/url';
import SettingsContextProvider from './context/settings-context';

const App = () => {
	const initialPath = getQueryArg( window.location.href, 'page' );

	const navigator = useNavigator();

	/*const handleChange = () => {
		const path = getQueryArg( window.location.href, 'subpage' );
		navigator.goTo( path ? '/' + path : '/' );
		console.log( path ? '/' + path : '/' );
	};

	useEffect( () => {
		window.addEventListener( 'locationchange', handleChange );

		return () =>
			window.removeEventListener( 'locationchange', handleChange );
	}, [] );*/

	return (
		<NavigatorProvider
			initialPath={ '/' + initialPath }
		>
			<Header title={ 'Search Console' } />
			<SettingsContextProvider>
				<NavigatorScreen path="/search-console">
					<Dashboard />
				</NavigatorScreen>
				<NavigatorScreen path="/search-console-settings">
					<Settings />
				</NavigatorScreen>
			</SettingsContextProvider>
			<Footer />
		</NavigatorProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-wrapper' );
	const root = createRoot( domNode );
	root.render( <App /> );
} );

// fix the admin menu for the slug "search-console"
menuFix( 'search-console' );
