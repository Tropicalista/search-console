import { createRoot, useEffect } from '@wordpress/element';
import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
} from '@wordpress/components';
import { RouterProvider, useLocation, useHistory } from './router';
import { getQueryArg } from '@wordpress/url';

import './style.scss';
import './store';

import Dashboard from './routes/dashboard';
import Settings from './routes/settings';
import Header from './components/Header';
import Footer from './components/Footer';
import SettingsContextProvider from './context/settings-context';

const Router = () => {
	const history = useHistory();
	const { params } = useLocation();

	const menuRoot = document.querySelector( '#toplevel_page_search-console' );
	const reset = () => {
		const page = getQueryArg( window.location.href, 'page' );
		if ( ! page ) {
			return;
		}
		for ( const child of menuRoot.querySelectorAll( 'a' ) ) {
			const target = getQueryArg( child.href, 'page' );
			if ( page === target ) {
				child.classList.add( 'current' );
				child.parentElement.classList.add( 'current' );
			} else {
				child.classList.remove( 'current' );
				child.parentElement.classList.remove( 'current' );
			}
		}
	};

	const handleChange = ( e ) => {
		e.preventDefault();

		history.push( {
			page: getQueryArg( e.target.href, 'page' ),
		} );
		reset();
	};

	useEffect( () => {
		reset();
		menuRoot.addEventListener( 'click', handleChange, false );

		return () => {
			menuRoot.removeEventListener( 'click', handleChange );
		};
	}, [] );

	if ( 'search-console-settings' === params.page ) {
		return <Settings />;
	}
	return <Dashboard />;
};

const App = () => {
	return (
		<RouterProvider>
			<Header title={ 'Search Console' } />
			<SettingsContextProvider>
				<Router />
			</SettingsContextProvider>
			<Footer />
		</RouterProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-wrapper' );
	const root = createRoot( domNode );

	root.render( <App /> );
} );
