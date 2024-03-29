/**
 * WordPress dependencies
 */
import { Fragment, useState, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Modal, Flex } from '@wordpress/components';
import SearchType from './modals/searchtype';
import Device from './modals/device';
import Country from './modals/country';
import Page from './modals/page';
import Query from './modals/query';
import { SettingsContext } from '../../context/settings-context';

export function MyModal( props ) {
	const { onRequestClose, modal, title } = props;
	const { query, updateQuery } = useContext( SettingsContext );

	const [ filter, setFilter ] = useState(
		query.dimensionFiltersGroup.filters.find(
			( f ) => f.dimension === modal
		)
	);

	const [ searchType, setSearchType ] = useState( query.searchType );

	const handleChange = ( expression, operator ) => {
		if ( 'searchType' === modal ) {
			setSearchType( expression );
		} else {
			setFilter( {
				dimension: modal,
				expression,
				operator,
			} );
		}
	};

	const saveChange = () => {
		if ( 'searchType' === modal ) {
			updateQuery( 'searchType', searchType );
		} else {
			const newFilters = [
				filter,
				...query.dimensionFiltersGroup.filters.filter(
					( item ) => item.dimension !== modal
				),
			];
			updateQuery( 'dimensionFiltersGroup', {
				...query.dimensionFiltersGroup,
				filters: newFilters,
			} );
		}
		onRequestClose();
	};

	const modals = {
		searchType: SearchType,
		device: Device,
		country: Country,
		page: Page,
		query: Query,
	};

	const ModalFilter = modals[ modal ];

	return (
		<Modal title={ title } onRequestClose={ onRequestClose }>
			<Fragment>
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
							'searchType' === modal
								? false
								: ! filter?.expression
						}
					>
						{ __( 'Save', 'search-console' ) }
					</Button>
				</Flex>
			</Fragment>
		</Modal>
	);
}
