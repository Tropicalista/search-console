import { useState, render, hydrate } from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import Widget from './widget/index';
import LoadingSpinner from '../components/loading-spinner.js';

const App = (props) => {

	const { settings, isReady, query } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings(),
			isReady: select( 'searchconsole' ).isReady(),
			query: select( 'searchconsole' ).getQuery(),
		};
	}, [] );

    if ( !isReady ) {
        return (
            <LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
        );
    }

	return <Widget />

}

window.addEventListener( 'DOMContentLoaded', () => {
	render( <App />, document.getElementById('search-console-widget') );
} );