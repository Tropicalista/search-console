import { FormTokenField } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import countries from './countries';

export default function Country( props ) {
	const { filter, handleChange } = props;

	const onChange = ( val ) => {
		handleChange(
			Object.keys( countries )[
				Object.values( countries ).indexOf( val )
			]
		);
	};

	return (
		<Fragment>
			<FormTokenField
				value={ filter.expression ? [ filter.expression ] : [] }
				suggestions={ Object.values( countries ) }
				onChange={ ( tokens ) => onChange( tokens[ 0 ] ) }
				label={ __( 'Choose a country', 'search-console' ) }
				maxLength="1"
				__experimentalShowHowTo={ false }
			/>
		</Fragment>
	);
}
