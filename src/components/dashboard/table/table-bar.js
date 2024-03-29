import { SearchControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import Dimensions from './dimensions';

const TableBar = ( props ) => {
	const { globalFilter, setGlobalFilter } = props;

	return (
		<div className="search-console-table-bar">
			<Dimensions />
			<SearchControl
				value={ globalFilter || '' }
				placeholder={ __( 'search', 'search-console' ) }
				onChange={ ( val ) => setGlobalFilter( val ) }
			/>
		</div>
	);
};

export default TableBar;
