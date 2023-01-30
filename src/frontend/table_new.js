import { useState, render, hydrate } from '@wordpress/element';

const App = (props) => {
	console.log(props)
	return <td className="search-console column-search-console">Ciao</td>
}

window.addEventListener( 'DOMContentLoaded', () => {
	hydrate( <App />, document.getElementsByClassName('gsc-url') );
} );