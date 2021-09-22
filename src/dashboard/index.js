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

import MyChart from './chart'
import Dimensions from './dimensions'
import Filters from './filters'
import Table from './table'

import {
	useSelect,
	useDispatch,
	dispatch,
	select
} from '@wordpress/data';

const Dashboard = ( props ) => {

	const { settings, query } = props;

	const [ loading, setLoading ] = useState(false);
	const [ filters, setFilters ] = useState( [] );
	const [ searchType, setSearchType ] = useState( 'web' );
	const [ dimension, setDimension ] = useState( 'query' );
	const [ data, setData ] = useState();

	useEffect( () => { 

		/*gapi.load('client:auth', () => {
			gapi.client.load('webmasters', 'v3')//.then( getToken )
		});*/

	}, [] );

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