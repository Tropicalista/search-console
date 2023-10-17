/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/dashboard/chart/chart-options.js":
/*!*********************************************************!*\
  !*** ./src/components/dashboard/chart/chart-options.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  width: '100%',
  height: '400',
  colors: ['#4285f4', '#5e35b1', '#00897b', '#E8710A'],
  curveType: 'function',
  //theme: 'material',
  smoothline: 'true',
  focusTarget: 'category',
  chartArea: {
    // leave room for y-axis labels
    width: '100%',
    height: '80%'
  },
  hAxis: {
    gridlines: {
      count: 0,
      minSpacing: 150
    },
    minorGridlines: {
      count: 0
    },
    showTextEvery: 1,
    format: 'MMM dd'
  },
  vAxis: {
    gridlines: {
      count: 0,
      minSpacing: 100
    },
    minorGridlines: {
      count: 1
    },
    showTextEvery: 2
  },
  vAxes: {
    0: {
      title: 'clicks'
    },
    1: {
      title: 'impressions'
    },
    2: {
      format: '#%'
    },
    3: {
      direction: -1
    }
  },
  series: {
    0: {
      type: 'line',
      targetAxisIndex: 0,
      tooltip: true
    },
    // Clicks
    1: {
      type: 'line',
      targetAxisIndex: 1,
      tooltip: true
    },
    // Impressions
    2: {
      type: 'line',
      targetAxisIndex: 2,
      tooltip: true
    },
    // CTR
    3: {
      type: 'line',
      targetAxisIndex: 3,
      tooltip: true
    } // Positions
  }
});

/***/ }),

/***/ "./src/components/dashboard/chart/index.js":
/*!*************************************************!*\
  !*** ./src/components/dashboard/chart/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyChart": () => (/* binding */ MyChart)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _chart_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-options */ "./src/components/dashboard/chart/chart-options.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var gapi_script__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gapi-script */ "./node_modules/gapi-script/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../loading-spinner.js */ "./src/components/loading-spinner.js");










function MyChart() {
  const {
    settings,
    query,
    refreshToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const [table, setTable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getData();
  }, [query, settings.token]);
  const getData = () => {
    window.gapi.client.setToken(settings.token);
    window.gapi.client.webmasters.searchanalytics.query({
      siteUrl: settings.site,
      fields: 'rows',
      rowLimit: null,
      searchType: query.searchType,
      startDate: query.startDate,
      endDate: query.endDate,
      dimensions: ['date'],
      dimensionFilterGroups: query.dimensionFiltersGroup
    }).then(response => {
      const data = response.result.rows;
      const temp = [];
      temp.push([(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Keys', 'search-console'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clicks', 'search-console'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Impressions', 'search-console'), 'CTR', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Position', 'search-console')]);
      data.forEach(row => {
        temp.push([moment(row.keys[0], 'YYYY-MM-DD').toDate(), row.clicks, row.impressions, row.ctr * 100, parseFloat(row.position)]);
      });
      setTable(temp);
    }, err => {
      // eslint-disable-next-line no-console
      console.log(err);
      refreshToken();
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-chart"
  }, table.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_google_charts__WEBPACK_IMPORTED_MODULE_8__.Chart, {
    chartType: "LineChart",
    loader: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null),
    data: table,
    options: _chart_options__WEBPACK_IMPORTED_MODULE_1__["default"],
    legendToggle: true
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fetching data…', 'search-console')
  }));
}

/***/ }),

/***/ "./src/components/loading-spinner.js":
/*!*******************************************!*\
  !*** ./src/components/loading-spinner.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoadingSpinner)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


function LoadingSpinner(_ref) {
  let {
    text
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-settings"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "description"
  }, text));
}

/***/ }),

/***/ "./src/context/settings-context.js":
/*!*****************************************!*\
  !*** ./src/context/settings-context.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsContext": () => (/* binding */ SettingsContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_4__);



// eslint-disable-next-line @wordpress/no-unsafe-wp-apis



const SettingsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();
function SettingsContextProvider(props) {
  const defaultSettings = {
    credentials: {},
    token: false,
    site: '',
    siteVerification: '',
    postTypes: [],
    meta: ''
  };
  const defaultQuery = {
    customDate: false,
    dimension: 'query',
    searchType: 'web',
    startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 29)),
    endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 1)),
    dimensionFiltersGroup: {
      filters: []
    }
  };
  const [settingsSaved, setSettingsSaved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultSettings);
  const [query, setQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultQuery);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [ready, setReady] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [email, setEmail] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const getSettings = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/settings/'
    }).then(options => {
      setSettings(options);
      isAuthenticated(options.token);
    });
  };
  const saveSettings = () => {
    setLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/settings/',
      method: 'POST',
      data: {
        settings
      }
    }).then(() => setLoading(false));
  };
  const saveToken = token => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/save/token/',
      method: 'POST',
      data: {
        token
      }
    }).then(() => setLoading(false));
  };
  const refreshToken = () => {
    setLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/refresh',
      method: 'POST'
    }).then(result => {
      setSettings({
        ...settings,
        token: result
      });
      saveToken(result);
      window.gapi.client.setToken(result);
      loadSearchConsole();
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      loadSearchConsole();
    })
    // eslint-disable-next-line no-console
    .finally(() => setLoading(false));
  };
  const revokeToken = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/revoke',
      method: 'POST',
      data: {
        token: settings.token.refresh_token
      }
    }).then(() => {
      updateSetting('token', false);
      updateSetting('site', false);
      setEmail(false);
    });
  };
  const updateSetting = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };
  const updateQuery = (key, value) => {
    setQuery({
      ...query,
      [key]: value
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleClientLoad = async () => await window.gapi.load('client', getSettings);
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = handleClientLoad;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const isAuthenticated = token => {
    if (!token) {
      loadSearchConsole();
      return false;
    }
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
      path: '/searchconsole/v1/tokeninfo/',
      method: 'POST',
      data: {
        token
      }
    }).then(res => {
      if (res.email) {
        loadSearchConsole();
        setEmail(res.email);
      } else {
        refreshToken();
      }
    }).catch(() => refreshToken());
  };
  const loadSearchConsole = () => {
    window.gapi.client.load('searchconsole', 'v1').then(() => {
      setReady(true);
    });
  };
  const navigator = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseNavigator)();
  const handleChange = e => {
    const slug = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.getQueryArg)(e.detail, 'page');
    const url = new URL(window.location);
    url.searchParams.set('page', slug);
    window.history.pushState(null, '', url.toString());
    navigator.goTo('/' + slug);
  };
  const handlePopstate = e => {
    const slug = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_4__.getQueryArg)(e.target.location, 'page');
    navigator.goTo('/' + slug);
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.addEventListener('changePage', handleChange);
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('changePage', handleChange);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SettingsContext.Provider, {
    value: {
      query,
      updateQuery,
      saveToken,
      settings,
      settingsSaved,
      setSettingsSaved,
      updateSetting,
      setSettings,
      saveSettings,
      loading,
      ready,
      refreshToken,
      revokeToken,
      email
    }
  }, props.children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsContextProvider);

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);



const DEFAULT_STATE = {
  settings: false,
  sites: [{
    label: 'Select a site',
    value: ''
  }],
  customDate: false,
  dimension: 'query',
  searchType: 'web',
  startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 29)),
  endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 1)),
  filters: []
};
const actions = {
  setSites(sites) {
    return {
      type: 'SET_SITES',
      sites
    };
  },
  setSettings(settings) {
    return {
      type: 'SET_SETTINGS',
      settings
    };
  },
  setSetting(setting, value) {
    return {
      type: 'SET_SETTING',
      setting,
      value
    };
  },
  setSearchType(searchType) {
    return {
      type: 'SET_SEARCHTYPE',
      searchType
    };
  },
  setFilter(filter) {
    return {
      type: 'SET_FILTER',
      filter
    };
  },
  setDimension(dimension) {
    return {
      type: 'SET_DIMENSION',
      dimension
    };
  },
  setCustomDate(val) {
    return {
      type: 'SET_CUSTOMDATE',
      val
    };
  },
  setStartDate(date) {
    return {
      type: 'SET_STARTDATE',
      date
    };
  },
  setEndDate(date) {
    return {
      type: 'SET_ENDDATE',
      date
    };
  },
  removeFilter(filter) {
    return {
      type: 'REMOVE_FILTER',
      filter
    };
  },
  fetchFromAPI(path) {
    return {
      type: 'FETCH_FROM_API',
      path
    };
  }
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)('searchconsole', {
  reducer() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    let action = arguments.length > 1 ? arguments[1] : undefined;
    switch (action.type) {
      case 'SET_SETTINGS':
        return {
          ...state,
          settings: action.settings
        };
      case 'SET_SITES':
        return {
          ...state,
          sites: action.sites
        };
      case 'SET_SETTING':
        return {
          ...state,
          settings: {
            ...state.settings,
            [action.setting]: action.value
          }
        };
      case 'SET_SEARCHTYPE':
        return {
          ...state,
          searchType: action.searchType
        };
      case 'SET_DIMENSION':
        return {
          ...state,
          dimension: action.dimension
        };
      case 'SET_CUSTOMDATE':
        return {
          ...state,
          customDate: action.val
        };
      case 'SET_STARTDATE':
        return {
          ...state,
          startDate: action.date
        };
      case 'SET_ENDDATE':
        return {
          ...state,
          endDate: action.date
        };
      case 'SET_FILTER':
        const newFilter = {
          dimension: action.filter.dimension,
          expression: action.filter.expression,
          operator: action.filter.operator
        };
        const arr = state.filters.filter(f => {
          return f.dimension !== action.filter.dimension;
        });
        arr.push(newFilter);
        return {
          ...state,
          filters: arr
        };
      case 'REMOVE_FILTER':
        const cleanArr = state.filters.filter(f => {
          return f.dimension !== action.filter.dimension;
        });
        return {
          ...state,
          filters: cleanArr
        };
    }
    return state;
  },
  actions,
  selectors: {
    isReady(state) {
      var _state$settings;
      return (_state$settings = state.settings) !== null && _state$settings !== void 0 ? _state$settings : false;
    },
    getSettings(state) {
      const {
        settings
      } = state;
      return settings;
    },
    getSites(state) {
      const {
        sites
      } = state;
      return sites;
    },
    getSite(state) {
      const {
        settings
      } = state;
      return settings.site;
    },
    getQuery(state) {
      const {
        searchType,
        filters,
        dimension,
        startDate,
        endDate
      } = state;
      return {
        dimension,
        startDate,
        endDate,
        searchType,
        filters
      };
    },
    getFilterByDimension(state, filter) {
      if (!state.filters.length) {
        return {
          dimension: '',
          expression: '',
          operator: ''
        };
      }
      const target = state.filters.find(f => {
        return f.dimension === filter;
      });
      return target;
    },
    getSearchType(state) {
      const {
        searchType
      } = state;
      return searchType;
    },
    getFilters(state) {
      const {
        filters
      } = state;
      return filters;
    },
    getCustomDate(state) {
      const {
        customDate
      } = state;
      return customDate;
    }
  },
  controls: {
    FETCH_FROM_API(action) {
      return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: action.path
      });
    }
  },
  resolvers: {
    *getSettings() {
      const path = '/searchconsole/v1/settings/';
      const settings = yield actions.fetchFromAPI(path);
      return actions.setSettings(settings);
    }
  }
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);

/***/ }),

/***/ "./src/widget/widget.js":
/*!******************************!*\
  !*** ./src/widget/widget.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_dashboard_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/dashboard/chart */ "./src/components/dashboard/chart/index.js");
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");
/* harmony import */ var gapi_script__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gapi-script */ "./node_modules/gapi-script/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store */ "./src/store/index.js");

/**
 * WordPress dependencies
 */










const Widget = props => {
  var _settings$token;
  const {
    settings,
    isReady,
    query
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      settings: select('searchconsole').getSettings(),
      isReady: select('searchconsole').isReady(),
      query: select('searchconsole').getQuery()
    };
  }, []);
  const {
    setSettings,
    setSites
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('searchconsole');
  const [mounted, setMounted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const token = (_settings$token = settings?.token) !== null && _settings$token !== void 0 ? _settings$token : false;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!token) {
      return;
    }
    gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi?.load('client', () => {
      gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi?.client?.load('searchconsole', 'v1').then(() => {
        gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi?.client?.setToken(token);
        setMounted(true);
      });
    });
  }, [token]);
  const refreshToken = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/searchconsole/v1/refresh',
      method: 'POST'
    }).then(result => {
      console.log(result);
      setSettings({
        ...settings,
        token: result
      });
      gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi.client.setToken(result);
    }).catch(error => {
      console.log(error);
    }).finally(() => setMounted(true));
  };
  const settingsUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_5__.addQueryArgs)('admin.php', {
    page: 'search-console'
  });
  if (token && !gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi?.auth) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Fetching data…', 'search-console')
    });
  }
  if (!token || !settings?.site || !settings?.credentials?.client_secret || !settings?.credentials?.client_id) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, sprintf( /* translators: Developer console url. */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>', 'formello'), settingsUrl + '#/settings')));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_chart__WEBPACK_IMPORTED_MODULE_6__.MyChart, {
    gapi: gapi_script__WEBPACK_IMPORTED_MODULE_8__.gapi,
    token: token,
    query: query,
    site: settings.site,
    refreshToken: refreshToken
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, sprintf( /* translators: Developer console url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<p>More data on <a href="%s">Search Console dashboard</a>.</p>', 'formello'), settingsUrl + '#/')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Widget);

/***/ }),

