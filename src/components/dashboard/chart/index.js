import { Chart } from 'react-google-charts';
import Options from './chart-options';
import { useState, useEffect, useContext } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SettingsContext } from '../../../context/settings-context';

import LoadingSpinner from '../../loading-spinner.js';

export function MyChart() {
	const { settings, query, showError } = useContext( SettingsContext );

	const [ table, setTable ] = useState( false );

	useEffect( () => {
		if ( settings.token.access_token ) getData();
	}, [ query, settings.token ] );

	const getData = () => {
		window.gapi?.client?.setToken( settings.token );

		window.gapi?.client?.webmasters?.searchanalytics
			.query( {
				...query,
				siteUrl: settings.site,
				dimensions: [ 'date' ],
				fields: 'rows',
			} )
			.then( ( response ) => {
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
						window.moment( row.keys[ 0 ], 'YYYY-MM-DD' ).toDate(),
						formatData( row.clicks ),
						formatData( row.impressions ),
						{
							v: row.ctr,
							f: formatData( row.ctr, 'ctr' ),
						},
						{
							v: row.position,
							f: formatData( row.position, 'position' ),
						},
					] );
				} );
				setTable( temp );
			} )
			.catch( ( error ) => {
				showError( error );
			} );
	};

	const formatData = ( val, metric ) => {
		if ( 'ctr' === metric ) {
			return ( val * 100 ).toFixed( 2 ) + '%';
		}
		if ( 'position' === metric ) {
			return val.toFixed( 2 );
		}
		return val;
	};

	if ( ! table ) {
		return (
			<LoadingSpinner text={ __( 'Fetching data…', 'search-console' ) } />
		);
	}

	return (
		<div className="search-console-chart">
			<Chart
				chartType="LineChart"
				data={ table }
				options={ Options }
				legendToggle
			/>
		</div>
	);
}
