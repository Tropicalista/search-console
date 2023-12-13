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

export default function SaveButton() {
	const [ status ] = useState( 'saved' );

	const { isSaving, saveSettings } = useContext( SettingsContext );

	return (
		<>
			<Flex justify="flex-start">
				<Button
					className={ 'save-settings__save-button' }
					onClick={ () => saveSettings() }
					disabled={ isSaving }
					isBusy={ isSaving }
					variant="primary"
				>
					{ __( 'Save', 'search-console' ) }
				</Button>
				{ [
					isSaving && (
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