/***/ "./node_modules/gapi-script/gapiScript.js":
/*!************************************************!*\
  !*** ./node_modules/gapi-script/gapiScript.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gapi": () => (/* binding */ gapi),
/* harmony export */   "gapiComplete": () => (/* binding */ gapiComplete)
/* harmony export */ });
var gapi=window.gapi=window.gapi||{};gapi._bs=new Date().getTime();(function(){/*

  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
 */
 var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a},da=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof __webpack_require__.g&&__webpack_require__.g];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");},ea=da(this),fa=function(a,b){if(b)a:{var c=ea;a=a.split(".");for(var d=0;d<
 a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}},ha=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};
 fa("Symbol",function(a){if(a)return a;var b=function(e,f){this.ba=e;aa(this,"description",{configurable:!0,writable:!0,value:f})};b.prototype.toString=function(){return this.ba};var c=0,d=function(e){if(this instanceof d)throw new TypeError("Symbol is not a constructor");return new b("jscomp_symbol_"+(e||"")+"_"+c++,e)};return d});
 fa("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=ea[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&aa(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ia(ha(this))}})}return a});
 var ia=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a},ja=function(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e};fa("Array.prototype.keys",function(a){return a?a:function(){return ja(this,function(b){return b})}});
 var m=this||self,ka=function(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"},la=function(a,b,c){return a.call.apply(a.bind,arguments)},ma=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}},na=function(a,b,c){na=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
 la:ma;return na.apply(null,arguments)},oa=function(a,b){function c(){}c.prototype=b.prototype;a.ma=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.A=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}},pa=function(a){return a},qa=function(a){var b=null,c=m.trustedTypes;if(!c||!c.createPolicy)return b;try{b=c.createPolicy(a,{createHTML:pa,createScript:pa,createScriptURL:pa})}catch(d){m.console&&m.console.error(d.message)}return b};function q(a){if(Error.captureStackTrace)Error.captureStackTrace(this,q);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}oa(q,Error);q.prototype.name="CustomError";var ra=function(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");q.call(this,c+a[d])};oa(ra,q);ra.prototype.name="AssertionError";
 var sa=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);throw new ra(""+e,f||[]);},ta=function(a,b,c){a||sa("",null,b,Array.prototype.slice.call(arguments,2));return a},ua=function(a,b){throw new ra("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},va=function(a,b,c){"string"!==typeof a&&sa("Expected string but got %s: %s.",[ka(a),a],b,Array.prototype.slice.call(arguments,2))};var xa=function(a,b){a:{try{var c=a&&a.ownerDocument,d=c&&(c.defaultView||c.parentWindow);d=d||m;if(d.Element&&d.Location){var e=d;break a}}catch(g){}e=null}if(e&&"undefined"!=typeof e[b]&&(!a||!(a instanceof e[b])&&(a instanceof e.Location||a instanceof e.Element))){e=typeof a;if("object"==e&&null!=a||"function"==e)try{var f=a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a)}catch(g){f="<object could not be stringified>"}else f=void 0===a?"undefined":null===a?"null":
 typeof a;ua("Argument is not a %s (or a non-Element, non-Location mock); got: %s",b,f)}return a};var ya;var t=function(a,b){this.P=a===za&&b||"";this.ca=Aa};t.prototype.J=!0;t.prototype.H=function(){return this.P};t.prototype.toString=function(){return"Const{"+this.P+"}"};var Ba=function(a){if(a instanceof t&&a.constructor===t&&a.ca===Aa)return a.P;ua("expected object of type Const, got '"+a+"'");return"type_error:Const"},Aa={},za={};var v=function(a,b){this.N=b===Ca?a:""};v.prototype.J=!0;v.prototype.H=function(){return this.N.toString()};v.prototype.toString=function(){return"SafeUrl{"+this.N+"}"};
 var Da=function(a){if(a instanceof v&&a.constructor===v)return a.N;ua("expected object of type SafeUrl, got '"+a+"' of type "+ka(a));return"type_error:SafeUrl"},Ea=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Fa=function(a){if(a instanceof v)return a;a="object"==typeof a&&a.J?a.H():String(a);ta(Ea.test(a),"%s does not match the safe URL pattern",a)||(a="about:invalid#zClosurez");return new v(a,Ca)},Ca={};var w=function(a,b,c){this.M=c===Ga?a:""};w.prototype.J=!0;w.prototype.H=function(){return this.M.toString()};w.prototype.toString=function(){return"SafeHtml{"+this.M+"}"};var Ha=function(a){if(a instanceof w&&a.constructor===w)return a.M;ua("expected object of type SafeHtml, got '"+a+"' of type "+ka(a));return"type_error:SafeHtml"},Ga={},Ia=new w(m.trustedTypes&&m.trustedTypes.emptyHTML||"",0,Ga);var Ja={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0},Ka=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){if("undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(!a.firstChild)return!1;b=a.firstChild.firstChild;a.innerHTML=Ha(Ia);return!b.parentElement});/*
  gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
 var x=window,z=document,La=x.location,Ma=function(){},Na=/\[native code\]/,A=function(a,b,c){return a[b]=a[b]||c},Oa=function(a){for(var b=0;b<this.length;b++)if(this[b]===a)return b;return-1},Pa=function(a){a=a.sort();for(var b=[],c=void 0,d=0;d<a.length;d++){var e=a[d];e!=c&&b.push(e);c=e}return b},Qa=/&/g,Ra=/</g,Sa=/>/g,Ua=/"/g,Va=/'/g,Wa=function(a){return String(a).replace(Qa,"&amp;").replace(Ra,"&lt;").replace(Sa,"&gt;").replace(Ua,"&quot;").replace(Va,"&#39;")},B=function(){var a;if((a=Object.create)&&
 Na.test(a))a=a(null);else{a={};for(var b in a)a[b]=void 0}return a},C=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},Xa=function(a){if(Na.test(Object.keys))return Object.keys(a);var b=[],c;for(c in a)C(a,c)&&b.push(c);return b},D=function(a,b){a=a||{};for(var c in a)C(a,c)&&(b[c]=a[c])},Ya=function(a){return function(){x.setTimeout(a,0)}},E=function(a,b){if(!a)throw Error(b||"");},F=A(x,"gapi",{});var H=function(a,b,c){var d=new RegExp("([#].*&|[#])"+b+"=([^&#]*)","g");b=new RegExp("([?#].*&|[?#])"+b+"=([^&#]*)","g");if(a=a&&(d.exec(a)||b.exec(a)))try{c=decodeURIComponent(a[2])}catch(e){}return c},Za=new RegExp(/^/.source+/([a-zA-Z][-+.a-zA-Z0-9]*:)?/.source+/(\/\/[^\/?#]*)?/.source+/([^?#]*)?/.source+/(\?([^#]*))?/.source+/(#((#|[^#])*))?/.source+/$/.source),$a=/[\ud800-\udbff][\udc00-\udfff]|[^!-~]/g,ab=new RegExp(/(%([^0-9a-fA-F%]|[0-9a-fA-F]([^0-9a-fA-F%])?)?)*/.source+/%($|[^0-9a-fA-F]|[0-9a-fA-F]($|[^0-9a-fA-F]))/.source,
 "g"),bb=/%([a-f]|[0-9a-fA-F][a-f])/g,cb=/^(https?|ftp|file|chrome-extension):$/i,I=function(a){a=String(a);a=a.replace($a,function(e){try{return encodeURIComponent(e)}catch(f){return encodeURIComponent(e.replace(/^[^%]+$/g,"\ufffd"))}}).replace(ab,function(e){return e.replace(/%/g,"%25")}).replace(bb,function(e){return e.toUpperCase()});a=a.match(Za)||[];var b=B(),c=function(e){return e.replace(/\\/g,"%5C").replace(/\^/g,"%5E").replace(/`/g,"%60").replace(/\{/g,"%7B").replace(/\|/g,"%7C").replace(/\}/g,
 "%7D")},d=!!(a[1]||"").match(cb);b.A=c((a[1]||"")+(a[2]||"")+(a[3]||(a[2]&&d?"/":"")));d=function(e){return c(e.replace(/\?/g,"%3F").replace(/#/g,"%23"))};b.query=a[5]?[d(a[5])]:[];b.g=a[7]?[d(a[7])]:[];return b},db=function(a){return a.A+(0<a.query.length?"?"+a.query.join("&"):"")+(0<a.g.length?"#"+a.g.join("&"):"")},eb=function(a,b){var c=[];if(a)for(var d in a)if(C(a,d)&&null!=a[d]){var e=b?b(a[d]):a[d];c.push(encodeURIComponent(d)+"="+encodeURIComponent(e))}return c},fb=function(a,b,c,d){a=I(a);
 a.query.push.apply(a.query,eb(b,d));a.g.push.apply(a.g,eb(c,d));return db(a)},gb=new RegExp(/\/?\??#?/.source+"("+/[\/?#]/i.source+"|"+/[\uD800-\uDBFF]/i.source+"|"+/%[c-f][0-9a-f](%[89ab][0-9a-f]){0,2}(%[89ab]?)?/i.source+"|"+/%[0-9a-f]?/i.source+")$","i"),hb=function(a,b){var c=I(b);b=c.A;c.query.length&&(b+="?"+c.query.join(""));c.g.length&&(b+="#"+c.g.join(""));var d="";2E3<b.length&&(d=b,b=b.substr(0,2E3),b=b.replace(gb,""),d=d.substr(b.length));var e=a.createElement("div");a=a.createElement("a");
 c=I(b);b=c.A;c.query.length&&(b+="?"+c.query.join(""));c.g.length&&(b+="#"+c.g.join(""));b=new v(b,Ca);xa(a,"HTMLAnchorElement");b=b instanceof v?b:Fa(b);a.href=Da(b);e.appendChild(a);b=e.innerHTML;c=new t(za,"Assignment to self.");va(Ba(c),"must provide justification");ta(!/^[\s\xa0]*$/.test(Ba(c)),"must provide non-empty justification");void 0===ya&&(ya=qa("gapi#html"));b=(c=ya)?c.createHTML(b):b;b=new w(b,null,Ga);if(e.tagName&&Ja[e.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+
 e.tagName+".");if(Ka())for(;e.lastChild;)e.removeChild(e.lastChild);e.innerHTML=Ha(b);b=String(e.firstChild.href);e.parentNode&&e.parentNode.removeChild(e);c=I(b+d);d=c.A;c.query.length&&(d+="?"+c.query.join(""));c.g.length&&(d+="#"+c.g.join(""));return d},ib=/^https?:\/\/[^\/%\\?#\s]+\/[^\s]*$/i;var jb=function(a,b,c,d){if(x[c+"EventListener"])x[c+"EventListener"](a,b,!1);else if(x[d+"tachEvent"])x[d+"tachEvent"]("on"+a,b)},kb=function(){var a=z.readyState;return"complete"===a||"interactive"===a&&-1==navigator.userAgent.indexOf("MSIE")},nb=function(a){var b=lb;if(!kb())try{b()}catch(c){}mb(a)},mb=function(a){if(kb())a();else{var b=!1,c=function(){if(!b)return b=!0,a.apply(this,arguments)};x.addEventListener?(x.addEventListener("load",c,!1),x.addEventListener("DOMContentLoaded",c,!1)):x.attachEvent&&
 (x.attachEvent("onreadystatechange",function(){kb()&&c.apply(this,arguments)}),x.attachEvent("onload",c))}},ob=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)},pb={button:!0,div:!0,span:!0};var K;K=A(x,"___jsl",B());A(K,"I",0);A(K,"hel",10);var qb=function(a){return K.dpo?K.h:H(a,"jsh",K.h)},rb=function(a){var b=A(K,"sws",[]);b.push.apply(b,a)},sb=function(a){return A(K,"watt",B())[a]},tb=function(a){var b=A(K,"PQ",[]);K.PQ=[];var c=b.length;if(0===c)a();else for(var d=0,e=function(){++d===c&&a()},f=0;f<c;f++)b[f](e)},ub=function(a){return A(A(K,"H",B()),a,B())};var vb=A(K,"perf",B()),wb=A(vb,"g",B()),xb=A(vb,"i",B());A(vb,"r",[]);B();B();
 var yb=function(a,b,c){var d=vb.r;"function"===typeof d?d(a,b,c):d.push([a,b,c])},L=function(a,b,c){wb[a]=!b&&wb[a]||c||(new Date).getTime();yb(a)},Ab=function(a,b,c){b&&0<b.length&&(b=zb(b),c&&0<c.length&&(b+="___"+zb(c)),28<b.length&&(b=b.substr(0,28)+(b.length-28)),c=b,b=A(xb,"_p",B()),A(b,c,B())[a]=(new Date).getTime(),yb(a,"_p",c))},zb=function(a){return a.join("__").replace(/\./g,"_").replace(/\-/g,"_").replace(/,/g,"_")};var Bb=B(),N=[],O=function(a){throw Error("Bad hint"+(a?": "+a:""));};N.push(["jsl",function(a){for(var b in a)if(C(a,b)){var c=a[b];"object"==typeof c?K[b]=A(K,b,[]).concat(c):A(K,b,c)}if(b=a.u)a=A(K,"us",[]),a.push(b),(b=/^https:(.*)$/.exec(b))&&a.push("http:"+b[1])}]);var Cb=/^(\/[a-zA-Z0-9_\-]+)+$/,Db=[/\/amp\//,/\/amp$/,/^\/amp$/],Eb=/^[a-zA-Z0-9\-_\.,!]+$/,Fb=/^gapi\.loaded_[0-9]+$/,Gb=/^[a-zA-Z0-9,._-]+$/,Kb=function(a,b,c,d){var e=a.split(";"),f=e.shift(),g=Bb[f],h=null;g?h=g(e,b,c,d):O("no hint processor for: "+f);h||O("failed to generate load url");b=h;c=b.match(Hb);(d=b.match(Ib))&&1===d.length&&Jb.test(b)&&c&&1===c.length||O("failed sanity: "+a);return h},Nb=function(a,b,c,d){a=Lb(a);Fb.test(c)||O("invalid_callback");b=Mb(b);d=d&&d.length?Mb(d):null;var e=
 function(f){return encodeURIComponent(f).replace(/%2C/g,",")};return[encodeURIComponent(a.pathPrefix).replace(/%2C/g,",").replace(/%2F/g,"/"),"/k=",e(a.version),"/m=",e(b),d?"/exm="+e(d):"","/rt=j/sv=1/d=1/ed=1",a.S?"/am="+e(a.S):"",a.Z?"/rs="+e(a.Z):"",a.aa?"/t="+e(a.aa):"","/cb=",e(c)].join("")},Lb=function(a){"/"!==a.charAt(0)&&O("relative path");for(var b=a.substring(1).split("/"),c=[];b.length;){a=b.shift();if(!a.length||0==a.indexOf("."))O("empty/relative directory");else if(0<a.indexOf("=")){b.unshift(a);
 break}c.push(a)}a={};for(var d=0,e=b.length;d<e;++d){var f=b[d].split("="),g=decodeURIComponent(f[0]),h=decodeURIComponent(f[1]);2==f.length&&g&&h&&(a[g]=a[g]||h)}b="/"+c.join("/");Cb.test(b)||O("invalid_prefix");c=0;for(d=Db.length;c<d;++c)Db[c].test(b)&&O("invalid_prefix");c=Ob(a,"k",!0);d=Ob(a,"am");e=Ob(a,"rs");a=Ob(a,"t");return{pathPrefix:b,version:c,S:d,Z:e,aa:a}},Mb=function(a){for(var b=[],c=0,d=a.length;c<d;++c){var e=a[c].replace(/\./g,"_").replace(/-/g,"_");Gb.test(e)&&b.push(e)}return b.join(",")},
 Ob=function(a,b,c){a=a[b];!a&&c&&O("missing: "+b);if(a){if(Eb.test(a))return a;O("invalid: "+b)}return null},Jb=/^https?:\/\/[a-z0-9_.-]+\.google(rs)?\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,Ib=/\/cb=/g,Hb=/\/\//g,Pb=function(){var a=qb(La.href);if(!a)throw Error("Bad hint");return a};Bb.m=function(a,b,c,d){(a=a[0])||O("missing_hint");return"https://apis.google.com"+Nb(a,b,c,d)};var Qb=decodeURI("%73cript"),Rb=/^[-+_0-9\/A-Za-z]+={0,2}$/,Sb=function(a,b){for(var c=[],d=0;d<a.length;++d){var e=a[d];e&&0>Oa.call(b,e)&&c.push(e)}return c},Tb=function(){var a=K.nonce;return void 0!==a?a&&a===String(a)&&a.match(Rb)?a:K.nonce=null:z.querySelector?(a=z.querySelector("script[nonce]"))?(a=a.nonce||a.getAttribute("nonce")||"",a&&a===String(a)&&a.match(Rb)?K.nonce=a:K.nonce=null):null:null},Wb=function(a){if("loading"!=z.readyState)Ub(a);else{var b=Tb(),c="";null!==b&&(c=' nonce="'+
 b+'"');a="<"+Qb+' src="'+encodeURI(a)+'"'+c+"></"+Qb+">";z.write(Vb?Vb.createHTML(a):a)}},Ub=function(a){var b=z.createElement(Qb);b.setAttribute("src",Vb?Vb.createScriptURL(a):a);a=Tb();null!==a&&b.setAttribute("nonce",a);b.async="true";(a=z.getElementsByTagName(Qb)[0])?a.parentNode.insertBefore(b,a):(z.head||z.body||z.documentElement).appendChild(b)},Xb=function(a,b){var c=b&&b._c;if(c)for(var d=0;d<N.length;d++){var e=N[d][0],f=N[d][1];f&&C(c,e)&&f(c[e],a,b)}},Zb=function(a,b,c){Yb(function(){var d=
 b===qb(La.href)?A(F,"_",B()):B();d=A(ub(b),"_",d);a(d)},c)},ac=function(a,b){var c=b||{};"function"==typeof b&&(c={},c.callback=b);Xb(a,c);b=a?a.split(":"):[];var d=c.h||Pb(),e=A(K,"ah",B());if(e["::"]&&b.length){a=[];for(var f=null;f=b.shift();){var g=f.split(".");g=e[f]||e[g[1]&&"ns:"+g[0]||""]||d;var h=a.length&&a[a.length-1]||null,k=h;h&&h.hint==g||(k={hint:g,V:[]},a.push(k));k.V.push(f)}var l=a.length;if(1<l){var n=c.callback;n&&(c.callback=function(){0==--l&&n()})}for(;b=a.shift();)$b(b.V,c,
 b.hint)}else $b(b||[],c,d)},$b=function(a,b,c){a=Pa(a)||[];var d=b.callback,e=b.config,f=b.timeout,g=b.ontimeout,h=b.onerror,k=void 0;"function"==typeof h&&(k=h);var l=null,n=!1;if(f&&!g||!f&&g)throw"Timeout requires both the timeout parameter and ontimeout parameter to be set";h=A(ub(c),"r",[]).sort();var p=A(ub(c),"L",[]).sort(),r=[].concat(h),u=function(M,ba){if(n)return 0;x.clearTimeout(l);p.push.apply(p,y);var ca=((F||{}).config||{}).update;ca?ca(e):e&&A(K,"cu",[]).push(e);if(ba){Ab("me0",M,
 r);try{Zb(ba,c,k)}finally{Ab("me1",M,r)}}return 1};0<f&&(l=x.setTimeout(function(){n=!0;g()},f));var y=Sb(a,p);if(y.length){y=Sb(a,h);var G=A(K,"CP",[]),J=G.length;G[J]=function(M){if(!M)return 0;Ab("ml1",y,r);var ba=function(wa){G[J]=null;u(y,M)&&tb(function(){d&&d();wa()})},ca=function(){var wa=G[J+1];wa&&wa()};0<J&&G[J-1]?G[J]=function(){ba(ca)}:ba(ca)};if(y.length){var Ta="loaded_"+K.I++;F[Ta]=function(M){G[J](M);F[Ta]=null};a=Kb(c,y,"gapi."+Ta,h);h.push.apply(h,y);Ab("ml0",y,r);b.sync||x.___gapisync?
 Wb(a):Ub(a)}else G[J](Ma)}else u(y)&&d&&d()},Vb=qa("gapi#gapi");var Yb=function(a,b){if(K.hee&&0<K.hel)try{return a()}catch(c){b&&b(c),K.hel--,ac("debug_error",function(){try{window.___jsl.hefn(c)}catch(d){throw c;}})}else try{return a()}catch(c){throw b&&b(c),c;}};F.load=function(a,b){return Yb(function(){return ac(a,b)})};var bc=function(a){var b=window.___jsl=window.___jsl||{};b[a]=b[a]||[];return b[a]},cc=function(a){var b=window.___jsl=window.___jsl||{};b.cfg=!a&&b.cfg||{};return b.cfg},dc=function(a){return"object"===typeof a&&/\[native code\]/.test(a.push)},P=function(a,b,c){if(b&&"object"===typeof b)for(var d in b)!Object.prototype.hasOwnProperty.call(b,d)||c&&"___goc"===d&&"undefined"===typeof b[d]||(a[d]&&b[d]&&"object"===typeof a[d]&&"object"===typeof b[d]&&!dc(a[d])&&!dc(b[d])?P(a[d],b[d]):b[d]&&"object"===
 typeof b[d]?(a[d]=dc(b[d])?[]:{},P(a[d],b[d])):a[d]=b[d])},ec=function(a){if(a&&!/^\s+$/.test(a)){for(;0==a.charCodeAt(a.length-1);)a=a.substring(0,a.length-1);try{var b=window.JSON.parse(a)}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ("+a+"\n)"))()}catch(c){}if("object"===typeof b)return b;try{b=(new Function("return ({"+a+"\n})"))()}catch(c){}return"object"===typeof b?b:{}}},fc=function(a,b){var c={___goc:void 0};a.length&&a[a.length-1]&&Object.hasOwnProperty.call(a[a.length-
 1],"___goc")&&"undefined"===typeof a[a.length-1].___goc&&(c=a.pop());P(c,b);a.push(c)},gc=function(a){cc(!0);var b=window.___gcfg,c=bc("cu"),d=window.___gu;b&&b!==d&&(fc(c,b),window.___gu=b);b=bc("cu");var e=document.scripts||document.getElementsByTagName("script")||[];d=[];var f=[];f.push.apply(f,bc("us"));for(var g=0;g<e.length;++g)for(var h=e[g],k=0;k<f.length;++k)h.src&&0==h.src.indexOf(f[k])&&d.push(h);0==d.length&&0<e.length&&e[e.length-1].src&&d.push(e[e.length-1]);for(e=0;e<d.length;++e)d[e].getAttribute("gapi_processed")||
 (d[e].setAttribute("gapi_processed",!0),(f=d[e])?(g=f.nodeType,f=3==g||4==g?f.nodeValue:f.textContent||f.innerText||f.innerHTML||""):f=void 0,(f=ec(f))&&b.push(f));a&&fc(c,a);d=bc("cd");a=0;for(b=d.length;a<b;++a)P(cc(),d[a],!0);d=bc("ci");a=0;for(b=d.length;a<b;++a)P(cc(),d[a],!0);a=0;for(b=c.length;a<b;++a)P(cc(),c[a],!0)},Q=function(a){var b=cc();if(!a)return b;a=a.split("/");for(var c=0,d=a.length;b&&"object"===typeof b&&c<d;++c)b=b[a[c]];return c===a.length&&void 0!==b?b:void 0},hc=function(a,
 b){var c;if("string"===typeof a){var d=c={};a=a.split("/");for(var e=0,f=a.length;e<f-1;++e){var g={};d=d[a[e]]=g}d[a[e]]=b}else c=a;gc(c)};var ic=function(){var a=window.__GOOGLEAPIS;a&&(a.googleapis&&!a["googleapis.config"]&&(a["googleapis.config"]=a.googleapis),A(K,"ci",[]).push(a),window.__GOOGLEAPIS=void 0)};var jc={callback:1,clientid:1,cookiepolicy:1,openidrealm:-1,includegrantedscopes:-1,requestvisibleactions:1,scope:1},kc=!1,lc=B(),mc=function(){if(!kc){for(var a=document.getElementsByTagName("meta"),b=0;b<a.length;++b){var c=a[b].name.toLowerCase();if(0==c.lastIndexOf("google-signin-",0)){c=c.substring(14);var d=a[b].content;jc[c]&&d&&(lc[c]=d)}}if(window.self!==window.top){a=document.location.toString();for(var e in jc)0<jc[e]&&(b=H(a,e,""))&&(lc[e]=b)}kc=!0}e=B();D(lc,e);return e},nc=function(a){return!!(a.clientid&&
 a.scope&&a.callback)};var oc=window.console,pc=function(a){oc&&oc.log&&oc.log(a)};var qc=function(){return!!K.oa},rc=function(){};var R=A(K,"rw",B()),sc=function(a){for(var b in R)a(R[b])},tc=function(a,b){(a=R[a])&&a.state<b&&(a.state=b)};var uc;var vc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/u\/(\d)\//,wc=/^https?:\/\/(?:\w|[\-\.])+\.google\.(?:\w|[\-:\.])+(?:\/[^\?#]*)?\/b\/(\d{10,21})\//,xc=function(a){var b=Q("googleapis.config/sessionIndex");"string"===typeof b&&254<b.length&&(b=null);null==b&&(b=window.__X_GOOG_AUTHUSER);"string"===typeof b&&254<b.length&&(b=null);if(null==b){var c=window.google;c&&(b=c.authuser)}"string"===typeof b&&254<b.length&&(b=null);null==b&&(a=a||window.location.href,b=H(a,"authuser")||
 null,null==b&&(b=(b=a.match(vc))?b[1]:null));if(null==b)return null;b=String(b);254<b.length&&(b=null);return b},yc=function(a){var b=Q("googleapis.config/sessionDelegate");"string"===typeof b&&21<b.length&&(b=null);null==b&&(b=(a=(a||window.location.href).match(wc))?a[1]:null);if(null==b)return null;b=String(b);21<b.length&&(b=null);return b};var zc,S,T=void 0,U=function(a){try{return m.JSON.parse.call(m.JSON,a)}catch(b){return!1}},V=function(a){return Object.prototype.toString.call(a)},Ac=V(0),Bc=V(new Date(0)),Cc=V(!0),Dc=V(""),Ec=V({}),Fc=V([]),W=function(a,b){if(b)for(var c=0,d=b.length;c<d;++c)if(a===b[c])throw new TypeError("Converting circular structure to JSON");d=typeof a;if("undefined"!==d){c=Array.prototype.slice.call(b||[],0);c[c.length]=a;b=[];var e=V(a);if(null!=a&&"function"===typeof a.toJSON&&(Object.prototype.hasOwnProperty.call(a,
 "toJSON")||(e!==Fc||a.constructor!==Array&&a.constructor!==Object)&&(e!==Ec||a.constructor!==Array&&a.constructor!==Object)&&e!==Dc&&e!==Ac&&e!==Cc&&e!==Bc))return W(a.toJSON.call(a),c);if(null==a)b[b.length]="null";else if(e===Ac)a=Number(a),isNaN(a)||isNaN(a-a)?a="null":-0===a&&0>1/a&&(a="-0"),b[b.length]=String(a);else if(e===Cc)b[b.length]=String(!!Number(a));else{if(e===Bc)return W(a.toISOString.call(a),c);if(e===Fc&&V(a.length)===Ac){b[b.length]="[";var f=0;for(d=Number(a.length)>>0;f<d;++f)f&&
 (b[b.length]=","),b[b.length]=W(a[f],c)||"null";b[b.length]="]"}else if(e==Dc&&V(a.length)===Ac){b[b.length]='"';f=0;for(c=Number(a.length)>>0;f<c;++f)d=String.prototype.charAt.call(a,f),e=String.prototype.charCodeAt.call(a,f),b[b.length]="\b"===d?"\\b":"\f"===d?"\\f":"\n"===d?"\\n":"\r"===d?"\\r":"\t"===d?"\\t":"\\"===d||'"'===d?"\\"+d:31>=e?"\\u"+(e+65536).toString(16).substr(1):32<=e&&65535>=e?d:"\ufffd";b[b.length]='"'}else if("object"===d){b[b.length]="{";d=0;for(f in a)Object.prototype.hasOwnProperty.call(a,
 f)&&(e=W(a[f],c),void 0!==e&&(d++&&(b[b.length]=","),b[b.length]=W(f),b[b.length]=":",b[b.length]=e));b[b.length]="}"}else return}return b.join("")}},Gc=/[\0-\x07\x0b\x0e-\x1f]/,Hc=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*[\0-\x1f]/,Ic=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\[^\\\/"bfnrtu]/,Jc=/^([^"]*"([^\\"]|\\.)*")*[^"]*"([^"\\]|\\.)*\\u([0-9a-fA-F]{0,3}[^0-9a-fA-F])/,Kc=/"([^\0-\x1f\\"]|\\[\\\/"bfnrt]|\\u[0-9a-fA-F]{4})*"/g,Lc=/-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?/g,Mc=/[ \t\n\r]+/g,
 Nc=/[^"]:/,Oc=/""/g,Pc=/true|false|null/g,Qc=/00/,Rc=/[\{]([^0\}]|0[^:])/,Sc=/(^|\[)[,:]|[,:](\]|\}|[,:]|$)/,Tc=/[^\[,:][\[\{]/,Uc=/^(\{|\}|\[|\]|,|:|0)+/,Vc=/\u2028/g,Wc=/\u2029/g,Xc=function(a){a=String(a);if(Gc.test(a)||Hc.test(a)||Ic.test(a)||Jc.test(a))return!1;var b=a.replace(Kc,'""');b=b.replace(Lc,"0");b=b.replace(Mc,"");if(Nc.test(b))return!1;b=b.replace(Oc,"0");b=b.replace(Pc,"0");if(Qc.test(b)||Rc.test(b)||Sc.test(b)||Tc.test(b)||!b||(b=b.replace(Uc,"")))return!1;a=a.replace(Vc,"\\u2028").replace(Wc,
 "\\u2029");b=void 0;try{b=T?[U(a)]:eval("(function (var_args) {\n  return Array.prototype.slice.call(arguments, 0);\n})(\n"+a+"\n)")}catch(c){return!1}return b&&1===b.length?b[0]:!1},Yc=function(){var a=((m.document||{}).scripts||[]).length;if((void 0===zc||void 0===T||S!==a)&&-1!==S){zc=T=!1;S=-1;try{try{T=!!m.JSON&&'{"a":[3,true,"1970-01-01T00:00:00.000Z"]}'===m.JSON.stringify.call(m.JSON,{a:[3,!0,new Date(0)],c:function(){}})&&!0===U("true")&&3===U('[{"a":3}]')[0].a}catch(b){}zc=T&&!U("[00]")&&
 !U('"\u0007"')&&!U('"\\0"')&&!U('"\\v"')}finally{S=a}}},Zc=function(a){if(-1===S)return!1;Yc();return(zc?U:Xc)(a)},$c=function(a){if(-1!==S)return Yc(),T?m.JSON.stringify.call(m.JSON,a):W(a)},ad=!Date.prototype.toISOString||"function"!==typeof Date.prototype.toISOString||"1970-01-01T00:00:00.000Z"!==(new Date(0)).toISOString(),bd=function(){var a=Date.prototype.getUTCFullYear.call(this);return[0>a?"-"+String(1E6-a).substr(1):9999>=a?String(1E4+a).substr(1):"+"+String(1E6+a).substr(1),"-",String(101+
 Date.prototype.getUTCMonth.call(this)).substr(1),"-",String(100+Date.prototype.getUTCDate.call(this)).substr(1),"T",String(100+Date.prototype.getUTCHours.call(this)).substr(1),":",String(100+Date.prototype.getUTCMinutes.call(this)).substr(1),":",String(100+Date.prototype.getUTCSeconds.call(this)).substr(1),".",String(1E3+Date.prototype.getUTCMilliseconds.call(this)).substr(1),"Z"].join("")};Date.prototype.toISOString=ad?bd:Date.prototype.toISOString;var cd=function(){this.j=-1};var dd=function(){this.j=64;this.b=[];this.G=[];this.da=[];this.C=[];this.C[0]=128;for(var a=1;a<this.j;++a)this.C[a]=0;this.D=this.o=0;this.reset()};oa(dd,cd);dd.prototype.reset=function(){this.b[0]=1732584193;this.b[1]=4023233417;this.b[2]=2562383102;this.b[3]=271733878;this.b[4]=3285377520;this.D=this.o=0};
 var ed=function(a,b,c){c||(c=0);var d=a.da;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.b[0];c=a.b[1];var g=a.b[2],h=a.b[3],k=a.b[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
 (f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.b[0]=a.b[0]+b&4294967295;a.b[1]=a.b[1]+c&4294967295;a.b[2]=a.b[2]+g&4294967295;a.b[3]=a.b[3]+h&4294967295;a.b[4]=a.b[4]+k&4294967295};
 dd.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.j,d=0,e=this.G,f=this.o;d<b;){if(0==f)for(;d<=c;)ed(this,a,d),d+=this.j;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.j){ed(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.j){ed(this,e);f=0;break}}this.o=f;this.D+=b}};
 dd.prototype.digest=function(){var a=[],b=8*this.D;56>this.o?this.update(this.C,56-this.o):this.update(this.C,this.j-(this.o-56));for(var c=this.j-1;56<=c;c--)this.G[c]=b&255,b/=256;ed(this,this.G);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.b[c]>>d&255,++b;return a};var fd=function(){this.O=new dd};fd.prototype.reset=function(){this.O.reset()};var gd=x.crypto,hd=!1,id=0,jd=0,kd=1,ld=0,md="",nd=function(a){a=a||x.event;var b=a.screenX+a.clientX<<16;b+=a.screenY+a.clientY;b*=(new Date).getTime()%1E6;kd=kd*b%ld;0<id&&++jd==id&&jb("mousemove",nd,"remove","de")},od=function(a){var b=new fd;a=unescape(encodeURIComponent(a));for(var c=[],d=0,e=a.length;d<e;++d)c.push(a.charCodeAt(d));b.O.update(c);b=b.O.digest();a="";for(c=0;c<b.length;c++)a+="0123456789ABCDEF".charAt(Math.floor(b[c]/16))+"0123456789ABCDEF".charAt(b[c]%16);return a};
 hd=!!gd&&"function"==typeof gd.getRandomValues;hd||(ld=1E6*(screen.width*screen.width+screen.height),md=od(z.cookie+"|"+z.location+"|"+(new Date).getTime()+"|"+Math.random()),id=Q("random/maxObserveMousemove")||0,0!=id&&jb("mousemove",nd,"add","at"));var pd=function(){var a=kd;a+=parseInt(md.substr(0,20),16);md=od(md);return a/(ld+Math.pow(16,20))},qd=function(){var a=new x.Uint32Array(1);gd.getRandomValues(a);return Number("0."+a[0])};var rd=function(){var a=K.onl;if(!a){a=B();K.onl=a;var b=B();a.e=function(c){var d=b[c];d&&(delete b[c],d())};a.a=function(c,d){b[c]=d};a.r=function(c){delete b[c]}}return a},sd=function(a,b){b=b.onload;return"function"===typeof b?(rd().a(a,b),b):null},td=function(a){E(/^\w+$/.test(a),"Unsupported id - "+a);rd();return'onload="window.___jsl.onl.e(&#34;'+a+'&#34;)"'},ud=function(a){rd().r(a)};var vd={allowtransparency:"true",frameborder:"0",hspace:"0",marginheight:"0",marginwidth:"0",scrolling:"no",style:"",tabindex:"0",vspace:"0",width:"100%"},wd={allowtransparency:!0,onload:!0},xd=0,yd=function(a){E(!a||ib.test(a),"Illegal url for new iframe - "+a)},zd=function(a,b,c,d,e){yd(c.src);var f,g=sd(d,c),h=g?td(d):"";try{document.all&&(f=a.createElement('<iframe frameborder="'+Wa(String(c.frameborder))+'" scrolling="'+Wa(String(c.scrolling))+'" '+h+' name="'+Wa(String(c.name))+'"/>'))}catch(l){}finally{f||
 (f=a.createElement("iframe"),g&&(f.onload=function(){f.onload=null;g.call(this)},ud(d)))}f.setAttribute("ng-non-bindable","");for(var k in c)a=c[k],"style"===k&&"object"===typeof a?D(a,f.style):wd[k]||f.setAttribute(k,String(a));(k=e&&e.beforeNode||null)||e&&e.dontclear||ob(b);b.insertBefore(f,k);f=k?k.previousSibling:b.lastChild;c.allowtransparency&&(f.allowTransparency=!0);return f};var Ad=/^:[\w]+$/,Bd=/:([a-zA-Z_]+):/g,Cd=function(){var a=xc()||"0",b=yc();var c=xc(void 0)||a;var d=yc(void 0),e="";c&&(e+="u/"+encodeURIComponent(String(c))+"/");d&&(e+="b/"+encodeURIComponent(String(d))+"/");c=e||null;(e=(d=!1===Q("isLoggedIn"))?"_/im/":"")&&(c="");var f=Q("iframes/:socialhost:"),g=Q("iframes/:im_socialhost:");return uc={socialhost:f,ctx_socialhost:d?g:f,session_index:a,session_delegate:b,session_prefix:c,im_prefix:e}},Dd=function(a,b){return Cd()[b]||""},Ed=function(a){return function(b,
 c){return a?Cd()[c]||a[c]||"":Cd()[c]||""}};var Fd=function(a){var b;a.match(/^https?%3A/i)&&(b=decodeURIComponent(a));return hb(document,b?b:a)},Gd=function(a){a=a||"canonical";for(var b=document.getElementsByTagName("link"),c=0,d=b.length;c<d;c++){var e=b[c],f=e.getAttribute("rel");if(f&&f.toLowerCase()==a&&(e=e.getAttribute("href"))&&(e=Fd(e))&&null!=e.match(/^https?:\/\/[\w\-_\.]+/i))return e}return window.location.href};var Hd={se:"0"},Id={post:!0},Jd={style:"position:absolute;top:-10000px;width:450px;margin:0px;border-style:none"},Kd="onPlusOne _ready _close _open _resizeMe _renderstart oncircled drefresh erefresh".split(" "),Ld=A(K,"WI",B()),Md=function(a,b,c){var d;var e={};var f=d=a;"plus"==a&&b.action&&(d=a+"_"+b.action,f=a+"/"+b.action);(d=Q("iframes/"+d+"/url"))||(d=":im_socialhost:/:session_prefix::im_prefix:_/widget/render/"+f+"?usegapi=1");for(var g in Hd)e[g]=g+"/"+(b[g]||Hd[g])+"/";e=hb(z,d.replace(Bd,
 Ed(e)));g="iframes/"+a+"/params/";f={};D(b,f);(d=Q("lang")||Q("gwidget/lang"))&&(f.hl=d);Id[a]||(f.origin=window.location.origin||window.location.protocol+"//"+window.location.host);f.exp=Q(g+"exp");if(g=Q(g+"location"))for(d=0;d<g.length;d++){var h=g[d];f[h]=x.location[h]}switch(a){case "plus":case "follow":g=f.href;d=b.action?void 0:"publisher";g=(g="string"==typeof g?g:void 0)?Fd(g):Gd(d);f.url=g;delete f.href;break;case "plusone":g=(g=b.href)?Fd(g):Gd();f.url=g;g=b.db;d=Q();null==g&&d&&(g=d.db,
 null==g&&(g=d.gwidget&&d.gwidget.db));f.db=g||void 0;g=b.ecp;d=Q();null==g&&d&&(g=d.ecp,null==g&&(g=d.gwidget&&d.gwidget.ecp));f.ecp=g||void 0;delete f.href;break;case "signin":f.url=Gd()}K.ILI&&(f.iloader="1");delete f["data-onload"];delete f.rd;for(var k in Hd)f[k]&&delete f[k];f.gsrc=Q("iframes/:source:");k=Q("inline/css");"undefined"!==typeof k&&0<c&&k>=c&&(f.ic="1");k=/^#|^fr-/;c={};for(var l in f)C(f,l)&&k.test(l)&&(c[l.replace(k,"")]=f[l],delete f[l]);l="q"==Q("iframes/"+a+"/params/si")?f:
 c;k=mc();for(var n in k)!C(k,n)||C(f,n)||C(c,n)||(l[n]=k[n]);n=[].concat(Kd);(l=Q("iframes/"+a+"/methods"))&&"object"===typeof l&&Na.test(l.push)&&(n=n.concat(l));for(var p in b)C(b,p)&&/^on/.test(p)&&("plus"!=a||"onconnect"!=p)&&(n.push(p),delete f[p]);delete f.callback;c._methods=n.join(",");return fb(e,f,c)},Nd=["style","data-gapiscan"],Pd=function(a){for(var b=B(),c=0!=a.nodeName.toLowerCase().indexOf("g:"),d=0,e=a.attributes.length;d<e;d++){var f=a.attributes[d],g=f.name,h=f.value;0<=Oa.call(Nd,
 g)||c&&0!=g.indexOf("data-")||"null"===h||"specified"in f&&!f.specified||(c&&(g=g.substr(5)),b[g.toLowerCase()]=h)}a=a.style;(c=Od(a&&a.height))&&(b.height=String(c));(a=Od(a&&a.width))&&(b.width=String(a));return b},Od=function(a){var b=void 0;"number"===typeof a?b=a:"string"===typeof a&&(b=parseInt(a,10));return b},Rd=function(){var a=K.drw;sc(function(b){if(a!==b.id&&4!=b.state&&"share"!=b.type){var c=b.id,d=b.type,e=b.url;b=b.userParams;var f=z.getElementById(c);if(f){var g=Md(d,b,0);g?(f=f.parentNode,
 e.replace(/#.*/,"").replace(/(\?|&)ic=1/,"")!==g.replace(/#.*/,"").replace(/(\?|&)ic=1/,"")&&(b.dontclear=!0,b.rd=!0,b.ri=!0,b.type=d,Qd(f,b),(d=R[f.lastChild.id])&&(d.oid=c),tc(c,4))):delete R[c]}else delete R[c]}})};var Sd,Td,X,Ud,Vd,Wd=/(?:^|\s)g-((\S)*)(?:$|\s)/,Xd={plusone:!0,autocomplete:!0,profile:!0,signin:!0,signin2:!0};Sd=A(K,"SW",B());Td=A(K,"SA",B());X=A(K,"SM",B());Ud=A(K,"FW",[]);Vd=null;
 var Zd=function(a,b){Yd(void 0,!1,a,b)},Yd=function(a,b,c,d){L("ps0",!0);c=("string"===typeof c?document.getElementById(c):c)||z;var e=z.documentMode;if(c.querySelectorAll&&(!e||8<e)){e=d?[d]:Xa(Sd).concat(Xa(Td)).concat(Xa(X));for(var f=[],g=0;g<e.length;g++){var h=e[g];f.push(".g-"+h,"g\\:"+h)}e=c.querySelectorAll(f.join(","))}else e=c.getElementsByTagName("*");c=B();for(f=0;f<e.length;f++){g=e[f];var k=g;h=d;var l=k.nodeName.toLowerCase(),n=void 0;if(k.getAttribute("data-gapiscan"))h=null;else{var p=
 l.indexOf("g:");0==p?n=l.substr(2):(p=(p=String(k.className||k.getAttribute("class")))&&Wd.exec(p))&&(n=p[1]);h=!n||!(Sd[n]||Td[n]||X[n])||h&&n!==h?null:n}h&&(Xd[h]||0==g.nodeName.toLowerCase().indexOf("g:")||0!=Xa(Pd(g)).length)&&(g.setAttribute("data-gapiscan",!0),A(c,h,[]).push(g))}if(b)for(var r in c)for(b=c[r],d=0;d<b.length;d++)b[d].setAttribute("data-onload",!0);for(var u in c)Ud.push(u);L("ps1",!0);if((r=Ud.join(":"))||a)try{F.load(r,a)}catch(G){pc(G);return}if($d(Vd||{}))for(var y in c){a=
 c[y];u=0;for(b=a.length;u<b;u++)a[u].removeAttribute("data-gapiscan");ae(y)}else{d=[];for(y in c)for(a=c[y],u=0,b=a.length;u<b;u++)e=a[u],be(y,e,Pd(e),d,b);ce(r,d)}},de=function(a){var b=A(F,a,{});b.go||(b.go=function(c){return Zd(c,a)},b.render=function(c,d){d=d||{};d.type=a;return Qd(c,d)})},ee=function(a){Sd[a]=!0},fe=function(a){Td[a]=!0},ge=function(a){X[a]=!0};var ae=function(a,b){var c=sb(a);b&&c?(c(b),(c=b.iframeNode)&&c.setAttribute("data-gapiattached",!0)):F.load(a,function(){var d=sb(a),e=b&&b.iframeNode,f=b&&b.userParams;e&&d?(d(b),e.setAttribute("data-gapiattached",!0)):(d=F[a].go,"signin2"==a?d(e,f):d(e&&e.parentNode,f))})},$d=function(){return!1},ce=function(){},be=function(a,b,c,d,e,f,g){switch(he(b,a,f)){case 0:a=X[a]?a+"_annotation":a;d={};d.iframeNode=b;d.userParams=c;ae(a,d);break;case 1:if(b.parentNode){for(var h in c){if(f=C(c,h))f=c[h],
 f=!!f&&"object"===typeof f&&(!f.toString||f.toString===Object.prototype.toString||f.toString===Array.prototype.toString);if(f)try{c[h]=$c(c[h])}catch(y){delete c[h]}}f=!0;c.dontclear&&(f=!1);delete c.dontclear;rc();h=Md(a,c,e);e=g||{};e.allowPost=1;e.attributes=Jd;e.dontclear=!f;g={};g.userParams=c;g.url=h;g.type=a;if(c.rd)var k=b;else k=document.createElement("div"),b.setAttribute("data-gapistub",!0),k.style.cssText="position:absolute;width:450px;left:-10000px;",b.parentNode.insertBefore(k,b);g.siteElement=
 k;k.id||(b=k,A(Ld,a,0),f="___"+a+"_"+Ld[a]++,b.id=f);b=B();b[">type"]=a;D(c,b);f=h;c=k;h=e||{};b=h.attributes||{};E(!(h.allowPost||h.forcePost)||!b.onload,"onload is not supported by post iframe (allowPost or forcePost)");e=b=f;Ad.test(b)&&(e=Q("iframes/"+e.substring(1)+"/url"),E(!!e,"Unknown iframe url config for - "+b));f=hb(z,e.replace(Bd,Dd));b=c.ownerDocument||z;k=0;do e=h.id||["I",xd++,"_",(new Date).getTime()].join("");while(b.getElementById(e)&&5>++k);E(5>k,"Error creating iframe id");k={};
 var l={};b.documentMode&&9>b.documentMode&&(k.hostiemode=b.documentMode);D(h.queryParams||{},k);D(h.fragmentParams||{},l);var n=h.pfname;var p=B();Q("iframes/dropLegacyIdParam")||(p.id=e);p._gfid=e;p.parent=b.location.protocol+"//"+b.location.host;var r=H(b.location.href,"parent");n=n||"";!n&&r&&(r=H(b.location.href,"_gfid","")||H(b.location.href,"id",""),n=H(b.location.href,"pfname",""),n=r?n+"/"+r:"");n||(r=Zc(H(b.location.href,"jcp","")))&&"object"==typeof r&&(n=(n=r.id)?r.pfname+"/"+n:"");p.pfname=
 n;h.connectWithJsonParam&&(r={},r.jcp=$c(p),p=r);r=H(f,"rpctoken")||k.rpctoken||l.rpctoken;r||(r=h.rpctoken||String(Math.round(1E8*(hd?qd():pd()))),p.rpctoken=r);h.rpctoken=r;D(p,h.connectWithQueryParams?k:l);r=b.location.href;p=B();(n=H(r,"_bsh",K.bsh))&&(p._bsh=n);(r=qb(r))&&(p.jsh=r);h.hintInFragment?D(p,l):D(p,k);f=fb(f,k,l,h.paramsSerializer);l=B();D(vd,l);D(h.attributes,l);l.name=l.id=e;l.src=f;h.eurl=f;k=h||{};p=!!k.allowPost;if(k.forcePost||p&&2E3<f.length){k=I(f);l.src="";h.dropDataPostorigin||
 (l["data-postorigin"]=f);f=zd(b,c,l,e);if(-1!=navigator.userAgent.indexOf("WebKit")){var u=f.contentWindow.document;u.open();l=u.createElement("div");p={};r=e+"_inner";p.name=r;p.src="";p.style="display:none";zd(b,l,p,r,h)}l=(h=k.query[0])?h.split("&"):[];h=[];for(p=0;p<l.length;p++)r=l[p].split("=",2),h.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);k.query=[];l=db(k);E(ib.test(l),"Invalid URL: "+l);k=b.createElement("form");k.method="POST";k.target=e;k.style.display="none";e=l instanceof
 v?l:Fa(l);xa(k,"HTMLFormElement").action=Da(e);for(e=0;e<h.length;e++)l=b.createElement("input"),l.type="hidden",l.name=h[e][0],l.value=h[e][1],k.appendChild(l);c.appendChild(k);k.submit();k.parentNode.removeChild(k);u&&u.close();u=f}else u=zd(b,c,l,e,h);g.iframeNode=u;g.id=u.getAttribute("id");u=g.id;c=B();c.id=u;c.userParams=g.userParams;c.url=g.url;c.type=g.type;c.state=1;R[u]=c;u=g}else u=null;u&&((g=u.id)&&d.push(g),ae(a,u))}},he=function(a,b,c){if(a&&1===a.nodeType&&b){if(c)return 1;if(X[b]){if(pb[a.nodeName.toLowerCase()])return(a=
 a.innerHTML)&&a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")?0:1}else{if(Td[b])return 0;if(Sd[b])return 1}}return null},Qd=function(a,b){var c=b.type;delete b.type;var d=("string"===typeof a?document.getElementById(a):a)||void 0;if(d){a={};for(var e in b)C(b,e)&&(a[e.toLowerCase()]=b[e]);a.rd=1;(b=!!a.ri)&&delete a.ri;e=[];be(c,d,a,e,0,b,void 0);ce(c,e)}else pc("string"==="gapi."+c+".render: missing element "+typeof a?a:"")};A(F,"platform",{}).go=Zd;$d=function(a){for(var b=["_c","jsl","h"],c=0;c<b.length&&a;c++)a=a[b[c]];b=qb(La.href);return!a||0!=a.indexOf("n;")&&0!=b.indexOf("n;")&&a!==b};ce=function(a,b){ie(a,b)};var lb=function(a){Yd(a,!0)},je=function(a,b){b=b||[];for(var c=0;c<b.length;++c)a(b[c]);for(a=0;a<b.length;a++)de(b[a])};
 N.push(["platform",function(a,b,c){Vd=c;b&&Ud.push(b);je(ee,a);je(fe,c._c.annotation);je(ge,c._c.bimodal);ic();gc();if("explicit"!=Q("parsetags")){rb(a);nc(mc())&&!Q("disableRealtimeCallback")&&rc();if(c&&(a=c.callback)){var d=Ya(a);delete c.callback}nb(function(){lb(d)})}}]);F._pl=!0;var ke=function(a){a=(a=R[a])?a.oid:void 0;if(a){var b=z.getElementById(a);b&&b.parentNode.removeChild(b);delete R[a];ke(a)}};var le=/^\{h:'/,me=/^!_/,ne="",ie=function(a,b){function c(){jb("message",d,"remove","de")}function d(f){var g=f.data,h=f.origin;if(oe(g,b)){var k=e;e=!1;k&&L("rqe");pe(a,function(){k&&L("rqd");c();for(var l=A(K,"RPMQ",[]),n=0;n<l.length;n++)l[n]({data:g,origin:h})})}}if(0!==b.length){ne=H(La.href,"pfname","");var e=!0;jb("message",d,"add","at");ac(a,c)}},oe=function(a,b){a=String(a);if(le.test(a))return!0;var c=!1;me.test(a)&&(c=!0,a=a.substr(2));if(!/^\{/.test(a))return!1;var d=Zc(a);if(!d)return!1;
 a=d.f;if(d.s&&a&&-1!=Oa.call(b,a)){if("_renderstart"===d.s||d.s===ne+"/"+a+"::_renderstart")if(d=d.a&&d.a[c?0:1],b=z.getElementById(a),tc(a,2),d&&b&&d.width&&d.height){a:{c=b.parentNode;a=d||{};if(qc()){var e=b.id;if(e){d=(d=R[e])?d.state:void 0;if(1===d||4===d)break a;ke(e)}}(d=c.nextSibling)&&d.getAttribute&&d.getAttribute("data-gapistub")&&(c.parentNode.removeChild(d),c.style.cssText="");d=a.width;var f=a.height,g=c.style;g.textIndent="0";g.margin="0";g.padding="0";g.background="transparent";g.borderStyle=
 "none";g.cssFloat="none";g.styleFloat="none";g.lineHeight="normal";g.fontSize="1px";g.verticalAlign="baseline";c=c.style;c.display="inline-block";g=b.style;g.position="static";g.left="0";g.top="0";g.visibility="visible";d&&(c.width=g.width=d+"px");f&&(c.height=g.height=f+"px");a.verticalAlign&&(c.verticalAlign=a.verticalAlign);e&&tc(e,3)}b["data-csi-wdt"]=(new Date).getTime()}return!0}return!1},pe=function(a,b){ac(a,b)};var qe=function(a,b){this.L=a;a=b||{};this.fa=Number(a.maxAge)||0;this.U=a.domain;this.X=a.path;this.ga=!!a.secure};qe.prototype.read=function(){for(var a=this.L+"=",b=document.cookie.split(/;\s*/),c=0;c<b.length;++c){var d=b[c];if(0==d.indexOf(a))return d.substr(a.length)}};
 qe.prototype.write=function(a,b){if(!re.test(this.L))throw"Invalid cookie name";if(!se.test(a))throw"Invalid cookie value";a=this.L+"="+a;this.U&&(a+=";domain="+this.U);this.X&&(a+=";path="+this.X);b="number"===typeof b?b:this.fa;if(0<=b){var c=new Date;c.setSeconds(c.getSeconds()+b);a+=";expires="+c.toUTCString()}this.ga&&(a+=";secure");document.cookie=a;return!0};qe.prototype.clear=function(){this.write("",0)};var se=/^[-+/_=.:|%&a-zA-Z0-9@]*$/,re=/^[A-Z_][A-Z0-9_]{0,63}$/;
 qe.iterate=function(a){for(var b=document.cookie.split(/;\s*/),c=0;c<b.length;++c){var d=b[c].split("="),e=d.shift();a(e,d.join("="))}};var te=function(a){this.B=a};te.prototype.read=function(){if(Y.hasOwnProperty(this.B))return Y[this.B]};te.prototype.write=function(a){Y[this.B]=a;return!0};te.prototype.clear=function(){delete Y[this.B]};var Y={};te.iterate=function(a){for(var b in Y)Y.hasOwnProperty(b)&&a(b,Y[b])};var ue="https:"===window.location.protocol,ve=ue||"http:"===window.location.protocol?qe:te,we=function(a){var b=a.substr(1),c="",d=window.location.hostname;if(""!==b){c=parseInt(b,10);if(isNaN(c))return null;b=d.split(".");if(b.length<c-1)return null;b.length==c-1&&(d="."+d)}else d="";return{i:"S"==a.charAt(0),domain:d,l:c}},xe=function(){var a,b=null;ve.iterate(function(c,d){0===c.indexOf("G_AUTHUSER_")&&(c=we(c.substring(11)),!a||c.i&&!a.i||c.i==a.i&&c.l>a.l)&&(a=c,b=d)});return{ea:a,F:b}};var ye=function(a){if(0!==a.indexOf("GCSC"))return null;var b={W:!1};a=a.substr(4);if(!a)return b;var c=a.charAt(0);a=a.substr(1);var d=a.lastIndexOf("_");if(-1==d)return b;var e=we(a.substr(d+1));if(null==e)return b;a=a.substring(0,d);if("_"!==a.charAt(0))return b;d="E"===c&&e.i;return!d&&("U"!==c||e.i)||d&&!ue?b:{W:!0,i:d,ja:a.substr(1),domain:e.domain,l:e.l}},ze=function(a){if(!a)return[];a=a.split("=");return a[1]?a[1].split("|"):[]},Ae=function(a){a=a.split(":");return{clientId:a[0].split("=")[1],
 ia:ze(a[1]),la:ze(a[2]),ka:ze(a[3])}},Be=function(){var a=xe(),b=a.ea;a=a.F;if(null!==a){var c;ve.iterate(function(f,g){(f=ye(f))&&f.W&&f.i==b.i&&f.l==b.l&&(c=g)});if(c){var d=Ae(c),e=d&&d.ia[Number(a)];d=d&&d.clientId;if(e)return{F:a,ha:e,clientId:d}}}return null};var Z=function(){this.T=Ce};Z.prototype.$=function(){this.K||(this.v=0,this.K=!0,this.Y())};Z.prototype.Y=function(){this.K&&(this.T()?this.v=this.R:this.v=Math.min(2*(this.v||this.R),120),window.setTimeout(na(this.Y,this),1E3*this.v))};Z.prototype.v=0;Z.prototype.R=2;Z.prototype.T=null;Z.prototype.K=!1;for(var De=0;64>De;++De);var Ee=null;qc=function(){return K.oa=!0};rc=function(){K.oa=!0;var a=Be();(a=a&&a.F)&&hc("googleapis.config/sessionIndex",a);Ee||(Ee=A(K,"ss",new Z));a=Ee;a.$&&a.$()};
 var Ce=function(){var a=Be(),b=a&&a.ha||null,c=a&&a.clientId;ac("auth",{callback:function(){var d=x.gapi.auth,e={client_id:c,session_state:b};d.checkSessionState(e,function(f){var g=e.session_state,h=Q("isLoggedIn");f=Q("debug/forceIm")?!1:g&&f||!g&&!f;if(h=h!=f)hc("isLoggedIn",f),rc(),Rd(),f||((f=d.signOut)?f():(f=d.setToken)&&f(null));f=mc();var k=Q("savedUserState");g=d._guss(f.cookiepolicy);k=k!=g&&"undefined"!=typeof k;hc("savedUserState",g);(h||k)&&nc(f)&&!Q("disableRealtimeCallback")&&d._pimf(f,
 !0)})}});return!0};L("bs0",!0,window.gapi._bs);L("bs1",!0);delete window.gapi._bs;}).call(undefined);
 var gapiComplete = gapi.load("",{callback:window["gapi_onload"],_c:{"jsl":{"ci":{"deviceType":"desktop","oauth-flow":{"authUrl":"https://accounts.google.com/o/oauth2/auth","proxyUrl":"https://accounts.google.com/o/oauth2/postmessageRelay","disableOpt":true,"idpIframeUrl":"https://accounts.google.com/o/oauth2/iframe","usegapi":false},"debug":{"reportExceptionRate":0.05,"forceIm":false,"rethrowException":false,"host":"https://apis.google.com"},"enableMultilogin":true,"googleapis.config":{"auth":{"useFirstPartyAuthV2":true}},"isPlusUser":false,"inline":{"css":1},"disableRealtimeCallback":false,"drive_share":{"skipInitCommand":true},"csi":{"rate":0.01},"client":{"cors":false},"isLoggedIn":true,"signInDeprecation":{"rate":0.0},"include_granted_scopes":true,"llang":"pt","iframes":{"youtube":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/youtube?usegapi\u003d1","methods":["scroll","openwindow"]},"ytsubscribe":{"url":"https://www.youtube.com/subscribe_embed?usegapi\u003d1"},"plus_circle":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/plus/circle?usegapi\u003d1"},"plus_share":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/+1/sharebutton?plusShare\u003dtrue\u0026usegapi\u003d1"},"rbr_s":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarsimplescroller"},":source:":"3p","playemm":{"url":"https://play.google.com/work/embedded/search?usegapi\u003d1\u0026usegapi\u003d1"},"savetoandroidpay":{"url":"https://pay.google.com/gp/v/widget/save"},"blogger":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/blogger?usegapi\u003d1","methods":["scroll","openwindow"]},"evwidget":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/events/widget?usegapi\u003d1"},"partnersbadge":{"url":"https://www.gstatic.com/partners/badge/templates/badge.html?usegapi\u003d1"},"dataconnector":{"url":"https://dataconnector.corp.google.com/:session_prefix:ui/widgetview?usegapi\u003d1"},"surveyoptin":{"url":"https://www.google.com/shopping/customerreviews/optin?usegapi\u003d1"},":socialhost:":"https://apis.google.com","shortlists":{"url":""},"hangout":{"url":"https://talkgadget.google.com/:session_prefix:talkgadget/_/widget"},"plus_followers":{"params":{"url":""},"url":":socialhost:/_/im/_/widget/render/plus/followers?usegapi\u003d1"},"post":{"params":{"url":""},"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/post?usegapi\u003d1"},":gplus_url:":"https://plus.google.com","signin":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/signin?usegapi\u003d1","methods":["onauth"]},"rbr_i":{"params":{"url":""},"url":":socialhost:/:session_prefix::se:_/widget/render/recobarinvitation"},"share":{"url":":socialhost:/:session_prefix::im_prefix:_/widget/render/share?usegapi\u003d1"},"plusone":{"params":{"count":"","size":"","url":""},"url":":socialhost:/:session_prefix::se:_/+1/fastbutton?usegapi\u003d1"},"comments":{"params":{"location":["search","hash"]},"url":":socialhost:/:session_prefix:_/widget/render/comments?usegapi\u003d1","methods":["scroll","openwindow"]},":im_socialhost:":"https://plus.googleapis.com","backdrop":{"url":"https://clients3.google.com/cast/chromecast/home/widget/backdrop?usegapi\u003d1"},"visibility":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/visibility?usegapi\u003d1"},"autocomplete":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/autocomplete"},"additnow":{"url":"https://apis.google.com/marketplace/button?usegapi\u003d1","methods":["launchurl"]},":signuphost:":"https://plus.google.com","ratingbadge":{"url":"https://www.google.com/shopping/customerreviews/badge?usegapi\u003d1"},"appcirclepicker":{"url":":socialhost:/:session_prefix:_/widget/render/appcirclepicker"},"follow":{"url":":socialhost:/:session_prefix:_/widget/render/follow?usegapi\u003d1"},"community":{"url":":ctx_socialhost:/:session_prefix::im_prefix:_/widget/render/community?usegapi\u003d1"},"sharetoclassroom":{"url":"https://classroom.google.com/sharewidget?usegapi\u003d1"},"ytshare":{"params":{"url":""},"url":":socialhost:/:session_prefix:_/widget/render/ytshare?usegapi\u003d1"},"plus":{"url":":socialhost:/:session_prefix:_/widget/render/badge?usegapi\u003d1"},"family_creation":{"params":{"url":""},"url":"https://families.google.com/webcreation?usegapi\u003d1\u0026usegapi\u003d1"},"commentcount":{"url":":socialhost:/:session_prefix:_/widget/render/commentcount?usegapi\u003d1"},"configurator":{"url":":socialhost:/:session_prefix:_/plusbuttonconfigurator?usegapi\u003d1"},"zoomableimage":{"url":"https://ssl.gstatic.com/microscope/embed/"},"appfinder":{"url":"https://workspace.google.com/:session_prefix:marketplace/appfinder?usegapi\u003d1"},"savetowallet":{"url":"https://pay.google.com/gp/v/widget/save"},"person":{"url":":socialhost:/:session_prefix:_/widget/render/person?usegapi\u003d1"},"savetodrive":{"url":"https://drive.google.com/savetodrivebutton?usegapi\u003d1","methods":["save"]},"page":{"url":":socialhost:/:session_prefix:_/widget/render/page?usegapi\u003d1"},"card":{"url":":socialhost:/:session_prefix:_/hovercard/card"}}},"h":"m;/_/scs/apps-static/_/js/k\u003doz.gapi.pt_BR.l4Bv_WkVC6g.O/am\u003dwQE/d\u003d1/ct\u003dzgms/rs\u003dAGLTcCOuH5S2uqmF6E8zOW7n3yiqiwhzNQ/m\u003d__features__","u":"https://apis.google.com/js/platform.js","hee":true,"fp":"821a251b140e4add32f87f4a7a08f044a59aa0e9","dpo":false},"platform":["additnow","backdrop","blogger","comments","commentcount","community","donation","family_creation","follow","hangout","health","page","partnersbadge","person","playemm","playreview","plus","plusone","post","ratingbadge","savetoandroidpay","savetodrive","savetowallet","sharetoclassroom","shortlists","signin2","surveyoptin","visibility","youtube","ytsubscribe","zoomableimage"],"fp":"821a251b140e4add32f87f4a7a08f044a59aa0e9","annotation":["interactivepost","recobar","signin2","autocomplete","profile"],"bimodal":["signin","share"]}});




/***/ }),

/***/ "./node_modules/gapi-script/index.js":
/*!*******************************************!*\
  !*** ./node_modules/gapi-script/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gapi": () => (/* reexport safe */ _gapiScript__WEBPACK_IMPORTED_MODULE_0__.gapi),
/* harmony export */   "gapiComplete": () => (/* reexport safe */ _gapiScript__WEBPACK_IMPORTED_MODULE_0__.gapiComplete),
/* harmony export */   "loadAuth2": () => (/* binding */ loadAuth2),
/* harmony export */   "loadAuth2WithProps": () => (/* binding */ loadAuth2WithProps),
/* harmony export */   "loadClientAuth2": () => (/* binding */ loadClientAuth2),
/* harmony export */   "loadGapiInsideDOM": () => (/* binding */ loadGapiInsideDOM)
/* harmony export */ });
/* harmony import */ var _gapiScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gapiScript */ "./node_modules/gapi-script/gapiScript.js");


/**
 * Function to load gapi auth2 from a gapi that you provied
 * Check full docs here: https://developers.google.com/identity/sign-in/web/reference#auth_setup
 * @param {Object} gapiScript gapi script object
 * @param {string} clientId Your google clientID string
 * @param {Array.<string[]>} scopes The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false. Check possible scopes on google docs: https://developers.google.com/identity/protocols/oauth2/scopes
 */
const loadAuth2 = async function (gapiScript, clientId, scopes) {
  return new Promise(resolve => {
    gapiScript.load('auth2', () => {
      resolve(gapiScript.auth2.init({
        client_id: clientId,
        scope: scopes
      }));
    });
  });
}

/**
 * Function to init gapi auth2 with props
 * @param {Object} gapiScript gapi script object
 * @param {*} props Possible props to init gapi auth2, check the options on google docs: https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
 */
const loadAuth2WithProps = async function (gapiScript, props) {
  return new Promise(resolve => {
    gapiScript.load('auth2', () => {
      resolve(gapiScript.auth2.init(props));
    });
  });
}

/**
 *
 * @param {Object} gapiScript gapi script object
 * @param {string} clientId Your google clientID string
 * @param {Array.<string[]>} scopes The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false. Check possible scopes on google docs: https://developers.google.com/identity/protocols/oauth2/scopes
 */
const loadClientAuth2 = async function (gapiScript, clientId, scopes) {
  return new Promise(resolve => {
      gapiScript.load('client', () => {
          resolve(gapiScript.client.init({
              client_id: clientId,
              scope: scopes
          }));
      });
      gapiScript.load('auth2', () => {
          resolve(gapiScript.client.init({
              client_id: clientId,
              scope: scopes
          }));
      });
  });
}

/**
 * A very special function to load the gapi inside the DOM, directly.
 * So it'll load the real and most recent gapi-scrip from google and attach to DOM:
 * let gapi = loadGapiInsideDOM();
 * Now you can use it anywhere.
 */
const loadGapiInsideDOM = async function () {
  return new Promise(resolve => {
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = 'google-platform';
    js.src = '//apis.google.com/js/platform.js';
    js.async = true;
    js.defer = true;
    element.parentNode.insertBefore(js, element);
    js.onload = async () => {
      resolve(window.gapi);
    }
  });
}




/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/react-google-charts/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-google-charts/dist/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chart": () => (/* binding */ Chart$1),
/* harmony export */   "GoogleDataTableColumnRoleType": () => (/* binding */ GoogleDataTableColumnRoleType),
/* harmony export */   "default": () => (/* binding */ Chart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");



/**
 * Hook to load external script.
 * @param src - Source url to load.
 * @param onLoad - Success callback.
 * @param onError - Error callback.
 */ function useLoadScript(src, onLoad, onError) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!document) {
            return;
        }
        // Find script tag with same src in DOM.
        const foundScript = document.querySelector("script[src=\"".concat(src, "\"]"));
        // Call onLoad if script marked as loaded.
        if (foundScript === null || foundScript === void 0 ? void 0 : foundScript.dataset.loaded) {
            onLoad === null || onLoad === void 0 ? void 0 : onLoad();
            return;
        }
        // Create or get existed tag.
        const script = foundScript || document.createElement("script");
        // Set src if no script was found.
        if (!foundScript) {
            script.src = src;
        }
        // Mark script as loaded on load event.
        const onLoadWithMarker = ()=>{
            script.dataset.loaded = "1";
            onLoad === null || onLoad === void 0 ? void 0 : onLoad();
        };
        script.addEventListener("load", onLoadWithMarker);
        if (onError) {
            script.addEventListener("error", onError);
        }
        // Add to DOM if not yet added.
        if (!foundScript) {
            document.head.append(script);
        }
        return ()=>{
            script.removeEventListener("load", onLoadWithMarker);
            if (onError) {
                script.removeEventListener("error", onError);
            }
        };
    }, []);
}

/**
 * Hook to load Google Charts JS API.
 * @param params - Load parameters.
 * @param [params.chartVersion] - Chart version to load.
 * @param [params.chartPackages] - Packages to load.
 * @param [params.chartLanguage] - Languages to load.
 * @param [params.mapsApiKey] - Google Maps api key.
 * @returns
 */ function useLoadGoogleCharts(param) {
    let { chartVersion ="current" , chartPackages =[
        "corechart",
        "controls"
    ] , chartLanguage ="en" , mapsApiKey  } = param;
    const [googleCharts, setGoogleCharts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [failed, setFailed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    useLoadScript("https://www.gstatic.com/charts/loader.js", ()=>{
        // @ts-expect-error Getting object from global namespace.
        const google = window === null || window === void 0 ? void 0 : window.google;
        if (!google) {
            return;
        }
        google.charts.load(chartVersion, {
            packages: chartPackages,
            language: chartLanguage,
            mapsApiKey
        });
        google.charts.setOnLoadCallback(()=>{
            setGoogleCharts(google);
        });
    }, ()=>{
        setFailed(true);
    });
    return [
        googleCharts,
        failed
    ];
}
/**
 * Wrapper around useLoadGoogleCharts to use in legacy components.
 */ function LoadGoogleCharts(param) {
    let { onLoad , onError , ...params } = param;
    const [googleCharts, failed] = useLoadGoogleCharts(params);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (googleCharts && onLoad) {
            onLoad(googleCharts);
        }
    }, [
        googleCharts
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (failed && onError) {
            onError();
        }
    }, [
        failed
    ]);
    return null;
}

const chartDefaultProps = {
    // <DEPRECATED_PROPS>
    legend_toggle: false,
    // </DEPRECATED_PROPS>
    options: {},
    legendToggle: false,
    getChartWrapper: ()=>{},
    spreadSheetQueryParameters: {
        headers: 1,
        gid: 1
    },
    rootProps: {},
    chartWrapperParams: {}
};

let uniqueID = 0;
const generateUniqueID = ()=>{
    uniqueID += 1;
    return "reactgooglegraph-".concat(uniqueID);
};

const DEFAULT_CHART_COLORS = [
    "#3366CC",
    "#DC3912",
    "#FF9900",
    "#109618",
    "#990099",
    "#3B3EAC",
    "#0099C6",
    "#DD4477",
    "#66AA00",
    "#B82E2E",
    "#316395",
    "#994499",
    "#22AA99",
    "#AAAA11",
    "#6633CC",
    "#E67300",
    "#8B0707",
    "#329262",
    "#5574A6",
    "#3B3EAC"
];

const loadDataTableFromSpreadSheet = async function(googleViz, spreadSheetUrl) {
    let urlParams = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return new Promise((resolve, reject)=>{
        const headers = "".concat(urlParams.headers ? "headers=".concat(urlParams.headers) : "headers=0");
        const queryString = "".concat(urlParams.query ? "&tq=".concat(encodeURIComponent(urlParams.query)) : "");
        const gid = "".concat(urlParams.gid ? "&gid=".concat(urlParams.gid) : "");
        const sheet = "".concat(urlParams.sheet ? "&sheet=".concat(urlParams.sheet) : "");
        const access_token = "".concat(urlParams.access_token ? "&access_token=".concat(urlParams.access_token) : "");
        const urlQueryString = "".concat(headers).concat(gid).concat(sheet).concat(queryString).concat(access_token);
        const urlToSpreadSheet = "".concat(spreadSheetUrl, "/gviz/tq?").concat(urlQueryString); //&tq=${queryString}`;
        const query = new googleViz.visualization.Query(urlToSpreadSheet);
        query.send((response)=>{
            if (response.isError()) {
                reject("Error in query:  ".concat(response.getMessage(), " ").concat(response.getDetailedMessage()));
            } else {
                resolve(response.getDataTable());
            }
        });
    });
};

const { Provider , Consumer  } = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(chartDefaultProps);
const ContextProvider = (param)=>{
    let { children , value  } = param;
    return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Provider, {
        value: value
    }, children));
};
const ContextConsumer = (param)=>{
    let { render  } = param;
    return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Consumer, null, (context)=>{
        return render(context);
    }));
};

