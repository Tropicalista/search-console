/**
 * WordPress dependencies
 */
import {
	Fragment,
	RawHTML,
	useState,
	useMemo,
	useEffect
} from '@wordpress/element';

import {
	__,
	sprintf,
} from '@wordpress/i18n';
import MaterialTable from "material-table";
import Countries from './modals/countries'
import {
	withSelect,
	useDispatch,
	useSelect,
	select
} from '@wordpress/data';

import {
	Button,
	Spinner,
	SelectControl,
	Modal,
} from '@wordpress/components';

import Dimensions from './dimensions';

export default function Table ( props ) {

	const { token, searchType, dimension, site, filters } = props;

	const [ table, setTable ] = useState();
	const [ isLoading, setIsLoading ] = useState(false);

    const { query } = useSelect( ( select ) => { 
        return { 
            query:  select( 'stocazzo' ).getQuery(),
        }
    }, [] );

    useEffect( () => { 
        if( !token ){
            return
        }
        //gapi.load('client:auth', () => {
            gapi.client.load('webmasters', 'v3').then( getData )
        //});
    }, [ token, searchType, dimension, filters ] );
 

	const getData = () => {
		setIsLoading(true)
		gapi.auth.setToken({access_token:token})
		gapi.client.webmasters.searchanalytics.query(
			{
				'siteUrl': site,
				'fields': 'rows',
				'rowLimit': null,
                'searchType': query.searchType,
                'startDate': query.startDate,
                'endDate': query.endDate,
				'dimensions': [ dimension ],
			    'dimensionFilterGroups': [{
			    	filters: filters
			    }],
			}
		)
		.then((response) => {
            if ( dimension === 'country' ) {
                response.result.rows.map( (row) => {
                    row.keys[0] = Countries[row.keys[0]]
                })
            }
			setIsLoading(false)
			setTable(response.result.rows)

		})
		.then(null, function(err) {
			console.log(err);
			setIsLoading(false)
		});
	}

	const options = {
		pageSize: 20,
		pageSizeOptions: [ 5, 10, 20, 50, 100 ]
	}

	return (

		<div className="search-console-table-wrapper">
		<MaterialTable
			columns={[
				{ 
					title: dimension, 
					field: 'keys',
					headerStyle: { 'textTransform': 'capitalize' },
					render: rowData => <>{ rowData.keys ? rowData.keys[0] : '' }</>
				},
				{ title: 'Clicks', field: 'clicks', maxWidth: '100px' },
				{ title: 'Impressions', field: 'impressions', maxWidth: '100px' },
				{ title: 'CTR', field: 'ctr', maxWidth: '100px', render: rowData => <>{ (rowData.ctr*100).toFixed(1) + '%' }</> },
				{ title: 'Position', field: 'position', maxWidth: '100px', render: rowData => <>{ (rowData.position).toFixed(1) }</> },
			]}
		    data={ table }
		    title={ <Dimensions /> }
		    isLoading={ isLoading }
		    options={ options }
		    tableLayout={ 'fixed' }
		    className={ 'search-console-table' }
		/>

		</div>
	 )

}