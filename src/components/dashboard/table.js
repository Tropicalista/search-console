/**
 * WordPress dependencies
 */
import { useState, useContext, useEffect, useMemo } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import {
	useTable,
	usePagination,
	useSortBy,
	useGlobalFilter,
} from 'react-table';
import Countries from './modals/countries';

import { Spinner, Icon } from '@wordpress/components';

import Pagination from './table/pagination';
import TableBar from './table/table-bar';
import { SettingsContext } from '../../context/settings-context';
import { gapi } from 'gapi-script';

export function MyTable() {
	const { settings, query, refreshToken } = useContext( SettingsContext );

	const [ data, setData ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {
		getData();
	}, [ query, settings.token ] );

	const getData = () => {
		setIsLoading( true );
		window.gapi.client.setToken( settings.token );

		window.gapi?.client?.webmasters.searchanalytics
			.query( {
				siteUrl: settings.site,
				fields: 'rows',
				rowLimit: null,
				searchType: query.searchType,
				startDate: query.startDate,
				endDate: query.endDate,
				dimensions: [ query.dimension ],
				dimensionFilterGroups: query.dimensionFiltersGroup,
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
			} )
			.catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.log( error );
				refreshToken();
			} )
	};

	const columns = useMemo(
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
					{ headerGroups.map( ( headerGroup, i ) => (
						<tr { ...headerGroup.getHeaderGroupProps() } key={ i }>
							{ headerGroup.headers.map( ( column, idx ) => (
								<th
									{ ...column.getHeaderProps(
										column.getSortByToggleProps()
									) }
									key={ idx }
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
					{ page.map( ( row, idx ) => {
						prepareRow( row );
						return (
							<tr { ...row.getRowProps() } key={ idx }>
								{ row.cells.map( ( cell, i ) => {
									return (
										<td
											{ ...cell.getCellProps() }
											key={ i }
										>
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
