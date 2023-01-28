import {
	RadioControl,
	TextareaControl,
	Button,
	SelectControl,
	Icon,
} from '@wordpress/components';
import {
	Fragment,
	RawHTML,
	useState,
	useEffect
} from '@wordpress/element';
import {
    useSelect,
    select,
    useDispatch
} from '@wordpress/data';

import { __ } from '@wordpress/i18n';

export default function SearchType( props ) {

	const {
		onRequestClose,
		handleChange
	} = props;


    const searchType = select( 'searchconsole' ).getSearchType();

	const [ type, setType ] = useState( searchType );

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
						handleChange( option )
					} }
				/>
		</Fragment>
	)
}
