import { Button, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect, select, useDispatch } from '@wordpress/data';
import { dateI18n } from '@wordpress/date';

export default function DateDropdown( props ) {
	const { setStartDate } = useDispatch( 'searchconsole' );

	const [ range, setRange ] = useState(
		__( 'Last 28 days', 'search-console' )
	);

	const setDate = ( num, period ) => {
		const date = moment()
			.subtract( num, period )
			.format( 'YYYY-MM-DD' );
		setRange( 'Last ' + num + ' ' + period );
		setStartDate( date );
	};

	const setMonth = () => {
		const start = moment().startOf('month')
		console.log( start.subtract(1, 'month') )
	}

	return (
		<Dropdown
			className="my-container-class-name"
			contentClassName="my-popover-content-classname"
			placement="bottom right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					isSecondary
					onClick={ onToggle }
					aria-expanded={ isOpen }
				>
					{ range }
				</Button>
			) }
			renderContent={ ( { isOpen, onToggle } ) => (
				<Fragment>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setDate( 7, 'days' ), onToggle();
							} }
						>
							{ __( 'Last 7 days', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 28, 'days' ), onToggle();
							} }
						>
							{ __( 'Last 28 days', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 1, 'months' ), onToggle();
							} }
						>
							{ __( 'Last month', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 3, 'months' ), onToggle();
							} }
						>
							{ __( 'Last 3 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 6, 'months' ), onToggle();
							} }
						>
							{ __( 'Last 6 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 12, 'months' ), onToggle();
							} }
						>
							{ __( 'Last 12 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 16, 'months' ), onToggle();
							} }
						>
							{ __( 'Last 18 months', 'search-console' ) }
						</MenuItem>
					</MenuGroup>
				</Fragment>
			) }
		/>
	);
}
