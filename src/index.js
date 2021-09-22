import './style.scss';
import './store';

import { __ } from '@wordpress/i18n';

import {
	Button,
	withNotices,
	NoticeList,
	SnackbarList,
	Notices,
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

function App(props) {

	const [ view, setView ] = useState( 'dashboard' );
	const [ sites, setSites ] = useState( [] );

    const { setSetting } = useDispatch( 'searchconsole' );

	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);
	const { createNotice, removeNotice } = useDispatch( noticesStore );

	const changeView = () => {
		if( 'dashboard' === view ){
			setView( 'settings' )
		} else{
			if( !settings.token || !settings.site ){
				createNotice( 'warning', 'Please you must autenthicate and select a site.', {
					isDismissible: true,
					type: 'snackbar',
					explicitDismiss: true
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
				gapi.client.load('webmasters', 'v3').then( getSites )
			});	
		}
	}, [settings] );

	useEffect( () => {
		let notes = notices
		if( notices.length ){
			setTimeout(function(){
				removeNotice( notes[0].id )
			}, 3000);
		}
	}, [notices] );

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
			<NoticeList
				notices={ notices }
				onRemove={ (n) => removeNotice(n) }
			/>
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

}

window.addEventListener( 'DOMContentLoaded', () => {
	render(
		<App />,
		document.getElementById( 'search-console-wrapper' )
	);
} );