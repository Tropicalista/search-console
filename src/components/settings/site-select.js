import {
	Card,
	CardBody,
	CardHeader,
	SelectControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML, useEffect } from '@wordpress/element';
import classnames from 'classnames';

import {
	GoogleLogin,
	GoogleOAuthProvider,
	useGoogleLogin,
	hasGrantedAllScopesGoogle,
} from '@react-oauth/google';
import Verification from './verification';
import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const SiteSelect = ( props ) => {
	const { gapi, settings, refreshToken, getSites } = props;

	useEffect( () => {
		if ( ! gapi?.auth?.getToken() ) {
			return;
		}

		getSites();
	}, [] );

	const { setSettings } = useDispatch( 'searchconsole' );

	const { sites, site } = useSelect( ( select ) => {
		return {
			sites: select( 'searchconsole' ).getSites(),
			site: select( 'searchconsole' ).getSite(),
		};
	}, [] );

	return (
		<Card>
			<CardHeader>{ __( 'Options', 'formello' ) }</CardHeader>

			<CardBody>

				<SelectControl
					options={ sites }
					label={ __( 'Choose site', 'search-console' ) }
					help={ __( 'Choose one of your sites.', 'search-console' ) }
					value={ site }
					onChange={ ( val ) => {
						setSettings( {
							...settings,
							site: val,
						} );
					} }
				/>

				<Verification { ...props } />
			</CardBody>
		</Card>
	);
};

export default SiteSelect;
