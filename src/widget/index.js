import { createRoot } from '@wordpress/element';
import Widget from './widget';
import SettingsContextProvider from '../context/settings-context';
import { GapiProvider } from '../context/gapi';

const App = () => {
	return (
		<SettingsContextProvider>
			<GapiProvider
				discoveryDocs={ [
					'https://www.googleapis.com/discovery/v1/apis/searchconsole/v1/rest',
				] }
			>
				<Widget />
			</GapiProvider>
		</SettingsContextProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-widget' );
	const root = createRoot( domNode );
	root.render( <App /> );
} );
