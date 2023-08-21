import { __ } from '@wordpress/i18n';

import { useState, Fragment, useEffect } from '@wordpress/element';
import GoogleOAuth from '../components/settings/google-oauth';
import Credentials from '../components/settings/credentials';
import SiteSelect from '../components/settings/site-select';
import UpdateSettings from '../components/update-settings';
import LoadingSpinner from '../components/loading-spinner.js';

const Settings = ( props ) => {
	const { refreshToken, settings } = props;

    if ( ! window.gapi ) {
        return (
            <LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
        );
    }

	if ( ! settings.credentials && ! gapi.client ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	return (
		<div className={ 'search-console-settings' }>
			<GoogleOAuth { ...props } />
			<SiteSelect { ...props } />
			<Credentials { ...props } />
			<UpdateSettings { ...props } />
		</div>
	);
};

export default Settings;