import { __ } from '@wordpress/i18n';
import {
    useSelect,
    useDispatch,
    dispatch,
    select
} from '@wordpress/data';
import {
    useState,
    Fragment,
    useEffect
} from '@wordpress/element';
import {
    BaseControl,
    Button,
    Notice,
    PanelRow,
    Placeholder,
    Spinner,
    SelectControl,
    TabPanel
} from '@wordpress/components';

export default function Chooser ( props ) {

    const { token, settings } = props;

    const [ sites, setSites ] = useState( [] );
    const [ site, setSite ] = useState( settings.site );
    const [ loading, setLoading ] = useState( false );


    const { setSetting } = useDispatch( 'searchconsole' );

    useEffect( () => {

        if( token ) {

            gapi.load('client:auth', () => {
                gapi.client.load('webmasters', 'v3').then( getSites )
            });

        }

    }, [token] )

    const getSites = () => {

        let sites = []
        gapi.auth.setToken({access_token:token})
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
            <SelectControl
                options={ sites }
                label={ __( 'Choose site', 'search-console' ) }
                help={ __( 'Choose one of your site.', 'search-console' ) }
                value={ site }
                onChange={ ( val ) => {
                    setSetting( 'site', val )
                } }
            />
		</Fragment>		
	)
}