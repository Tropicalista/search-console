import { useState, createRoot, useEffect } from '@wordpress/element';
import Widget from './widget';
import LoadingSpinner from '../components/loading-spinner.js';
import SettingsContextProvider from '../context/settings-context';
import { MyChart } from '../components/dashboard/chart';

const App = () => {
	return (
		<SettingsContextProvider>
			<Widget />
		</SettingsContextProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-widget' );
	const root = createRoot( domNode );
	root.render( <App /> );
} );