const GRAY_COLOR = "#CCCCCC";
class GoogleChartDataTableInner extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    componentDidMount() {
        this.draw(this.props);
        window.addEventListener("resize", this.onResize);
        if (this.props.legend_toggle || this.props.legendToggle) {
            this.listenToLegendToggle();
        }
    }
    componentWillUnmount() {
        const { google , googleChartWrapper  } = this.props;
        window.removeEventListener("resize", this.onResize);
        google.visualization.events.removeAllListeners(googleChartWrapper);
        if (googleChartWrapper.getChartType() === "Timeline") {
            googleChartWrapper.getChart() && googleChartWrapper.getChart().clearChart();
        }
    }
    componentDidUpdate() {
        this.draw(this.props);
    }
    render() {
        return null;
    }
    constructor(...args){
        super(...args);
        this.state = {
            hiddenColumns: []
        };
        this.listenToLegendToggle = ()=>{
            const { google , googleChartWrapper  } = this.props;
            google.visualization.events.addListener(googleChartWrapper, "select", ()=>{
                const chart = googleChartWrapper.getChart();
                const selection = chart.getSelection();
                const dataTable = googleChartWrapper.getDataTable();
                if (selection.length === 0 || // We want to listen to when a whole row is selected. This is the case only when row === null
                selection[0].row || !dataTable) {
                    return;
                }
                const columnIndex = selection[0].column;
                const columnID = this.getColumnID(dataTable, columnIndex);
                if (this.state.hiddenColumns.includes(columnID)) {
                    this.setState((state)=>({
                            ...state,
                            hiddenColumns: [
                                ...state.hiddenColumns.filter((colID)=>colID !== columnID
                                ), 
                            ]
                        })
                    );
                } else {
                    this.setState((state)=>({
                            ...state,
                            hiddenColumns: [
                                ...state.hiddenColumns,
                                columnID
                            ]
                        })
                    );
                }
            });
        };
        this.applyFormatters = (dataTable, formatters)=>{
            const { google  } = this.props;
            for (let formatter of formatters){
                switch(formatter.type){
                    case "ArrowFormat":
                        {
                            const vizFormatter = new google.visualization.ArrowFormat(formatter.options);
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                    case "BarFormat":
                        {
                            const vizFormatter = new google.visualization.BarFormat(formatter.options);
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                    case "ColorFormat":
                        {
                            const vizFormatter = new google.visualization.ColorFormat(formatter.options);
                            const { ranges  } = formatter;
                            for (let range of ranges){
                                vizFormatter.addRange(...range);
                            }
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                    case "DateFormat":
                        {
                            const vizFormatter = new google.visualization.DateFormat(formatter.options);
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                    case "NumberFormat":
                        {
                            const vizFormatter = new google.visualization.NumberFormat(formatter.options);
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                    case "PatternFormat":
                        {
                            const vizFormatter = new google.visualization.PatternFormat(formatter.options);
                            vizFormatter.format(dataTable, formatter.column);
                            break;
                        }
                }
            }
        };
        this.getColumnID = (dataTable, columnIndex)=>{
            return dataTable.getColumnId(columnIndex) || dataTable.getColumnLabel(columnIndex);
        };
        this.draw = async (param)=>{
            let { data , diffdata , rows , columns , options , legend_toggle , legendToggle , chartType , formatters , spreadSheetUrl , spreadSheetQueryParameters  } = param;
            const { google , googleChartWrapper  } = this.props;
            let dataTable;
            let chartDiff = null;
            if (diffdata) {
                const oldData = google.visualization.arrayToDataTable(diffdata.old);
                const newData = google.visualization.arrayToDataTable(diffdata.new);
                chartDiff = google.visualization[chartType].prototype.computeDiff(oldData, newData);
            }
            if (data !== null) {
                if (Array.isArray(data)) {
                    dataTable = google.visualization.arrayToDataTable(data);
                } else {
                    dataTable = new google.visualization.DataTable(data);
                }
            } else if (rows && columns) {
                dataTable = google.visualization.arrayToDataTable([
                    columns,
                    ...rows
                ]);
            } else if (spreadSheetUrl) {
                dataTable = await loadDataTableFromSpreadSheet(google, spreadSheetUrl, spreadSheetQueryParameters);
            } else {
                dataTable = google.visualization.arrayToDataTable([]);
            }
            const columnCount = dataTable.getNumberOfColumns();
            for(let i = 0; i < columnCount; i += 1){
                const columnID = this.getColumnID(dataTable, i);
                if (this.state.hiddenColumns.includes(columnID)) {
                    const previousColumnLabel = dataTable.getColumnLabel(i);
                    const previousColumnID = dataTable.getColumnId(i);
                    const previousColumnType = dataTable.getColumnType(i);
                    dataTable.removeColumn(i);
                    dataTable.addColumn({
                        label: previousColumnLabel,
                        id: previousColumnID,
                        type: previousColumnType
                    });
                }
            }
            const chart = googleChartWrapper.getChart();
            if (googleChartWrapper.getChartType() === "Timeline") {
                chart && chart.clearChart();
            }
            googleChartWrapper.setChartType(chartType);
            googleChartWrapper.setOptions(options || {});
            googleChartWrapper.setDataTable(dataTable);
            googleChartWrapper.draw();
            if (this.props.googleChartDashboard !== null) {
                this.props.googleChartDashboard.draw(dataTable);
            }
            if (chartDiff) {
                googleChartWrapper.setDataTable(chartDiff);
                googleChartWrapper.draw();
            }
            if (formatters) {
                this.applyFormatters(dataTable, formatters);
                googleChartWrapper.setDataTable(dataTable);
                googleChartWrapper.draw();
            }
            if (legendToggle === true || legend_toggle === true) {
                this.grayOutHiddenColumns({
                    options
                });
            }
            return;
        };
        this.grayOutHiddenColumns = (param)=>{
            let { options  } = param;
            const { googleChartWrapper  } = this.props;
            const dataTable = googleChartWrapper.getDataTable();
            if (!dataTable) return;
            const columnCount = dataTable.getNumberOfColumns();
            const hasAHiddenColumn = this.state.hiddenColumns.length > 0;
            if (hasAHiddenColumn === false) return;
            const colors = Array.from({
                length: columnCount - 1
            }).map((dontcare, i)=>{
                const columnID = this.getColumnID(dataTable, i + 1);
                if (this.state.hiddenColumns.includes(columnID)) {
                    return GRAY_COLOR;
                } else if (options && options.colors) {
                    return options.colors[i];
                } else {
                    return DEFAULT_CHART_COLORS[i];
                }
            });
            googleChartWrapper.setOptions({
                ...options,
                colors
            });
            googleChartWrapper.draw();
        };
        this.onResize = ()=>{
            const { googleChartWrapper  } = this.props;
            googleChartWrapper.draw();
        };
    }
}
class GoogleChartDataTable extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    componentDidMount() {}
    componentWillUnmount() {}
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { google , googleChartWrapper , googleChartDashboard  } = this.props;
        return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextConsumer, {
            render: (props)=>{
                return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(GoogleChartDataTableInner, Object.assign({}, props, {
                    google: google,
                    googleChartWrapper: googleChartWrapper,
                    googleChartDashboard: googleChartDashboard
                })));
            }
        }));
    }
}

