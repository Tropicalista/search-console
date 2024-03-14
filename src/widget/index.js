import { createRoot } from '@wordpress/element';
import Widget from './widget';
import SettingsContextProvider from '../context/settings-context';

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
