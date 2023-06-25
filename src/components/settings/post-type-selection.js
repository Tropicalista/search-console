import { useSelect, useDispatch } from '@wordpress/data';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    store as blockEditorStore,
} from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';

export default function PostTypeSelection( props ) {
    const { gapi, settings, refreshToken, getSites } = props;

    // useSelect to retrieve all post types
    const postTypes = useSelect(
        (select) => select(coreStore).getPostTypes({ per_page: -1 }), []
    );

    const { setSettings } = useDispatch( 'searchconsole' );

    const addPostType = (val) => {
        setSettings( {
            ...settings,
            postTypes: [ ...settings.postTypes, val ],
        } );
    }

    const removePostType = (val) => {
        let filteredArray = settings.postTypes.filter(item => item !== val)
        setSettings( {
            ...settings,
            postTypes: filteredArray,
        } );
    }

    // Options expects [{label: ..., value: ...}]
    var postTypeOptions = !Array.isArray(postTypes) ? postTypes : postTypes
        .filter(
            // Filter out internal WP post types eg: wp_block, wp_navigation, wp_template, wp_template_part..
            postType => postType.viewable == true)
        .map(
            // Format the options for display in the <SelectControl/>
            (postType) => ({
                label: postType.labels.singular_name,
                value: postType.slug, // the value saved as postType in attributes
            })
        );

        return (
            <Fragment>
            <p>{ __( 'Choose on which post type you want see Search Console data.', 'search-console' ) }</p>
            {
                postTypeOptions && postTypeOptions.map( (postType, i) => {
                    return <ToggleControl
                        key={ i }
                        label={ postType.label }
                        checked={ settings.postTypes?.includes( postType.value ) }
                        onChange={ (val) => {
                            if (val) {
                                addPostType( postType.value ) 
                            } else {
                                removePostType( postType.value ) 
                            }
                        } }
                    />
                } )
            }
            </Fragment>
        );


}