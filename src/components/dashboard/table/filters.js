import {
	Button,
	Dropdown,
	MenuItem,
	MenuGroup,
	Icon,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { closeSmall, plus } from '@wordpress/icons';

import { useState, Fragment, useContext } from '@wordpress/element';

import { MyModal } from './modals';
import { DateSelect } from './dateselect';
import { SettingsContext } from '../../../context/settings-context';

const ENTER = 'Enter';
const SPACE = ' ';

export function Filters() {
	const [ showModal, setShowModal ] = useState( false );
	const { query, updateQuery } = useContext( SettingsContext );

	const onRequestClose = () => {
		setShowModal( false );
	};

	const remove = ( filter ) => {
		updateQuery( 'dimensionFilterGroups', {
			...query.dimensionFilterGroups,
			filters: query.dimensionFilterGroups.filters.filter(
				( prevItem ) => prevItem !== filter
			),
		} );
	};

	const setType = ( type ) => {
		updateQuery( 'type', type );
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
					<Dropdown
						popoverProps={ { placement: 'bottom-start' } }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								variant="primary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
							>
								{ __( 'Search type: ', 'search-console' ) +
									query.type }
							</Button>
						) }
						renderContent={ ( { onToggle } ) => (
							<MenuGroup>
								<MenuItem
									onClick={ () => {
										setType( 'web' );
										onToggle();
									} }
								>
									{ __( 'Web', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setType( 'image' );
										onToggle();
									} }
								>
									{ __( 'Image', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setType( 'video' );
										onToggle();
									} }
								>
									{ __( 'Video', 'search-console' ) }
								</MenuItem>
								<MenuItem
									onClick={ () => {
										setType( 'news' );
										onToggle();
									} }
								>
									{ __( 'News', 'search-console' ) }
								</MenuItem>
							</MenuGroup>
						) }
					/>
					<Dropdown
						className="my-container-class-name"
						contentClassName="my-popover-content-classname"
						placement="bottom right"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								variant="secondary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
								icon={ plus }
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
					{ query.dimensionFilterGroups.filters.map(
						( filter, i ) => (
							<div
								className={
									'dataviews-filter-summary__chip-container'
								}
								key={ i }
							>
								<div
									className="dataviews-filter-summary__chip has-reset"
									role="button"
									tabIndex="0"
									aria-pressed="false"
									aria-expanded="false"
									onClick={ () =>
										setShowModal( filter.dimension )
									}
									onKeyDown={ ( event ) => {
										if (
											[ ENTER, SPACE ].includes(
												event.key
											)
										) {
											setShowModal( filter.dimension );
											event.preventDefault();
										}
									} }
								>
									{ filter.dimension +
										': ' +
										getSign( filter ) +
										filter.expression }
									<button
										className={
											'dataviews-filter-summary__chip-remove has-values'
										}
										onClick={ ( e ) => {
											e.stopPropagation();
											remove( filter );
										} }
									>
										<Icon icon={ closeSmall } />
									</button>
								</div>
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
