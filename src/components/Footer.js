import { ExternalLink, Icon, Flex } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Footer( { title } ) {
	return (
		<div className="footer">
			<div className="inner-container">
				<a href="https://github.com/Tropicalista/search-console" target="_blank">
					Github
				</a>
				<a href="https://wordpress.org/support/plugin/search-console/" target="_blank">
					{ __( 'Support', 'search-console' ) }
				</a>
				<a href="https://wordpress.org/support/plugin/formello/reviews/#new-post" target="_blank">
					{ __( 'Rate ', 'formello' ) }
					<Icon icon="star-filled" />
					<Icon icon="star-filled" />
					<Icon icon="star-filled" />
					<Icon icon="star-filled" />
					<Icon icon="star-filled" />
				</a>
			</div>
		</div>
	);
}
