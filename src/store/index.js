import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';
 
const DEFAULT_STATE = {
    settings: {},
    site: '',
    dimension: 'query',
    searchType: 'web',
    startDate: moment().subtract( 29, 'days' ).format('YYYY-MM-DD'),
    endDate: moment().subtract( 1, 'days' ).format('YYYY-MM-DD'),
    filters: []
};
 
const actions = {
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
            value
        };
    },
 
    setSearchType( searchType ) {
        return {
            type: 'SET_SEARCHTYPE',
            searchType
        };
    },
 
    setFilter( filter ) {
        return {
            type: 'SET_FILTER',
            filter
        };
    },
 
    setDimension( dimension ) {
        return {
            type: 'SET_DIMENSION',
            dimension
        };
    },
 
    setStartDate( date ) {
        return {
            type: 'SET_STARTDATE',
            date
        };
    },
 
    removeFilter( filter ) {
        return {
            type: 'REMOVE_FILTER',
            filter
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
 
            case 'SET_STARTDATE':
                return {
                    ...state,
                    startDate: action.date,
                };
 
            case 'SET_FILTER':
                let newFilter = {
                    dimension: action.filter.dimension,
                    expression: action.filter.expression,
                    operator: action.filter.operator
                }
                let arr = state.filters.filter( (f) => {
                    return f.dimension !== action.filter.dimension
                } )
                arr.push( newFilter )
                return {
                    ...state,
                    filters: arr,
                };
                
            case 'REMOVE_FILTER':
                let cleanArr = state.filters.filter( (f) => {
                    return f.dimension !== action.filter.dimension
                } )
                return {
                    ...state,
                    filters: cleanArr,
                };
        }
 
        return state;
    },
 
    actions,
 
    selectors: {
        getSettings( state ) {
            const { settings } = state;
            return settings;
        },
        getQuery( state ) {
            const { site, searchType, filters, settings, dimension, startDate, endDate } = state;
            return {
                site: settings.site,
                dimension,
                startDate,
                endDate,
                searchType,
                filters
            };
        },
        getFilterByDimension( state, filter ){
            if( !state.filters.length ){
                return {
                    dimension: '',
                    expression: '',
                    operator: ''
                }
            }
            let target = state.filters.find( (f) => {
                return f.dimension === filter
            } )
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
    },
 
    controls: {
        FETCH_FROM_API( action ) {
            return apiFetch( { path: action.path } );
        },
    },
 
    resolvers: {
        *getSettings() {
            const path = '/searchconsole/settings/';
            const settings = yield actions.fetchFromAPI( path );
            return actions.setSettings( settings );
        },
    },
} );
 
register( store );