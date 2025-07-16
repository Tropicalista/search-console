import { Icon } from '@wordpress/components';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export const Header = ( { text } ) => {
	return (
		<div className="header">
			<Icon icon={ Logo } />
			<span className="description">{ text }</span>
		</div>
	);
};
