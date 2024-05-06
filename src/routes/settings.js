import { __ } from '@wordpress/i18n';
import GoogleOAuth from '../components/settings/google-oauth';
import Credentials from '../components/settings/credentials';
import Help from '../components/settings/help';
import SiteSelect from '../components/settings/site-select';
import SaveButton from '../components/settings/save-button';
import LoadingSpinner from '../components/loading-spinner.js';
import { SettingsContext } from '../context/settings-context';
import { useContext } from '@wordpress/element';
import {
	__experimentalVStack as VStack,
	__experimentalGrid as Grid,
} from '@wordpress/components';

const Settings = () => {
	const { ready, settings } = useContext( SettingsContext );

	if ( ! ready || ! settings ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	return (
		<div className={ 'search-console-settings' }>
			<Grid
				columns={ 4 }
				templateColumns="3fr 1fr"
				gap="4"
				align="flex-start"
				className="popper-settings"
			>
				<VStack>
					<GoogleOAuth />
					<SiteSelect />
					<Credentials />
					<SaveButton />
				</VStack>
				<VStack>
					<Help />
				</VStack>
			</Grid>
		</div>
	);
};

export default Settings;
