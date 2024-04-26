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

	const { isFormelloInstalled, isFormelloActive, plugins } = useSelect(
		( select ) => {
			const formello = select( 'core' ).getPlugin( 'formello/formello' );
			const myPlugins = select( 'core' ).getPlugins( { per_page: -1 } );
			return {
				isFormelloInstalled: formello,
				isFormelloActive: formello?.status === 'active',
				plugins: myPlugins?.filter( ( plugin ) => {
					return [
						'formello/formello',
						'popper/popper',
						'pdf-embed/pdf-embed',
					].includes( plugin.plugin );
				} ),
			};
		}
	);

	const installPlugin = ( slug ) => {
		saveEntityRecord( 'root', 'plugin', {
			slug,
			status: 'active',
		} );
	};

	const [ shown, setShown ] = useState( () => {
		// getting stored value
		const toShow = window.localStorage.getItem( 'sc-shown' );
		const initialValue = JSON.parse( toShow );
		return initialValue || new Date().getTime();
	} );

	if ( ! plugins || ( isFormelloInstalled && isFormelloActive ) ) {
		return null;
	}

	return (
		<Card>
			<CardBody>
				<SlideShow plugins={ plugins } />
				<HStack alignment="left">
					<RawHTML>
						{ sprintf(
							/* translators: Formello url. */
							__(
								`<p>Do you need a POPUP plugin? Check <a href="%s" target="_blank">Popper</a> to create beautiful popups.`,
								'search-console'
							),
							'https://wordpress.org/plugins/popper/'
						) }
					</RawHTML>
					<Button
						variant="primary"
						isSmall
						onClick={ () => {
							installPlugin();
						} }
						disabled={ false }
						isBusy={ false }
					>
						{ __( 'Install Formello', 'search-console' ) }
					</Button>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default Ads;
