/**
 * WordPress dependencies
 */
import {
	Fragment,
	RawHTML,
	useState,
	useMemo,
	useEffect,
} from '@wordpress/element';

import { __, sprintf } from '@wordpress/i18n';
import {
	useTable,
	usePagination,
	useSortBy,
	useGlobalFilter,
} from 'react-table';
import Countries from './modals/countries';
import { useSelect, select } from '@wordpress/data';

import { Button, Spinner, SelectControl, Icon } from '@wordpress/components';

import Pagination from './table/pagination';
import TableBar from './table/table-bar';

export function MyTable( props ) {
	const { site, gapi, query, refreshToken } = props;

	const [ data, setData ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {
		if ( ! gapi?.client?.getToken() || ! site ) {
			return;
		}
		getData();
	}, [ site, query ] );

	const getData = () => {
		setIsLoading( true );

		gapi.client.webmasters.searchanalytics
			.query( {
				siteUrl: site,
				fields: 'rows',
				rowLimit: null,
				searchType: query.searchType,
				startDate: query.startDate,
				endDate: query.endDate,
				dimensions: [ query.dimension ],
				dimensionFilterGroups: [
					{
						filters: query.filters,
					},
				],
			} )
			.then( ( response ) => {
				setIsLoading( false );
				if ( ! response.result.rows ) {
					setData( [] );
					return;
				}
				if ( query.dimension === 'country' ) {
					response.result.rows.map( ( row ) => {
						row.keys[ 0 ] = Countries[ row.keys[ 0 ] ];
					} );
				}
				setData( response.result.rows );
			}, ( err ) => {
				console.log( err );
				setIsLoading( false );
			} );
	};

	const options = {
		pageSize: 20,
		pageSizeOptions: [ 5, 10, 20, 50, 100 ],
	};

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
				Cell: ( { value } ) => {
					return ( value * 100 ).toFixed( 1 ) + ' %';
				},
			},
			{
				Header: __( 'Position', 'search-console' ),
				accessor: 'position',
				Cell: ( { value } ) => {
					return value.toFixed( 1 );
				},
			},
		],
		[]
	);

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
		usePagination
	);

	return (
		<div className="search-console-table-wrapper">
			<TableBar
				globalFilter={ globalFilter }
				setGlobalFilter={ setGlobalFilter }
			/>
			{ isLoading ? <Spinner /> : null }
			<table { ...getTableProps() }>
				<thead>
					{ headerGroups.map( ( headerGroup ) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map( ( column ) => (
								<th
									{ ...column.getHeaderProps(
										column.getSortByToggleProps()
									) }
								>
									{ column.render( 'Header' ) }
									<span>
										{ column.isSorted ? (
											column.isSortedDesc ? (
												<Icon icon="arrow-down" />
											) : (
												<Icon icon="arrow-up" />
											)
										) : (
											''
										) }
									</span>
								</th>
							) ) }
						</tr>
					) ) }
				</thead>
				<tbody { ...getTableBodyProps() }>
					{ page.map( ( row, i ) => {
						prepareRow( row );
						return (
							<tr { ...row.getRowProps() }>
								{ row.cells.map( ( cell ) => {
									return (
										<td { ...cell.getCellProps() }>
											{ cell.render( 'Cell' ) }
										</td>
									);
								} ) }
							</tr>
						);
					} ) }
				</tbody>
			</table>
			<Pagination
				pageIndex={ pageIndex }
				pageOptions={ pageOptions }
				pageSize={ pageSize }
				setPageSize={ setPageSize }
				pageCount={ pageCount }
				canPreviousPage={ canPreviousPage }
				canNextPage={ canNextPage }
				gotoPage={ gotoPage }
				nextPage={ nextPage }
				previousPage={ previousPage }
			/>
		</div>
	);
}
