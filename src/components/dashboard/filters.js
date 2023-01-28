import {
	Button,
	Dropdown,
	DropdownMenu,
	MenuItem,
	MenuGroup,
	Icon,
	Flex,
	ButtonGroup
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	useState,
	render,
	Fragment
} from '@wordpress/element';
import {
	withSelect,
	useDispatch,
	useSelect,
	select
} from '@wordpress/data';

import { MyModal } from './modals';
import { DateSelect } from './dateselect';

export function Filters ( props ) {

	const [ showModal, setShowModal ] = useState( false );

    const { removeFilter } = useDispatch( 'searchconsole' );

	const query = select( 'searchconsole' ).getQuery()

	const onRequestClose = ( e ) => {
		setShowModal( false )
	}

	const remove = ( filter ) => {
		removeFilter(filter)
	}


	return (
		<Fragment>
			<div className='search-console-filters'>
				<div className={ 'search-console-filters-options' }>
					<Button 
						isPrimary={ true } 
						onClick={ () => setShowModal( 'SearchType' ) }>
							{ __( 'Search type: ', 'search-console' ) + query.searchType }
					</Button>
					<Dropdown
						className="my-container-class-name"
						contentClassName="my-popover-content-classname"
						position="bottom right"
						renderToggle={ ( { isOpen, onToggle } ) => (
							<Button
								variant="secondary"
								onClick={ onToggle }
								aria-expanded={ isOpen }
								icon={ 'plus' }
								iconPosition={ 'right' }
								text={ __( 'New', 'search-console' ) }
							/>	
						) }
						renderContent={ ({ isOpen, onToggle }) => (
							<MenuGroup>
								<MenuItem 
									onClick={ ()=> { setShowModal( 'Query' ), onToggle()} }>
										{ __( 'Query', 'search-console' ) }
								</MenuItem>
								<MenuItem 
									onClick={ ()=> { setShowModal( 'Page' ), onToggle()} }>
										{ __( 'Page', 'search-console' ) }
								</MenuItem>
								<MenuItem 
									onClick={ ()=> { setShowModal( 'Country' ), onToggle()} }>
										{ __( 'Country', 'search-console' ) }
								</MenuItem>
								<MenuItem 
									onClick={ ()=> { setShowModal( 'Device' ), onToggle()} }>
										{ __( 'Device', 'search-console' ) }
								</MenuItem>
							</MenuGroup>
						) }
					/>
					{
						query.filters.map( (filter, i) => (
							<div className={ 'button-group' }>
								<Button isPrimary key={ i } onClick={ () => setShowModal( filter.dimension ) }>
									{ filter.dimension }: { filter.expression }
								</Button>
								<Button isPrimary onClick={ () => remove(filter) } >x</Button>
							</div>
						) )
					}
				</div>
				<div>
					<DateSelect
						query={ query }
					/>
				</div>
			</div>
			{
				showModal && 
				<MyModal 
					onRequestClose={ onRequestClose } 
					modal={ showModal } 
					title={ showModal } 
				/>
			}
		</Fragment>
	)
}