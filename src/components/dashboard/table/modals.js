/**
 * WordPress dependencies
 */
import { useState, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	Button,
	Modal,
	Flex,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import Device from '../modals/device';
import Country from '../modals/country';
import Page from '../modals/page';
import Query from '../modals/query';
import { SettingsContext } from '../../../context/settings-context';

export function MyModal( props ) {
	const { onRequestClose, modal, title } = props;
	const { query, updateQuery } = useContext( SettingsContext );

	const [ filter, setFilter ] = useState( modal );

	const [ searchType, setSearchType ] = useState( query.searchType );

	const handleChange = ( expression, operator ) => {
		if ( 'searchType' === modal.dimension ) {
			setSearchType( expression );
		} else {
			setFilter( {
				dimension: modal.dimension,
				expression,
				operator,
			} );
		}
	};

	const saveChange = () => {
		if ( 'searchType' === modal.dimension ) {
			updateQuery( 'searchType', searchType );
		} else {
			const dimensions = [ ...query.dimensionFilterGroups ];

			const filtersArr = dimensions.map( ( dimension ) => {
				return dimension.filters;
			} );

			let filters = filtersArr.shift() || [];

			if ( ! filters.length ) {
				filters.push( filter );
			} else {
				const match = filters.find(
					( f ) => f.dimension === filter.dimension
				);
				// if not found we push
				if ( ! match ) {
					filters.push( filter );
				}
				if ( match ) {
					filters = filters.map( ( item ) =>
						item.dimension === filter.dimension ? filter : item
					);
				}
			}
			updateQuery( 'dimensionFilterGroups', [ { filters } ] );
		}
		onRequestClose();
	};

	const modals = {
		device: Device,
		country: Country,
		page: Page,
		query: Query,
	};

	const ModalFilter = modals[ modal.dimension ];

	return (
		<Modal title={ title } onRequestClose={ onRequestClose }>
			<VStack>
				<div className={ 'search-console-modal-container' }>
					<ModalFilter
						handleChange={ handleChange }
						searchType={ searchType }
						filter={ filter }
					/>
				</div>

				<Flex>
					<Button isDestructive={ true } onClick={ onRequestClose }>
						{ __( 'Cancel', 'search-console' ) }
					</Button>

					<Button
						variant="primary"
						onClick={ saveChange }
						disabled={
							'searchType' === modal.dimension
								? false
								: ! filter?.expression
						}
					>
						{ __( 'Save', 'search-console' ) }
					</Button>
				</Flex>
			</VStack>
		</Modal>
	);
}
