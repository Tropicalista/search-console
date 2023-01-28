import {
	Button,
	Card,
	CardBody,
	CardHeader,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';
import {
	RawHTML
} from '@wordpress/element';

const Pagination = ( props ) => {

	const { 
		pageSize,
		setPageSize,
		canPreviousPage,
		canNextPage,
		pageIndex,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage
	} = props;

	return (
		<div className="search-console-pagination">
			<div>
				<select
					value={ pageSize }
					onChange={e => {
						setPageSize( Number( e.target.value ) )
					}}
				>
				{[10, 20, 30, 40, 50].map(pageSize => (
					<option key={ pageSize } value={ pageSize }>
					Show { pageSize }
					</option>
				))}
				</select>
			</div>
			<div>
				<Button onClick={ () => gotoPage(0) } icon="controls-back" disabled={ !canPreviousPage } />
				<Button onClick={ () => previousPage() } icon="arrow-left" disabled={ !canPreviousPage } />
				<Button onClick={ () => nextPage() } icon="arrow-right" disabled={ !canNextPage } />
				<Button onClick={ () => gotoPage( pageCount - 1 ) } icon="controls-forward" disabled={ !canNextPage } />
			</div>
			<div>
				{ __( 'Page ', 'search-console' ) }
				<strong>
					{ pageIndex + 1 } { __( 'of', 'search-console' ) } { pageOptions.length }
				</strong>
			</div>
			<span>
				{ __( 'Go to page: ', 'searchconsole' ) }
			<input
				type="number"
				defaultValue={ pageIndex + 1 }
				onChange={e => {
					const page = e.target.value ? Number( e.target.value ) - 1 : 0
					gotoPage( page )
				}}
				min="1"
				style={{ width: '50px' }}
			/>
			</span>
		</div>
	)
}

export default Pagination;