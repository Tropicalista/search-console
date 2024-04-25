import { useSelect } from '@wordpress/data';
import { ToggleControl } from '@wordpress/components';
import { Fragment, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { SettingsContext } from '../../context/settings-context';

export default function PostTypeSelection() {
	const { settings, updateSetting, saveSettings } =
		useContext( SettingsContext );

	// useSelect to retrieve all post types
	const postTypes = useSelect(
		( select ) => select( coreStore ).getPostTypes( { per_page: -1 } ),
		[]
	);

	const addPostType = ( val ) => {
		updateSetting( 'postTypes', [ ...settings.postTypes, val ] );
		saveSettings();
	};

	const removePostType = ( val ) => {
		const filteredArray = settings.postTypes.filter(
			( item ) => item !== val
		);
		updateSetting( 'postTypes', filteredArray );
		saveSettings();
	};

	// Options expects [{label: ..., value: ...}]
	const postTypeOptions = ! Array.isArray( postTypes )
		? postTypes
		: postTypes
				.filter(
					// Filter out internal WP post types eg: wp_block, wp_navigation, wp_template, wp_template_part..
					( postType ) =>
						postType.viewable && postType.slug !== 'attachment'
				)
				.map(
					// Format the options for display in the <SelectControl/>
					( postType ) => ( {
						label: postType.labels.singular_name,
						value: postType.slug, // the value saved as postType in attributes
					} )
				);

	return (
		<Fragment>
			<p>
				{ __(
					'Choose on which post type you want see Search Console data.',
					'search-console'
				) }
			</p>
			{ postTypeOptions &&
				postTypeOptions.map( ( postType, i ) => {
					return (
						<ToggleControl
							key={ i }
							label={ postType.label }
							checked={ settings.postTypes.includes(
								postType.value
							) }
							onChange={ ( val ) => {
								if ( val ) {
									addPostType( postType.value );
								} else {
									removePostType( postType.value );
								}
							} }
						/>
					);
				} ) }
		</Fragment>
	);
}
