import { useState, createContext } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';
import { __ } from '@wordpress/i18n';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

export const SettingsContext = createContext();

function SettingsContextProvider( props ) {
	const defaultQuery = {
		customDate: false,
		type: 'web',
		startDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 29 )
		),
		endDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 1 )
		),
		dimensions: [ 'QUERY' ],
		fields: 'rows',
		dimensionFilterGroups: [
			/*{
				filters: [],
			},*/
		],
	};

	const [ query, setQuery ] = useState( defaultQuery );
	const [ email, setEmail ] = useState( false );

	const [ settings, setSettings ] = useEntityProp(
		'root',
		'site',
		'search_console'
	);

	const { saveEditedEntityRecord } = useDispatch( coreStore );
	const { createNotice } = useDispatch( noticesStore );

	const saveSettings = async () => {
		return saveEditedEntityRecord( 'root', 'site' )
			.then( () => {
				createNotice(
					'info',
					'🎯 ' + __( 'Settings saved.', 'formello' ),
					{
						type: 'snackbar',
					}
				);
			} )
			.catch( ( error ) => {
				createNotice( 'error', '⚠️ ' + error.message, {
					type: 'snackbar',
					explicitDismiss: true,
				} );
			} );
	};

	const { isSaving, hasEdits } = useSelect(
		( select ) => ( {
			isSaving: select( coreStore ).isSavingEntityRecord(
				'root',
				'site'
			),
			hasEdits: select( coreStore ).hasEditsForEntityRecord(
				'root',
				'site',
				undefined,
				'search_console'
			),
		} ),
		[]
	);

	const updateSetting = ( key, value ) => {
		setSettings( { ...settings, [ key ]: value } );
	};

	const updateQuery = ( key, value ) => {
		setQuery( { ...query, [ key ]: value } );
	};

	return (
		<SettingsContext.Provider
			value={ {
				query,
				updateQuery,
				settings,
				updateSetting,
				setSettings,
				saveSettings,
				isSaving,
				email,
				hasEdits,
			} }
		>
			{ props.children }
		</SettingsContext.Provider>
	);
}

export default SettingsContextProvider;
