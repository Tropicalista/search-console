import { Button, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { Fragment, useState, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';
import { SettingsContext } from '../../context/settings-context';

export default function DateDropdown() {
	const { customDate, updateQuery, updateSetting, settings } =
		useContext( SettingsContext );

	const [ range, setRange ] = useState(
		__( 'Last 28 days', 'search-console' )
	);

	const setDate = ( num, period ) => {
		const date = moment()
			.subtract( 2, 'days' )
			.subtract( num, period )
			.format( 'YYYY-MM-DD' );
		setRange( 'Last ' + num + ' ' + period );
		updateSetting( 'customDate', false );
		updateQuery( 'startDate', date );
	};

	return (
		<Dropdown
			className="my-container-class-name"
			contentClassName="my-popover-content-classname"
			placement="bottom right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button
					variant="secondary"
					onClick={ onToggle }
					aria-expanded={ isOpen }
				>
					{ customDate
						? __( 'Custom date', 'search-console' )
						: range }
				</Button>
			) }
			renderContent={ ( { onToggle } ) => (
				<Fragment>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setDate( 7, 'days' );
								onToggle();
							} }
						>
							{ __( 'Last 7 days', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 28, 'days' );
								onToggle();
							} }
						>
							{ __( 'Last 28 days', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 1, 'months' );
								onToggle();
							} }
						>
							{ __( 'Last month', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 3, 'months' );
								onToggle();
							} }
						>
							{ __( 'Last 3 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 6, 'months' );
								onToggle();
							} }
						>
							{ __( 'Last 6 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 12, 'months' );
								onToggle();
							} }
						>
							{ __( 'Last 12 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								setDate( 16, 'months' );
								onToggle();
							} }
						>
							{ __( 'Last 18 months', 'search-console' ) }
						</MenuItem>
						<MenuItem
							onClick={ () => {
								updateSetting(
									'customDate',
									! settings.customDate
								);
								onToggle();
							} }
						>
							{ __( 'Custom date', 'search-console' ) }
						</MenuItem>
					</MenuGroup>
				</Fragment>
			) }
		/>
	);
}
