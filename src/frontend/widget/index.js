/**
 * WordPress dependencies
 */
import {
	Fragment,
	RawHTML,
	useState,
	useMemo,
	useEffect
} from '@wordpress/element';
import { useSelect, select, useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';
import { addQueryArgs } from '@wordpress/url';

import { MyChart } from '../../components/dashboard/chart';
import LoadingSpinner from '../../components/loading-spinner.js';
import { gapi } from 'gapi-script';
import '../../store';

const Widget = (props) => {

	const { settings, isReady, query } = useSelect( ( select ) => {
		return {
			settings: select( 'searchconsole' ).getSettings(),
			isReady: select( 'searchconsole' ).isReady(),
			query: select( 'searchconsole' ).getQuery(),
		};
	}, [] );

	const { setSettings, setSites } = useDispatch( 'searchconsole' );

	const [ mounted, setMounted ] = useState( false );
	const token = settings?.token ?? false;

	useEffect( () => {
		if ( ! token ) {
			return;
		}

		gapi.load( 'client:auth2', () => {
			gapi.client.load( 'searchconsole', 'v1' ).then( () => {
				gapi.auth.setToken( token );
				setMounted( true );
			} );
		} );
	}, [ token ] );

	const refreshToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} )
			.then( ( result ) => {
				console.log( result );
				setSettings( {
					...settings,
					token: result,
				} );
				gapi.auth.setToken( result );
			} )
			.catch( ( error ) => {
				console.log( error );
			} )
			.finally( () => setMounted( true ) );
	};

	const settingsUrl = addQueryArgs( 'admin.php', {
		page: 'search-console',
	} );

    if ( token && ! gapi?.auth ) {
        return (
            <LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
        );
    }

	if ( ! token || ! settings?.site || ! settings?.credentials?.client_secret || ! settings?.credentials?.client_id ) {
		return (
			<Notice status="warning" isDismissible={ false }>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							'<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',
							'formello'
						),
						settingsUrl + '#/settings'
					) }
				</RawHTML>
			</Notice>
		);
	}

	return	(
		<div>
			<MyChart
				gapi={ gapi }
				token={ token }
				query={ query }
				site={ settings.site }
				refreshToken={ refreshToken }
			/>
			<RawHTML>
				{ sprintf(
					/* translators: Developer console url. */
					__(
						'<p>More data on <a href="%s">Search Console dashboard</a>.</p>',
						'formello'
					),
					settingsUrl + '#/'
				) }
			</RawHTML>
		</div>
	)
}

export default Widget;