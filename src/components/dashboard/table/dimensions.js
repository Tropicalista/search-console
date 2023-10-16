import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { SettingsContext } from '../../../context/settings-context';

export default function Dimensions() {
	const { updateQuery } = useContext( SettingsContext );

	const onSelect = ( dimension ) => {
		updateQuery( 'dimension', dimension );
		setSelected( dimension );
	};

	const [ selected, setSelected ] = useState( 'query' );

	return (
		<div className="search-console-dimensions">
			<a
				className={ 'query' === selected ? 'is-selected' : '' }
				onClick={ () => onSelect( 'query' ) }
			>
				{ __( 'Query', 'search-console' ) }
			</a>
			<a
				className={ 'page' === selected ? 'is-selected' : '' }
				onClick={ () => onSelect( 'page' ) }
			>
				{ __( 'Pages', 'search-console' ) }
			</a>
			<a
				className={ 'country' === selected ? 'is-selected' : '' }
				onClick={ () => onSelect( 'country' ) }
			>
				{ __( 'Countries', 'search-console' ) }
			</a>
			<a
				className={ 'device' === selected ? 'is-selected' : '' }
				onClick={ () => onSelect( 'device' ) }
			>
				{ __( 'Devices', 'search-console' ) }
			</a>
		</div>
	);
}
