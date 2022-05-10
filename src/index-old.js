import './style.scss';
import './store';

import { __ } from '@wordpress/i18n';
import { getQueryArg } from '@wordpress/url';

import {
	Button,
	withNotices,
	NoticeList,
	SnackbarList,
	SelectControl
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { gapi } from 'gapi-script';

import {
	useState,
	render,
	Fragment,
	useEffect
} from '@wordpress/element';
import {
	useSelect,
	select,
	useDispatch
} from '@wordpress/data';

import Settings from './settings/';
import Dashboard from './dashboard/';

const App = withNotices(
	( { noticeOperations, noticeUI, noticeList } ) => {

	const [ view, setView ] = useState( 'dashboard' );
	const [ sites, setSites ] = useState( [] );

    const { setSetting } = useDispatch( 'searchconsole' );

	const tab = getQueryArg( window.location.href, 'tab' );

	const changeView = () => {
		if( 'dashboard' === view ){
			setView( 'settings' )
		} else{
			if( !settings.token || !settings.site ){
				noticeOperations.createErrorNotice( 'Please you must autenthicate and select a site.', {
					isDismissible: true,
					explicitDismiss: false
				} );
				return
			}
			setView( 'dashboard' )
		}
	}

	const { settings, query } = useSelect( ( select ) => { 
		return { 
			settings:  select( 'searchconsole' ).getSettings(),
			query: select( 'searchconsole' ).getQuery(),
		}
	}, [] );

	useEffect( () => { 
		if( '' === settings.token || '' === settings.site ){
			setView( 'settings' )
		}
		if( settings.token ){
			gapi.load('client:auth', () => {
				gapi.client.load('searchconsole', 'v1').then( getSites )
			});	
		}
	}, [settings] );

    const getSites = () => {

        let sites = []
        gapi.auth.setToken({access_token:settings.token})
        gapi.client.webmasters.sites.list()
            .then( (s) => {
                s.result.siteEntry.map( (t) => {
                    sites.push({ value:t.siteUrl, label:t.siteUrl })
                } )
                sites.sort(function(a, b){
                    if(a.value < b.value) { return -1; }
                    return 0;
                })
                setSites(sites.sort())
            })
    }

	return (
		<Fragment>
			{ noticeUI }

			<div className="search-console-header">
				<Button 
					isPrimary={ true } 
					onClick={ changeView } 
					icon={ 'settings' === view ? 'dashboard' : 'admin-generic' }>
				</Button>
		        <SelectControl
		            value={ settings.site }
		            options={ sites }
		            onChange={ ( val ) => setSetting( 'site', val ) }
		        />
			</div>
			{ ( 'dashboard' === view && '' !== settings.token ) && <Dashboard settings={ settings } query={ query } /> }
			{ ( 'settings' === view ) && <Settings settings={ settings } /> }
		</Fragment>
	)

})

window.addEventListener( 'DOMContentLoaded', () => {
	render(
		<App />,
		document.getElementById( 'search-console-wrapper' )
	);
} );