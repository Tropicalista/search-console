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

const Verification = ( props ) => {

    const { token, settings } = props;
    const { setSettings, setSetting } = useDispatch( 'searchconsole' );

    const getMeta = () => {

        if( settings.siteVerification &&  settings.site ){

            gapi.client.load('siteVerification', 'v1').then( (r) => {
                    
                gapi.auth.setToken( { access_token: token } )
                gapi.client.siteVerification.webResource.getToken({
                    "verificationMethod": "META",
                    "site": {
                        "identifier": settings.site.replace( 'sc-domain:', '' ),
                        "type": "SITE"
                    }
                }).then( (r) => {
                    setSetting( 'meta', r.result.token )
                })
            })
        }
    }

    return (
        <div className='search-console-Advanced'>
            <ToggleControl
                label={ __( 'Add verification to site?', 'search-console' ) }
                help={ __( 'Check this if you want output meta verification on frontend.', 'search-console' ) }
                checked={ settings.siteVerification }
                onChange={ (val) => {
                    setSetting( 'siteVerification', val )
                } }
            />
            {
                settings.siteVerification &&
                <BaseControl 
                    help={ __( 'Please click on icon to generate your meta verification tag.', 'search-console' ) } 
                    label={ __( 'Your meta verification tag', 'search-console' ) }
                >
                    <InputControl
                        value={ settings.meta }
                        onChange={ (val) => {
                            setSetting( 'meta', val )
                        } }
                        suffix={
                            <Button onClick={ getMeta } icon={ 'update' } />
                        }
                    />
                </BaseControl>
            }
            
        </div>
    )
}

export default Verification;