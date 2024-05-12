import { createRoot, useState, useEffect } from '@wordpress/element';
import { Modal } from '@wordpress/components';
import { MyChart } from '../widget/chart';
import SettingsContextProvider from '../context/settings-context';

const MyModal = () => {
	const [ isOpen, setOpen ] = useState( false );
	const closeModal = () => setOpen( false );

	useEffect( () => {
		const onScroll = ( event ) => setOpen( event.detail.url );

		window.addEventListener( 'search-console-details', onScroll );

		return () => {
			window.removeEventListener( 'search-console-details', onScroll );
		};
	}, [] );

	return (
		<>
			{ isOpen && (
				<Modal
					size="medium"
					title={ isOpen }
					onRequestClose={ closeModal }
				>
					<MyChart url={ isOpen } />
				</Modal>
			) }
		</>
	);
};

const App = () => {
	return (
		<SettingsContextProvider>
			<MyModal />
		</SettingsContextProvider>
	);
};

window.addEventListener( 'DOMContentLoaded', () => {
	const domNode = document.getElementById( 'search-console-table' );
	const root = createRoot( domNode );
	root.render( <App /> );
} );
