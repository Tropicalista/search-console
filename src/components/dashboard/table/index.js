/**
 * WordPress dependencies
 */
import { useState, useContext, useEffect, useMemo } from '@wordpress/element';
import { DataViews } from '@wordpress/dataviews';

/**
 * Internal dependencies
 */
import Dimensions from './dimensions';
import Countries from '../modals/countries';
import { SettingsContext } from '../../../context/settings-context';

export function Table() {
	const { settings, query, showError } = useContext( SettingsContext );

	const [ data, setData ] = useState( [] );
	const [ view, setView ] = useState( {
		type: 'table',
		perPage: 10,
		page: 1,
		sort: {},
		search: '',
		filters: [],
		hiddenFields: [],
		layout: {},
	} );

	useEffect( () => {
		getData();
	}, [ query, settings.token ] );

	useEffect( () => {
		filterData();
	}, [ view.sort ] );

	const getData = () => {
		window.gapi.client.setToken( settings.token );

		window.gapi?.client?.webmasters.searchanalytics
			.query( {
				...query,
				siteUrl: settings.site,
			} )
			.then( ( response ) => {
				if ( ! response.result.rows ) {
					setData( [] );
					return;
				}
				setData( normalizeData( response.result.rows ) );
			} )
			.catch( ( error ) => {
				showError( error );
			} );
	};

	const paginateArray = ( array ) => {
		const page = array.slice(
			( view.page - 1 ) * view.perPage,
			view.page * view.perPage
		);
		return page;
	};

	const filterData = () => {
		if ( 'keys' === view.sort.field ) {
			sortKeys();
		} else {
			sortData();
		}
	};

	const sortKeys = () => {
		if ( 'desc' === view.sort.direction ) {
			data.sort( ( a, b ) => b.keys.localeCompare( a.keys ) );
		} else {
			data.sort( ( a, b ) => a.keys.localeCompare( b.keys ) );
		}
	};

	const sortData = () => {
		if ( 'desc' === view.sort.direction ) {
			data.sort(
				( a, b ) => a[ view.sort.field ] - b[ view.sort.field ]
			);
		} else {
			data.sort(
				( a, b ) => b[ view.sort.field ] - a[ view.sort.field ]
			);
		}
	};

	const normalizeData = ( array ) => {
		return array.map( ( item ) => {
			return { ...item, keys: item.keys[ 0 ] };
		} );
	};

	const fields = [
		{
			id: 'keys',
			header: 'Query',
			enableHiding: false,
			render: ( { item } ) => {
				if ( query.dimensions.includes( 'country' ) ) {
					return Countries[ item.keys ];
				}
				return item.keys;
			},
		},
		{
			id: 'clicks',
			header: 'Clicks',
			enableHiding: false,
			render: ( { item } ) => {
				return item.clicks;
			},
		},
		{
			id: 'ctr',
			header: 'CTR',
			render: ( { item } ) => {
				return ( item.ctr * 100 ).toFixed( 2 ) + '%';
			},
		},
		{
			id: 'impressions',
			header: 'Impressions',
			render: ( { item } ) => {
				return item.impressions;
			},
		},
		{
			id: 'position',
			header: 'Position',
			render: ( { item } ) => {
				return Math.round( item.position * 100 ) / 100;
			},
		},
	];

	const paginationInfo = useMemo(
		() => ( {
			totalItems: data.length,
			totalPages: Math.ceil( data.length / view.perPage ),
		} ),
		[ data, view.perPage ]
	);

	return (
		<div className="search-console-table-wrapper">
			<div className="search-console-table-bar">
				<Dimensions />
			</div>
			<DataViews
				paginationInfo={ paginationInfo }
				data={ paginateArray( data ) }
				fields={ fields }
				view={ view }
				onChangeView={ setView }
				getItemId={ ( item ) => item.keys }
				supportedLayouts={ [ 'table' ] }
				search={ false }
			/>
		</div>
	);
}
