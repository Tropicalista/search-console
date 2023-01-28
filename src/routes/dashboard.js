import { __ } from '@wordpress/i18n';
import {
    Card,
    CardBody
} from '@wordpress/components';

import {
    useState,
    RawHTML,
    Fragment,
    useEffect
} from '@wordpress/element';

import Dimensions from '../dashboard/dimensions'
import Table from '../dashboard/table'
import LoadingSpinner from '../components/loading-spinner.js';

import { MyChart } from '../components/dashboard/chart'
import { MyTable } from '../components/dashboard/table'
import { Filters } from '../components/dashboard/filters'
import { gapi } from 'gapi-script';

import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';

const Dashboard = ( props ) => {

    const { gapi, refreshToken, settings } = props;
    const token = settings?.token ?? false;

    const { query } = useSelect( ( select ) => { 
        return { 
            query: select( 'searchconsole' ).getQuery(),
        }
    }, [] );

    return (
        <div className={ 'search-console-dashboard' }>
            <Card>
                <CardBody>
                    <MyChart 
                        gapi={ gapi }
                        token={ token }
                        query={ query }
                        site={ settings.site }
                        refreshToken={ refreshToken }
                    />       
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                   <Filters />     
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                   <MyTable 
                        gapi={ gapi }
                        token={ token } 
                        query={ query }
                        site={ settings.site }
                        refreshToken={ refreshToken }
                    />     
                </CardBody>
            </Card>
        </div>
    )
}

export default Dashboard;