class GoogleChartEvents extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    shouldComponentUpdate() {
        return false;
    }
    listenToEvents(param) {
        let { chartEvents , google , googleChartWrapper  } = param;
        if (!chartEvents) {
            return;
        }
        google.visualization.events.removeAllListeners(googleChartWrapper);
        for (let event of chartEvents){
            var _this = this;
            const { eventName , callback  } = event;
            google.visualization.events.addListener(googleChartWrapper, eventName, function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                callback({
                    chartWrapper: googleChartWrapper,
                    props: _this.props,
                    google: google,
                    eventArgs: args
                });
            });
        }
    }
    render() {
        const { google , googleChartWrapper  } = this.props;
        return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextConsumer, {
            render: (propsFromContext)=>{
                this.listenToEvents({
                    chartEvents: propsFromContext.chartEvents || null,
                    google,
                    googleChartWrapper
                });
                return null;
            }
        }));
    }
}

let controlCounter = 0;
class GoogleChart extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    componentDidMount() {
        const { options , google , chartType , chartWrapperParams , toolbarItems , getChartEditor , getChartWrapper ,  } = this.props;
        const chartConfig = {
            chartType,
            options,
            containerId: this.getGraphID(),
            ...chartWrapperParams
        };
        const googleChartWrapper = new google.visualization.ChartWrapper(chartConfig);
        googleChartWrapper.setOptions(options || {});
        if (getChartWrapper) {
            getChartWrapper(googleChartWrapper, google);
        }
        const googleChartDashboard = new google.visualization.Dashboard(this.dashboard_ref);
        const googleChartControls = this.addControls(googleChartWrapper, googleChartDashboard);
        if (toolbarItems) {
            google.visualization.drawToolbar(this.toolbar_ref.current, toolbarItems);
        }
        let googleChartEditor = null;
        if (getChartEditor) {
            googleChartEditor = new google.visualization.ChartEditor();
            getChartEditor({
                chartEditor: googleChartEditor,
                chartWrapper: googleChartWrapper,
                google
            });
        }
        this.setState({
            googleChartEditor,
            googleChartControls: googleChartControls,
            googleChartDashboard: googleChartDashboard,
            googleChartWrapper,
            isReady: true
        });
    }
    componentDidUpdate() {
        if (!this.state.googleChartWrapper) return;
        if (!this.state.googleChartDashboard) return;
        if (!this.state.googleChartControls) return;
        const { controls  } = this.props;
        if (controls) {
            for(let i = 0; i < controls.length; i += 1){
                const { controlType , options , controlWrapperParams  } = controls[i];
                if (controlWrapperParams && "state" in controlWrapperParams) {
                    this.state.googleChartControls[i].control.setState(controlWrapperParams["state"]);
                }
                this.state.googleChartControls[i].control.setOptions(options);
                this.state.googleChartControls[i].control.setControlType(controlType);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isReady !== nextState.isReady || nextProps.controls !== this.props.controls;
    }
    render() {
        const { width , height , options , style  } = this.props;
        const divStyle = {
            height: height || options && options.height,
            width: width || options && options.width,
            ...style
        };
        if (this.props.render) {
            return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                ref: this.dashboard_ref,
                style: divStyle
            }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                ref: this.toolbar_ref,
                id: "toolbar"
            }), this.props.render({
                renderChart: this.renderChart,
                renderControl: this.renderControl,
                renderToolbar: this.renderToolBar
            })));
        } else {
            return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                ref: this.dashboard_ref,
                style: divStyle
            }, this.renderControl((param)=>{
                let { controlProp  } = param;
                return controlProp.controlPosition !== "bottom";
            }), this.renderChart(), this.renderControl((param)=>{
                let { controlProp  } = param;
                return controlProp.controlPosition === "bottom";
            }), this.renderToolBar()));
        }
    }
    constructor(...args1){
        var _this1;
        super(), _this1 = this;
        this.state = {
            googleChartWrapper: null,
            googleChartDashboard: null,
            googleChartControls: null,
            googleChartEditor: null,
            isReady: false
        };
        this.graphID = null;
        this.dashboard_ref = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        this.toolbar_ref = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createRef();
        this.getGraphID = ()=>{
            const { graphID , graph_id  } = this.props;
            let instanceGraphID;
            if (!graphID && !graph_id) {
                if (!this.graphID) {
                    instanceGraphID = generateUniqueID();
                } else {
                    instanceGraphID = this.graphID;
                }
            } else if (graphID && !graph_id) {
                instanceGraphID = graphID;
            } else if (graph_id && !graphID) {
                instanceGraphID = graph_id;
            } else {
                instanceGraphID = graphID;
            }
            this.graphID = instanceGraphID;
            return this.graphID;
        };
        this.getControlID = (id, index)=>{
            controlCounter += 1;
            let controlID;
            if (typeof id === "undefined") {
                controlID = "googlechart-control-".concat(index, "-").concat(controlCounter);
            } else {
                controlID = id;
            }
            return controlID;
        };
        this.addControls = (googleChartWrapper, googleChartDashboard)=>{
            const { google , controls  } = this.props;
            const googleChartControls = !controls ? null : controls.map((control, i)=>{
                const { controlID: controlIDMaybe , controlType , options: controlOptions , controlWrapperParams ,  } = control;
                const controlID = this.getControlID(controlIDMaybe, i);
                return {
                    controlProp: control,
                    control: new google.visualization.ControlWrapper({
                        containerId: controlID,
                        controlType,
                        options: controlOptions,
                        ...controlWrapperParams
                    })
                };
            });
            if (!googleChartControls) {
                return null;
            }
            googleChartDashboard.bind(googleChartControls.map((param)=>{
                let { control  } = param;
                return control;
            }), googleChartWrapper);
            for (let chartControl of googleChartControls){
                const { control , controlProp  } = chartControl;
                const { controlEvents =[]  } = controlProp;
                for (let event of controlEvents){
                    var _this = this;
                    const { callback , eventName  } = event;
                    google.visualization.events.removeListener(control, eventName, callback);
                    google.visualization.events.addListener(control, eventName, function() {
                        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                            args[_key] = arguments[_key];
                        }
                        callback({
                            chartWrapper: googleChartWrapper,
                            controlWrapper: control,
                            props: _this.props,
                            google: google,
                            eventArgs: args
                        });
                    });
                }
            }
            return googleChartControls;
        };
        this.renderChart = ()=>{
            const { width , height , options , style , className , rootProps , google  } = this.props;
            const divStyle = {
                height: height || options && options.height,
                width: width || options && options.width,
                ...style
            };
            return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", Object.assign({
                id: this.getGraphID(),
                style: divStyle,
                className: className
            }, rootProps), this.state.isReady && this.state.googleChartWrapper !== null ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(GoogleChartDataTable, {
                googleChartWrapper: this.state.googleChartWrapper,
                google: google,
                googleChartDashboard: this.state.googleChartDashboard
            }), /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(GoogleChartEvents, {
                googleChartWrapper: this.state.googleChartWrapper,
                google: google
            })) : null));
        };
        this.renderControl = function() {
            let filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (param)=>{
                return true;
            };
            return _this1.state.isReady && _this1.state.googleChartControls !== null ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, _this1.state.googleChartControls.filter((param)=>{
                let { controlProp , control  } = param;
                return filter({
                    control,
                    controlProp
                });
            }).map((param)=>{
                let { control , controlProp  } = param;
                return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                    key: control.getContainerId(),
                    id: control.getContainerId()
                }));
            })) : null;
        };
        this.renderToolBar = ()=>{
            if (!this.props.toolbarItems) return null;
            return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
                ref: this.toolbar_ref
            }));
        };
    }
}

