import {
	useNavigator,
	Button,
	__experimentalVStack as VStack,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import {
	cog,
	home,
} from '@wordpress/icons';
import { Fragment } from '@wordpress/element';

const icons = {
	dashboard: home,
	settings: cog,
};

const menu = {
	dashboard: 'Dashboard',
	settings: 'Settings',
};

export const Menu = () => {
	const navigator = useNavigator();

	return (
		<div className="menu">
			<VStack>
				{ Object.keys( menu ).map( ( m, i ) => {
					return (
						<Fragment key={ i }>
							<Button
								onClick={ () =>
									navigator.goTo( `/${ m }`, {
										skipFocus: true,
									} )
								}
								icon={ icons[ m ] }
								text={ menu[ m ] }
							/>
							{ 'webhooks' === m && <Divider margin="5" /> }
						</Fragment>
					);
				} ) }
			</VStack>
		</div>
	);
};
