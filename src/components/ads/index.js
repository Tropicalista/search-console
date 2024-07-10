import { Card } from '@wordpress/components';
import { useState } from '@wordpress/element';
import SlideShow from './slideshow';
import { useSelect } from '@wordpress/data';

const Ads = ( props ) => {
	const { plugins } = useSelect( ( select ) => {
		const myPlugins = select( 'core' ).getPlugins( { per_page: -1 } );
		return {
			plugins: myPlugins?.filter( ( plugin ) => {
				return [
					'formello/formello2',
					'popper/popper2',
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
				<SlideShow plugins={ plugins } { ...props } />
			</div>
		</Card>
	);
};

export default Ads;
