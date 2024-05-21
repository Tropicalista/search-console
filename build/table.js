/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/context/settings-context.js":
/*!*****************************************!*\
  !*** ./src/context/settings-context.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsContext: () => (/* binding */ SettingsContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../router */ "./src/router/index.js");









const SettingsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
function SettingsContextProvider(props) {
  const defaultQuery = {
    customDate: false,
    type: 'web',
    startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 29)),
    endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 1)),
    dimensions: ['QUERY'],
    fields: 'rows',
    dimensionFilterGroups: [
      /*{
      	filters: [],
      },*/
    ]
  };
  const [ready, setReady] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [query, setQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(defaultQuery);
  const [email, setEmail] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const history = (0,_router__WEBPACK_IMPORTED_MODULE_8__.useHistory)();
  const [settings, setSettings] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('root', 'site', 'search_console');
  const {
    saveEditedEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_7__.store);
  const saveSettings = async () => {
    return saveEditedEntityRecord('root', 'site').then(() => {
      createNotice('info', '🎯 ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Settings saved.', 'formello'), {
        type: 'snackbar'
      });
    }).catch(error => {
      createNotice('error', '⚠️ ' + error.message, {
        type: 'snackbar',
        explicitDismiss: true
      });
    });
  };
  const showError = error => {
    if (401 !== error.status) {
      createNotice('error', '⚠️ ' + error.result.error.message, {
        type: 'snackbar',
        explicitDismiss: true
      });
    }
    if (401 === error.status) {
      refreshToken();
    }
  };
  const {
    isSaving,
    hasEdits
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => ({
    isSaving: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).isSavingEntityRecord('root', 'site'),
    hasEdits: select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).hasEditsForEntityRecord('root', 'site', undefined, 'search_console')
  }), []);
  const refreshToken = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/searchconsole/v1/refresh',
      method: 'POST'
    }).then(result => {
      setSettings({
        ...settings,
        token: result
      });
      window.gapi.client.setToken(result);
      loadSearchConsole();
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      createNotice('error', '⚠️ ' + error.message.error_description, {
        type: 'snackbar',
        explicitDismiss: true,
        actions: [{
          label: 'Reauthenticate on settings page',
          onClick: () => history.push({
            page: 'search-console-settings'
          }) // styled as a button link
        }]
      });
    });
  };
  const revokeToken = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/searchconsole/v1/revoke',
      method: 'POST',
      data: {
        token: settings.token.refresh_token
      }
    }).then(() => {
      updateSetting('token', {
        access_token: '',
        expires_in: 3600,
        id_token: '',
        refresh_token: '',
        scope: '',
        token_type: ''
      });
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleClientLoad = async () => await window.gapi.load('client', loadSearchConsole);
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
  const loadSearchConsole = () => {
    window.gapi.client.setToken(window.search_console.token);
    window.gapi.client.load('searchconsole', 'v1').then(() => {
      check();
    });
  };
  const check = () => {
    setReady(true);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SettingsContext.Provider, {
    value: {
      query,
      updateQuery,
      settings,
      updateSetting,
      setSettings,
      saveSettings,
      isSaving,
      ready,
      refreshToken,
      revokeToken,
      email,
      hasEdits,
      showError
    }
  }, props.children);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsContextProvider);

/***/ }),

/***/ "./src/router/history.js":
/*!*******************************!*\
  !*** ./src/router/history.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! history */ "./node_modules/history/index.js");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

const history = (0,history__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)();
const originalHistoryPush = history.push;
const originalHistoryReplace = history.replace;
function push(params, state) {
  const currentArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(window.location.href);
  const currentUrlWithoutArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.removeQueryArgs)(window.location.href, ...Object.keys(currentArgs));
  const newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(currentUrlWithoutArgs, params);
  return originalHistoryPush.call(history, newUrl, state);
}
function replace(params, state) {
  const currentArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(window.location.href);
  const currentUrlWithoutArgs = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.removeQueryArgs)(window.location.href, ...Object.keys(currentArgs));
  const newUrl = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(currentUrlWithoutArgs, params);
  return originalHistoryReplace.call(history, newUrl, state);
}
history.push = push;
history.replace = replace;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (history);

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider),
/* harmony export */   useHistory: () => (/* binding */ useHistory),
/* harmony export */   useLocation: () => (/* binding */ useLocation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history */ "./src/router/history.js");

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

const RoutesContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const HistoryContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)();
function useLocation() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(RoutesContext);
}
function useHistory() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(HistoryContext);
}
function getLocationWithParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    ...location,
    params: Object.fromEntries(searchParams.entries())
  };
}
function RouterProvider({
  children
}) {
  const [location, setLocation] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => getLocationWithParams(_history__WEBPACK_IMPORTED_MODULE_2__["default"].location));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    return _history__WEBPACK_IMPORTED_MODULE_2__["default"].listen(({
      location: updatedLocation
    }) => {
      setLocation(getLocationWithParams(updatedLocation));
    });
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HistoryContext.Provider, {
    value: _history__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RoutesContext.Provider, {
    value: location
  }, children));
}

/***/ }),

/***/ "./src/table/app.js":
/*!**************************!*\
  !*** ./src/table/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _widget_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget/chart */ "./src/widget/chart.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");





const MyModal = () => {
  const [isOpen, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const closeModal = () => setOpen(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const onScroll = event => setOpen(event.detail.url);
    window.addEventListener('search-console-details', onScroll);
    return () => {
      window.removeEventListener('search-console-details', onScroll);
    };
  }, []);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    size: "medium",
    title: isOpen,
    onRequestClose: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_widget_chart__WEBPACK_IMPORTED_MODULE_3__.MyChart, {
    url: isOpen
  })));
};
const App = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(MyModal, null));
};
window.addEventListener('DOMContentLoaded', () => {
  const domNode = document.getElementById('search-console-table');
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(domNode);
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));
});

/***/ }),

/***/ "./src/table/loadGapi.js":
/*!*******************************!*\
  !*** ./src/table/loadGapi.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadGoogleScript: () => (/* binding */ loadGoogleScript)
/* harmony export */ });
const loadGoogleScript = () => {
  // Loads the Google JavaScript Library
  (function () {
    const id = 'google-js';
    const src = 'https://apis.google.com/js/platform.js';

    // We have at least one script
    const firstJs = document.getElementsByTagName('script')[0];

    // Prevent script from loading twice
    if (document.getElementById(id)) {
      return;
    }
    const js = document.createElement('script');
    js.id = id;
    js.src = src;
    js.onload = window.onGoogleScriptLoad;
    firstJs.parentNode.insertBefore(js, firstJs);
  })();
};

/***/ }),

/***/ "./src/widget/chart.js":
/*!*****************************!*\
  !*** ./src/widget/chart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyChart: () => (/* binding */ MyChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);








