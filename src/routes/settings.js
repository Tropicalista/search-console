import { __ } from '@wordpress/i18n';
import GoogleOAuth from '../components/settings/google-oauth';
import Credentials from '../components/settings/credentials';
import SiteSelect from '../components/settings/site-select';
import SaveButton from '../components/settings/save-button';
import LoadingSpinner from '../components/loading-spinner.js';
import { SettingsContext } from '../context/settings-context';
import { useContext } from '@wordpress/element';

const Settings = () => {
	const { ready, settings } = useContext( SettingsContext );

	if ( ! ready || ! settings ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	return (
		<div className={ 'search-console-settings' }>
			<GoogleOAuth />
			<SiteSelect />
			<Credentials />
			<SaveButton />
		</div>
	);
};

export default Settings;
