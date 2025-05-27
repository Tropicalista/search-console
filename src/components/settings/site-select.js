import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useContext, useEffect, useState, Fragment } from '@wordpress/element';
import { SettingsContext } from '../../context/settings-context';
import { useGapi } from '../../context/gapi';

const SiteSelect = () => {
	const { settings, updateSetting, saveSettings } =
		useContext( SettingsContext );
	const [ sites, setSites ] = useState( null );

	const gapiScript = useGapi( { token: settings.token } );

	const loadApi = () => {
		window.gapi.client.setToken( settings.token );
		window.gapi.client.load( 'searchconsole', 'v1' ).then( () => {
			getSites();
		} );
	};

	useEffect( () => {
		if ( gapiScript.ready ) {
			loadApi();
		}
	}, [ gapiScript.ready ] );

	const getSites = () => {
		const options = [
			{ value: '', label: __( 'Select a site', 'search-console' ) },
		];

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
			.catch( gapiScript.handleError );
	};

	return (
		<Fragment>
			<SelectControl
				options={ sites }
				label={ __( 'Choose site', 'search-console' ) }
				help={ __( 'Choose one of your sites.', 'search-console' ) }
				value={ settings.site }
				onChange={ ( val ) => {
					updateSetting( 'site', val );
					saveSettings();
				} }
				__nextHasNoMarginBottom
				__next40pxDefaultSize
			/>
		</Fragment>
	);
};

export default SiteSelect;