const options = {
  animation: {
    duration: 500,
    easing: 'out',
    startup: true
  },
  tooltip: {
    isHtml: true,
    showTitle: true
  },
  chartArea: {
    width: '100%'
  },
  height: 350,
  hAxis: {
    gridlines: {
      count: 5,
      minSpacing: 15
    },
    minorGridlines: {
      count: 0
    },
    showTextEvery: 1
  },
  vAxis: {
    textPosition: 'none'
  },
  vAxes: {},
  series: {
    0: {
      color: '#4285f4',
      labelInLegend: 'Last 28 days'
    },
    1: {
      color: '#4285f4',
      lineDashStyle: [2, 2],
      labelInLegend: 'Previous 28 days'
    }
  },
  legend: {
    position: 'top',
    alignment: 'start'
  },
  focusTarget: 'category'
};
function MyChart({
  url
}) {
  const {
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const [customOptions, setCustomOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(options);
  const [table, setTable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [metric, setMetric] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('clicks');
  const _gapi = window.gapi;
  const query = {
    siteUrl: settings.site,
    searchType: 'web',
    startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 28)),
    endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate())),
    dimensions: ['date'],
    dimensionFilterGroups: {},
    dataState: 'all'
  };
  const generateReport = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!data) return;
    const current = data.current;
    const previous = data.previous;
    const testTable = [];
    testTable.push([{
      type: 'number',
      label: 'Day'
    }, {
      type: 'string',
      role: 'tooltip',
      p: {
        html: true
      }
    }, {
      label: 'Current',
      type: 'number'
    }, {
      label: 'Previous',
      type: 'number'
    }]);
    for (const row in current.rows) {
      testTable.push([parseInt(row) + 1, createCustomHTMLContent(row, current.rows[row].keys[0], formatData(current.rows[row][metric]), previous.rows[row].keys[0], formatData(previous.rows[row][metric])), {
        v: current.rows[row][metric],
        f: formatData(current.rows[row][metric])
      }, {
        v: previous.rows[row][metric],
        f: formatData(previous.rows[row][metric])
      }]);
    }
    setTable(testTable);
  }, [data, metric]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (settings.token.access_token) getReport();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    generateReport();
  }, [data, generateReport]);
  const refreshToken = () => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
      path: '/searchconsole/v1/refresh',
      method: 'POST'
    }).then(result => {
      window.gapi.client.setToken(result);
      getReport();
    });
  };
  const getFilters = () => {
    if (url) {
      return [{
        filters: [{
          dimension: 'page',
          expression: url,
          operator: 'EQUALS'
        }]
      }];
    }
    return null;
  };
  const getReport = () => {
    const current = _gapi.client.newBatch();
    current.add(window.gapi.client.webmasters.searchanalytics.query({
      ...query,
      dimensionFilterGroups: getFilters()
    }), {
      id: 'current'
    });
    current.add(window.gapi.client.webmasters.searchanalytics.query({
      ...query,
      dimensionFilterGroups: getFilters(),
      startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 56)),
      endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_5__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 28))
    }), {
      id: 'previous'
    });
    current.then(values => {
      if (401 === values.result.current.status) {
        refreshToken();
      }
      setData({
        current: values.result.current.result,
        previous: values.result.previous.result
      });
    }).catch(error => {
      if (401 === error.status) {
        refreshToken();
      }
    });
  };
  const formatData = val => {
    if ('ctr' === metric) {
      return (val * 100).toFixed(2) + '%';
    }
    if ('position' === metric) {
      return val.toFixed(2);
    }
    return val;
  };
  const createCustomHTMLContent = (day, currentDate, currentValue, previousDate, previousValue) => {
    return `<div style="padding: 1rem;"><b>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Day') + ' ' + (parseInt(day) + 1)}</b><div style="display: flex; gap: 1rem;"><span>${currentDate}</span><b>${currentValue}</b></div><div style="display: flex; gap: 1rem;"><span>${previousDate}</span><b>${previousValue}</b></div></div>`;
  };
  const changeMetric = (newMetric, newColor) => {
    setMetric(newMetric);
    setCustomOptions({
      ...customOptions,
      vAxis: {
        direction: 'position' === newMetric ? -1 : 1,
        format: 'ctr' === newMetric ? '#,###%' : 'none'
      },
      series: {
        0: {
          color: newColor,
          labelInLegend: 'Last 28 days'
        },
        1: {
          color: newColor,
          lineDashStyle: [3, 3],
          labelInLegend: 'Previous 28 days'
        }
      }
    });
  };
  if (!table) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-chart"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'clicks' === metric ? 'primary' : 'secondary',
    size: "small",
    onClick: () => changeMetric('clicks', '#4285f4')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clicks', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'impressions' === metric ? 'primary' : 'secondary',
    size: "small",
    onClick: () => changeMetric('impressions', '#5e35b1')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Impressions', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'ctr' === metric ? 'primary' : 'secondary',
    size: "small",
    onClick: () => changeMetric('ctr', '#00897b')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('CTR', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: 'position' === metric ? 'primary' : 'secondary',
    size: "small",
    onClick: () => changeMetric('position', '#E8710A')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Position', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_google_charts__WEBPACK_IMPORTED_MODULE_7__.Chart, {
    chartType: "LineChart",
    data: table,
    options: customOptions,
    chartPackages: ['corechart', 'controls', 'charteditor']
  }));
}

/***/ }),

/***/ "./node_modules/history/index.js":
/*!***************************************!*\
  !*** ./node_modules/history/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Action: () => (/* binding */ Action),
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   createPath: () => (/* binding */ createPath),
/* harmony export */   parsePath: () => (/* binding */ parsePath)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");


