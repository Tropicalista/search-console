import {
	RadioControl,
	Button,
} from '@wordpress/components';
import {
	Fragment,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

export default function Device( props ) {

	const {
		filter,
		handleChange
	} = props;

	return (
		<Fragment>
				<RadioControl
					selected={ filter.expression }
					options={ [
							{ label: __( 'Desktop', 'search-console' ), value: 'desktop' },
							{ label: __( 'Mobile', 'search-console' ), value: 'mobile' },
							{ label: __( 'Tablet', 'search-console' ), value: 'tablet' },
					] }
					onChange={ ( option ) => {
						handleChange( option )
					} }
				/>
		</Fragment>
	)
}
