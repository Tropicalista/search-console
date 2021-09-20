import Options from './ChartOptions'
import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';

import {
    useState,
    render,
    Fragment,
    useEffect,
    useMemo
} from '@wordpress/element'

import {
    Button,
    DateTimePicker,
    DatePicker,
    Dropdown,
    __experimentalInputControl as InputControl
} from '@wordpress/components';

export function DateSelect ( props ) {

    const [ dateStart, setDateStart ] = useState( moment().subtract(1, 'months') );
    const [ dateEnd, setDateEnd ] = useState( moment() );

	return (
		<Fragment>
            <InputControl
                value={ dateStart + '-' + dateEnd }
                onChange={ ( nextValue ) => setValue( nextValue ) }
                suffix={ 
                    <Dropdown
                        className="search-console-calendar-dropdown"
                        contentClassName="search-console-calendar-dropdown"
                        position="bottom right"
                        renderToggle={ ( { isOpen, onToggle } ) => (
                            <Button 
                                isSmall
                                icon={ 'calendar-alt' } 
                                onClick={ onToggle }
                                aria-expanded={ isOpen }
                            />
                        ) }
                        renderContent={ () => (
                            <div className="search-console-calendar">
                                <DatePicker
                                    currentDate={ dateStart }
                                    onChange={ ( newDate ) => setDateStart( newDate ) }
                                    isDayHighlighted ={ (r) => console.log(r) }
                                />
                                <DatePicker
                                    currentDate={ dateEnd }
                                    onChange={ ( newDate ) => setDateEnd( newDate ) }
                                    isDayHighlighted ={ (r) => console.log(r) }
                                />
                            </div>
                        ) }
                    />
                }
            />
		</Fragment>		
	)
}