/**
 * Actions represent the type of change to a location value.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#action
 */
var Action;

(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));

var readOnly =  true ? function (obj) {
  return Object.freeze(obj);
} : 0;

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== 'undefined') console.warn(message);

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

var BeforeUnloadEventType = 'beforeunload';
var HashChangeEventType = 'hashchange';
var PopStateEventType = 'popstate';
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$window = _options.window,
      window = _options$window === void 0 ? document.defaultView : _options$window;
  var globalHistory = window.history;

  function getIndexAndLocation() {
    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname: pathname,
      search: search,
      hash: hash,
      state: state.usr || null,
      key: state.key || 'default'
    })];
  }

  var blockedPopTx = null;

  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;

      var _getIndexAndLocation = getIndexAndLocation(),
          nextIndex = _getIndexAndLocation[0],
          nextLocation = _getIndexAndLocation[1];

      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;

          if (delta) {
            // Revert the POP
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        } else {
          // Trying to POP to a location with no index. We did not create
          // this location, so we can't effectively block the navigation.
           true ? warning(false, // TODO: Write up a doc that explains our blocking strategy in
          // detail and link to it here so people can understand better what
          // is going on and how to avoid it.
          "You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.") : 0;
        }
      } else {
        applyTx(nextAction);
      }
    }
  }

  window.addEventListener(PopStateEventType, handlePop);
  var action = Action.Pop;

  var _getIndexAndLocation2 = getIndexAndLocation(),
      index = _getIndexAndLocation2[0],
      location = _getIndexAndLocation2[1];

  var listeners = createEvents();
  var blockers = createEvents();

  if (index == null) {
    index = 0;
    globalHistory.replaceState((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, globalHistory.state, {
      idx: index
    }), '');
  }

  function createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  } // state defaults to `null` because `window.history.state` does


  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }

    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      hash: '',
      search: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }

  function getHistoryStateAndUrl(nextLocation, index) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index
    }, createHref(nextLocation)];
  }

  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }

  function applyTx(nextAction) {
    action = nextAction;

    var _getIndexAndLocation3 = getIndexAndLocation();

    index = _getIndexAndLocation3[0];
    location = _getIndexAndLocation3[1];
    listeners.call({
      action: action,
      location: location
    });
  }

  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      push(to, state);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr = getHistoryStateAndUrl(nextLocation, index + 1),
          historyState = _getHistoryStateAndUr[0],
          url = _getHistoryStateAndUr[1]; // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/


      try {
        globalHistory.pushState(historyState, '', url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }

      applyTx(nextAction);
    }
  }

  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      replace(to, state);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr2 = getHistoryStateAndUrl(nextLocation, index),
          historyState = _getHistoryStateAndUr2[0],
          url = _getHistoryStateAndUr2[1]; // TODO: Support forced reloading


      globalHistory.replaceState(historyState, '', url);
      applyTx(nextAction);
    }
  }

  function go(delta) {
    globalHistory.go(delta);
  }

  var history = {
    get action() {
      return action;
    },

    get location() {
      return location;
    },

    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);

      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }

      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }

  var _options2 = options,
      _options2$window = _options2.window,
      window = _options2$window === void 0 ? document.defaultView : _options2$window;
  var globalHistory = window.history;

  function getIndexAndLocation() {
    var _parsePath = parsePath(window.location.hash.substr(1)),
        _parsePath$pathname = _parsePath.pathname,
        pathname = _parsePath$pathname === void 0 ? '/' : _parsePath$pathname,
        _parsePath$search = _parsePath.search,
        search = _parsePath$search === void 0 ? '' : _parsePath$search,
        _parsePath$hash = _parsePath.hash,
        hash = _parsePath$hash === void 0 ? '' : _parsePath$hash;

    var state = globalHistory.state || {};
    return [state.idx, readOnly({
      pathname: pathname,
      search: search,
      hash: hash,
      state: state.usr || null,
      key: state.key || 'default'
    })];
  }

  var blockedPopTx = null;

  function handlePop() {
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      var nextAction = Action.Pop;

      var _getIndexAndLocation4 = getIndexAndLocation(),
          nextIndex = _getIndexAndLocation4[0],
          nextLocation = _getIndexAndLocation4[1];

      if (blockers.length) {
        if (nextIndex != null) {
          var delta = index - nextIndex;

          if (delta) {
            // Revert the POP
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry: function retry() {
                go(delta * -1);
              }
            };
            go(delta);
          }
        } else {
          // Trying to POP to a location with no index. We did not create
          // this location, so we can't effectively block the navigation.
           true ? warning(false, // TODO: Write up a doc that explains our blocking strategy in
          // detail and link to it here so people can understand better
          // what is going on and how to avoid it.
          "You are trying to block a POP navigation to a location that was not " + "created by the history library. The block will fail silently in " + "production, but in general you should do all navigation with the " + "history library (instead of using window.history.pushState directly) " + "to avoid this situation.") : 0;
        }
      } else {
        applyTx(nextAction);
      }
    }
  }

  window.addEventListener(PopStateEventType, handlePop); // popstate does not fire on hashchange in IE 11 and old (trident) Edge
  // https://developer.mozilla.org/de/docs/Web/API/Window/popstate_event

  window.addEventListener(HashChangeEventType, function () {
    var _getIndexAndLocation5 = getIndexAndLocation(),
        nextLocation = _getIndexAndLocation5[1]; // Ignore extraneous hashchange events.


    if (createPath(nextLocation) !== createPath(location)) {
      handlePop();
    }
  });
  var action = Action.Pop;

  var _getIndexAndLocation6 = getIndexAndLocation(),
      index = _getIndexAndLocation6[0],
      location = _getIndexAndLocation6[1];

  var listeners = createEvents();
  var blockers = createEvents();

  if (index == null) {
    index = 0;
    globalHistory.replaceState((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, globalHistory.state, {
      idx: index
    }), '');
  }

  function getBaseHref() {
    var base = document.querySelector('base');
    var href = '';

    if (base && base.getAttribute('href')) {
      var url = window.location.href;
      var hashIndex = url.indexOf('#');
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }

    return href;
  }

  function createHref(to) {
    return getBaseHref() + '#' + (typeof to === 'string' ? to : createPath(to));
  }

  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }

    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      hash: '',
      search: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }

  function getHistoryStateAndUrl(nextLocation, index) {
    return [{
      usr: nextLocation.state,
      key: nextLocation.key,
      idx: index
    }, createHref(nextLocation)];
  }

  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }

  function applyTx(nextAction) {
    action = nextAction;

    var _getIndexAndLocation7 = getIndexAndLocation();

    index = _getIndexAndLocation7[0];
    location = _getIndexAndLocation7[1];
    listeners.call({
      action: action,
      location: location
    });
  }

  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      push(to, state);
    }

     true ? warning(nextLocation.pathname.charAt(0) === '/', "Relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")") : 0;

    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr3 = getHistoryStateAndUrl(nextLocation, index + 1),
          historyState = _getHistoryStateAndUr3[0],
          url = _getHistoryStateAndUr3[1]; // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/


      try {
        globalHistory.pushState(historyState, '', url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }

      applyTx(nextAction);
    }
  }

  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      replace(to, state);
    }

     true ? warning(nextLocation.pathname.charAt(0) === '/', "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(to) + ")") : 0;

    if (allowTx(nextAction, nextLocation, retry)) {
      var _getHistoryStateAndUr4 = getHistoryStateAndUrl(nextLocation, index),
          historyState = _getHistoryStateAndUr4[0],
          url = _getHistoryStateAndUr4[1]; // TODO: Support forced reloading


      globalHistory.replaceState(historyState, '', url);
      applyTx(nextAction);
    }
  }

  function go(delta) {
    globalHistory.go(delta);
  }

  var history = {
    get action() {
      return action;
    },

    get location() {
      return location;
    },

    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      var unblock = blockers.push(blocker);

      if (blockers.length === 1) {
        window.addEventListener(BeforeUnloadEventType, promptBeforeUnload);
      }

      return function () {
        unblock(); // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents

        if (!blockers.length) {
          window.removeEventListener(BeforeUnloadEventType, promptBeforeUnload);
        }
      };
    }
  };
  return history;
}
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#creatememoryhistory
 */

