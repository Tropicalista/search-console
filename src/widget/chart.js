import { Chart } from 'react-google-charts';
import {
	useState,
	useEffect,
	useContext,
	useCallback,
} from '@wordpress/element';
import { Spinner, Button, ButtonGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SettingsContext } from '../context/settings-context';
import { dateI18n } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';

const options = {
	animation: {
		duration: 500,
		easing: 'out',
		startup: true,
	},
	tooltip: {
		isHtml: true,
		showTitle: true,
	},
	chartArea: {
		width: '100%',
	},
	height: 350,
	hAxis: {
		gridlines: {
			count: 5,
			minSpacing: 15,
		},
		minorGridlines: { count: 0 },
		showTextEvery: 1,
	},
	vAxis: {
		textPosition: 'none',
	},
	vAxes: {},
	series: {
		0: { color: '#4285f4', labelInLegend: 'Last 28 days' },
		1: {
			color: '#4285f4',
			lineDashStyle: [ 2, 2 ],
			labelInLegend: 'Previous 28 days',
		},
	},
	legend: { position: 'top', alignment: 'start' },
	focusTarget: 'category',
};

export function MyChart( { url } ) {
	const { settings } = useContext( SettingsContext );

	const [ customOptions, setCustomOptions ] = useState( options );
	const [ table, setTable ] = useState( false );
	const [ data, setData ] = useState();
	const [ metric, setMetric ] = useState( 'clicks' );
	const _gapi = window.gapi;

	const query = {
		siteUrl: settings.site,
		searchType: 'web',
		startDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() - 28 )
		),
		endDate: dateI18n(
			'Y-m-d',
			new Date().setDate( new Date().getDate() )
		),
		dimensions: [ 'date' ],
		dimensionFilterGroups: {},
		dataState: 'all',
	};

	const generateReport = useCallback( () => {
		if ( ! data ) return;
		const current = data.current;
		const previous = data.previous;

		const testTable = [];

		testTable.push( [
			{ type: 'number', label: 'Day' },
			{ type: 'string', role: 'tooltip', p: { html: true } },
			{ label: 'Current', type: 'number' },
			{ label: 'Previous', type: 'number' },
		] );

		for ( const row in current.rows ) {
			testTable.push( [
				parseInt( row ) + 1,
				createCustomHTMLContent(
					row,
					current.rows[ row ].keys[ 0 ],
					formatData( current.rows[ row ][ metric ] ),
					previous.rows[ row ].keys[ 0 ],
					formatData( previous.rows[ row ][ metric ] )
				),
				{
					v: current.rows[ row ][ metric ],
					f: formatData( current.rows[ row ][ metric ] ),
				},
				{
					v: previous.rows[ row ][ metric ],
					f: formatData( previous.rows[ row ][ metric ] ),
				},
			] );
		}

		setTable( testTable );
	}, [ data, metric ] );

	useEffect( () => {
		if ( settings.token.access_token ) getReport();
	}, [] );

	useEffect( () => {
		generateReport();
	}, [ data, generateReport ] );

	const refreshToken = () => {
		apiFetch( {
			path: '/searchconsole/v1/refresh',
			method: 'POST',
		} ).then( ( result ) => {
			window.gapi.client.setToken( result );
			getReport();
		} );
	};

	const getFilters = () => {
		if ( url ) {
			return [
				{
					filters: [
						{
							dimension: 'page',
							expression: url,
							operator: 'EQUALS',
						},
					],
				},
			];
		}
		return null;
	};

	const getReport = () => {
		const current = _gapi.client.newBatch();

		current.add(
			window.gapi.client.webmasters.searchanalytics.query( {
				...query,
				dimensionFilterGroups: getFilters(),
			} ),
			{
				id: 'current',
			}
		);
		current.add(
			window.gapi.client.webmasters.searchanalytics.query( {
				...query,
				dimensionFilterGroups: getFilters(),
				startDate: dateI18n(
					'Y-m-d',
					new Date().setDate( new Date().getDate() - 56 )
				),
				endDate: dateI18n(
					'Y-m-d',
					new Date().setDate( new Date().getDate() - 28 )
				),
			} ),
			{
				id: 'previous',
			}
		);

		current
			.then( ( values ) => {
				if ( 401 === values.result.current.status ) {
					refreshToken();
				}

				setData( {
					current: values.result.current.result,
					previous: values.result.previous.result,
				} );
			} )
			.catch( ( error ) => {
				if ( 401 === error.status ) {
					refreshToken();
				}
			} );
	};

	const formatData = ( val ) => {
		if ( 'ctr' === metric ) {
			return ( val * 100 ).toFixed( 2 ) + '%';
		}
		if ( 'position' === metric ) {
			return val.toFixed( 2 );
		}
		return val;
	};

	const createCustomHTMLContent = (
		day,
		currentDate,
		currentValue,
		previousDate,
		previousValue
	) => {
		return `<div style="padding: 1rem;"><b>${
			__( 'Day' ) + ' ' + ( parseInt( day ) + 1 )
		}</b><div style="display: flex; gap: 1rem;"><span>${ currentDate }</span><b>${ currentValue }</b></div><div style="display: flex; gap: 1rem;"><span>${ previousDate }</span><b>${ previousValue }</b></div></div>`;
	};

	const changeMetric = ( newMetric, newColor ) => {
		setMetric( newMetric );
		setCustomOptions( {
			...customOptions,
			vAxis: {
				direction: 'position' === newMetric ? -1 : 1,
				format: 'ctr' === newMetric ? '#,###%' : 'none',
			},
			series: {
				0: { color: newColor, labelInLegend: 'Last 28 days' },
				1: {
					color: newColor,
					lineDashStyle: [ 3, 3 ],
					labelInLegend: 'Previous 28 days',
				},
			},
		} );
	};

	if ( ! table ) {
		return <Spinner />;
	}

	return (
		<div className="search-console-chart">
			<ButtonGroup>
				<Button
					variant={ 'clicks' === metric ? 'primary' : 'secondary' }
					size="small"
					onClick={ () => changeMetric( 'clicks', '#4285f4' ) }
				>
					{ __( 'Clicks', 'search-console' ) }
				</Button>
				<Button
					variant={
						'impressions' === metric ? 'primary' : 'secondary'
					}
					size="small"
					onClick={ () => changeMetric( 'impressions', '#5e35b1' ) }
				>
					{ __( 'Impressions', 'search-console' ) }
				</Button>
				<Button
					variant={ 'ctr' === metric ? 'primary' : 'secondary' }
					size="small"
					onClick={ () => changeMetric( 'ctr', '#00897b' ) }
				>
					{ __( 'CTR', 'search-console' ) }
				</Button>
				<Button
					variant={ 'position' === metric ? 'primary' : 'secondary' }
					size="small"
					onClick={ () => changeMetric( 'position', '#E8710A' ) }
				>
					{ __( 'Position', 'search-console' ) }
				</Button>
			</ButtonGroup>
			<Chart
				chartType="LineChart"
				data={ table }
				options={ customOptions }
				chartPackages={ [ 'corechart', 'controls', 'charteditor' ] }
			/>
		</div>
	);
}
