import { Spinner } from '@wordpress/components';

export function LoadingSpinner( { text } ) {
	return (
		<div className="loading-settings">
			<Spinner />
			<span className="description">{ text }</span>
		</div>
	);
}
