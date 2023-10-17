/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@react-oauth/google/dist/index.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@react-oauth/google/dist/index.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GoogleLogin": () => (/* binding */ GoogleLogin),
/* harmony export */   "GoogleOAuthProvider": () => (/* binding */ GoogleOAuthProvider),
/* harmony export */   "googleLogout": () => (/* binding */ googleLogout),
/* harmony export */   "hasGrantedAllScopesGoogle": () => (/* binding */ hasGrantedAllScopesGoogle),
/* harmony export */   "hasGrantedAnyScopeGoogle": () => (/* binding */ hasGrantedAnyScopeGoogle),
/* harmony export */   "useGoogleLogin": () => (/* binding */ useGoogleLogin),
/* harmony export */   "useGoogleOneTapLogin": () => (/* binding */ useGoogleOneTapLogin)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useLoadGsiScript(options = {}) {
    const { onScriptLoadSuccess, onScriptLoadError } = options;
    const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const onScriptLoadSuccessRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onScriptLoadSuccess);
    onScriptLoadSuccessRef.current = onScriptLoadSuccess;
    const onScriptLoadErrorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onScriptLoadError);
    onScriptLoadErrorRef.current = onScriptLoadError;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://accounts.google.com/gsi/client';
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.onload = () => {
            var _a;
            setScriptLoadedSuccessfully(true);
            (_a = onScriptLoadSuccessRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadSuccessRef);
        };
        scriptTag.onerror = () => {
            var _a;
            setScriptLoadedSuccessfully(false);
            (_a = onScriptLoadErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadErrorRef);
        };
        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    return scriptLoadedSuccessfully;
}

const GoogleOAuthContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
function GoogleOAuthProvider({ clientId, onScriptLoadSuccess, onScriptLoadError, children, }) {
    const scriptLoadedSuccessfully = useLoadGsiScript({
        onScriptLoadSuccess,
        onScriptLoadError,
    });
    const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
        clientId,
        scriptLoadedSuccessfully,
    }), [clientId, scriptLoadedSuccessfully]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(GoogleOAuthContext.Provider, { value: contextValue }, children));
}
function useGoogleOAuth() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(GoogleOAuthContext);
    if (!context) {
        throw new Error('Google OAuth components must be used within GoogleOAuthProvider');
    }
    return context;
}

function extractClientId(credentialResponse) {
    var _a;
    const clientId = (_a = credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.clientId) !== null && _a !== void 0 ? _a : credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.client_id;
    return clientId;
}

const containerHeightMap = { large: 40, medium: 32, small: 20 };
function GoogleLogin({ onSuccess, onError, useOneTap, promptMomentNotification, type = 'standard', theme = 'outline', size = 'large', text, shape, logo_alignment, width, locale, click_listener, ...props }) {
    const btnContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const onSuccessRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onError);
    onErrorRef.current = onError;
    const promptMomentNotificationRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(promptMomentNotification);
    promptMomentNotificationRef.current = promptMomentNotification;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        var _a, _b, _c;
        if (!scriptLoadedSuccessfully)
            return;
        (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.id.initialize({
            client_id: clientId,
            callback: (credentialResponse) => {
                var _a;
                if (!(credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.credential)) {
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef);
                }
                const { credential, select_by } = credentialResponse;
                onSuccessRef.current({
                    credential,
                    clientId: extractClientId(credentialResponse),
                    select_by,
                });
            },
            ...props,
        });
        (_b = window.google) === null || _b === void 0 ? void 0 : _b.accounts.id.renderButton(btnContainerRef.current, {
            type,
            theme,
            size,
            text,
            shape,
            logo_alignment,
            width,
            locale,
            click_listener,
        });
        if (useOneTap)
            (_c = window.google) === null || _c === void 0 ? void 0 : _c.accounts.id.prompt(promptMomentNotificationRef.current);
        return () => {
            var _a;
            if (useOneTap)
                (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.id.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        clientId,
        scriptLoadedSuccessfully,
        useOneTap,
        type,
        theme,
        size,
        text,
        shape,
        logo_alignment,
        width,
        locale,
    ]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ref: btnContainerRef, style: { height: containerHeightMap[size] } }));
}

function googleLogout() {
    var _a;
    (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.id.disableAutoSelect();
}

/* eslint-disable import/export */
function useGoogleLogin({ flow = 'implicit', scope = '', onSuccess, onError, onNonOAuthError, overrideScope, ...props }) {
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const clientRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    const onSuccessRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onError);
    onErrorRef.current = onError;
    const onNonOAuthErrorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onNonOAuthError);
    onNonOAuthErrorRef.current = onNonOAuthError;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        var _a;
        if (!scriptLoadedSuccessfully)
            return;
        const clientMethod = flow === 'implicit' ? 'initTokenClient' : 'initCodeClient';
        const client = (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.oauth2[clientMethod]({
            client_id: clientId,
            scope: overrideScope ? scope : `openid profile email ${scope}`,
            callback: (response) => {
                var _a, _b;
                if (response.error)
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef, response);
                (_b = onSuccessRef.current) === null || _b === void 0 ? void 0 : _b.call(onSuccessRef, response);
            },
            error_callback: (nonOAuthError) => {
                var _a;
                (_a = onNonOAuthErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onNonOAuthErrorRef, nonOAuthError);
            },
            ...props,
        });
        clientRef.current = client;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, scriptLoadedSuccessfully, flow, scope]);
    const loginImplicitFlow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((overrideConfig) => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestAccessToken(overrideConfig); }, []);
    const loginAuthCodeFlow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestCode(); }, []);
    return flow === 'implicit' ? loginImplicitFlow : loginAuthCodeFlow;
}

function useGoogleOneTapLogin({ onSuccess, onError, promptMomentNotification, cancel_on_tap_outside, hosted_domain, }) {
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const onSuccessRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onError);
    onErrorRef.current = onError;
    const promptMomentNotificationRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(promptMomentNotification);
    promptMomentNotificationRef.current = promptMomentNotification;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        var _a, _b;
        if (!scriptLoadedSuccessfully)
            return;
        (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.id.initialize({
            client_id: clientId,
            callback: (credentialResponse) => {
                var _a;
                if (!(credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.credential)) {
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef);
                }
                const { credential, select_by } = credentialResponse;
                onSuccessRef.current({
                    credential,
                    clientId: extractClientId(credentialResponse),
                    select_by,
                });
            },
            hosted_domain,
            cancel_on_tap_outside,
        });
        (_b = window.google) === null || _b === void 0 ? void 0 : _b.accounts.id.prompt(promptMomentNotificationRef.current);
        return () => {
            var _a;
            (_a = window.google) === null || _a === void 0 ? void 0 : _a.accounts.id.cancel();
        };
    }, [
        clientId,
        scriptLoadedSuccessfully,
        cancel_on_tap_outside,
        hosted_domain,
    ]);
}

/**
 * Checks if the user granted all the specified scope or scopes
 * @returns True if all the scopes are granted
 */
function hasGrantedAllScopesGoogle(tokenResponse, firstScope, ...restScopes) {
    if (!window.google)
        return false;
    return window.google.accounts.oauth2.hasGrantedAllScopes(tokenResponse, firstScope, ...restScopes);
}

/**
 * Checks if the user granted any of the specified scope or scopes.
 * @returns True if any of the scopes are granted
 */
function hasGrantedAnyScopeGoogle(tokenResponse, firstScope, ...restScopes) {
    if (!window.google)
        return false;
    return window.google.accounts.oauth2.hasGrantedAnyScope(tokenResponse, firstScope, ...restScopes);
}




/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps} props icon is the SVG component to render
 *                          size is a number specifiying the icon size in pixels
 *                          Other props will be passed to wrapped SVG component
 *
 * @return {JSX.Element}  Icon component
 */

function Icon(_ref) {
  let {
    icon,
    size = 24,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/cloud.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/cloud.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const cloud = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17.3 10.1c0-2.5-2.1-4.4-4.8-4.4-2.2 0-4.1 1.4-4.6 3.3h-.2C5.7 9 4 10.7 4 12.8c0 2.1 1.7 3.8 3.7 3.8h9c1.8 0 3.2-1.5 3.2-3.3.1-1.6-1.1-2.9-2.6-3.2zm-.5 5.1h-9c-1.2 0-2.2-1.1-2.2-2.3s1-2.4 2.2-2.4h1.3l.3-1.1c.4-1.3 1.7-2.2 3.2-2.2 1.8 0 3.3 1.3 3.3 2.9v1.3l1.3.2c.8.1 1.4.9 1.4 1.8-.1 1-.9 1.8-1.8 1.8z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloud);
//# sourceMappingURL=cloud.js.map

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



function Footer(_ref) {
  let {
    title
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "inner-container"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://github.com/Tropicalista/search-console",
    target: "_blank"
  }, "Github"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/search-console/",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Support', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/formello/reviews/#new-post",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rate ', 'formello'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }))));
}

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

//import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';

function Header(_ref) {
  let {
    title
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "masthead"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "masthead__branding"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, title)));
}

/***/ }),

/***/ "./src/components/ads/index.js":
/*!*************************************!*\
  !*** ./src/components/ads/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-directory */ "@wordpress/block-directory");
/* harmony import */ var _wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);







const Ads = () => {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    installBlockType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)(_wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3__.store);
  const {
    isFormelloInstalled,
    isFormelloActive
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const formello = select('core').getPlugin('formello/formello');
    return {
      isFormelloInstalled: formello,
      isFormelloActive: formello?.status === 'active'
    };
  });
  const {
    block
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => {
    const {
      getDownloadableBlocks
    } = select(_wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3__.store);
    const blocks = getDownloadableBlocks('block:formello/form').filter(_ref => {
      let {
        name
      } = _ref;
      return 'formello/form' === name;
    });
    return {
      block: blocks.length && blocks[0]
    };
  });
  const isInstallingBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(select => select(_wordpress_block_directory__WEBPACK_IMPORTED_MODULE_3__.store).isInstalling(block.id), [block.id]);
  const [shown, setShown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => {
    // getting stored value
    const shown = localStorage.getItem('sc-shown');
    const initialValue = JSON.parse(shown);
    return initialValue || new Date().getTime();
  });
  if (isFormelloInstalled && isFormelloActive) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    alignment: "left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: Formello url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`<p>Do you need forms? Check <a href="%s" target="_blank">Formello</a> to manage all your forms inside WordPress.`, 'search-console'), 'https://formello.net')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    isSmall: true,
    onClick: () => {
      installBlockType(block).then(() => setLoading(true));
    },
    disabled: isInstallingBlock,
    isBusy: isInstallingBlock
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install Formello', 'search-console')))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ads);

/***/ }),

/***/ "./src/components/dashboard/chart/chart-options.js":
/*!*********************************************************!*\
  !*** ./src/components/dashboard/chart/chart-options.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "./src/components/dashboard/datedropdown.js":
/*!**************************************************!*\
  !*** ./src/components/dashboard/datedropdown.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateDropdown)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");






function DateDropdown() {
  const {
    customDate,
    updateQuery,
    updateSetting,
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const [range, setRange] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 28 days', 'search-console'));
  const setDate = (num, period) => {
    const date = moment().subtract(2, 'days').subtract(num, period).format('YYYY-MM-DD');
    setRange('Last ' + num + ' ' + period);
    updateSetting('customDate', false);
    updateQuery('startDate', date);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    className: "my-container-class-name",
    contentClassName: "my-popover-content-classname",
    placement: "bottom right",
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "secondary",
        onClick: onToggle,
        "aria-expanded": isOpen
      }, customDate ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom date', 'search-console') : range);
    },
    renderContent: _ref2 => {
      let {
        onToggle
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(7, 'days');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 7 days', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(28, 'days');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 28 days', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(1, 'months');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last month', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(3, 'months');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 3 months', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(6, 'months');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 6 months', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(12, 'months');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 12 months', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setDate(16, 'months');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last 18 months', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          updateSetting('customDate', !settings.customDate);
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom date', 'search-console'))));
    }
  });
}

/***/ }),

/***/ "./src/components/dashboard/dateselect.js":
/*!************************************************!*\
  !*** ./src/components/dashboard/dateselect.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateSelect": () => (/* binding */ DateSelect)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _datedropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datedropdown */ "./src/components/dashboard/datedropdown.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");







function DateSelect() {
  const {
    query,
    updateQuery,
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, null, settings.customDate && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "From:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        onClick: onToggle,
        "aria-expanded": isOpen
      }, query.startDate ? (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.format)('F j, Y', query.startDate) : __('Click here to set start date.', 'search-console'));
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DatePicker, {
      __nextRemoveHelpButton: true,
      currentDate: query.startDate,
      onChange: val => {
        console.log(val);
        updateQuery('startDate', (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', val));
      },
      isInvalidDate: val => {
        if (query.endDate) {
          return new Date(val) > new Date(query.endDate);
        }
      }
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "To:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: _ref2 => {
      let {
        isOpen,
        onToggle
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: "secondary",
        onClick: onToggle,
        "aria-expanded": isOpen
      }, query.endDate ? (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.format)('F j, Y', query.endDate) : __('Click here to set end date.', 'search-console'));
    },
    renderContent: () => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.DatePicker, {
      __nextRemoveHelpButton: true,
      currentDate: query.endDate,
      onChange: val => updateQuery('endDate', (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_3__.dateI18n)('Y-m-d', val)),
      isInvalidDate: val => new Date(val) < new Date(query.startDate) || new Date(val) > new Date()
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_datedropdown__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
}

/***/ }),

/***/ "./src/components/dashboard/filters.js":
/*!*********************************************!*\
  !*** ./src/components/dashboard/filters.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Filters": () => (/* binding */ Filters)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals */ "./src/components/dashboard/modals.js");
/* harmony import */ var _dateselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dateselect */ "./src/components/dashboard/dateselect.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");







function Filters() {
  const [showModal, setShowModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    query,
    updateQuery
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  const onRequestClose = () => {
    setShowModal(false);
  };
  const remove = filter => {
    updateQuery('dimensionFiltersGroup', {
      ...query.dimensionFiltersGroup,
      filters: query.dimensionFiltersGroup.filters.filter(prevItem => prevItem !== filter)
    });
  };
  const getSign = filter => {
    if (!filter.operator) {
      return '';
    }
    // eslint-disable-next-line no-nested-ternary
    return 'EQUALS' === filter.operator ? '' : 'CONTAINS' === filter.operator ? '+' : '-';
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-filters"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-filters-options'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: () => setShowModal('searchType')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search type: ', 'search-console') + query.searchType), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    className: "my-container-class-name",
    contentClassName: "my-popover-content-classname",
    placement: "bottom right",
    renderToggle: _ref => {
      let {
        isOpen,
        onToggle
      } = _ref;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "secondary",
        onClick: onToggle,
        "aria-expanded": isOpen,
        icon: 'plus',
        iconPosition: 'right',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New', 'search-console')
      });
    },
    renderContent: _ref2 => {
      let {
        onToggle
      } = _ref2;
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setShowModal('query');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Query', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setShowModal('page');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setShowModal('country');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Country', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
        onClick: () => {
          setShowModal('device');
          onToggle();
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Device', 'search-console')));
    }
  }), query.dimensionFiltersGroup.filters.map((filter, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'button-group',
    key: i
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: () => setShowModal(filter.dimension)
  }, filter.dimension + ': ' + getSign(filter) + filter.expression), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: () => remove(filter)
  }, "x")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dateselect__WEBPACK_IMPORTED_MODULE_4__.DateSelect, {
    query: query
  }))), showModal && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals__WEBPACK_IMPORTED_MODULE_3__.MyModal, {
    onRequestClose: onRequestClose,
    modal: showModal,
    title: showModal
  }));
}

/***/ }),

/***/ "./src/components/dashboard/modals.js":
/*!********************************************!*\
  !*** ./src/components/dashboard/modals.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyModal": () => (/* binding */ MyModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modals_searchtype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modals/searchtype */ "./src/components/dashboard/modals/searchtype.js");
/* harmony import */ var _modals_device__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/device */ "./src/components/dashboard/modals/device.js");
/* harmony import */ var _modals_country__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modals/country */ "./src/components/dashboard/modals/country.js");
/* harmony import */ var _modals_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modals/page */ "./src/components/dashboard/modals/page.js");
/* harmony import */ var _modals_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modals/query */ "./src/components/dashboard/modals/query.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");

/**
 * WordPress dependencies
 */









function MyModal(props) {
  const {
    onRequestClose,
    modal,
    title
  } = props;
  const {
    query,
    updateQuery
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_8__.SettingsContext);
  const [filter, setFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(query.dimensionFiltersGroup.filters.find(f => f.dimension === modal));
  const [searchType, setSearchType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(query.searchType);
  const handleChange = (expression, operator) => {
    if ('searchType' === modal) {
      setSearchType(expression);
    } else {
      setFilter({
        dimension: modal,
        expression,
        operator
      });
    }
  };
  const saveChange = () => {
    if ('searchType' === modal) {
      updateQuery('searchType', searchType);
    } else {
      const newFilters = [filter, ...query.dimensionFiltersGroup.filters.filter(item => item.dimension !== modal)];
      updateQuery('dimensionFiltersGroup', {
        ...query.dimensionFiltersGroup,
        filters: newFilters
      });
    }
    onRequestClose();
  };
  const modals = {
    searchType: _modals_searchtype__WEBPACK_IMPORTED_MODULE_3__["default"],
    device: _modals_device__WEBPACK_IMPORTED_MODULE_4__["default"],
    country: _modals_country__WEBPACK_IMPORTED_MODULE_5__["default"],
    page: _modals_page__WEBPACK_IMPORTED_MODULE_6__["default"],
    query: _modals_query__WEBPACK_IMPORTED_MODULE_7__["default"]
  };
  const ModalFilter = modals[modal];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: title,
    onRequestClose: onRequestClose
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-modal-container'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ModalFilter, {
    handleChange: handleChange,
    searchType: searchType,
    filter: filter
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isDestructive: true,
    onClick: onRequestClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: saveChange,
    disabled: 'searchType' === modal ? false : !filter?.expression
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save', 'search-console')))));
}

/***/ }),

/***/ "./src/components/dashboard/modals/countries.js":
/*!******************************************************!*\
  !*** ./src/components/dashboard/modals/countries.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  abw: 'Aruba',
  afg: 'Afghanistan',
  ago: 'Angola',
  aia: 'Anguilla',
  ala: 'Åland Islands',
  alb: 'Albania',
  and: 'Andorra',
  are: 'United Arab Emirates (the)',
  arg: 'Argentina',
  arm: 'Armenia',
  asm: 'American Samoa',
  ata: 'Antarctica',
  atf: 'French Southern Territories (the)',
  atg: 'Antigua and Barbuda',
  aus: 'Australia',
  aut: 'Austria',
  aze: 'Azerbaijan',
  bdi: 'Burundi',
  bel: 'Belgium',
  ben: 'Benin',
  bes: 'Bonaire, Sint Eustatius and Saba',
  bfa: 'Burkina Faso',
  bgd: 'Bangladesh',
  bgr: 'Bulgaria',
  bhr: 'Bahrain',
  bhs: 'Bahamas (the)',
  bih: 'Bosnia and Herzegovina',
  blm: 'Saint Barthélemy',
  blr: 'Belarus',
  blz: 'Belize',
  bmu: 'Bermuda',
  bol: 'Bolivia (Plurinational State of)',
  bra: 'Brazil',
  brb: 'Barbados',
  brn: 'Brunei Darussalam',
  btn: 'Bhutan',
  bvt: 'Bouvet Island',
  bwa: 'Botswana',
  caf: 'Central African Republic (the)',
  can: 'Canada',
  cck: 'Cocos (Keeling) Islands (the)',
  che: 'Switzerland',
  chl: 'Chile',
  chn: 'China',
  civ: "Côte d'Ivoire",
  cmr: 'Cameroon',
  cod: 'Congo (the Democratic Republic of the)',
  cog: 'Congo (the)',
  cok: 'Cook Islands (the)',
  col: 'Colombia',
  com: 'Comoros (the)',
  cpv: 'Cabo Verde',
  cri: 'Costa Rica',
  cub: 'Cuba',
  cuw: 'Curaçao',
  cxr: 'Christmas Island',
  cym: 'Cayman Islands (the)',
  cyp: 'Cyprus',
  cze: 'Czechia',
  deu: 'Germany',
  dji: 'Djibouti',
  dma: 'Dominica',
  dnk: 'Denmark',
  dom: 'Dominican Republic (the)',
  dza: 'Algeria',
  ecu: 'Ecuador',
  egy: 'Egypt',
  eri: 'Eritrea',
  esh: 'Western Sahara*',
  esp: 'Spain',
  est: 'Estonia',
  eth: 'Ethiopia',
  fin: 'Finland',
  fji: 'Fiji',
  flk: 'Falkland Islands (the) [Malvinas]',
  fra: 'France',
  fro: 'Faroe Islands (the)',
  fsm: 'Micronesia (Federated States of)',
  gab: 'Gabon',
  gbr: 'United Kingdom of Great Britain and Northern Ireland (the)',
  geo: 'Georgia',
  ggy: 'Guernsey',
  gha: 'Ghana',
  gib: 'Gibraltar',
  gin: 'Guinea',
  glp: 'Guadeloupe',
  gmb: 'Gambia (the)',
  gnb: 'Guinea-Bissau',
  gnq: 'Equatorial Guinea',
  grc: 'Greece',
  grd: 'Grenada',
  grl: 'Greenland',
  gtm: 'Guatemala',
  guf: 'French Guiana',
  gum: 'Guam',
  guy: 'Guyana',
  hkg: 'Hong Kong',
  hmd: 'Heard Island and McDonald Islands',
  hnd: 'Honduras',
  hrv: 'Croatia',
  hti: 'Haiti',
  hun: 'Hungary',
  idn: 'Indonesia',
  imn: 'Isle of Man',
  ind: 'India',
  iot: 'British Indian Ocean Territory (the)',
  irl: 'Ireland',
  irn: 'Iran (Islamic Republic of)',
  irq: 'Iraq',
  isl: 'Iceland',
  isr: 'Israel',
  ita: 'Italy',
  jam: 'Jamaica',
  jey: 'Jersey',
  jor: 'Jordan',
  jpn: 'Japan',
  kaz: 'Kazakhstan',
  ken: 'Kenya',
  kgz: 'Kyrgyzstan',
  khm: 'Cambodia',
  kir: 'Kiribati',
  kna: 'Saint Kitts and Nevis',
  kor: 'Korea (the Republic of)',
  kwt: 'Kuwait',
  lao: "Lao People's Democratic Republic (the)",
  lbn: 'Lebanon',
  lbr: 'Liberia',
  lby: 'Libya',
  lca: 'Saint Lucia',
  lie: 'Liechtenstein',
  lka: 'Sri Lanka',
  lso: 'Lesotho',
  ltu: 'Lithuania',
  lux: 'Luxembourg',
  lva: 'Latvia',
  mac: 'Macao',
  maf: 'Saint Martin (French part)',
  mar: 'Morocco',
  mco: 'Monaco',
  mda: 'Moldova (the Republic of)',
  mdg: 'Madagascar',
  mdv: 'Maldives',
  mex: 'Mexico',
  mhl: 'Marshall Islands (the)',
  mkd: 'Macedonia (the former Yugoslav Republic of)',
  mli: 'Mali',
  mlt: 'Malta',
  mmr: 'Myanmar',
  mne: 'Montenegro',
  mng: 'Mongolia',
  mnp: 'Northern Mariana Islands (the)',
  moz: 'Mozambique',
  mrt: 'Mauritania',
  msr: 'Montserrat',
  mtq: 'Martinique',
  mus: 'Mauritius',
  mwi: 'Malawi',
  mys: 'Malaysia',
  myt: 'Mayotte',
  nam: 'Namibia',
  ncl: 'New Caledonia',
  ner: 'Niger (the)',
  nfk: 'Norfolk Island',
  nga: 'Nigeria',
  nic: 'Nicaragua',
  niu: 'Niue',
  nld: 'Netherlands (the)',
  nor: 'Norway',
  npl: 'Nepal',
  nru: 'Nauru',
  nzl: 'New Zealand',
  omn: 'Oman',
  pak: 'Pakistan',
  pan: 'Panama',
  pcn: 'Pitcairn',
  per: 'Peru',
  phl: 'Philippines (the)',
  plw: 'Palau',
  png: 'Papua New Guinea',
  pol: 'Poland',
  pri: 'Puerto Rico',
  prk: "Korea (the Democratic People's Republic of)",
  prt: 'Portugal',
  pry: 'Paraguay',
  pse: 'Palestine, State of',
  pyf: 'French Polynesia',
  qat: 'Qatar',
  reu: 'Réunion',
  rou: 'Romania',
  rus: 'Russian Federation (the)',
  rwa: 'Rwanda',
  sau: 'Saudi Arabia',
  sdn: 'Sudan (the)',
  sen: 'Senegal',
  sgp: 'Singapore',
  sgs: 'South Georgia and the South Sandwich Islands',
  shn: 'Saint Helena, Ascension and Tristan da Cunha',
  sjm: 'Svalbard and Jan Mayen',
  slb: 'Solomon Islands',
  sle: 'Sierra Leone',
  slv: 'El Salvador',
  smr: 'San Marino',
  som: 'Somalia',
  spm: 'Saint Pierre and Miquelon',
  srb: 'Serbia',
  ssd: 'South Sudan',
  stp: 'Sao Tome and Principe',
  sur: 'Suriname',
  svk: 'Slovakia',
  svn: 'Slovenia',
  swe: 'Sweden',
  swz: 'Swaziland',
  sxm: 'Sint Maarten (Dutch part)',
  syc: 'Seychelles',
  syr: 'Syrian Arab Republic',
  tca: 'Turks and Caicos Islands (the)',
  tcd: 'Chad',
  tgo: 'Togo',
  tha: 'Thailand',
  tjk: 'Tajikistan',
  tkl: 'Tokelau',
  tkm: 'Turkmenistan',
  tls: 'Timor-Leste',
  ton: 'Tonga',
  tto: 'Trinidad and Tobago',
  tun: 'Tunisia',
  tur: 'Turkey',
  tuv: 'Tuvalu',
  twn: 'Taiwan (Province of China)',
  tza: 'Tanzania, United Republic of',
  uga: 'Uganda',
  ukr: 'Ukraine',
  umi: 'United States Minor Outlying Islands (the)',
  ury: 'Uruguay',
  usa: 'United States of America (the)',
  uzb: 'Uzbekistan',
  vat: 'Holy See (the)',
  vct: 'Saint Vincent and the Grenadines',
  ven: 'Venezuela (Bolivarian Republic of)',
  vgb: 'Virgin Islands (British)',
  vir: 'Virgin Islands (U.S.)',
  vnm: 'Viet Nam',
  vut: 'Vanuatu',
  wlf: 'Wallis and Futuna',
  wsm: 'Samoa',
  yem: 'Yemen',
  zaf: 'South Africa',
  zmb: 'Zambia',
  zwe: 'Zimbabwe',
  zzz: 'Others'
});

/***/ }),

