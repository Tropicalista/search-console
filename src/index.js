import './style.scss';
import './store';

import { __ } from '@wordpress/i18n';

import {
	Button,
	withNotices,
	NoticeList,
	SnackbarList,
	Notices
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';

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
			settings:  select( 'stocazzo' ).getSettings(),
			query: select( 'stocazzo' ).getQuery(),
		}
	}, [] );

	useEffect( () => { 
		if( '' === settings.token || '' === settings.site ){
			setView( 'settings' )
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