function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }

  var _options3 = options,
      _options3$initialEntr = _options3.initialEntries,
      initialEntries = _options3$initialEntr === void 0 ? ['/'] : _options3$initialEntr,
      initialIndex = _options3.initialIndex;
  var entries = initialEntries.map(function (entry) {
    var location = readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: createKey()
    }, typeof entry === 'string' ? parsePath(entry) : entry));
     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(entry) + ")") : 0;
    return location;
  });
  var index = clamp(initialIndex == null ? entries.length - 1 : initialIndex, 0, entries.length - 1);
  var action = Action.Pop;
  var location = entries[index];
  var listeners = createEvents();
  var blockers = createEvents();

  function createHref(to) {
    return typeof to === 'string' ? to : createPath(to);
  }

  function getNextLocation(to, state) {
    if (state === void 0) {
      state = null;
    }

    return readOnly((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      pathname: location.pathname,
      search: '',
      hash: ''
    }, typeof to === 'string' ? parsePath(to) : to, {
      state: state,
      key: createKey()
    }));
  }

  function allowTx(action, location, retry) {
    return !blockers.length || (blockers.call({
      action: action,
      location: location,
      retry: retry
    }), false);
  }

  function applyTx(nextAction, nextLocation) {
    action = nextAction;
    location = nextLocation;
    listeners.call({
      action: action,
      location: location
    });
  }

  function push(to, state) {
    var nextAction = Action.Push;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      push(to, state);
    }

     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in memory history.push(" + JSON.stringify(to) + ")") : 0;

    if (allowTx(nextAction, nextLocation, retry)) {
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      applyTx(nextAction, nextLocation);
    }
  }

  function replace(to, state) {
    var nextAction = Action.Replace;
    var nextLocation = getNextLocation(to, state);

    function retry() {
      replace(to, state);
    }

     true ? warning(location.pathname.charAt(0) === '/', "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(to) + ")") : 0;

    if (allowTx(nextAction, nextLocation, retry)) {
      entries[index] = nextLocation;
      applyTx(nextAction, nextLocation);
    }
  }

  function go(delta) {
    var nextIndex = clamp(index + delta, 0, entries.length - 1);
    var nextAction = Action.Pop;
    var nextLocation = entries[nextIndex];

    function retry() {
      go(delta);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      index = nextIndex;
      applyTx(nextAction, nextLocation);
    }
  }

  var history = {
    get index() {
      return index;
    },

    get action() {
      return action;
    },

    get location() {
      return location;
    },

    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    back: function back() {
      go(-1);
    },
    forward: function forward() {
      go(1);
    },
    listen: function listen(listener) {
      return listeners.push(listener);
    },
    block: function block(blocker) {
      return blockers.push(blocker);
    }
  };
  return history;
} ////////////////////////////////////////////////////////////////////////////////
// UTILS
////////////////////////////////////////////////////////////////////////////////

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}

