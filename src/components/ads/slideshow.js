import { useState, useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { Button, __experimentalHStack as HStack } from '@wordpress/components';

const myAds = [
	{
		name: 'Systeme.io',
		ad: __(
			'Free online marketing platform with funnel builder. Create popup, squeeze page, funnel automations all for FREE.',
			'search-console'
		),
		link: 'https://systeme.io/?sa=sa0181820865b77bd583c54e7e7668a6a77e78f1c7',
		isLink: true,
	},
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

const SlideShow = ( { plugins, direction, noSlide } ) => {
	const [ currentIndex, setCurrentIndex ] = useState( 0 );
	const [ slides, setSlides ] = useState( [] );
	const { saveEntityRecord } = useDispatch( coreStore );

	useEffect( () => {
		init();
	}, [] );

	useEffect( () => {
		if ( noSlide ) {
			return;
		}
		const timer = setInterval( () => {
			goToNextSlide();
		}, 5000 ); // Change slide every 5 seconds

		return () => clearInterval( timer );
	} );

	const init = () => {
		const match = myAds.filter( ( ad ) => {
			return plugins?.find( ( p ) => p.name === ad.name ) ? false : true;
		} );
		setSlides( match );
	};

	const installPlugin = ( slug ) => {
		saveEntityRecord( 'root', 'plugin', {
			slug,
			status: 'active',
		} );
	};

	const goToNextSlide = () => {
		if ( slides.length > 1 ) {
			const nextIndex = ( currentIndex + 1 ) % slides.length;
			setCurrentIndex( nextIndex );
		}
	};

	const setMargin = ( index ) => {
		if ( 0 === index ) {
			const margin =
				currentIndex > 0
					? '-' + ( 100 / slides.length ) * currentIndex + '%'
					: 0;
			return margin;
		}
	};

	return (
		<div
			className="slideshow-container"
			style={ {
				width: `calc( 100% * ${ slides.length })`,
			} }
		>
			{ slides.map( ( plugin, index ) => {
				return (
					<div
						key={ index }
						className={ `slide ${
							index === currentIndex ? 'active' : ''
						}` }
						style={ {
							width: `calc( 100% / ${ slides.length })`,
							marginLeft: setMargin( index ),
						} }
					>
						<HStack justify="flex-start" direction={ direction }>
							<span>{ plugin.ad }</span>
							{ plugin.isLink ? (
								<Button
									variant="primary"
									size="small"
									text={ __(
										'Try now FREE!',
										'search-console'
									) }
									href={ plugin.link }
									target="_blank"
									icon="megaphone"
								/>
							) : (
								<Button
									variant="primary"
									size="small"
									text={ __( 'Install', 'search-console' ) }
									onClick={ () =>
										installPlugin( plugin.slug )
									}
								/>
							) }
						</HStack>
					</div>
				);
			} ) }
		</div>
	);
};

export default SlideShow;
