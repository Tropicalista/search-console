import { RadioControl } from '@wordpress/components';
import { Fragment, useState, useContext } from '@wordpress/element';
import { SettingsContext } from '../../../context/settings-context';

import { __ } from '@wordpress/i18n';

export default function SearchType( props ) {
	const { handleChange } = props;

	const { query } = useContext( SettingsContext );

	const [ type, setType ] = useState( query.searchType );

	return (
		<Fragment>
			<RadioControl
				label={ __( 'Search Type', 'search-console' ) }
				selected={ type }
				options={ [
					{ label: 'Web', value: 'web' },
					{ label: __( 'Image' ), value: 'image' },
					{ label: 'Video', value: 'video' },
					{ label: 'News', value: 'news' },
				] }
				onChange={ ( option ) => {
					setType( option );
					handleChange( option );
				} }
			/>
		</Fragment>
	);
}
