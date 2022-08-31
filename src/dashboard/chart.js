import { Chart } from "react-google-charts";
import Options from './ChartOptions'
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

export default function MyChart ( props ) {

    const { token, searchType, site, filters, startDate } = props;

    const [ table, setTable ] = useState([]);

    const query = select( 'searchconsole' ).getQuery()

    useEffect( () => { 
        if( !token ){
            return
        }
        gapi.load('client:auth', () => {
            gapi.client.load('searchconsole', 'v1').then( getData )
        });
    }, [ token, searchType, filters, startDate, site ] );

    const getData = () => {
        gapi.auth.setToken({access_token:token})
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
                    filters: filters
                }],
            }
        )
        .then((response) => {
            const data = response.result.rows
            let temp = []
            temp.push( [ 'Keys', __( 'Clicks', 'search-console' ), __( 'Impressions', 'search-console' ), 'CTR', __( 'Position', 'search-console' ) ] )
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
        })
        .then(null, function(err) {
            console.log(err);
        }); 
    }

	return (
		<div className='search-console-chart'>
            {
                table.length ?
                <Chart
                    height={ 300 }
                    chartType="LineChart"
                    loader={ <Spinner /> }
                    data={ table }
                    options={ Options }
                    legendToggle
                />
                :
                null
            }
		</div>		
	)
}