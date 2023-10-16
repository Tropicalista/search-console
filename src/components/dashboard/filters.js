import { Button, Dropdown, MenuItem, MenuGroup } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { useState, Fragment, useContext } from '@wordpress/element';

import { MyModal } from './modals';
import { DateSelect } from './dateselect';
import { SettingsContext } from '../../context/settings-context';

export function Filters() {
	const [ showModal, setShowModal ] = useState( false );
	const { query, updateQuery } = useContext( SettingsContext );

	const onRequestClose = () => {
		setShowModal( false );
	};

	const remove = ( filter ) => {
		updateQuery( 'dimensionFiltersGroup', {
			...query.dimensionFiltersGroup,
			filters: query.dimensionFiltersGroup.filters.filter(
				( prevItem ) => prevItem !== filter
			),
		} );
	};

	const getSign = ( filter ) => {
		if ( ! filter.operator ) {
			return '';
		}
		// eslint-disable-next-line no-nested-ternary
		return 'EQUALS' === filter.operator
			? ''
			: 'CONTAINS' === filter.operator
			? '+'
			: '-';
	};

	return (
		<Fragment>
			<div className="search-console-filters">
				<div className={ 'search-console-filters-options' }>
					<Button
						variant="primary"
						onClick={ () => setShowModal( 'searchType' ) }
					>
						{ __( 'Search type: ', 'search-console' ) +
							query.searchType }
					</Button>
					<Dropdown
						className="my-container-class-name"
						contentClassName="my-popover-content-classname"
						placement="bottom right"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								variant="secondary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
								icon={ 'plus' }
								iconPosition={ 'right' }
								text={ __( 'New', 'search-console' ) }
							/>
						) }
						renderContent={ ( { onToggle } ) => (
							<MenuGroup>
								<MenuItem
									onClick={ () => {
										setShowModal( 'query' );
										onToggle();
									} }
								>
									{ __( 'Query', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setShowModal( 'page' );
										onToggle();
									} }
								>
									{ __( 'Page', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setShowModal( 'country' );
										onToggle();
									} }
								>
									{ __( 'Country', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setShowModal( 'device' );
										onToggle();
									} }
								>
									{ __( 'Device', 'search-console' ) }
								</MenuItem>
							</MenuGroup>
						) }
					/>
					{ query.dimensionFiltersGroup.filters.map(
						( filter, i ) => (
							<div className={ 'button-group' } key={ i }>
								<Button
									variant="primary"
									onClick={ () =>
										setShowModal( filter.dimension )
									}
								>
									{ filter.dimension +
										': ' +
										getSign( filter ) +
										filter.expression }
								</Button>
								<Button
									variant="primary"
									onClick={ () => remove( filter ) }
								>
									x
								</Button>
							</div>
						)
					) }
				</div>
				<div>
					<DateSelect query={ query } />
				</div>
			</div>
			{ showModal && (
				<MyModal
					onRequestClose={ onRequestClose }
					modal={ showModal }
					title={ showModal }
				/>
			) }
		</Fragment>
	);
}
