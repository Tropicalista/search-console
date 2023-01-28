/**
 * WordPress dependencies
 */
import {
	Fragment,
	RawHTML,
	useState,
} from '@wordpress/element';

import {
	__,
	sprintf,
} from '@wordpress/i18n';

import {
	useSelect,
    select,
    useDispatch
} from '@wordpress/data';

import {
	Button,
	ButtonGroup,
	Spinner,
	SelectControl,
	Modal,
	Flex
} from '@wordpress/components';

import SearchType from './modals/searchtype';
import Device from './modals/device';
import Country from './modals/country';
import Page from './modals/page';
import Query from './modals/query';

export function MyModal ( props ) {

	const {
		onRequestClose,
		modal,
		title,
	} = props;

    const remote = select( 'searchconsole' ).getFilterByDimension( modal );
    const searchType = select( 'searchconsole' ).getSearchType();

	const [ localFilter, setLocalFilter ] = useState( remote );

    const { setSearchType, setFilter } = useDispatch( 'searchconsole' );

	const handleChange = ( expression, operator ) => {
		if( 'searchType' === modal ){
			setLocalFilter( expression )
		}
		else{
			setLocalFilter( { dimension: modal, expression: expression, operator: operator } )
		}
	}

	const saveChange = () => {

		if( 'searchType' === modal ){
			setSearchType( localFilter )
		}
		else{
			setFilter( localFilter )
		}
		onRequestClose()

	}

	const modals = {
		SearchType: SearchType,
		Device: Device,
		Country: Country,
		Page: Page,
		Query: Query
	}

	const MyModal = modals[modal];

	return (
		<Modal
			title={ title }
			onRequestClose={ onRequestClose }
		>
			<Fragment>
			
				<div className={ 'search-console-modal-container' }>
					<MyModal handleChange={ handleChange } searchType={ searchType } filter={ localFilter } />
				</div>

				<Flex>
					<Button
						isDestructive={ true }
						onClick={ onRequestClose }
					>Cancel</Button>

					<Button
						isPrimary={ true }
						onClick={ saveChange }
						disabled={ !localFilter }
					>Save</Button>
				</Flex>

			</Fragment>
		</Modal>
	);
}