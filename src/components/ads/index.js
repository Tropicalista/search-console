import { __, sprintf } from '@wordpress/i18n';
import { Card, CardBody } from '@wordpress/components';

import { useState, RawHTML, Fragment, useEffect } from '@wordpress/element';

import { useSelect, useDispatch, dispatch, select } from '@wordpress/data';

const Ads = ( props ) => {

	const [shown, setShown] = useState(() => {
		// getting stored value
		const shown = localStorage.getItem( 'sc-shown' );
		const initialValue = JSON.parse( shown );
		return initialValue || new Date().getTime();
	});

	return (
		<Card>
			<CardBody>
				<RawHTML>
					{ sprintf(
						/* translators: Developer console url. */
						__(
							`<p>See exactly how your SEO campaigns are performing. 
							The <a href="%s" target="_blank">Rank Tracker</a> tool monitors your site as it moves up 
							or down the search engine results, giving you helpful alerts 
							and visual overviews. Check our <a href="%s" target="_blank">SEO guide</a>.</p>`,
							'search-console'
						),
						'https://www.ranktracker.com/?aid=11354',
						'https://www.ranktracker.com/seo-guide/?aid=11354'
					) }
				</RawHTML>
			</CardBody>
		</Card>
	);
};

export default Ads;
