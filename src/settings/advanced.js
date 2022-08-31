import {
    BaseControl,
    Button,
    ExternalLink,
    Placeholder,
    Spinner,
    TextControl,
    ToggleControl,
    __experimentalInputControl as InputControl,
    TabPanel
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
    useState,
    Fragment,
    useEffect,
    RawHTML
} from '@wordpress/element';
import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';

const Advanced = ( props ) => {

    const { settings } = props;
    const { setSettings, setSetting } = useDispatch( 'searchconsole' );

    const authUrl = sprintf( 'https://developers.google.com/web/site-kit?sitename=test&siteurl=%s' , settings.wp_url )
                
    return (
        <div className='search-console-Advanced'>
            <div>
                <div className="components-base-control">
                    <RawHTML>
                        { sprintf(
                            __( '<p>The simplest way to get your own credentials is to go to %s site.</p>', 'search-console' ),
                            `<strong>Google Site Kit</strong>` )
                        }
                    </RawHTML>
                    <p>
                        <ExternalLink href={ authUrl }>
                            { __( 'Go to Site Kit site', 'search-console' ) }
                        </ExternalLink>
                    </p>
                </div>
                <TextControl
                    value={ settings.client_id || '' }
                    label={ __( 'Client ID', 'search-console' ) }
                    help={ __( 'Please go to Developer Console to set up your credentials.', 'search-console' ) }
                    onChange={ (val) => {
                        setSetting( 'client_id', val )
                    } }
                />
                <TextControl
                    value={ settings.client_secret || '' }
                    label={ __( 'Client secret', 'search-console' ) }
                    help={ __( 'Please go to Developer Console to set up your credentials.', 'search-console' ) }
                    onChange={ (val) => {
                        setSetting( 'client_secret', val )
                    } }
                />
                <TextControl
                    readOnly
                    value={ settings.redirect_uri }
                    label={ __( 'Redirect url', 'search-console' ) }
                    help={ __( 'Please do not change this.', 'search-console' ) }
                />
            </div>                
        </div>
    )
}

export default Advanced;