import { useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

const myPlugins = [
	{
		name: 'Formello',
		ad: __(
			'Lightweight Gutenberg contact form builder, blazingly fast with no external dependencies and ReCaptcha support.',
			'search-console'
		),
		slug: 'formello',
	},
	{
		name: 'Popper',
		ad: __(
			'Do you need a POPUP plugin? Check Popper a Popup builder with exit-intent powered by Gutenberg.',
			'search-console'
		),
		slug: 'popper',
	},
	{
		name: 'Pdf Embed',
		ad: __(
			'A Gutenberg block to embed your PDF with official Adobe API.',
			'search-console'
		),
		slug: 'pdf-embed',
	},
];

const SlideShow = ( { plugins } ) => {
	const [ currentIndex, setCurrentIndex ] = useState( 0 );
	const [ data, setData ] = useState( [] );
	const { saveEntityRecord } = useDispatch( coreStore );

	useEffect( () => {
		//init();
	}, [] );

	useEffect( () => {
		const timer = setInterval( () => {
			goToNextSlide();
		}, 3000 ); // Change slide every 3 seconds

		return () => clearInterval( timer );
	}, [ currentIndex ] );

	const init = () => {
		const arr = [];
		for ( const plugin of myPlugins ) {
			getPluginData( plugin ).then( ( res ) => {
				arr.push( res );
				setData( arr );
			} );
		}
	};

	const getPluginData = async ( plugin ) => {
		const response = await fetch(
			`https://api.wordpress.org/plugins/info/1.0/${ plugin }.json`
		);
		const result = await response.json();
		return result;
	};

	const installPlugin = ( slug ) => {
		saveEntityRecord( 'root', 'plugin', {
			slug,
			status: 'active',
		} );
	};

	const goToNextSlide = () => {
		const nextIndex = ( currentIndex + 1 ) % myPlugins.length;
		setCurrentIndex( nextIndex );
	};

	return (
		<div className="slideshow-container">
			{ myPlugins.map( ( plugin, index ) => {
				const notShow = plugins?.find(
					( p ) => p.name === plugin.name
				);
				if ( notShow ) {
					return null;
				}
				return (
					<div
						key={ index }
						className={ `slide ${
							index === currentIndex ? 'active' : ''
						}` }
						//style={ { backgroundImage: `url(${ slide })` } }
					>
						<h4>{ plugin.name }</h4>
						<p>{ plugin.ad }</p>
					</div>
				);
			} ) }
		</div>
	);
};

export default SlideShow;