class Chart$1 extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    render() {
        const { chartLanguage , chartPackages , chartVersion , mapsApiKey , loader , errorElement ,  } = this.props;
        return(/*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextProvider, {
            value: this.props
        }, this.state.loadingStatus === "ready" && this.state.google !== null ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(GoogleChart, Object.assign({}, this.props, {
            google: this.state.google
        })) : this.state.loadingStatus === "errored" && errorElement ? errorElement : loader, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(LoadGoogleCharts, {
            chartLanguage: chartLanguage,
            chartPackages: chartPackages,
            chartVersion: chartVersion,
            mapsApiKey: mapsApiKey,
            onLoad: this.onLoad,
            onError: this.onError
        })));
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    isFullyLoaded(google) {
        const { controls , toolbarItems , getChartEditor  } = this.props;
        return google && google.visualization && google.visualization.ChartWrapper && google.visualization.Dashboard && (!controls || google.visualization.ChartWrapper) && (!getChartEditor || google.visualization.ChartEditor) && (!toolbarItems || google.visualization.drawToolbar);
    }
    constructor(...args){
        super(...args);
        this._isMounted = false;
        this.state = {
            loadingStatus: "loading",
            google: null
        };
        this.onLoad = (google1)=>{
            if (this.props.onLoad) {
                this.props.onLoad(google1);
            }
            if (this.isFullyLoaded(google1)) {
                this.onSuccess(google1);
            } else {
                // IE11: window.google is not fully set, we have to wait
                const id = setInterval(()=>{
                    const google = window.google;
                    if (this._isMounted) {
                        if (google && this.isFullyLoaded(google)) {
                            clearInterval(id);
                            this.onSuccess(google);
                        }
                    } else {
                        clearInterval(id);
                    }
                }, 1000);
            }
        };
        this.onSuccess = (google)=>{
            this.setState({
                loadingStatus: "ready",
                google
            });
        };
        this.onError = ()=>{
            this.setState({
                loadingStatus: "errored"
            });
        };
    }
}
Chart$1.defaultProps = chartDefaultProps;

var GoogleDataTableColumnRoleType;
(function(GoogleDataTableColumnRoleType) {
    GoogleDataTableColumnRoleType["annotation"] = "annotation";
    GoogleDataTableColumnRoleType["annotationText"] = "annotationText";
    GoogleDataTableColumnRoleType["certainty"] = "certainty";
    GoogleDataTableColumnRoleType["emphasis"] = "emphasis";
    GoogleDataTableColumnRoleType["interval"] = "interval";
    GoogleDataTableColumnRoleType["scope"] = "scope";
    GoogleDataTableColumnRoleType["style"] = "style";
    GoogleDataTableColumnRoleType["tooltip"] = "tooltip";
    GoogleDataTableColumnRoleType["domain"] = "domain";
})(GoogleDataTableColumnRoleType || (GoogleDataTableColumnRoleType = {}));

var Chart = Chart$1;


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/widget/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget */ "./src/widget/widget.js");
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");






const App = props => {
  const {
    settings,
    isReady,
    query
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      settings: select('searchconsole').getSettings(),
      isReady: select('searchconsole').isReady(),
      query: select('searchconsole').getQuery()
    };
  }, []);
  if (!isReady) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fetching data…', 'search-console')
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_widget__WEBPACK_IMPORTED_MODULE_3__["default"], null);
};
window.addEventListener('DOMContentLoaded', () => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null), document.getElementById('search-console-widget'));
});
})();

/******/ })()
;
//# sourceMappingURL=widget.js.map