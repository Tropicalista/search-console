import { useDispatch, select } from '@wordpress/data';

import {
	Button,
	Flex,
	FlexItem,
	DatePicker,
	Dropdown,
} from '@wordpress/components';
import { dateI18n, format } from '@wordpress/date';
import DateDropdown from './datedropdown';
import { Fragment, useContext } from '@wordpress/element';
import { SettingsContext } from '../../context/settings-context';

export function DateSelect() {
	const { query, updateQuery, settings } = useContext( SettingsContext );

	return (
		<Flex>
			{ settings.customDate && (
				<Fragment>
					<FlexItem>
						<b>From:</b>
					</FlexItem>
					<FlexItem>
						<Dropdown
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									variant="secondary"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								>
									{ query.startDate
										? format( 'F j, Y', query.startDate )
										: __(
												'Click here to set start date.',
												'search-console'
										  ) }
								</Button>
							) }
							renderContent={ () => (
								<DatePicker
									__nextRemoveHelpButton
									currentDate={ query.startDate }
									onChange={ ( val ) => {
										console.log( val );
										updateQuery(
											'startDate',
											dateI18n( 'Y-m-d', val )
										);
									} }
									isInvalidDate={ ( val ) => {
										if ( query.endDate ) {
											return (
												new Date( val ) >
												new Date( query.endDate )
											);
										}
									} }
								/>
							) }
						/>
					</FlexItem>
					<FlexItem>
						<b>To:</b>
					</FlexItem>
					<FlexItem>
						<Dropdown
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									variant="secondary"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								>
									{ query.endDate
										? format( 'F j, Y', query.endDate )
										: __(
												'Click here to set end date.',
												'search-console'
										  ) }
								</Button>
							) }
							renderContent={ () => (
								<DatePicker
									__nextRemoveHelpButton
									currentDate={ query.endDate }
									onChange={ ( val ) =>
										updateQuery(
											'endDate',
											dateI18n( 'Y-m-d', val )
										)
									}
									isInvalidDate={ ( val ) =>
										new Date( val ) <
											new Date( query.startDate ) ||
										new Date( val ) > new Date()
									}
								/>
							) }
						/>
					</FlexItem>
				</Fragment>
			) }
			<FlexItem>
				<DateDropdown />
			</FlexItem>
		</Flex>
	);
}
