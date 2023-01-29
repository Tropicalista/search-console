//import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';

export default function Header( { title } ) {
	return (
		<div className="masthead">
			<div className="masthead__branding">
				<h1>{ title }</h1>
			</div>
		</div>
	);
}
