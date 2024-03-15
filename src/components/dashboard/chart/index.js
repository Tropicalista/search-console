import { Chart } from 'react-google-charts';
import Options from './chart-options';
import { useState, useEffect, useContext } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SettingsContext } from '../../../context/settings-context';

import LoadingSpinner from '../../loading-spinner.js';

export function MyChart() {
	const { settings, query, refreshToken } = useContext( SettingsContext );

	const [ table, setTable ] = useState( [] );

	useEffect( () => {
		getData();
	}, [ query, settings.token ] );

	const getData = () => {
		//window.gapi?.client?.setToken( settings.token );

		window.gapi?.client?.webmasters?.searchanalytics
			.query( {
				siteUrl: settings.site,
				fields: 'rows',
				rowLimit: null,
				searchType: query.searchType,
				startDate: query.startDate,
				endDate: query.endDate,
				dimensions: [ 'date' ],
				dimensionFilterGroups: query.dimensionFiltersGroup,
			} )
			.then(
				( response ) => {
					const data = response.result.rows;
					const temp = [];
					temp.push( [
						__( 'Keys', 'search-console' ),
						__( 'Clicks', 'search-console' ),
						__( 'Impressions', 'search-console' ),
						'CTR',
						__( 'Position', 'search-console' ),
					] );
					data.forEach( ( row ) => {
						temp.push( [
							moment( row.keys[ 0 ], 'YYYY-MM-DD' ).toDate(),
							row.clicks,
							row.impressions,
							row.ctr * 100,
							parseFloat( row.position ),
						] );
					} );
					setTable( temp );
				},
				( err ) => {
					// eslint-disable-next-line no-console
					console.log( err );
					refreshToken();
				}
			);
	};

	return (
		<div className="search-console-chart">
			{ table.length ? (
				<Chart
					chartType="LineChart"
					loader={ <Spinner /> }
					data={ table }
					options={ Options }
					legendToggle
				/>
			) : (
				<LoadingSpinner
					text={ __( 'Fetching data…', 'search-console' ) }
				/>
			) }
		</div>
	);
}