/***/ "./src/components/dashboard/modals/country.js":
/*!****************************************************!*\
  !*** ./src/components/dashboard/modals/country.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Country)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _countries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./countries */ "./src/components/dashboard/modals/countries.js");




function Country(props) {
  const {
    filter,
    handleChange
  } = props;
  const options = () => {
    const opts = [];
    for (const k in _countries__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      opts.push({
        value: k,
        label: _countries__WEBPACK_IMPORTED_MODULE_2__["default"][k]
      });
    }
    return opts;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    selected: filter?.expression,
    options: options(),
    onChange: option => {
      handleChange(option);
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/modals/device.js":
/*!***************************************************!*\
  !*** ./src/components/dashboard/modals/device.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Device)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




function Device(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    selected: filter?.expression,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Desktop', 'search-console'),
      value: 'desktop'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mobile', 'search-console'),
      value: 'mobile'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tablet', 'search-console'),
      value: 'tablet'
    }],
    onChange: option => {
      handleChange(option);
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/modals/page.js":
/*!*************************************************!*\
  !*** ./src/components/dashboard/modals/page.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




function Page(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    selected: filter?.operator,
    options: [{
      value: 'CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Urls containing', 'search-console')
    }, {
      value: 'NOT_CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Urls not containing', 'search-console')
    }, {
      value: 'EQUALS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exact url', 'search-console')
    }],
    onChange: option => {
      handleChange(filter?.expression, option);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: filter?.expression,
    placeholder: 'https://www.example.com',
    onChange: option => {
      handleChange(option, filter?.operator ? filter?.operator : 'CONTAINS');
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/modals/query.js":
/*!**************************************************!*\
  !*** ./src/components/dashboard/modals/query.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Query)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




function Query(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    value: filter?.operator,
    options: [{
      value: 'CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Queries containing', 'search-console')
    }, {
      value: 'NOT_CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Queries not containing', 'search-console')
    }, {
      value: 'EQUALS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exact query', 'search-console')
    }],
    onChange: option => {
      handleChange(filter?.expression, option);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: filter?.expression || '',
    onChange: option => {
      handleChange(option, filter?.operator ? filter?.operator : 'CONTAINS');
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/modals/searchtype.js":
/*!*******************************************************!*\
  !*** ./src/components/dashboard/modals/searchtype.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchType)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





function SearchType(props) {
  const {
    handleChange
  } = props;
  const {
    query
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_2__.SettingsContext);
  const [type, setType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(query.searchType);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search Type', 'search-console'),
    selected: type,
    options: [{
      label: 'Web',
      value: 'web'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Image'),
      value: 'image'
    }, {
      label: 'Video',
      value: 'video'
    }, {
      label: 'News',
      value: 'news'
    }],
    onChange: option => {
      setType(option);
      handleChange(option);
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/table.js":
/*!*******************************************!*\
  !*** ./src/components/dashboard/table.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyTable": () => (/* binding */ MyTable)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/index.js");
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_table__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modals_countries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals/countries */ "./src/components/dashboard/modals/countries.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _table_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table/pagination */ "./src/components/dashboard/table/pagination.js");
/* harmony import */ var _table_table_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./table/table-bar */ "./src/components/dashboard/table/table-bar.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var gapi_script__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! gapi-script */ "./node_modules/gapi-script/index.js");


/**
 * WordPress dependencies
 */









function MyTable() {
  const {
    settings,
    query,
    refreshToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_8__.SettingsContext);
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    getData();
  }, [query, settings.token]);
  const getData = () => {
    setIsLoading(true);
    window.gapi.client.setToken(settings.token);
    window.gapi?.client?.webmasters.searchanalytics.query({
      siteUrl: settings.site,
      fields: 'rows',
      rowLimit: null,
      searchType: query.searchType,
      startDate: query.startDate,
      endDate: query.endDate,
      dimensions: [query.dimension],
      dimensionFilterGroups: query.dimensionFiltersGroup
    }).then(response => {
      setIsLoading(false);
      if (!response.result.rows) {
        setData([]);
        return;
      }
      if (query.dimension === 'country') {
        response.result.rows.map(row => {
          row.keys[0] = _modals_countries__WEBPACK_IMPORTED_MODULE_4__["default"][row.keys[0]];
        });
      }
      setData(response.result.rows);
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      refreshToken();
    });
  };
  const columns = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => [{
    Header: '',
    accessor: 'keys' // accessor is the "key" in the data
  }, {
    Header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clicks', 'search-console'),
    accessor: 'clicks' // accessor is the "key" in the data
  }, {
    Header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Impressions', 'search-console'),
    accessor: 'impressions'
  }, {
    Header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('CTR', 'search-console'),
    accessor: 'ctr',
    Cell: _ref => {
      let {
        value
      } = _ref;
      return (value * 100).toFixed(1) + ' %';
    }
  }, {
    Header: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Position', 'search-console'),
    accessor: 'position',
    Cell: _ref2 => {
      let {
        value
      } = _ref2;
      return value.toFixed(1);
    }
  }], []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: {
      pageIndex,
      pageSize,
      globalFilter
    }
  } = (0,react_table__WEBPACK_IMPORTED_MODULE_3__.useTable)({
    columns,
    data,
    initialState: {
      pageIndex: 0
    }
  }, react_table__WEBPACK_IMPORTED_MODULE_3__.useGlobalFilter, react_table__WEBPACK_IMPORTED_MODULE_3__.useSortBy, react_table__WEBPACK_IMPORTED_MODULE_3__.usePagination);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "search-console-table-wrapper"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_table_table_bar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    globalFilter: globalFilter,
    setGlobalFilter: setGlobalFilter
  }), isLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Spinner, null) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("table", getTableProps(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("thead", null, headerGroups.map((headerGroup, i) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("tr", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, headerGroup.getHeaderGroupProps(), {
    key: i
  }), headerGroup.headers.map((column, idx) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("th", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, column.getHeaderProps(column.getSortByToggleProps()), {
    key: idx
  }), column.render('Header'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, column.isSorted ? column.isSortedDesc ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    icon: "arrow-down"
  }) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Icon, {
    icon: "arrow-up"
  }) : '')))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("tbody", getTableBodyProps(), page.map((row, idx) => {
    prepareRow(row);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("tr", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, row.getRowProps(), {
      key: idx
    }), row.cells.map((cell, i) => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("td", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, cell.getCellProps(), {
        key: i
      }), cell.render('Cell'));
    }));
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_table_pagination__WEBPACK_IMPORTED_MODULE_6__["default"], {
    pageIndex: pageIndex,
    pageOptions: pageOptions,
    pageSize: pageSize,
    setPageSize: setPageSize,
    pageCount: pageCount,
    canPreviousPage: canPreviousPage,
    canNextPage: canNextPage,
    gotoPage: gotoPage,
    nextPage: nextPage,
    previousPage: previousPage
  }));
}

/***/ }),

/***/ "./src/components/dashboard/table/dimensions.js":
/*!******************************************************!*\
  !*** ./src/components/dashboard/table/dimensions.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dimensions)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");





function Dimensions() {
  const {
    updateQuery,
    query
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_3__.SettingsContext);
  const onSelect = dimension => {
    updateQuery('dimension', dimension);
    setSelected(dimension);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-dimensions"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'query' === query.dimension ? 'is-selected' : '',
    onClick: () => onSelect('query')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Query', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'page' === query.dimension ? 'is-selected' : '',
    onClick: () => onSelect('page')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pages', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'country' === query.dimension ? 'is-selected' : '',
    onClick: () => onSelect('country')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Countries', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'device' === query.dimension ? 'is-selected' : '',
    onClick: () => onSelect('device')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Devices', 'search-console')));
}

/***/ }),

/***/ "./src/components/dashboard/table/pagination.js":
/*!******************************************************!*\
  !*** ./src/components/dashboard/table/pagination.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



const Pagination = props => {
  const {
    pageSize,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageIndex,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-pagination"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    value: pageSize,
    onChange: e => {
      setPageSize(Number(e.target.value));
    }
  }, [10, 20, 30, 40, 50].map(size => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: size,
    value: size
  }, "Show ", size)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => gotoPage(0),
    icon: "controls-back",
    disabled: !canPreviousPage
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => previousPage(),
    icon: "arrow-left",
    disabled: !canPreviousPage
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => nextPage(),
    icon: "arrow-right",
    disabled: !canNextPage
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => gotoPage(pageCount - 1),
    icon: "controls-forward",
    disabled: !canNextPage
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page ', 'search-console'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, pageIndex + 1, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('of', 'search-console'), ' ', pageOptions.length)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go to page: ', 'searchconsole'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    defaultValue: pageIndex + 1,
    onChange: e => {
      const page = e.target.value ? Number(e.target.value) - 1 : 0;
      gotoPage(page);
    },
    min: "1",
    style: {
      width: '50px'
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./src/components/dashboard/table/table-bar.js":
/*!*****************************************************!*\
  !*** ./src/components/dashboard/table/table-bar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dimensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dimensions */ "./src/components/dashboard/table/dimensions.js");




const TableBar = props => {
  const {
    globalFilter,
    setGlobalFilter
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-table-bar"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dimensions__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
    value: globalFilter || '',
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('search', 'search-console'),
    onChange: val => setGlobalFilter(val)
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableBar);

/***/ }),

/***/ "./src/components/loading-spinner.js":
/*!*******************************************!*\
  !*** ./src/components/loading-spinner.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/components/settings/credentials.js":
/*!************************************************!*\
  !*** ./src/components/settings/credentials.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");





const Credentials = () => {
  var _settings$credentials, _settings$credentials2;
  const {
    settings,
    updateSetting
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_3__.SettingsContext);
  function setCredentials(key, val) {
    const credentials = Object.assign({}, settings.credentials);
    credentials[key] = val;
    updateSetting('credentials', credentials);
  }
  const authUrl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)('https://developers.google.com/web/site-kit?sitename=%1$s&siteurl=%2$s', settings.title, settings.wp_url);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Credentials', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: Developer console url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<p>You need to create a <a target="_blank" href="%s">Google Developer Console</a> account before proceeding to authorization.</p>' + '<p>Create a project from Google Developers Console if none exists.</p>' + '<p>Go to Credentials tab, then create credential for OAuth client.</p>' + 'Application type will be Web Application. Add <code>%s</code> in Authorized redirect URIs. This will give you Client ID and Client Secret key.<p>', 'formello'), `https://console.developers.google.com/`, settings.wp_url)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.RawHTML, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: Google Site Kit url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<p><b>Tip</b>: the simplest way to get your own credentials is to go to <a target="_blank" href="%s">Google Site Kit</a> site and follow step. Don\'t forget to add your site url as authorized Javascript origin.</p>', 'formello'), authUrl)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    placeholder: 'CLIENT ID',
    value: (_settings$credentials = settings?.credentials?.client_id) !== null && _settings$credentials !== void 0 ? _settings$credentials : '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Client ID', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please go to Developer Console to obtain your credentials.', 'search-console'),
    onChange: val => {
      setCredentials('client_id', val);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    placeholder: 'CLIENT SECRET',
    value: (_settings$credentials2 = settings?.credentials?.client_secret) !== null && _settings$credentials2 !== void 0 ? _settings$credentials2 : '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Client secret', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please go to Developer Console to obtain your credentials.', 'search-console'),
    onChange: val => {
      setCredentials('client_secret', val);
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Credentials);

/***/ }),

/***/ "./src/components/settings/google-oauth.js":
/*!*************************************************!*\
  !*** ./src/components/settings/google-oauth.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _oauth_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oauth-button */ "./src/components/settings/oauth-button.js");
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-oauth/google */ "./node_modules/@react-oauth/google/dist/index.esm.js");







const GoogleOAuth = props => {
  const {
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_3__.SettingsContext);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Oauth', 'formello')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (!settings?.credentials?.client_id?.length || !settings?.credentials?.client_secret?.length) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You must insert a Client Id and a Client secret to correctly request your authentication token.')), settings?.credentials?.client_id && settings?.credentials?.client_secret && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_react_oauth_google__WEBPACK_IMPORTED_MODULE_5__.GoogleOAuthProvider, {
    clientId: settings?.credentials?.client_id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_oauth_button__WEBPACK_IMPORTED_MODULE_4__["default"], props))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleOAuth);

/***/ }),

/***/ "./src/components/settings/oauth-button.js":
/*!*************************************************!*\
  !*** ./src/components/settings/oauth-button.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-oauth/google */ "./node_modules/@react-oauth/google/dist/index.esm.js");







const GoogleOauthButton = () => {
  const {
    updateSetting,
    email,
    settings,
    revokeToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const [message, setMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const googleLogin = (0,_react_oauth_google__WEBPACK_IMPORTED_MODULE_5__.useGoogleLogin)({
    flow: 'auth-code',
    onSuccess: async _ref => {
      let {
        code
      } = _ref;
      getToken(code);
    },
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification email'
  });
  const getToken = code => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/searchconsole/v1/credentials',
      method: 'POST',
      data: {
        code
      }
    }).then(result => {
      updateSetting('token', result);
      setMessage({
        status: 'success',
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You're logged in", 'search-console')
      });
    }).catch(error => {
      setMessage({
        status: 'error',
        text: error.message
      });
    }).finally(() => console.log('Success'));
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: () => googleLogin(),
    icon: 'google'
  }, email || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Login with Google', 'search-console')), email && settings.token && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Revoke token', 'search-console'),
    onClick: () => revokeToken(),
    isDestructive: true,
    isSmall: true
  })), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: message.status,
    isDismissible: false
  }, message.text));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleOauthButton);

/***/ }),

/***/ "./src/components/settings/post-type-selection.js":
/*!********************************************************!*\
  !*** ./src/components/settings/post-type-selection.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostTypeSelection)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");







function PostTypeSelection() {
  const {
    settings,
    updateSetting
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);

  // useSelect to retrieve all post types
  const postTypes = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store).getPostTypes({
    per_page: -1
  }), []);
  const addPostType = val => {
    updateSetting('postTypes', [...settings.postTypes, val]);
  };
  const removePostType = val => {
    const filteredArray = settings.postTypes.filter(item => item !== val);
    updateSetting('postTypes', filteredArray);
  };

  // Options expects [{label: ..., value: ...}]
  const postTypeOptions = !Array.isArray(postTypes) ? postTypes : postTypes.filter(
  // Filter out internal WP post types eg: wp_block, wp_navigation, wp_template, wp_template_part..
  postType => postType.viewable === true).map(
  // Format the options for display in the <SelectControl/>
  postType => ({
    label: postType.labels.singular_name,
    value: postType.slug // the value saved as postType in attributes
  }));

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose on which post type you want see Search Console data.', 'search-console')), postTypeOptions && postTypeOptions.map((postType, i) => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      key: i,
      label: postType.label,
      checked: settings.postTypes.includes(postType.value),
      onChange: val => {
        if (val) {
          addPostType(postType.value);
        } else {
          removePostType(postType.value);
        }
      }
    });
  }));
}

/***/ }),

/***/ "./src/components/settings/save-button.js":
/*!************************************************!*\
  !*** ./src/components/settings/save-button.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveButton)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/cloud.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */






/**
 * Renders the update settings buttons and animation
 *
 * @since 2.1.0
 * @param {Object} props All the props passed to this function
 * @return {string}		 Return the rendered JSX
 */
function SaveButton(props) {
  const [status, setStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('saved');
  const {
    loading,
    saveSettings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "flex-start"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: 'save-settings__save-button',
    onClick: () => saveSettings(),
    disabled: loading,
    isBusy: loading,
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'search-console')), [loading && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Animate, {
    type: "loading",
    key: "saving"
  }, _ref => {
    let {
      className: animateClassName
    } = _ref;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      justify: "flex-start",
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('message', animateClassName),
      gap: 1
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
    }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving', 'block-visibility'));
  }), status === 'error' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "message update-failed",
    key: "error"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update failed. Try again or get in touch with support.', 'search-console'))]));
}

/***/ }),

/***/ "./src/components/settings/site-select.js":
/*!************************************************!*\
  !*** ./src/components/settings/site-select.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _verification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./verification */ "./src/components/settings/verification.js");
/* harmony import */ var _post_type_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./post-type-selection */ "./src/components/settings/post-type-selection.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var gapi_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gapi-script */ "./node_modules/gapi-script/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_7__);









const SiteSelect = props => {
  const {
    settings,
    updateSetting,
    saveToken,
    refreshToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  const [sites, setSites] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (settings.token) getSites();
  }, [settings.token]);
  const getSites = () => {
    const options = [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select a site', 'search-console')
    }];
    window.gapi.client.setToken(settings.token);
    gapi_script__WEBPACK_IMPORTED_MODULE_6__.gapi.client?.webmasters.sites.list().then(s => {
      s.result.siteEntry.map(t => {
        options.push({
          value: t.siteUrl,
          label: t.siteUrl
        });
      });
      options.sort(function (a, b) {
        if (a.value < b.value) {
          return -1;
        }
        return 0;
      });
      setSites(options.sort());
    }).catch(error => {
      if (401 === error.status) {
        refreshToken();
      }
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Options', 'formello')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    options: sites,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose site', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose one of your sites.', 'search-console'),
    value: settings.site,
    onChange: val => {
      updateSetting('site', val);
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_post_type_selection__WEBPACK_IMPORTED_MODULE_4__["default"], props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_verification__WEBPACK_IMPORTED_MODULE_3__["default"], props)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiteSelect);

/***/ }),

/***/ "./src/components/settings/verification.js":
/*!*************************************************!*\
  !*** ./src/components/settings/verification.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");





const Verification = () => {
  const {
    settings,
    updateSetting,
    refreshToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_3__.SettingsContext);
  const getMeta = () => {
    if (settings.siteVerification && settings.site) {
      window.gapi.client.load('siteVerification', 'v1').then(() => {
        window.gapi.client.siteVerification.webResource.getToken({
          verificationMethod: 'META',
          site: {
            identifier: settings.site.replace('sc-domain:', ''),
            type: 'SITE'
          }
        }).then(r => {
          updateSetting('meta', r.result.token);
        }).catch(error => {
          if (401 === error.status) {
            refreshToken();
          }
        });
      });
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-Advanced"
  }, settings.site && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Do you want to add meta tag verification on your site?', 'search-console')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add verification to site?', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Check this if you want output meta verification on frontend.', 'search-console'),
    checked: settings.siteVerification,
    onChange: val => {
      updateSetting('siteVerification', val);
    }
  })), settings.siteVerification && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please click on icon to generate your meta verification tag.', 'search-console'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your meta verification tag', 'search-console'),
    value: settings.meta,
    onChange: val => {
      updateSetting('meta', val);
    },
    suffix: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      onClick: getMeta,
      icon: 'update'
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Verification);

/***/ }),

/***/ "./src/context/settings-context.js":
/*!*****************************************!*\
  !*** ./src/context/settings-context.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_menuFix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/menuFix */ "./src/utils/menuFix.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ "./src/store/index.js");
/* harmony import */ var _routes_dashboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes/dashboard */ "./src/routes/dashboard.js");
/* harmony import */ var _routes_settings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./routes/settings */ "./src/routes/settings.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Header */ "./src/components/Header.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Footer */ "./src/components/Footer.js");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./context/settings-context */ "./src/context/settings-context.js");













const App = () => {
  const initialPath = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_10__.getQueryArg)(window.location.href, 'page');
  const navigator = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseNavigator)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorProvider, {
    initialPath: '/' + initialPath
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Header__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: 'Search Console'
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_settings_context__WEBPACK_IMPORTED_MODULE_11__["default"], null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorScreen, {
    path: "/search-console"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_routes_dashboard__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNavigatorScreen, {
    path: "/search-console-settings"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_routes_settings__WEBPACK_IMPORTED_MODULE_7__["default"], null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Footer__WEBPACK_IMPORTED_MODULE_9__["default"], null));
};
window.addEventListener('DOMContentLoaded', () => {
  const domNode = document.getElementById('search-console-wrapper');
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(domNode);
  root.render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));
});

// fix the admin menu for the slug "search-console"
(0,_utils_menuFix__WEBPACK_IMPORTED_MODULE_3__["default"])('search-console');

/***/ }),

/***/ "./src/routes/dashboard.js":
/*!*********************************!*\
  !*** ./src/routes/dashboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");
/* harmony import */ var _components_dashboard_chart_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/dashboard/chart/index.js */ "./src/components/dashboard/chart/index.js");
/* harmony import */ var _components_dashboard_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/dashboard/table */ "./src/components/dashboard/table.js");
/* harmony import */ var _components_dashboard_filters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/dashboard/filters */ "./src/components/dashboard/filters.js");
/* harmony import */ var _components_ads_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ads/index */ "./src/components/ads/index.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");










