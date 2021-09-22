import { Button, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    useSelect,
    select,
    useDispatch
} from '@wordpress/data';

export default function DateDropdown ( props ) {

    const { setStartDate } = useDispatch( 'searchconsole' );

    const [ range, setRange ] = useState( __( 'Last 28 days', 'search-console' ) );

    const setDate = ( num, period ) => {
        let date = moment().subtract( num + 2, period ).format('YYYY-MM-DD')
        setRange( 'Last ' + num + ' ' + period );
        setStartDate( date )
    }

    return (
        <Dropdown
            className="my-container-class-name"
            contentClassName="my-popover-content-classname"
            position="bottom right"
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
                        <MenuItem onClick={ () => { setDate( 7, __( 'days' ) ), onToggle() } }>
                            { __( 'Last 7 days', 'search-console' ) }
                        </MenuItem>
                        <MenuItem onClick={ () => { setDate( 28, __( 'days' ) ), onToggle() } }>
                            { __( 'Last 28 days', 'search-console' ) }
                        </MenuItem>
                        <MenuItem onClick={ () => { setDate( 3, __( 'months', 'search-console' ) ), onToggle() } }>
                            { __( 'Last 3 months', 'search-console' ) }
                        </MenuItem>
                        <MenuItem onClick={ () => { setDate( 6, __( 'months', 'search-console' ) ), onToggle() } }>
                            { __( 'Last 6 months', 'search-console' ) }
                        </MenuItem>
                        <MenuItem onClick={ () => { setDate( 12, __( 'months', 'search-console' ) ), onToggle() } }>
                            { __( 'Last 12 months', 'search-console' ) }
                        </MenuItem>
                        <MenuItem onClick={ () => { setDate( 16, __( 'months', 'search-console' ) ), onToggle() } }>
                            { __( 'Last 18 months', 'search-console' ) }
                        </MenuItem>
                    </MenuGroup>
                </Fragment>
            ) }
        />
    )
}