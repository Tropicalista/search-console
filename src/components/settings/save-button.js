/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Animate, Button, Flex } from '@wordpress/components';
import { useState, useContext } from '@wordpress/element';
import { cloud, Icon } from '@wordpress/icons';
import { SettingsContext } from '../../context/settings-context';

/**
 * Renders the update settings buttons and animation
 *
 * @since 2.1.0
 * @param {Object} props All the props passed to this function
 * @return {string}		 Return the rendered JSX
 */
export default function SaveButton( props ) {
	const [ status, setStatus ] = useState( 'saved' );

	const { loading, saveSettings } = useContext( SettingsContext );

	return (
		<>
			<Flex justify="flex-start">
				<Button
					className={ 'save-settings__save-button' }
					onClick={ () => saveSettings() }
					disabled={ loading }
					isBusy={ loading }
					variant="primary"
				>
					{ __( 'Save', 'search-console' ) }
				</Button>
				{ [
					loading && (
						<Animate type="loading" key="saving">
							{ ( { className: animateClassName } ) => (
								<Flex
									justify="flex-start"
									className={ classnames(
										'message',
										animateClassName
									) }
									gap={ 1 }
								>
									<Icon icon={ cloud } />
									{ __( 'Saving', 'block-visibility' ) }
								</Flex>
							) }
						</Animate>
					),
					status === 'error' && (
						<span className="message update-failed" key="error">
							{ __(
								'Update failed. Try again or get in touch with support.',
								'search-console'
							) }
						</span>
					),
				] }
			</Flex>
		</>
	);
}
