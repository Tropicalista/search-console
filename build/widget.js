/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/chartOptions.js":
/*!**************************************!*\
  !*** ./src/frontend/chartOptions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chartOptions": () => (/* binding */ chartOptions)
/* harmony export */ });
const chartOptions = {
  width: '100%',
  height: '400',
  colors: ['#4285f4', '#5e35b1', '#00897b', '#E8710A'],
  //curveType: 'function',
  smoothline: 'true',
  focusTarget: 'category',
  chartArea: {
    // leave room for y-axis labels
    width: '100%',
    height: '80%'
  },
  hAxis: {
    showTextEvery: 1,
    format: 'MMM dd'
  },
  vAxis: {
    gridlines: {
      count: 0,
      minSpacing: 100
    },
    minorGridlines: {
      count: 2
    },
    showTextEvery: 2
  },
  vAxes: {
    //0: {direction: -1, maxValue:1, textPosition: 'none'},
    0: {
      direction: -1,
      textPosition: 'none'
    },
    1: {
      textPosition: 'none'
    },
    2: {
      textPosition: 'none'
    },
    3: {
      textPosition: 'none'
    }
  },
  series: {
    0: {
      type: "line",
      targetAxisIndex: 1,
      tooltip: true
    },
    1: {
      type: "line",
      targetAxisIndex: 2,
      tooltip: true
    },
    2: {
      type: "line",
      targetAxisIndex: 3,
      tooltip: true
    },
    3: {
      type: "line",
      targetAxisIndex: 0,
      tooltip: true
    },
    4: {
      type: "line",
      targetAxisIndex: 0,
      tooltip: true
    }
  }
};

/***/ }),

/***/ "./src/frontend/loadGapi.js":
/*!**********************************!*\
  !*** ./src/frontend/loadGapi.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadGoogleScript": () => (/* binding */ loadGoogleScript)
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
/*!********************************!*\
  !*** ./src/frontend/widget.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loadGapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadGapi */ "./src/frontend/loadGapi.js");
/* harmony import */ var _chartOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chartOptions */ "./src/frontend/chartOptions.js");


let chart = '';
let token = '';
let chartQuery = {
  'siteUrl': '',
  'rowLimit': null,
  'searchType': 'web',
  'startDate': moment().subtract(14, 'days').format('YYYY-MM-DD'),
  'endDate': moment().format('YYYY-MM-DD'),
  'dimensions': ['date']
};

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
  const _gapi = window.gapi; // set gapi globally 

  google.charts.load('current', {
    'packages': ['corechart']
  });

  // get settings
  wp.apiRequest({
    path: 'wp/v2/settings?_locale=user'
  }).then(result => {
    token = result.search_console.token.access_token;
    chartQuery.siteUrl = result.site;
    gapi.load('client', start);
  }).catch(error => console.log(error.responseText));
};
function start() {
  gapi.client.load('searchconsole', 'v1').then(() => {
    gapi.auth.setToken({
      access_token: token
    });
    getReport();
  });
}
function getReport() {
  gapi.client.webmasters.searchanalytics.query(chartQuery).then(function (response) {
    let dataChart = formatData(response.result.rows);
    chart = new google.visualization.LineChart(document.getElementById('search-console-chart'));
    chart.draw(dataChart, _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions);
    google.visualization.events.addListener(chart, 'select', selectHandler);
  }).then(null, function (err) {
    console.log(err);
  });
}
function formatData(rows, isTable) {
  var data = new google.visualization.DataTable();
  isTable ? data.addColumn('string', 'Keyword') : data.addColumn('date', 'Keys');
  data.addColumn('number', 'Clicks');
  data.addColumn('number', 'Impressions');
  data.addColumn('number', 'CTR');
  data.addColumn('number', 'Position');
  if (!isTable) {
    _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.hAxis.format === 'MMM dd';
  }
  _.forEach(rows, function (row) {
    data.addRow([isTable ? row.keys[0] : moment(row.keys[0]).toDate(), row.clicks, row.impressions, row.ctr * 100, parseFloat(row.position)]);
  });
  return data;
}
function selectHandler() {
  var col = chart.getSelection()[0].column;
  if (!col) {
    return;
  }
  var selection = chart.getSelection();

  // click and data index are one off
  var i = selection[0].column - 1;
  _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].tooltip = !_chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].tooltip;

  // just simple reverse
  if (_chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].lineWidth == 0) {
    _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].lineWidth = 2;
    _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].areaOpacity = 0.3;
  } else {
    _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].lineWidth = 0;
    _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions.series[i].areaOpacity = 0.0;
  }
  chart.draw(dataChart, _chartOptions__WEBPACK_IMPORTED_MODULE_1__.chartOptions);
}
(0,_loadGapi__WEBPACK_IMPORTED_MODULE_0__.loadGoogleScript)();
})();

/******/ })()
;
//# sourceMappingURL=widget.js.map