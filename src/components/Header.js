import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
	__experimentalHStack as HStack
} from '@wordpress/components';

export default function Header( { title } ) {
	return (
		<div className="masthead">
			<Logo />
			<div className="masthead__branding">
				<h1>{ title }</h1>
			</div>
		</div>
	);
}
