import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { SettingsContext } from '../../../context/settings-context';

export default function Dimensions() {
	const { updateQuery, query } = useContext( SettingsContext );

	const onSelect = ( dimension ) => {
		updateQuery( 'dimension', dimension );
		setSelected( dimension );
	};

	return (
		<div className="search-console-dimensions">
			<Button
				className={ 'query' === query.dimension ? 'is-selected' : '' }
				onClick={ () => onSelect( 'query' ) }
			>
				{ __( 'Query', 'search-console' ) }
			</Button>
			<Button
				className={ 'page' === query.dimension ? 'is-selected' : '' }
				onClick={ () => onSelect( 'page' ) }
			>
				{ __( 'Pages', 'search-console' ) }
			</Button>
			<Button
				className={ 'country' === query.dimension ? 'is-selected' : '' }
				onClick={ () => onSelect( 'country' ) }
			>
				{ __( 'Countries', 'search-console' ) }
			</Button>
			<Button
				className={ 'device' === query.dimension ? 'is-selected' : '' }
				onClick={ () => onSelect( 'device' ) }
			>
				{ __( 'Devices', 'search-console' ) }
			</Button>
		</div>
	);
}
