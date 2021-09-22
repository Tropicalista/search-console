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
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table'
import Countries from './modals/countries'
import {
	useSelect,
	select
} from '@wordpress/data';

import {
	Button,
	Spinner,
	SelectControl,
	Icon,
} from '@wordpress/components';

import Dimensions from './dimensions';

export default function Table ( props ) {

	const { token, searchType, dimension, site, filters } = props;

	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);

	const { query } = useSelect( ( select ) => { 
		return { 
			query: select( 'searchconsole' ).getQuery(),
		}
	}, [] );

	useEffect( () => { 
		if( !token ){
			return
		}
		gapi.load('client:auth', () => {
			gapi.client.load('webmasters', 'v3').then( getData )
		});
	}, [ token, searchType, dimension, filters, site ] );
 

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
			setIsLoading(false)
			if( ! response.result.rows ){
				setData( [] )
				return
			}
			if ( dimension === 'country' ) {
				response.result.rows.map( (row) => {
					row.keys[0] = Countries[row.keys[0]]
				})
			}
			setData(response.result.rows)

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

	const columns = React.useMemo(
		() => [
			{
				Header: '',
				accessor: 'keys', // accessor is the "key" in the data
			},
			{
				Header: __( 'Clicks', 'search-console' ),
				accessor: 'clicks', // accessor is the "key" in the data
			},
			{
				Header: __( 'Impressions', 'search-console' ),
				accessor: 'impressions',
			},
			{
				Header: __( 'CTR', 'search-console' ),
				accessor: 'ctr',
				Cell: ({value}) => { return ( value * 100 ).toFixed(1) +' %' }
			},
			{
				Header: __( 'Position', 'search-console' ),
				accessor: 'position',
				Cell: ({value}) => { return value.toFixed(1) }
			},
		],
		[]
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
	)
 
   return (
	<div className="search-console-table-wrapper">
		<div className="search-console-table-bar">
			<Dimensions />
			<input
				type="text"
				value={globalFilter || ""}
				placeholder={ __( 'search', 'search-console' ) }
				onChange={e => setGlobalFilter(e.target.value)}
			/>
		</div>
		{ isLoading ? <Spinner /> : null }
	 <table {...getTableProps()}>
	   <thead>
		 {headerGroups.map(headerGroup => (
		   <tr {...headerGroup.getHeaderGroupProps()}>
			 {headerGroup.headers.map(column => (
				<th {...column.getHeaderProps(column.getSortByToggleProps())}>
				 {column.render('Header')}
				  <span>
					{column.isSorted
					  ? column.isSortedDesc
						? <Icon icon="arrow-down" />
						: <Icon icon="arrow-up" />
					  : ''}
				  </span>
			   </th>
			 ))}
		   </tr>
		 ))}
	   </thead>
		<tbody {...getTableBodyProps()}>
		  {page.map((row, i) => {
			prepareRow(row)
			return (
				<tr {...row.getRowProps()}>
				{row.cells.map(cell => {
					return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
				})}
				</tr>
			)
		  })}
		</tbody>
	 </table>
		<div className="search-console-pagination">
			<div>
				<select
					value={pageSize}
					onChange={e => {
						setPageSize(Number(e.target.value))
					}}
				>
				{[10, 20, 30, 40, 50].map(pageSize => (
					<option key={pageSize} value={pageSize}>
					Show {pageSize}
					</option>
				))}
				</select>
			</div>
			<div>
				<Button onClick={ () => gotoPage(0) } icon="controls-back" disabled={!canPreviousPage} />
				<Button onClick={ () => previousPage() } icon="arrow-left" disabled={!canPreviousPage} />
				<Button onClick={ () => nextPage() } icon="arrow-right" disabled={!canNextPage} />
				<Button onClick={ () => gotoPage(pageCount - 1) } icon="controls-forward" disabled={!canNextPage} />
			</div>
			<div>
				{ __( 'Page ', 'search-console' ) }
				<strong>
					{pageIndex + 1} { __( 'of', 'search-console' ) } {pageOptions.length}
				</strong>
			</div>
			<span>
				{ __( 'Go to page: ', 'searchconsole' ) }
			<input
				type="number"
				defaultValue={pageIndex + 1}
				onChange={e => {
					const page = e.target.value ? Number(e.target.value) - 1 : 0
					gotoPage(page)
				}}
				min="1"
				style={{ width: '50px' }}
			/>
			</span>
		</div>
	  </div>
   )

}