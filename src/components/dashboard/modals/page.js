import {
	SelectControl,
	TextControl,
} from '@wordpress/components';
import {
	Fragment,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function Page( props ) {

	const {
		filter,
		handleChange
	} = props;

	return (
		<Fragment>
			<SelectControl
			    selected={ filter.operator }
			    options={ [
			        { value: 'CONTAINS', label: __( 'Urls containing', 'search-console' ) },
			        { value: 'NOT_CONTAINS', label: __( 'Urls not containing', 'search-console' ) },
			        { value: 'EQUALS', label: __( 'Exact url', 'search-console' ) },
			    ] }
				onChange={ ( option ) => {
					handleChange( filter.expression, option );
				} }
			/>
			<TextControl
				value={ filter.expression }
				placeholder={ 'https://www.example.com' }
				onChange={ ( option ) => {
					handleChange( option, filter.operator ? filter.operator : 'CONTAINS' );
				} }
			/>
		</Fragment>
	)
}
