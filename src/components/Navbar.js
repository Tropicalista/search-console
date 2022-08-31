import '../style.scss';
import '../store';

import { __ } from '@wordpress/i18n';

import {
	Button,
	withNotices,
	NoticeList,
	SelectControl
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { getFragment } from '@wordpress/url';

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

const Navbar = withNotices(
	( { noticeOperations, noticeUI, noticeList } ) => {

	const { removeNotice } = useDispatch( noticesStore );

    const { settings, query, sites, notices } = useSelect( ( select ) => { 
        return { 
            settings:  select( 'searchconsole' ).getSettings(),
            query: select( 'searchconsole' ).getQuery(),
            sites: select( 'searchconsole' ).getSites(),
            notices: select( noticesStore ).getNotices()
        }
    }, [] );

	const { setSetting } = useDispatch( 'searchconsole' );
	const page = getFragment( window.location.href );

	return (
		<Fragment>
			<div className="search-console-header">
				<h1>Search Console</h1>
				{
					'#/settings' !== page &&
			        <SelectControl
			            value={ settings.site }
			            options={ sites }
			            onChange={ ( val ) => setSetting( 'site', val ) }
			        />
				}
			</div>
			<NoticeList
				onRemove={ removeNotice }
				notices={ notices } />
		</Fragment>
	)

})

export default Navbar;