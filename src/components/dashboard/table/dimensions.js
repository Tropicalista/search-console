import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { SettingsContext } from '../../../context/settings-context';

export default function Dimensions() {
	const { updateQuery, query } = useContext( SettingsContext );

	const onSelect = ( dimension ) => {
		updateQuery( 'dimensions', [ dimension ] );
	};

	return (
		<div className="search-console-dimensions">
			<Button
				className={
					query.dimensions.includes( 'query' ) ? 'is-selected' : ''
				}
				onClick={ () => onSelect( 'query' ) }
			>
				{ __( 'Query', 'search-console' ) }
			</Button>
			<Button
				className={
					query.dimensions.includes( 'page' ) ? 'is-selected' : ''
				}
				onClick={ () => onSelect( 'page' ) }
			>
				{ __( 'Pages', 'search-console' ) }
			</Button>
			<Button
				className={
					query.dimensions.includes( 'country' ) ? 'is-selected' : ''
				}
				onClick={ () => onSelect( 'country' ) }
			>
				{ __( 'Countries', 'search-console' ) }
			</Button>
			<Button
				className={
					query.dimensions.includes( 'device' ) ? 'is-selected' : ''
				}
				onClick={ () => onSelect( 'device' ) }
			>
				{ __( 'Devices', 'search-console' ) }
			</Button>
		</div>
	);
}
