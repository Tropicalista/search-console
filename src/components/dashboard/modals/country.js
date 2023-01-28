import {
	RadioControl,
} from '@wordpress/components';
import {
	Fragment,
} from '@wordpress/element';

import countries from './countries';
import { __ } from '@wordpress/i18n';

export default function Country( props ) {

	const {
		filter,
		handleChange
	} = props;

	const options = () => {
		let opts = [];
		for( const k in countries ) {
			opts.push( { value: k, label: countries[k] } )
		}
		return opts
	}

	return (
		<Fragment>
				<RadioControl
					selected={ filter.expression }
					options={ options() }
					onChange={ ( option ) => {
						handleChange( option )
					} }
				/>
		</Fragment>
	)
}