function promptBeforeUnload(event) {
  // Cancel the event.
  event.preventDefault(); // Chrome (and legacy IE) requires returnValue to be set.

  event.returnValue = '';
}

function createEvents() {
  var handlers = [];
  return {
    get length() {
      return handlers.length;
    },

    push: function push(fn) {
      handlers.push(fn);
      return function () {
        handlers = handlers.filter(function (handler) {
          return handler !== fn;
        });
      };
    },
    call: function call(arg) {
      handlers.forEach(function (fn) {
        return fn && fn(arg);
      });
    }
  };
}

function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createpath
 */


function createPath(_ref) {
  var _ref$pathname = _ref.pathname,
      pathname = _ref$pathname === void 0 ? '/' : _ref$pathname,
      _ref$search = _ref.search,
      search = _ref$search === void 0 ? '' : _ref$search,
      _ref$hash = _ref.hash,
      hash = _ref$hash === void 0 ? '' : _ref$hash;
  if (search && search !== '?') pathname += search.charAt(0) === '?' ? search : '?' + search;
  if (hash && hash !== '#') pathname += hash.charAt(0) === '#' ? hash : '#' + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#parsepath
 */

function parsePath(path) {
  var parsedPath = {};

  if (path) {
    var hashIndex = path.indexOf('#');

    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    var searchIndex = path.indexOf('?');

    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}


//# sourceMappingURL=index.js.map


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

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

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

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/react-google-charts/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-google-charts/dist/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Chart: () => (/* binding */ Chart$1),
/* harmony export */   GoogleDataTableColumnRoleType: () => (/* binding */ GoogleDataTableColumnRoleType),
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
/*!****************************!*\
  !*** ./src/table/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loadGapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadGapi */ "./src/table/loadGapi.js");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/table/app.js");




const elements = document.getElementsByClassName('search-console column-search-console');
Array.from(elements).forEach(function (element) {
  const children = element.querySelector('span.gsc-url');
  element.addEventListener('click', e => {
    const url = children.getAttribute('data-url');
    const urlFound = new CustomEvent('search-console-details', {
      bubbles: true,
      detail: {
        url
      }
    });
    window.dispatchEvent(urlFound);
  });
});
let token = '';
const chartQuery = {
  siteUrl: '',
  searchType: 'web',
  startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 29)),
  endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 1)),
  dimensions: ['page'],
  dimensionFilterGroups: {},
  //aggregationType: 'byPage',
  startRow: 0,
  rowLimit: 1
};
const allUrls = [];
window.jQuery(document).ready(function () {
  window.jQuery('.gsc-url').each((index, el) => {
    allUrls.push(window.jQuery(el).data('url'));
  });
});
function refreshToken() {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: '/searchconsole/v1/refresh',
    method: 'POST'
  }).then(result => {
    window.gapi.client.setToken(result);
    getReport();
  });
}

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
  // get settings
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: '/wp/v2/settings/'
  }).then(result => {
    token = result.search_console.token;
    chartQuery.siteUrl = result.search_console.site;
    window.gapi.load('client', start);
  });
};
function start() {
  window.gapi.client.load('searchconsole', 'v1').then(() => {
    window.gapi.client.setToken(token);
    check();
  });
}
function check() {
  window.gapi.client.webmasters.sitemaps.list({
    siteUrl: chartQuery.siteUrl
  }).then(function () {
    getReport();
  }).catch(error => {
    if (401 === error.status) {
      refreshToken();
    }
  });
}
function getReport() {
  const batch = window.gapi.client.newBatch();
  const batchPrev = window.gapi.client.newBatch();
  for (const url of allUrls) {
    const req = [{
      filters: [{
        dimension: 'page',
        operator: 'EQUALS',
        expression: url
      }]
    }];
    batch.add(window.gapi.client.webmasters.searchanalytics.query({
      ...chartQuery,
      dimensionFilterGroups: req
    }), {
      id: url
    });
    batchPrev.add(window.gapi.client.webmasters.searchanalytics.query({
      ...chartQuery,
      dimensionFilterGroups: req,
      startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 57)),
      endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 30))
    }), {
      id: url
    });
  }
  Promise.all([batch, batchPrev]).then(values => {
    const current = values[0].result;
    const previous = values[1].result;
    const result = {};
    for (const url in current) {
      if (!previous[url].result?.rows?.[0]) {
        continue;
      }
      result[url] = {
        current: current[url].result.rows[0],
        previous: previous[url].result.rows[0]
      };
      if (allUrls.indexOf(url) > -1 && result[url]) {
        window.jQuery('span[data-url="' + url + '"]').html(createReportHtml(result[url]));
      }
    }
  });
}
const createReportHtml = ({
  current,
  previous
}) => `
	<b>Clicks:</b> ${current.clicks || 'n/a'} (${previous.clicks || 'n/a'})<br />
	<b>Position:</b> ${Math.round(current.position * 100) / 100 || 'n/a'} (${Math.round(previous.position * 100) / 100 || 'n/a'})<br />
	<b>CTR:</b> ${(current.ctr * 100).toFixed(2) + '%' || 0} (${(previous.ctr * 100).toFixed(2) + '%' || 0})<br />
	<b>Impressions:</b> ${current.impressions || 'n/a'} (${previous.impressions || 'n/a'})<br />`;
(0,_loadGapi__WEBPACK_IMPORTED_MODULE_0__.loadGoogleScript)();
})();

/******/ })()
;
//# sourceMappingURL=table.js.map