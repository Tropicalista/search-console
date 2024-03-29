import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';
import { dateI18n } from '@wordpress/date';

const DEFAULT_STATE = {
	settings: false,
	sites: [
		{
			label: 'Select a site',
			value: '',
		},
	],
	customDate: false,
	dimension: 'query',
	searchType: 'web',
	startDate: dateI18n(
		'Y-m-d',
		new Date().setDate( new Date().getDate() - 29 )
	),
	endDate: dateI18n(
		'Y-m-d',
		new Date().setDate( new Date().getDate() - 1 )
	),
	filters: [],
};

const actions = {
	setSites( sites ) {
		return {
			type: 'SET_SITES',
			sites,
		};
	},

	setSettings( settings ) {
		return {
			type: 'SET_SETTINGS',
			settings,
		};
	},

	setSetting( setting, value ) {
		return {
			type: 'SET_SETTING',
			setting,
			value,
		};
	},

	setSearchType( searchType ) {
		return {
			type: 'SET_SEARCHTYPE',
			searchType,
		};
	},

	setFilter( filter ) {
		return {
			type: 'SET_FILTER',
			filter,
		};
	},

	setDimension( dimension ) {
		return {
			type: 'SET_DIMENSION',
			dimension,
		};
	},

	setCustomDate( val ) {
		return {
			type: 'SET_CUSTOMDATE',
			val,
		};
	},

	setStartDate( date ) {
		return {
			type: 'SET_STARTDATE',
			date,
		};
	},

	setEndDate( date ) {
		return {
			type: 'SET_ENDDATE',
			date,
		};
	},

	removeFilter( filter ) {
		return {
			type: 'REMOVE_FILTER',
			filter,
		};
	},

	fetchFromAPI( path ) {
		return {
			type: 'FETCH_FROM_API',
			path,
		};
	},
};

const store = createReduxStore( 'searchconsole', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_SETTINGS':
				return {
					...state,
					settings: action.settings,
				};

			case 'SET_SITES':
				return {
					...state,
					sites: action.sites,
				};

			case 'SET_SETTING':
				return {
					...state,
					settings: {
						...state.settings,
						[ action.setting ]: action.value,
					},
				};

			case 'SET_SEARCHTYPE':
				return {
					...state,
					searchType: action.searchType,
				};

			case 'SET_DIMENSION':
				return {
					...state,
					dimension: action.dimension,
				};

			case 'SET_CUSTOMDATE':
				return {
					...state,
					customDate: action.val,
				};

			case 'SET_STARTDATE':
				return {
					...state,
					startDate: action.date,
				};

			case 'SET_ENDDATE':
				return {
					...state,
					endDate: action.date,
				};

			case 'SET_FILTER':
				const newFilter = {
					dimension: action.filter.dimension,
					expression: action.filter.expression,
					operator: action.filter.operator,
				};
				const arr = state.filters.filter( ( f ) => {
					return f.dimension !== action.filter.dimension;
				} );
				arr.push( newFilter );
				return {
					...state,
					filters: arr,
				};

			case 'REMOVE_FILTER':
				const cleanArr = state.filters.filter( ( f ) => {
					return f.dimension !== action.filter.dimension;
				} );
				return {
					...state,
					filters: cleanArr,
				};
		}

		return state;
	},

	actions,

	selectors: {
		isReady( state ) {
			return state.settings ?? false;
		},
		getSettings( state ) {
			const { settings } = state;
			return settings;
		},
		getSites( state ) {
			const { sites } = state;
			return sites;
		},
		getSite( state ) {
			const { settings } = state;
			return settings.site;
		},
		getQuery( state ) {
			const { searchType, filters, dimension, startDate, endDate } =
				state;
			return {
				dimension,
				startDate,
				endDate,
				searchType,
				filters,
			};
		},
		getFilterByDimension( state, filter ) {
			if ( ! state.filters.length ) {
				return {
					dimension: '',
					expression: '',
					operator: '',
				};
			}
			const target = state.filters.find( ( f ) => {
				return f.dimension === filter;
			} );
			return target;
		},
		getSearchType( state ) {
			const { searchType } = state;
			return searchType;
		},
		getFilters( state ) {
			const { filters } = state;
			return filters;
		},
		getCustomDate( state ) {
			const { customDate } = state;
			return customDate;
		},
	},

	controls: {
		FETCH_FROM_API( action ) {
			return apiFetch( { path: action.path } );
		},
	},

	resolvers: {
		*getSettings() {
			const path = '/searchconsole/v1/settings/';
			const settings = yield actions.fetchFromAPI( path );
			return actions.setSettings( settings );
		},
	},
} );

register( store );
