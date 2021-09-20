import {
    TabPanel
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
    useState,
    Fragment
} from '@wordpress/element';
import {
    useDispatch,
} from '@wordpress/data';

export default function Dimensions ( props ) {

    const { setDimension } = useDispatch( 'stocazzo' );

    const onSelect = ( dimension ) => {
        setDimension( dimension )
    };

	return (
        <Fragment>
            <TabPanel
                className="search-console-dimensions"
                activeClass="active-tab"
                onSelect={ onSelect }
                tabs={ [
                    {
                        name: 'query',
                        title: 'Query',
                    },
                    {
                        name: 'page',
                        title: 'Pages',
                    },
                    {
                        name: 'country',
                        title: 'Countries',
                    },
                    {
                        name: 'device',
                        title: 'Devices',
                    },
                ] }
            >
        { ( tab ) => <></> }
    </TabPanel>
        </Fragment>
	)
}