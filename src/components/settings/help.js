import {
	Card,
	CardHeader,
	CardBody,
	ExternalLink,
	Button,
} from '@wordpress/components';
import Ads from '../ads';

import { __ } from '@wordpress/i18n';

export default function Help() {
	return (
		<>
			<Card>
				<CardHeader>
					<b>{ __( 'Need help?', 'search-console' ) }</b>
				</CardHeader>

				<CardBody>
					<p>
						{ __(
							'Detailed documentation is available on the plugin website.',
							'search-console'
						) }
					</p>

					<ExternalLink href="https://www.francescopepe.com/docs/search-console">
						{ __( 'Documentation', 'search-console' ) }
					</ExternalLink>
					<p>
						{ __(
							'We would love to help you out if you need any help.',
							'search-console'
						) }
					</p>

					<ExternalLink href="https://wordpress.org/support/plugin/search-console/">
						{ __( 'Ask a question', 'search-console' ) }
					</ExternalLink>
				</CardBody>
			</Card>
			<Card className="ads-container__reviews">
				<CardHeader>
					<b>{ __( 'Do you like the plugin?', 'search-console' ) }</b>
				</CardHeader>

				<CardBody>
					<p>
						{ __(
							'If you like search-console plugin you can share a review to help us and spread some love!',
							'search-console'
						) }
					</p>
					<ExternalLink href="https://wordpress.org/support/plugin/search-console/reviews/#new-post">
						{ __( 'Rate 5 stars!', 'search-console' ) }
					</ExternalLink>
				</CardBody>
			</Card>
		</>
	);
}
