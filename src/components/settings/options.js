import { Card, CardBody, CardHeader } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Verification from './verification';
import PostTypeSelection from './post-type-selection';
import SiteSelect from './site-select';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';

const Options = ( { token } ) => {
	const hasAccess = hasGrantedAllScopesGoogle(
		token,
		'https://www.googleapis.com/auth/webmasters.readonly',
		'https://www.googleapis.com/auth/siteverification'
	);

	return (
		<Card>
			<CardHeader>
				<b>{ __( 'Options', 'search-console' ) }</b>
			</CardHeader>

			<CardBody>
				{ hasAccess && <SiteSelect /> }

				<PostTypeSelection />

				{ hasAccess && <Verification /> }
			</CardBody>
		</Card>
	);
};

export default Options;
