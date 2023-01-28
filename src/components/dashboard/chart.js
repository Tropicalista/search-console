import { Chart } from "react-google-charts";
import Options from './chart-options'
import {
    useState,
    Fragment,
    useEffect
} from '@wordpress/element';
import {
    Spinner,
} from '@wordpress/components';
import {
    withSelect,
    useDispatch,
    useSelect,
    select
} from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import LoadingSpinner from '../loading-spinner.js';

export function MyChart ( props ) {

    const { site, gapi, query, refreshToken } = props;

    const [ table, setTable ] = useState([]);

    useEffect( () => { 
        if( !gapi.auth.getToken() ){
            return
        }
        getData()
    }, [ site, query ] );

    const getData = () => {

        gapi.client.webmasters.searchanalytics.query(
            {
                'siteUrl': site,
                'fields': 'rows',
                'rowLimit': null,
                'searchType': query.searchType,
                'startDate': query.startDate,
                'endDate': query.endDate,
                'dimensions': ['date'],
                'dimensionFilterGroups': [{
                    filters: query.filters
                }],
            }
        )
        .then((response) => {
            const data = response.result.rows
            let temp = []
            temp.push( [ 
                'Keys', 
                __( 'Clicks', 'search-console' ), 
                __( 'Impressions', 'search-console' ), 
                'CTR', 
                __( 'Position', 'search-console' ) 
            ] )
            data.forEach( (row) => {
                temp.push([
                    moment( row.keys[0], 'YYYY-MM-DD' ).toDate(),
                    row.clicks,
                    row.impressions,
                    (row.ctr * 100),
                    parseFloat(row.position)
                ]);
            })
            setTable(temp)
        }, (err) => {
            refreshToken();
        }); 
    }

	return (
		<div className='search-console-chart'>
            {
                table.length ?
                <Chart
                    chartType="LineChart"
                    loading={ <Spinner /> }
                    data={ table }
                    options={ Options }
                    legendToggle
                />
                :
                <LoadingSpinner text={ __( 'Fetching data...', 'search-console' ) } />
            }
		</div>		
	)
}