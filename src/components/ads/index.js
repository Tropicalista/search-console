import { __, sprintf } from '@wordpress/i18n';
import {
	Card,
	CardBody,
	Button,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { store as blockDirectoryStore } from '@wordpress/block-directory';
import { useState, RawHTML, useEffect } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import SlideShow from './slideshow';
import { useSelect, useDispatch } from '@wordpress/data';

const Ads = () => {
	const { saveEntityRecord } = useDispatch( coreStore );

	const { plugins } = useSelect( ( select ) => {
		const myPlugins = select( 'core' ).getPlugins( { per_page: -1 } );
		return {
			plugins: myPlugins?.filter( ( plugin ) => {
				return [
					'formello/formello',
					'popper/popper',
					'pdf-embed/pdf-embed',
				].includes( plugin.plugin );
			} ),
		};
	} );

	const [ shown, setShown ] = useState( () => {
		// getting stored value
		const toShow = window.localStorage.getItem( 'sc-shown' );
		const initialValue = JSON.parse( toShow );
		return initialValue || new Date().getTime();
	} );

	if ( ! plugins ) {
		return null;
	}

	return (
		<Card>
			<div style={ { overflowX: 'hidden' } }>
				<SlideShow plugins={ plugins } />
			</div>
		</Card>
	);
};

export default Ads;
