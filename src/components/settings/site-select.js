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
import { gapi } from 'gapi-script';
import apiFetch from '@wordpress/api-fetch';

const SiteSelect = ( props ) => {
	const { settings, updateSetting, saveToken } =
		useContext( SettingsContext );
	const [ sites, setSites ] = useState( null );

	useEffect( () => {
		getSites();
	}, [ settings.token ] );

	const refreshToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} )
			.then( ( result ) => {
				updateSetting( 'token', result );
				saveToken( result );
				window.gapi.client.setToken( result );
			} )
			.catch( ( error ) => {
				// eslint-disable-next-line no-console
				console.log( error );
			} );
	};

	const getSites = () => {
		const options = [
			{ value: '', label: __( 'Select a site', 'search-console' ) },
		];

		window.gapi.client.setToken( settings.token );

		gapi.client?.webmasters.sites
			.list()
			.then( ( s ) => {
				s.result.siteEntry.map( ( t ) => {
					options.push( { value: t.siteUrl, label: t.siteUrl } );
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
			<CardHeader>{ __( 'Options', 'formello' ) }</CardHeader>

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
