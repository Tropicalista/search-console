import { useDispatch } from '@wordpress/data';

import {
	Button,
	Flex,
	FlexItem,
	DatePicker,
	Dropdown,
} from '@wordpress/components';
import { dateI18n, format } from '@wordpress/date';
import DateDropdown from './datedropdown';

export function DateSelect( props ) {
	const { query } = props;

	const { setStartDate, setEndDate } = useDispatch( 'searchconsole' );

	return (
		<Flex>
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
								console.log(val)
								setStartDate( dateI18n( 'Y-m-d', val ) )
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
								setEndDate( dateI18n( 'Y-m-d', val ) )
							}
							isInvalidDate={ ( val ) =>
								new Date( val ) < new Date( query.startDate ) ||
								new Date( val ) > new Date()
							}
						/>
					) }
				/>
			</FlexItem>
			<FlexItem>
				<DateDropdown />
			</FlexItem>
		</Flex>
	);
}
