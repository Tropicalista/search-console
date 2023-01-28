import {
	SelectControl,
	TextControl,
} from '@wordpress/components';
import {
	Fragment,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function Query( props ) {

	const {
		filter,
		handleChange
	} = props;

	return (
		<Fragment>
			<SelectControl
			    selected={ filter.operator }
			    options={ [
			        { value: 'CONTAINS', label: __( 'Queries containing', 'search-console' ) },
			        { value: 'NOT_CONTAINS', label: __( 'Queries not containing', 'search-console' ) },
			        { value: 'EQUALS', label: __( 'Exact query', 'search-console' ) },
			    ] }
				onChange={ ( option ) => {
					handleChange( filter.expression, option );
				} }
			/>
			<TextControl
				value={ filter.expression }
				onChange={ ( option ) => {
					handleChange( option, filter.operator ? filter.operator : 'CONTAINS' );
				} }
			/>
		</Fragment>
	)
}