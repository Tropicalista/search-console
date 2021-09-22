import {
    BaseControl,
    Button,
    PanelRow,
    Placeholder,
    Spinner,
    TextControl,
    __experimentalInputControl as InputControl,
    Notices
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
    useState,
    Fragment,
    useEffect
} from '@wordpress/element';

import Chooser from './chooser'
import Auth from './auth'
import Advanced from './advanced'
import Verification from './verification'
import ServerAuth from './serverAuth'

import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

const Settings = ( props ) => {

    const { settings } = useSelect( ( select ) => { 
        return { 
            settings:  select( 'searchconsole' ).getSettings(),
        }
    }, [] );

    const [ loading, setLoading ] = useState( false );

    const saveSettings = (s) => {

        setLoading(true);
        apiFetch( {
            path: '/searchconsole/settings',
            method: 'POST',
            data: {
                settings: settings
            },
        } ).then( ( result ) => {
            setSetting( 'site', settings.site )
        } )
        .catch( ( error ) => {
            let errors = error.message

        } )
        .finally( () => setLoading(false) )
    }

    return (
        <div className='search-console-settings'>
            { settings.custom_credentials ? 
                <ServerAuth settings={ settings } />
            : 
                <Auth settings={ settings } />
            }
            { '' !== settings.token ? <Chooser token={ settings.token } settings={ settings } /> : null }
            { '' !== settings.token ? <Verification token={ settings.token } settings={ settings } /> : null }

            { '' !== settings.token ?
                <Button 
                    aria-disabled={ loading } 
                    isPrimary 
                    isBusy={ loading } 
                    onClick={ saveSettings }>Save
                </Button>
            :
                null
            }
        </div>
    )
}

export default Settings;