import './style.scss';
import './store';
import menuFix from './utils/menuFix'

import { __ } from '@wordpress/i18n';
import { getQueryArg } from '@wordpress/url';

import {
	Button,
	Spinner,
	withNotices,
	NoticeList,
	Notice,
	SnackbarList,
	SelectControl
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { gapi } from 'gapi-script';
import { HashRouter, Routes, Route } from "react-router-dom";

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

import Settings from './routes/settings';
import Dashboard from './routes/dashboard';
import Navbar from './components/Navbar';

const App = withNotices(
	( { noticeOperations, noticeUI, noticeList } ) => {

    const { setSites } = useDispatch( 'searchconsole' );
	const [ apiLoaded, setApiLoaded ] = useState( false );

	const { settings, query } = useSelect( ( select ) => { 
		return { 
			settings:  select( 'searchconsole' ).getSettings(),
			query: select( 'searchconsole' ).getQuery(),
		}
	}, [] );

	useEffect( () => { 
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

	if( !Object.keys(settings).length ){
		return <Spinner />
	}

	return (
		<React.StrictMode>
			<HashRouter basename="/">
				<Navbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/settings" element={<Settings />} />
				</Routes>
			</HashRouter>
		</React.StrictMode>
	)

})

window.addEventListener( 'DOMContentLoaded', () => {
	render(
		<App />,
		document.getElementById( 'search-console-wrapper' )
	);
} );

// fix the admin menu for the slug "search-console"
menuFix('search-console');