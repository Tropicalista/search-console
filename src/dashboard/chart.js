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

export default function MyChart ( props ) {

    const { token, searchType, site, filters, startDate } = props;

    const [ table, setTable ] = useState([]);

    const query = select( 'searchconsole' ).getQuery()

    useEffect( () => { 
        if( !token ){
            return
        }
        gapi.load('client:auth', () => {
            gapi.client.load('webmasters', 'v3').then( getData )
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
            temp.push( ['Keys', 'Clicks', 'Impressions', 'CTR', 'Position'] )
            data.forEach( (row) => {
                temp.push([
                    moment( row.keys[0], 'YYYY-MM-DD' ).toDate(),
                    //new Date( row.keys[0] ),
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
                    loader={<div><Spinner /> Loading Chart...</div>}
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