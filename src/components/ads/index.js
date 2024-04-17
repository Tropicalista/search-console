import { __, sprintf } from '@wordpress/i18n';
import {
	Card,
	CardBody,
	Button,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { store as blockDirectoryStore } from '@wordpress/block-directory';
import { useState, RawHTML, Fragment, useEffect } from '@wordpress/element';
import { getBlockTypes } from '@wordpress/blocks';

import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';

const Ads = () => {
	const [ loading, setLoading ] = useState( false );
	const { installBlockType } = useDispatch( blockDirectoryStore );

	const { isFormelloInstalled, isFormelloActive } = useSelect( ( select ) => {
		const formello = select( 'core' ).getPlugin( 'formello/formello' );
		return {
			isFormelloInstalled: formello,
			isFormelloActive: formello?.status === 'active',
		};
	} );

	const { block } = useSelect( ( select ) => {
		const { getDownloadableBlocks } = select( blockDirectoryStore );
		const blocks = getDownloadableBlocks( 'block:formello/form' ).filter(
			( { name } ) => 'formello/form' === name
		);
		return {
			block: blocks.length && blocks[ 0 ],
		};
	} );

	const isInstallingBlock = useSelect(
		( select ) => select( blockDirectoryStore ).isInstalling( block.id ),
		[ block.id ]
	);

	const [ shown, setShown ] = useState( () => {
		// getting stored value
		const shown = localStorage.getItem( 'sc-shown' );
		const initialValue = JSON.parse( shown );
		return initialValue || new Date().getTime();
	} );

	if ( isFormelloInstalled && isFormelloActive ) {
		return null;
	}

	return (
		<Card>
			<CardBody>
				<HStack alignment="left">
					<RawHTML>
						{ sprintf(
							/* translators: Formello url. */
							__(
								`<p>Do you need a FREE seo tool? Check <a href="%s" target="_blank">SeoJuice.it</a> to manage all your SEO tasks.`,
								'search-console'
							),
							'https://seojuice.it/?refid=299'
						) }
					</RawHTML>
					<Button
						variant="primary"
						isSmall
						onClick={ () => {
							installBlockType( block ).then( () =>
								setLoading( true )
							);
						} }
						disabled={ isInstallingBlock }
						isBusy={ isInstallingBlock }
					>
						{ __( 'Install Formello', 'search-console' ) }
					</Button>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default Ads;
