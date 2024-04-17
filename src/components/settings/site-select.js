import {
	Card,
	CardBody,
	CardHeader,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState } from '@wordpress/element';
import Verification from './verification';
import PostTypeSelection from './post-type-selection';
import { SettingsContext } from '../../context/settings-context';

const SiteSelect = ( props ) => {
	const { settings, updateSetting, refreshToken } =
		useContext( SettingsContext );
	const [ sites, setSites ] = useState( null );

	useEffect( () => {
		if ( settings.token.access_token ) getSites();
	}, [ settings.token ] );

	const getSites = () => {
		const options = [
			{ value: '', label: __( 'Select a site', 'search-console' ) },
		];

		window.gapi?.client?.setToken( settings.token );

		window.gapi?.client?.webmasters?.sites
			.list()
			.then( ( s ) => {
				s.result.siteEntry.forEach( ( site ) => {
					options.push( {
						value: site.siteUrl,
						label: site.siteUrl,
					} );
				} );
				options.sort( function ( a, b ) {
					if ( a.value < b.value ) {
						return -1;
					}
					return 0;
				} );
				setSites( options.sort() );
			} )
			.catch( ( error ) => {
				if ( 401 === error.status ) {
					refreshToken();
				}
			} );
	};

	return (
		<Card>
			<CardHeader>{ __( 'Options', 'search-console' ) }</CardHeader>

			<CardBody>
				<SelectControl
					options={ sites }
					label={ __( 'Choose site', 'search-console' ) }
					help={ __( 'Choose one of your sites.', 'search-console' ) }
					value={ settings.site }
					onChange={ ( val ) => {
						updateSetting( 'site', val );
					} }
				/>

				<PostTypeSelection { ...props } />

				<Verification { ...props } />
			</CardBody>
		</Card>
	);
};

export default SiteSelect;