const Dashboard = () => {
  const navigator = (0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalUseNavigator)();
  const {
    settings,
    ready
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_8__.SettingsContext);
  if (!ready) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching data…', 'search-console')
    });
  }
  const noticeString = text => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)(text, {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('settings page', 'search-console'),
      onClick: () => navigator.goTo('/search-console-settings'),
      variant: "link"
    })
  });
  if (!settings.token || !settings.token?.refresh_token) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please provide an API key on <a />.', 'tropical-juice'))));
  }
  if (!settings.credentials?.client_secret || !settings.credentials?.client_id) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please provide an API key on <a />.', 'tropical-juice'))));
  }
  if (!settings.site) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please select a site on <a />.', 'tropical-juice'))));
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-dashboard'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_chart_index_js__WEBPACK_IMPORTED_MODULE_4__.MyChart, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ads_index__WEBPACK_IMPORTED_MODULE_7__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_filters__WEBPACK_IMPORTED_MODULE_6__.Filters, null))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_table__WEBPACK_IMPORTED_MODULE_5__.MyTable, null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);

/***/ }),

/***/ "./src/routes/settings.js":
/*!********************************!*\
  !*** ./src/routes/settings.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_settings_google_oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/settings/google-oauth */ "./src/components/settings/google-oauth.js");
/* harmony import */ var _components_settings_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/settings/credentials */ "./src/components/settings/credentials.js");
/* harmony import */ var _components_settings_site_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/settings/site-select */ "./src/components/settings/site-select.js");
/* harmony import */ var _components_settings_save_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/settings/save-button */ "./src/components/settings/save-button.js");
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");









