import { __ } from '@wordpress/i18n';

import {
	useState,
	Fragment,
	useEffect
} from '@wordpress/element';

import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import GoogleOAuth from '../components/settings/google-oauth';
import Credentials from '../components/settings/credentials';
import SiteSelect from '../components/settings/site-select';
import UpdateSettings from '../components/update-settings';
import LoadingSpinner from '../components/loading-spinner.js';

const Settings = ( props ) => {

    const { gapi, refreshToken } = props;

	return (
		<div className={ 'search-console-settings' }>
			<GoogleOAuth {...props} />
			<SiteSelect gapi={ gapi } {...props} refreshToken={ refreshToken } />
			<Credentials {...props} />
			<UpdateSettings
				{...props} 
			/>
		</div>
	)
}

export default Settings;