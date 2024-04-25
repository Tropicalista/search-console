/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["date"];

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



let token = '';
const chartQuery = {
  siteUrl: '',
  rowLimit: null,
  searchType: 'web',
  startDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 29)),
  endDate: (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_1__.dateI18n)('Y-m-d', new Date().setDate(new Date().getDate() - 1)),
  dimensions: ['page']
};
const allUrls = [];
window.jQuery(document).ready(function () {
  window.jQuery('.gsc-url').each(index => {
    allUrls.push(window.jQuery(this).data('url'));
  });
});
function refreshToken() {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: '/searchconsole/v1/refresh',
    method: 'POST'
  }).then(result => {
    window.gapi.client.setToken(result);
  });
}

// callback on gapi loaded
window.onGoogleScriptLoad = () => {
  // get settings
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    path: '/searchconsole/v1/settings/'
  }).then(result => {
    token = result.token;
    chartQuery.siteUrl = result.site;
    window.gapi.load('client', start);
  });
};
function start() {
  window.gapi.client.load('searchconsole', 'v1').then(() => {
    window.gapi.client.setToken(token);
    getReport();
  });
}
function getReport() {
  window.gapi.client.webmasters.searchanalytics.query(chartQuery).then(function (response) {
    response.result.rows.forEach(function (x) {
      if (allUrls.indexOf(x.keys[0]) > -1) {
        window.jQuery('span[data-url="' + x.keys[0] + '"]').html(createReportHtml(x));
      }
    });
  }).catch(error => {
    if (401 === error.status) {
      refreshToken();
    }
  });
}
const createReportHtml = ({
  clicks,
  position,
  impressions,
  ctr
}) => `
	<b>Clicks:</b> ${clicks}<br />
	<b>Position:</b> ${Math.round(position * 100) / 100}<br />
	<b>CTR:</b> ${Math.round(ctr * 10000) / 100}%<br />
	<b>Impressions:</b> ${impressions}<br />`;
(0,_loadGapi__WEBPACK_IMPORTED_MODULE_0__.loadGoogleScript)();
})();

/******/ })()
;
//# sourceMappingURL=table.js.map