const Settings = () => {
  const {
    ready
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_7__.SettingsContext);
  if (!ready) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching data…', 'search-console')
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-settings'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_google_oauth__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_site_select__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_credentials__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_save_button__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Settings);

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/utils/menuFix.js":
/*!******************************!*\
  !*** ./src/utils/menuFix.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * As we are using hash based navigation, hack fix
 * to highlight the current selected menu
 *
 * Requires jQuery
 *
 * @param  slug
 */
function menuFix(slug) {
  const $ = jQuery;
  const menuRoot = $('#toplevel_page_' + slug);
  const currentUrl = window.location.href;
  const currentPath = currentUrl.substr(currentUrl.indexOf('admin.php'));
  menuRoot.on('click', 'a', function (e) {
    e.preventDefault();
    const self = $(this);
    window.dispatchEvent(new CustomEvent('changePage', {
      detail: e.target.href
    }));
    $('ul.wp-submenu li', menuRoot).removeClass('current');
    if (self.hasClass('wp-has-submenu')) {
      $('li.wp-first-item', menuRoot).addClass('current');
    } else {
      self.parents('li').addClass('current');
    }
  });
  $('ul.wp-submenu a', menuRoot).each(function (index, el) {
    if ($(el).attr('href') === currentPath) {
      $(el).parent().addClass('current');
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuFix);
(() => {
  const oldPushState = history.pushState;
  history.pushState = function pushState() {
    const ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };
  const oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    const ret = oldReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };
  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
})();

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/gapi-script/gapiScript.js":
/*!************************************************!*\
  !*** ./node_modules/gapi-script/gapiScript.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-table/dist/react-table.development.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-table/dist/react-table.development.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports, __webpack_require__(/*! react */ "react")) :
  0;
}(this, (function (exports, React) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _extends() {
    _extends = Object.assign || function (target) {
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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  var renderErr = 'Renderer Error ☝️';
  var actions = {
    init: 'init'
  };
  var defaultRenderer = function defaultRenderer(_ref) {
    var _ref$value = _ref.value,
        value = _ref$value === void 0 ? '' : _ref$value;
    return value;
  };
  var emptyRenderer = function emptyRenderer() {
    return React.createElement(React.Fragment, null, "\xA0");
  };
  var defaultColumn = {
    Cell: defaultRenderer,
    width: 150,
    minWidth: 0,
    maxWidth: Number.MAX_SAFE_INTEGER
  };

  function mergeProps() {
    for (var _len = arguments.length, propList = new Array(_len), _key = 0; _key < _len; _key++) {
      propList[_key] = arguments[_key];
    }

    return propList.reduce(function (props, next) {
      var style = next.style,
          className = next.className,
          rest = _objectWithoutPropertiesLoose(next, ["style", "className"]);

      props = _extends({}, props, {}, rest);

      if (style) {
        props.style = props.style ? _extends({}, props.style || {}, {}, style || {}) : style;
      }

      if (className) {
        props.className = props.className ? props.className + ' ' + className : className;
      }

      if (props.className === '') {
        delete props.className;
      }

      return props;
    }, {});
  }

  function handlePropGetter(prevProps, userProps, meta) {
    // Handle a lambda, pass it the previous props
    if (typeof userProps === 'function') {
      return handlePropGetter({}, userProps(prevProps, meta));
    } // Handle an array, merge each item as separate props


    if (Array.isArray(userProps)) {
      return mergeProps.apply(void 0, [prevProps].concat(userProps));
    } // Handle an object by default, merge the two objects


    return mergeProps(prevProps, userProps);
  }

  var makePropGetter = function makePropGetter(hooks, meta) {
    if (meta === void 0) {
      meta = {};
    }

    return function (userProps) {
      if (userProps === void 0) {
        userProps = {};
      }

      return [].concat(hooks, [userProps]).reduce(function (prev, next) {
        return handlePropGetter(prev, next, _extends({}, meta, {
          userProps: userProps
        }));
      }, {});
    };
  };
  var reduceHooks = function reduceHooks(hooks, initial, meta, allowUndefined) {
    if (meta === void 0) {
      meta = {};
    }

    return hooks.reduce(function (prev, next) {
      var nextValue = next(prev, meta);

      {
        if (!allowUndefined && typeof nextValue === 'undefined') {
          console.info(next);
          throw new Error('React Table: A reducer hook ☝️ just returned undefined! This is not allowed.');
        }
      }

      return nextValue;
    }, initial);
  };
  var loopHooks = function loopHooks(hooks, context, meta) {
    if (meta === void 0) {
      meta = {};
    }

    return hooks.forEach(function (hook) {
      var nextValue = hook(context, meta);

      {
        if (typeof nextValue !== 'undefined') {
          console.info(hook, nextValue);
          throw new Error('React Table: A loop-type hook ☝️ just returned a value! This is not allowed.');
        }
      }
    });
  };
  function ensurePluginOrder(plugins, befores, pluginName, afters) {
    if ( afters) {
      throw new Error("Defining plugins in the \"after\" section of ensurePluginOrder is no longer supported (see plugin " + pluginName + ")");
    }

    var pluginIndex = plugins.findIndex(function (plugin) {
      return plugin.pluginName === pluginName;
    });

    if (pluginIndex === -1) {
      {
        throw new Error("The plugin \"" + pluginName + "\" was not found in the plugin list!\nThis usually means you need to need to name your plugin hook by setting the 'pluginName' property of the hook function, eg:\n\n  " + pluginName + ".pluginName = '" + pluginName + "'\n");
      }
    }

    befores.forEach(function (before) {
      var beforeIndex = plugins.findIndex(function (plugin) {
        return plugin.pluginName === before;
      });

      if (beforeIndex > -1 && beforeIndex > pluginIndex) {
        {
          throw new Error("React Table: The " + pluginName + " plugin hook must be placed after the " + before + " plugin hook!");
        }
      }
    });
  }
  function functionalUpdate(updater, old) {
    return typeof updater === 'function' ? updater(old) : updater;
  }
  function useGetLatest(obj) {
    var ref = React.useRef();
    ref.current = obj;
    return React.useCallback(function () {
      return ref.current;
    }, []);
  } // SSR has issues with useLayoutEffect still, so use useEffect during SSR

  var safeUseLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;
  function useMountedLayoutEffect(fn, deps) {
    var mountedRef = React.useRef(false);
    safeUseLayoutEffect(function () {
      if (mountedRef.current) {
        fn();
      }

      mountedRef.current = true; // eslint-disable-next-line
    }, deps);
  }
  function useAsyncDebounce(defaultFn, defaultWait) {
    if (defaultWait === void 0) {
      defaultWait = 0;
    }

    var debounceRef = React.useRef({});
    var getDefaultFn = useGetLatest(defaultFn);
    var getDefaultWait = useGetLatest(defaultWait);
    return React.useCallback(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _len2,
            args,
            _key2,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = _args2[_key2];
                }

                if (!debounceRef.current.promise) {
                  debounceRef.current.promise = new Promise(function (resolve, reject) {
                    debounceRef.current.resolve = resolve;
                    debounceRef.current.reject = reject;
                  });
                }

                if (debounceRef.current.timeout) {
                  clearTimeout(debounceRef.current.timeout);
                }

                debounceRef.current.timeout = setTimeout(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          delete debounceRef.current.timeout;
                          _context.prev = 1;
                          _context.t0 = debounceRef.current;
                          _context.next = 5;
                          return getDefaultFn().apply(void 0, args);

                        case 5:
                          _context.t1 = _context.sent;

                          _context.t0.resolve.call(_context.t0, _context.t1);

                          _context.next = 12;
                          break;

                        case 9:
                          _context.prev = 9;
                          _context.t2 = _context["catch"](1);
                          debounceRef.current.reject(_context.t2);

                        case 12:
                          _context.prev = 12;
                          delete debounceRef.current.promise;
                          return _context.finish(12);

                        case 15:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[1, 9, 12, 15]]);
                })), getDefaultWait());
                return _context2.abrupt("return", debounceRef.current.promise);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function () {
        return _ref2.apply(this, arguments);
      };
    }(), [getDefaultFn, getDefaultWait]);
  }
  function makeRenderer(instance, column, meta) {
    if (meta === void 0) {
      meta = {};
    }

    return function (type, userProps) {
      if (userProps === void 0) {
        userProps = {};
      }

      var Comp = typeof type === 'string' ? column[type] : type;

      if (typeof Comp === 'undefined') {
        console.info(column);
        throw new Error(renderErr);
      }

      return flexRender(Comp, _extends({}, instance, {
        column: column
      }, meta, {}, userProps));
    };
  }
  function flexRender(Comp, props) {
    return isReactComponent(Comp) ? React.createElement(Comp, props) : Comp;
  }

  function isReactComponent(component) {
    return isClassComponent(component) || typeof component === 'function' || isExoticComponent(component);
  }

  function isClassComponent(component) {
    return typeof component === 'function' && function () {
      var proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    }();
  }

  function isExoticComponent(component) {
    return typeof component === 'object' && typeof component.$$typeof === 'symbol' && ['react.memo', 'react.forward_ref'].includes(component.$$typeof.description);
  }

  function linkColumnStructure(columns, parent, depth) {
    if (depth === void 0) {
      depth = 0;
    }

    return columns.map(function (column) {
      column = _extends({}, column, {
        parent: parent,
        depth: depth
      });
      assignColumnAccessor(column);

      if (column.columns) {
        column.columns = linkColumnStructure(column.columns, column, depth + 1);
      }

      return column;
    });
  }
  function flattenColumns(columns) {
    return flattenBy(columns, 'columns');
  }
  function assignColumnAccessor(column) {
    // First check for string accessor
    var id = column.id,
        accessor = column.accessor,
        Header = column.Header;

    if (typeof accessor === 'string') {
      id = id || accessor;
      var accessorPath = accessor.split('.');

      accessor = function accessor(row) {
        return getBy(row, accessorPath);
      };
    }

    if (!id && typeof Header === 'string' && Header) {
      id = Header;
    }

    if (!id && column.columns) {
      console.error(column);
      throw new Error('A column ID (or unique "Header" value) is required!');
    }

    if (!id) {
      console.error(column);
      throw new Error('A column ID (or string accessor) is required!');
    }

    Object.assign(column, {
      id: id,
      accessor: accessor
    });
    return column;
  }
  function decorateColumn(column, userDefaultColumn) {
    if (!userDefaultColumn) {
      throw new Error();
    }

    Object.assign(column, _extends({
      // Make sure there is a fallback header, just in case
      Header: emptyRenderer,
      Footer: emptyRenderer
    }, defaultColumn, {}, userDefaultColumn, {}, column));
    Object.assign(column, {
      originalWidth: column.width
    });
    return column;
  } // Build the header groups from the bottom up

  function makeHeaderGroups(allColumns, defaultColumn, additionalHeaderProperties) {
    if (additionalHeaderProperties === void 0) {
      additionalHeaderProperties = function additionalHeaderProperties() {
        return {};
      };
    }

    var headerGroups = [];
    var scanColumns = allColumns;
    var uid = 0;

    var getUID = function getUID() {
      return uid++;
    };

    var _loop = function _loop() {
      // The header group we are creating
      var headerGroup = {
        headers: []
      }; // The parent columns we're going to scan next

      var parentColumns = [];
      var hasParents = scanColumns.some(function (d) {
        return d.parent;
      }); // Scan each column for parents

      scanColumns.forEach(function (column) {
        // What is the latest (last) parent column?
        var latestParentColumn = [].concat(parentColumns).reverse()[0];
        var newParent;

        if (hasParents) {
          // If the column has a parent, add it if necessary
          if (column.parent) {
            newParent = _extends({}, column.parent, {
              originalId: column.parent.id,
              id: column.parent.id + "_" + getUID(),
              headers: [column]
            }, additionalHeaderProperties(column));
          } else {
            // If other columns have parents, we'll need to add a place holder if necessary
            var originalId = column.id + "_placeholder";
            newParent = decorateColumn(_extends({
              originalId: originalId,
              id: column.id + "_placeholder_" + getUID(),
              placeholderOf: column,
              headers: [column]
            }, additionalHeaderProperties(column)), defaultColumn);
          } // If the resulting parent columns are the same, just add
          // the column and increment the header span


          if (latestParentColumn && latestParentColumn.originalId === newParent.originalId) {
            latestParentColumn.headers.push(column);
          } else {
            parentColumns.push(newParent);
          }
        }

        headerGroup.headers.push(column);
      });
      headerGroups.push(headerGroup); // Start scanning the parent columns

      scanColumns = parentColumns;
    };

    while (scanColumns.length) {
      _loop();
    }

    return headerGroups.reverse();
  }
  var pathObjCache = new Map();
  function getBy(obj, path, def) {
    if (!path) {
      return obj;
    }

    var cacheKey = typeof path === 'function' ? path : JSON.stringify(path);

    var pathObj = pathObjCache.get(cacheKey) || function () {
      var pathObj = makePathArray(path);
      pathObjCache.set(cacheKey, pathObj);
      return pathObj;
    }();

    var val;

    try {
      val = pathObj.reduce(function (cursor, pathPart) {
        return cursor[pathPart];
      }, obj);
    } catch (e) {// continue regardless of error
    }

    return typeof val !== 'undefined' ? val : def;
  }
  function getFirstDefined() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    for (var i = 0; i < args.length; i += 1) {
      if (typeof args[i] !== 'undefined') {
        return args[i];
      }
    }
  }
  function isFunction(a) {
    if (typeof a === 'function') {
      return a;
    }
  }
  function flattenBy(arr, key) {
    var flat = [];

    var recurse = function recurse(arr) {
      arr.forEach(function (d) {
        if (!d[key]) {
          flat.push(d);
        } else {
          recurse(d[key]);
        }
      });
    };

    recurse(arr);
    return flat;
  }
  function expandRows(rows, _ref) {
    var manualExpandedKey = _ref.manualExpandedKey,
        expanded = _ref.expanded,
        _ref$expandSubRows = _ref.expandSubRows,
        expandSubRows = _ref$expandSubRows === void 0 ? true : _ref$expandSubRows;
    var expandedRows = [];

    var handleRow = function handleRow(row, addToExpandedRows) {
      if (addToExpandedRows === void 0) {
        addToExpandedRows = true;
      }

      row.isExpanded = row.original && row.original[manualExpandedKey] || expanded[row.id];
      row.canExpand = row.subRows && !!row.subRows.length;

      if (addToExpandedRows) {
        expandedRows.push(row);
      }

      if (row.subRows && row.subRows.length && row.isExpanded) {
        row.subRows.forEach(function (row) {
          return handleRow(row, expandSubRows);
        });
      }
    };

    rows.forEach(function (row) {
      return handleRow(row);
    });
    return expandedRows;
  }
  function getFilterMethod(filter, userFilterTypes, filterTypes) {
    return isFunction(filter) || userFilterTypes[filter] || filterTypes[filter] || filterTypes.text;
  }
  function shouldAutoRemoveFilter(autoRemove, value, column) {
    return autoRemove ? autoRemove(value, column) : typeof value === 'undefined';
  }
  function unpreparedAccessWarning() {
    throw new Error('React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.');
  }
  var passiveSupported = null;
  function passiveEventSupported() {
    // memoize support to avoid adding multiple test events
    if (typeof passiveSupported === 'boolean') return passiveSupported;
    var supported = false;

    try {
      var options = {
        get passive() {
          supported = true;
          return false;
        }

      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (err) {
      supported = false;
    }

    passiveSupported = supported;
    return passiveSupported;
  } //

  var reOpenBracket = /\[/g;
  var reCloseBracket = /\]/g;

  function makePathArray(obj) {
    return flattenDeep(obj) // remove all periods in parts
    .map(function (d) {
      return String(d).replace('.', '_');
    }) // join parts using period
    .join('.') // replace brackets with periods
    .replace(reOpenBracket, '.').replace(reCloseBracket, '') // split it back out on periods
    .split('.');
  }

  function flattenDeep(arr, newArr) {
    if (newArr === void 0) {
      newArr = [];
    }

    if (!Array.isArray(arr)) {
      newArr.push(arr);
    } else {
      for (var i = 0; i < arr.length; i += 1) {
        flattenDeep(arr[i], newArr);
      }
    }

    return newArr;
  }

  var defaultGetTableProps = function defaultGetTableProps(props) {
    return _extends({
      role: 'table'
    }, props);
  };

  var defaultGetTableBodyProps = function defaultGetTableBodyProps(props) {
    return _extends({
      role: 'rowgroup'
    }, props);
  };

  var defaultGetHeaderProps = function defaultGetHeaderProps(props, _ref) {
    var column = _ref.column;
    return _extends({
      key: "header_" + column.id,
      colSpan: column.totalVisibleHeaderCount,
      role: 'columnheader'
    }, props);
  };

  var defaultGetFooterProps = function defaultGetFooterProps(props, _ref2) {
    var column = _ref2.column;
    return _extends({
      key: "footer_" + column.id,
      colSpan: column.totalVisibleHeaderCount
    }, props);
  };

  var defaultGetHeaderGroupProps = function defaultGetHeaderGroupProps(props, _ref3) {
    var index = _ref3.index;
    return _extends({
      key: "headerGroup_" + index,
      role: 'row'
    }, props);
  };

  var defaultGetFooterGroupProps = function defaultGetFooterGroupProps(props, _ref4) {
    var index = _ref4.index;
    return _extends({
      key: "footerGroup_" + index
    }, props);
  };

  var defaultGetRowProps = function defaultGetRowProps(props, _ref5) {
    var row = _ref5.row;
    return _extends({
      key: "row_" + row.id,
      role: 'row'
    }, props);
  };

  var defaultGetCellProps = function defaultGetCellProps(props, _ref6) {
    var cell = _ref6.cell;
    return _extends({
      key: "cell_" + cell.row.id + "_" + cell.column.id,
      role: 'cell'
    }, props);
  };

  function makeDefaultPluginHooks() {
    return {
      useOptions: [],
      stateReducers: [],
      useControlledState: [],
      columns: [],
      columnsDeps: [],
      allColumns: [],
      allColumnsDeps: [],
      accessValue: [],
      materializedColumns: [],
      materializedColumnsDeps: [],
      useInstanceAfterData: [],
      visibleColumns: [],
      visibleColumnsDeps: [],
      headerGroups: [],
      headerGroupsDeps: [],
      useInstanceBeforeDimensions: [],
      useInstance: [],
      prepareRow: [],
      getTableProps: [defaultGetTableProps],
      getTableBodyProps: [defaultGetTableBodyProps],
      getHeaderGroupProps: [defaultGetHeaderGroupProps],
      getFooterGroupProps: [defaultGetFooterGroupProps],
      getHeaderProps: [defaultGetHeaderProps],
      getFooterProps: [defaultGetFooterProps],
      getRowProps: [defaultGetRowProps],
      getCellProps: [defaultGetCellProps],
      useFinalInstance: []
    };
  }

  actions.resetHiddenColumns = 'resetHiddenColumns';
  actions.toggleHideColumn = 'toggleHideColumn';
  actions.setHiddenColumns = 'setHiddenColumns';
  actions.toggleHideAllColumns = 'toggleHideAllColumns';
  var useColumnVisibility = function useColumnVisibility(hooks) {
    hooks.getToggleHiddenProps = [defaultGetToggleHiddenProps];
    hooks.getToggleHideAllColumnsProps = [defaultGetToggleHideAllColumnsProps];
    hooks.stateReducers.push(reducer);
    hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
    hooks.headerGroupsDeps.push(function (deps, _ref) {
      var instance = _ref.instance;
      return [].concat(deps, [instance.state.hiddenColumns]);
    });
    hooks.useInstance.push(useInstance);
  };
  useColumnVisibility.pluginName = 'useColumnVisibility';

  var defaultGetToggleHiddenProps = function defaultGetToggleHiddenProps(props, _ref2) {
    var column = _ref2.column;
    return [props, {
      onChange: function onChange(e) {
        column.toggleHidden(!e.target.checked);
      },
      style: {
        cursor: 'pointer'
      },
      checked: column.isVisible,
      title: 'Toggle Column Visible'
    }];
  };

  var defaultGetToggleHideAllColumnsProps = function defaultGetToggleHideAllColumnsProps(props, _ref3) {
    var instance = _ref3.instance;
    return [props, {
      onChange: function onChange(e) {
        instance.toggleHideAllColumns(!e.target.checked);
      },
      style: {
        cursor: 'pointer'
      },
      checked: !instance.allColumnsHidden && !instance.state.hiddenColumns.length,
      title: 'Toggle All Columns Hidden',
      indeterminate: !instance.allColumnsHidden && instance.state.hiddenColumns.length
    }];
  };

  function reducer(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        hiddenColumns: []
      }, state);
    }

    if (action.type === actions.resetHiddenColumns) {
      return _extends({}, state, {
        hiddenColumns: instance.initialState.hiddenColumns || []
      });
    }

    if (action.type === actions.toggleHideColumn) {
      var should = typeof action.value !== 'undefined' ? action.value : !state.hiddenColumns.includes(action.columnId);
      var hiddenColumns = should ? [].concat(state.hiddenColumns, [action.columnId]) : state.hiddenColumns.filter(function (d) {
        return d !== action.columnId;
      });
      return _extends({}, state, {
        hiddenColumns: hiddenColumns
      });
    }

    if (action.type === actions.setHiddenColumns) {
      return _extends({}, state, {
        hiddenColumns: functionalUpdate(action.value, state.hiddenColumns)
      });
    }

    if (action.type === actions.toggleHideAllColumns) {
      var shouldAll = typeof action.value !== 'undefined' ? action.value : !state.hiddenColumns.length;
      return _extends({}, state, {
        hiddenColumns: shouldAll ? instance.allColumns.map(function (d) {
          return d.id;
        }) : []
      });
    }
  }

  function useInstanceBeforeDimensions(instance) {
    var headers = instance.headers,
        hiddenColumns = instance.state.hiddenColumns;
    var isMountedRef = React.useRef(false);

    if (!isMountedRef.current) ;

    var handleColumn = function handleColumn(column, parentVisible) {
      column.isVisible = parentVisible && !hiddenColumns.includes(column.id);
      var totalVisibleHeaderCount = 0;

      if (column.headers && column.headers.length) {
        column.headers.forEach(function (subColumn) {
          return totalVisibleHeaderCount += handleColumn(subColumn, column.isVisible);
        });
      } else {
        totalVisibleHeaderCount = column.isVisible ? 1 : 0;
      }

      column.totalVisibleHeaderCount = totalVisibleHeaderCount;
      return totalVisibleHeaderCount;
    };

    var totalVisibleHeaderCount = 0;
    headers.forEach(function (subHeader) {
      return totalVisibleHeaderCount += handleColumn(subHeader, true);
    });
  }

  function useInstance(instance) {
    var columns = instance.columns,
        flatHeaders = instance.flatHeaders,
        dispatch = instance.dispatch,
        allColumns = instance.allColumns,
        getHooks = instance.getHooks,
        hiddenColumns = instance.state.hiddenColumns,
        _instance$autoResetHi = instance.autoResetHiddenColumns,
        autoResetHiddenColumns = _instance$autoResetHi === void 0 ? true : _instance$autoResetHi;
    var getInstance = useGetLatest(instance);
    var allColumnsHidden = allColumns.length === hiddenColumns.length;
    var toggleHideColumn = React.useCallback(function (columnId, value) {
      return dispatch({
        type: actions.toggleHideColumn,
        columnId: columnId,
        value: value
      });
    }, [dispatch]);
    var setHiddenColumns = React.useCallback(function (value) {
      return dispatch({
        type: actions.setHiddenColumns,
        value: value
      });
    }, [dispatch]);
    var toggleHideAllColumns = React.useCallback(function (value) {
      return dispatch({
        type: actions.toggleHideAllColumns,
        value: value
      });
    }, [dispatch]);
    var getToggleHideAllColumnsProps = makePropGetter(getHooks().getToggleHideAllColumnsProps, {
      instance: getInstance()
    });
    flatHeaders.forEach(function (column) {
      column.toggleHidden = function (value) {
        dispatch({
          type: actions.toggleHideColumn,
          columnId: column.id,
          value: value
        });
      };

      column.getToggleHiddenProps = makePropGetter(getHooks().getToggleHiddenProps, {
        instance: getInstance(),
        column: column
      });
    });
    var getAutoResetHiddenColumns = useGetLatest(autoResetHiddenColumns);
    useMountedLayoutEffect(function () {
      if (getAutoResetHiddenColumns()) {
        dispatch({
          type: actions.resetHiddenColumns
        });
      }
    }, [dispatch, columns]);
    Object.assign(instance, {
      allColumnsHidden: allColumnsHidden,
      toggleHideColumn: toggleHideColumn,
      setHiddenColumns: setHiddenColumns,
      toggleHideAllColumns: toggleHideAllColumns,
      getToggleHideAllColumnsProps: getToggleHideAllColumnsProps
    });
  }

  var defaultInitialState = {};
  var defaultColumnInstance = {};

  var defaultReducer = function defaultReducer(state, action, prevState) {
    return state;
  };

  var defaultGetSubRows = function defaultGetSubRows(row, index) {
    return row.subRows || [];
  };

  var defaultGetRowId = function defaultGetRowId(row, index, parent) {
    return "" + (parent ? [parent.id, index].join('.') : index);
  };

  var defaultUseControlledState = function defaultUseControlledState(d) {
    return d;
  };

  function applyDefaults(props) {
    var _props$initialState = props.initialState,
        initialState = _props$initialState === void 0 ? defaultInitialState : _props$initialState,
        _props$defaultColumn = props.defaultColumn,
        defaultColumn = _props$defaultColumn === void 0 ? defaultColumnInstance : _props$defaultColumn,
        _props$getSubRows = props.getSubRows,
        getSubRows = _props$getSubRows === void 0 ? defaultGetSubRows : _props$getSubRows,
        _props$getRowId = props.getRowId,
        getRowId = _props$getRowId === void 0 ? defaultGetRowId : _props$getRowId,
        _props$stateReducer = props.stateReducer,
        stateReducer = _props$stateReducer === void 0 ? defaultReducer : _props$stateReducer,
        _props$useControlledS = props.useControlledState,
        useControlledState = _props$useControlledS === void 0 ? defaultUseControlledState : _props$useControlledS,
        rest = _objectWithoutPropertiesLoose(props, ["initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState"]);

    return _extends({}, rest, {
      initialState: initialState,
      defaultColumn: defaultColumn,
      getSubRows: getSubRows,
      getRowId: getRowId,
      stateReducer: stateReducer,
      useControlledState: useControlledState
    });
  }

  var useTable = function useTable(props) {
    for (var _len = arguments.length, plugins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      plugins[_key - 1] = arguments[_key];
    }

    // Apply default props
    props = applyDefaults(props); // Add core plugins

    plugins = [useColumnVisibility].concat(plugins); // Create the table instance

    var instanceRef = React.useRef({}); // Create a getter for the instance (helps avoid a lot of potential memory leaks)

    var getInstance = useGetLatest(instanceRef.current); // Assign the props, plugins and hooks to the instance

    Object.assign(getInstance(), _extends({}, props, {
      plugins: plugins,
      hooks: makeDefaultPluginHooks()
    })); // Allow plugins to register hooks as early as possible

    plugins.filter(Boolean).forEach(function (plugin) {
      plugin(getInstance().hooks);
    }); // Consume all hooks and make a getter for them

    var getHooks = useGetLatest(getInstance().hooks);
    getInstance().getHooks = getHooks;
    delete getInstance().hooks; // Allow useOptions hooks to modify the options coming into the table

    Object.assign(getInstance(), reduceHooks(getHooks().useOptions, applyDefaults(props)));

    var _getInstance = getInstance(),
        data = _getInstance.data,
        userColumns = _getInstance.columns,
        initialState = _getInstance.initialState,
        defaultColumn = _getInstance.defaultColumn,
        getSubRows = _getInstance.getSubRows,
        getRowId = _getInstance.getRowId,
        stateReducer = _getInstance.stateReducer,
        useControlledState = _getInstance.useControlledState; // Setup user reducer ref


    var getStateReducer = useGetLatest(stateReducer); // Build the reducer

    var reducer = React.useCallback(function (state, action) {
      // Detect invalid actions
      if (!action.type) {
        console.info({
          action: action
        });
        throw new Error('Unknown Action 👆');
      } // Reduce the state from all plugin reducers


      return [].concat(getHooks().stateReducers, Array.isArray(getStateReducer()) ? getStateReducer() : [getStateReducer()]).reduce(function (s, handler) {
        return handler(s, action, state, getInstance()) || s;
      }, state);
    }, [getHooks, getStateReducer, getInstance]); // Start the reducer

    var _React$useReducer = React.useReducer(reducer, undefined, function () {
      return reducer(initialState, {
        type: actions.init
      });
    }),
        reducerState = _React$useReducer[0],
        dispatch = _React$useReducer[1]; // Allow the user to control the final state with hooks


    var state = reduceHooks([].concat(getHooks().useControlledState, [useControlledState]), reducerState, {
      instance: getInstance()
    });
    Object.assign(getInstance(), {
      state: state,
      dispatch: dispatch
    }); // Decorate All the columns

    var columns = React.useMemo(function () {
      return linkColumnStructure(reduceHooks(getHooks().columns, userColumns, {
        instance: getInstance()
      }));
    }, [getHooks, getInstance, userColumns].concat(reduceHooks(getHooks().columnsDeps, [], {
      instance: getInstance()
    })));
    getInstance().columns = columns; // Get the flat list of all columns and allow hooks to decorate
    // those columns (and trigger this memoization via deps)

    var allColumns = React.useMemo(function () {
      return reduceHooks(getHooks().allColumns, flattenColumns(columns), {
        instance: getInstance()
      }).map(assignColumnAccessor);
    }, [columns, getHooks, getInstance].concat(reduceHooks(getHooks().allColumnsDeps, [], {
      instance: getInstance()
    })));
    getInstance().allColumns = allColumns; // Access the row model using initial columns

    var _React$useMemo = React.useMemo(function () {
      var rows = [];
      var flatRows = [];
      var rowsById = {};
      var allColumnsQueue = [].concat(allColumns);

      while (allColumnsQueue.length) {
        var column = allColumnsQueue.shift();
        accessRowsForColumn({
          data: data,
          rows: rows,
          flatRows: flatRows,
          rowsById: rowsById,
          column: column,
          getRowId: getRowId,
          getSubRows: getSubRows,
          accessValueHooks: getHooks().accessValue,
          getInstance: getInstance
        });
      }

      return [rows, flatRows, rowsById];
    }, [allColumns, data, getRowId, getSubRows, getHooks, getInstance]),
        rows = _React$useMemo[0],
        flatRows = _React$useMemo[1],
        rowsById = _React$useMemo[2];

    Object.assign(getInstance(), {
      rows: rows,
      initialRows: [].concat(rows),
      flatRows: flatRows,
      rowsById: rowsById // materializedColumns,

    });
    loopHooks(getHooks().useInstanceAfterData, getInstance()); // Get the flat list of all columns AFTER the rows
    // have been access, and allow hooks to decorate
    // those columns (and trigger this memoization via deps)

    var visibleColumns = React.useMemo(function () {
      return reduceHooks(getHooks().visibleColumns, allColumns, {
        instance: getInstance()
      }).map(function (d) {
        return decorateColumn(d, defaultColumn);
      });
    }, [getHooks, allColumns, getInstance, defaultColumn].concat(reduceHooks(getHooks().visibleColumnsDeps, [], {
      instance: getInstance()
    }))); // Combine new visible columns with all columns

    allColumns = React.useMemo(function () {
      var columns = [].concat(visibleColumns);
      allColumns.forEach(function (column) {
        if (!columns.find(function (d) {
          return d.id === column.id;
        })) {
          columns.push(column);
        }
      });
      return columns;
    }, [allColumns, visibleColumns]);
    getInstance().allColumns = allColumns;

    {
      var duplicateColumns = allColumns.filter(function (column, i) {
        return allColumns.findIndex(function (d) {
          return d.id === column.id;
        }) !== i;
      });

      if (duplicateColumns.length) {
        console.info(allColumns);
        throw new Error("Duplicate columns were found with ids: \"" + duplicateColumns.map(function (d) {
          return d.id;
        }).join(', ') + "\" in the columns array above");
      }
    } // Make the headerGroups


    var headerGroups = React.useMemo(function () {
      return reduceHooks(getHooks().headerGroups, makeHeaderGroups(visibleColumns, defaultColumn), getInstance());
    }, [getHooks, visibleColumns, defaultColumn, getInstance].concat(reduceHooks(getHooks().headerGroupsDeps, [], {
      instance: getInstance()
    })));
    getInstance().headerGroups = headerGroups; // Get the first level of headers

    var headers = React.useMemo(function () {
      return headerGroups.length ? headerGroups[0].headers : [];
    }, [headerGroups]);
    getInstance().headers = headers; // Provide a flat header list for utilities

    getInstance().flatHeaders = headerGroups.reduce(function (all, headerGroup) {
      return [].concat(all, headerGroup.headers);
    }, []);
    loopHooks(getHooks().useInstanceBeforeDimensions, getInstance()); // Filter columns down to visible ones

    var visibleColumnsDep = visibleColumns.filter(function (d) {
      return d.isVisible;
    }).map(function (d) {
      return d.id;
    }).sort().join('_');
    visibleColumns = React.useMemo(function () {
      return visibleColumns.filter(function (d) {
        return d.isVisible;
      });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [visibleColumns, visibleColumnsDep]);
    getInstance().visibleColumns = visibleColumns; // Header Visibility is needed by this point

    var _calculateHeaderWidth = calculateHeaderWidths(headers),
        totalColumnsMinWidth = _calculateHeaderWidth[0],
        totalColumnsWidth = _calculateHeaderWidth[1],
        totalColumnsMaxWidth = _calculateHeaderWidth[2];

    getInstance().totalColumnsMinWidth = totalColumnsMinWidth;
    getInstance().totalColumnsWidth = totalColumnsWidth;
    getInstance().totalColumnsMaxWidth = totalColumnsMaxWidth;
    loopHooks(getHooks().useInstance, getInstance()) // Each materialized header needs to be assigned a render function and other
    // prop getter properties here.
    ;
    [].concat(getInstance().flatHeaders, getInstance().allColumns).forEach(function (column) {
      // Give columns/headers rendering power
      column.render = makeRenderer(getInstance(), column); // Give columns/headers a default getHeaderProps

      column.getHeaderProps = makePropGetter(getHooks().getHeaderProps, {
        instance: getInstance(),
        column: column
      }); // Give columns/headers a default getFooterProps

      column.getFooterProps = makePropGetter(getHooks().getFooterProps, {
        instance: getInstance(),
        column: column
      });
    });
    getInstance().headerGroups = React.useMemo(function () {
      return headerGroups.filter(function (headerGroup, i) {
        // Filter out any headers and headerGroups that don't have visible columns
        headerGroup.headers = headerGroup.headers.filter(function (column) {
          var recurse = function recurse(headers) {
            return headers.filter(function (column) {
              if (column.headers) {
                return recurse(column.headers);
              }

              return column.isVisible;
            }).length;
          };

          if (column.headers) {
            return recurse(column.headers);
          }

          return column.isVisible;
        }); // Give headerGroups getRowProps

        if (headerGroup.headers.length) {
          headerGroup.getHeaderGroupProps = makePropGetter(getHooks().getHeaderGroupProps, {
            instance: getInstance(),
            headerGroup: headerGroup,
            index: i
          });
          headerGroup.getFooterGroupProps = makePropGetter(getHooks().getFooterGroupProps, {
            instance: getInstance(),
            headerGroup: headerGroup,
            index: i
          });
          return true;
        }

        return false;
      });
    }, [headerGroups, getInstance, getHooks]);
    getInstance().footerGroups = [].concat(getInstance().headerGroups).reverse(); // The prepareRow function is absolutely necessary and MUST be called on
    // any rows the user wishes to be displayed.

    getInstance().prepareRow = React.useCallback(function (row) {
      row.getRowProps = makePropGetter(getHooks().getRowProps, {
        instance: getInstance(),
        row: row
      }); // Build the visible cells for each row

      row.allCells = allColumns.map(function (column) {
        var value = row.values[column.id];
        var cell = {
          column: column,
          row: row,
          value: value
        }; // Give each cell a getCellProps base

        cell.getCellProps = makePropGetter(getHooks().getCellProps, {
          instance: getInstance(),
          cell: cell
        }); // Give each cell a renderer function (supports multiple renderers)

        cell.render = makeRenderer(getInstance(), column, {
          row: row,
          cell: cell,
          value: value
        });
        return cell;
      });
      row.cells = visibleColumns.map(function (column) {
        return row.allCells.find(function (cell) {
          return cell.column.id === column.id;
        });
      }); // need to apply any row specific hooks (useExpanded requires this)

      loopHooks(getHooks().prepareRow, row, {
        instance: getInstance()
      });
    }, [getHooks, getInstance, allColumns, visibleColumns]);
    getInstance().getTableProps = makePropGetter(getHooks().getTableProps, {
      instance: getInstance()
    });
    getInstance().getTableBodyProps = makePropGetter(getHooks().getTableBodyProps, {
      instance: getInstance()
    });
    loopHooks(getHooks().useFinalInstance, getInstance());
    return getInstance();
  };

  function calculateHeaderWidths(headers, left) {
    if (left === void 0) {
      left = 0;
    }

    var sumTotalMinWidth = 0;
    var sumTotalWidth = 0;
    var sumTotalMaxWidth = 0;
    var sumTotalFlexWidth = 0;
    headers.forEach(function (header) {
      var subHeaders = header.headers;
      header.totalLeft = left;

      if (subHeaders && subHeaders.length) {
        var _calculateHeaderWidth2 = calculateHeaderWidths(subHeaders, left),
            totalMinWidth = _calculateHeaderWidth2[0],
            totalWidth = _calculateHeaderWidth2[1],
            totalMaxWidth = _calculateHeaderWidth2[2],
            totalFlexWidth = _calculateHeaderWidth2[3];

        header.totalMinWidth = totalMinWidth;
        header.totalWidth = totalWidth;
        header.totalMaxWidth = totalMaxWidth;
        header.totalFlexWidth = totalFlexWidth;
      } else {
        header.totalMinWidth = header.minWidth;
        header.totalWidth = Math.min(Math.max(header.minWidth, header.width), header.maxWidth);
        header.totalMaxWidth = header.maxWidth;
        header.totalFlexWidth = header.canResize ? header.totalWidth : 0;
      }

      if (header.isVisible) {
        left += header.totalWidth;
        sumTotalMinWidth += header.totalMinWidth;
        sumTotalWidth += header.totalWidth;
        sumTotalMaxWidth += header.totalMaxWidth;
        sumTotalFlexWidth += header.totalFlexWidth;
      }
    });
    return [sumTotalMinWidth, sumTotalWidth, sumTotalMaxWidth, sumTotalFlexWidth];
  }

  function accessRowsForColumn(_ref) {
    var data = _ref.data,
        rows = _ref.rows,
        flatRows = _ref.flatRows,
        rowsById = _ref.rowsById,
        column = _ref.column,
        getRowId = _ref.getRowId,
        getSubRows = _ref.getSubRows,
        accessValueHooks = _ref.accessValueHooks,
        getInstance = _ref.getInstance;

    // Access the row's data column-by-column
    // We do it this way so we can incrementally add materialized
    // columns after the first pass and avoid excessive looping
    var accessRow = function accessRow(originalRow, rowIndex, depth, parent, parentRows) {
      if (depth === void 0) {
        depth = 0;
      }

      // Keep the original reference around
      var original = originalRow;
      var id = getRowId(originalRow, rowIndex, parent);
      var row = rowsById[id]; // If the row hasn't been created, let's make it

      if (!row) {
        row = {
          id: id,
          original: original,
          index: rowIndex,
          depth: depth,
          cells: [{}] // This is a dummy cell

        }; // Override common array functions (and the dummy cell's getCellProps function)
        // to show an error if it is accessed without calling prepareRow

        row.cells.map = unpreparedAccessWarning;
        row.cells.filter = unpreparedAccessWarning;
        row.cells.forEach = unpreparedAccessWarning;
        row.cells[0].getCellProps = unpreparedAccessWarning; // Create the cells and values

        row.values = {}; // Push this row into the parentRows array

        parentRows.push(row); // Keep track of every row in a flat array

        flatRows.push(row); // Also keep track of every row by its ID

        rowsById[id] = row; // Get the original subrows

        row.originalSubRows = getSubRows(originalRow, rowIndex); // Then recursively access them

        if (row.originalSubRows) {
          var subRows = [];
          row.originalSubRows.forEach(function (d, i) {
            return accessRow(d, i, depth + 1, row, subRows);
          }); // Keep the new subRows array on the row

          row.subRows = subRows;
        }
      } else if (row.subRows) {
        // If the row exists, then it's already been accessed
        // Keep recursing, but don't worry about passing the
        // accumlator array (those rows already exist)
        row.originalSubRows.forEach(function (d, i) {
          return accessRow(d, i, depth + 1, row);
        });
      } // If the column has an accessor, use it to get a value


      if (column.accessor) {
        row.values[column.id] = column.accessor(originalRow, rowIndex, row, parentRows, data);
      } // Allow plugins to manipulate the column value


      row.values[column.id] = reduceHooks(accessValueHooks, row.values[column.id], {
        row: row,
        column: column,
        instance: getInstance()
      }, true);
    };

    data.forEach(function (originalRow, rowIndex) {
      return accessRow(originalRow, rowIndex, 0, undefined, rows);
    });
  }

  actions.resetExpanded = 'resetExpanded';
  actions.toggleRowExpanded = 'toggleRowExpanded';
  actions.toggleAllRowsExpanded = 'toggleAllRowsExpanded';
  var useExpanded = function useExpanded(hooks) {
    hooks.getToggleAllRowsExpandedProps = [defaultGetToggleAllRowsExpandedProps];
    hooks.getToggleRowExpandedProps = [defaultGetToggleRowExpandedProps];
    hooks.stateReducers.push(reducer$1);
    hooks.useInstance.push(useInstance$1);
    hooks.prepareRow.push(prepareRow);
  };
  useExpanded.pluginName = 'useExpanded';

  var defaultGetToggleAllRowsExpandedProps = function defaultGetToggleAllRowsExpandedProps(props, _ref) {
    var instance = _ref.instance;
    return [props, {
      onClick: function onClick(e) {
        instance.toggleAllRowsExpanded();
      },
      style: {
        cursor: 'pointer'
      },
      title: 'Toggle All Rows Expanded'
    }];
  };

  var defaultGetToggleRowExpandedProps = function defaultGetToggleRowExpandedProps(props, _ref2) {
    var row = _ref2.row;
    return [props, {
      onClick: function onClick() {
        row.toggleRowExpanded();
      },
      style: {
        cursor: 'pointer'
      },
      title: 'Toggle Row Expanded'
    }];
  }; // Reducer


  function reducer$1(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        expanded: {}
      }, state);
    }

    if (action.type === actions.resetExpanded) {
      return _extends({}, state, {
        expanded: instance.initialState.expanded || {}
      });
    }

    if (action.type === actions.toggleAllRowsExpanded) {
      var value = action.value;
      var rowsById = instance.rowsById;
      var isAllRowsExpanded = Object.keys(rowsById).length === Object.keys(state.expanded).length;
      var expandAll = typeof value !== 'undefined' ? value : !isAllRowsExpanded;

      if (expandAll) {
        var expanded = {};
        Object.keys(rowsById).forEach(function (rowId) {
          expanded[rowId] = true;
        });
        return _extends({}, state, {
          expanded: expanded
        });
      }

      return _extends({}, state, {
        expanded: {}
      });
    }

    if (action.type === actions.toggleRowExpanded) {
      var id = action.id,
          setExpanded = action.value;
      var exists = state.expanded[id];
      var shouldExist = typeof setExpanded !== 'undefined' ? setExpanded : !exists;

      if (!exists && shouldExist) {
        var _extends2;

        return _extends({}, state, {
          expanded: _extends({}, state.expanded, (_extends2 = {}, _extends2[id] = true, _extends2))
        });
      } else if (exists && !shouldExist) {
        var _state$expanded = state.expanded,
            _ = _state$expanded[id],
            rest = _objectWithoutPropertiesLoose(_state$expanded, [id].map(_toPropertyKey));

        return _extends({}, state, {
          expanded: rest
        });
      } else {
        return state;
      }
    }
  }

  function useInstance$1(instance) {
    var data = instance.data,
        rows = instance.rows,
        rowsById = instance.rowsById,
        _instance$manualExpan = instance.manualExpandedKey,
        manualExpandedKey = _instance$manualExpan === void 0 ? 'expanded' : _instance$manualExpan,
        _instance$paginateExp = instance.paginateExpandedRows,
        paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp,
        _instance$expandSubRo = instance.expandSubRows,
        expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo,
        _instance$autoResetEx = instance.autoResetExpanded,
        autoResetExpanded = _instance$autoResetEx === void 0 ? true : _instance$autoResetEx,
        getHooks = instance.getHooks,
        plugins = instance.plugins,
        expanded = instance.state.expanded,
        dispatch = instance.dispatch;
    ensurePluginOrder(plugins, ['useSortBy', 'useGroupBy', 'usePivotColumns', 'useGlobalFilter'], 'useExpanded');
    var getAutoResetExpanded = useGetLatest(autoResetExpanded);
    var isAllRowsExpanded = Boolean(Object.keys(rowsById).length && Object.keys(expanded).length);

    if (isAllRowsExpanded) {
      if (Object.keys(rowsById).some(function (id) {
        return !expanded[id];
      })) {
        isAllRowsExpanded = false;
      }
    } // Bypass any effects from firing when this changes


    useMountedLayoutEffect(function () {
      if (getAutoResetExpanded()) {
        dispatch({
          type: actions.resetExpanded
        });
      }
    }, [dispatch, data]);
    var toggleRowExpanded = React.useCallback(function (id, value) {
      dispatch({
        type: actions.toggleRowExpanded,
        id: id,
        value: value
      });
    }, [dispatch]);
    var toggleAllRowsExpanded = React.useCallback(function (value) {
      return dispatch({
        type: actions.toggleAllRowsExpanded,
        value: value
      });
    }, [dispatch]);
    var expandedRows = React.useMemo(function () {
      if (paginateExpandedRows) {
        return expandRows(rows, {
          manualExpandedKey: manualExpandedKey,
          expanded: expanded,
          expandSubRows: expandSubRows
        });
      }

      return rows;
    }, [paginateExpandedRows, rows, manualExpandedKey, expanded, expandSubRows]);
    var expandedDepth = React.useMemo(function () {
      return findExpandedDepth(expanded);
    }, [expanded]);
    var getInstance = useGetLatest(instance);
    var getToggleAllRowsExpandedProps = makePropGetter(getHooks().getToggleAllRowsExpandedProps, {
      instance: getInstance()
    });
    Object.assign(instance, {
      preExpandedRows: rows,
      expandedRows: expandedRows,
      rows: expandedRows,
      expandedDepth: expandedDepth,
      isAllRowsExpanded: isAllRowsExpanded,
      toggleRowExpanded: toggleRowExpanded,
      toggleAllRowsExpanded: toggleAllRowsExpanded,
      getToggleAllRowsExpandedProps: getToggleAllRowsExpandedProps
    });
  }

  function prepareRow(row, _ref3) {
    var getHooks = _ref3.instance.getHooks,
        instance = _ref3.instance;

    row.toggleRowExpanded = function (set) {
      return instance.toggleRowExpanded(row.id, set);
    };

    row.getToggleRowExpandedProps = makePropGetter(getHooks().getToggleRowExpandedProps, {
      instance: instance,
      row: row
    });
  }

  function findExpandedDepth(expanded) {
    var maxDepth = 0;
    Object.keys(expanded).forEach(function (id) {
      var splitId = id.split('.');
      maxDepth = Math.max(maxDepth, splitId.length);
    });
    return maxDepth;
  }

  var text = function text(rows, ids, filterValue) {
    rows = rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
      });
    });
    return rows;
  };

  text.autoRemove = function (val) {
    return !val;
  };

  var exactText = function exactText(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue !== undefined ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
      });
    });
  };

  exactText.autoRemove = function (val) {
    return !val;
  };

  var exactTextCase = function exactTextCase(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue !== undefined ? String(rowValue) === String(filterValue) : true;
      });
    });
  };

  exactTextCase.autoRemove = function (val) {
    return !val;
  };

  var includes = function includes(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue.includes(filterValue);
      });
    });
  };

  includes.autoRemove = function (val) {
    return !val || !val.length;
  };

  var includesAll = function includesAll(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue && rowValue.length && filterValue.every(function (val) {
          return rowValue.includes(val);
        });
      });
    });
  };

  includesAll.autoRemove = function (val) {
    return !val || !val.length;
  };

  var includesSome = function includesSome(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue && rowValue.length && filterValue.some(function (val) {
          return rowValue.includes(val);
        });
      });
    });
  };

  includesSome.autoRemove = function (val) {
    return !val || !val.length;
  };

  var includesValue = function includesValue(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return filterValue.includes(rowValue);
      });
    });
  };

  includesValue.autoRemove = function (val) {
    return !val || !val.length;
  };

  var exact = function exact(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue === filterValue;
      });
    });
  };

  exact.autoRemove = function (val) {
    return typeof val === 'undefined';
  };

  var equals = function equals(rows, ids, filterValue) {
    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id]; // eslint-disable-next-line eqeqeq

        return rowValue == filterValue;
      });
    });
  };

  equals.autoRemove = function (val) {
    return val == null;
  };

  var between = function between(rows, ids, filterValue) {
    var _ref = filterValue || [],
        min = _ref[0],
        max = _ref[1];

    min = typeof min === 'number' ? min : -Infinity;
    max = typeof max === 'number' ? max : Infinity;

    if (min > max) {
      var temp = min;
      min = max;
      max = temp;
    }

    return rows.filter(function (row) {
      return ids.some(function (id) {
        var rowValue = row.values[id];
        return rowValue >= min && rowValue <= max;
      });
    });
  };

  between.autoRemove = function (val) {
    return !val || typeof val[0] !== 'number' && typeof val[1] !== 'number';
  };

  var filterTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    text: text,
    exactText: exactText,
    exactTextCase: exactTextCase,
    includes: includes,
    includesAll: includesAll,
    includesSome: includesSome,
    includesValue: includesValue,
    exact: exact,
    equals: equals,
    between: between
  });

  actions.resetFilters = 'resetFilters';
  actions.setFilter = 'setFilter';
  actions.setAllFilters = 'setAllFilters';
  var useFilters = function useFilters(hooks) {
    hooks.stateReducers.push(reducer$2);
    hooks.useInstance.push(useInstance$2);
  };
  useFilters.pluginName = 'useFilters';

  function reducer$2(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        filters: []
      }, state);
    }

    if (action.type === actions.resetFilters) {
      return _extends({}, state, {
        filters: instance.initialState.filters || []
      });
    }

    if (action.type === actions.setFilter) {
      var columnId = action.columnId,
          filterValue = action.filterValue;
      var allColumns = instance.allColumns,
          userFilterTypes = instance.filterTypes;
      var column = allColumns.find(function (d) {
        return d.id === columnId;
      });

      if (!column) {
        throw new Error("React-Table: Could not find a column with id: " + columnId);
      }

      var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);
      var previousfilter = state.filters.find(function (d) {
        return d.id === columnId;
      });
      var newFilter = functionalUpdate(filterValue, previousfilter && previousfilter.value); //

      if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter, column)) {
        return _extends({}, state, {
          filters: state.filters.filter(function (d) {
            return d.id !== columnId;
          })
        });
      }

      if (previousfilter) {
        return _extends({}, state, {
          filters: state.filters.map(function (d) {
            if (d.id === columnId) {
              return {
                id: columnId,
                value: newFilter
              };
            }

            return d;
          })
        });
      }

      return _extends({}, state, {
        filters: [].concat(state.filters, [{
          id: columnId,
          value: newFilter
        }])
      });
    }

    if (action.type === actions.setAllFilters) {
      var filters = action.filters;
      var _allColumns = instance.allColumns,
          _userFilterTypes = instance.filterTypes;
      return _extends({}, state, {
        // Filter out undefined values
        filters: functionalUpdate(filters, state.filters).filter(function (filter) {
          var column = _allColumns.find(function (d) {
            return d.id === filter.id;
          });

          var filterMethod = getFilterMethod(column.filter, _userFilterTypes || {}, filterTypes);

          if (shouldAutoRemoveFilter(filterMethod.autoRemove, filter.value, column)) {
            return false;
          }

          return true;
        })
      });
    }
  }

  function useInstance$2(instance) {
    var data = instance.data,
        rows = instance.rows,
        flatRows = instance.flatRows,
        rowsById = instance.rowsById,
        allColumns = instance.allColumns,
        userFilterTypes = instance.filterTypes,
        manualFilters = instance.manualFilters,
        _instance$defaultCanF = instance.defaultCanFilter,
        defaultCanFilter = _instance$defaultCanF === void 0 ? false : _instance$defaultCanF,
        disableFilters = instance.disableFilters,
        filters = instance.state.filters,
        dispatch = instance.dispatch,
        _instance$autoResetFi = instance.autoResetFilters,
        autoResetFilters = _instance$autoResetFi === void 0 ? true : _instance$autoResetFi;
    var setFilter = React.useCallback(function (columnId, filterValue) {
      dispatch({
        type: actions.setFilter,
        columnId: columnId,
        filterValue: filterValue
      });
    }, [dispatch]);
    var setAllFilters = React.useCallback(function (filters) {
      dispatch({
        type: actions.setAllFilters,
        filters: filters
      });
    }, [dispatch]);
    allColumns.forEach(function (column) {
      var id = column.id,
          accessor = column.accessor,
          columnDefaultCanFilter = column.defaultCanFilter,
          columnDisableFilters = column.disableFilters; // Determine if a column is filterable

      column.canFilter = accessor ? getFirstDefined(columnDisableFilters === true ? false : undefined, disableFilters === true ? false : undefined, true) : getFirstDefined(columnDefaultCanFilter, defaultCanFilter, false); // Provide the column a way of updating the filter value

      column.setFilter = function (val) {
        return setFilter(column.id, val);
      }; // Provide the current filter value to the column for
      // convenience


      var found = filters.find(function (d) {
        return d.id === id;
      });
      column.filterValue = found && found.value;
    });

    var _React$useMemo = React.useMemo(function () {
      if (manualFilters || !filters.length) {
        return [rows, flatRows, rowsById];
      }

      var filteredFlatRows = [];
      var filteredRowsById = {}; // Filters top level and nested rows

      var filterRows = function filterRows(rows, depth) {
        if (depth === void 0) {
          depth = 0;
        }

        var filteredRows = rows;
        filteredRows = filters.reduce(function (filteredSoFar, _ref) {
          var columnId = _ref.id,
              filterValue = _ref.value;
          // Find the filters column
          var column = allColumns.find(function (d) {
            return d.id === columnId;
          });

          if (!column) {
            return filteredSoFar;
          }

          if (depth === 0) {
            column.preFilteredRows = filteredSoFar;
          }

          var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);

          if (!filterMethod) {
            console.warn("Could not find a valid 'column.filter' for column with the ID: " + column.id + ".");
            return filteredSoFar;
          } // Pass the rows, id, filterValue and column to the filterMethod
          // to get the filtered rows back


          column.filteredRows = filterMethod(filteredSoFar, [columnId], filterValue);
          return column.filteredRows;
        }, rows); // Apply the filter to any subRows
        // We technically could do this recursively in the above loop,
        // but that would severely hinder the API for the user, since they
        // would be required to do that recursion in some scenarios

        filteredRows.forEach(function (row) {
          filteredFlatRows.push(row);
          filteredRowsById[row.id] = row;

          if (!row.subRows) {
            return;
          }

          row.subRows = row.subRows && row.subRows.length > 0 ? filterRows(row.subRows, depth + 1) : row.subRows;
        });
        return filteredRows;
      };

      return [filterRows(rows), filteredFlatRows, filteredRowsById];
    }, [manualFilters, filters, rows, flatRows, rowsById, allColumns, userFilterTypes]),
        filteredRows = _React$useMemo[0],
        filteredFlatRows = _React$useMemo[1],
        filteredRowsById = _React$useMemo[2];

    React.useMemo(function () {
      // Now that each filtered column has it's partially filtered rows,
      // lets assign the final filtered rows to all of the other columns
      var nonFilteredColumns = allColumns.filter(function (column) {
        return !filters.find(function (d) {
          return d.id === column.id;
        });
      }); // This essentially enables faceted filter options to be built easily
      // using every column's preFilteredRows value

      nonFilteredColumns.forEach(function (column) {
        column.preFilteredRows = filteredRows;
        column.filteredRows = filteredRows;
      });
    }, [filteredRows, filters, allColumns]);
    var getAutoResetFilters = useGetLatest(autoResetFilters);
    useMountedLayoutEffect(function () {
      if (getAutoResetFilters()) {
        dispatch({
          type: actions.resetFilters
        });
      }
    }, [dispatch, manualFilters ? null : data]);
    Object.assign(instance, {
      preFilteredRows: rows,
      preFilteredFlatRows: flatRows,
      preFilteredRowsById: rowsById,
      filteredRows: filteredRows,
      filteredFlatRows: filteredFlatRows,
      filteredRowsById: filteredRowsById,
      rows: filteredRows,
      flatRows: filteredFlatRows,
      rowsById: filteredRowsById,
      setFilter: setFilter,
      setAllFilters: setAllFilters
    });
  }

  actions.resetGlobalFilter = 'resetGlobalFilter';
  actions.setGlobalFilter = 'setGlobalFilter';
  var useGlobalFilter = function useGlobalFilter(hooks) {
    hooks.stateReducers.push(reducer$3);
    hooks.useInstance.push(useInstance$3);
  };
  useGlobalFilter.pluginName = 'useGlobalFilter';

  function reducer$3(state, action, previousState, instance) {
    if (action.type === actions.resetGlobalFilter) {
      return _extends({}, state, {
        globalFilter: instance.initialState.globalFilter || undefined
      });
    }

    if (action.type === actions.setGlobalFilter) {
      var filterValue = action.filterValue;
      var userFilterTypes = instance.userFilterTypes;
      var filterMethod = getFilterMethod(instance.globalFilter, userFilterTypes || {}, filterTypes);
      var newFilter = functionalUpdate(filterValue, state.globalFilter); //

      if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter)) {
        var globalFilter = state.globalFilter,
            stateWithoutGlobalFilter = _objectWithoutPropertiesLoose(state, ["globalFilter"]);

        return stateWithoutGlobalFilter;
      }

      return _extends({}, state, {
        globalFilter: newFilter
      });
    }
  }

  function useInstance$3(instance) {
    var data = instance.data,
        rows = instance.rows,
        flatRows = instance.flatRows,
        rowsById = instance.rowsById,
        allColumns = instance.allColumns,
        userFilterTypes = instance.filterTypes,
        globalFilter = instance.globalFilter,
        manualGlobalFilter = instance.manualGlobalFilter,
        globalFilterValue = instance.state.globalFilter,
        dispatch = instance.dispatch,
        _instance$autoResetGl = instance.autoResetGlobalFilter,
        autoResetGlobalFilter = _instance$autoResetGl === void 0 ? true : _instance$autoResetGl,
        disableGlobalFilter = instance.disableGlobalFilter;
    var setGlobalFilter = React.useCallback(function (filterValue) {
      dispatch({
        type: actions.setGlobalFilter,
        filterValue: filterValue
      });
    }, [dispatch]); // TODO: Create a filter cache for incremental high speed multi-filtering
    // This gets pretty complicated pretty fast, since you have to maintain a
    // cache for each row group (top-level rows, and each row's recursive subrows)
    // This would make multi-filtering a lot faster though. Too far?

    var _React$useMemo = React.useMemo(function () {
      if (manualGlobalFilter || typeof globalFilterValue === 'undefined') {
        return [rows, flatRows, rowsById];
      }

      var filteredFlatRows = [];
      var filteredRowsById = {};
      var filterMethod = getFilterMethod(globalFilter, userFilterTypes || {}, filterTypes);

      if (!filterMethod) {
        console.warn("Could not find a valid 'globalFilter' option.");
        return rows;
      }

      allColumns.forEach(function (column) {
        var columnDisableGlobalFilter = column.disableGlobalFilter;
        column.canFilter = getFirstDefined(columnDisableGlobalFilter === true ? false : undefined, disableGlobalFilter === true ? false : undefined, true);
      });
      var filterableColumns = allColumns.filter(function (c) {
        return c.canFilter === true;
      }); // Filters top level and nested rows

      var filterRows = function filterRows(filteredRows) {
        filteredRows = filterMethod(filteredRows, filterableColumns.map(function (d) {
          return d.id;
        }), globalFilterValue);
        filteredRows.forEach(function (row) {
          filteredFlatRows.push(row);
          filteredRowsById[row.id] = row;
          row.subRows = row.subRows && row.subRows.length ? filterRows(row.subRows) : row.subRows;
        });
        return filteredRows;
      };

      return [filterRows(rows), filteredFlatRows, filteredRowsById];
    }, [manualGlobalFilter, globalFilterValue, globalFilter, userFilterTypes, allColumns, rows, flatRows, rowsById, disableGlobalFilter]),
        globalFilteredRows = _React$useMemo[0],
        globalFilteredFlatRows = _React$useMemo[1],
        globalFilteredRowsById = _React$useMemo[2];

    var getAutoResetGlobalFilter = useGetLatest(autoResetGlobalFilter);
    useMountedLayoutEffect(function () {
      if (getAutoResetGlobalFilter()) {
        dispatch({
          type: actions.resetGlobalFilter
        });
      }
    }, [dispatch, manualGlobalFilter ? null : data]);
    Object.assign(instance, {
      preGlobalFilteredRows: rows,
      preGlobalFilteredFlatRows: flatRows,
      preGlobalFilteredRowsById: rowsById,
      globalFilteredRows: globalFilteredRows,
      globalFilteredFlatRows: globalFilteredFlatRows,
      globalFilteredRowsById: globalFilteredRowsById,
      rows: globalFilteredRows,
      flatRows: globalFilteredFlatRows,
      rowsById: globalFilteredRowsById,
      setGlobalFilter: setGlobalFilter,
      disableGlobalFilter: disableGlobalFilter
    });
  }

  function sum(values, aggregatedValues) {
    // It's faster to just add the aggregations together instead of
    // process leaf nodes individually
    return aggregatedValues.reduce(function (sum, next) {
      return sum + (typeof next === 'number' ? next : 0);
    }, 0);
  }
  function min(values) {
    var min = values[0] || 0;
    values.forEach(function (value) {
      if (typeof value === 'number') {
        min = Math.min(min, value);
      }
    });
    return min;
  }
  function max(values) {
    var max = values[0] || 0;
    values.forEach(function (value) {
      if (typeof value === 'number') {
        max = Math.max(max, value);
      }
    });
    return max;
  }
  function minMax(values) {
    var min = values[0] || 0;
    var max = values[0] || 0;
    values.forEach(function (value) {
      if (typeof value === 'number') {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
    return min + ".." + max;
  }
  function average(values) {
    return sum(null, values) / values.length;
  }
  function median(values) {
    if (!values.length) {
      return null;
    }

    var mid = Math.floor(values.length / 2);
    var nums = [].concat(values).sort(function (a, b) {
      return a - b;
    });
    return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }
  function unique(values) {
    return Array.from(new Set(values).values());
  }
  function uniqueCount(values) {
    return new Set(values).size;
  }
  function count(values) {
    return values.length;
  }

  var aggregations = /*#__PURE__*/Object.freeze({
    __proto__: null,
    sum: sum,
    min: min,
    max: max,
    minMax: minMax,
    average: average,
    median: median,
    unique: unique,
    uniqueCount: uniqueCount,
    count: count
  });

  var emptyArray = [];
  var emptyObject = {}; // Actions

  actions.resetGroupBy = 'resetGroupBy';
  actions.setGroupBy = 'setGroupBy';
  actions.toggleGroupBy = 'toggleGroupBy';
  var useGroupBy = function useGroupBy(hooks) {
    hooks.getGroupByToggleProps = [defaultGetGroupByToggleProps];
    hooks.stateReducers.push(reducer$4);
    hooks.visibleColumnsDeps.push(function (deps, _ref) {
      var instance = _ref.instance;
      return [].concat(deps, [instance.state.groupBy]);
    });
    hooks.visibleColumns.push(visibleColumns);
    hooks.useInstance.push(useInstance$4);
    hooks.prepareRow.push(prepareRow$1);
  };
  useGroupBy.pluginName = 'useGroupBy';

  var defaultGetGroupByToggleProps = function defaultGetGroupByToggleProps(props, _ref2) {
    var header = _ref2.header;
    return [props, {
      onClick: header.canGroupBy ? function (e) {
        e.persist();
        header.toggleGroupBy();
      } : undefined,
      style: {
        cursor: header.canGroupBy ? 'pointer' : undefined
      },
      title: 'Toggle GroupBy'
    }];
  }; // Reducer


  function reducer$4(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        groupBy: []
      }, state);
    }

    if (action.type === actions.resetGroupBy) {
      return _extends({}, state, {
        groupBy: instance.initialState.groupBy || []
      });
    }

    if (action.type === actions.setGroupBy) {
      var value = action.value;
      return _extends({}, state, {
        groupBy: value
      });
    }

    if (action.type === actions.toggleGroupBy) {
      var columnId = action.columnId,
          setGroupBy = action.value;
      var resolvedGroupBy = typeof setGroupBy !== 'undefined' ? setGroupBy : !state.groupBy.includes(columnId);

      if (resolvedGroupBy) {
        return _extends({}, state, {
          groupBy: [].concat(state.groupBy, [columnId])
        });
      }

      return _extends({}, state, {
        groupBy: state.groupBy.filter(function (d) {
          return d !== columnId;
        })
      });
    }
  }

  function visibleColumns(columns, _ref3) {
    var groupBy = _ref3.instance.state.groupBy;
    // Sort grouped columns to the start of the column list
    // before the headers are built
    var groupByColumns = groupBy.map(function (g) {
      return columns.find(function (col) {
        return col.id === g;
      });
    }).filter(Boolean);
    var nonGroupByColumns = columns.filter(function (col) {
      return !groupBy.includes(col.id);
    });
    columns = [].concat(groupByColumns, nonGroupByColumns);
    columns.forEach(function (column) {
      column.isGrouped = groupBy.includes(column.id);
      column.groupedIndex = groupBy.indexOf(column.id);
    });
    return columns;
  }

  var defaultUserAggregations = {};

  function useInstance$4(instance) {
    var data = instance.data,
        rows = instance.rows,
        flatRows = instance.flatRows,
        rowsById = instance.rowsById,
        allColumns = instance.allColumns,
        flatHeaders = instance.flatHeaders,
        _instance$groupByFn = instance.groupByFn,
        groupByFn = _instance$groupByFn === void 0 ? defaultGroupByFn : _instance$groupByFn,
        manualGroupBy = instance.manualGroupBy,
        _instance$aggregation = instance.aggregations,
        userAggregations = _instance$aggregation === void 0 ? defaultUserAggregations : _instance$aggregation,
        plugins = instance.plugins,
        groupBy = instance.state.groupBy,
        dispatch = instance.dispatch,
        _instance$autoResetGr = instance.autoResetGroupBy,
        autoResetGroupBy = _instance$autoResetGr === void 0 ? true : _instance$autoResetGr,
        disableGroupBy = instance.disableGroupBy,
        defaultCanGroupBy = instance.defaultCanGroupBy,
        getHooks = instance.getHooks;
    ensurePluginOrder(plugins, ['useColumnOrder', 'useFilters'], 'useGroupBy');
    var getInstance = useGetLatest(instance);
    allColumns.forEach(function (column) {
      var accessor = column.accessor,
          defaultColumnGroupBy = column.defaultGroupBy,
          columnDisableGroupBy = column.disableGroupBy;
      column.canGroupBy = accessor ? getFirstDefined(column.canGroupBy, columnDisableGroupBy === true ? false : undefined, disableGroupBy === true ? false : undefined, true) : getFirstDefined(column.canGroupBy, defaultColumnGroupBy, defaultCanGroupBy, false);

      if (column.canGroupBy) {
        column.toggleGroupBy = function () {
          return instance.toggleGroupBy(column.id);
        };
      }

      column.Aggregated = column.Aggregated || column.Cell;
    });
    var toggleGroupBy = React.useCallback(function (columnId, value) {
      dispatch({
        type: actions.toggleGroupBy,
        columnId: columnId,
        value: value
      });
    }, [dispatch]);
    var setGroupBy = React.useCallback(function (value) {
      dispatch({
        type: actions.setGroupBy,
        value: value
      });
    }, [dispatch]);
    flatHeaders.forEach(function (header) {
      header.getGroupByToggleProps = makePropGetter(getHooks().getGroupByToggleProps, {
        instance: getInstance(),
        header: header
      });
    });

    var _React$useMemo = React.useMemo(function () {
      if (manualGroupBy || !groupBy.length) {
        return [rows, flatRows, rowsById, emptyArray, emptyObject, flatRows, rowsById];
      } // Ensure that the list of filtered columns exist


      var existingGroupBy = groupBy.filter(function (g) {
        return allColumns.find(function (col) {
          return col.id === g;
        });
      }); // Find the columns that can or are aggregating
      // Uses each column to aggregate rows into a single value

      var aggregateRowsToValues = function aggregateRowsToValues(leafRows, groupedRows, depth) {
        var values = {};
        allColumns.forEach(function (column) {
          // Don't aggregate columns that are in the groupBy
          if (existingGroupBy.includes(column.id)) {
            values[column.id] = groupedRows[0] ? groupedRows[0].values[column.id] : null;
            return;
          } // Aggregate the values


          var aggregateFn = typeof column.aggregate === 'function' ? column.aggregate : userAggregations[column.aggregate] || aggregations[column.aggregate];

          if (aggregateFn) {
            // Get the columnValues to aggregate
            var groupedValues = groupedRows.map(function (row) {
              return row.values[column.id];
            }); // Get the columnValues to aggregate

            var leafValues = leafRows.map(function (row) {
              var columnValue = row.values[column.id];

              if (!depth && column.aggregateValue) {
                var aggregateValueFn = typeof column.aggregateValue === 'function' ? column.aggregateValue : userAggregations[column.aggregateValue] || aggregations[column.aggregateValue];

                if (!aggregateValueFn) {
                  console.info({
                    column: column
                  });
                  throw new Error("React Table: Invalid column.aggregateValue option for column listed above");
                }

                columnValue = aggregateValueFn(columnValue, row, column);
              }

              return columnValue;
            });
            values[column.id] = aggregateFn(leafValues, groupedValues);
          } else if (column.aggregate) {
            console.info({
              column: column
            });
            throw new Error("React Table: Invalid column.aggregate option for column listed above");
          } else {
            values[column.id] = null;
          }
        });
        return values;
      };

      var groupedFlatRows = [];
      var groupedRowsById = {};
      var onlyGroupedFlatRows = [];
      var onlyGroupedRowsById = {};
      var nonGroupedFlatRows = [];
      var nonGroupedRowsById = {}; // Recursively group the data

      var groupUpRecursively = function groupUpRecursively(rows, depth, parentId) {
        if (depth === void 0) {
          depth = 0;
        }

        // This is the last level, just return the rows
        if (depth === existingGroupBy.length) {
          return rows.map(function (row) {
            return _extends({}, row, {
              depth: depth
            });
          });
        }

        var columnId = existingGroupBy[depth]; // Group the rows together for this level

        var rowGroupsMap = groupByFn(rows, columnId); // Peform aggregations for each group

        var aggregatedGroupedRows = Object.entries(rowGroupsMap).map(function (_ref4, index) {
          var groupByVal = _ref4[0],
              groupedRows = _ref4[1];
          var id = columnId + ":" + groupByVal;
          id = parentId ? parentId + ">" + id : id; // First, Recurse to group sub rows before aggregation

          var subRows = groupUpRecursively(groupedRows, depth + 1, id); // Flatten the leaf rows of the rows in this group

          var leafRows = depth ? flattenBy(groupedRows, 'leafRows') : groupedRows;
          var values = aggregateRowsToValues(leafRows, groupedRows, depth);
          var row = {
            id: id,
            isGrouped: true,
            groupByID: columnId,
            groupByVal: groupByVal,
            values: values,
            subRows: subRows,
            leafRows: leafRows,
            depth: depth,
            index: index
          };
          subRows.forEach(function (subRow) {
            groupedFlatRows.push(subRow);
            groupedRowsById[subRow.id] = subRow;

            if (subRow.isGrouped) {
              onlyGroupedFlatRows.push(subRow);
              onlyGroupedRowsById[subRow.id] = subRow;
            } else {
              nonGroupedFlatRows.push(subRow);
              nonGroupedRowsById[subRow.id] = subRow;
            }
          });
          return row;
        });
        return aggregatedGroupedRows;
      };

      var groupedRows = groupUpRecursively(rows);
      groupedRows.forEach(function (subRow) {
        groupedFlatRows.push(subRow);
        groupedRowsById[subRow.id] = subRow;

        if (subRow.isGrouped) {
          onlyGroupedFlatRows.push(subRow);
          onlyGroupedRowsById[subRow.id] = subRow;
        } else {
          nonGroupedFlatRows.push(subRow);
          nonGroupedRowsById[subRow.id] = subRow;
        }
      }); // Assign the new data

      return [groupedRows, groupedFlatRows, groupedRowsById, onlyGroupedFlatRows, onlyGroupedRowsById, nonGroupedFlatRows, nonGroupedRowsById];
    }, [manualGroupBy, groupBy, rows, flatRows, rowsById, allColumns, userAggregations, groupByFn]),
        groupedRows = _React$useMemo[0],
        groupedFlatRows = _React$useMemo[1],
        groupedRowsById = _React$useMemo[2],
        onlyGroupedFlatRows = _React$useMemo[3],
        onlyGroupedRowsById = _React$useMemo[4],
        nonGroupedFlatRows = _React$useMemo[5],
        nonGroupedRowsById = _React$useMemo[6];

    var getAutoResetGroupBy = useGetLatest(autoResetGroupBy);
    useMountedLayoutEffect(function () {
      if (getAutoResetGroupBy()) {
        dispatch({
          type: actions.resetGroupBy
        });
      }
    }, [dispatch, manualGroupBy ? null : data]);
    Object.assign(instance, {
      preGroupedRows: rows,
      preGroupedFlatRow: flatRows,
      preGroupedRowsById: rowsById,
      groupedRows: groupedRows,
      groupedFlatRows: groupedFlatRows,
      groupedRowsById: groupedRowsById,
      onlyGroupedFlatRows: onlyGroupedFlatRows,
      onlyGroupedRowsById: onlyGroupedRowsById,
      nonGroupedFlatRows: nonGroupedFlatRows,
      nonGroupedRowsById: nonGroupedRowsById,
      rows: groupedRows,
      flatRows: groupedFlatRows,
      rowsById: groupedRowsById,
      toggleGroupBy: toggleGroupBy,
      setGroupBy: setGroupBy
    });
  }

  function prepareRow$1(row) {
    row.allCells.forEach(function (cell) {
      var _row$subRows;

      // Grouped cells are in the groupBy and the pivot cell for the row
      cell.isGrouped = cell.column.isGrouped && cell.column.id === row.groupByID; // Placeholder cells are any columns in the groupBy that are not grouped

      cell.isPlaceholder = !cell.isGrouped && cell.column.isGrouped; // Aggregated cells are not grouped, not repeated, but still have subRows

      cell.isAggregated = !cell.isGrouped && !cell.isPlaceholder && ((_row$subRows = row.subRows) == null ? void 0 : _row$subRows.length);
    });
  }

  function defaultGroupByFn(rows, columnId) {
    return rows.reduce(function (prev, row, i) {
      // TODO: Might want to implement a key serializer here so
      // irregular column values can still be grouped if needed?
      var resKey = "" + row.values[columnId];
      prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
      prev[resKey].push(row);
      return prev;
    }, {});
  }

  var reSplitAlphaNumeric = /([0-9]+)/gm; // Mixed sorting is slow, but very inclusive of many edge cases.
  // It handles numbers, mixed alphanumeric combinations, and even
  // null, undefined, and Infinity

  var alphanumeric = function alphanumeric(rowA, rowB, columnId) {
    var _getRowValuesByColumn = getRowValuesByColumnID(rowA, rowB, columnId),
        a = _getRowValuesByColumn[0],
        b = _getRowValuesByColumn[1]; // Force to strings (or "" for unsupported types)


    a = toString(a);
    b = toString(b); // Split on number groups, but keep the delimiter
    // Then remove falsey split values

    a = a.split(reSplitAlphaNumeric).filter(Boolean);
    b = b.split(reSplitAlphaNumeric).filter(Boolean); // While

    while (a.length && b.length) {
      var aa = a.shift();
      var bb = b.shift();
      var an = parseInt(aa, 10);
      var bn = parseInt(bb, 10);
      var combo = [an, bn].sort(); // Both are string

      if (isNaN(combo[0])) {
        if (aa > bb) {
          return 1;
        }

        if (bb > aa) {
          return -1;
        }

        continue;
      } // One is a string, one is a number


      if (isNaN(combo[1])) {
        return isNaN(an) ? -1 : 1;
      } // Both are numbers


      if (an > bn) {
        return 1;
      }

      if (bn > an) {
        return -1;
      }
    }

    return a.length - b.length;
  };
  function datetime(rowA, rowB, columnId) {
    var _getRowValuesByColumn2 = getRowValuesByColumnID(rowA, rowB, columnId),
        a = _getRowValuesByColumn2[0],
        b = _getRowValuesByColumn2[1];

    a = a.getTime();
    b = b.getTime();
    return compareBasic(a, b);
  }
  function basic(rowA, rowB, columnId) {
    var _getRowValuesByColumn3 = getRowValuesByColumnID(rowA, rowB, columnId),
        a = _getRowValuesByColumn3[0],
        b = _getRowValuesByColumn3[1];

    return compareBasic(a, b);
  }
  function string(rowA, rowB, columnId) {
    var _getRowValuesByColumn4 = getRowValuesByColumnID(rowA, rowB, columnId),
        a = _getRowValuesByColumn4[0],
        b = _getRowValuesByColumn4[1];

    a = a.split('').filter(Boolean);
    b = b.split('').filter(Boolean);

    while (a.length && b.length) {
      var aa = a.shift();
      var bb = b.shift();
      var alower = aa.toLowerCase();
      var blower = bb.toLowerCase(); // Case insensitive comparison until characters match

      if (alower > blower) {
        return 1;
      }

      if (blower > alower) {
        return -1;
      } // If lowercase characters are identical


      if (aa > bb) {
        return 1;
      }

      if (bb > aa) {
        return -1;
      }

      continue;
    }

    return a.length - b.length;
  }
  function number(rowA, rowB, columnId) {
    var _getRowValuesByColumn5 = getRowValuesByColumnID(rowA, rowB, columnId),
        a = _getRowValuesByColumn5[0],
        b = _getRowValuesByColumn5[1];

    var replaceNonNumeric = /[^0-9.]/gi;
    a = Number(String(a).replace(replaceNonNumeric, ''));
    b = Number(String(b).replace(replaceNonNumeric, ''));
    return compareBasic(a, b);
  } // Utils

  function compareBasic(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
  }

  function getRowValuesByColumnID(row1, row2, columnId) {
    return [row1.values[columnId], row2.values[columnId]];
  }

  function toString(a) {
    if (typeof a === 'number') {
      if (isNaN(a) || a === Infinity || a === -Infinity) {
        return '';
      }

      return String(a);
    }

    if (typeof a === 'string') {
      return a;
    }

    return '';
  }

  var sortTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    alphanumeric: alphanumeric,
    datetime: datetime,
    basic: basic,
    string: string,
    number: number
  });

  actions.resetSortBy = 'resetSortBy';
  actions.setSortBy = 'setSortBy';
  actions.toggleSortBy = 'toggleSortBy';
  actions.clearSortBy = 'clearSortBy';
  defaultColumn.sortType = 'alphanumeric';
  defaultColumn.sortDescFirst = false;
  var useSortBy = function useSortBy(hooks) {
    hooks.getSortByToggleProps = [defaultGetSortByToggleProps];
    hooks.stateReducers.push(reducer$5);
    hooks.useInstance.push(useInstance$5);
  };
  useSortBy.pluginName = 'useSortBy';

  var defaultGetSortByToggleProps = function defaultGetSortByToggleProps(props, _ref) {
    var instance = _ref.instance,
        column = _ref.column;
    var _instance$isMultiSort = instance.isMultiSortEvent,
        isMultiSortEvent = _instance$isMultiSort === void 0 ? function (e) {
      return e.shiftKey;
    } : _instance$isMultiSort;
    return [props, {
      onClick: column.canSort ? function (e) {
        e.persist();
        column.toggleSortBy(undefined, !instance.disableMultiSort && isMultiSortEvent(e));
      } : undefined,
      style: {
        cursor: column.canSort ? 'pointer' : undefined
      },
      title: column.canSort ? 'Toggle SortBy' : undefined
    }];
  }; // Reducer


  function reducer$5(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        sortBy: []
      }, state);
    }

    if (action.type === actions.resetSortBy) {
      return _extends({}, state, {
        sortBy: instance.initialState.sortBy || []
      });
    }

    if (action.type === actions.clearSortBy) {
      var sortBy = state.sortBy;
      var newSortBy = sortBy.filter(function (d) {
        return d.id !== action.columnId;
      });
      return _extends({}, state, {
        sortBy: newSortBy
      });
    }

    if (action.type === actions.setSortBy) {
      var _sortBy = action.sortBy;
      return _extends({}, state, {
        sortBy: _sortBy
      });
    }

    if (action.type === actions.toggleSortBy) {
      var columnId = action.columnId,
          desc = action.desc,
          multi = action.multi;
      var allColumns = instance.allColumns,
          disableMultiSort = instance.disableMultiSort,
          disableSortRemove = instance.disableSortRemove,
          disableMultiRemove = instance.disableMultiRemove,
          _instance$maxMultiSor = instance.maxMultiSortColCount,
          maxMultiSortColCount = _instance$maxMultiSor === void 0 ? Number.MAX_SAFE_INTEGER : _instance$maxMultiSor;
      var _sortBy2 = state.sortBy; // Find the column for this columnId

      var column = allColumns.find(function (d) {
        return d.id === columnId;
      });
      var sortDescFirst = column.sortDescFirst; // Find any existing sortBy for this column

      var existingSortBy = _sortBy2.find(function (d) {
        return d.id === columnId;
      });

      var existingIndex = _sortBy2.findIndex(function (d) {
        return d.id === columnId;
      });

      var hasDescDefined = typeof desc !== 'undefined' && desc !== null;
      var _newSortBy = []; // What should we do with this sort action?

      var sortAction;

      if (!disableMultiSort && multi) {
        if (existingSortBy) {
          sortAction = 'toggle';
        } else {
          sortAction = 'add';
        }
      } else {
        // Normal mode
        if (existingIndex !== _sortBy2.length - 1 || _sortBy2.length !== 1) {
          sortAction = 'replace';
        } else if (existingSortBy) {
          sortAction = 'toggle';
        } else {
          sortAction = 'replace';
        }
      } // Handle toggle states that will remove the sortBy


      if (sortAction === 'toggle' && // Must be toggling
      !disableSortRemove && // If disableSortRemove, disable in general
      !hasDescDefined && ( // Must not be setting desc
      multi ? !disableMultiRemove : true) && ( // If multi, don't allow if disableMultiRemove
      existingSortBy && // Finally, detect if it should indeed be removed
      existingSortBy.desc && !sortDescFirst || !existingSortBy.desc && sortDescFirst)) {
        sortAction = 'remove';
      }

      if (sortAction === 'replace') {
        _newSortBy = [{
          id: columnId,
          desc: hasDescDefined ? desc : sortDescFirst
        }];
      } else if (sortAction === 'add') {
        _newSortBy = [].concat(_sortBy2, [{
          id: columnId,
          desc: hasDescDefined ? desc : sortDescFirst
        }]); // Take latest n columns

        _newSortBy.splice(0, _newSortBy.length - maxMultiSortColCount);
      } else if (sortAction === 'toggle') {
        // This flips (or sets) the
        _newSortBy = _sortBy2.map(function (d) {
          if (d.id === columnId) {
            return _extends({}, d, {
              desc: hasDescDefined ? desc : !existingSortBy.desc
            });
          }

          return d;
        });
      } else if (sortAction === 'remove') {
        _newSortBy = _sortBy2.filter(function (d) {
          return d.id !== columnId;
        });
      }

      return _extends({}, state, {
        sortBy: _newSortBy
      });
    }
  }

  function useInstance$5(instance) {
    var data = instance.data,
        rows = instance.rows,
        flatRows = instance.flatRows,
        allColumns = instance.allColumns,
        _instance$orderByFn = instance.orderByFn,
        orderByFn = _instance$orderByFn === void 0 ? defaultOrderByFn : _instance$orderByFn,
        userSortTypes = instance.sortTypes,
        manualSortBy = instance.manualSortBy,
        defaultCanSort = instance.defaultCanSort,
        disableSortBy = instance.disableSortBy,
        flatHeaders = instance.flatHeaders,
        sortBy = instance.state.sortBy,
        dispatch = instance.dispatch,
        plugins = instance.plugins,
        getHooks = instance.getHooks,
        _instance$autoResetSo = instance.autoResetSortBy,
        autoResetSortBy = _instance$autoResetSo === void 0 ? true : _instance$autoResetSo;
    ensurePluginOrder(plugins, ['useFilters', 'useGlobalFilter', 'useGroupBy', 'usePivotColumns'], 'useSortBy');
    var setSortBy = React.useCallback(function (sortBy) {
      dispatch({
        type: actions.setSortBy,
        sortBy: sortBy
      });
    }, [dispatch]); // Updates sorting based on a columnId, desc flag and multi flag

    var toggleSortBy = React.useCallback(function (columnId, desc, multi) {
      dispatch({
        type: actions.toggleSortBy,
        columnId: columnId,
        desc: desc,
        multi: multi
      });
    }, [dispatch]); // use reference to avoid memory leak in #1608

    var getInstance = useGetLatest(instance); // Add the getSortByToggleProps method to columns and headers

    flatHeaders.forEach(function (column) {
      var accessor = column.accessor,
          defaultColumnCanSort = column.canSort,
          columnDisableSortBy = column.disableSortBy,
          id = column.id;
      var canSort = accessor ? getFirstDefined(columnDisableSortBy === true ? false : undefined, disableSortBy === true ? false : undefined, true) : getFirstDefined(defaultCanSort, defaultColumnCanSort, false);
      column.canSort = canSort;

      if (column.canSort) {
        column.toggleSortBy = function (desc, multi) {
          return toggleSortBy(column.id, desc, multi);
        };

        column.clearSortBy = function () {
          dispatch({
            type: actions.clearSortBy,
            columnId: column.id
          });
        };
      }

      column.getSortByToggleProps = makePropGetter(getHooks().getSortByToggleProps, {
        instance: getInstance(),
        column: column
      });
      var columnSort = sortBy.find(function (d) {
        return d.id === id;
      });
      column.isSorted = !!columnSort;
      column.sortedIndex = sortBy.findIndex(function (d) {
        return d.id === id;
      });
      column.isSortedDesc = column.isSorted ? columnSort.desc : undefined;
    });

    var _React$useMemo = React.useMemo(function () {
      if (manualSortBy || !sortBy.length) {
        return [rows, flatRows];
      }

      var sortedFlatRows = []; // Filter out sortBys that correspond to non existing columns

      var availableSortBy = sortBy.filter(function (sort) {
        return allColumns.find(function (col) {
          return col.id === sort.id;
        });
      });

      var sortData = function sortData(rows) {
        // Use the orderByFn to compose multiple sortBy's together.
        // This will also perform a stable sorting using the row index
        // if needed.
        var sortedData = orderByFn(rows, availableSortBy.map(function (sort) {
          // Support custom sorting methods for each column
          var column = allColumns.find(function (d) {
            return d.id === sort.id;
          });

          if (!column) {
            throw new Error("React-Table: Could not find a column with id: " + sort.id + " while sorting");
          }

          var sortType = column.sortType; // Look up sortBy functions in this order:
          // column function
          // column string lookup on user sortType
          // column string lookup on built-in sortType
          // default function
          // default string lookup on user sortType
          // default string lookup on built-in sortType

          var sortMethod = isFunction(sortType) || (userSortTypes || {})[sortType] || sortTypes[sortType];

          if (!sortMethod) {
            throw new Error("React-Table: Could not find a valid sortType of '" + sortType + "' for column '" + sort.id + "'.");
          } // Return the correct sortFn.
          // This function should always return in ascending order


          return function (a, b) {
            return sortMethod(a, b, sort.id, sort.desc);
          };
        }), // Map the directions
        availableSortBy.map(function (sort) {
          // Detect and use the sortInverted option
          var column = allColumns.find(function (d) {
            return d.id === sort.id;
          });

          if (column && column.sortInverted) {
            return sort.desc;
          }

          return !sort.desc;
        })); // If there are sub-rows, sort them

        sortedData.forEach(function (row) {
          sortedFlatRows.push(row);

          if (!row.subRows || row.subRows.length === 0) {
            return;
          }

          row.subRows = sortData(row.subRows);
        });
        return sortedData;
      };

      return [sortData(rows), sortedFlatRows];
    }, [manualSortBy, sortBy, rows, flatRows, allColumns, orderByFn, userSortTypes]),
        sortedRows = _React$useMemo[0],
        sortedFlatRows = _React$useMemo[1];

    var getAutoResetSortBy = useGetLatest(autoResetSortBy);
    useMountedLayoutEffect(function () {
      if (getAutoResetSortBy()) {
        dispatch({
          type: actions.resetSortBy
        });
      }
    }, [manualSortBy ? null : data]);
    Object.assign(instance, {
      preSortedRows: rows,
      preSortedFlatRows: flatRows,
      sortedRows: sortedRows,
      sortedFlatRows: sortedFlatRows,
      rows: sortedRows,
      flatRows: sortedFlatRows,
      setSortBy: setSortBy,
      toggleSortBy: toggleSortBy
    });
  }

  function defaultOrderByFn(arr, funcs, dirs) {
    return [].concat(arr).sort(function (rowA, rowB) {
      for (var i = 0; i < funcs.length; i += 1) {
        var sortFn = funcs[i];
        var desc = dirs[i] === false || dirs[i] === 'desc';
        var sortInt = sortFn(rowA, rowB);

        if (sortInt !== 0) {
          return desc ? -sortInt : sortInt;
        }
      }

      return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
    });
  }

  var pluginName = 'usePagination'; // Actions

  actions.resetPage = 'resetPage';
  actions.gotoPage = 'gotoPage';
  actions.setPageSize = 'setPageSize';
  var usePagination = function usePagination(hooks) {
    hooks.stateReducers.push(reducer$6);
    hooks.useInstance.push(useInstance$6);
  };
  usePagination.pluginName = pluginName;

  function reducer$6(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        pageSize: 10,
        pageIndex: 0
      }, state);
    }

    if (action.type === actions.resetPage) {
      return _extends({}, state, {
        pageIndex: instance.initialState.pageIndex || 0
      });
    }

    if (action.type === actions.gotoPage) {
      var pageCount = instance.pageCount,
          page = instance.page;
      var newPageIndex = functionalUpdate(action.pageIndex, state.pageIndex);
      var canNavigate = false;

      if (newPageIndex > state.pageIndex) {
        // next page
        canNavigate = pageCount === -1 ? page.length >= state.pageSize : newPageIndex < pageCount;
      } else if (newPageIndex < state.pageIndex) {
        // prev page
        canNavigate = newPageIndex > -1;
      }

      if (!canNavigate) {
        return state;
      }

      return _extends({}, state, {
        pageIndex: newPageIndex
      });
    }

    if (action.type === actions.setPageSize) {
      var pageSize = action.pageSize;
      var topRowIndex = state.pageSize * state.pageIndex;
      var pageIndex = Math.floor(topRowIndex / pageSize);
      return _extends({}, state, {
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    }
  }

  function useInstance$6(instance) {
    var rows = instance.rows,
        _instance$autoResetPa = instance.autoResetPage,
        autoResetPage = _instance$autoResetPa === void 0 ? true : _instance$autoResetPa,
        _instance$manualExpan = instance.manualExpandedKey,
        manualExpandedKey = _instance$manualExpan === void 0 ? 'expanded' : _instance$manualExpan,
        plugins = instance.plugins,
        userPageCount = instance.pageCount,
        _instance$paginateExp = instance.paginateExpandedRows,
        paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp,
        _instance$expandSubRo = instance.expandSubRows,
        expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo,
        _instance$state = instance.state,
        pageSize = _instance$state.pageSize,
        pageIndex = _instance$state.pageIndex,
        expanded = _instance$state.expanded,
        globalFilter = _instance$state.globalFilter,
        filters = _instance$state.filters,
        groupBy = _instance$state.groupBy,
        sortBy = _instance$state.sortBy,
        dispatch = instance.dispatch,
        data = instance.data,
        manualPagination = instance.manualPagination;
    ensurePluginOrder(plugins, ['useGlobalFilter', 'useFilters', 'useGroupBy', 'useSortBy', 'useExpanded'], 'usePagination');
    var getAutoResetPage = useGetLatest(autoResetPage);
    useMountedLayoutEffect(function () {
      if (getAutoResetPage()) {
        dispatch({
          type: actions.resetPage
        });
      }
    }, [dispatch, manualPagination ? null : data, globalFilter, filters, groupBy, sortBy]);
    var pageCount = manualPagination ? userPageCount : Math.ceil(rows.length / pageSize);
    var pageOptions = React.useMemo(function () {
      return pageCount > 0 ? [].concat(new Array(pageCount)).fill(null).map(function (d, i) {
        return i;
      }) : [];
    }, [pageCount]);
    var page = React.useMemo(function () {
      var page;

      if (manualPagination) {
        page = rows;
      } else {
        var pageStart = pageSize * pageIndex;
        var pageEnd = pageStart + pageSize;
        page = rows.slice(pageStart, pageEnd);
      }

      if (paginateExpandedRows) {
        return page;
      }

      return expandRows(page, {
        manualExpandedKey: manualExpandedKey,
        expanded: expanded,
        expandSubRows: expandSubRows
      });
    }, [expandSubRows, expanded, manualExpandedKey, manualPagination, pageIndex, pageSize, paginateExpandedRows, rows]);
    var canPreviousPage = pageIndex > 0;
    var canNextPage = pageCount === -1 ? page.length >= pageSize : pageIndex < pageCount - 1;
    var gotoPage = React.useCallback(function (pageIndex) {
      dispatch({
        type: actions.gotoPage,
        pageIndex: pageIndex
      });
    }, [dispatch]);
    var previousPage = React.useCallback(function () {
      return gotoPage(function (old) {
        return old - 1;
      });
    }, [gotoPage]);
    var nextPage = React.useCallback(function () {
      return gotoPage(function (old) {
        return old + 1;
      });
    }, [gotoPage]);
    var setPageSize = React.useCallback(function (pageSize) {
      dispatch({
        type: actions.setPageSize,
        pageSize: pageSize
      });
    }, [dispatch]);
    Object.assign(instance, {
      pageOptions: pageOptions,
      pageCount: pageCount,
      page: page,
      canPreviousPage: canPreviousPage,
      canNextPage: canNextPage,
      gotoPage: gotoPage,
      previousPage: previousPage,
      nextPage: nextPage,
      setPageSize: setPageSize
    });
  }

  actions.resetPivot = 'resetPivot';
  actions.togglePivot = 'togglePivot';
  var _UNSTABLE_usePivotColumns = function _UNSTABLE_usePivotColumns(hooks) {
    hooks.getPivotToggleProps = [defaultGetPivotToggleProps];
    hooks.stateReducers.push(reducer$7);
    hooks.useInstanceAfterData.push(useInstanceAfterData);
    hooks.allColumns.push(allColumns);
    hooks.accessValue.push(accessValue);
    hooks.materializedColumns.push(materializedColumns);
    hooks.materializedColumnsDeps.push(materializedColumnsDeps);
    hooks.visibleColumns.push(visibleColumns$1);
    hooks.visibleColumnsDeps.push(visibleColumnsDeps);
    hooks.useInstance.push(useInstance$7);
    hooks.prepareRow.push(prepareRow$2);
  };
  _UNSTABLE_usePivotColumns.pluginName = 'usePivotColumns';
  var defaultPivotColumns = [];

  var defaultGetPivotToggleProps = function defaultGetPivotToggleProps(props, _ref) {
    var header = _ref.header;
    return [props, {
      onClick: header.canPivot ? function (e) {
        e.persist();
        header.togglePivot();
      } : undefined,
      style: {
        cursor: header.canPivot ? 'pointer' : undefined
      },
      title: 'Toggle Pivot'
    }];
  }; // Reducer


  function reducer$7(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        pivotColumns: defaultPivotColumns
      }, state);
    }

    if (action.type === actions.resetPivot) {
      return _extends({}, state, {
        pivotColumns: instance.initialState.pivotColumns || defaultPivotColumns
      });
    }

    if (action.type === actions.togglePivot) {
      var columnId = action.columnId,
          setPivot = action.value;
      var resolvedPivot = typeof setPivot !== 'undefined' ? setPivot : !state.pivotColumns.includes(columnId);

      if (resolvedPivot) {
        return _extends({}, state, {
          pivotColumns: [].concat(state.pivotColumns, [columnId])
        });
      }

      return _extends({}, state, {
        pivotColumns: state.pivotColumns.filter(function (d) {
          return d !== columnId;
        })
      });
    }
  }

  function useInstanceAfterData(instance) {
    instance.allColumns.forEach(function (column) {
      column.isPivotSource = instance.state.pivotColumns.includes(column.id);
    });
  }

  function allColumns(columns, _ref2) {
    var instance = _ref2.instance;
    columns.forEach(function (column) {
      column.isPivotSource = instance.state.pivotColumns.includes(column.id);
      column.uniqueValues = new Set();
    });
    return columns;
  }

  function accessValue(value, _ref3) {
    var column = _ref3.column;

    if (column.uniqueValues && typeof value !== 'undefined') {
      column.uniqueValues.add(value);
    }

    return value;
  }

  function materializedColumns(materialized, _ref4) {
    var instance = _ref4.instance;
    var allColumns = instance.allColumns,
        state = instance.state;

    if (!state.pivotColumns.length || !state.groupBy || !state.groupBy.length) {
      return materialized;
    }

    var pivotColumns = state.pivotColumns.map(function (id) {
      return allColumns.find(function (d) {
        return d.id === id;
      });
    }).filter(Boolean);
    var sourceColumns = allColumns.filter(function (d) {
      return !d.isPivotSource && !state.groupBy.includes(d.id) && !state.pivotColumns.includes(d.id);
    });

    var buildPivotColumns = function buildPivotColumns(depth, parent, pivotFilters) {
      if (depth === void 0) {
        depth = 0;
      }

      if (pivotFilters === void 0) {
        pivotFilters = [];
      }

      var pivotColumn = pivotColumns[depth];

      if (!pivotColumn) {
        return sourceColumns.map(function (sourceColumn) {
          // TODO: We could offer support here for renesting pivoted
          // columns inside copies of their header groups. For now,
          // that seems like it would be (1) overkill on nesting, considering
          // you already get nesting for every pivot level and (2)
          // really hard. :)
          return _extends({}, sourceColumn, {
            canPivot: false,
            isPivoted: true,
            parent: parent,
            depth: depth,
            id: "" + (parent ? parent.id + "." + sourceColumn.id : sourceColumn.id),
            accessor: function accessor(originalRow, i, row) {
              if (pivotFilters.every(function (filter) {
                return filter(row);
              })) {
                return row.values[sourceColumn.id];
              }
            }
          });
        });
      }

      var uniqueValues = Array.from(pivotColumn.uniqueValues).sort();
      return uniqueValues.map(function (uniqueValue) {
        var columnGroup = _extends({}, pivotColumn, {
          Header: pivotColumn.PivotHeader || typeof pivotColumn.header === 'string' ? pivotColumn.Header + ": " + uniqueValue : uniqueValue,
          isPivotGroup: true,
          parent: parent,
          depth: depth,
          id: parent ? parent.id + "." + pivotColumn.id + "." + uniqueValue : pivotColumn.id + "." + uniqueValue,
          pivotValue: uniqueValue
        });

        columnGroup.columns = buildPivotColumns(depth + 1, columnGroup, [].concat(pivotFilters, [function (row) {
          return row.values[pivotColumn.id] === uniqueValue;
        }]));
        return columnGroup;
      });
    };

    var newMaterialized = flattenColumns(buildPivotColumns());
    return [].concat(materialized, newMaterialized);
  }

  function materializedColumnsDeps(deps, _ref5) {
    var _ref5$instance$state = _ref5.instance.state,
        pivotColumns = _ref5$instance$state.pivotColumns,
        groupBy = _ref5$instance$state.groupBy;
    return [].concat(deps, [pivotColumns, groupBy]);
  }

  function visibleColumns$1(visibleColumns, _ref6) {
    var state = _ref6.instance.state;
    visibleColumns = visibleColumns.filter(function (d) {
      return !d.isPivotSource;
    });

    if (state.pivotColumns.length && state.groupBy && state.groupBy.length) {
      visibleColumns = visibleColumns.filter(function (column) {
        return column.isGrouped || column.isPivoted;
      });
    }

    return visibleColumns;
  }

  function visibleColumnsDeps(deps, _ref7) {
    var instance = _ref7.instance;
    return [].concat(deps, [instance.state.pivotColumns, instance.state.groupBy]);
  }

  function useInstance$7(instance) {
    var columns = instance.columns,
        allColumns = instance.allColumns,
        flatHeaders = instance.flatHeaders,
        getHooks = instance.getHooks,
        plugins = instance.plugins,
        dispatch = instance.dispatch,
        _instance$autoResetPi = instance.autoResetPivot,
        autoResetPivot = _instance$autoResetPi === void 0 ? true : _instance$autoResetPi,
        manaulPivot = instance.manaulPivot,
        disablePivot = instance.disablePivot,
        defaultCanPivot = instance.defaultCanPivot;
    ensurePluginOrder(plugins, ['useGroupBy'], 'usePivotColumns');
    var getInstance = useGetLatest(instance);
    allColumns.forEach(function (column) {
      var accessor = column.accessor,
          defaultColumnPivot = column.defaultPivot,
          columnDisablePivot = column.disablePivot;
      column.canPivot = accessor ? getFirstDefined(column.canPivot, columnDisablePivot === true ? false : undefined, disablePivot === true ? false : undefined, true) : getFirstDefined(column.canPivot, defaultColumnPivot, defaultCanPivot, false);

      if (column.canPivot) {
        column.togglePivot = function () {
          return instance.togglePivot(column.id);
        };
      }

      column.Aggregated = column.Aggregated || column.Cell;
    });

    var togglePivot = function togglePivot(columnId, value) {
      dispatch({
        type: actions.togglePivot,
        columnId: columnId,
        value: value
      });
    };

    flatHeaders.forEach(function (header) {
      header.getPivotToggleProps = makePropGetter(getHooks().getPivotToggleProps, {
        instance: getInstance(),
        header: header
      });
    });
    var getAutoResetPivot = useGetLatest(autoResetPivot);
    useMountedLayoutEffect(function () {
      if (getAutoResetPivot()) {
        dispatch({
          type: actions.resetPivot
        });
      }
    }, [dispatch, manaulPivot ? null : columns]);
    Object.assign(instance, {
      togglePivot: togglePivot
    });
  }

  function prepareRow$2(row) {
    row.allCells.forEach(function (cell) {
      // Grouped cells are in the pivotColumns and the pivot cell for the row
      cell.isPivoted = cell.column.isPivoted;
    });
  }

  var pluginName$1 = 'useRowSelect'; // Actions

  actions.resetSelectedRows = 'resetSelectedRows';
  actions.toggleAllRowsSelected = 'toggleAllRowsSelected';
  actions.toggleRowSelected = 'toggleRowSelected';
  actions.toggleAllPageRowsSelected = 'toggleAllPageRowsSelected';
  var useRowSelect = function useRowSelect(hooks) {
    hooks.getToggleRowSelectedProps = [defaultGetToggleRowSelectedProps];
    hooks.getToggleAllRowsSelectedProps = [defaultGetToggleAllRowsSelectedProps];
    hooks.getToggleAllPageRowsSelectedProps = [defaultGetToggleAllPageRowsSelectedProps];
    hooks.stateReducers.push(reducer$8);
    hooks.useInstance.push(useInstance$8);
    hooks.prepareRow.push(prepareRow$3);
  };
  useRowSelect.pluginName = pluginName$1;

  var defaultGetToggleRowSelectedProps = function defaultGetToggleRowSelectedProps(props, _ref) {
    var instance = _ref.instance,
        row = _ref.row;
    var _instance$manualRowSe = instance.manualRowSelectedKey,
        manualRowSelectedKey = _instance$manualRowSe === void 0 ? 'isSelected' : _instance$manualRowSe;
    var checked = false;

    if (row.original && row.original[manualRowSelectedKey]) {
      checked = true;
    } else {
      checked = row.isSelected;
    }

    return [props, {
      onChange: function onChange(e) {
        row.toggleRowSelected(e.target.checked);
      },
      style: {
        cursor: 'pointer'
      },
      checked: checked,
      title: 'Toggle Row Selected',
      indeterminate: row.isSomeSelected
    }];
  };

  var defaultGetToggleAllRowsSelectedProps = function defaultGetToggleAllRowsSelectedProps(props, _ref2) {
    var instance = _ref2.instance;
    return [props, {
      onChange: function onChange(e) {
        instance.toggleAllRowsSelected(e.target.checked);
      },
      style: {
        cursor: 'pointer'
      },
      checked: instance.isAllRowsSelected,
      title: 'Toggle All Rows Selected',
      indeterminate: Boolean(!instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length)
    }];
  };

  var defaultGetToggleAllPageRowsSelectedProps = function defaultGetToggleAllPageRowsSelectedProps(props, _ref3) {
    var instance = _ref3.instance;
    return [props, {
      onChange: function onChange(e) {
        instance.toggleAllPageRowsSelected(e.target.checked);
      },
      style: {
        cursor: 'pointer'
      },
      checked: instance.isAllPageRowsSelected,
      title: 'Toggle All Current Page Rows Selected',
      indeterminate: Boolean(!instance.isAllPageRowsSelected && instance.page.some(function (_ref4) {
        var id = _ref4.id;
        return instance.state.selectedRowIds[id];
      }))
    }];
  }; // eslint-disable-next-line max-params


  function reducer$8(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        selectedRowIds: {}
      }, state);
    }

    if (action.type === actions.resetSelectedRows) {
      return _extends({}, state, {
        selectedRowIds: instance.initialState.selectedRowIds || {}
      });
    }

    if (action.type === actions.toggleAllRowsSelected) {
      var setSelected = action.value;
      var isAllRowsSelected = instance.isAllRowsSelected,
          rowsById = instance.rowsById,
          _instance$nonGroupedR = instance.nonGroupedRowsById,
          nonGroupedRowsById = _instance$nonGroupedR === void 0 ? rowsById : _instance$nonGroupedR;
      var selectAll = typeof setSelected !== 'undefined' ? setSelected : !isAllRowsSelected; // Only remove/add the rows that are visible on the screen
      //  Leave all the other rows that are selected alone.

      var selectedRowIds = Object.assign({}, state.selectedRowIds);

      if (selectAll) {
        Object.keys(nonGroupedRowsById).forEach(function (rowId) {
          selectedRowIds[rowId] = true;
        });
      } else {
        Object.keys(nonGroupedRowsById).forEach(function (rowId) {
          delete selectedRowIds[rowId];
        });
      }

      return _extends({}, state, {
        selectedRowIds: selectedRowIds
      });
    }

    if (action.type === actions.toggleRowSelected) {
      var id = action.id,
          _setSelected = action.value;
      var _rowsById = instance.rowsById,
          _instance$selectSubRo = instance.selectSubRows,
          selectSubRows = _instance$selectSubRo === void 0 ? true : _instance$selectSubRo,
          getSubRows = instance.getSubRows;
      var isSelected = state.selectedRowIds[id];
      var shouldExist = typeof _setSelected !== 'undefined' ? _setSelected : !isSelected;

      if (isSelected === shouldExist) {
        return state;
      }

      var newSelectedRowIds = _extends({}, state.selectedRowIds);

      var handleRowById = function handleRowById(id) {
        var row = _rowsById[id];

        if (row) {
          if (!row.isGrouped) {
            if (shouldExist) {
              newSelectedRowIds[id] = true;
            } else {
              delete newSelectedRowIds[id];
            }
          }

          if (selectSubRows && getSubRows(row)) {
            return getSubRows(row).forEach(function (row) {
              return handleRowById(row.id);
            });
          }
        }
      };

      handleRowById(id);
      return _extends({}, state, {
        selectedRowIds: newSelectedRowIds
      });
    }

    if (action.type === actions.toggleAllPageRowsSelected) {
      var _setSelected2 = action.value;

      var page = instance.page,
          _rowsById2 = instance.rowsById,
          _instance$selectSubRo2 = instance.selectSubRows,
          _selectSubRows = _instance$selectSubRo2 === void 0 ? true : _instance$selectSubRo2,
          isAllPageRowsSelected = instance.isAllPageRowsSelected,
          _getSubRows = instance.getSubRows;

      var _selectAll = typeof _setSelected2 !== 'undefined' ? _setSelected2 : !isAllPageRowsSelected;

      var _newSelectedRowIds = _extends({}, state.selectedRowIds);

      var _handleRowById = function _handleRowById(id) {
        var row = _rowsById2[id];

        if (!row.isGrouped) {
          if (_selectAll) {
            _newSelectedRowIds[id] = true;
          } else {
            delete _newSelectedRowIds[id];
          }
        }

        if (_selectSubRows && _getSubRows(row)) {
          return _getSubRows(row).forEach(function (row) {
            return _handleRowById(row.id);
          });
        }
      };

      page.forEach(function (row) {
        return _handleRowById(row.id);
      });
      return _extends({}, state, {
        selectedRowIds: _newSelectedRowIds
      });
    }

    return state;
  }

  function useInstance$8(instance) {
    var data = instance.data,
        rows = instance.rows,
        getHooks = instance.getHooks,
        plugins = instance.plugins,
        rowsById = instance.rowsById,
        _instance$nonGroupedR2 = instance.nonGroupedRowsById,
        nonGroupedRowsById = _instance$nonGroupedR2 === void 0 ? rowsById : _instance$nonGroupedR2,
        _instance$autoResetSe = instance.autoResetSelectedRows,
        autoResetSelectedRows = _instance$autoResetSe === void 0 ? true : _instance$autoResetSe,
        selectedRowIds = instance.state.selectedRowIds,
        _instance$selectSubRo3 = instance.selectSubRows,
        selectSubRows = _instance$selectSubRo3 === void 0 ? true : _instance$selectSubRo3,
        dispatch = instance.dispatch,
        page = instance.page,
        getSubRows = instance.getSubRows;
    ensurePluginOrder(plugins, ['useFilters', 'useGroupBy', 'useSortBy', 'useExpanded', 'usePagination'], 'useRowSelect');
    var selectedFlatRows = React.useMemo(function () {
      var selectedFlatRows = [];
      rows.forEach(function (row) {
        var isSelected = selectSubRows ? getRowIsSelected(row, selectedRowIds, getSubRows) : !!selectedRowIds[row.id];
        row.isSelected = !!isSelected;
        row.isSomeSelected = isSelected === null;

        if (isSelected) {
          selectedFlatRows.push(row);
        }
      });
      return selectedFlatRows;
    }, [rows, selectSubRows, selectedRowIds, getSubRows]);
    var isAllRowsSelected = Boolean(Object.keys(nonGroupedRowsById).length && Object.keys(selectedRowIds).length);
    var isAllPageRowsSelected = isAllRowsSelected;

    if (isAllRowsSelected) {
      if (Object.keys(nonGroupedRowsById).some(function (id) {
        return !selectedRowIds[id];
      })) {
        isAllRowsSelected = false;
      }
    }

    if (!isAllRowsSelected) {
      if (page && page.length && page.some(function (_ref5) {
        var id = _ref5.id;
        return !selectedRowIds[id];
      })) {
        isAllPageRowsSelected = false;
      }
    }

    var getAutoResetSelectedRows = useGetLatest(autoResetSelectedRows);
    useMountedLayoutEffect(function () {
      if (getAutoResetSelectedRows()) {
        dispatch({
          type: actions.resetSelectedRows
        });
      }
    }, [dispatch, data]);
    var toggleAllRowsSelected = React.useCallback(function (value) {
      return dispatch({
        type: actions.toggleAllRowsSelected,
        value: value
      });
    }, [dispatch]);
    var toggleAllPageRowsSelected = React.useCallback(function (value) {
      return dispatch({
        type: actions.toggleAllPageRowsSelected,
        value: value
      });
    }, [dispatch]);
    var toggleRowSelected = React.useCallback(function (id, value) {
      return dispatch({
        type: actions.toggleRowSelected,
        id: id,
        value: value
      });
    }, [dispatch]);
    var getInstance = useGetLatest(instance);
    var getToggleAllRowsSelectedProps = makePropGetter(getHooks().getToggleAllRowsSelectedProps, {
      instance: getInstance()
    });
    var getToggleAllPageRowsSelectedProps = makePropGetter(getHooks().getToggleAllPageRowsSelectedProps, {
      instance: getInstance()
    });
    Object.assign(instance, {
      selectedFlatRows: selectedFlatRows,
      isAllRowsSelected: isAllRowsSelected,
      isAllPageRowsSelected: isAllPageRowsSelected,
      toggleRowSelected: toggleRowSelected,
      toggleAllRowsSelected: toggleAllRowsSelected,
      getToggleAllRowsSelectedProps: getToggleAllRowsSelectedProps,
      getToggleAllPageRowsSelectedProps: getToggleAllPageRowsSelectedProps,
      toggleAllPageRowsSelected: toggleAllPageRowsSelected
    });
  }

  function prepareRow$3(row, _ref6) {
    var instance = _ref6.instance;

    row.toggleRowSelected = function (set) {
      return instance.toggleRowSelected(row.id, set);
    };

    row.getToggleRowSelectedProps = makePropGetter(instance.getHooks().getToggleRowSelectedProps, {
      instance: instance,
      row: row
    });
  }

  function getRowIsSelected(row, selectedRowIds, getSubRows) {
    if (selectedRowIds[row.id]) {
      return true;
    }

    var subRows = getSubRows(row);

    if (subRows && subRows.length) {
      var allChildrenSelected = true;
      var someSelected = false;
      subRows.forEach(function (subRow) {
        // Bail out early if we know both of these
        if (someSelected && !allChildrenSelected) {
          return;
        }

        if (getRowIsSelected(subRow, selectedRowIds, getSubRows)) {
          someSelected = true;
        } else {
          allChildrenSelected = false;
        }
      });
      return allChildrenSelected ? true : someSelected ? null : false;
    }

    return false;
  }

  var defaultInitialRowStateAccessor = function defaultInitialRowStateAccessor(row) {
    return {};
  };

  var defaultInitialCellStateAccessor = function defaultInitialCellStateAccessor(cell) {
    return {};
  }; // Actions


  actions.setRowState = 'setRowState';
  actions.setCellState = 'setCellState';
  actions.resetRowState = 'resetRowState';
  var useRowState = function useRowState(hooks) {
    hooks.stateReducers.push(reducer$9);
    hooks.useInstance.push(useInstance$9);
    hooks.prepareRow.push(prepareRow$4);
  };
  useRowState.pluginName = 'useRowState';

  function reducer$9(state, action, previousState, instance) {
    var _instance$initialRowS = instance.initialRowStateAccessor,
        initialRowStateAccessor = _instance$initialRowS === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS,
        _instance$initialCell = instance.initialCellStateAccessor,
        initialCellStateAccessor = _instance$initialCell === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell,
        rowsById = instance.rowsById;

    if (action.type === actions.init) {
      return _extends({
        rowState: {}
      }, state);
    }

    if (action.type === actions.resetRowState) {
      return _extends({}, state, {
        rowState: instance.initialState.rowState || {}
      });
    }

    if (action.type === actions.setRowState) {
      var _extends2;

      var rowId = action.rowId,
          value = action.value;
      var oldRowState = typeof state.rowState[rowId] !== 'undefined' ? state.rowState[rowId] : initialRowStateAccessor(rowsById[rowId]);
      return _extends({}, state, {
        rowState: _extends({}, state.rowState, (_extends2 = {}, _extends2[rowId] = functionalUpdate(value, oldRowState), _extends2))
      });
    }

    if (action.type === actions.setCellState) {
      var _oldRowState$cellStat, _rowsById$_rowId, _rowsById$_rowId$cell, _extends3, _extends4;

      var _rowId = action.rowId,
          columnId = action.columnId,
          _value = action.value;

      var _oldRowState = typeof state.rowState[_rowId] !== 'undefined' ? state.rowState[_rowId] : initialRowStateAccessor(rowsById[_rowId]);

      var oldCellState = typeof (_oldRowState == null ? void 0 : (_oldRowState$cellStat = _oldRowState.cellState) == null ? void 0 : _oldRowState$cellStat[columnId]) !== 'undefined' ? _oldRowState.cellState[columnId] : initialCellStateAccessor((_rowsById$_rowId = rowsById[_rowId]) == null ? void 0 : (_rowsById$_rowId$cell = _rowsById$_rowId.cells) == null ? void 0 : _rowsById$_rowId$cell.find(function (cell) {
        return cell.column.id === columnId;
      }));
      return _extends({}, state, {
        rowState: _extends({}, state.rowState, (_extends4 = {}, _extends4[_rowId] = _extends({}, _oldRowState, {
          cellState: _extends({}, _oldRowState.cellState || {}, (_extends3 = {}, _extends3[columnId] = functionalUpdate(_value, oldCellState), _extends3))
        }), _extends4))
      });
    }
  }

  function useInstance$9(instance) {
    var _instance$autoResetRo = instance.autoResetRowState,
        autoResetRowState = _instance$autoResetRo === void 0 ? true : _instance$autoResetRo,
        data = instance.data,
        dispatch = instance.dispatch;
    var setRowState = React.useCallback(function (rowId, value) {
      return dispatch({
        type: actions.setRowState,
        rowId: rowId,
        value: value
      });
    }, [dispatch]);
    var setCellState = React.useCallback(function (rowId, columnId, value) {
      return dispatch({
        type: actions.setCellState,
        rowId: rowId,
        columnId: columnId,
        value: value
      });
    }, [dispatch]);
    var getAutoResetRowState = useGetLatest(autoResetRowState);
    useMountedLayoutEffect(function () {
      if (getAutoResetRowState()) {
        dispatch({
          type: actions.resetRowState
        });
      }
    }, [data]);
    Object.assign(instance, {
      setRowState: setRowState,
      setCellState: setCellState
    });
  }

  function prepareRow$4(row, _ref) {
    var instance = _ref.instance;
    var _instance$initialRowS2 = instance.initialRowStateAccessor,
        initialRowStateAccessor = _instance$initialRowS2 === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS2,
        _instance$initialCell2 = instance.initialCellStateAccessor,
        initialCellStateAccessor = _instance$initialCell2 === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell2,
        rowState = instance.state.rowState;

    if (row) {
      row.state = typeof rowState[row.id] !== 'undefined' ? rowState[row.id] : initialRowStateAccessor(row);

      row.setState = function (updater) {
        return instance.setRowState(row.id, updater);
      };

      row.cells.forEach(function (cell) {
        if (!row.state.cellState) {
          row.state.cellState = {};
        }

        cell.state = typeof row.state.cellState[cell.column.id] !== 'undefined' ? row.state.cellState[cell.column.id] : initialCellStateAccessor(cell);

        cell.setState = function (updater) {
          return instance.setCellState(row.id, cell.column.id, updater);
        };
      });
    }
  }

  actions.resetColumnOrder = 'resetColumnOrder';
  actions.setColumnOrder = 'setColumnOrder';
  var useColumnOrder = function useColumnOrder(hooks) {
    hooks.stateReducers.push(reducer$a);
    hooks.visibleColumnsDeps.push(function (deps, _ref) {
      var instance = _ref.instance;
      return [].concat(deps, [instance.state.columnOrder]);
    });
    hooks.visibleColumns.push(visibleColumns$2);
    hooks.useInstance.push(useInstance$a);
  };
  useColumnOrder.pluginName = 'useColumnOrder';

  function reducer$a(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        columnOrder: []
      }, state);
    }

    if (action.type === actions.resetColumnOrder) {
      return _extends({}, state, {
        columnOrder: instance.initialState.columnOrder || []
      });
    }

    if (action.type === actions.setColumnOrder) {
      return _extends({}, state, {
        columnOrder: functionalUpdate(action.columnOrder, state.columnOrder)
      });
    }
  }

  function visibleColumns$2(columns, _ref2) {
    var columnOrder = _ref2.instance.state.columnOrder;

    // If there is no order, return the normal columns
    if (!columnOrder || !columnOrder.length) {
      return columns;
    }

    var columnOrderCopy = [].concat(columnOrder); // If there is an order, make a copy of the columns

    var columnsCopy = [].concat(columns); // And make a new ordered array of the columns

    var columnsInOrder = []; // Loop over the columns and place them in order into the new array

    var _loop = function _loop() {
      var targetColumnId = columnOrderCopy.shift();
      var foundIndex = columnsCopy.findIndex(function (d) {
        return d.id === targetColumnId;
      });

      if (foundIndex > -1) {
        columnsInOrder.push(columnsCopy.splice(foundIndex, 1)[0]);
      }
    };

    while (columnsCopy.length && columnOrderCopy.length) {
      _loop();
    } // If there are any columns left, add them to the end


    return [].concat(columnsInOrder, columnsCopy);
  }

  function useInstance$a(instance) {
    var dispatch = instance.dispatch;
    instance.setColumnOrder = React.useCallback(function (columnOrder) {
      return dispatch({
        type: actions.setColumnOrder,
        columnOrder: columnOrder
      });
    }, [dispatch]);
  }

  defaultColumn.canResize = true; // Actions

  actions.columnStartResizing = 'columnStartResizing';
  actions.columnResizing = 'columnResizing';
  actions.columnDoneResizing = 'columnDoneResizing';
  actions.resetResize = 'resetResize';
  var useResizeColumns = function useResizeColumns(hooks) {
    hooks.getResizerProps = [defaultGetResizerProps];
    hooks.getHeaderProps.push({
      style: {
        position: 'relative'
      }
    });
    hooks.stateReducers.push(reducer$b);
    hooks.useInstance.push(useInstance$b);
    hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions$1);
  };

  var defaultGetResizerProps = function defaultGetResizerProps(props, _ref) {
    var instance = _ref.instance,
        header = _ref.header;
    var dispatch = instance.dispatch;

    var onResizeStart = function onResizeStart(e, header) {
      var isTouchEvent = false;

      if (e.type === 'touchstart') {
        // lets not respond to multiple touches (e.g. 2 or 3 fingers)
        if (e.touches && e.touches.length > 1) {
          return;
        }

        isTouchEvent = true;
      }

      var headersToResize = getLeafHeaders(header);
      var headerIdWidths = headersToResize.map(function (d) {
        return [d.id, d.totalWidth];
      });
      var clientX = isTouchEvent ? Math.round(e.touches[0].clientX) : e.clientX;
      var raf;
      var mostRecentClientX;

      var dispatchEnd = function dispatchEnd() {
        window.cancelAnimationFrame(raf);
        raf = null;
        dispatch({
          type: actions.columnDoneResizing
        });
      };

      var dispatchMove = function dispatchMove() {
        window.cancelAnimationFrame(raf);
        raf = null;
        dispatch({
          type: actions.columnResizing,
          clientX: mostRecentClientX
        });
      };

      var scheduleDispatchMoveOnNextAnimationFrame = function scheduleDispatchMoveOnNextAnimationFrame(clientXPos) {
        mostRecentClientX = clientXPos;

        if (!raf) {
          raf = window.requestAnimationFrame(dispatchMove);
        }
      };

      var handlersAndEvents = {
        mouse: {
          moveEvent: 'mousemove',
          moveHandler: function moveHandler(e) {
            return scheduleDispatchMoveOnNextAnimationFrame(e.clientX);
          },
          upEvent: 'mouseup',
          upHandler: function upHandler(e) {
            document.removeEventListener('mousemove', handlersAndEvents.mouse.moveHandler);
            document.removeEventListener('mouseup', handlersAndEvents.mouse.upHandler);
            dispatchEnd();
          }
        },
        touch: {
          moveEvent: 'touchmove',
          moveHandler: function moveHandler(e) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }

            scheduleDispatchMoveOnNextAnimationFrame(e.touches[0].clientX);
            return false;
          },
          upEvent: 'touchend',
          upHandler: function upHandler(e) {
            document.removeEventListener(handlersAndEvents.touch.moveEvent, handlersAndEvents.touch.moveHandler);
            document.removeEventListener(handlersAndEvents.touch.upEvent, handlersAndEvents.touch.moveHandler);
            dispatchEnd();
          }
        }
      };
      var events = isTouchEvent ? handlersAndEvents.touch : handlersAndEvents.mouse;
      var passiveIfSupported = passiveEventSupported() ? {
        passive: false
      } : false;
      document.addEventListener(events.moveEvent, events.moveHandler, passiveIfSupported);
      document.addEventListener(events.upEvent, events.upHandler, passiveIfSupported);
      dispatch({
        type: actions.columnStartResizing,
        columnId: header.id,
        columnWidth: header.totalWidth,
        headerIdWidths: headerIdWidths,
        clientX: clientX
      });
    };

    return [props, {
      onMouseDown: function onMouseDown(e) {
        return e.persist() || onResizeStart(e, header);
      },
      onTouchStart: function onTouchStart(e) {
        return e.persist() || onResizeStart(e, header);
      },
      style: {
        cursor: 'col-resize'
      },
      draggable: false,
      role: 'separator'
    }];
  };

  useResizeColumns.pluginName = 'useResizeColumns';

  function reducer$b(state, action) {
    if (action.type === actions.init) {
      return _extends({
        columnResizing: {
          columnWidths: {}
        }
      }, state);
    }

    if (action.type === actions.resetResize) {
      return _extends({}, state, {
        columnResizing: {
          columnWidths: {}
        }
      });
    }

    if (action.type === actions.columnStartResizing) {
      var clientX = action.clientX,
          columnId = action.columnId,
          columnWidth = action.columnWidth,
          headerIdWidths = action.headerIdWidths;
      return _extends({}, state, {
        columnResizing: _extends({}, state.columnResizing, {
          startX: clientX,
          headerIdWidths: headerIdWidths,
          columnWidth: columnWidth,
          isResizingColumn: columnId
        })
      });
    }

    if (action.type === actions.columnResizing) {
      var _clientX = action.clientX;

      var _state$columnResizing = state.columnResizing,
          startX = _state$columnResizing.startX,
          _columnWidth = _state$columnResizing.columnWidth,
          _state$columnResizing2 = _state$columnResizing.headerIdWidths,
          _headerIdWidths = _state$columnResizing2 === void 0 ? [] : _state$columnResizing2;

      var deltaX = _clientX - startX;
      var percentageDeltaX = deltaX / _columnWidth;
      var newColumnWidths = {};

      _headerIdWidths.forEach(function (_ref2) {
        var headerId = _ref2[0],
            headerWidth = _ref2[1];
        newColumnWidths[headerId] = Math.max(headerWidth + headerWidth * percentageDeltaX, 0);
      });

      return _extends({}, state, {
        columnResizing: _extends({}, state.columnResizing, {
          columnWidths: _extends({}, state.columnResizing.columnWidths, {}, newColumnWidths)
        })
      });
    }

    if (action.type === actions.columnDoneResizing) {
      return _extends({}, state, {
        columnResizing: _extends({}, state.columnResizing, {
          startX: null,
          isResizingColumn: null
        })
      });
    }
  }

  var useInstanceBeforeDimensions$1 = function useInstanceBeforeDimensions(instance) {
    var flatHeaders = instance.flatHeaders,
        disableResizing = instance.disableResizing,
        getHooks = instance.getHooks,
        columnResizing = instance.state.columnResizing;
    var getInstance = useGetLatest(instance);
    flatHeaders.forEach(function (header) {
      var canResize = getFirstDefined(header.disableResizing === true ? false : undefined, disableResizing === true ? false : undefined, true);
      header.canResize = canResize;
      header.width = columnResizing.columnWidths[header.id] || header.originalWidth || header.width;
      header.isResizing = columnResizing.isResizingColumn === header.id;

      if (canResize) {
        header.getResizerProps = makePropGetter(getHooks().getResizerProps, {
          instance: getInstance(),
          header: header
        });
      }
    });
  };

  function useInstance$b(instance) {
    var plugins = instance.plugins,
        dispatch = instance.dispatch,
        _instance$autoResetRe = instance.autoResetResize,
        autoResetResize = _instance$autoResetRe === void 0 ? true : _instance$autoResetRe,
        columns = instance.columns;
    ensurePluginOrder(plugins, ['useAbsoluteLayout'], 'useResizeColumns');
    var getAutoResetResize = useGetLatest(autoResetResize);
    useMountedLayoutEffect(function () {
      if (getAutoResetResize()) {
        dispatch({
          type: actions.resetResize
        });
      }
    }, [columns]);
    var resetResizing = React.useCallback(function () {
      return dispatch({
        type: actions.resetResize
      });
    }, [dispatch]);
    Object.assign(instance, {
      resetResizing: resetResizing
    });
  }

  function getLeafHeaders(header) {
    var leafHeaders = [];

    var recurseHeader = function recurseHeader(header) {
      if (header.columns && header.columns.length) {
        header.columns.map(recurseHeader);
      }

      leafHeaders.push(header);
    };

    recurseHeader(header);
    return leafHeaders;
  }

  var cellStyles = {
    position: 'absolute',
    top: 0
  };
  var useAbsoluteLayout = function useAbsoluteLayout(hooks) {
    hooks.getTableBodyProps.push(getRowStyles);
    hooks.getRowProps.push(getRowStyles);
    hooks.getHeaderGroupProps.push(getRowStyles);
    hooks.getFooterGroupProps.push(getRowStyles);
    hooks.getHeaderProps.push(function (props, _ref) {
      var column = _ref.column;
      return [props, {
        style: _extends({}, cellStyles, {
          left: column.totalLeft + "px",
          width: column.totalWidth + "px"
        })
      }];
    });
    hooks.getCellProps.push(function (props, _ref2) {
      var cell = _ref2.cell;
      return [props, {
        style: _extends({}, cellStyles, {
          left: cell.column.totalLeft + "px",
          width: cell.column.totalWidth + "px"
        })
      }];
    });
    hooks.getFooterProps.push(function (props, _ref3) {
      var column = _ref3.column;
      return [props, {
        style: _extends({}, cellStyles, {
          left: column.totalLeft + "px",
          width: column.totalWidth + "px"
        })
      }];
    });
  };
  useAbsoluteLayout.pluginName = 'useAbsoluteLayout';

  var getRowStyles = function getRowStyles(props, _ref4) {
    var instance = _ref4.instance;
    return [props, {
      style: {
        position: 'relative',
        width: instance.totalColumnsWidth + "px"
      }
    }];
  };

  var cellStyles$1 = {
    display: 'inline-block',
    boxSizing: 'border-box'
  };

  var getRowStyles$1 = function getRowStyles(props, _ref) {
    var instance = _ref.instance;
    return [props, {
      style: {
        display: 'flex',
        width: instance.totalColumnsWidth + "px"
      }
    }];
  };

  var useBlockLayout = function useBlockLayout(hooks) {
    hooks.getRowProps.push(getRowStyles$1);
    hooks.getHeaderGroupProps.push(getRowStyles$1);
    hooks.getFooterGroupProps.push(getRowStyles$1);
    hooks.getHeaderProps.push(function (props, _ref2) {
      var column = _ref2.column;
      return [props, {
        style: _extends({}, cellStyles$1, {
          width: column.totalWidth + "px"
        })
      }];
    });
    hooks.getCellProps.push(function (props, _ref3) {
      var cell = _ref3.cell;
      return [props, {
        style: _extends({}, cellStyles$1, {
          width: cell.column.totalWidth + "px"
        })
      }];
    });
    hooks.getFooterProps.push(function (props, _ref4) {
      var column = _ref4.column;
      return [props, {
        style: _extends({}, cellStyles$1, {
          width: column.totalWidth + "px"
        })
      }];
    });
  };
  useBlockLayout.pluginName = 'useBlockLayout';

  function useFlexLayout(hooks) {
    hooks.getTableProps.push(getTableProps);
    hooks.getRowProps.push(getRowStyles$2);
    hooks.getHeaderGroupProps.push(getRowStyles$2);
    hooks.getFooterGroupProps.push(getRowStyles$2);
    hooks.getHeaderProps.push(getHeaderProps);
    hooks.getCellProps.push(getCellProps);
    hooks.getFooterProps.push(getFooterProps);
  }
  useFlexLayout.pluginName = 'useFlexLayout';

  var getTableProps = function getTableProps(props, _ref) {
    var instance = _ref.instance;
    return [props, {
      style: {
        minWidth: instance.totalColumnsMinWidth + "px"
      }
    }];
  };

  var getRowStyles$2 = function getRowStyles(props, _ref2) {
    var instance = _ref2.instance;
    return [props, {
      style: {
        display: 'flex',
        flex: '1 0 auto',
        minWidth: instance.totalColumnsMinWidth + "px"
      }
    }];
  };

  var getHeaderProps = function getHeaderProps(props, _ref3) {
    var column = _ref3.column;
    return [props, {
      style: {
        boxSizing: 'border-box',
        flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : undefined,
        minWidth: column.totalMinWidth + "px",
        width: column.totalWidth + "px"
      }
    }];
  };

  var getCellProps = function getCellProps(props, _ref4) {
    var cell = _ref4.cell;
    return [props, {
      style: {
        boxSizing: 'border-box',
        flex: cell.column.totalFlexWidth + " 0 auto",
        minWidth: cell.column.totalMinWidth + "px",
        width: cell.column.totalWidth + "px"
      }
    }];
  };

  var getFooterProps = function getFooterProps(props, _ref5) {
    var column = _ref5.column;
    return [props, {
      style: {
        boxSizing: 'border-box',
        flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : undefined,
        minWidth: column.totalMinWidth + "px",
        width: column.totalWidth + "px"
      }
    }];
  };

  actions.columnStartResizing = 'columnStartResizing';
  actions.columnResizing = 'columnResizing';
  actions.columnDoneResizing = 'columnDoneResizing';
  actions.resetResize = 'resetResize';
  function useGridLayout(hooks) {
    hooks.stateReducers.push(reducer$c);
    hooks.getTableProps.push(getTableProps$1);
    hooks.getHeaderProps.push(getHeaderProps$1);
    hooks.getRowProps.push(getRowProps);
  }
  useGridLayout.pluginName = 'useGridLayout';

  var getTableProps$1 = function getTableProps(props, _ref) {
    var instance = _ref.instance;
    var gridTemplateColumns = instance.visibleColumns.map(function (column) {
      var _instance$state$colum;

      if (instance.state.gridLayout.columnWidths[column.id]) return instance.state.gridLayout.columnWidths[column.id] + "px"; // When resizing, lock the width of all unset columns
      // instead of using user-provided width or defaultColumn width,
      // which could potentially be 'auto' or 'fr' units that don't scale linearly

      if ((_instance$state$colum = instance.state.columnResizing) == null ? void 0 : _instance$state$colum.isResizingColumn) return instance.state.gridLayout.startWidths[column.id] + "px";
      if (typeof column.width === 'number') return column.width + "px";
      return column.width;
    });
    return [props, {
      style: {
        display: "grid",
        gridTemplateColumns: gridTemplateColumns.join(" ")
      }
    }];
  };

  var getHeaderProps$1 = function getHeaderProps(props, _ref2) {
    var column = _ref2.column;
    return [props, {
      id: "header-cell-" + column.id,
      style: {
        position: "sticky",
        //enables a scroll wrapper to be placed around the table and have sticky headers
        gridColumn: "span " + column.totalVisibleHeaderCount
      }
    }];
  };

  var getRowProps = function getRowProps(props, _ref3) {
    var row = _ref3.row;

    if (row.isExpanded) {
      return [props, {
        style: {
          gridColumn: "1 / " + (row.cells.length + 1)
        }
      }];
    }

    return [props, {}];
  };

  function reducer$c(state, action, previousState, instance) {
    if (action.type === actions.init) {
      return _extends({
        gridLayout: {
          columnWidths: {}
        }
      }, state);
    }

    if (action.type === actions.resetResize) {
      return _extends({}, state, {
        gridLayout: {
          columnWidths: {}
        }
      });
    }

    if (action.type === actions.columnStartResizing) {
      var columnId = action.columnId,
          headerIdWidths = action.headerIdWidths;
      var columnWidth = getElementWidth(columnId);

      if (columnWidth !== undefined) {
        var startWidths = instance.visibleColumns.reduce(function (acc, column) {
          var _extends2;

          return _extends({}, acc, (_extends2 = {}, _extends2[column.id] = getElementWidth(column.id), _extends2));
        }, {});
        var minWidths = instance.visibleColumns.reduce(function (acc, column) {
          var _extends3;

          return _extends({}, acc, (_extends3 = {}, _extends3[column.id] = column.minWidth, _extends3));
        }, {});
        var maxWidths = instance.visibleColumns.reduce(function (acc, column) {
          var _extends4;

          return _extends({}, acc, (_extends4 = {}, _extends4[column.id] = column.maxWidth, _extends4));
        }, {});
        var headerIdGridWidths = headerIdWidths.map(function (_ref4) {
          var headerId = _ref4[0];
          return [headerId, getElementWidth(headerId)];
        });
        return _extends({}, state, {
          gridLayout: _extends({}, state.gridLayout, {
            startWidths: startWidths,
            minWidths: minWidths,
            maxWidths: maxWidths,
            headerIdGridWidths: headerIdGridWidths,
            columnWidth: columnWidth
          })
        });
      } else {
        return state;
      }
    }

    if (action.type === actions.columnResizing) {
      var clientX = action.clientX;
      var startX = state.columnResizing.startX;

      var _state$gridLayout = state.gridLayout,
          _columnWidth = _state$gridLayout.columnWidth,
          _minWidths = _state$gridLayout.minWidths,
          _maxWidths = _state$gridLayout.maxWidths,
          _state$gridLayout$hea = _state$gridLayout.headerIdGridWidths,
          _headerIdGridWidths = _state$gridLayout$hea === void 0 ? [] : _state$gridLayout$hea;

      var deltaX = clientX - startX;
      var percentageDeltaX = deltaX / _columnWidth;
      var newColumnWidths = {};

      _headerIdGridWidths.forEach(function (_ref5) {
        var headerId = _ref5[0],
            headerWidth = _ref5[1];
        newColumnWidths[headerId] = Math.min(Math.max(_minWidths[headerId], headerWidth + headerWidth * percentageDeltaX), _maxWidths[headerId]);
      });

      return _extends({}, state, {
        gridLayout: _extends({}, state.gridLayout, {
          columnWidths: _extends({}, state.gridLayout.columnWidths, {}, newColumnWidths)
        })
      });
    }

    if (action.type === actions.columnDoneResizing) {
      return _extends({}, state, {
        gridLayout: _extends({}, state.gridLayout, {
          startWidths: {},
          minWidths: {},
          maxWidths: {}
        })
      });
    }
  }

  function getElementWidth(columnId) {
    var _document$getElementB;

    var width = (_document$getElementB = document.getElementById("header-cell-" + columnId)) == null ? void 0 : _document$getElementB.offsetWidth;

    if (width !== undefined) {
      return width;
    }
  }

  exports._UNSTABLE_usePivotColumns = _UNSTABLE_usePivotColumns;
  exports.actions = actions;
  exports.defaultColumn = defaultColumn;
  exports.defaultGroupByFn = defaultGroupByFn;
  exports.defaultOrderByFn = defaultOrderByFn;
  exports.defaultRenderer = defaultRenderer;
  exports.emptyRenderer = emptyRenderer;
  exports.ensurePluginOrder = ensurePluginOrder;
  exports.flexRender = flexRender;
  exports.functionalUpdate = functionalUpdate;
  exports.loopHooks = loopHooks;
  exports.makePropGetter = makePropGetter;
  exports.makeRenderer = makeRenderer;
  exports.reduceHooks = reduceHooks;
  exports.safeUseLayoutEffect = safeUseLayoutEffect;
  exports.useAbsoluteLayout = useAbsoluteLayout;
  exports.useAsyncDebounce = useAsyncDebounce;
  exports.useBlockLayout = useBlockLayout;
  exports.useColumnOrder = useColumnOrder;
  exports.useExpanded = useExpanded;
  exports.useFilters = useFilters;
  exports.useFlexLayout = useFlexLayout;
  exports.useGetLatest = useGetLatest;
  exports.useGlobalFilter = useGlobalFilter;
  exports.useGridLayout = useGridLayout;
  exports.useGroupBy = useGroupBy;
  exports.useMountedLayoutEffect = useMountedLayoutEffect;
  exports.usePagination = usePagination;
  exports.useResizeColumns = useResizeColumns;
  exports.useRowSelect = useRowSelect;
  exports.useRowState = useRowState;
  exports.useSortBy = useSortBy;
  exports.useTable = useTable;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-table.development.js.map


/***/ }),

/***/ "./node_modules/react-table/index.js":
/*!*******************************************!*\
  !*** ./node_modules/react-table/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./dist/react-table.development.js */ "./node_modules/react-table/dist/react-table.development.js")
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-directory":
/*!****************************************!*\
  !*** external ["wp","blockDirectory"] ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blockDirectory"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/date":
/*!******************************!*\
  !*** external ["wp","date"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["date"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksearch_console"] = self["webpackChunksearch_console"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map