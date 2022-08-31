import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    Button,
    Notice,
    PanelRow,
    Placeholder,
    TextControl,
    Spinner,
    __experimentalInputControl as InputControl,
    TabPanel
} from '@wordpress/components';

import {
    useState,
    Fragment,
    useEffect
} from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import MyChart from '../dashboard/chart'
import Dimensions from '../dashboard/dimensions'
import Filters from '../dashboard/filters'
import Table from '../dashboard/table'
import { store as noticesStore } from '@wordpress/notices';

import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';

const Dashboard = ( props ) => {

    const [ loading, setLoading ] = useState(false);
    const [ filters, setFilters ] = useState( [] );
    const [ searchType, setSearchType ] = useState( 'web' );
    const [ dimension, setDimension ] = useState( 'query' );
    const [ data, setData ] = useState();

    const { createNotice, removeNotice } = useDispatch( noticesStore );

    const { settings, query } = useSelect( ( select ) => { 
        return { 
            settings:  select( 'searchconsole' ).getSettings(),
            query: select( 'searchconsole' ).getQuery(),
        }
    }, [] );

    useEffect( () => { 
        if( '' === settings.token || '' === settings.site ){
            createNotice( 'warning', __( 'Your token is expired or missing.', 'search-console' ), {
                isDismissible: true,
                actions: [
                    {
                        url: '#/settings',
                        label: __( 'Edit settings', 'search-console' ),
                    },
                ],
            } )
        }
        /*if( settings.token ){
            gapi.load('client:auth', () => {
                gapi.client.load('searchconsole', 'v1').then( getSites )
            }); 
        }*/
    }, [settings] );

    const getSites = () => {

        /*let sites = []
        gapi.auth.setToken({access_token:settings.token})
        gapi.client.webmasters.sites.list()
            .then( (s) => {
                s.result.siteEntry.map( (t) => {
                    sites.push({ value:t.siteUrl, label:t.siteUrl })
                } )
                sites.sort(function(a, b){
                    if(a.value < b.value) { return -1; }
                    return 0;
                })
                setSites(sites.sort())
            })*/
    }

    return (
        <Fragment>
            { '' !== settings.site && '' !== query.site ? 
            <MyChart 
                token={ settings.token } 
                searchType={ query.searchType } 
                site={ settings.site }
                startDate={ query.startDate }
                filters={ query.filters } 
            /> : null }
            <Filters searchType={ searchType } />
            { '' === loading ? <Spinner /> : null }
            { '' !== settings.site && '' !== query.site ? 
            <Table 
                token={ settings.token } 
                searchType={ query.searchType } 
                dimension={ query.dimension } 
                site={ settings.site } 
                filters={ query.filters } 
            /> : null }
        </Fragment>
    )
}

export default Dashboard;