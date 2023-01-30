import { useState, render, hydrate } from '@wordpress/element';

import Widget from './widget/index';

const App = (props) => {

	return <Widget />

}

window.addEventListener( 'DOMContentLoaded', () => {
	render( <App />, document.getElementById('search-console-widget') );
} );