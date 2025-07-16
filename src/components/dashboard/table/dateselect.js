import {
	Button,
	Flex,
	FlexItem,
	DatePicker,
	Dropdown,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { dateI18n, format } from '@wordpress/date';
import DateDropdown from './datedropdown';
import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { SettingsContext } from '../../../context/settings-context';

export function DateSelect() {
	const { query, updateQuery, settings } = useContext( SettingsContext );

	return (
		<HStack justify="flex-end">
			{ settings.customDate && (
				<Fragment>
					<div>
						<b>From:</b>
					</div>
					<div>
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
					</div>
					<div>
						<b>To:</b>
					</div>
					<div>
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
					</div>
				</Fragment>
			) }
			<div>
				<DateDropdown />
			</div>
		</HStack>
	);
}
