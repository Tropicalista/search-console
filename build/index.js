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
/* harmony export */   GoogleLogin: () => (/* binding */ GoogleLogin),
/* harmony export */   GoogleOAuthProvider: () => (/* binding */ GoogleOAuthProvider),
/* harmony export */   googleLogout: () => (/* binding */ googleLogout),
/* harmony export */   hasGrantedAllScopesGoogle: () => (/* binding */ hasGrantedAllScopesGoogle),
/* harmony export */   hasGrantedAnyScopeGoogle: () => (/* binding */ hasGrantedAnyScopeGoogle),
/* harmony export */   useGoogleLogin: () => (/* binding */ useGoogleLogin),
/* harmony export */   useGoogleOneTapLogin: () => (/* binding */ useGoogleOneTapLogin)
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

/***/ "./assets/logo.svg":
/*!*************************!*\
  !*** ./assets/logo.svg ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgLogo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _defs, _path, _path2, _path3, _path4, _path5, _path6, _path7, _path8, _path9, _path10, _path11;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgLogo = function SvgLogo(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 32,
    height: 28,
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 256 228"
  }, props), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("radialGradient", {
    id: "logo_svg__a",
    cx: "21.66%",
    cy: "28.708%",
    r: "82.87%",
    fx: "21.66%",
    fy: "28.708%",
    gradientTransform: "matrix(.59503 .59486 -.44034 .80383 .214 -.073)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: "0%",
    stopColor: "#F1F2F2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: "100%",
    stopColor: "#E6E7E8"
  })))), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#737373",
    d: "M165.98 0H90.02L71.098 19.055V37.98H90.02V19.055h75.958V37.98h18.924V19.055z"
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#BFBFBF",
    d: "M90.02 0v19.055h75.96V0z"
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#logo_svg__a)",
    d: "M36.402 37.98 0 74.381v134.177c0 10.513 8.542 18.924 18.924 18.924h218.152c10.513 0 18.924-8.543 18.924-18.924V74.513L219.466 37.98z"
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FFF",
    d: "M28.517 109.076h199.097v118.538H28.517z"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#E0E0E0",
    d: "M36.402 37.98 0 74.381v34.694h256V74.513L219.466 37.98z"
  })), _path6 || (_path6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#D1D1D1",
    d: "M42.71 213.29H128v14.193H42.71z"
  })), _path7 || (_path7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4285F4",
    d: "M28.517 86.998c0-8.148 6.571-14.719 14.72-14.719h169.527c8.148 0 14.719 6.571 14.719 14.719v22.078H28.517z"
  })), _path8 || (_path8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#E6E6E6",
    d: "M56.903 90.152a7.067 7.067 0 0 1-7.096 7.096 7.067 7.067 0 0 1-7.097-7.096 7.067 7.067 0 0 1 7.097-7.097 7.067 7.067 0 0 1 7.096 7.097m23.656 0a7.067 7.067 0 0 1-7.097 7.096 7.067 7.067 0 0 1-7.096-7.096 7.067 7.067 0 0 1 7.096-7.097 7.067 7.067 0 0 1 7.097 7.097"
  })), _path9 || (_path9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#BABABA",
    d: "m227.483 165.191-29.832-29.832-9.988 30.883-40.739-40.608-1.183 62.686 15.113 23.655c2.234-.394-11.302 15.508-11.302 15.508h77.93z"
  })), _path10 || (_path10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4D4D4D",
    d: "M208.821 164.008c0-16.821-9.856-31.277-23.918-38.242v39.95l-18.792 10.12-19.056-10.12v-40.082c-14.061 6.966-23.655 21.553-23.655 38.243 0 16.821 9.725 31.277 23.787 38.242v25.364h37.848v-25.364c13.93-6.834 23.786-21.42 23.786-38.11"
  })), _path11 || (_path11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#D1D1D1",
    d: "M42.71 123.269h66.366v75.828H42.71z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjU2IDIyOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICAgIDx0aXRsZT5Hb29nbGUgU2VhcmNoIENvbnNvbGU8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHJhZGlhbEdyYWRpZW50IGN4PSIyMS42NTk3OTI2JSIgY3k9IjI4LjcwNzU4MzUlIiBmeD0iMjEuNjU5NzkyNiUiIGZ5PSIyOC43MDc1ODM1JSIgcj0iODIuODY5Njg1OCUiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4yMTY1OTgsMC4yODcwNzYpLHNjYWxlKDAuNzQwMjQ2LDEuMDAwMDAwKSxyb3RhdGUoMzYuNTAyNDc5KSx0cmFuc2xhdGUoLTAuMjE2NTk4LC0wLjI4NzA3NikiIGlkPSJnc2NSYWRpYWxHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0YxRjJGMiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRTZFN0U4IiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPgogICAgPGc+CiAgICAgICAgPHBvbHlnb24gZmlsbD0iIzczNzM3MyIgcG9pbnRzPSIxNjUuOTc5NDY2IDAgOTAuMDIwNTMzOSAwIDcxLjA5NjUwOTIgMTkuMDU1NDQxNSA3MS4wOTY1MDkyIDM3Ljk3OTQ2NjEgOTAuMDIwNTMzOSAzNy45Nzk0NjYxIDkwLjAyMDUzMzkgMTkuMDU1NDQxNSAxNjUuOTc5NDY2IDE5LjA1NTQ0MTUgMTY1Ljk3OTQ2NiAzNy45Nzk0NjYxIDE4NC45MDM0OTEgMzcuOTc5NDY2MSAxODQuOTAzNDkxIDE5LjA1NTQ0MTUiPjwvcG9seWdvbj4KICAgICAgICA8cG9seWdvbiBmaWxsPSIjQkZCRkJGIiBwb2ludHM9IjkwLjAyMDUzNCA4Ljg4MTc4NDJlLTE1IDkwLjAyMDUzNCAxOS4wNTU0NDE1IDE2NS45Nzk0NjYgMTkuMDU1NDQxNSAxNjUuOTc5NDY2IDguODgxNzg0MmUtMTUiPjwvcG9seWdvbj4KICAgICAgICA8cGF0aCBkPSJNMzYuNDAyNDY0MSwzNy45Nzk0NjYgTDAsNzQuMzgxOTMwMSBMMCwyMDguNTU4NTIxIEMwLDIxOS4wNzE4NjggOC41NDIwOTQ0NiwyMjcuNDgyNTQ2IDE4LjkyNDAyNDYsMjI3LjQ4MjU0NiBMMjM3LjA3NTk3NSwyMjcuNDgyNTQ2IEMyNDcuNTg5MzIyLDIyNy40ODI1NDYgMjU2LDIxOC45NDA0NTIgMjU2LDIwOC41NTg1MjEgTDI1Niw3NC41MTMzNDY5IEwyMTkuNDY2MTE5LDM3Ljk3OTQ2NiBMMzYuNDAyNDY0MSwzNy45Nzk0NjYgWiIgZmlsbD0idXJsKCNnc2NSYWRpYWxHcmFkaWVudC0xKSI+PC9wYXRoPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMjguNTE3NDUzOCAxMDkuMDc1OTc1IDIyNy42MTM5NjMgMTA5LjA3NTk3NSAyMjcuNjEzOTYzIDIyNy42MTM5NjMgMjguNTE3NDUzOCAyMjcuNjEzOTYzIj48L3BvbHlnb24+CiAgICAgICAgPHBvbHlnb24gZmlsbD0iI0UwRTBFMCIgcG9pbnRzPSIzNi40MDI0NjQxIDM3Ljk3OTQ2NiAwIDc0LjM4MTkzMDEgMCAxMDkuMDc1OTc1IDI1NiAxMDkuMDc1OTc1IDI1NiA3NC41MTMzNDY5IDIxOS40NjYxMTkgMzcuOTc5NDY2Ij48L3BvbHlnb24+CiAgICAgICAgPHBvbHlnb24gZmlsbD0iI0QxRDFEMSIgcG9pbnRzPSI0Mi43MTA0NzIgMjEzLjI4OTUyOCAxMjggMjEzLjI4OTUyOCAxMjggMjI3LjQ4MjU0NiA0Mi43MTA0NzIgMjI3LjQ4MjU0NiI+PC9wb2x5Z29uPgogICAgICAgIDxwYXRoIGQ9Ik0yOC41MTc0NTM4LDg2Ljk5Nzk0NjYgQzI4LjUxNzQ1MzgsNzguODUwMTAyNyAzNS4wODgyOTU3LDcyLjI3OTI2MDggNDMuMjM2MTM5Niw3Mi4yNzkyNjA4IEwyMTIuNzYzODYsNzIuMjc5MjYwOCBDMjIwLjkxMTcwNCw3Mi4yNzkyNjA4IDIyNy40ODI1NDYsNzguODUwMTAyNyAyMjcuNDgyNTQ2LDg2Ljk5Nzk0NjYgTDIyNy40ODI1NDYsMTA5LjA3NTk3NSBMMjguNTE3NDUzOCwxMDkuMDc1OTc1IEwyOC41MTc0NTM4LDg2Ljk5Nzk0NjYgWiIgZmlsbD0iIzQyODVGNCI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik01Ni45MDM0OTA4LDkwLjE1MTk1MDcgQzU2LjkwMzQ5MDgsOTQuMDk0NDU1OSA1My43NDk0ODY3LDk3LjI0ODQ2IDQ5LjgwNjk4MTUsOTcuMjQ4NDYgQzQ1Ljg2NDQ3NjQsOTcuMjQ4NDYgNDIuNzEwNDcyMyw5NC4wOTQ0NTU5IDQyLjcxMDQ3MjMsOTAuMTUxOTUwNyBDNDIuNzEwNDcyMyw4Ni4yMDk0NDU2IDQ1Ljg2NDQ3NjQsODMuMDU1NDQxNSA0OS44MDY5ODE1LDgzLjA1NTQ0MTUgQzUzLjc0OTQ4NjcsODMuMDU1NDQxNSA1Ni45MDM0OTA4LDg2LjIwOTQ0NTYgNTYuOTAzNDkwOCw5MC4xNTE5NTA3IE04MC41NTg1MjE2LDkwLjE1MTk1MDcgQzgwLjU1ODUyMTYsOTQuMDk0NDU1OSA3Ny40MDQ1MTc1LDk3LjI0ODQ2IDczLjQ2MjAxMjMsOTcuMjQ4NDYgQzY5LjUxOTUwNzIsOTcuMjQ4NDYgNjYuMzY1NTAzMSw5NC4wOTQ0NTU5IDY2LjM2NTUwMzEsOTAuMTUxOTUwNyBDNjYuMzY1NTAzMSw4Ni4yMDk0NDU2IDY5LjUxOTUwNzIsODMuMDU1NDQxNSA3My40NjIwMTIzLDgzLjA1NTQ0MTUgQzc3LjQwNDUxNzUsODMuMDU1NDQxNSA4MC41NTg1MjE2LDg2LjIwOTQ0NTYgODAuNTU4NTIxNiw5MC4xNTE5NTA3IiBmaWxsPSIjRTZFNkU2Ij48L3BhdGg+CiAgICAgICAgPHBhdGggZD0iTTIyNy40ODI1NDYsMTY1LjE5MDk2NSBMMTk3LjY1MDkyNCwxMzUuMzU5MzQzIEwxODcuNjYzMjQ0LDE2Ni4yNDIzIEwxNDYuOTI0MDI1LDEyNS42MzQ0OTcgTDE0NS43NDEyNzMsMTg4LjMyMDMyOSBMMTYwLjg1NDIwOSwyMTEuOTc1MzU5IEMxNjMuMDg4Mjk2LDIxMS41ODExMDkgMTQ5LjU1MjM2MSwyMjcuNDgyNTQ2IDE0OS41NTIzNjEsMjI3LjQ4MjU0NiBMMjI3LjQ4MjU0NiwyMjcuNDgyNTQ2IEwyMjcuNDgyNTQ2LDE2NS4xOTA5NjUgWiIgZmlsbD0iI0JBQkFCQSI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yMDguODIxMzU1LDE2NC4wMDgyMTQgQzIwOC44MjEzNTUsMTQ3LjE4Njg1OCAxOTguOTY1MDkyLDEzMi43MzEwMDYgMTg0LjkwMzQ5MSwxMjUuNzY1OTE0IEwxODQuOTAzNDkxLDE2NS43MTY2MzIgTDE2Ni4xMTA4ODMsMTc1LjgzNTcyOSBMMTQ3LjA1NTQ0MSwxNjUuNzE2NjMyIEwxNDcuMDU1NDQxLDEyNS42MzQ0OTcgQzEzMi45OTM4NCwxMzIuNTk5NTg5IDEyMy40MDA0MTEsMTQ3LjE4Njg1OCAxMjMuNDAwNDExLDE2My44NzY3OTcgQzEyMy40MDA0MTEsMTgwLjY5ODE1MiAxMzMuMTI1MjU3LDE5NS4xNTQwMDQgMTQ3LjE4Njg1OCwyMDIuMTE5MDk3IEwxNDcuMTg2ODU4LDIyNy40ODI1NDYgTDE4NS4wMzQ5MDgsMjI3LjQ4MjU0NiBMMTg1LjAzNDkwOCwyMDIuMTE5MDk3IEMxOTguOTY1MDkyLDE5NS4yODU0MjEgMjA4LjgyMTM1NSwxODAuNjk4MTUyIDIwOC44MjEzNTUsMTY0LjAwODIxNCIgZmlsbD0iIzRENEQ0RCI+PC9wYXRoPgogICAgICAgIDxwb2x5Z29uIGZpbGw9IiNEMUQxRDEiIHBvaW50cz0iNDIuNzEwNDcyIDEyMy4yNjg5OTQgMTA5LjA3NTk3NSAxMjMuMjY4OTk0IDEwOS4wNzU5NzUgMTk5LjA5NjUwOSA0Mi43MTA0NzIgMTk5LjA5NjUwOSI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4K");

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/add-filter.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/add-filter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

const {
  DropdownMenuV2: DropdownMenu,
  DropdownMenuItemV2: DropdownMenuItem,
  DropdownMenuItemLabelV2: DropdownMenuItemLabel
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function AddFilter({
  filters,
  view,
  onChangeView,
  setOpenedFilter
}, ref) {
  if (!filters.length || filters.every(({
    isPrimary
  }) => isPrimary)) {
    return null;
  }
  const inactiveFilters = filters.filter(filter => !filter.isVisible);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      __experimentalIsFocusable: true,
      size: "compact",
      className: "dataviews-filters-button",
      variant: "tertiary",
      disabled: !inactiveFilters.length,
      ref: ref
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add filter'))
  }, inactiveFilters.map(filter => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
      key: filter.field,
      onClick: () => {
        setOpenedFilter(filter.field);
        onChangeView({
          ...view,
          page: 1,
          filters: [...(view.filters || []), {
            field: filter.field,
            value: undefined,
            operator: filter.operators[0]
          }]
        });
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, filter.name));
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(AddFilter));
//# sourceMappingURL=add-filter.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/bulk-actions.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/bulk-actions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BulkActions),
/* harmony export */   useHasAPossibleBulkAction: () => (/* binding */ useHasAPossibleBulkAction),
/* harmony export */   useSomeItemHasAPossibleBulkAction: () => (/* binding */ useSomeItemHasAPossibleBulkAction)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

const {
  DropdownMenuV2: DropdownMenu,
  DropdownMenuGroupV2: DropdownMenuGroup,
  DropdownMenuItemV2: DropdownMenuItem,
  DropdownMenuSeparatorV2: DropdownMenuSeparator
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function useHasAPossibleBulkAction(actions, item) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return actions.some(action => {
      return action.supportsBulk && action.isEligible(item);
    });
  }, [actions, item]);
}
function useSomeItemHasAPossibleBulkAction(actions, data) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return data.some(item => {
      return actions.some(action => {
        return action.supportsBulk && action.isEligible(item);
      });
    });
  }, [actions, data]);
}
function ActionWithModal({
  action,
  selectedItems,
  setActionWithModal,
  onMenuOpenChange
}) {
  const eligibleItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return selectedItems.filter(item => action.isEligible(item));
  }, [action, selectedItems]);
  const {
    RenderModal,
    hideModalHeader
  } = action;
  const onCloseModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    setActionWithModal(undefined);
  }, [setActionWithModal]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: !hideModalHeader && action.label,
    __experimentalHideHeader: !!hideModalHeader,
    onRequestClose: onCloseModal,
    overlayClassName: "dataviews-action-modal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RenderModal, {
    items: eligibleItems,
    closeModal: onCloseModal,
    onPerform: () => onMenuOpenChange(false)
  }));
}
function BulkActionItem({
  action,
  selectedItems,
  setActionWithModal
}) {
  const eligibleItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return selectedItems.filter(item => action.isEligible(item));
  }, [action, selectedItems]);
  const shouldShowModal = !!action.RenderModal;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    key: action.id,
    disabled: eligibleItems.length === 0,
    hideOnClick: !shouldShowModal,
    onClick: async () => {
      if (shouldShowModal) {
        setActionWithModal(action);
      } else {
        await action.callback(eligibleItems);
      }
    },
    suffix: eligibleItems.length > 0 ? eligibleItems.length : undefined
  }, action.label);
}
function ActionsMenuGroup({
  actions,
  selectedItems,
  setActionWithModal
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, actions.map(action => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BulkActionItem, {
    key: action.id,
    action: action,
    selectedItems: selectedItems,
    setActionWithModal: setActionWithModal
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuSeparator, null));
}
function BulkActions({
  data,
  actions,
  selection,
  onSelectionChange,
  getItemId
}) {
  const bulkActions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => actions.filter(action => action.supportsBulk), [actions]);
  const [isMenuOpen, onMenuOpenChange] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [actionWithModal, setActionWithModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)();
  const selectableItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return data.filter(item => {
      return bulkActions.some(action => action.isEligible(item));
    });
  }, [data, bulkActions]);
  const numberSelectableItems = selectableItems.length;
  const areAllSelected = selection && selection.length === numberSelectableItems;
  const selectedItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return data.filter(item => selection.includes(getItemId(item)));
  }, [selection, data, getItemId]);
  const hasNonSelectableItemSelected = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return selectedItems.some(item => {
      return !selectableItems.includes(item);
    });
  }, [selectedItems, selectableItems]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (hasNonSelectableItemSelected) {
      onSelectionChange(selectedItems.filter(selectedItem => {
        return selectableItems.some(item => {
          return getItemId(selectedItem) === getItemId(item);
        });
      }));
    }
  }, [hasNonSelectableItemSelected, selectedItems, selectableItems, getItemId, onSelectionChange]);
  if (bulkActions.length === 0) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    open: isMenuOpen,
    onOpenChange: onMenuOpenChange,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bulk actions'),
    style: {
      minWidth: '240px'
    },
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      className: "dataviews-bulk-edit-button",
      __next40pxDefaultSize: true,
      variant: "tertiary",
      size: "compact"
    }, selection.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: %d: Number of items. */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__._n)('Edit %d item', 'Edit %d items', selection.length), selection.length) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bulk edit'))
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionsMenuGroup, {
    actions: bulkActions,
    setActionWithModal: setActionWithModal,
    selectedItems: selectedItems
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    disabled: areAllSelected,
    hideOnClick: false,
    onClick: () => {
      onSelectionChange(selectableItems);
    },
    suffix: numberSelectableItems
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select all')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    disabled: selection.length === 0,
    hideOnClick: false,
    onClick: () => {
      onSelectionChange([]);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deselect')))), actionWithModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionWithModal, {
    action: actionWithModal,
    selectedItems: selectedItems,
    setActionWithModal: setActionWithModal,
    onMenuOpenChange: onMenuOpenChange
  }));
}
//# sourceMappingURL=bulk-actions.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_OPERATORS: () => (/* binding */ ALL_OPERATORS),
/* harmony export */   LAYOUT_GRID: () => (/* binding */ LAYOUT_GRID),
/* harmony export */   LAYOUT_LIST: () => (/* binding */ LAYOUT_LIST),
/* harmony export */   LAYOUT_TABLE: () => (/* binding */ LAYOUT_TABLE),
/* harmony export */   OPERATORS: () => (/* binding */ OPERATORS),
/* harmony export */   OPERATOR_IS: () => (/* binding */ OPERATOR_IS),
/* harmony export */   OPERATOR_IS_ALL: () => (/* binding */ OPERATOR_IS_ALL),
/* harmony export */   OPERATOR_IS_ANY: () => (/* binding */ OPERATOR_IS_ANY),
/* harmony export */   OPERATOR_IS_NONE: () => (/* binding */ OPERATOR_IS_NONE),
/* harmony export */   OPERATOR_IS_NOT: () => (/* binding */ OPERATOR_IS_NOT),
/* harmony export */   OPERATOR_IS_NOT_ALL: () => (/* binding */ OPERATOR_IS_NOT_ALL),
/* harmony export */   SORTING_DIRECTIONS: () => (/* binding */ SORTING_DIRECTIONS)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


// Filter operators.
const OPERATOR_IS = 'is';
const OPERATOR_IS_NOT = 'isNot';
const OPERATOR_IS_ANY = 'isAny';
const OPERATOR_IS_NONE = 'isNone';
const OPERATOR_IS_ALL = 'isAll';
const OPERATOR_IS_NOT_ALL = 'isNotAll';
const ALL_OPERATORS = [OPERATOR_IS, OPERATOR_IS_NOT, OPERATOR_IS_ANY, OPERATOR_IS_NONE, OPERATOR_IS_ALL, OPERATOR_IS_NOT_ALL];
const OPERATORS = {
  [OPERATOR_IS]: {
    key: 'is-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is')
  },
  [OPERATOR_IS_NOT]: {
    key: 'is-not-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is not')
  },
  [OPERATOR_IS_ANY]: {
    key: 'is-any-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is any')
  },
  [OPERATOR_IS_NONE]: {
    key: 'is-none-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is none')
  },
  [OPERATOR_IS_ALL]: {
    key: 'is-all-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is all')
  },
  [OPERATOR_IS_NOT_ALL]: {
    key: 'is-not-all-filter',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Is not all')
  }
};

// Sorting
const SORTING_DIRECTIONS = {
  asc: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sort ascending')
  },
  desc: {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sort descending')
  }
};

// View layouts.
const LAYOUT_TABLE = 'table';
const LAYOUT_GRID = 'grid';
const LAYOUT_LIST = 'list';
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataviews.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataviews.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataViews)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pagination */ "./node_modules/@wordpress/dataviews/build-module/pagination.js");
/* harmony import */ var _view_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view-actions */ "./node_modules/@wordpress/dataviews/build-module/view-actions.js");
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filters */ "./node_modules/@wordpress/dataviews/build-module/filters.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search */ "./node_modules/@wordpress/dataviews/build-module/search.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layouts */ "./node_modules/@wordpress/dataviews/build-module/layouts.js");
/* harmony import */ var _bulk_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/bulk-actions.js");
/* harmony import */ var _normalize_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./normalize-fields */ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */








const defaultGetItemId = item => item.id;
const defaultOnSelectionChange = () => {};
function useSomeItemHasAPossibleBulkAction(actions, data) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return data.some(item => {
      return actions.some(action => {
        return action.supportsBulk && action.isEligible(item);
      });
    });
  }, [actions, data]);
}
function DataViews({
  view,
  onChangeView,
  fields,
  search = true,
  searchLabel = undefined,
  actions = [],
  data,
  getItemId = defaultGetItemId,
  isLoading = false,
  paginationInfo,
  supportedLayouts,
  onSelectionChange = defaultOnSelectionChange
}) {
  const [selection, setSelection] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [openedFilter, setOpenedFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (selection.length > 0 && selection.some(id => !data.some(item => getItemId(item) === id))) {
      const newSelection = selection.filter(id => data.some(item => getItemId(item) === id));
      setSelection(newSelection);
      onSelectionChange(data.filter(item => newSelection.includes(getItemId(item))));
    }
  }, [selection, data, getItemId, onSelectionChange]);
  const onSetSelection = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(items => {
    setSelection(items.map(item => getItemId(item)));
    onSelectionChange(items);
  }, [setSelection, getItemId, onSelectionChange]);
  const ViewComponent = _layouts__WEBPACK_IMPORTED_MODULE_3__.VIEW_LAYOUTS.find(v => v.type === view.type).component;
  const _fields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => (0,_normalize_fields__WEBPACK_IMPORTED_MODULE_4__.normalizeFields)(fields), [fields]);
  const hasPossibleBulkAction = useSomeItemHasAPossibleBulkAction(actions, data);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    alignment: "top",
    justify: "start",
    className: "dataviews-filters__view-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    justify: "start",
    className: "dataviews-filters__container",
    wrap: true
  }, search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_search__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: searchLabel,
    view: view,
    onChangeView: onChangeView
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_filters__WEBPACK_IMPORTED_MODULE_6__["default"], {
    fields: _fields,
    view: view,
    onChangeView: onChangeView,
    openedFilter: openedFilter,
    setOpenedFilter: setOpenedFilter
  })), [_constants__WEBPACK_IMPORTED_MODULE_7__.LAYOUT_TABLE, _constants__WEBPACK_IMPORTED_MODULE_7__.LAYOUT_GRID].includes(view.type) && hasPossibleBulkAction && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_bulk_actions__WEBPACK_IMPORTED_MODULE_8__["default"], {
    actions: actions,
    data: data,
    onSelectionChange: onSetSelection,
    selection: selection,
    getItemId: getItemId
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_view_actions__WEBPACK_IMPORTED_MODULE_9__["default"], {
    fields: _fields,
    view: view,
    onChangeView: onChangeView,
    supportedLayouts: supportedLayouts
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewComponent, {
    fields: _fields,
    view: view,
    onChangeView: onChangeView,
    actions: actions,
    data: data,
    getItemId: getItemId,
    isLoading: isLoading,
    onSelectionChange: onSetSelection,
    selection: selection,
    setOpenedFilter: setOpenedFilter
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pagination__WEBPACK_IMPORTED_MODULE_10__["default"], {
    view: view,
    onChangeView: onChangeView,
    paginationInfo: paginationInfo
  }));
}
//# sourceMappingURL=dataviews.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/filter-summary.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/filter-summary.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterSummary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _search_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-widget */ "./node_modules/@wordpress/dataviews/build-module/search-widget.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




const ENTER = 'Enter';
const SPACE = ' ';

/**
 * Internal dependencies
 */


const FilterText = ({
  activeElements,
  filterInView,
  filter
}) => {
  if (activeElements === undefined || activeElements.length === 0) {
    return filter.name;
  }
  const filterTextWrappers = {
    Name: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dataviews-filter-summary__filter-text-name"
    }),
    Value: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dataviews-filter-summary__filter-text-value"
    })
  };
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_ANY) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is any: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is any: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NONE) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is none: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is none: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_ALL) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is all: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NOT_ALL) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not all: Admin, Editor". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is not all: </Name><Value>%2$s</Value>'), filter.name, activeElements.map(element => element.label).join(', ')), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is: Admin". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  if (filterInView?.operator === _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATOR_IS_NOT) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. 3: Filter value. e.g.: "Author is not: Admin". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('<Name>%1$s is not: </Name><Value>%2$s</Value>'), filter.name, activeElements[0].label), filterTextWrappers);
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name e.g.: "Unknown status for Author". */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Unknown status for %1$s'), filter.name);
};
function OperatorSelector({
  filter,
  view,
  onChangeView
}) {
  const operatorOptions = filter.operators?.map(operator => ({
    value: operator,
    label: _constants__WEBPACK_IMPORTED_MODULE_5__.OPERATORS[operator]?.label
  }));
  const currentFilter = view.filters.find(_filter => _filter.field === filter.field);
  const value = currentFilter?.operator || filter.operators[0];
  return operatorOptions.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    spacing: 2,
    justify: "flex-start",
    className: "dataviews-filter-summary__operators-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
    className: "dataviews-filter-summary__operators-filter-name"
  }, filter.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Conditions'),
    value: value,
    options: operatorOptions,
    onChange: newValue => {
      const newFilters = currentFilter ? [...view.filters.map(_filter => {
        if (_filter.field === filter.field) {
          return {
            ..._filter,
            operator: newValue
          };
        }
        return _filter;
      })] : [...view.filters, {
        field: filter.field,
        operator: newValue
      }];
      onChangeView({
        ...view,
        page: 1,
        filters: newFilters
      });
    },
    size: "small",
    __nextHasNoMarginBottom: true,
    hideLabelFromVision: true
  }));
}
function FilterSummary({
  addFilterRef,
  openedFilter,
  ...commonProps
}) {
  const toggleRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)();
  const {
    filter,
    view,
    onChangeView
  } = commonProps;
  const filterInView = view.filters.find(f => f.field === filter.field);
  const activeElements = filter.elements.filter(element => {
    if (filter.singleSelection) {
      return element.value === filterInView?.value;
    }
    return filterInView?.value?.includes(element.value);
  });
  const isPrimary = filter.isPrimary;
  const hasValues = filterInView?.value !== undefined;
  const canResetOrRemove = !isPrimary || hasValues;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    defaultOpen: openedFilter === filter.field,
    contentClassName: "dataviews-filter-summary__popover",
    popoverProps: {
      placement: 'bottom-start',
      role: 'dialog'
    },
    onClose: () => {
      toggleRef.current?.focus();
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "dataviews-filter-summary__chip-container"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)( /* translators: 1: Filter name. */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Filter by: %1$s'), filter.name.toLowerCase()),
      placement: "top"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-filter-summary__chip', {
        'has-reset': canResetOrRemove,
        'has-values': hasValues
      }),
      role: "button",
      tabIndex: 0,
      onClick: onToggle,
      onKeyDown: event => {
        if ([ENTER, SPACE].includes(event.key)) {
          onToggle();
          event.preventDefault();
        }
      },
      "aria-pressed": isOpen,
      "aria-expanded": isOpen,
      ref: toggleRef
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FilterText, {
      activeElements: activeElements,
      filterInView: filterInView,
      filter: filter
    }))), canResetOrRemove && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
      text: isPrimary ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reset') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Remove'),
      placement: "top"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-filter-summary__chip-remove', {
        'has-values': hasValues
      }),
      onClick: () => {
        onChangeView({
          ...view,
          page: 1,
          filters: view.filters.filter(_filter => _filter.field !== filter.field)
        });
        // If the filter is not primary and can be removed, it will be added
        // back to the available filters from `Add filter` component.
        if (!isPrimary) {
          addFilterRef.current?.focus();
        } else {
          // If is primary, focus the toggle button.
          toggleRef.current?.focus();
        }
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
    })))),
    renderContent: () => {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
        spacing: 0,
        justify: "flex-start"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OperatorSelector, {
        ...commonProps
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_search_widget__WEBPACK_IMPORTED_MODULE_7__["default"], {
        ...commonProps
      }));
    }
  });
}
//# sourceMappingURL=filter-summary.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/filters.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/filters.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _filter_summary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filter-summary */ "./node_modules/@wordpress/dataviews/build-module/filter-summary.js");
/* harmony import */ var _add_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-filter */ "./node_modules/@wordpress/dataviews/build-module/add-filter.js");
/* harmony import */ var _reset_filters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reset-filters */ "./node_modules/@wordpress/dataviews/build-module/reset-filters.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/@wordpress/dataviews/build-module/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */






const Filters = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(function Filters({
  fields,
  view,
  onChangeView,
  openedFilter,
  setOpenedFilter
}) {
  const addFilterRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const filters = [];
  fields.forEach(field => {
    if (!field.elements?.length) {
      return;
    }
    const operators = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.sanitizeOperators)(field);
    if (operators.length === 0) {
      return;
    }
    const isPrimary = !!field.filterBy?.isPrimary;
    filters.push({
      field: field.id,
      name: field.header,
      elements: field.elements,
      singleSelection: operators.some(op => [_constants__WEBPACK_IMPORTED_MODULE_4__.OPERATOR_IS, _constants__WEBPACK_IMPORTED_MODULE_4__.OPERATOR_IS_NOT].includes(op)),
      operators,
      isVisible: isPrimary || view.filters.some(f => f.field === field.id && _constants__WEBPACK_IMPORTED_MODULE_4__.ALL_OPERATORS.includes(f.operator)),
      isPrimary
    });
  });
  // Sort filters by primary property. We need the primary filters to be first.
  // Then we sort by name.
  filters.sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) {
      return -1;
    }
    if (!a.isPrimary && b.isPrimary) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });
  const addFilter = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_add_filter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: "add-filter",
    filters: filters,
    view: view,
    onChangeView: onChangeView,
    ref: addFilterRef,
    setOpenedFilter: setOpenedFilter
  });
  const filterComponents = [...filters.map(filter => {
    if (!filter.isVisible) {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_filter_summary__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: filter.field,
      filter: filter,
      view: view,
      onChangeView: onChangeView,
      addFilterRef: addFilterRef,
      openedFilter: openedFilter
    });
  }), addFilter];
  if (filterComponents.length > 1) {
    filterComponents.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_reset_filters__WEBPACK_IMPORTED_MODULE_7__["default"], {
      key: "reset-filters",
      filters: filters,
      view: view,
      onChangeView: onChangeView
    }));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    justify: "flex-start",
    style: {
      width: 'fit-content'
    },
    wrap: true
  }, filterComponents);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Filters);
//# sourceMappingURL=filters.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/item-actions.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/item-actions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemActions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js");
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

const {
  DropdownMenuV2: DropdownMenu,
  DropdownMenuGroupV2: DropdownMenuGroup,
  DropdownMenuItemV2: DropdownMenuItem,
  DropdownMenuItemLabelV2: DropdownMenuItemLabel,
  kebabCase
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function ButtonTrigger({
  action,
  onClick
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    label: action.label,
    icon: action.icon,
    isDestructive: action.isDestructive,
    size: "compact",
    onClick: onClick
  });
}
function DropdownMenuItemTrigger({
  action,
  onClick
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    onClick: onClick,
    hideOnClick: !action.RenderModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, action.label));
}
function ActionWithModal({
  action,
  item,
  ActionTrigger
}) {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const actionTriggerProps = {
    action,
    onClick: () => setIsModalOpen(true)
  };
  const {
    RenderModal,
    hideModalHeader
  } = action;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionTrigger, {
    ...actionTriggerProps
  }), isModalOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: action.modalHeader || action.label,
    __experimentalHideHeader: !!hideModalHeader,
    onRequestClose: () => {
      setIsModalOpen(false);
    },
    overlayClassName: `dataviews-action-modal dataviews-action-modal__${kebabCase(action.id)}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RenderModal, {
    items: [item],
    closeModal: () => setIsModalOpen(false)
  })));
}
function ActionsDropdownMenuGroup({
  actions,
  item
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, actions.map(action => {
    if (!!action.RenderModal) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionWithModal, {
        key: action.id,
        action: action,
        item: item,
        ActionTrigger: DropdownMenuItemTrigger
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemTrigger, {
      key: action.id,
      action: action,
      onClick: () => action.callback([item])
    });
  }));
}
function ItemActions({
  item,
  actions,
  isCompact
}) {
  const {
    primaryActions,
    eligibleActions
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    // If an action is eligible for all items, doesn't need
    // to provide the `isEligible` function.
    const _eligibleActions = actions.filter(action => !action.isEligible || action.isEligible(item));
    const _primaryActions = _eligibleActions.filter(action => action.isPrimary && !!action.icon);
    return {
      primaryActions: _primaryActions,
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  if (isCompact) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompactItemActions, {
      item: item,
      actions: eligibleActions
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    spacing: 1,
    justify: "flex-end",
    className: "dataviews-item-actions",
    style: {
      flexShrink: '0',
      width: 'auto'
    }
  }, !!primaryActions.length && primaryActions.map(action => {
    if (!!action.RenderModal) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionWithModal, {
        key: action.id,
        action: action,
        item: item,
        ActionTrigger: ButtonTrigger
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ButtonTrigger, {
      key: action.id,
      action: action,
      onClick: () => action.callback([item])
    });
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompactItemActions, {
    item: item,
    actions: eligibleActions
  }));
}
function CompactItemActions({
  item,
  actions
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      size: "compact",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Actions'),
      disabled: !actions.length,
      className: "dataviews-all-actions-button"
    }),
    placement: "bottom-end"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActionsDropdownMenuGroup, {
    actions: actions,
    item: item
  }));
}
//# sourceMappingURL=item-actions.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/layouts.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/layouts.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VIEW_LAYOUTS: () => (/* binding */ VIEW_LAYOUTS)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/block-table.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/category.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/format-list-bullets.js");
/* harmony import */ var _view_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-table */ "./node_modules/@wordpress/dataviews/build-module/view-table.js");
/* harmony import */ var _view_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view-grid */ "./node_modules/@wordpress/dataviews/build-module/view-grid.js");
/* harmony import */ var _view_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view-list */ "./node_modules/@wordpress/dataviews/build-module/view-list.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




const VIEW_LAYOUTS = [{
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_TABLE,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Table'),
  component: _view_table__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
}, {
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_GRID,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Grid'),
  component: _view_grid__WEBPACK_IMPORTED_MODULE_4__["default"],
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"]
}, {
  type: _constants__WEBPACK_IMPORTED_MODULE_1__.LAYOUT_LIST,
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('List'),
  component: _view_list__WEBPACK_IMPORTED_MODULE_6__["default"],
  icon: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.isRTL)() ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
}];
//# sourceMappingURL=layouts.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/lock-unlock.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lock: () => (/* binding */ lock),
/* harmony export */   unlock: () => (/* binding */ unlock)
/* harmony export */ });
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/private-apis */ "@wordpress/private-apis");
/* harmony import */ var _wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */

const {
  lock,
  unlock
} = (0,_wordpress_private_apis__WEBPACK_IMPORTED_MODULE_0__.__dangerousOptInToUnstableAPIsOnlyForCoreModules)('I know using unstable features means my theme or plugin will inevitably break in the next version of WordPress.', '@wordpress/dataviews');
//# sourceMappingURL=lock-unlock.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/normalize-fields.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeFields: () => (/* binding */ normalizeFields)
/* harmony export */ });
/**
 * Internal dependencies
 */

/**
 * Apply default values and normalize the fields config.
 *
 * @param fields Fields config.
 * @return Normalized fields config.
 */
function normalizeFields(fields) {
  return fields.map(field => {
    const getValue = field.getValue || (({
      item
    }) => item[field.id]);
    return {
      ...field,
      header: field.header || field.id,
      getValue,
      render: field.render || getValue
    };
  });
}
//# sourceMappingURL=normalize-fields.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/pagination.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/pagination.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js");

/**
 * WordPress dependencies
 */




const Pagination = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.memo)(function Pagination({
  view,
  onChangeView,
  paginationInfo: {
    totalItems = 0,
    totalPages
  }
}) {
  if (!totalItems || !totalPages) {
    return null;
  }
  return !!totalItems && totalPages !== 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    expanded: false,
    spacing: 6,
    justify: "end",
    className: "dataviews-pagination"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    justify: "flex-start",
    expanded: false,
    spacing: 2,
    className: "dataviews-pagination__page-selection"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
  // translators: %s: Total number of pages.
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__._x)('Page <CurrentPageControl /> of %s', 'paging'), totalPages), {
    CurrentPageControl: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Current page'),
      value: view.page,
      options: Array.from(Array(totalPages)).map((_, i) => {
        const page = i + 1;
        return {
          value: page,
          label: page
        };
      }),
      onChange: newValue => {
        onChangeView({
          ...view,
          page: +newValue
        });
      },
      size: 'compact',
      __nextHasNoMarginBottom: true
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalHStack, {
    expanded: false,
    spacing: 1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => onChangeView({
      ...view,
      page: view.page - 1
    }),
    disabled: view.page === 1,
    __experimentalIsFocusable: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Previous page'),
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    showTooltip: true,
    size: "compact",
    tooltipPosition: "top"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: () => onChangeView({
      ...view,
      page: view.page + 1
    }),
    disabled: view.page >= totalPages,
    __experimentalIsFocusable: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Next page'),
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    showTooltip: true,
    size: "compact",
    tooltipPosition: "top"
  })));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);
//# sourceMappingURL=pagination.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/reset-filters.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/reset-filters.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetFilter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */


function ResetFilter({
  filters,
  view,
  onChangeView
}) {
  const isPrimary = field => filters.some(_filter => _filter.field === field && _filter.isPrimary);
  const isDisabled = !view.search && !view.filters?.some(_filter => _filter.value !== undefined || !isPrimary(_filter.field));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    disabled: isDisabled,
    __experimentalIsFocusable: true,
    size: "compact",
    variant: "tertiary",
    className: "dataviews-filters__reset-button",
    onClick: () => {
      onChangeView({
        ...view,
        page: 1,
        search: '',
        filters: []
      });
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset'));
}
//# sourceMappingURL=reset-filters.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/search-widget.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/search-widget.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchWidget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/__chunks/346FK57L.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/__chunks/G6ONQ5EH.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/__chunks/ZEXNX5JH.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item.js");
/* harmony import */ var _ariakit_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ariakit/react */ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! remove-accents */ "./node_modules/remove-accents/index.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(remove_accents__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/search.js");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");

/**
 * External dependencies
 */
// eslint-disable-next-line no-restricted-imports



/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */

const {
  CompositeV2: Composite,
  CompositeItemV2: CompositeItem,
  useCompositeStoreV2: useCompositeStore
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_6__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.privateApis);
const radioCheck = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_5__.Circle, {
  cx: 12,
  cy: 12,
  r: 3
}));
function normalizeSearchInput(input = '') {
  return remove_accents__WEBPACK_IMPORTED_MODULE_1___default()(input.trim().toLowerCase());
}
const EMPTY_ARRAY = [];
const getCurrentValue = (filterDefinition, currentFilter) => {
  if (filterDefinition.singleSelection) {
    return currentFilter?.value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value;
  }
  if (!Array.isArray(currentFilter?.value) && !!currentFilter?.value) {
    return [currentFilter.value];
  }
  return EMPTY_ARRAY;
};
const getNewValue = (filterDefinition, currentFilter, value) => {
  if (filterDefinition.singleSelection) {
    return value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value.includes(value) ? currentFilter.value.filter(v => v !== value) : [...currentFilter.value, value];
  }
  return [value];
};
function ListBox({
  view,
  filter,
  onChangeView
}) {
  const compositeStore = useCompositeStore({
    virtualFocus: true,
    focusLoop: true,
    // When we have no or just one operator, we can set the first item as active.
    // We do that by passing `undefined` to `defaultActiveId`. Otherwise, we set it to `null`,
    // so the first item is not selected, since the focus is on the operators control.
    defaultActiveId: filter.operators?.length === 1 ? undefined : null
  });
  const currentFilter = view.filters.find(f => f.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Composite, {
    store: compositeStore,
    role: "listbox",
    className: "dataviews-search-widget-listbox",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('List of: %1$s'), filter.name),
    onFocusVisible: () => {
      if (!compositeStore.getState().activeId) {
        compositeStore.move(compositeStore.first());
      }
    },
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_7__.CompositeTypeahead, {
      store: compositeStore
    })
  }, filter.elements.map(element => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_8__.CompositeHover, {
    store: compositeStore,
    key: element.value,
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompositeItem, {
      render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        "aria-label": element.label,
        role: "option",
        className: "dataviews-search-widget-listitem"
      }),
      onClick: () => {
        const newFilters = currentFilter ? [...view.filters.map(_filter => {
          if (_filter.field === filter.field) {
            return {
              ..._filter,
              operator: currentFilter.operator || filter.operators[0],
              value: getNewValue(filter, currentFilter, element.value)
            };
          }
          return _filter;
        })] : [...view.filters, {
          field: filter.field,
          operator: filter.operators[0],
          value: getNewValue(filter, currentFilter, element.value)
        }];
        onChangeView({
          ...view,
          page: 1,
          filters: newFilters
        });
      }
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dataviews-search-widget-listitem-check"
  }, filter.singleSelection && currentValue === element.value && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    icon: radioCheck
  }), !filter.singleSelection && currentValue.includes(element.value) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, element.label, !!element.description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dataviews-search-widget-listitem-description"
  }, element.description)))));
}
function ComboboxList({
  view,
  filter,
  onChangeView
}) {
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const deferredSearchValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useDeferredValue)(searchValue);
  const currentFilter = view.filters.find(_filter => _filter.field === filter.field);
  const currentValue = getCurrentValue(filter, currentFilter);
  const matches = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const normalizedSearch = normalizeSearchInput(deferredSearchValue);
    return filter.elements.filter(item => normalizeSearchInput(item.label).includes(normalizedSearch));
  }, [filter.elements, deferredSearchValue]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_10__.ComboboxProvider, {
    resetValueOnSelect: false,
    selectedValue: currentValue,
    setSelectedValue: value => {
      const newFilters = currentFilter ? [...view.filters.map(_filter => {
        if (_filter.field === filter.field) {
          return {
            ..._filter,
            operator: currentFilter.operator || filter.operators[0],
            value
          };
        }
        return _filter;
      })] : [...view.filters, {
        field: filter.field,
        operator: filter.operators[0],
        value
      }];
      onChangeView({
        ...view,
        page: 1,
        filters: newFilters
      });
    },
    setValue: setSearchValue
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-search-widget-filter-combobox__wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_11__.ComboboxLabel, {
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.VisuallyHidden, null)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search items')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_12__.Combobox, {
    autoSelect: "always",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search'),
    className: "dataviews-search-widget-filter-combobox__input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-search-widget-filter-combobox__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"]
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_14__.ComboboxList, {
    className: "dataviews-search-widget-filter-combobox-list",
    alwaysVisible: true
  }, matches.map(element => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_15__.ComboboxItem, {
      key: element.value,
      value: element.value,
      className: "dataviews-search-widget-listitem",
      hideOnClick: false,
      setValueOnClick: false,
      focusOnHover: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dataviews-search-widget-listitem-check"
    }, filter.singleSelection && currentValue === element.value && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
      icon: radioCheck
    }), !filter.singleSelection && currentValue.includes(element.value) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ariakit_react__WEBPACK_IMPORTED_MODULE_16__.ComboboxItemValue, {
      className: "dataviews-search-widget-filter-combobox-item-value",
      value: element.label
    }), !!element.description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dataviews-search-widget-listitem-description"
    }, element.description)));
  }), !matches.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No results found'))));
}
function SearchWidget(props) {
  const Widget = props.filter.elements.length > 10 ? ComboboxList : ListBox;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Widget, {
    ...props
  });
}
//# sourceMappingURL=search-widget.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/search.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/search.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);

/**
 * WordPress dependencies
 */




const Search = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.memo)(function Search({
  label,
  view,
  onChangeView
}) {
  const [search, setSearch, debouncedSearch] = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useDebouncedInput)(view.search);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setSearch(view.search);
  }, [view]);
  const onChangeViewRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(onChangeView);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    onChangeViewRef.current = onChangeView;
  }, [onChangeView]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    onChangeViewRef.current({
      ...view,
      page: 1,
      search: debouncedSearch
    });
  }, [debouncedSearch]);
  const searchLabel = label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SearchControl, {
    __nextHasNoMarginBottom: true,
    onChange: setSearch,
    value: search,
    label: searchLabel,
    placeholder: searchLabel,
    size: "compact"
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/single-selection-checkbox.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/single-selection-checkbox.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SingleSelectionCheckbox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */


function SingleSelectionCheckbox({
  selection,
  onSelectionChange,
  item,
  data,
  getItemId,
  primaryField,
  disabled
}) {
  const id = getItemId(item);
  const isSelected = selection.includes(id);
  let selectionLabel;
  if (primaryField?.getValue && item) {
    // eslint-disable-next-line @wordpress/valid-sprintf
    selectionLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: %s: item title. */
    isSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deselect item: %s') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select item: %s'), primaryField.getValue({
      item
    }));
  } else {
    selectionLabel = isSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a new item') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deselect item');
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
    className: "dataviews-view-table-selection-checkbox",
    __nextHasNoMarginBottom: true,
    "aria-label": selectionLabel,
    "aria-disabled": disabled,
    checked: isSelected,
    onChange: () => {
      if (disabled) {
        return;
      }
      if (!isSelected) {
        onSelectionChange(data.filter(_item => {
          const itemId = getItemId?.(_item);
          return itemId === id || selection.includes(itemId);
        }));
      } else {
        onSelectionChange(data.filter(_item => {
          const itemId = getItemId?.(_item);
          return itemId !== id && selection.includes(itemId);
        }));
      }
    }
  });
}
//# sourceMappingURL=single-selection-checkbox.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitizeOperators: () => (/* binding */ sanitizeOperators)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/**
 * Internal dependencies
 */

const sanitizeOperators = field => {
  let operators = field.filterBy?.operators;

  // Assign default values.
  if (!operators || !Array.isArray(operators)) {
    operators = [_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_ANY, _constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NONE];
  }

  // Transform legacy in, notIn operators to is, isNot.
  // To be removed in the future.
  if (operators.includes('in')) {
    operators = operators.filter(operator => operator !== 'is');
    operators.push('is');
  }
  if (operators.includes('notIn')) {
    operators = operators.filter(operator => operator !== 'notIn');
    operators.push('isNot');
  }

  // Make sure only valid operators are used.
  operators = operators.filter(operator => _constants__WEBPACK_IMPORTED_MODULE_0__.ALL_OPERATORS.includes(operator));

  // Do not allow mixing single & multiselection operators.
  // Remove multiselection operators if any of the single selection ones is present.
  if (operators.includes(_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS) || operators.includes(_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NOT)) {
    operators = operators.filter(operator => [_constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS, _constants__WEBPACK_IMPORTED_MODULE_0__.OPERATOR_IS_NOT].includes(operator));
  }
  return operators;
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/view-actions.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/view-actions.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/settings.js");
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _layouts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layouts */ "./node_modules/@wordpress/dataviews/build-module/layouts.js");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */



const {
  DropdownMenuV2: DropdownMenu,
  DropdownMenuGroupV2: DropdownMenuGroup,
  DropdownMenuItemV2: DropdownMenuItem,
  DropdownMenuRadioItemV2: DropdownMenuRadioItem,
  DropdownMenuCheckboxItemV2: DropdownMenuCheckboxItem,
  DropdownMenuItemLabelV2: DropdownMenuItemLabel
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_4__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.privateApis);
function ViewTypeMenu({
  view,
  onChangeView,
  supportedLayouts
}) {
  let _availableViews = _layouts__WEBPACK_IMPORTED_MODULE_5__.VIEW_LAYOUTS;
  if (supportedLayouts) {
    _availableViews = _availableViews.filter(_view => supportedLayouts.includes(_view.type));
  }
  if (_availableViews.length === 1) {
    return null;
  }
  const activeView = _availableViews.find(v => view.type === v.type);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
      suffix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        "aria-hidden": "true"
      }, activeView.label)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Layout')))
  }, _availableViews.map(availableView => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuRadioItem, {
      key: availableView.type,
      value: availableView.type,
      name: "view-actions-available-view",
      checked: availableView.type === view.type,
      hideOnClick: true,
      onChange: e => {
        onChangeView({
          ...view,
          type: e.target.value
        });
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, availableView.label));
  }));
}
const PAGE_SIZE_VALUES = [10, 20, 50, 100];
function PageSizeMenu({
  view,
  onChangeView
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
      suffix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        "aria-hidden": "true"
      }, view.perPage)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Items per page')))
  }, PAGE_SIZE_VALUES.map(size => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuRadioItem, {
      key: size,
      value: size,
      name: "view-actions-page-size",
      checked: view.perPage === size,
      onChange: () => {
        onChangeView({
          ...view,
          // `e.target.value` holds the same value as `size` but as a string,
          // so we use `size` directly to avoid parsing to int.
          perPage: size,
          page: 1
        });
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, size));
  }));
}
function FieldsVisibilityMenu({
  view,
  onChangeView,
  fields
}) {
  const hidableFields = fields.filter(field => field.enableHiding !== false && field.id !== view.layout.mediaField);
  if (!hidableFields?.length) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fields')))
  }, hidableFields?.map(field => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuCheckboxItem, {
      key: field.id,
      value: field.id,
      checked: !view.hiddenFields?.includes(field.id),
      onChange: () => {
        onChangeView({
          ...view,
          hiddenFields: view.hiddenFields?.includes(field.id) ? view.hiddenFields.filter(id => id !== field.id) : [...(view.hiddenFields || []), field.id]
        });
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, field.header));
  }));
}
function SortMenu({
  fields,
  view,
  onChangeView
}) {
  const sortableFields = fields.filter(field => field.enableSorting !== false);
  if (!sortableFields?.length) {
    return null;
  }
  const currentSortedField = fields.find(field => field.id === view.sort?.field);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
      suffix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        "aria-hidden": "true"
      }, currentSortedField?.header)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort by')))
  }, sortableFields?.map(field => {
    const sortedDirection = view.sort?.direction;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
      key: field.id,
      trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, field.header)),
      style: {
        minWidth: '220px'
      }
    }, Object.entries(_constants__WEBPACK_IMPORTED_MODULE_6__.SORTING_DIRECTIONS).map(([direction, info]) => {
      const isChecked = currentSortedField !== undefined && sortedDirection === direction && field.id === currentSortedField.id;
      const value = `${field.id}-${direction}`;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuRadioItem, {
        key: value
        // All sorting radio items share the same name, so that
        // selecting a sorting option automatically deselects the
        // previously selected one, even if it is displayed in
        // another submenu. The field and direction are passed via
        // the `value` prop.
        ,
        name: "view-actions-sorting",
        value: value,
        checked: isChecked,
        onChange: () => {
          onChangeView({
            ...view,
            sort: {
              field: field.id,
              direction
            }
          });
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, info.label));
    }));
  }));
}
const ViewActions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.memo)(function ViewActions({
  fields,
  view,
  onChangeView,
  supportedLayouts
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      size: "compact",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View options')
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ViewTypeMenu, {
    view: view,
    onChangeView: onChangeView,
    supportedLayouts: supportedLayouts
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SortMenu, {
    fields: fields,
    view: view,
    onChangeView: onChangeView
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldsVisibilityMenu, {
    fields: fields,
    view: view,
    onChangeView: onChangeView
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(PageSizeMenu, {
    view: view,
    onChangeView: onChangeView
  })));
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewActions);
//# sourceMappingURL=view-actions.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/view-grid.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/view-grid.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewGrid)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _item_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./item-actions */ "./node_modules/@wordpress/dataviews/build-module/item-actions.js");
/* harmony import */ var _single_selection_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./single-selection-checkbox */ "./node_modules/@wordpress/dataviews/build-module/single-selection-checkbox.js");
/* harmony import */ var _bulk_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/bulk-actions.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */



function GridItem({
  selection,
  data,
  onSelectionChange,
  getItemId,
  item,
  actions,
  mediaField,
  primaryField,
  visibleFields,
  badgeFields,
  columnFields
}) {
  const hasBulkAction = (0,_bulk_actions__WEBPACK_IMPORTED_MODULE_4__.useHasAPossibleBulkAction)(actions, item);
  const id = getItemId(item);
  const isSelected = selection.includes(id);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
    spacing: 0,
    key: id,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-view-grid__card', {
      'is-selected': hasBulkAction && isSelected
    }),
    onClickCapture: event => {
      if (event.ctrlKey || event.metaKey) {
        event.stopPropagation();
        event.preventDefault();
        if (!hasBulkAction) {
          return;
        }
        if (!isSelected) {
          onSelectionChange(data.filter(_item => {
            const itemId = getItemId?.(_item);
            return itemId === id || selection.includes(itemId);
          }));
        } else {
          onSelectionChange(data.filter(_item => {
            const itemId = getItemId?.(_item);
            return itemId !== id && selection.includes(itemId);
          }));
        }
      }
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-view-grid__media"
  }, mediaField?.render({
    item
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    justify: "space-between",
    className: "dataviews-view-grid__title-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_single_selection_checkbox__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: id,
    item: item,
    selection: selection,
    onSelectionChange: onSelectionChange,
    getItemId: getItemId,
    data: data,
    primaryField: primaryField,
    disabled: !hasBulkAction
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    className: "dataviews-view-grid__primary-field"
  }, primaryField?.render({
    item
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_item_actions__WEBPACK_IMPORTED_MODULE_6__["default"], {
    item: item,
    actions: actions,
    isCompact: true
  })), !!badgeFields?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalHStack, {
    className: "dataviews-view-grid__badge-fields",
    spacing: 2,
    wrap: true,
    align: "top",
    justify: "flex-start"
  }, badgeFields.map(field => {
    const renderedValue = field.render({
      item
    });
    if (!renderedValue) {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
      key: field.id,
      className: 'dataviews-view-grid__field-value'
    }, renderedValue);
  })), !!visibleFields?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
    className: "dataviews-view-grid__fields",
    spacing: 3
  }, visibleFields.map(field => {
    const renderedValue = field.render({
      item
    });
    if (!renderedValue) {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Flex, {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-view-grid__field', columnFields?.includes(field.id) ? 'is-column' : 'is-row'),
      key: field.id,
      gap: 1,
      justify: "flex-start",
      expanded: true,
      style: {
        height: 'auto'
      },
      direction: columnFields?.includes(field.id) ? 'column' : 'row'
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
      className: "dataviews-view-grid__field-name"
    }, field.header), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FlexItem, {
      className: "dataviews-view-grid__field-value",
      style: {
        maxHeight: 'none'
      }
    }, renderedValue)));
  })));
}
function ViewGrid({
  data,
  fields,
  view,
  actions,
  isLoading,
  getItemId,
  selection,
  onSelectionChange
}) {
  const mediaField = fields.find(field => field.id === view.layout.mediaField);
  const primaryField = fields.find(field => field.id === view.layout.primaryField);
  const {
    visibleFields,
    badgeFields
  } = fields.reduce((accumulator, field) => {
    if (view.hiddenFields.includes(field.id) || [view.layout.mediaField, view.layout.primaryField].includes(field.id)) {
      return accumulator;
    }
    // If the field is a badge field, add it to the badgeFields array
    // otherwise add it to the rest visibleFields array.
    const key = view.layout.badgeFields?.includes(field.id) ? 'badgeFields' : 'visibleFields';
    accumulator[key].push(field);
    return accumulator;
  }, {
    visibleFields: [],
    badgeFields: []
  });
  const hasData = !!data?.length;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, hasData && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalGrid, {
    gap: 6,
    columns: 2,
    alignment: "top",
    className: "dataviews-view-grid",
    "aria-busy": isLoading
  }, data.map(item => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(GridItem, {
      key: getItemId(item),
      selection: selection,
      data: data,
      onSelectionChange: onSelectionChange,
      getItemId: getItemId,
      item: item,
      actions: actions,
      mediaField: mediaField,
      primaryField: primaryField,
      visibleFields: visibleFields,
      badgeFields: badgeFields,
      columnFields: view.layout.columnFields
    });
  })), !hasData && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'dataviews-loading': isLoading,
      'dataviews-no-results': !isLoading
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No results'))));
}
//# sourceMappingURL=view-grid.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/view-list.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/view-list.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

const {
  useCompositeStoreV2: useCompositeStore,
  CompositeV2: Composite,
  CompositeItemV2: CompositeItem,
  CompositeRowV2: CompositeRow
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_6__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.privateApis);
function ListItem({
  id,
  item,
  isSelected,
  onSelect,
  mediaField,
  primaryField,
  visibleFields
}) {
  const itemRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isSelected]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompositeRow, {
    ref: itemRef,
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null),
    role: "row",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'is-selected': isSelected
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalHStack, {
    className: "dataviews-view-list__item-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    role: "gridcell"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CompositeItem, {
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null),
    role: "button",
    id: id,
    "aria-pressed": isSelected,
    "aria-labelledby": labelId,
    "aria-describedby": descriptionId,
    className: "dataviews-view-list__item",
    onClick: () => onSelect(item)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalHStack, {
    spacing: 3,
    justify: "start",
    alignment: "flex-start"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-view-list__media-wrapper"
  }, mediaField?.render({
    item
  }) || (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-view-list__media-placeholder"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, {
    spacing: 1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dataviews-view-list__primary-field",
    id: labelId
  }, primaryField?.render({
    item
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-view-list__fields",
    id: descriptionId
  }, visibleFields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: field.id,
    className: "dataviews-view-list__field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.VisuallyHidden, {
    as: "span",
    className: "dataviews-view-list__field-label"
  }, field.header), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dataviews-view-list__field-value"
  }, field.render({
    item
  })))))))))));
}
function ViewList({
  view,
  fields,
  data,
  isLoading,
  getItemId,
  onSelectionChange,
  selection,
  id: preferredId
}) {
  const baseId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.useInstanceId)(ViewList, 'view-list', preferredId);
  const selectedItem = data?.findLast(item => selection.includes(item.id));
  const mediaField = fields.find(field => field.id === view.layout.mediaField);
  const primaryField = fields.find(field => field.id === view.layout.primaryField);
  const visibleFields = fields.filter(field => !view.hiddenFields.includes(field.id) && ![view.layout.primaryField, view.layout.mediaField].includes(field.id));
  const onSelect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(item => onSelectionChange([item]), [onSelectionChange]);
  const getItemDomId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useCallback)(item => item ? `${baseId}-${getItemId(item)}` : undefined, [baseId, getItemId]);
  const store = useCompositeStore({
    defaultActiveId: getItemDomId(selectedItem)
  });
  const hasData = data?.length;
  if (!hasData) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'dataviews-loading': isLoading,
        'dataviews-no-results': !hasData && !isLoading
      })
    }, !hasData && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('No results')));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Composite, {
    id: baseId,
    render: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null),
    className: "dataviews-view-list",
    role: "grid",
    store: store
  }, data.map(item => {
    const id = getItemDomId(item);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ListItem, {
      key: id,
      id: id,
      item: item,
      isSelected: item === selectedItem,
      onSelect: onSelect,
      mediaField: mediaField,
      primaryField: primaryField,
      visibleFields: visibleFields
    });
  }));
}
//# sourceMappingURL=view-list.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/view-table.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/view-table.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/funnel.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/unseen.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _single_selection_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./single-selection-checkbox */ "./node_modules/@wordpress/dataviews/build-module/single-selection-checkbox.js");
/* harmony import */ var _lock_unlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lock-unlock */ "./node_modules/@wordpress/dataviews/build-module/lock-unlock.js");
/* harmony import */ var _item_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./item-actions */ "./node_modules/@wordpress/dataviews/build-module/item-actions.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./node_modules/@wordpress/dataviews/build-module/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./node_modules/@wordpress/dataviews/build-module/constants.js");
/* harmony import */ var _bulk_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./bulk-actions */ "./node_modules/@wordpress/dataviews/build-module/bulk-actions.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */






const {
  DropdownMenuV2: DropdownMenu,
  DropdownMenuGroupV2: DropdownMenuGroup,
  DropdownMenuItemV2: DropdownMenuItem,
  DropdownMenuRadioItemV2: DropdownMenuRadioItem,
  DropdownMenuItemLabelV2: DropdownMenuItemLabel,
  DropdownMenuSeparatorV2: DropdownMenuSeparator
} = (0,_lock_unlock__WEBPACK_IMPORTED_MODULE_5__.unlock)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.privateApis);
function WithDropDownMenuSeparators({
  children
}) {
  return _wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Children.toArray(children).filter(Boolean).map((child, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    key: i
  }, i > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuSeparator, null), child));
}
const sortArrows = {
  asc: '↑',
  desc: '↓'
};
const HeaderMenu = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(function HeaderMenu({
  field,
  view,
  onChangeView,
  onHide,
  setOpenedFilter
}, ref) {
  const isHidable = field.enableHiding !== false;
  const isSortable = field.enableSorting !== false;
  const isSorted = view.sort?.field === field.id;
  const operators = (0,_utils__WEBPACK_IMPORTED_MODULE_6__.sanitizeOperators)(field);
  // Filter can be added:
  // 1. If the field is not already part of a view's filters.
  // 2. If the field meets the type and operator requirements.
  // 3. If it's not primary. If it is, it should be already visible.
  const canAddFilter = !view.filters?.some(_filter => field.id === _filter.field) && !!field.elements?.length && !!operators.length && !field.filterBy?.isPrimary;
  if (!isSortable && !isHidable && !canAddFilter) {
    return field.header;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    align: "start",
    trigger: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      size: "compact",
      className: "dataviews-view-table-header-button",
      ref: ref,
      variant: "tertiary"
    }, field.header, isSorted && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      "aria-hidden": "true"
    }, isSorted && sortArrows[view.sort.direction])),
    style: {
      minWidth: '240px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WithDropDownMenuSeparators, null, isSortable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, Object.entries(_constants__WEBPACK_IMPORTED_MODULE_7__.SORTING_DIRECTIONS).map(([direction, info]) => {
    const isChecked = isSorted && view.sort.direction === direction;
    const value = `${field.id}-${direction}`;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuRadioItem, {
      key: value
      // All sorting radio items share the same name, so that
      // selecting a sorting option automatically deselects the
      // previously selected one, even if it is displayed in
      // another submenu. The field and direction are passed via
      // the `value` prop.
      ,
      name: "view-table-sorting",
      value: value,
      checked: isChecked,
      onChange: () => {
        onChangeView({
          ...view,
          sort: {
            field: field.id,
            direction
          }
        });
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, info.label));
  })), canAddFilter && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    prefix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
    }),
    onClick: () => {
      setOpenedFilter(field.id);
      onChangeView({
        ...view,
        page: 1,
        filters: [...(view.filters || []), {
          field: field.id,
          value: undefined,
          operator: operators[0]
        }]
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add filter')))), isHidable && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItem, {
    prefix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Icon, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
    }),
    onClick: () => {
      onHide(field);
      onChangeView({
        ...view,
        hiddenFields: view.hiddenFields.concat(field.id)
      });
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenuItemLabel, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide')))));
});
function BulkSelectionCheckbox({
  selection,
  onSelectionChange,
  data,
  actions
}) {
  const selectableItems = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    return data.filter(item => {
      return actions.some(action => action.supportsBulk && action.isEligible(item));
    });
  }, [data, actions]);
  const areAllSelected = selection.length === selectableItems.length;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.CheckboxControl, {
    className: "dataviews-view-table-selection-checkbox",
    __nextHasNoMarginBottom: true,
    checked: areAllSelected,
    indeterminate: !areAllSelected && selection.length,
    onChange: () => {
      if (areAllSelected) {
        onSelectionChange([]);
      } else {
        onSelectionChange(selectableItems);
      }
    },
    "aria-label": areAllSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deselect all') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select all')
  });
}
function TableRow({
  hasBulkActions,
  item,
  actions,
  id,
  visibleFields,
  primaryField,
  selection,
  getItemId,
  onSelectionChange,
  data
}) {
  const hasPossibleBulkAction = (0,_bulk_actions__WEBPACK_IMPORTED_MODULE_10__.useHasAPossibleBulkAction)(actions, item);
  const isSelected = selection.includes(id);
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Will be set to true if `onTouchStart` fires. This happens before
  // `onClick` and can be used to exclude touchscreen devices from certain
  // behaviours.
  const isTouchDevice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(false);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-view-table__row', {
      'is-selected': hasPossibleBulkAction && isSelected,
      'is-hovered': isHovered,
      'has-bulk-actions': hasPossibleBulkAction
    }),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchStart: () => {
      isTouchDevice.current = true;
    },
    onClick: () => {
      if (!isTouchDevice.current && document.getSelection().type !== 'Range') {
        if (!isSelected) {
          onSelectionChange(data.filter(_item => {
            const itemId = getItemId?.(_item);
            return itemId === id || selection.includes(itemId);
          }));
        } else {
          onSelectionChange(data.filter(_item => {
            const itemId = getItemId?.(_item);
            return itemId !== id && selection.includes(itemId);
          }));
        }
      }
    }
  }, hasBulkActions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "dataviews-view-table__checkbox-column",
    style: {
      width: '1%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dataviews-view-table__cell-content-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_single_selection_checkbox__WEBPACK_IMPORTED_MODULE_11__["default"], {
    id: id,
    item: item,
    selection: selection,
    onSelectionChange: onSelectionChange,
    getItemId: getItemId,
    data: data,
    primaryField: primaryField,
    disabled: !hasPossibleBulkAction
  }))), visibleFields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    key: field.id,
    style: {
      width: field.width || undefined,
      minWidth: field.minWidth || undefined,
      maxWidth: field.maxWidth || undefined
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('dataviews-view-table__cell-content-wrapper', {
      'dataviews-view-table__primary-field': primaryField?.id === field.id
    })
  }, field.render({
    item
  })))), !!actions?.length &&
  // Disable reason: we are not making the element interactive,
  // but preventing any click events from bubbling up to the
  // table row. This allows us to add a click handler to the row
  // itself (to toggle row selection) without erroneously
  // intercepting click events from ItemActions.

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "dataviews-view-table__actions-column",
    onClick: e => e.stopPropagation()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_item_actions__WEBPACK_IMPORTED_MODULE_12__["default"], {
    item: item,
    actions: actions
  }))
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */);
}
function ViewTable({
  view,
  onChangeView,
  fields,
  actions,
  data,
  getItemId,
  isLoading = false,
  selection,
  onSelectionChange,
  setOpenedFilter
}) {
  const headerMenuRefs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)(new Map());
  const headerMenuToFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useRef)();
  const [nextHeaderMenuToFocus, setNextHeaderMenuToFocus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)();
  const hasBulkActions = (0,_bulk_actions__WEBPACK_IMPORTED_MODULE_10__.useSomeItemHasAPossibleBulkAction)(actions, data);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (headerMenuToFocusRef.current) {
      headerMenuToFocusRef.current.focus();
      headerMenuToFocusRef.current = undefined;
    }
  });
  const tableNoticeId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useId)();
  if (nextHeaderMenuToFocus) {
    // If we need to force focus, we short-circuit rendering here
    // to prevent any additional work while we handle that.
    // Clearing out the focus directive is necessary to make sure
    // future renders don't cause unexpected focus jumps.
    headerMenuToFocusRef.current = nextHeaderMenuToFocus;
    setNextHeaderMenuToFocus();
    return;
  }
  const onHide = field => {
    const hidden = headerMenuRefs.current.get(field.id);
    const fallback = headerMenuRefs.current.get(hidden.fallback);
    setNextHeaderMenuToFocus(fallback?.node);
  };
  const visibleFields = fields.filter(field => !view.hiddenFields.includes(field.id) && ![view.layout.mediaField].includes(field.id));
  const hasData = !!data?.length;
  const sortValues = {
    asc: 'ascending',
    desc: 'descending'
  };
  const primaryField = fields.find(field => field.id === view.layout.primaryField);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "dataviews-view-table",
    "aria-busy": isLoading,
    "aria-describedby": tableNoticeId
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "dataviews-view-table__row"
  }, hasBulkActions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "dataviews-view-table__checkbox-column",
    style: {
      width: '1%'
    },
    "data-field-id": "selection",
    scope: "col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BulkSelectionCheckbox, {
    selection: selection,
    onSelectionChange: onSelectionChange,
    data: data,
    actions: actions
  })), visibleFields.map((field, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    key: field.id,
    style: {
      width: field.width || undefined,
      minWidth: field.minWidth || undefined,
      maxWidth: field.maxWidth || undefined
    },
    "data-field-id": field.id,
    "aria-sort": view.sort?.field === field.id && sortValues[view.sort.direction],
    scope: "col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HeaderMenu, {
    ref: node => {
      if (node) {
        headerMenuRefs.current.set(field.id, {
          node,
          fallback: visibleFields[index > 0 ? index - 1 : 1]?.id
        });
      } else {
        headerMenuRefs.current.delete(field.id);
      }
    },
    field: field,
    view: view,
    onChangeView: onChangeView,
    onHide: onHide,
    setOpenedFilter: setOpenedFilter
  }))), !!actions?.length && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    "data-field-id": "actions",
    className: "dataviews-view-table__actions-column"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dataviews-view-table-header"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Actions'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, hasData && data.map((item, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TableRow, {
    key: getItemId(item),
    item: item,
    hasBulkActions: hasBulkActions,
    actions: actions,
    id: getItemId(item) || index,
    visibleFields: visibleFields,
    primaryField: primaryField,
    selection: selection,
    getItemId: getItemId,
    onSelectionChange: onSelectionChange,
    data: data
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'dataviews-loading': isLoading,
      'dataviews-no-results': !hasData && !isLoading
    }),
    id: tableNoticeId
  }, !hasData && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No results'))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewTable);
//# sourceMappingURL=view-table.js.map

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
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/block-table.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/block-table.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const blockTable = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v3.5h-15V5c0-.3.2-.5.5-.5zm8 5.5h6.5v3.5H13V10zm-1.5 3.5h-7V10h7v3.5zm-7 5.5v-4h7v4.5H5c-.3 0-.5-.2-.5-.5zm14.5.5h-6V15h6.5v4c0 .3-.2.5-.5.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blockTable);
//# sourceMappingURL=block-table.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/category.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/category.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const category = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",
  fillRule: "evenodd",
  clipRule: "evenodd"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (category);
//# sourceMappingURL=category.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/check.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const check = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (check);
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-left.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-left.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const chevronLeft = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M14.6 7l-1.2-1L8 12l5.4 6 1.2-1-4.6-5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronLeft);
//# sourceMappingURL=chevron-left.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-right.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-right.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const chevronRight = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (chevronRight);
//# sourceMappingURL=chevron-right.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const closeSmall = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (closeSmall);
//# sourceMappingURL=close-small.js.map

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const cloud = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17.3 10.1c0-2.5-2.1-4.4-4.8-4.4-2.2 0-4.1 1.4-4.6 3.3h-.2C5.7 9 4 10.7 4 12.8c0 2.1 1.7 3.8 3.7 3.8h9c1.8 0 3.2-1.5 3.2-3.3.1-1.6-1.1-2.9-2.6-3.2zm-.5 5.1h-9c-1.2 0-2.2-1.1-2.2-2.3s1-2.4 2.2-2.4h1.3l.3-1.1c.4-1.3 1.7-2.2 3.2-2.2 1.8 0 3.3 1.3 3.3 2.9v1.3l1.3.2c.8.1 1.4.9 1.4 1.8-.1 1-.9 1.8-1.8 1.8z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloud);
//# sourceMappingURL=cloud.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/format-list-bullets-rtl.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const formatListBulletsRTL = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 8.8h8.9V7.2H4v1.6zm0 7h8.9v-1.5H4v1.5zM18 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatListBulletsRTL);
//# sourceMappingURL=format-list-bullets-rtl.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/format-list-bullets.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/format-list-bullets.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const formatListBullets = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM6 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatListBullets);
//# sourceMappingURL=format-list-bullets.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/funnel.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/funnel.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const funnel = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10 17.5H14V16H10V17.5ZM6 6V7.5H18V6H6ZM8 12.5H16V11H8V12.5Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (funnel);
//# sourceMappingURL=funnel.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/more-vertical.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/more-vertical.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const moreVertical = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 19h-2v-2h2v2zm0-6h-2v-2h2v2zm0-6h-2V5h2v2z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moreVertical);
//# sourceMappingURL=more-vertical.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const plus = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plus);
//# sourceMappingURL=plus.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/search.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/search.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const search = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/settings.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/settings.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const settings = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m19 7.5h-7.628c-.3089-.87389-1.1423-1.5-2.122-1.5-.97966 0-1.81309.62611-2.12197 1.5h-2.12803v1.5h2.12803c.30888.87389 1.14231 1.5 2.12197 1.5.9797 0 1.8131-.62611 2.122-1.5h7.628z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m19 15h-2.128c-.3089-.8739-1.1423-1.5-2.122-1.5s-1.8131.6261-2.122 1.5h-7.628v1.5h7.628c.3089.8739 1.1423 1.5 2.122 1.5s1.8131-.6261 2.122-1.5h2.128z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (settings);
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/unseen.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/unseen.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const unseen = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4.67 10.664s-2.09 1.11-2.917 1.582l.494.87 1.608-.914.002.002c.343.502.86 1.17 1.563 1.84.348.33.742.663 1.185.976L5.57 16.744l.858.515 1.02-1.701a9.1 9.1 0 0 0 4.051 1.18V19h1v-2.263a9.1 9.1 0 0 0 4.05-1.18l1.021 1.7.858-.514-1.034-1.723c.442-.313.837-.646 1.184-.977.703-.669 1.22-1.337 1.563-1.839l.002-.003 1.61.914.493-.87c-1.75-.994-2.918-1.58-2.918-1.58l-.003.005a8.29 8.29 0 0 1-.422.689 10.097 10.097 0 0 1-1.36 1.598c-1.218 1.16-3.042 2.293-5.544 2.293-2.503 0-4.327-1.132-5.546-2.293a10.099 10.099 0 0 1-1.359-1.599 8.267 8.267 0 0 1-.422-.689l-.003-.005Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (unseen);
//# sourceMappingURL=unseen.js.map

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



function Footer({
  title
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "inner-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://github.com/Tropicalista/search-console",
    target: "_blank"
  }, "Github"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/search-console/",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Support', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/formello/reviews/#new-post",
    target: "_blank"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rate ', 'formello'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    icon: "star-filled"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/logo.svg */ "./assets/logo.svg");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



function Header({
  title
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "masthead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_assets_logo_svg__WEBPACK_IMPORTED_MODULE_1__.ReactComponent, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "masthead__branding"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, title)));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _slideshow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slideshow */ "./src/components/ads/slideshow.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);





const Ads = props => {
  const {
    plugins
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    const myPlugins = select('core').getPlugins({
      per_page: -1
    });
    return {
      plugins: myPlugins?.filter(plugin => {
        return ['formello/formello', 'popper/popper', 'pdf-embed/pdf-embed'].includes(plugin.plugin);
      })
    };
  });
  const [shown, setShown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => {
    // getting stored value
    const toShow = window.localStorage.getItem('sc-shown');
    const initialValue = JSON.parse(toShow);
    return initialValue || new Date().getTime();
  });
  if (!plugins) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      overflowX: 'hidden'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_slideshow__WEBPACK_IMPORTED_MODULE_3__["default"], {
    plugins: plugins,
    ...props
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ads);

/***/ }),

/***/ "./src/components/ads/slideshow.js":
/*!*****************************************!*\
  !*** ./src/components/ads/slideshow.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);






const myAds = [{
  name: 'Systeme.io',
  ad: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Free online marketing platform with funnel builder. Create popup, squeeze page, funnel automations all for FREE. No credit card required', 'search-console'),
  link: 'https://systeme.io/?sa=sa0181820865b77bd583c54e7e7668a6a77e78f1c7',
  isLink: true
}, {
  name: 'Formello',
  ad: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Lightweight Gutenberg contact form builder, blazingly fast with no external dependencies and ReCaptcha support.', 'search-console'),
  slug: 'formello'
}, {
  name: 'Popper',
  ad: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do you need a POPUP plugin? Check Popper a Popup builder with exit-intent powered by Gutenberg.', 'search-console'),
  slug: 'popper'
}, {
  name: 'Pdf Embed',
  ad: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A Gutenberg block to embed your PDF with official Adobe API.', 'search-console'),
  slug: 'pdf-embed'
}];
const SlideShow = ({
  plugins,
  direction,
  noSlide
}) => {
  const [currentIndex, setCurrentIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [slides, setSlides] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const {
    saveEntityRecord
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    init();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (noSlide) {
      return;
    }
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  });
  const init = () => {
    const match = myAds.filter(ad => {
      return plugins?.find(p => p.name === ad.name) ? false : true;
    });
    setSlides(match);
  };
  const installPlugin = slug => {
    saveEntityRecord('root', 'plugin', {
      slug,
      status: 'active'
    });
  };
  const goToNextSlide = () => {
    if (slides.length > 1) {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
    }
  };
  const setMargin = index => {
    if (0 === index) {
      const margin = currentIndex > 0 ? '-' + 100 / slides.length * currentIndex + '%' : 0;
      return margin;
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slideshow-container",
    style: {
      width: `calc( 100% * ${slides.length})`
    }
  }, slides.map((plugin, index) => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: `slide ${index === currentIndex ? 'active' : ''}`,
      style: {
        width: `calc( 100% / ${slides.length})`,
        marginLeft: setMargin(index)
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.__experimentalHStack, {
      justify: "flex-start",
      direction: direction
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, plugin.ad), plugin.isLink ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
      variant: "primary",
      size: "small",
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Get FREE offer!', 'search-console'),
      href: plugin.link,
      target: "_blank",
      icon: "megaphone"
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
      variant: "primary",
      size: "small",
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install', 'search-console'),
      onClick: () => installPlugin(plugin.slug)
    })));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SlideShow);

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
  animation: {
    duration: 1000,
    easing: 'out',
    startup: true
  },
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
      format: '#%',
      viewWindow: {
        min: 0,
        max: 1
      }
    },
    3: {
      direction: -1,
      viewWindow: {
        min: 1
      }
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
/* harmony export */   MyChart: () => (/* binding */ MyChart)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_google_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-google-charts */ "./node_modules/react-google-charts/dist/index.js");
/* harmony import */ var _chart_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart-options */ "./src/components/dashboard/chart/chart-options.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _loading_spinner_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../loading-spinner.js */ "./src/components/loading-spinner.js");








function MyChart() {
  const {
    settings,
    query,
    showError
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  const [table, setTable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (settings.token.access_token) getData();
  }, [query, settings.token]);
  const getData = () => {
    window.gapi?.client?.setToken(settings.token);
    window.gapi?.client?.webmasters?.searchanalytics.query({
      ...query,
      siteUrl: settings.site,
      dimensions: ['date'],
      fields: 'rows'
    }).then(response => {
      const data = response.result.rows;
      const temp = [];
      temp.push([(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Keys', 'search-console'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Clicks', 'search-console'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Impressions', 'search-console'), 'CTR', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Position', 'search-console')]);
      data.forEach(row => {
        temp.push([window.moment(row.keys[0], 'YYYY-MM-DD').toDate(), formatData(row.clicks), formatData(row.impressions), {
          v: row.ctr,
          f: formatData(row.ctr, 'ctr')
        }, {
          v: row.position,
          f: formatData(row.position, 'position')
        }]);
      });
      setTable(temp);
    }).catch(error => {
      showError(error);
    });
  };
  const formatData = (val, metric) => {
    if ('ctr' === metric) {
      return (val * 100).toFixed(2) + '%';
    }
    if ('position' === metric) {
      return val.toFixed(2);
    }
    return val;
  };
  if (!table) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_spinner_js__WEBPACK_IMPORTED_MODULE_6__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Fetching data…', 'search-console')
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-chart"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_google_charts__WEBPACK_IMPORTED_MODULE_7__.Chart, {
    chartType: "LineChart",
    data: table,
    options: _chart_options__WEBPACK_IMPORTED_MODULE_1__["default"],
    legendToggle: true
  }));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _countries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./countries */ "./src/components/dashboard/modals/countries.js");





function Country(props) {
  const {
    filter,
    handleChange
  } = props;
  const onChange = val => {
    handleChange(Object.keys(_countries__WEBPACK_IMPORTED_MODULE_4__["default"])[Object.values(_countries__WEBPACK_IMPORTED_MODULE_4__["default"]).indexOf(val)]);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
    value: filter.expression ? [filter.expression] : [],
    suggestions: Object.values(_countries__WEBPACK_IMPORTED_MODULE_4__["default"]),
    onChange: tokens => onChange(tokens[0]),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose a country', 'search-console'),
    maxLength: "1",
    __experimentalShowHowTo: false
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function Device(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RadioControl, {
    selected: filter?.expression,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Desktop', 'search-console'),
      value: 'desktop'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Mobile', 'search-console'),
      value: 'mobile'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Tablet', 'search-console'),
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function Page(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    selected: filter?.operator,
    options: [{
      value: 'CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Urls containing', 'search-console')
    }, {
      value: 'NOT_CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Urls not containing', 'search-console')
    }, {
      value: 'EQUALS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exact url', 'search-console')
    }],
    onChange: option => {
      handleChange(filter?.expression, option);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function Query(props) {
  const {
    filter,
    handleChange
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    value: filter?.operator,
    options: [{
      value: 'CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Queries containing', 'search-console')
    }, {
      value: 'NOT_CONTAINS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Queries not containing', 'search-console')
    }, {
      value: 'EQUALS',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Exact query', 'search-console')
    }],
    onChange: option => {
      handleChange(filter?.expression, option);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: filter?.expression || '',
    onChange: option => {
      handleChange(option, filter?.operator ? filter?.operator : 'CONTAINS');
    }
  }));
}

/***/ }),

/***/ "./src/components/dashboard/table/datedropdown.js":
/*!********************************************************!*\
  !*** ./src/components/dashboard/table/datedropdown.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateDropdown)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");






function DateDropdown() {
  const {
    updateQuery,
    updateSetting,
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  const [range, setRange] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 28 days', 'search-console'));
  const setDate = (num, period) => {
    const date = moment().subtract(2, 'days').subtract(num, period).format('YYYY-MM-DD');
    setRange('Last ' + num + ' ' + period);
    updateSetting('customDate', false);
    updateQuery('startDate', date);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    className: "my-container-class-name",
    contentClassName: "my-popover-content-classname",
    placement: "bottom right",
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: onToggle,
      "aria-expanded": isOpen
    }, settings.customDate ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom date', 'search-console') : range),
    renderContent: ({
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(7, 'days');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 7 days', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(28, 'days');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 28 days', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(1, 'months');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last month', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(3, 'months');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 3 months', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(6, 'months');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 6 months', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(12, 'months');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 12 months', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setDate(16, 'months');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Last 18 months', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        updateSetting('customDate', !settings.customDate);
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom date', 'search-console'))))
  });
}

/***/ }),

/***/ "./src/components/dashboard/table/dateselect.js":
/*!******************************************************!*\
  !*** ./src/components/dashboard/table/dateselect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateSelect: () => (/* binding */ DateSelect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/date */ "@wordpress/date");
/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _datedropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datedropdown */ "./src/components/dashboard/table/datedropdown.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");







function DateSelect() {
  const {
    query,
    updateQuery,
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_6__.SettingsContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Flex, null, settings.customDate && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "From:")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: onToggle,
      "aria-expanded": isOpen
    }, query.startDate ? (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.format)('F j, Y', query.startDate) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Click here to set start date.', 'search-console')),
    renderContent: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
      __nextRemoveHelpButton: true,
      currentDate: query.startDate,
      onChange: val => {
        updateQuery('startDate', (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)('Y-m-d', val));
      },
      isInvalidDate: val => {
        if (query.endDate) {
          return new Date(val) > new Date(query.endDate);
        }
      }
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "To:")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: onToggle,
      "aria-expanded": isOpen
    }, query.endDate ? (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.format)('F j, Y', query.endDate) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Click here to set end date.', 'search-console')),
    renderContent: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.DatePicker, {
      __nextRemoveHelpButton: true,
      currentDate: query.endDate,
      onChange: val => updateQuery('endDate', (0,_wordpress_date__WEBPACK_IMPORTED_MODULE_2__.dateI18n)('Y-m-d', val)),
      isInvalidDate: val => new Date(val) < new Date(query.startDate) || new Date(val) > new Date()
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FlexItem, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_datedropdown__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");





function Dimensions() {
  const {
    updateQuery,
    query
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const onSelect = dimension => {
    updateQuery('dimensions', [dimension]);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-dimensions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: query.dimensions.includes('query') ? 'is-selected' : '',
    onClick: () => onSelect('query')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Query', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: query.dimensions.includes('page') ? 'is-selected' : '',
    onClick: () => onSelect('page')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pages', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: query.dimensions.includes('country') ? 'is-selected' : '',
    onClick: () => onSelect('country')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Countries', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: query.dimensions.includes('device') ? 'is-selected' : '',
    onClick: () => onSelect('device')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Devices', 'search-console')));
}

/***/ }),

/***/ "./src/components/dashboard/table/filters.js":
/*!***************************************************!*\
  !*** ./src/components/dashboard/table/filters.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Filters: () => (/* binding */ Filters)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modals */ "./src/components/dashboard/table/modals.js");
/* harmony import */ var _dateselect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dateselect */ "./src/components/dashboard/table/dateselect.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");








const ENTER = 'Enter';
const SPACE = ' ';
function Filters() {
  const [showModal, setShowModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const {
    query,
    updateQuery
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_6__.SettingsContext);
  const onRequestClose = () => {
    setShowModal(false);
  };
  const remove = filter => {
    const filters = query.dimensionFilterGroups.map(dimension => {
      return dimension.filters;
    });
    const replaced = [...filters[0].filter(i => i.dimension !== filter.dimension)];
    if (replaced.length) {
      updateQuery('dimensionFilterGroups', [{
        filters: replaced
      }]);
    } else {
      updateQuery('dimensionFilterGroups', []);
    }
  };
  const setType = type => {
    updateQuery('type', type);
  };
  const getSign = filter => {
    if (!filter.operator) {
      return '';
    }
    // eslint-disable-next-line no-nested-ternary
    return 'EQUALS' === filter.operator ? '' : 'CONTAINS' === filter.operator ? '+' : '-';
  };
  const filters = query.dimensionFilterGroups.map(f => f.filters);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-filters"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-filters-options'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    popoverProps: {
      placement: 'bottom-start'
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "primary",
      onClick: onToggle,
      "aria-expanded": isOpen
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search type: ', 'search-console') + query.type),
    renderContent: ({
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setType('web');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Web', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setType('image');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Image', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setType('video');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Video', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setType('news');
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('News', 'search-console')))
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dropdown, {
    className: "my-container-class-name",
    contentClassName: "my-popover-content-classname",
    placement: "bottom right",
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: onToggle,
      "aria-expanded": isOpen,
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
      iconPosition: 'right',
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New', 'search-console')
    }),
    renderContent: ({
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuGroup, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setShowModal({
          dimension: 'query',
          expression: '',
          operator: ''
        });
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Query', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setShowModal({
          dimension: 'page',
          expression: '',
          operator: ''
        });
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setShowModal({
          dimension: 'country',
          expression: '',
          operator: ''
        });
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Country', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.MenuItem, {
      onClick: () => {
        setShowModal({
          dimension: 'device',
          expression: '',
          operator: ''
        });
        onToggle();
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Device', 'search-console')))
  }), filters.map(filter => {
    return filter.map((f, i) => {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: 'dataviews-filter-summary__chip-container',
        key: i
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "dataviews-filter-summary__chip has-reset",
        role: "button",
        tabIndex: "0",
        "aria-pressed": "false",
        "aria-expanded": "false",
        onClick: () => setShowModal(f),
        onKeyDown: event => {
          if ([ENTER, SPACE].includes(event.key)) {
            setShowModal(f);
            event.preventDefault();
          }
        }
      }, f.dimension + ': ' + getSign(f) + f.expression, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
        className: 'dataviews-filter-summary__chip-remove has-values',
        onClick: e => {
          e.stopPropagation();
          remove(f);
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
      }))));
    });
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dateselect__WEBPACK_IMPORTED_MODULE_5__.DateSelect, {
    query: query
  }))), showModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_modals__WEBPACK_IMPORTED_MODULE_4__.MyModal, {
    onRequestClose: onRequestClose,
    modal: showModal,
    title: showModal.dimension
  }));
}

/***/ }),

/***/ "./src/components/dashboard/table/index.js":
/*!*************************************************!*\
  !*** ./src/components/dashboard/table/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Table: () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/dataviews.js");
/* harmony import */ var _dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dimensions */ "./src/components/dashboard/table/dimensions.js");
/* harmony import */ var _modals_countries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modals/countries */ "./src/components/dashboard/modals/countries.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */



function Table() {
  const {
    settings,
    query,
    showError
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [view, setView] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    type: 'table',
    perPage: 10,
    page: 1,
    sort: {},
    search: '',
    filters: [],
    hiddenFields: [],
    layout: {}
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    getData();
  }, [query, settings.token]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    filterData();
  }, [view.sort]);
  const getData = () => {
    window.gapi.client.setToken(settings.token);
    window.gapi?.client?.webmasters.searchanalytics.query({
      ...query,
      siteUrl: settings.site
    }).then(response => {
      if (!response.result.rows) {
        setData([]);
        return;
      }
      setData(normalizeData(response.result.rows));
    }).catch(error => {
      showError(error);
    });
  };
  const paginateArray = array => {
    const page = array.slice((view.page - 1) * view.perPage, view.page * view.perPage);
    return page;
  };
  const filterData = () => {
    if ('keys' === view.sort.field) {
      sortKeys();
    } else {
      sortData();
    }
  };
  const sortKeys = () => {
    if ('desc' === view.sort.direction) {
      data.sort((a, b) => b.keys.localeCompare(a.keys));
    } else {
      data.sort((a, b) => a.keys.localeCompare(b.keys));
    }
  };
  const sortData = () => {
    if ('desc' === view.sort.direction) {
      data.sort((a, b) => a[view.sort.field] - b[view.sort.field]);
    } else {
      data.sort((a, b) => b[view.sort.field] - a[view.sort.field]);
    }
  };
  const normalizeData = array => {
    return array.map(item => {
      return {
        ...item,
        keys: item.keys[0]
      };
    });
  };
  const fields = [{
    id: 'keys',
    header: 'Query',
    enableHiding: false,
    render: ({
      item
    }) => {
      if (query.dimensions.includes('country')) {
        return _modals_countries__WEBPACK_IMPORTED_MODULE_3__["default"][item.keys];
      }
      return item.keys;
    }
  }, {
    id: 'clicks',
    header: 'Clicks',
    enableHiding: false,
    render: ({
      item
    }) => {
      return item.clicks;
    }
  }, {
    id: 'ctr',
    header: 'CTR',
    render: ({
      item
    }) => {
      return (item.ctr * 100).toFixed(2) + '%';
    }
  }, {
    id: 'impressions',
    header: 'Impressions',
    render: ({
      item
    }) => {
      return item.impressions;
    }
  }, {
    id: 'position',
    header: 'Position',
    render: ({
      item
    }) => {
      return Math.round(item.position * 100) / 100;
    }
  }];
  const paginationInfo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    totalItems: data.length,
    totalPages: Math.ceil(data.length / view.perPage)
  }), [data, view.perPage]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-table-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-table-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dimensions__WEBPACK_IMPORTED_MODULE_2__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_5__["default"], {
    paginationInfo: paginationInfo,
    data: paginateArray(data),
    fields: fields,
    view: view,
    onChangeView: setView,
    getItemId: item => item.keys,
    supportedLayouts: ['table'],
    search: false
  }));
}

/***/ }),

/***/ "./src/components/dashboard/table/modals.js":
/*!**************************************************!*\
  !*** ./src/components/dashboard/table/modals.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyModal: () => (/* binding */ MyModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modals_device__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modals/device */ "./src/components/dashboard/modals/device.js");
/* harmony import */ var _modals_country__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modals/country */ "./src/components/dashboard/modals/country.js");
/* harmony import */ var _modals_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modals/page */ "./src/components/dashboard/modals/page.js");
/* harmony import */ var _modals_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modals/query */ "./src/components/dashboard/modals/query.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../context/settings-context */ "./src/context/settings-context.js");

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
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_8__.SettingsContext);
  const [filter, setFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(modal);
  const [searchType, setSearchType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(query.searchType);
  const handleChange = (expression, operator) => {
    if ('searchType' === modal.dimension) {
      setSearchType(expression);
    } else {
      setFilter({
        dimension: modal.dimension,
        expression,
        operator
      });
    }
  };
  const saveChange = () => {
    if ('searchType' === modal.dimension) {
      updateQuery('searchType', searchType);
    } else {
      const dimensions = [...query.dimensionFilterGroups];
      const filtersArr = dimensions.map(dimension => {
        return dimension.filters;
      });
      let filters = filtersArr.shift() || [];
      if (!filters.length) {
        filters.push(filter);
      } else {
        const match = filters.find(f => f.dimension === filter.dimension);
        // if not found we push
        if (!match) {
          filters.push(filter);
        }
        if (match) {
          filters = filters.map(item => item.dimension === filter.dimension ? filter : item);
        }
      }
      updateQuery('dimensionFilterGroups', [{
        filters
      }]);
    }
    onRequestClose();
  };
  const modals = {
    device: _modals_device__WEBPACK_IMPORTED_MODULE_4__["default"],
    country: _modals_country__WEBPACK_IMPORTED_MODULE_5__["default"],
    page: _modals_page__WEBPACK_IMPORTED_MODULE_6__["default"],
    query: _modals_query__WEBPACK_IMPORTED_MODULE_7__["default"]
  };
  const ModalFilter = modals[modal.dimension];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title,
    onRequestClose: onRequestClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-modal-container'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ModalFilter, {
    handleChange: handleChange,
    searchType: searchType,
    filter: filter
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: onRequestClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    onClick: saveChange,
    disabled: 'searchType' === modal.dimension ? false : !filter?.expression
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'search-console')))));
}

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


function LoadingSpinner({
  text
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");





const Credentials = () => {
  var _settings$credentials, _settings$credentials2;
  const {
    settings,
    updateSetting
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  function setCredentials(key, val) {
    const credentials = Object.assign({}, settings.credentials);
    credentials[key] = val;
    updateSetting('credentials', credentials);
  }
  const authUrl = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)('https://developers.google.com/web/site-kit?sitename=%1$s&siteurl=%2$s', settings.title, settings.wp_url);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Credentials', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.RawHTML, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: Developer console url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<p>You need to create a <a target="_blank" href="%1$s">Google Developer Console</a> account before proceeding to authorization.</p>' + '<p>Create a project from Google Developers Console if none exists.</p>' + '<p>Go to Credentials tab, then create credential for OAuth client.</p>' + 'Application type will be Web Application. Add <code>%2$s</code> in Authorized redirect URIs. This will give you Client ID and Client Secret key.<p>', 'search-console'), `https://console.developers.google.com/`, settings.wp_url)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.RawHTML, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)( /* translators: Google Site Kit url. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('<p><b>Tip</b>: the simplest way to get your own credentials is to go to <a target="_blank" href="%s">Google Site Kit</a> site and follow step. Don\'t forget to add your site url as authorized Javascript origin.</p>', 'search-console'), authUrl)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    placeholder: 'CLIENT ID',
    value: (_settings$credentials = settings?.credentials?.client_id) !== null && _settings$credentials !== void 0 ? _settings$credentials : '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Client ID', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please go to Developer Console to obtain your credentials.', 'search-console'),
    onChange: val => {
      setCredentials('client_id', val);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _oauth_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./oauth-button */ "./src/components/settings/oauth-button.js");
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-oauth/google */ "./node_modules/@react-oauth/google/dist/index.esm.js");







const GoogleOAuth = props => {
  const {
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Oauth', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (!settings?.credentials?.client_id?.length || !settings?.credentials?.client_secret?.length) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: "warning",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You must insert a Client Id and a Client secret to correctly request your authentication token.', 'search-console')), settings?.credentials?.client_id && settings?.credentials?.client_secret && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_react_oauth_google__WEBPACK_IMPORTED_MODULE_6__.GoogleOAuthProvider, {
    clientId: settings?.credentials?.client_id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_oauth_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ...props
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleOAuth);

/***/ }),

/***/ "./src/components/settings/help.js":
/*!*****************************************!*\
  !*** ./src/components/settings/help.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Help)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ads__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ads */ "./src/components/ads/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




function Help() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ads__WEBPACK_IMPORTED_MODULE_2__["default"], {
    direction: "column"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Need help?', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Detailed documentation is available on the plugin website.', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: "https://www.francescopepe.com/docs/search-console"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Documentation', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('We would love to help you out if you need any help.', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: "https://wordpress.org/support/plugin/search-console/"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Ask a question', 'search-console')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, {
    className: "ads-container__reviews"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Do you like the plugin?', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('If you like search-console plugin you can share a review to help us and spread some love!', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: "https://wordpress.org/support/plugin/search-console/reviews/#new-post"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Rate 5 stars!', 'search-console')))));
}

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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @react-oauth/google */ "./node_modules/@react-oauth/google/dist/index.esm.js");







const GoogleOauthButton = () => {
  const {
    updateSetting,
    settings,
    revokeToken
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  const [message, setMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const googleLogin = (0,_react_oauth_google__WEBPACK_IMPORTED_MODULE_6__.useGoogleLogin)({
    flow: 'auth-code',
    onSuccess: async ({
      code
    }) => {
      getToken(code);
    },
    scope: 'https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/siteverification email'
  });
  const hasAccess = (0,_react_oauth_google__WEBPACK_IMPORTED_MODULE_6__.hasGrantedAnyScopeGoogle)(window.search_console.token, 'https://www.googleapis.com/auth/webmasters.readonly');
  const getToken = code => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
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
  const getEmail = () => {
    if (settings.token.id_token) {
      return JSON.parse(atob(settings.token.id_token.split('.')[1])).email;
    }
    return null;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "primary",
    onClick: () => googleLogin(),
    icon: 'google'
  }, getEmail() || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Login with Google', 'search-console')), settings.token.id_token && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Revoke token', 'search-console'),
    onClick: () => revokeToken(),
    isDestructive: true,
    isSmall: true
  })), message && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");







function PostTypeSelection() {
  const {
    settings,
    updateSetting,
    saveSettings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_6__.SettingsContext);

  // useSelect to retrieve all post types
  const postTypes = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.store).getPostTypes({
    per_page: -1
  }), []);
  const addPostType = val => {
    updateSetting('postTypes', [...settings.postTypes, val]);
    saveSettings();
  };
  const removePostType = val => {
    const filteredArray = settings.postTypes.filter(item => item !== val);
    updateSetting('postTypes', filteredArray);
    saveSettings();
  };

  // Options expects [{label: ..., value: ...}]
  const postTypeOptions = !Array.isArray(postTypes) ? postTypes : postTypes.filter(
  // Filter out internal WP post types eg: wp_block, wp_navigation, wp_template, wp_template_part..
  postType => postType.viewable).map(
  // Format the options for display in the <SelectControl/>
  postType => ({
    label: postType.labels.singular_name,
    value: postType.slug // the value saved as postType in attributes
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Choose on which post type you want see Search Console data.', 'search-console')), postTypeOptions && postTypeOptions.map((postType, i) => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/cloud.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */





function SaveButton() {
  const [status] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('saved');
  const {
    isSaving,
    saveSettings,
    hasEdits
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_5__.SettingsContext);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "flex-start"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    className: 'save-settings__save-button',
    onClick: () => saveSettings(),
    disabled: isSaving || !hasEdits,
    isBusy: isSaving,
    variant: "primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'search-console')), [isSaving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Animate, {
    type: "loading",
    key: "saving"
  }, ({
    className: animateClassName
  }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "flex-start",
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('message', animateClassName),
    gap: 1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving', 'block-visibility'))), status === 'error' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _verification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./verification */ "./src/components/settings/verification.js");
/* harmony import */ var _post_type_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./post-type-selection */ "./src/components/settings/post-type-selection.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");







const SiteSelect = props => {
  const {
    settings,
    updateSetting,
    refreshToken,
    saveSettings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_6__.SettingsContext);
  const [sites, setSites] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (settings.token.access_token) getSites();
  }, [settings.token]);
  const getSites = () => {
    const options = [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select a site', 'search-console')
    }];
    window.gapi?.client?.setToken(settings.token);
    window.gapi?.client?.webmasters?.sites.list().then(s => {
      s.result.siteEntry.forEach(site => {
        options.push({
          value: site.siteUrl,
          label: site.siteUrl
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Options', 'search-console'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    options: sites,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose site', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose one of your sites.', 'search-console'),
    value: settings.site,
    onChange: val => {
      updateSetting('site', val);
      saveSettings();
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_post_type_selection__WEBPACK_IMPORTED_MODULE_5__["default"], {
    ...props
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_verification__WEBPACK_IMPORTED_MODULE_4__["default"], {
    ...props
  })));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/settings-context */ "./src/context/settings-context.js");





const Verification = () => {
  const {
    settings,
    updateSetting,
    refreshToken,
    saveSettings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_4__.SettingsContext);
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
          saveSettings();
        }).catch(error => {
          if (401 === error.status) {
            refreshToken();
          }
        });
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "search-console-Advanced"
  }, settings.site && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Do you want to add meta tag verification on your site?', 'search-console')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add verification to site?', 'search-console'),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Check this if you want output meta verification on frontend.', 'search-console'),
    checked: settings.siteVerification,
    onChange: val => {
      updateSetting('siteVerification', val);
      saveSettings();
    }
  })), settings.siteVerification && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalInputControl, {
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please click on icon to generate your meta verification tag.', 'search-console'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your meta verification tag', 'search-console'),
    value: settings.meta,
    onChange: val => {
      updateSetting('meta', val);
    },
    suffix: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./router */ "./src/router/index.js");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ "./src/store/index.js");
/* harmony import */ var _routes_dashboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./routes/dashboard */ "./src/routes/dashboard.js");
/* harmony import */ var _routes_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes/settings */ "./src/routes/settings.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Header */ "./src/components/Header.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Footer */ "./src/components/Footer.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @react-oauth/google */ "./node_modules/@react-oauth/google/dist/index.esm.js");















const Router = () => {
  const history = (0,_router__WEBPACK_IMPORTED_MODULE_5__.useHistory)();
  const {
    params
  } = (0,_router__WEBPACK_IMPORTED_MODULE_5__.useLocation)();
  const menuRoot = document.querySelector('#toplevel_page_search-console');
  const reset = () => {
    const page = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_6__.getQueryArg)(window.location.href, 'page');
    if (!page) {
      return;
    }
    for (const child of menuRoot.querySelectorAll('a')) {
      const target = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_6__.getQueryArg)(child.href, 'page');
      if (page === target) {
        child.classList.add('current');
        child.parentElement.classList.add('current');
      } else {
        child.classList.remove('current');
        child.parentElement.classList.remove('current');
      }
    }
  };
  const handleChange = e => {
    e.preventDefault();
    history.push({
      page: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_6__.getQueryArg)(e.target.href, 'page')
    });
    reset();
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    reset();
    menuRoot.addEventListener('click', handleChange, false);
    return () => {
      menuRoot.removeEventListener('click', handleChange);
    };
  }, []);
  history.listen(() => {
    reset();
  });
  if ('search-console-settings' === params.page) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_routes_settings__WEBPACK_IMPORTED_MODULE_10__["default"], null);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_routes_dashboard__WEBPACK_IMPORTED_MODULE_9__["default"], null);
};
const App = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_react_oauth_google__WEBPACK_IMPORTED_MODULE_14__.GoogleOAuthProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_router__WEBPACK_IMPORTED_MODULE_5__.RouterProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Header__WEBPACK_IMPORTED_MODULE_11__["default"], {
    title: 'Search Console'
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_settings_context__WEBPACK_IMPORTED_MODULE_13__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Router, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notifications, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Footer__WEBPACK_IMPORTED_MODULE_12__["default"], null)));
};
function Notifications() {
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store).getNotices(), []);
  const {
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store);
  const snackbarNotices = notices.filter(({
    type
  }) => type === 'snackbar');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SnackbarList, {
    notices: snackbarNotices,
    onRemove: removeNotice
  });
}
window.addEventListener('DOMContentLoaded', () => {
  const domNode = document.getElementById('search-console-wrapper');
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(domNode);
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(App, null));
});

/***/ }),

/***/ "./src/router/history.js":
/*!*******************************!*\
  !*** ./src/router/history.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");
/* harmony import */ var _components_dashboard_chart_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/dashboard/chart/index.js */ "./src/components/dashboard/chart/index.js");
/* harmony import */ var _components_dashboard_table_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/dashboard/table/index.js */ "./src/components/dashboard/table/index.js");
/* harmony import */ var _components_dashboard_table_filters_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/dashboard/table/filters.js */ "./src/components/dashboard/table/filters.js");
/* harmony import */ var _components_ads_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ads/index */ "./src/components/ads/index.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../router */ "./src/router/index.js");











const Dashboard = () => {
  const history = (0,_router__WEBPACK_IMPORTED_MODULE_10__.useHistory)();
  const {
    settings,
    ready
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_9__.SettingsContext);
  if (!ready || !settings) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching data…', 'search-console')
    });
  }
  const noticeString = text => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)(text, {
    a: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('settings page', 'search-console'),
      onClick: () => history.push({
        page: 'search-console-settings'
      }),
      variant: "link"
    })
  });
  if (!settings.token || !settings.token.refresh_token) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please authenticate on <a />.', 'search-console'))));
  }
  if (!settings.credentials.client_secret || !settings.credentials.client_id) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please provide a Client Secret and a Client ID on <a />.', 'search-console'))));
  }
  if (!settings.site) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      status: "warning",
      isDismissible: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, noticeString((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please select a site on <a />.', 'search-console'))));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-dashboard'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_chart_index_js__WEBPACK_IMPORTED_MODULE_5__.MyChart, null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_table_filters_js__WEBPACK_IMPORTED_MODULE_7__.Filters, null))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ads_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
    noSlide: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Card, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_dashboard_table_index_js__WEBPACK_IMPORTED_MODULE_6__.Table, null)))));
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_settings_google_oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/settings/google-oauth */ "./src/components/settings/google-oauth.js");
/* harmony import */ var _components_settings_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/settings/credentials */ "./src/components/settings/credentials.js");
/* harmony import */ var _components_settings_help__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/settings/help */ "./src/components/settings/help.js");
/* harmony import */ var _components_settings_site_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/settings/site-select */ "./src/components/settings/site-select.js");
/* harmony import */ var _components_settings_save_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/settings/save-button */ "./src/components/settings/save-button.js");
/* harmony import */ var _components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/loading-spinner.js */ "./src/components/loading-spinner.js");
/* harmony import */ var _context_settings_context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../context/settings-context */ "./src/context/settings-context.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__);











const Settings = () => {
  const {
    ready,
    settings
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_9__.useContext)(_context_settings_context__WEBPACK_IMPORTED_MODULE_8__.SettingsContext);
  if (!ready || !settings) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_loading_spinner_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
      text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fetching data…', 'search-console')
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: 'search-console-settings'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__.__experimentalGrid, {
    columns: 4,
    templateColumns: "3fr 1fr",
    gap: "4",
    align: "flex-start",
    className: "popper-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_google_oauth__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_site_select__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_credentials__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_save_button__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__.__experimentalVStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_settings_help__WEBPACK_IMPORTED_MODULE_4__["default"], null))));
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
  reducer(state = DEFAULT_STATE, action) {
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

/***/ "./node_modules/history/index.js":
/*!***************************************!*\
  !*** ./node_modules/history/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

var didWarnAboutKeySpread = {};
function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    {
      if (hasOwnProperty.call(props, 'key')) {
        var componentName = getComponentNameFromType(type);
        var keys = Object.keys(props).filter(function (k) {
          return k !== 'key';
        });
        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

          didWarnAboutKeySpread[componentName + beforeExample] = true;
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./node_modules/remove-accents/index.js":
/*!**********************************************!*\
  !*** ./node_modules/remove-accents/index.js ***!
  \**********************************************/
/***/ ((module) => {

var characterMap = {
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"Ấ": "A",
	"Ắ": "A",
	"Ẳ": "A",
	"Ẵ": "A",
	"Ặ": "A",
	"Æ": "AE",
	"Ầ": "A",
	"Ằ": "A",
	"Ȃ": "A",
	"Ả": "A",
	"Ạ": "A",
	"Ẩ": "A",
	"Ẫ": "A",
	"Ậ": "A",
	"Ç": "C",
	"Ḉ": "C",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"Ế": "E",
	"Ḗ": "E",
	"Ề": "E",
	"Ḕ": "E",
	"Ḝ": "E",
	"Ȇ": "E",
	"Ẻ": "E",
	"Ẽ": "E",
	"Ẹ": "E",
	"Ể": "E",
	"Ễ": "E",
	"Ệ": "E",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"Ḯ": "I",
	"Ȋ": "I",
	"Ỉ": "I",
	"Ị": "I",
	"Ð": "D",
	"Ñ": "N",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"Ố": "O",
	"Ṍ": "O",
	"Ṓ": "O",
	"Ȏ": "O",
	"Ỏ": "O",
	"Ọ": "O",
	"Ổ": "O",
	"Ỗ": "O",
	"Ộ": "O",
	"Ờ": "O",
	"Ở": "O",
	"Ỡ": "O",
	"Ớ": "O",
	"Ợ": "O",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"Ủ": "U",
	"Ụ": "U",
	"Ử": "U",
	"Ữ": "U",
	"Ự": "U",
	"Ý": "Y",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"ấ": "a",
	"ắ": "a",
	"ẳ": "a",
	"ẵ": "a",
	"ặ": "a",
	"æ": "ae",
	"ầ": "a",
	"ằ": "a",
	"ȃ": "a",
	"ả": "a",
	"ạ": "a",
	"ẩ": "a",
	"ẫ": "a",
	"ậ": "a",
	"ç": "c",
	"ḉ": "c",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"ế": "e",
	"ḗ": "e",
	"ề": "e",
	"ḕ": "e",
	"ḝ": "e",
	"ȇ": "e",
	"ẻ": "e",
	"ẽ": "e",
	"ẹ": "e",
	"ể": "e",
	"ễ": "e",
	"ệ": "e",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"ḯ": "i",
	"ȋ": "i",
	"ỉ": "i",
	"ị": "i",
	"ð": "d",
	"ñ": "n",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"ố": "o",
	"ṍ": "o",
	"ṓ": "o",
	"ȏ": "o",
	"ỏ": "o",
	"ọ": "o",
	"ổ": "o",
	"ỗ": "o",
	"ộ": "o",
	"ờ": "o",
	"ở": "o",
	"ỡ": "o",
	"ớ": "o",
	"ợ": "o",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"ủ": "u",
	"ụ": "u",
	"ử": "u",
	"ữ": "u",
	"ự": "u",
	"ý": "y",
	"ÿ": "y",
	"Ā": "A",
	"ā": "a",
	"Ă": "A",
	"ă": "a",
	"Ą": "A",
	"ą": "a",
	"Ć": "C",
	"ć": "c",
	"Ĉ": "C",
	"ĉ": "c",
	"Ċ": "C",
	"ċ": "c",
	"Č": "C",
	"č": "c",
	"C̆": "C",
	"c̆": "c",
	"Ď": "D",
	"ď": "d",
	"Đ": "D",
	"đ": "d",
	"Ē": "E",
	"ē": "e",
	"Ĕ": "E",
	"ĕ": "e",
	"Ė": "E",
	"ė": "e",
	"Ę": "E",
	"ę": "e",
	"Ě": "E",
	"ě": "e",
	"Ĝ": "G",
	"Ǵ": "G",
	"ĝ": "g",
	"ǵ": "g",
	"Ğ": "G",
	"ğ": "g",
	"Ġ": "G",
	"ġ": "g",
	"Ģ": "G",
	"ģ": "g",
	"Ĥ": "H",
	"ĥ": "h",
	"Ħ": "H",
	"ħ": "h",
	"Ḫ": "H",
	"ḫ": "h",
	"Ĩ": "I",
	"ĩ": "i",
	"Ī": "I",
	"ī": "i",
	"Ĭ": "I",
	"ĭ": "i",
	"Į": "I",
	"į": "i",
	"İ": "I",
	"ı": "i",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"Ḱ": "K",
	"ḱ": "k",
	"K̆": "K",
	"k̆": "k",
	"Ĺ": "L",
	"ĺ": "l",
	"Ļ": "L",
	"ļ": "l",
	"Ľ": "L",
	"ľ": "l",
	"Ŀ": "L",
	"ŀ": "l",
	"Ł": "l",
	"ł": "l",
	"Ḿ": "M",
	"ḿ": "m",
	"M̆": "M",
	"m̆": "m",
	"Ń": "N",
	"ń": "n",
	"Ņ": "N",
	"ņ": "n",
	"Ň": "N",
	"ň": "n",
	"ŉ": "n",
	"N̆": "N",
	"n̆": "n",
	"Ō": "O",
	"ō": "o",
	"Ŏ": "O",
	"ŏ": "o",
	"Ő": "O",
	"ő": "o",
	"Œ": "OE",
	"œ": "oe",
	"P̆": "P",
	"p̆": "p",
	"Ŕ": "R",
	"ŕ": "r",
	"Ŗ": "R",
	"ŗ": "r",
	"Ř": "R",
	"ř": "r",
	"R̆": "R",
	"r̆": "r",
	"Ȓ": "R",
	"ȓ": "r",
	"Ś": "S",
	"ś": "s",
	"Ŝ": "S",
	"ŝ": "s",
	"Ş": "S",
	"Ș": "S",
	"ș": "s",
	"ş": "s",
	"Š": "S",
	"š": "s",
	"Ţ": "T",
	"ţ": "t",
	"ț": "t",
	"Ț": "T",
	"Ť": "T",
	"ť": "t",
	"Ŧ": "T",
	"ŧ": "t",
	"T̆": "T",
	"t̆": "t",
	"Ũ": "U",
	"ũ": "u",
	"Ū": "U",
	"ū": "u",
	"Ŭ": "U",
	"ŭ": "u",
	"Ů": "U",
	"ů": "u",
	"Ű": "U",
	"ű": "u",
	"Ų": "U",
	"ų": "u",
	"Ȗ": "U",
	"ȗ": "u",
	"V̆": "V",
	"v̆": "v",
	"Ŵ": "W",
	"ŵ": "w",
	"Ẃ": "W",
	"ẃ": "w",
	"X̆": "X",
	"x̆": "x",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Y̆": "Y",
	"y̆": "y",
	"Ź": "Z",
	"ź": "z",
	"Ż": "Z",
	"ż": "z",
	"Ž": "Z",
	"ž": "z",
	"ſ": "s",
	"ƒ": "f",
	"Ơ": "O",
	"ơ": "o",
	"Ư": "U",
	"ư": "u",
	"Ǎ": "A",
	"ǎ": "a",
	"Ǐ": "I",
	"ǐ": "i",
	"Ǒ": "O",
	"ǒ": "o",
	"Ǔ": "U",
	"ǔ": "u",
	"Ǖ": "U",
	"ǖ": "u",
	"Ǘ": "U",
	"ǘ": "u",
	"Ǚ": "U",
	"ǚ": "u",
	"Ǜ": "U",
	"ǜ": "u",
	"Ứ": "U",
	"ứ": "u",
	"Ṹ": "U",
	"ṹ": "u",
	"Ǻ": "A",
	"ǻ": "a",
	"Ǽ": "AE",
	"ǽ": "ae",
	"Ǿ": "O",
	"ǿ": "o",
	"Þ": "TH",
	"þ": "th",
	"Ṕ": "P",
	"ṕ": "p",
	"Ṥ": "S",
	"ṥ": "s",
	"X́": "X",
	"x́": "x",
	"Ѓ": "Г",
	"ѓ": "г",
	"Ќ": "К",
	"ќ": "к",
	"A̋": "A",
	"a̋": "a",
	"E̋": "E",
	"e̋": "e",
	"I̋": "I",
	"i̋": "i",
	"Ǹ": "N",
	"ǹ": "n",
	"Ồ": "O",
	"ồ": "o",
	"Ṑ": "O",
	"ṑ": "o",
	"Ừ": "U",
	"ừ": "u",
	"Ẁ": "W",
	"ẁ": "w",
	"Ỳ": "Y",
	"ỳ": "y",
	"Ȁ": "A",
	"ȁ": "a",
	"Ȅ": "E",
	"ȅ": "e",
	"Ȉ": "I",
	"ȉ": "i",
	"Ȍ": "O",
	"ȍ": "o",
	"Ȑ": "R",
	"ȑ": "r",
	"Ȕ": "U",
	"ȕ": "u",
	"B̌": "B",
	"b̌": "b",
	"Č̣": "C",
	"č̣": "c",
	"Ê̌": "E",
	"ê̌": "e",
	"F̌": "F",
	"f̌": "f",
	"Ǧ": "G",
	"ǧ": "g",
	"Ȟ": "H",
	"ȟ": "h",
	"J̌": "J",
	"ǰ": "j",
	"Ǩ": "K",
	"ǩ": "k",
	"M̌": "M",
	"m̌": "m",
	"P̌": "P",
	"p̌": "p",
	"Q̌": "Q",
	"q̌": "q",
	"Ř̩": "R",
	"ř̩": "r",
	"Ṧ": "S",
	"ṧ": "s",
	"V̌": "V",
	"v̌": "v",
	"W̌": "W",
	"w̌": "w",
	"X̌": "X",
	"x̌": "x",
	"Y̌": "Y",
	"y̌": "y",
	"A̧": "A",
	"a̧": "a",
	"B̧": "B",
	"b̧": "b",
	"Ḑ": "D",
	"ḑ": "d",
	"Ȩ": "E",
	"ȩ": "e",
	"Ɛ̧": "E",
	"ɛ̧": "e",
	"Ḩ": "H",
	"ḩ": "h",
	"I̧": "I",
	"i̧": "i",
	"Ɨ̧": "I",
	"ɨ̧": "i",
	"M̧": "M",
	"m̧": "m",
	"O̧": "O",
	"o̧": "o",
	"Q̧": "Q",
	"q̧": "q",
	"U̧": "U",
	"u̧": "u",
	"X̧": "X",
	"x̧": "x",
	"Z̧": "Z",
	"z̧": "z",
	"й":"и",
	"Й":"И",
	"ё":"е",
	"Ё":"Е",
};

var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');

function matcher(match) {
	return characterMap[match];
}

var removeAccents = function(string) {
	return string.replace(allAccents, matcher);
};

var hasAccents = function(string) {
	return !!string.match(firstAccent);
};

module.exports = removeAccents;
module.exports.has = hasAccents;
module.exports.remove = removeAccents;


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
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

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["compose"];

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

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/private-apis":
/*!*************************************!*\
  !*** external ["wp","privateApis"] ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["privateApis"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/22K762VQ.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/22K762VQ.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCollectionStore: () => (/* binding */ createCollectionStore)
/* harmony export */ });
/* harmony import */ var _EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EAHJFCU4.js */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DLOEKDPY.js */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";





// src/collection/collection-store.ts
function isElementPreceding(a, b) {
  return Boolean(
    b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING
  );
}
function sortBasedOnDOMPosition(items) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort(([indexA, a], [indexB, b]) => {
    const elementA = a.element;
    const elementB = b.element;
    if (elementA === elementB)
      return 0;
    if (!elementA || !elementB)
      return 0;
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });
  if (isOrderDifferent) {
    return pairs.map(([_, item]) => item);
  }
  return items;
}
function getCommonParent(items) {
  var _a;
  const firstItem = items.find((item) => !!item.element);
  const lastItem = [...items].reverse().find((item) => !!item.element);
  let parentElement = (_a = firstItem == null ? void 0 : firstItem.element) == null ? void 0 : _a.parentElement;
  while (parentElement && (lastItem == null ? void 0 : lastItem.element)) {
    const parent = parentElement;
    if (lastItem && parent.contains(lastItem.element)) {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }
  return (0,_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getDocument)(parentElement).body;
}
function getPrivateStore(store) {
  return store == null ? void 0 : store.__unstablePrivateStore;
}
function createCollectionStore(props = {}) {
  var _a;
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.throwOnConflictingProps)(props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const items = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.items,
    syncState == null ? void 0 : syncState.items,
    props.defaultItems,
    []
  );
  const itemsMap = new Map(items.map((item) => [item.id, item]));
  const initialState = {
    items,
    renderedItems: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.renderedItems, [])
  };
  const syncPrivateStore = getPrivateStore(props.store);
  const privateStore = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(
    { items, renderedItems: initialState.renderedItems },
    syncPrivateStore
  );
  const collection = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(initialState, props.store);
  const sortItems = (renderedItems) => {
    const sortedItems = sortBasedOnDOMPosition(renderedItems);
    privateStore.setState("renderedItems", sortedItems);
    collection.setState("renderedItems", sortedItems);
  };
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(collection, () => (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.init)(privateStore));
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(privateStore, () => {
    return (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.batch)(privateStore, ["items"], (state) => {
      collection.setState("items", state.items);
    });
  });
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(privateStore, () => {
    return (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.batch)(privateStore, ["renderedItems"], (state) => {
      let firstRun = true;
      let raf = requestAnimationFrame(() => {
        const { renderedItems } = collection.getState();
        if (state.renderedItems === renderedItems)
          return;
        sortItems(state.renderedItems);
      });
      if (typeof IntersectionObserver !== "function") {
        return () => cancelAnimationFrame(raf);
      }
      const ioCallback = () => {
        if (firstRun) {
          firstRun = false;
          return;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => sortItems(state.renderedItems));
      };
      const root = getCommonParent(state.renderedItems);
      const observer = new IntersectionObserver(ioCallback, { root });
      for (const item of state.renderedItems) {
        if (!item.element)
          continue;
        observer.observe(item.element);
      }
      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    });
  });
  const mergeItem = (item, setItems, canDeleteFromMap = false) => {
    let prevItem;
    setItems((items2) => {
      const index = items2.findIndex(({ id }) => id === item.id);
      const nextItems = items2.slice();
      if (index !== -1) {
        prevItem = items2[index];
        const nextItem = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, prevItem), item);
        nextItems[index] = nextItem;
        itemsMap.set(item.id, nextItem);
      } else {
        nextItems.push(item);
        itemsMap.set(item.id, item);
      }
      return nextItems;
    });
    const unmergeItem = () => {
      setItems((items2) => {
        if (!prevItem) {
          if (canDeleteFromMap) {
            itemsMap.delete(item.id);
          }
          return items2.filter(({ id }) => id !== item.id);
        }
        const index = items2.findIndex(({ id }) => id === item.id);
        if (index === -1)
          return items2;
        const nextItems = items2.slice();
        nextItems[index] = prevItem;
        itemsMap.set(item.id, prevItem);
        return nextItems;
      });
    };
    return unmergeItem;
  };
  const registerItem = (item) => mergeItem(
    item,
    (getItems) => privateStore.setState("items", getItems),
    true
  );
  return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, collection), {
    registerItem,
    renderItem: (item) => (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.chain)(
      registerItem(item),
      mergeItem(
        item,
        (getItems) => privateStore.setState("renderedItems", getItems)
      )
    ),
    item: (id) => {
      if (!id)
        return null;
      let item = itemsMap.get(id);
      if (!item) {
        const { items: items2 } = collection.getState();
        item = items2.find((item2) => item2.id === id);
        if (item) {
          itemsMap.set(id, item);
        }
      }
      return item || null;
    },
    // @ts-expect-error Internal
    __unstablePrivateStore: privateStore
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __objRest: () => (/* binding */ __objRest),
/* harmony export */   __spreadProps: () => (/* binding */ __spreadProps),
/* harmony export */   __spreadValues: () => (/* binding */ __spreadValues)
/* harmony export */ });
"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addItemToArray: () => (/* binding */ addItemToArray),
/* harmony export */   flatten2DArray: () => (/* binding */ flatten2DArray),
/* harmony export */   reverseArray: () => (/* binding */ reverseArray),
/* harmony export */   toArray: () => (/* binding */ toArray)
/* harmony export */ });
"use client";

// src/utils/array.ts
function toArray(arg) {
  if (Array.isArray(arg)) {
    return arg;
  }
  return typeof arg !== "undefined" ? [arg] : [];
}
function addItemToArray(array, item, index = -1) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
function flatten2DArray(array) {
  const flattened = [];
  for (const row of array) {
    flattened.push(...row);
  }
  return flattened;
}
function reverseArray(array) {
  return array.slice().reverse();
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/AF6IUUFN.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/AF6IUUFN.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopoverStore: () => (/* binding */ createPopoverStore)
/* harmony export */ });
/* harmony import */ var _SX2XFD6A_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SX2XFD6A.js */ "./node_modules/@ariakit/core/esm/__chunks/SX2XFD6A.js");
/* harmony import */ var _EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EAHJFCU4.js */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";





// src/popover/popover-store.ts
function createPopoverStore(_a = {}) {
  var _b = _a, {
    popover: otherPopover
  } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__objRest)(_b, [
    "popover"
  ]);
  const store = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.mergeStore)(
    props.store,
    (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.omit)(otherPopover, [
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.throwOnConflictingProps)(props, store);
  const syncState = store == null ? void 0 : store.getState();
  const dialog = (0,_SX2XFD6A_js__WEBPACK_IMPORTED_MODULE_2__.createDialogStore)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, props), { store }));
  const placement = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(
    props.placement,
    syncState == null ? void 0 : syncState.placement,
    "bottom"
  );
  const initialState = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, dialog.getState()), {
    placement,
    currentPlacement: placement,
    anchorElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.anchorElement, null),
    popoverElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.popoverElement, null),
    arrowElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_3__.defaultValue)(syncState == null ? void 0 : syncState.arrowElement, null),
    rendered: Symbol("rendered")
  });
  const popover = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(initialState, dialog, store);
  return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, dialog), popover), {
    setAnchorElement: (element) => popover.setState("anchorElement", element),
    setPopoverElement: (element) => popover.setState("popoverElement", element),
    setArrowElement: (element) => popover.setState("arrowElement", element),
    render: () => popover.setState("rendered", Symbol("rendered"))
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),
/* harmony export */   closest: () => (/* binding */ closest),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   getActiveElement: () => (/* binding */ getActiveElement),
/* harmony export */   getDocument: () => (/* binding */ getDocument),
/* harmony export */   getPopupItemRole: () => (/* binding */ getPopupItemRole),
/* harmony export */   getPopupRole: () => (/* binding */ getPopupRole),
/* harmony export */   getScrollingElement: () => (/* binding */ getScrollingElement),
/* harmony export */   getTextboxSelection: () => (/* binding */ getTextboxSelection),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   isButton: () => (/* binding */ isButton),
/* harmony export */   isFrame: () => (/* binding */ isFrame),
/* harmony export */   isPartiallyHidden: () => (/* binding */ isPartiallyHidden),
/* harmony export */   isTextField: () => (/* binding */ isTextField),
/* harmony export */   isVisible: () => (/* binding */ isVisible),
/* harmony export */   matches: () => (/* binding */ matches),
/* harmony export */   scrollIntoViewIfNeeded: () => (/* binding */ scrollIntoViewIfNeeded),
/* harmony export */   setSelectionRange: () => (/* binding */ setSelectionRange)
/* harmony export */ });
"use client";

// src/utils/dom.ts
var canUseDOM = checkIsBrowser();
function checkIsBrowser() {
  var _a;
  return typeof window !== "undefined" && !!((_a = window.document) == null ? void 0 : _a.createElement);
}
function getDocument(node) {
  return node ? node.ownerDocument || node : document;
}
function getWindow(node) {
  return getDocument(node).defaultView || window;
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getDocument(node);
  if (!(activeElement == null ? void 0 : activeElement.nodeName)) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(
      activeElement.contentDocument.body,
      activeDescendant
    );
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function contains(parent, child) {
  return parent === child || parent.contains(child);
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button")
    return true;
  if (tagName === "input" && element.type) {
    return buttonInputTypes.indexOf(element.type) !== -1;
  }
  return false;
}
var buttonInputTypes = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
];
function matches(element, selectors) {
  if ("matches" in element) {
    return element.matches(selectors);
  }
  if ("msMatchesSelector" in element) {
    return element.msMatchesSelector(selectors);
  }
  return element.webkitMatchesSelector(selectors);
}
function isVisible(element) {
  const htmlElement = element;
  return htmlElement.offsetWidth > 0 || htmlElement.offsetHeight > 0 || element.getClientRects().length > 0;
}
function closest(element, selectors) {
  if ("closest" in element)
    return element.closest(selectors);
  do {
    if (matches(element, selectors))
      return element;
    element = element.parentElement || element.parentNode;
  } while (element !== null && element.nodeType === 1);
  return null;
}
function isTextField(element) {
  try {
    const isTextInput = element instanceof HTMLInputElement && element.selectionStart !== null;
    const isTextArea = element.tagName === "TEXTAREA";
    return isTextInput || isTextArea || false;
  } catch (error) {
    return false;
  }
}
function getPopupRole(element, fallback) {
  const allowedPopupRoles = ["dialog", "menu", "listbox", "tree", "grid"];
  const role = element == null ? void 0 : element.getAttribute("role");
  if (role && allowedPopupRoles.indexOf(role) !== -1) {
    return role;
  }
  return fallback;
}
function getPopupItemRole(element, fallback) {
  var _a;
  const itemRoleByPopupRole = {
    menu: "menuitem",
    listbox: "option",
    tree: "treeitem",
    grid: "gridcell"
  };
  const popupRole = getPopupRole(element);
  if (!popupRole)
    return fallback;
  const key = popupRole;
  return (_a = itemRoleByPopupRole[key]) != null ? _a : fallback;
}
function getTextboxSelection(element) {
  let start = 0;
  let end = 0;
  if (isTextField(element)) {
    start = element.selectionStart || 0;
    end = element.selectionEnd || 0;
  } else if (element.isContentEditable) {
    const selection = getDocument(element).getSelection();
    if ((selection == null ? void 0 : selection.rangeCount) && selection.anchorNode && contains(element, selection.anchorNode) && selection.focusNode && contains(element, selection.focusNode)) {
      const range = selection.getRangeAt(0);
      const nextRange = range.cloneRange();
      nextRange.selectNodeContents(element);
      nextRange.setEnd(range.startContainer, range.startOffset);
      start = nextRange.toString().length;
      nextRange.setEnd(range.endContainer, range.endOffset);
      end = nextRange.toString().length;
    }
  }
  return { start, end };
}
function scrollIntoViewIfNeeded(element, arg) {
  if (isPartiallyHidden(element) && "scrollIntoView" in element) {
    element.scrollIntoView(arg);
  }
}
function getScrollingElement(element) {
  if (!element)
    return null;
  if (element.clientHeight && element.scrollHeight > element.clientHeight) {
    const { overflowY } = getComputedStyle(element);
    const isScrollable = overflowY !== "visible" && overflowY !== "hidden";
    if (isScrollable)
      return element;
  } else if (element.clientWidth && element.scrollWidth > element.clientWidth) {
    const { overflowX } = getComputedStyle(element);
    const isScrollable = overflowX !== "visible" && overflowX !== "hidden";
    if (isScrollable)
      return element;
  }
  return getScrollingElement(element.parentElement) || document.scrollingElement || document.body;
}
function isPartiallyHidden(element) {
  const elementRect = element.getBoundingClientRect();
  const scroller = getScrollingElement(element);
  if (!scroller)
    return false;
  const scrollerRect = scroller.getBoundingClientRect();
  const isHTML = scroller.tagName === "HTML";
  const scrollerTop = isHTML ? scrollerRect.top + scroller.scrollTop : scrollerRect.top;
  const scrollerBottom = isHTML ? scroller.clientHeight : scrollerRect.bottom;
  const scrollerLeft = isHTML ? scrollerRect.left + scroller.scrollLeft : scrollerRect.left;
  const scrollerRight = isHTML ? scroller.clientWidth : scrollerRect.right;
  const top = elementRect.top < scrollerTop;
  const left = elementRect.left < scrollerLeft;
  const bottom = elementRect.bottom > scrollerBottom;
  const right = elementRect.right > scrollerRight;
  return top || left || bottom || right;
}
function setSelectionRange(element, ...args) {
  if (/text|search|password|tel|url/i.test(element.type)) {
    element.setSelectionRange(...args);
  }
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   batch: () => (/* binding */ batch),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   mergeStore: () => (/* binding */ mergeStore),
/* harmony export */   omit: () => (/* binding */ omit2),
/* harmony export */   pick: () => (/* binding */ pick2),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   subscribe: () => (/* binding */ subscribe),
/* harmony export */   sync: () => (/* binding */ sync),
/* harmony export */   throwOnConflictingProps: () => (/* binding */ throwOnConflictingProps)
/* harmony export */ });
/* harmony import */ var _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";



// src/utils/store.ts
function getInternal(store, key) {
  const internals = store.__unstableInternals;
  (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(internals, "Invalid store");
  return internals[key];
}
function createStore(initialState, ...stores) {
  let state = initialState;
  let prevStateBatch = state;
  let lastUpdate = Symbol();
  let destroy = _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  const instances = /* @__PURE__ */ new Set();
  const updatedKeys = /* @__PURE__ */ new Set();
  const setups = /* @__PURE__ */ new Set();
  const listeners = /* @__PURE__ */ new Set();
  const batchListeners = /* @__PURE__ */ new Set();
  const disposables = /* @__PURE__ */ new WeakMap();
  const listenerKeys = /* @__PURE__ */ new WeakMap();
  const storeSetup = (callback) => {
    setups.add(callback);
    return () => setups.delete(callback);
  };
  const storeInit = () => {
    const initialized = instances.size;
    const instance = Symbol();
    instances.add(instance);
    const maybeDestroy = () => {
      instances.delete(instance);
      if (instances.size)
        return;
      destroy();
    };
    if (initialized)
      return maybeDestroy;
    const desyncs = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.getKeys)(state).map(
      (key) => (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.chain)(
        ...stores.map((store) => {
          var _a;
          const storeState = (_a = store == null ? void 0 : store.getState) == null ? void 0 : _a.call(store);
          if (!storeState)
            return;
          if (!(0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(storeState, key))
            return;
          return sync(store, [key], (state2) => {
            setState(
              key,
              state2[key],
              // @ts-expect-error - Not public API. This is just to prevent
              // infinite loops.
              true
            );
          });
        })
      )
    );
    const teardowns = [];
    setups.forEach((setup2) => teardowns.push(setup2()));
    const cleanups = stores.map(init);
    destroy = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.chain)(...desyncs, ...teardowns, ...cleanups);
    return maybeDestroy;
  };
  const sub = (keys, listener, set = listeners) => {
    set.add(listener);
    listenerKeys.set(listener, keys);
    return () => {
      var _a;
      (_a = disposables.get(listener)) == null ? void 0 : _a();
      disposables.delete(listener);
      listenerKeys.delete(listener);
      set.delete(listener);
    };
  };
  const storeSubscribe = (keys, listener) => sub(keys, listener);
  const storeSync = (keys, listener) => {
    disposables.set(listener, listener(state, state));
    return sub(keys, listener);
  };
  const storeBatch = (keys, listener) => {
    disposables.set(listener, listener(state, prevStateBatch));
    return sub(keys, listener, batchListeners);
  };
  const storePick = (keys) => createStore((0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.pick)(state, keys), finalStore);
  const storeOmit = (keys) => createStore((0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.omit)(state, keys), finalStore);
  const getState = () => state;
  const setState = (key, value, fromStores = false) => {
    if (!(0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(state, key))
      return;
    const nextValue = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.applyState)(value, state[key]);
    if (nextValue === state[key])
      return;
    if (!fromStores) {
      stores.forEach((store) => {
        var _a;
        (_a = store == null ? void 0 : store.setState) == null ? void 0 : _a.call(store, key, nextValue);
      });
    }
    const prevState = state;
    state = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, state), { [key]: nextValue });
    const thisUpdate = Symbol();
    lastUpdate = thisUpdate;
    updatedKeys.add(key);
    const run = (listener, prev, uKeys) => {
      var _a;
      const keys = listenerKeys.get(listener);
      const updated = (k) => uKeys ? uKeys.has(k) : k === key;
      if (!keys || keys.some(updated)) {
        (_a = disposables.get(listener)) == null ? void 0 : _a();
        disposables.set(listener, listener(state, prev));
      }
    };
    listeners.forEach((listener) => {
      run(listener, prevState);
    });
    queueMicrotask(() => {
      if (lastUpdate !== thisUpdate)
        return;
      const snapshot = state;
      batchListeners.forEach((listener) => {
        run(listener, prevStateBatch, updatedKeys);
      });
      prevStateBatch = snapshot;
      updatedKeys.clear();
    });
  };
  const finalStore = {
    getState,
    setState,
    __unstableInternals: {
      setup: storeSetup,
      init: storeInit,
      subscribe: storeSubscribe,
      sync: storeSync,
      batch: storeBatch,
      pick: storePick,
      omit: storeOmit
    }
  };
  return finalStore;
}
function setup(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "setup")(...args);
}
function init(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "init")(...args);
}
function subscribe(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "subscribe")(...args);
}
function sync(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "sync")(...args);
}
function batch(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "batch")(...args);
}
function omit2(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "omit")(...args);
}
function pick2(store, ...args) {
  if (!store)
    return;
  return getInternal(store, "pick")(...args);
}
function mergeStore(...stores) {
  const initialState = stores.reduce((state, store2) => {
    var _a;
    const nextState = (_a = store2 == null ? void 0 : store2.getState) == null ? void 0 : _a.call(store2);
    if (!nextState)
      return state;
    return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, state), nextState);
  }, {});
  const store = createStore(initialState, ...stores);
  return store;
}
function throwOnConflictingProps(props, store) {
  if (false)
    {}
  if (!store)
    return;
  const defaultKeys = Object.entries(props).filter(([key, value]) => key.startsWith("default") && value !== void 0).map(([key]) => {
    var _a;
    const stateKey = key.replace("default", "");
    return `${((_a = stateKey[0]) == null ? void 0 : _a.toLowerCase()) || ""}${stateKey.slice(1)}`;
  });
  if (!defaultKeys.length)
    return;
  const storeState = store.getState();
  const conflictingProps = defaultKeys.filter(
    (key) => (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_0__.hasOwnProperty)(storeState, key)
  );
  if (!conflictingProps.length)
    return;
  throw new Error(
    `Passing a store prop in conjunction with a default state is not supported.

const store = useSelectStore();
<SelectProvider store={store} defaultValue="Apple" />
                ^             ^

Instead, pass the default state to the topmost store:

const store = useSelectStore({ defaultValue: "Apple" });
<SelectProvider store={store} />

See https://github.com/ariakit/ariakit/pull/2745 for more details.

If there's a particular need for this, please submit a feature request at https://github.com/ariakit/ariakit
`
  );
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/IERTEJ3A.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/IERTEJ3A.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCompositeStore: () => (/* binding */ createCompositeStore)
/* harmony export */ });
/* harmony import */ var _22K762VQ_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./22K762VQ.js */ "./node_modules/@ariakit/core/esm/__chunks/22K762VQ.js");
/* harmony import */ var _EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EAHJFCU4.js */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./7PRQYBBV.js */ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";






// src/composite/composite-store.ts
var NULL_ITEM = { id: null };
function findFirstEnabledItem(items, excludeId) {
  return items.find((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getEnabledItems(items, excludeId) {
  return items.filter((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getOppositeOrientation(orientation) {
  if (orientation === "vertical")
    return "horizontal";
  if (orientation === "horizontal")
    return "vertical";
  return;
}
function getItemsInRow(items, rowId) {
  return items.filter((item) => item.rowId === rowId);
}
function flipItems(items, activeId, shouldInsertNullItem = false) {
  const index = items.findIndex((item) => item.id === activeId);
  return [
    ...items.slice(index + 1),
    ...shouldInsertNullItem ? [NULL_ITEM] : [],
    ...items.slice(0, index)
  ];
}
function groupItemsByRows(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function getMaxRowLength(array) {
  let maxLength = 0;
  for (const { length } of array) {
    if (length > maxLength) {
      maxLength = length;
    }
  }
  return maxLength;
}
function createEmptyItem(rowId) {
  return {
    id: "__EMPTY_ITEM__",
    disabled: true,
    rowId
  };
}
function normalizeRows(rows, activeId, focusShift) {
  const maxLength = getMaxRowLength(rows);
  for (const row of rows) {
    for (let i = 0; i < maxLength; i += 1) {
      const item = row[i];
      if (!item || focusShift && item.disabled) {
        const isFirst = i === 0;
        const previousItem = isFirst && focusShift ? findFirstEnabledItem(row) : row[i - 1];
        row[i] = previousItem && activeId !== previousItem.id && focusShift ? previousItem : createEmptyItem(previousItem == null ? void 0 : previousItem.rowId);
      }
    }
  }
  return rows;
}
function verticalizeItems(items) {
  const rows = groupItemsByRows(items);
  const maxLength = getMaxRowLength(rows);
  const verticalized = [];
  for (let i = 0; i < maxLength; i += 1) {
    for (const row of rows) {
      const item = row[i];
      if (item) {
        verticalized.push((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, item), {
          // If there's no rowId, it means that it's not a grid composite, but
          // a single row instead. So, instead of verticalizing it, that is,
          // assigning a different rowId based on the column index, we keep it
          // undefined so they will be part of the same row. This is useful
          // when using up/down on one-dimensional composites.
          rowId: item.rowId ? `${i}` : void 0
        }));
      }
    }
  }
  return verticalized;
}
function createCompositeStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const collection = (0,_22K762VQ_js__WEBPACK_IMPORTED_MODULE_1__.createCollectionStore)(props);
  const activeId = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId
  );
  const initialState = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, collection.getState()), {
    activeId,
    baseElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.baseElement, null),
    includesBaseElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      activeId === null
    ),
    moves: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(syncState == null ? void 0 : syncState.moves, 0),
    orientation: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "both"
    ),
    rtl: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.rtl, syncState == null ? void 0 : syncState.rtl, false),
    virtualFocus: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      false
    ),
    focusLoop: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, false),
    focusWrap: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, false),
    focusShift: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusShift, syncState == null ? void 0 : syncState.focusShift, false)
  });
  const composite = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_3__.createStore)(initialState, collection, props.store);
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_3__.setup)(
    composite,
    () => (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_3__.sync)(composite, ["renderedItems", "activeId"], (state) => {
      composite.setState("activeId", (activeId2) => {
        var _a2;
        if (activeId2 !== void 0)
          return activeId2;
        return (_a2 = findFirstEnabledItem(state.renderedItems)) == null ? void 0 : _a2.id;
      });
    })
  );
  const getNextId = (items, orientation, hasNullItem, skip) => {
    var _a2, _b;
    const { activeId: activeId2, rtl, focusLoop, focusWrap, includesBaseElement } = composite.getState();
    const isHorizontal = orientation !== "vertical";
    const isRTL = rtl && isHorizontal;
    const allItems = isRTL ? (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(items) : items;
    if (activeId2 == null) {
      return (_a2 = findFirstEnabledItem(allItems)) == null ? void 0 : _a2.id;
    }
    const activeItem = allItems.find((item) => item.id === activeId2);
    if (!activeItem) {
      return (_b = findFirstEnabledItem(allItems)) == null ? void 0 : _b.id;
    }
    const isGrid = !!activeItem.rowId;
    const activeIndex = allItems.indexOf(activeItem);
    const nextItems = allItems.slice(activeIndex + 1);
    const nextItemsInRow = getItemsInRow(nextItems, activeItem.rowId);
    if (skip !== void 0) {
      const nextEnabledItemsInRow = getEnabledItems(nextItemsInRow, activeId2);
      const nextItem2 = nextEnabledItemsInRow.slice(skip)[0] || // If we can't find an item, just return the last one.
      nextEnabledItemsInRow[nextEnabledItemsInRow.length - 1];
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    const oppositeOrientation = getOppositeOrientation(
      // If it's a grid and orientation is not set, it's a next/previous call,
      // which is inherently horizontal. up/down will call next with orientation
      // set to vertical by default (see below on up/down methods).
      isGrid ? orientation || "horizontal" : orientation
    );
    const canLoop = focusLoop && focusLoop !== oppositeOrientation;
    const canWrap = isGrid && focusWrap && focusWrap !== oppositeOrientation;
    hasNullItem = hasNullItem || !isGrid && canLoop && includesBaseElement;
    if (canLoop) {
      const loopItems = canWrap && !hasNullItem ? allItems : getItemsInRow(allItems, activeItem.rowId);
      const sortedItems = flipItems(loopItems, activeId2, hasNullItem);
      const nextItem2 = findFirstEnabledItem(sortedItems, activeId2);
      return nextItem2 == null ? void 0 : nextItem2.id;
    }
    if (canWrap) {
      const nextItem2 = findFirstEnabledItem(
        // We can use nextItems, which contains all the next items, including
        // items from other rows, to wrap between rows. However, if there is a
        // null item (the composite container), we'll only use the next items in
        // the row. So moving next from the last item will focus on the
        // composite container. On grid composites, horizontal navigation never
        // focuses on the composite container, only vertical.
        hasNullItem ? nextItemsInRow : nextItems,
        activeId2
      );
      const nextId = hasNullItem ? (nextItem2 == null ? void 0 : nextItem2.id) || null : nextItem2 == null ? void 0 : nextItem2.id;
      return nextId;
    }
    const nextItem = findFirstEnabledItem(nextItemsInRow, activeId2);
    if (!nextItem && hasNullItem) {
      return null;
    }
    return nextItem == null ? void 0 : nextItem.id;
  };
  return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, collection), composite), {
    setBaseElement: (element) => composite.setState("baseElement", element),
    setActiveId: (id) => composite.setState("activeId", id),
    move: (id) => {
      if (id === void 0)
        return;
      composite.setState("activeId", id);
      composite.setState("moves", (moves) => moves + 1);
    },
    first: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem(composite.getState().renderedItems)) == null ? void 0 : _a2.id;
    },
    last: () => {
      var _a2;
      return (_a2 = findFirstEnabledItem((0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(composite.getState().renderedItems))) == null ? void 0 : _a2.id;
    },
    next: (skip) => {
      const { renderedItems, orientation } = composite.getState();
      return getNextId(renderedItems, orientation, false, skip);
    },
    previous: (skip) => {
      var _a2;
      const { renderedItems, orientation, includesBaseElement } = composite.getState();
      const isGrid = !!((_a2 = findFirstEnabledItem(renderedItems)) == null ? void 0 : _a2.rowId);
      const hasNullItem = !isGrid && includesBaseElement;
      return getNextId(
        (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(renderedItems),
        orientation,
        hasNullItem,
        skip
      );
    },
    down: (skip) => {
      const {
        activeId: activeId2,
        renderedItems,
        focusShift,
        focusLoop,
        includesBaseElement
      } = composite.getState();
      const shouldShift = focusShift && !skip;
      const verticalItems = verticalizeItems(
        (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.flatten2DArray)(
          normalizeRows(groupItemsByRows(renderedItems), activeId2, shouldShift)
        )
      );
      const canLoop = focusLoop && focusLoop !== "horizontal";
      const hasNullItem = canLoop && includesBaseElement;
      return getNextId(verticalItems, "vertical", hasNullItem, skip);
    },
    up: (skip) => {
      const { activeId: activeId2, renderedItems, focusShift, includesBaseElement } = composite.getState();
      const shouldShift = focusShift && !skip;
      const verticalItems = verticalizeItems(
        (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.reverseArray)(
          (0,_7PRQYBBV_js__WEBPACK_IMPORTED_MODULE_4__.flatten2DArray)(
            normalizeRows(
              groupItemsByRows(renderedItems),
              activeId2,
              shouldShift
            )
          )
        )
      );
      const hasNullItem = includesBaseElement;
      return getNextId(verticalItems, "vertical", hasNullItem, skip);
    }
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isApple: () => (/* binding */ isApple),
/* harmony export */   isFirefox: () => (/* binding */ isFirefox),
/* harmony export */   isMac: () => (/* binding */ isMac),
/* harmony export */   isSafari: () => (/* binding */ isSafari),
/* harmony export */   isTouchDevice: () => (/* binding */ isTouchDevice)
/* harmony export */ });
/* harmony import */ var _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DLOEKDPY.js */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
"use client";


// src/utils/platform.ts
function isTouchDevice() {
  return _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && !!navigator.maxTouchPoints;
}
function isApple() {
  if (!_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM)
    return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
function isSafari() {
  return _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
function isFirefox() {
  return _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && /firefox\//i.test(navigator.userAgent);
}
function isMac() {
  return _DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.canUseDOM && navigator.platform.startsWith("Mac") && !isTouchDevice();
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/SX2XFD6A.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/SX2XFD6A.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDialogStore: () => (/* binding */ createDialogStore)
/* harmony export */ });
/* harmony import */ var _Z5IGYIPT_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Z5IGYIPT.js */ "./node_modules/@ariakit/core/esm/__chunks/Z5IGYIPT.js");
"use client";


// src/dialog/dialog-store.ts
function createDialogStore(props = {}) {
  return (0,_Z5IGYIPT_js__WEBPACK_IMPORTED_MODULE_0__.createDisclosureStore)(props);
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterPaint: () => (/* binding */ afterPaint),
/* harmony export */   applyState: () => (/* binding */ applyState),
/* harmony export */   beforePaint: () => (/* binding */ beforePaint),
/* harmony export */   chain: () => (/* binding */ chain),
/* harmony export */   cx: () => (/* binding */ cx),
/* harmony export */   defaultValue: () => (/* binding */ defaultValue),
/* harmony export */   disabledFromProps: () => (/* binding */ disabledFromProps),
/* harmony export */   getKeys: () => (/* binding */ getKeys),
/* harmony export */   hasOwnProperty: () => (/* binding */ hasOwnProperty),
/* harmony export */   identity: () => (/* binding */ identity),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isFalsyBooleanCallback: () => (/* binding */ isFalsyBooleanCallback),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   normalizeString: () => (/* binding */ normalizeString),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   shallowEqual: () => (/* binding */ shallowEqual)
/* harmony export */ });
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";


// src/utils/misc.ts
function noop(..._) {
}
function shallowEqual(a, b) {
  if (a === b)
    return true;
  if (!a)
    return false;
  if (!b)
    return false;
  if (typeof a !== "object")
    return false;
  if (typeof b !== "object")
    return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  const { length } = aKeys;
  if (bKeys.length !== length)
    return false;
  for (const key of aKeys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function applyState(argument, currentValue) {
  if (isUpdater(argument)) {
    const value = isLazyValue(currentValue) ? currentValue() : currentValue;
    return argument(value);
  }
  return argument;
}
function isUpdater(argument) {
  return typeof argument === "function";
}
function isLazyValue(value) {
  return typeof value === "function";
}
function isObject(arg) {
  return typeof arg === "object" && arg != null;
}
function isEmpty(arg) {
  if (Array.isArray(arg))
    return !arg.length;
  if (isObject(arg))
    return !Object.keys(arg).length;
  if (arg == null)
    return true;
  if (arg === "")
    return true;
  return false;
}
function isInteger(arg) {
  if (typeof arg === "number") {
    return Math.floor(arg) === arg;
  }
  return String(Math.floor(Number(arg))) === arg;
}
function hasOwnProperty(object, prop) {
  if (typeof Object.hasOwn === "function") {
    return Object.hasOwn(object, prop);
  }
  return Object.prototype.hasOwnProperty.call(object, prop);
}
function chain(...fns) {
  return (...args) => {
    for (const fn of fns) {
      if (typeof fn === "function") {
        fn(...args);
      }
    }
  };
}
function cx(...args) {
  return args.filter(Boolean).join(" ") || void 0;
}
function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function omit(object, keys) {
  const result = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_0__.__spreadValues)({}, object);
  for (const key of keys) {
    if (hasOwnProperty(result, key)) {
      delete result[key];
    }
  }
  return result;
}
function pick(object, paths) {
  const result = {};
  for (const key of paths) {
    if (hasOwnProperty(object, key)) {
      result[key] = object[key];
    }
  }
  return result;
}
function identity(value) {
  return value;
}
function beforePaint(cb = noop) {
  const raf = requestAnimationFrame(cb);
  return () => cancelAnimationFrame(raf);
}
function afterPaint(cb = noop) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}
function invariant(condition, message) {
  if (condition)
    return;
  if (typeof message !== "string")
    throw new Error("Invariant failed");
  throw new Error(message);
}
function getKeys(obj) {
  return Object.keys(obj);
}
function isFalsyBooleanCallback(booleanOrCallback, ...args) {
  const result = typeof booleanOrCallback === "function" ? booleanOrCallback(...args) : booleanOrCallback;
  if (result == null)
    return false;
  return !result;
}
function disabledFromProps(props) {
  return props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
}
function defaultValue(...values) {
  for (const value of values) {
    if (value !== void 0)
      return value;
  }
  return void 0;
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/__chunks/Z5IGYIPT.js":
/*!*************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/__chunks/Z5IGYIPT.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDisclosureStore: () => (/* binding */ createDisclosureStore)
/* harmony export */ });
/* harmony import */ var _EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EAHJFCU4.js */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var _Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";




// src/disclosure/disclosure-store.ts
function createDisclosureStore(props = {}) {
  const store = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.mergeStore)(
    props.store,
    (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.omit)(props.disclosure, ["contentElement", "disclosureElement"])
  );
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.throwOnConflictingProps)(props, store);
  const syncState = store == null ? void 0 : store.getState();
  const open = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(
    props.open,
    syncState == null ? void 0 : syncState.open,
    props.defaultOpen,
    false
  );
  const animated = (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(props.animated, syncState == null ? void 0 : syncState.animated, false);
  const initialState = {
    open,
    animated,
    animating: !!animated && open,
    mounted: open,
    contentElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(syncState == null ? void 0 : syncState.contentElement, null),
    disclosureElement: (0,_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_1__.defaultValue)(syncState == null ? void 0 : syncState.disclosureElement, null)
  };
  const disclosure = (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.createStore)(initialState, store);
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.sync)(disclosure, ["animated", "animating"], (state) => {
      if (state.animated)
        return;
      disclosure.setState("animating", false);
    })
  );
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.subscribe)(disclosure, ["open"], () => {
      if (!disclosure.getState().animated)
        return;
      disclosure.setState("animating", true);
    })
  );
  (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.setup)(
    disclosure,
    () => (0,_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_0__.sync)(disclosure, ["open", "animating"], (state) => {
      disclosure.setState("mounted", state.open || state.animating);
    })
  );
  return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, disclosure), {
    setOpen: (value) => disclosure.setState("open", value),
    show: () => disclosure.setState("open", true),
    hide: () => disclosure.setState("open", false),
    toggle: () => disclosure.setState("open", (open2) => !open2),
    stopAnimation: () => disclosure.setState("animating", false),
    setContentElement: (value) => disclosure.setState("contentElement", value),
    setDisclosureElement: (value) => disclosure.setState("disclosureElement", value)
  });
}




/***/ }),

/***/ "./node_modules/@ariakit/core/esm/combobox/combobox-store.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/combobox/combobox-store.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createComboboxStore: () => (/* binding */ createComboboxStore)
/* harmony export */ });
/* harmony import */ var _chunks_AF6IUUFN_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/AF6IUUFN.js */ "./node_modules/@ariakit/core/esm/__chunks/AF6IUUFN.js");
/* harmony import */ var _chunks_IERTEJ3A_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/IERTEJ3A.js */ "./node_modules/@ariakit/core/esm/__chunks/IERTEJ3A.js");
/* harmony import */ var _chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/EAHJFCU4.js */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var _chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/Y3OOHFCN.js */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _chunks_MHPO2BXA_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/MHPO2BXA.js */ "./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";












// src/combobox/combobox-store.ts
var isSafariOnMobile = (0,_chunks_MHPO2BXA_js__WEBPACK_IMPORTED_MODULE_0__.isSafari)() && (0,_chunks_MHPO2BXA_js__WEBPACK_IMPORTED_MODULE_0__.isTouchDevice)();
function createComboboxStore(props = {}) {
  var _a;
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.throwOnConflictingProps)(props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const activeId = (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId,
    null
  );
  const composite = (0,_chunks_IERTEJ3A_js__WEBPACK_IMPORTED_MODULE_3__.createCompositeStore)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props), {
    activeId,
    includesBaseElement: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      true
    ),
    orientation: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "vertical"
    ),
    focusLoop: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true),
    focusWrap: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, true),
    virtualFocus: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      !isSafariOnMobile
    )
  }));
  const popover = (0,_chunks_AF6IUUFN_js__WEBPACK_IMPORTED_MODULE_5__.createPopoverStore)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props), {
    placement: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom-start"
    )
  }));
  const value = (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.value,
    syncState == null ? void 0 : syncState.value,
    props.defaultValue,
    ""
  );
  const selectedValue = (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
    props.selectedValue,
    syncState == null ? void 0 : syncState.selectedValue,
    props.defaultSelectedValue,
    ""
  );
  const multiSelectable = Array.isArray(selectedValue);
  const initialState = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, composite.getState()), popover.getState()), {
    value,
    selectedValue,
    resetValueOnSelect: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.resetValueOnSelect,
      syncState == null ? void 0 : syncState.resetValueOnSelect,
      multiSelectable
    ),
    resetValueOnHide: (0,_chunks_Y3OOHFCN_js__WEBPACK_IMPORTED_MODULE_2__.defaultValue)(
      props.resetValueOnHide,
      syncState == null ? void 0 : syncState.resetValueOnHide,
      multiSelectable
    ),
    activeValue: syncState == null ? void 0 : syncState.activeValue
  });
  const combobox = (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.createStore)(initialState, composite, popover, props.store);
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(
    combobox,
    () => (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.sync)(combobox, ["resetValueOnHide", "mounted"], (state) => {
      if (!state.resetValueOnHide)
        return;
      if (state.mounted)
        return;
      combobox.setState("value", value);
    })
  );
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(
    combobox,
    () => (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.sync)(combobox, ["resetValueOnSelect", "selectedValue"], (state) => {
      if (!state.resetValueOnSelect)
        return;
      combobox.setState("value", value);
    })
  );
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(
    combobox,
    () => (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.batch)(combobox, ["mounted"], (state) => {
      if (state.mounted)
        return;
      combobox.setState("activeId", activeId);
      combobox.setState("moves", 0);
    })
  );
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(
    combobox,
    () => (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.sync)(combobox, ["moves", "activeId"], (state, prevState) => {
      if (state.moves === prevState.moves) {
        combobox.setState("activeValue", void 0);
      }
    })
  );
  (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.setup)(
    combobox,
    () => (0,_chunks_EAHJFCU4_js__WEBPACK_IMPORTED_MODULE_1__.batch)(combobox, ["moves", "renderedItems"], (state, prev) => {
      if (state.moves === prev.moves)
        return;
      const { activeId: activeId2 } = combobox.getState();
      const activeItem = composite.item(activeId2);
      combobox.setState("activeValue", activeItem == null ? void 0 : activeItem.value);
    })
  );
  return (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, popover), composite), combobox), {
    setValue: (value2) => combobox.setState("value", value2),
    setSelectedValue: (selectedValue2) => combobox.setState("selectedValue", selectedValue2)
  });
}



/***/ }),

/***/ "./node_modules/@ariakit/core/esm/utils/events.js":
/*!********************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/utils/events.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addGlobalEventListener: () => (/* binding */ addGlobalEventListener),
/* harmony export */   fireBlurEvent: () => (/* binding */ fireBlurEvent),
/* harmony export */   fireClickEvent: () => (/* binding */ fireClickEvent),
/* harmony export */   fireEvent: () => (/* binding */ fireEvent),
/* harmony export */   fireFocusEvent: () => (/* binding */ fireFocusEvent),
/* harmony export */   fireKeyboardEvent: () => (/* binding */ fireKeyboardEvent),
/* harmony export */   isDownloading: () => (/* binding */ isDownloading),
/* harmony export */   isFocusEventOutside: () => (/* binding */ isFocusEventOutside),
/* harmony export */   isOpeningInNewTab: () => (/* binding */ isOpeningInNewTab),
/* harmony export */   isPortalEvent: () => (/* binding */ isPortalEvent),
/* harmony export */   isSelfTarget: () => (/* binding */ isSelfTarget),
/* harmony export */   queueBeforeEvent: () => (/* binding */ queueBeforeEvent)
/* harmony export */ });
/* harmony import */ var _chunks_MHPO2BXA_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/MHPO2BXA.js */ "./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js");
/* harmony import */ var _chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/DLOEKDPY.js */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";




// src/utils/events.ts
function isPortalEvent(event) {
  return Boolean(
    event.currentTarget && !(0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.contains)(event.currentTarget, event.target)
  );
}
function isSelfTarget(event) {
  return event.target === event.currentTarget;
}
function isOpeningInNewTab(event) {
  const element = event.currentTarget;
  if (!element)
    return false;
  const isAppleDevice = (0,_chunks_MHPO2BXA_js__WEBPACK_IMPORTED_MODULE_1__.isApple)();
  if (isAppleDevice && !event.metaKey)
    return false;
  if (!isAppleDevice && !event.ctrlKey)
    return false;
  const tagName = element.tagName.toLowerCase();
  if (tagName === "a")
    return true;
  if (tagName === "button" && element.type === "submit")
    return true;
  if (tagName === "input" && element.type === "submit")
    return true;
  return false;
}
function isDownloading(event) {
  const element = event.currentTarget;
  if (!element)
    return false;
  const tagName = element.tagName.toLowerCase();
  if (!event.altKey)
    return false;
  if (tagName === "a")
    return true;
  if (tagName === "button" && element.type === "submit")
    return true;
  if (tagName === "input" && element.type === "submit")
    return true;
  return false;
}
function fireEvent(element, type, eventInit) {
  const event = new Event(type, eventInit);
  return element.dispatchEvent(event);
}
function fireBlurEvent(element, eventInit) {
  const event = new FocusEvent("blur", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, eventInit), { bubbles: true });
  element.dispatchEvent(new FocusEvent("focusout", bubbleInit));
  return defaultAllowed;
}
function fireFocusEvent(element, eventInit) {
  const event = new FocusEvent("focus", eventInit);
  const defaultAllowed = element.dispatchEvent(event);
  const bubbleInit = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, eventInit), { bubbles: true });
  element.dispatchEvent(new FocusEvent("focusin", bubbleInit));
  return defaultAllowed;
}
function fireKeyboardEvent(element, type, eventInit) {
  const event = new KeyboardEvent(type, eventInit);
  return element.dispatchEvent(event);
}
function fireClickEvent(element, eventInit) {
  const event = new MouseEvent("click", eventInit);
  return element.dispatchEvent(event);
}
function isFocusEventOutside(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !(0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.contains)(containerElement, relatedTarget);
}
function queueBeforeEvent(element, type, callback) {
  const raf = requestAnimationFrame(() => {
    element.removeEventListener(type, callImmediately, true);
    callback();
  });
  const callImmediately = () => {
    cancelAnimationFrame(raf);
    callback();
  };
  element.addEventListener(type, callImmediately, {
    once: true,
    capture: true
  });
  return raf;
}
function addGlobalEventListener(type, listener, options, scope = window) {
  const children = [];
  try {
    scope.document.addEventListener(type, listener, options);
    for (const frame of Array.from(scope.frames)) {
      children.push(addGlobalEventListener(type, listener, options, frame));
    }
  } catch (e) {
  }
  const removeEventListener = () => {
    try {
      scope.document.removeEventListener(type, listener, options);
    } catch (e) {
    }
    children.forEach((remove) => remove());
  };
  return removeEventListener;
}



/***/ }),

/***/ "./node_modules/@ariakit/core/esm/utils/focus.js":
/*!*******************************************************!*\
  !*** ./node_modules/@ariakit/core/esm/utils/focus.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableFocus: () => (/* binding */ disableFocus),
/* harmony export */   disableFocusIn: () => (/* binding */ disableFocusIn),
/* harmony export */   focusIfNeeded: () => (/* binding */ focusIfNeeded),
/* harmony export */   focusIntoView: () => (/* binding */ focusIntoView),
/* harmony export */   getAllFocusable: () => (/* binding */ getAllFocusable),
/* harmony export */   getAllFocusableIn: () => (/* binding */ getAllFocusableIn),
/* harmony export */   getAllTabbable: () => (/* binding */ getAllTabbable),
/* harmony export */   getAllTabbableIn: () => (/* binding */ getAllTabbableIn),
/* harmony export */   getClosestFocusable: () => (/* binding */ getClosestFocusable),
/* harmony export */   getFirstFocusable: () => (/* binding */ getFirstFocusable),
/* harmony export */   getFirstFocusableIn: () => (/* binding */ getFirstFocusableIn),
/* harmony export */   getFirstTabbable: () => (/* binding */ getFirstTabbable),
/* harmony export */   getFirstTabbableIn: () => (/* binding */ getFirstTabbableIn),
/* harmony export */   getLastTabbable: () => (/* binding */ getLastTabbable),
/* harmony export */   getLastTabbableIn: () => (/* binding */ getLastTabbableIn),
/* harmony export */   getNextTabbable: () => (/* binding */ getNextTabbable),
/* harmony export */   getNextTabbableIn: () => (/* binding */ getNextTabbableIn),
/* harmony export */   getPreviousTabbable: () => (/* binding */ getPreviousTabbable),
/* harmony export */   getPreviousTabbableIn: () => (/* binding */ getPreviousTabbableIn),
/* harmony export */   hasFocus: () => (/* binding */ hasFocus),
/* harmony export */   hasFocusWithin: () => (/* binding */ hasFocusWithin),
/* harmony export */   isFocusable: () => (/* binding */ isFocusable),
/* harmony export */   isTabbable: () => (/* binding */ isTabbable),
/* harmony export */   restoreFocusIn: () => (/* binding */ restoreFocusIn)
/* harmony export */ });
/* harmony import */ var _chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/DLOEKDPY.js */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/core/esm/__chunks/4R3V3JGP.js");
"use client";



// src/utils/focus.ts
var selector = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])";
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isFocusable(element) {
  if (!(0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.matches)(element, selector))
    return false;
  if (!(0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.isVisible)(element))
    return false;
  if ((0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.closest)(element, "[inert]"))
    return false;
  return true;
}
function isTabbable(element) {
  if (!isFocusable(element))
    return false;
  if (hasNegativeTabIndex(element))
    return false;
  if (!("form" in element))
    return true;
  if (!element.form)
    return true;
  if (element.checked)
    return true;
  if (element.type !== "radio")
    return true;
  const radioGroup = element.form.elements.namedItem(element.name);
  if (!radioGroup)
    return true;
  if (!("length" in radioGroup))
    return true;
  const activeElement = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement)
    return true;
  if (activeElement === element)
    return true;
  if (!("form" in activeElement))
    return true;
  if (activeElement.form !== element.form)
    return true;
  if (activeElement.name !== element.name)
    return true;
  return false;
}
function getAllFocusableIn(container, includeContainer) {
  const elements = Array.from(
    container.querySelectorAll(selector)
  );
  if (includeContainer) {
    elements.unshift(container);
  }
  const focusableElements = elements.filter(isFocusable);
  focusableElements.forEach((element, i) => {
    if ((0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.isFrame)(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getAllFocusableIn(frameBody));
    }
  });
  return focusableElements;
}
function getAllFocusable(includeBody) {
  return getAllFocusableIn(document.body, includeBody);
}
function getFirstFocusableIn(container, includeContainer) {
  const [first] = getAllFocusableIn(container, includeContainer);
  return first || null;
}
function getFirstFocusable(includeBody) {
  return getFirstFocusableIn(document.body, includeBody);
}
function getAllTabbableIn(container, includeContainer, fallbackToFocusable) {
  const elements = Array.from(
    container.querySelectorAll(selector)
  );
  const tabbableElements = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }
  tabbableElements.forEach((element, i) => {
    if ((0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.isFrame)(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(
        frameBody,
        false,
        fallbackToFocusable
      );
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });
  if (!tabbableElements.length && fallbackToFocusable) {
    return elements;
  }
  return tabbableElements;
}
function getAllTabbable(fallbackToFocusable) {
  return getAllTabbableIn(document.body, false, fallbackToFocusable);
}
function getFirstTabbableIn(container, includeContainer, fallbackToFocusable) {
  const [first] = getAllTabbableIn(
    container,
    includeContainer,
    fallbackToFocusable
  );
  return first || null;
}
function getFirstTabbable(fallbackToFocusable) {
  return getFirstTabbableIn(document.body, false, fallbackToFocusable);
}
function getLastTabbableIn(container, includeContainer, fallbackToFocusable) {
  const allTabbable = getAllTabbableIn(
    container,
    includeContainer,
    fallbackToFocusable
  );
  return allTabbable[allTabbable.length - 1] || null;
}
function getLastTabbable(fallbackToFocusable) {
  return getLastTabbableIn(document.body, false, fallbackToFocusable);
}
function getNextTabbableIn(container, includeContainer, fallbackToFirst, fallbackToFocusable) {
  const activeElement = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(container);
  const allFocusable = getAllFocusableIn(container, includeContainer);
  const activeIndex = allFocusable.indexOf(activeElement);
  const nextFocusableElements = allFocusable.slice(activeIndex + 1);
  return nextFocusableElements.find(isTabbable) || (fallbackToFirst ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? nextFocusableElements[0] : null) || null;
}
function getNextTabbable(fallbackToFirst, fallbackToFocusable) {
  return getNextTabbableIn(
    document.body,
    false,
    fallbackToFirst,
    fallbackToFocusable
  );
}
function getPreviousTabbableIn(container, includeContainer, fallbackToLast, fallbackToFocusable) {
  const activeElement = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(container);
  const allFocusable = getAllFocusableIn(container, includeContainer).reverse();
  const activeIndex = allFocusable.indexOf(activeElement);
  const previousFocusableElements = allFocusable.slice(activeIndex + 1);
  return previousFocusableElements.find(isTabbable) || (fallbackToLast ? allFocusable.find(isTabbable) : null) || (fallbackToFocusable ? previousFocusableElements[0] : null) || null;
}
function getPreviousTabbable(fallbackToFirst, fallbackToFocusable) {
  return getPreviousTabbableIn(
    document.body,
    false,
    fallbackToFirst,
    fallbackToFocusable
  );
}
function getClosestFocusable(element) {
  while (element && !isFocusable(element)) {
    element = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.closest)(element, selector);
  }
  return element || null;
}
function hasFocus(element) {
  const activeElement = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement)
    return false;
  if (activeElement === element)
    return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant)
    return false;
  return activeDescendant === element.id;
}
function hasFocusWithin(element) {
  const activeElement = (0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.getActiveElement)(element);
  if (!activeElement)
    return false;
  if ((0,_chunks_DLOEKDPY_js__WEBPACK_IMPORTED_MODULE_0__.contains)(element, activeElement))
    return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant)
    return false;
  if (!("id" in element))
    return false;
  if (activeDescendant === element.id)
    return true;
  return !!element.querySelector(`#${CSS.escape(activeDescendant)}`);
}
function focusIfNeeded(element) {
  if (!hasFocusWithin(element) && isFocusable(element)) {
    element.focus();
  }
}
function disableFocus(element) {
  var _a;
  const currentTabindex = (_a = element.getAttribute("tabindex")) != null ? _a : "";
  element.setAttribute("data-tabindex", currentTabindex);
  element.setAttribute("tabindex", "-1");
}
function disableFocusIn(container, includeContainer) {
  const tabbableElements = getAllTabbableIn(container, includeContainer);
  tabbableElements.forEach(disableFocus);
}
function restoreFocusIn(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  const restoreTabIndex = (element) => {
    const tabindex = element.getAttribute("data-tabindex");
    element.removeAttribute("data-tabindex");
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  };
  if (container.hasAttribute("data-tabindex")) {
    restoreTabIndex(container);
  }
  elements.forEach(restoreTabIndex);
}
function focusIntoView(element, options) {
  if (!("scrollIntoView" in element)) {
    element.focus();
  } else {
    element.focus({ preventScroll: true });
    element.scrollIntoView((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({ block: "nearest", inline: "nearest" }, options));
  }
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/346FK57L.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/346FK57L.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeTypeahead: () => (/* binding */ CompositeTypeahead),
/* harmony export */   useCompositeTypeahead: () => (/* binding */ useCompositeTypeahead)
/* harmony export */ });
/* harmony import */ var _3IEDWLST_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./3IEDWLST.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3IEDWLST.js");
/* harmony import */ var _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./IB7YUKH5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";






// src/composite/composite-typeahead.ts




var chars = "";
function clearChars() {
  chars = "";
}
function isValidTypeaheadEvent(event) {
  const target = event.target;
  if (target && (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isTextField)(target))
    return false;
  if (event.key === " " && chars.length)
    return true;
  return event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey && /^[\p{Letter}\p{Number}]$/u.test(event.key);
}
function isSelfTargetOrItem(event, items) {
  if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_2__.isSelfTarget)(event))
    return true;
  const target = event.target;
  if (!target)
    return false;
  const isItem = items.some((item) => item.element === target);
  return isItem;
}
function getEnabledItems(items) {
  return items.filter((item) => !item.disabled);
}
function itemTextStartsWith(item, text) {
  var _a;
  const itemText = ((_a = item.element) == null ? void 0 : _a.textContent) || item.children;
  if (!itemText)
    return false;
  return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__.normalizeString)(itemText).trim().toLowerCase().startsWith(text.toLowerCase());
}
function getSameInitialItems(items, char, activeId) {
  if (!activeId)
    return items;
  const activeItem = items.find((item) => item.id === activeId);
  if (!activeItem)
    return items;
  if (!itemTextStartsWith(activeItem, char))
    return items;
  if (chars !== char && itemTextStartsWith(activeItem, chars))
    return items;
  chars = char;
  return (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_4__.flipItems)(
    items.filter((item) => itemTextStartsWith(item, chars)),
    activeId
  ).filter((item) => item.id !== activeId);
}
var useCompositeTypeahead = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_5__.createHook)(
  (_a) => {
    var _b = _a, { store, typeahead = true } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, ["store", "typeahead"]);
    const context = (0,_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_7__.useCompositeContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__.invariant)(
      store,
       true && "CompositeTypeahead must be a Composite component"
    );
    const onKeyDownCaptureProp = props.onKeyDownCapture;
    const cleanupTimeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const onKeyDownCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_8__.useEvent)(
      (event) => {
        onKeyDownCaptureProp == null ? void 0 : onKeyDownCaptureProp(event);
        if (event.defaultPrevented)
          return;
        if (!typeahead)
          return;
        if (!store)
          return;
        const { items, activeId } = store.getState();
        if (!isValidTypeaheadEvent(event))
          return clearChars();
        let enabledItems = getEnabledItems(items);
        if (!isSelfTargetOrItem(event, enabledItems))
          return clearChars();
        event.preventDefault();
        window.clearTimeout(cleanupTimeoutRef.current);
        cleanupTimeoutRef.current = window.setTimeout(() => {
          chars = "";
        }, 500);
        const char = event.key.toLowerCase();
        chars += char;
        enabledItems = getSameInitialItems(enabledItems, char, activeId);
        const item = enabledItems.find(
          (item2) => itemTextStartsWith(item2, chars)
        );
        if (item) {
          store.move(item.id);
        } else {
          clearChars();
        }
      }
    );
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({}, props), {
      onKeyDownCapture
    });
    return props;
  }
);
var CompositeTypeahead = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_5__.createComponent)(
  (props) => {
    const htmlProps = useCompositeTypeahead(props);
    return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_5__.createElement)("div", htmlProps);
  }
);
if (true) {
  CompositeTypeahead.displayName = "CompositeTypeahead";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/3IEDWLST.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/3IEDWLST.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findFirstEnabledItem: () => (/* binding */ findFirstEnabledItem),
/* harmony export */   flipItems: () => (/* binding */ flipItems),
/* harmony export */   focusSilently: () => (/* binding */ focusSilently),
/* harmony export */   getEnabledItem: () => (/* binding */ getEnabledItem),
/* harmony export */   groupItemsByRows: () => (/* binding */ groupItemsByRows),
/* harmony export */   isItem: () => (/* binding */ isItem),
/* harmony export */   selectTextField: () => (/* binding */ selectTextField),
/* harmony export */   silentlyFocused: () => (/* binding */ silentlyFocused)
/* harmony export */ });
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
"use client";

// src/composite/utils.ts

var NULL_ITEM = { id: null };
function flipItems(items, activeId, shouldInsertNullItem = false) {
  const index = items.findIndex((item) => item.id === activeId);
  return [
    ...items.slice(index + 1),
    ...shouldInsertNullItem ? [NULL_ITEM] : [],
    ...items.slice(0, index)
  ];
}
function findFirstEnabledItem(items, excludeId) {
  return items.find((item) => {
    if (excludeId) {
      return !item.disabled && item.id !== excludeId;
    }
    return !item.disabled;
  });
}
function getEnabledItem(store, id) {
  if (!id)
    return null;
  return store.item(id) || null;
}
function groupItemsByRows(items) {
  const rows = [];
  for (const item of items) {
    const row = rows.find((currentRow) => {
      var _a;
      return ((_a = currentRow[0]) == null ? void 0 : _a.rowId) === item.rowId;
    });
    if (row) {
      row.push(item);
    } else {
      rows.push([item]);
    }
  }
  return rows;
}
function selectTextField(element, collapseToEnd = false) {
  if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__.isTextField)(element)) {
    element.setSelectionRange(
      collapseToEnd ? element.value.length : 0,
      element.value.length
    );
  } else if (element.isContentEditable) {
    const selection = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getDocument)(element).getSelection();
    selection == null ? void 0 : selection.selectAllChildren(element);
    if (collapseToEnd) {
      selection == null ? void 0 : selection.collapseToEnd();
    }
  }
}
var FOCUS_SILENTLY = Symbol("FOCUS_SILENTLY");
function focusSilently(element) {
  element[FOCUS_SILENTLY] = true;
  element.focus({ preventScroll: true });
}
function silentlyFocused(element) {
  const isSilentlyFocused = element[FOCUS_SILENTLY];
  delete element[FOCUS_SILENTLY];
  return isSilentlyFocused;
}
function isItem(store, element, exclude) {
  if (!element)
    return false;
  if (element === exclude)
    return false;
  const item = store.item(element.id);
  if (!item)
    return false;
  if (exclude && item.element === exclude)
    return false;
  return true;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createComponent: () => (/* binding */ createComponent),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createHook: () => (/* binding */ createHook),
/* harmony export */   createMemoComponent: () => (/* binding */ createMemoComponent),
/* harmony export */   createStoreContext: () => (/* binding */ createStoreContext),
/* harmony export */   forwardRef: () => (/* binding */ forwardRef2),
/* harmony export */   memo: () => (/* binding */ memo2)
/* harmony export */ });
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _XM66DUTO_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./XM66DUTO.js */ "./node_modules/@ariakit/react-core/esm/__chunks/XM66DUTO.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";




// src/utils/system.tsx



function isRenderProp(children) {
  return typeof children === "function";
}
function forwardRef2(render) {
  const Role = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => render((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { ref })));
  Role.displayName = render.displayName || render.name;
  return Role;
}
function memo2(Component, propsAreEqual) {
  const Role = react__WEBPACK_IMPORTED_MODULE_0__.memo(Component, propsAreEqual);
  Role.displayName = Component.displayName || Component.name;
  return Role;
}
function createComponent(render) {
  const Role = (props, ref) => render((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({ ref }, props));
  return react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(Role);
}
function createMemoComponent(render) {
  const Role = createComponent(render);
  return react__WEBPACK_IMPORTED_MODULE_0__.memo(Role);
}
function createElement(Type, props) {
  const _a = props, { as: As, wrapElement, render } = _a, rest = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__objRest)(_a, ["as", "wrapElement", "render"]);
  let element;
  const mergedRef = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(props.ref, (0,_XM66DUTO_js__WEBPACK_IMPORTED_MODULE_4__.getRefProperty)(render));
  if (true) {
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
      if (!As)
        return;
      console.warn(
        "The `as` prop is deprecated. Use the `render` prop instead.",
        "See https://ariakit.org/guide/composition"
      );
    }, [As]);
  }
  if (As && typeof As !== "string") {
    element = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(As, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, rest), { render }));
  } else if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(render)) {
    const renderProps = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, render.props), { ref: mergedRef });
    element = react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(render, (0,_XM66DUTO_js__WEBPACK_IMPORTED_MODULE_4__.mergeProps)(rest, renderProps));
  } else if (render) {
    element = render(rest);
  } else if (isRenderProp(props.children)) {
    if (true) {
      react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
        console.warn(
          "The `children` prop as a function is deprecated. Use the `render` prop instead.",
          "See https://ariakit.org/guide/composition"
        );
      }, []);
    }
    const _b = rest, { children } = _b, otherProps = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__objRest)(_b, ["children"]);
    element = props.children(otherProps);
  } else if (As) {
    element = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(As, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, rest));
  } else {
    element = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Type, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, rest));
  }
  if (wrapElement) {
    return wrapElement(element);
  }
  return element;
}
function createHook(useProps) {
  const useRole = (props = {}) => {
    const htmlProps = useProps(props);
    const copy = {};
    for (const prop in htmlProps) {
      if ((0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.hasOwnProperty)(htmlProps, prop) && htmlProps[prop] !== void 0) {
        copy[prop] = htmlProps[prop];
      }
    }
    return copy;
  };
  return useRole;
}
function createStoreContext(providers = [], scopedProviders = []) {
  const context = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
  const scopedContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
  const useContext2 = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(context);
  const useScopedContext = (onlyScoped = false) => {
    const scoped = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scopedContext);
    const store = useContext2();
    if (onlyScoped)
      return scoped;
    return scoped || store;
  };
  const useProviderContext = () => {
    const scoped = react__WEBPACK_IMPORTED_MODULE_0__.useContext(scopedContext);
    const store = useContext2();
    if (scoped && scoped === store)
      return;
    return store;
  };
  const ContextProvider = (props) => {
    return providers.reduceRight(
      (children, Provider) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Provider, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children })),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(context.Provider, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props))
    );
  };
  const ScopedContextProvider = (props) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ContextProvider, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children: scopedProviders.reduceRight(
      (children, Provider) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Provider, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props), { children })),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(scopedContext.Provider, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_2__.__spreadValues)({}, props))
    ) }));
  };
  return {
    context,
    scopedContext,
    useContext: useContext2,
    useScopedContext,
    useProviderContext,
    ContextProvider,
    ScopedContextProvider
  };
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __objRest: () => (/* binding */ __objRest),
/* harmony export */   __spreadProps: () => (/* binding */ __spreadProps),
/* harmony export */   __spreadValues: () => (/* binding */ __spreadValues)
/* harmony export */ });
"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/4UUKJZ4V.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/4UUKJZ4V.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionContextProvider: () => (/* binding */ CollectionContextProvider),
/* harmony export */   CollectionScopedContextProvider: () => (/* binding */ CollectionScopedContextProvider),
/* harmony export */   useCollectionContext: () => (/* binding */ useCollectionContext),
/* harmony export */   useCollectionProviderContext: () => (/* binding */ useCollectionProviderContext),
/* harmony export */   useCollectionScopedContext: () => (/* binding */ useCollectionScopedContext)
/* harmony export */ });
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
"use client";


// src/collection/collection-context.tsx
var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)();
var useCollectionContext = ctx.useContext;
var useCollectionScopedContext = ctx.useScopedContext;
var useCollectionProviderContext = ctx.useProviderContext;
var CollectionContextProvider = ctx.ContextProvider;
var CollectionScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
var react__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAttribute: () => (/* binding */ useAttribute),
/* harmony export */   useBooleanEvent: () => (/* binding */ useBooleanEvent),
/* harmony export */   useControlledState: () => (/* binding */ useControlledState),
/* harmony export */   useDeferredValue: () => (/* binding */ useDeferredValue),
/* harmony export */   useEvent: () => (/* binding */ useEvent),
/* harmony export */   useForceUpdate: () => (/* binding */ useForceUpdate),
/* harmony export */   useId: () => (/* binding */ useId),
/* harmony export */   useInitialValue: () => (/* binding */ useInitialValue),
/* harmony export */   useIsMouseMoving: () => (/* binding */ useIsMouseMoving),
/* harmony export */   useLazyValue: () => (/* binding */ useLazyValue),
/* harmony export */   useLiveRef: () => (/* binding */ useLiveRef),
/* harmony export */   useMergeRefs: () => (/* binding */ useMergeRefs),
/* harmony export */   useMetadataProps: () => (/* binding */ useMetadataProps),
/* harmony export */   usePortalRef: () => (/* binding */ usePortalRef),
/* harmony export */   usePreviousValue: () => (/* binding */ usePreviousValue),
/* harmony export */   useRefId: () => (/* binding */ useRefId),
/* harmony export */   useSafeLayoutEffect: () => (/* binding */ useSafeLayoutEffect),
/* harmony export */   useTagName: () => (/* binding */ useTagName),
/* harmony export */   useUpdateEffect: () => (/* binding */ useUpdateEffect),
/* harmony export */   useUpdateLayoutEffect: () => (/* binding */ useUpdateLayoutEffect),
/* harmony export */   useWrapElement: () => (/* binding */ useWrapElement)
/* harmony export */ });
/* harmony import */ var _XM66DUTO_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./XM66DUTO.js */ "./node_modules/@ariakit/react-core/esm/__chunks/XM66DUTO.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";



// src/utils/hooks.ts





var _React = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, /*#__PURE__*/ (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (react__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(react__WEBPACK_IMPORTED_MODULE_0__, 2))));
var useReactId = _React.useId;
var useReactDeferredValue = _React.useDeferredValue;
var useReactInsertionEffect = _React.useInsertionEffect;
var useSafeLayoutEffect = _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.canUseDOM ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function useInitialValue(value) {
  const [initialValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  return initialValue;
}
function useLazyValue(init) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  if (ref.current === void 0) {
    ref.current = init();
  }
  return ref.current;
}
function useLiveRef(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  useSafeLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
function usePreviousValue(value) {
  const [previousValue, setPreviousValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  if (value !== previousValue) {
    setPreviousValue(value);
  }
  return previousValue;
}
function useEvent(callback) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (useReactInsertionEffect) {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    ref.current = callback;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((...args) => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.call(ref, ...args);
  }, []);
}
function useMergeRefs(...refs) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!refs.some(Boolean))
      return;
    return (value) => {
      refs.forEach((ref) => (0,_XM66DUTO_js__WEBPACK_IMPORTED_MODULE_3__.setRef)(ref, value));
    };
  }, refs);
}
function useRefId(ref, deps) {
  const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(void 0);
  useSafeLayoutEffect(() => {
    var _a;
    setId((_a = ref == null ? void 0 : ref.current) == null ? void 0 : _a.id);
  }, deps);
  return id;
}
function useId(defaultId) {
  if (useReactId) {
    const reactId = useReactId();
    if (defaultId)
      return defaultId;
    return reactId;
  }
  const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultId);
  useSafeLayoutEffect(() => {
    if (defaultId || id)
      return;
    const random = Math.random().toString(36).substr(2, 6);
    setId(`id-${random}`);
  }, [defaultId, id]);
  return defaultId || id;
}
function useDeferredValue(value) {
  if (useReactDeferredValue) {
    return useReactDeferredValue(value);
  }
  const [deferredValue, setDeferredValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const raf = requestAnimationFrame(() => setDeferredValue(value));
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return deferredValue;
}
function useTagName(refOrElement, type) {
  const stringOrUndefined = (type2) => {
    if (typeof type2 !== "string")
      return;
    return type2;
  };
  const [tagName, setTagName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => stringOrUndefined(type));
  useSafeLayoutEffect(() => {
    const element = refOrElement && "current" in refOrElement ? refOrElement.current : refOrElement;
    setTagName((element == null ? void 0 : element.tagName.toLowerCase()) || stringOrUndefined(type));
  }, [refOrElement, type]);
  return tagName;
}
function useAttribute(refOrElement, attributeName, defaultValue) {
  const [attribute, setAttribute] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);
  useSafeLayoutEffect(() => {
    const element = refOrElement && "current" in refOrElement ? refOrElement.current : refOrElement;
    const value = element == null ? void 0 : element.getAttribute(attributeName);
    if (value == null)
      return;
    setAttribute(value);
  }, [refOrElement, attributeName]);
  return attribute;
}
function useUpdateEffect(effect, deps) {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
  }, deps);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
    () => () => {
      mounted.current = false;
    },
    []
  );
}
function useUpdateLayoutEffect(effect, deps) {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  useSafeLayoutEffect(() => {
    if (mounted.current) {
      return effect();
    }
    mounted.current = true;
  }, deps);
  useSafeLayoutEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );
}
function useControlledState(defaultState, state, setState) {
  const [localState, setLocalState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultState);
  const nextState = state !== void 0 ? state : localState;
  const stateRef = useLiveRef(state);
  const setStateRef = useLiveRef(setState);
  const nextStateRef = useLiveRef(nextState);
  const setNextState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((prevValue) => {
    const setStateProp = setStateRef.current;
    if (setStateProp) {
      if (isSetNextState(setStateProp)) {
        setStateProp(prevValue);
      } else {
        const nextValue = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__.applyState)(prevValue, nextStateRef.current);
        nextStateRef.current = nextValue;
        setStateProp(nextValue);
      }
    }
    if (stateRef.current === void 0) {
      setLocalState(prevValue);
    }
  }, []);
  defineSetNextState(setNextState);
  return [nextState, setNextState];
}
var SET_NEXT_STATE = Symbol("setNextState");
function isSetNextState(arg) {
  return arg[SET_NEXT_STATE] === true;
}
function defineSetNextState(arg) {
  if (!isSetNextState(arg)) {
    Object.defineProperty(arg, SET_NEXT_STATE, { value: true });
  }
}
function useForceUpdate() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(() => [], []);
}
function useBooleanEvent(booleanOrCallback) {
  return useEvent(
    typeof booleanOrCallback === "function" ? booleanOrCallback : () => booleanOrCallback
  );
}
function useWrapElement(props, callback, deps = []) {
  const wrapElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
    (element) => {
      if (props.wrapElement) {
        element = props.wrapElement(element);
      }
      return callback(element);
    },
    [...deps, props.wrapElement]
  );
  return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), { wrapElement });
}
function usePortalRef(portalProp = false, portalRefProp) {
  const [portalNode, setPortalNode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const portalRef = useMergeRefs(setPortalNode, portalRefProp);
  const domReady = !portalProp || portalNode;
  return { portalRef, portalNode, domReady };
}
function useMetadataProps(props, key, value) {
  const parent = props.onLoadedMetadataCapture;
  const onLoadedMetadataCapture = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return Object.assign(() => {
    }, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, parent), { [key]: value }));
  }, [parent, key, value]);
  return [parent == null ? void 0 : parent[key], { onLoadedMetadataCapture }];
}
function useIsMouseMoving() {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("mousemove", setMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("mousedown", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("mouseup", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("keydown", resetMouseMoving, true);
    (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("scroll", resetMouseMoving, true);
  }, []);
  const isMouseMoving = useEvent(() => mouseMoving);
  return isMouseMoving;
}
var mouseMoving = false;
var previousScreenX = 0;
var previousScreenY = 0;
function hasMouseMovement(event) {
  const movementX = event.movementX || event.screenX - previousScreenX;
  const movementY = event.movementY || event.screenY - previousScreenY;
  previousScreenX = event.screenX;
  previousScreenY = event.screenY;
  return movementX || movementY || "development" === "test";
}
function setMouseMoving(event) {
  if (!hasMouseMovement(event))
    return;
  mouseMoving = true;
}
function resetMouseMoving() {
  mouseMoving = false;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/7GBW5FLS.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/7GBW5FLS.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCompositeStore: () => (/* binding */ useCompositeStore),
/* harmony export */   useCompositeStoreProps: () => (/* binding */ useCompositeStoreProps)
/* harmony export */ });
/* harmony import */ var _Y6GYTNQ2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Y6GYTNQ2.js */ "./node_modules/@ariakit/react-core/esm/__chunks/Y6GYTNQ2.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _ariakit_core_composite_composite_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/composite/composite-store */ "./node_modules/@ariakit/core/esm/__chunks/IERTEJ3A.js");
"use client";



// src/composite/composite-store.ts

function useCompositeStoreProps(store, update, props) {
  store = (0,_Y6GYTNQ2_js__WEBPACK_IMPORTED_MODULE_0__.useCollectionStoreProps)(store, update, props);
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "activeId", "setActiveId");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "includesBaseElement");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "virtualFocus");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "orientation");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "rtl");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "focusLoop");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "focusWrap");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "focusShift");
  return store;
}
function useCompositeStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_composite_composite_store__WEBPACK_IMPORTED_MODULE_2__.createCompositeStore, props);
  return useCompositeStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/7H5KSHHF.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/7H5KSHHF.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverContextProvider: () => (/* binding */ PopoverContextProvider),
/* harmony export */   PopoverScopedContextProvider: () => (/* binding */ PopoverScopedContextProvider),
/* harmony export */   usePopoverContext: () => (/* binding */ usePopoverContext),
/* harmony export */   usePopoverProviderContext: () => (/* binding */ usePopoverProviderContext),
/* harmony export */   usePopoverScopedContext: () => (/* binding */ usePopoverScopedContext)
/* harmony export */ });
/* harmony import */ var _G6BJYYBK_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./G6BJYYBK.js */ "./node_modules/@ariakit/react-core/esm/__chunks/G6BJYYBK.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
"use client";



// src/popover/popover-context.tsx
var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)(
  [_G6BJYYBK_js__WEBPACK_IMPORTED_MODULE_1__.DialogContextProvider],
  [_G6BJYYBK_js__WEBPACK_IMPORTED_MODULE_1__.DialogScopedContextProvider]
);
var usePopoverContext = ctx.useContext;
var usePopoverScopedContext = ctx.useScopedContext;
var usePopoverProviderContext = ctx.useProviderContext;
var PopoverContextProvider = ctx.ContextProvider;
var PopoverScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/7QTPYGNZ.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/7QTPYGNZ.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Composite: () => (/* binding */ Composite),
/* harmony export */   useComposite: () => (/* binding */ useComposite)
/* harmony export */ });
/* harmony import */ var _3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./3IEDWLST.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3IEDWLST.js");
/* harmony import */ var _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./IB7YUKH5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js");
/* harmony import */ var _KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./KK7H3W2B.js */ "./node_modules/@ariakit/react-core/esm/__chunks/KK7H3W2B.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/array */ "./node_modules/@ariakit/core/esm/__chunks/7PRQYBBV.js");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







// src/composite/composite.tsx







function isGrid(items) {
  return items.some((item) => !!item.rowId);
}
function isPrintableKey(event) {
  const target = event.target;
  if (target && !(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(target))
    return false;
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
function isModifierKey(event) {
  return event.key === "Shift" || event.key === "Control" || event.key === "Alt" || event.key === "Meta";
}
function useKeyboardEventProxy(store, onKeyboardEvent, previousElementRef) {
  return (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
    var _a;
    onKeyboardEvent == null ? void 0 : onKeyboardEvent(event);
    if (event.defaultPrevented)
      return;
    if (event.isPropagationStopped())
      return;
    if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event))
      return;
    if (isModifierKey(event))
      return;
    if (isPrintableKey(event))
      return;
    const state = store.getState();
    const activeElement = (_a = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)) == null ? void 0 : _a.element;
    if (!activeElement)
      return;
    const _b = event, { view } = _b, eventInit = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, ["view"]);
    const previousElement = previousElementRef == null ? void 0 : previousElementRef.current;
    if (activeElement !== previousElement) {
      activeElement.focus();
    }
    if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireKeyboardEvent)(activeElement, event.type, eventInit)) {
      event.preventDefault();
    }
    if (event.currentTarget.contains(activeElement)) {
      event.stopPropagation();
    }
  });
}
function findFirstEnabledItemInTheLastRow(items) {
  return (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.findFirstEnabledItem)(
    (0,_ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__.flatten2DArray)((0,_ariakit_core_utils_array__WEBPACK_IMPORTED_MODULE_7__.reverseArray)((0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.groupItemsByRows)(items)))
  );
}
function useScheduleFocus(store) {
  const [scheduled, setScheduled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const schedule = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setScheduled(true), []);
  const activeItem = store.useState(
    (state) => (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)
  );
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const activeElement = activeItem == null ? void 0 : activeItem.element;
    if (!scheduled)
      return;
    if (!activeElement)
      return;
    setScheduled(false);
    activeElement.focus({ preventScroll: true });
  }, [activeItem, scheduled]);
  return schedule;
}
var useComposite = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_8__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      composite = true,
      focusOnMove = composite,
      moveOnKeyPress = true
    } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__objRest)(_b, [
      "store",
      "composite",
      "focusOnMove",
      "moveOnKeyPress"
    ]);
    const context = (0,_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_9__.useCompositeProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__.invariant)(
      store,
       true && "Composite must receive a `store` prop or be wrapped in a CompositeProvider component."
    );
    const previousElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const scheduleFocus = useScheduleFocus(store);
    const moves = store.useState("moves");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      var _a2;
      if (!store)
        return;
      if (!moves)
        return;
      if (!composite)
        return;
      if (!focusOnMove)
        return;
      const { activeId: activeId2 } = store.getState();
      const itemElement = (_a2 = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2)) == null ? void 0 : _a2.element;
      if (!itemElement)
        return;
      (0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__.focusIntoView)(itemElement);
    }, [store, moves, composite, focusOnMove]);
    (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useSafeLayoutEffect)(() => {
      if (!store)
        return;
      if (!moves)
        return;
      if (!composite)
        return;
      const { baseElement, activeId: activeId2 } = store.getState();
      const isSelfAcive = activeId2 === null;
      if (!isSelfAcive)
        return;
      if (!baseElement)
        return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (previousElement) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, { relatedTarget: baseElement });
      }
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_11__.hasFocus)(baseElement)) {
        baseElement.focus();
      }
    }, [store, moves, composite]);
    const activeId = store.useState("activeId");
    const virtualFocus = store.useState("virtualFocus");
    (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useSafeLayoutEffect)(() => {
      var _a2;
      if (!store)
        return;
      if (!composite)
        return;
      if (!virtualFocus)
        return;
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if (!previousElement)
        return;
      const activeElement = (_a2 = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId)) == null ? void 0 : _a2.element;
      const relatedTarget = activeElement || (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getActiveElement)(previousElement);
      if (relatedTarget === previousElement)
        return;
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, { relatedTarget });
    }, [store, activeId, virtualFocus, composite]);
    const onKeyDownCapture = useKeyboardEventProxy(
      store,
      props.onKeyDownCapture,
      previousElementRef
    );
    const onKeyUpCapture = useKeyboardEventProxy(
      store,
      props.onKeyUpCapture,
      previousElementRef
    );
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented)
        return;
      if (!store)
        return;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (!virtualFocus2)
        return;
      const previousActiveElement = event.relatedTarget;
      const isSilentlyFocused = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.silentlyFocused)(event.currentTarget);
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && isSilentlyFocused) {
        event.stopPropagation();
        previousElementRef.current = previousActiveElement;
      }
    });
    const onFocusProp = props.onFocus;
    const onFocus = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented)
        return;
      if (!composite)
        return;
      if (!store)
        return;
      const { relatedTarget } = event;
      const { virtualFocus: virtualFocus2 } = store.getState();
      if (virtualFocus2) {
        if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && !(0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, relatedTarget)) {
          queueMicrotask(scheduleFocus);
        }
      } else if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event)) {
        store.setActiveId(null);
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      var _a2;
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented)
        return;
      if (!store)
        return;
      const { virtualFocus: virtualFocus2, activeId: activeId2 } = store.getState();
      if (!virtualFocus2)
        return;
      const activeElement = (_a2 = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2)) == null ? void 0 : _a2.element;
      const nextActiveElement = event.relatedTarget;
      const nextActiveElementIsItem = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, nextActiveElement);
      const previousElement = previousElementRef.current;
      previousElementRef.current = null;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event) && nextActiveElementIsItem) {
        if (nextActiveElement === activeElement) {
          if (previousElement && previousElement !== nextActiveElement) {
            (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, event);
          }
        } else if (activeElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(activeElement, event);
        } else if (previousElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(previousElement, event);
        }
        event.stopPropagation();
      } else {
        const targetIsItem = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.isItem)(store, event.target);
        if (!targetIsItem && activeElement) {
          (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.fireBlurEvent)(activeElement, event);
        }
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const moveOnKeyPressProp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useBooleanEvent)(moveOnKeyPress);
    const onKeyDown = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useEvent)((event) => {
      var _a2;
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented)
        return;
      if (!store)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event))
        return;
      const { orientation, items, renderedItems, activeId: activeId2 } = store.getState();
      const activeItem = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, activeId2);
      if ((_a2 = activeItem == null ? void 0 : activeItem.element) == null ? void 0 : _a2.isConnected)
        return;
      const isVertical = orientation !== "horizontal";
      const isHorizontal = orientation !== "vertical";
      const grid = isGrid(renderedItems);
      const isHorizontalKey = event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home" || event.key === "End";
      if (isHorizontalKey && (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(event.currentTarget))
        return;
      const up = () => {
        if (grid) {
          const item = items && findFirstEnabledItemInTheLastRow(items);
          return item == null ? void 0 : item.id;
        }
        return store == null ? void 0 : store.last();
      };
      const keyMap = {
        ArrowUp: (grid || isVertical) && up,
        ArrowRight: (grid || isHorizontal) && store.first,
        ArrowDown: (grid || isVertical) && store.first,
        ArrowLeft: (grid || isHorizontal) && store.last,
        Home: store.first,
        End: store.last,
        PageUp: store.first,
        PageDown: store.last
      };
      const action = keyMap[event.key];
      if (action) {
        const id = action();
        if (id !== void 0) {
          if (!moveOnKeyPressProp(event))
            return;
          event.preventDefault();
          store.move(id);
        }
      }
    });
    props = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_9__.CompositeContextProvider, { value: store, children: element }),
      [store]
    );
    const activeDescendant = store.useState((state) => {
      var _a2;
      if (!store)
        return;
      if (!composite)
        return;
      if (!state.virtualFocus)
        return;
      return (_a2 = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_5__.getEnabledItem)(store, state.activeId)) == null ? void 0 : _a2.id;
    });
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({
      "aria-activedescendant": activeDescendant
    }, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(composite ? store.setBaseElement : null, props.ref),
      onKeyDownCapture,
      onKeyUpCapture,
      onFocusCapture,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    const focusable = store.useState(
      (state) => composite && (state.virtualFocus || state.activeId === null)
    );
    props = (0,_KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_12__.useFocusable)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_6__.__spreadValues)({ focusable }, props));
    return props;
  }
);
var Composite = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_8__.createComponent)((props) => {
  const htmlProps = useComposite(props);
  return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", htmlProps);
});
if (true) {
  Composite.displayName = "Composite";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/CLE7NTOY.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/CLE7NTOY.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisclosureContent: () => (/* binding */ DisclosureContent),
/* harmony export */   isHidden: () => (/* binding */ isHidden),
/* harmony export */   useDisclosureContent: () => (/* binding */ useDisclosureContent)
/* harmony export */ });
/* harmony import */ var _G6BJYYBK_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./G6BJYYBK.js */ "./node_modules/@ariakit/react-core/esm/__chunks/G6BJYYBK.js");
/* harmony import */ var _OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OAYFXAQ2.js */ "./node_modules/@ariakit/react-core/esm/__chunks/OAYFXAQ2.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







// src/disclosure/disclosure-content.tsx



function afterTimeout(timeoutMs, cb) {
  const timeoutId = setTimeout(cb, timeoutMs);
  return () => clearTimeout(timeoutId);
}
function afterPaint(cb) {
  let raf = requestAnimationFrame(() => {
    raf = requestAnimationFrame(cb);
  });
  return () => cancelAnimationFrame(raf);
}
function parseCSSTime(...times) {
  return times.join(", ").split(", ").reduce((longestTime, currentTimeString) => {
    const currentTime = parseFloat(currentTimeString || "0s") * 1e3;
    if (currentTime > longestTime)
      return currentTime;
    return longestTime;
  }, 0);
}
function isHidden(mounted, hidden, alwaysVisible) {
  return !alwaysVisible && hidden !== false && (!mounted || !!hidden);
}
var useDisclosureContent = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  (_a) => {
    var _b = _a, { store, alwaysVisible } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["store", "alwaysVisible"]);
    const context = (0,_OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_4__.useDisclosureProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.invariant)(
      store,
       true && "DisclosureContent must receive a `store` prop or be wrapped in a DisclosureProvider component."
    );
    const id = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useId)(props.id);
    const [transition, setTransition] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const open = store.useState("open");
    const mounted = store.useState("mounted");
    const animated = store.useState("animated");
    const contentElement = store.useState("contentElement");
    (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useSafeLayoutEffect)(() => {
      if (!animated)
        return;
      if (!(contentElement == null ? void 0 : contentElement.isConnected)) {
        setTransition(null);
        return;
      }
      return afterPaint(() => {
        setTransition(open ? "enter" : "leave");
      });
    }, [animated, contentElement, open]);
    (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useSafeLayoutEffect)(() => {
      if (!store)
        return;
      if (!animated)
        return;
      if (!contentElement)
        return;
      if (!transition)
        return;
      if (transition === "enter" && !open)
        return;
      if (transition === "leave" && open)
        return;
      if (typeof animated === "number") {
        const timeoutMs2 = animated;
        return afterTimeout(timeoutMs2, store.stopAnimation);
      }
      const {
        transitionDuration,
        animationDuration,
        transitionDelay,
        animationDelay
      } = getComputedStyle(contentElement);
      const delay = parseCSSTime(transitionDelay, animationDelay);
      const duration = parseCSSTime(transitionDuration, animationDuration);
      const timeoutMs = delay + duration;
      if (!timeoutMs)
        return;
      return afterTimeout(timeoutMs, store.stopAnimation);
    }, [store, animated, contentElement, open, transition]);
    props = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_G6BJYYBK_js__WEBPACK_IMPORTED_MODULE_7__.DialogScopedContextProvider, { value: store, children: element }),
      [store]
    );
    const hidden = isHidden(mounted, props.hidden, alwaysVisible);
    const style = hidden ? (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props.style), { display: "none" }) : props.style;
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      id,
      "data-enter": transition === "enter" ? "" : void 0,
      "data-leave": transition === "leave" ? "" : void 0,
      hidden
    }, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(id ? store.setContentElement : null, props.ref),
      style
    });
    return props;
  }
);
var DisclosureContentImpl = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createComponent)(
  (props) => {
    const htmlProps = useDisclosureContent(props);
    return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", htmlProps);
  }
);
var DisclosureContent = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createComponent)(
  (_a) => {
    var _b = _a, { unmountOnHide } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["unmountOnHide"]);
    const context = (0,_OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_4__.useDisclosureProviderContext)();
    const store = props.store || context;
    const mounted = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_8__.useStoreState)(
      store,
      (state) => !unmountOnHide || (state == null ? void 0 : state.mounted)
    );
    if (mounted === false)
      return null;
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DisclosureContentImpl, (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props));
  }
);
if (true) {
  DisclosureContent.displayName = "DisclosureContent";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useStore: () => (/* binding */ useStore),
/* harmony export */   useStoreProps: () => (/* binding */ useStoreProps),
/* harmony export */   useStoreState: () => (/* binding */ useStoreState)
/* harmony export */ });
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/store */ "./node_modules/@ariakit/core/esm/__chunks/EAHJFCU4.js");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
"use client";



// src/utils/store.tsx




var { useSyncExternalStore } = use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__;
var noopSubscribe = () => () => {
};
function useStoreState(store, keyOrSelector = _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.identity) {
  const storeSubscribe = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (callback) => {
      if (!store)
        return noopSubscribe();
      return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.subscribe)(store, null, callback);
    },
    [store]
  );
  const getSnapshot = () => {
    const key = typeof keyOrSelector === "string" ? keyOrSelector : null;
    const selector = typeof keyOrSelector === "function" ? keyOrSelector : null;
    const state = store == null ? void 0 : store.getState();
    if (selector)
      return selector(state);
    if (!state)
      return;
    if (!key)
      return;
    if (!(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(state, key))
      return;
    return state[key];
  };
  return useSyncExternalStore(storeSubscribe, getSnapshot, getSnapshot);
}
function useStoreProps(store, props, key, setKey) {
  const value = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(props, key) ? props[key] : void 0;
  const setValue = setKey ? props[setKey] : void 0;
  const propsRef = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useLiveRef)({ value, setValue });
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useSafeLayoutEffect)(() => {
    return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.sync)(store, [key], (state, prev) => {
      const { value: value2, setValue: setValue2 } = propsRef.current;
      if (!setValue2)
        return;
      if (state[key] === prev[key])
        return;
      if (state[key] === value2)
        return;
      setValue2(state[key]);
    });
  }, [store, key]);
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useSafeLayoutEffect)(() => {
    if (value === void 0)
      return;
    store.setState(key, value);
    return (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.batch)(store, [key], () => {
      if (value === void 0)
        return;
      store.setState(key, value);
    });
  });
}
function useStore(createStore, props) {
  const [store, setStore] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createStore(props));
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useSafeLayoutEffect)(() => (0,_ariakit_core_utils_store__WEBPACK_IMPORTED_MODULE_3__.init)(store), [store]);
  const useState2 = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (keyOrSelector) => useStoreState(store, keyOrSelector),
    [store]
  );
  const memoizedStore = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(
    () => (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_5__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_5__.__spreadValues)({}, store), { useState: useState2 }),
    [store, useState2]
  );
  const updateStore = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)(() => {
    setStore((store2) => createStore((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_5__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_5__.__spreadValues)({}, props), store2.getState())));
  });
  return [memoizedStore, updateStore];
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/G6BJYYBK.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/G6BJYYBK.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogContextProvider: () => (/* binding */ DialogContextProvider),
/* harmony export */   DialogDescriptionContext: () => (/* binding */ DialogDescriptionContext),
/* harmony export */   DialogHeadingContext: () => (/* binding */ DialogHeadingContext),
/* harmony export */   DialogScopedContextProvider: () => (/* binding */ DialogScopedContextProvider),
/* harmony export */   useDialogContext: () => (/* binding */ useDialogContext),
/* harmony export */   useDialogProviderContext: () => (/* binding */ useDialogProviderContext),
/* harmony export */   useDialogScopedContext: () => (/* binding */ useDialogScopedContext)
/* harmony export */ });
/* harmony import */ var _OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OAYFXAQ2.js */ "./node_modules/@ariakit/react-core/esm/__chunks/OAYFXAQ2.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/dialog/dialog-context.tsx

var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_2__.DisclosureContextProvider],
  [_OAYFXAQ2_js__WEBPACK_IMPORTED_MODULE_2__.DisclosureScopedContextProvider]
);
var useDialogContext = ctx.useContext;
var useDialogScopedContext = ctx.useScopedContext;
var useDialogProviderContext = ctx.useProviderContext;
var DialogContextProvider = ctx.ContextProvider;
var DialogScopedContextProvider = ctx.ScopedContextProvider;
var DialogHeadingContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(void 0);
var DialogDescriptionContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(void 0);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/G6ONQ5EH.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/G6ONQ5EH.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeHover: () => (/* binding */ CompositeHover),
/* harmony export */   useCompositeHover: () => (/* binding */ useCompositeHover)
/* harmony export */ });
/* harmony import */ var _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IB7YUKH5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";





// src/composite/composite-hover.ts




function getMouseDestination(event) {
  const relatedTarget = event.relatedTarget;
  if ((relatedTarget == null ? void 0 : relatedTarget.nodeType) === Node.ELEMENT_NODE) {
    return relatedTarget;
  }
  return null;
}
function hoveringInside(event) {
  const nextElement = getMouseDestination(event);
  if (!nextElement)
    return false;
  return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.contains)(event.currentTarget, nextElement);
}
var symbol = Symbol("composite-hover");
function movingToAnotherItem(event) {
  let dest = getMouseDestination(event);
  if (!dest)
    return false;
  do {
    if ((0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(dest, symbol) && dest[symbol])
      return true;
    dest = dest.parentElement;
  } while (dest);
  return false;
}
var useCompositeHover = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      focusOnHover = true,
      blurOnHoverEnd = !!focusOnHover
    } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
      "store",
      "focusOnHover",
      "blurOnHoverEnd"
    ]);
    const context = (0,_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_5__.useCompositeContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.invariant)(
      store,
       true && "CompositeHover must be wrapped in a Composite component."
    );
    const isMouseMoving = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useIsMouseMoving)();
    const onMouseMoveProp = props.onMouseMove;
    const focusOnHoverProp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(focusOnHover);
    const onMouseMove = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onMouseMoveProp == null ? void 0 : onMouseMoveProp(event);
      if (event.defaultPrevented)
        return;
      if (!isMouseMoving())
        return;
      if (!focusOnHoverProp(event))
        return;
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocusWithin)(event.currentTarget)) {
        const baseElement = store == null ? void 0 : store.getState().baseElement;
        if (baseElement && !(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(baseElement)) {
          baseElement.focus();
        }
      }
      store == null ? void 0 : store.setActiveId(event.currentTarget.id);
    });
    const onMouseLeaveProp = props.onMouseLeave;
    const blurOnHoverEndProp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(blurOnHoverEnd);
    const onMouseLeave = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      var _a2;
      onMouseLeaveProp == null ? void 0 : onMouseLeaveProp(event);
      if (event.defaultPrevented)
        return;
      if (!isMouseMoving())
        return;
      if (hoveringInside(event))
        return;
      if (movingToAnotherItem(event))
        return;
      if (!focusOnHoverProp(event))
        return;
      if (!blurOnHoverEndProp(event))
        return;
      store == null ? void 0 : store.setActiveId(null);
      (_a2 = store == null ? void 0 : store.getState().baseElement) == null ? void 0 : _a2.focus();
    });
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((element) => {
      if (!element)
        return;
      element[symbol] = true;
    }, []);
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({}, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(ref, props.ref),
      onMouseMove,
      onMouseLeave
    });
    return props;
  }
);
var CompositeHover = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createMemoComponent)(
  (props) => {
    const htmlProps = useCompositeHover(props);
    return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", htmlProps);
  }
);
if (true) {
  CompositeHover.displayName = "CompositeHover";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeContextProvider: () => (/* binding */ CompositeContextProvider),
/* harmony export */   CompositeItemContext: () => (/* binding */ CompositeItemContext),
/* harmony export */   CompositeRowContext: () => (/* binding */ CompositeRowContext),
/* harmony export */   CompositeScopedContextProvider: () => (/* binding */ CompositeScopedContextProvider),
/* harmony export */   useCompositeContext: () => (/* binding */ useCompositeContext),
/* harmony export */   useCompositeProviderContext: () => (/* binding */ useCompositeProviderContext),
/* harmony export */   useCompositeScopedContext: () => (/* binding */ useCompositeScopedContext)
/* harmony export */ });
/* harmony import */ var _4UUKJZ4V_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./4UUKJZ4V.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4UUKJZ4V.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";



// src/composite/composite-context.tsx

var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_4UUKJZ4V_js__WEBPACK_IMPORTED_MODULE_2__.CollectionContextProvider],
  [_4UUKJZ4V_js__WEBPACK_IMPORTED_MODULE_2__.CollectionScopedContextProvider]
);
var useCompositeContext = ctx.useContext;
var useCompositeScopedContext = ctx.useScopedContext;
var useCompositeProviderContext = ctx.useProviderContext;
var CompositeContextProvider = ctx.ContextProvider;
var CompositeScopedContextProvider = ctx.ScopedContextProvider;
var CompositeItemContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);
var CompositeRowContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/JCH6MLL2.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/JCH6MLL2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverAnchor: () => (/* binding */ PopoverAnchor),
/* harmony export */   usePopoverAnchor: () => (/* binding */ usePopoverAnchor)
/* harmony export */ });
/* harmony import */ var _7H5KSHHF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./7H5KSHHF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/7H5KSHHF.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
"use client";





// src/popover/popover-anchor.ts
var usePopoverAnchor = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createHook)(
  (_a) => {
    var _b = _a, { store } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__objRest)(_b, ["store"]);
    const context = (0,_7H5KSHHF_js__WEBPACK_IMPORTED_MODULE_2__.usePopoverProviderContext)();
    store = store || context;
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_3__.useMergeRefs)(store == null ? void 0 : store.setAnchorElement, props.ref)
    });
    return props;
  }
);
var PopoverAnchor = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createComponent)((props) => {
  const htmlProps = usePopoverAnchor(props);
  return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", htmlProps);
});
if (true) {
  PopoverAnchor.displayName = "PopoverAnchor";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/KK7H3W2B.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/KK7H3W2B.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Focusable: () => (/* binding */ Focusable),
/* harmony export */   useFocusable: () => (/* binding */ useFocusable)
/* harmony export */ });
/* harmony import */ var _SHA3WOPI_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SHA3WOPI.js */ "./node_modules/@ariakit/react-core/esm/__chunks/SHA3WOPI.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/platform */ "./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js");
"use client";





// src/focusable/focusable.ts






var isSafariBrowser = (0,_ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_1__.isSafari)();
var alwaysFocusVisibleInputTypes = [
  "text",
  "search",
  "url",
  "tel",
  "email",
  "password",
  "number",
  "date",
  "month",
  "week",
  "time",
  "datetime",
  "datetime-local"
];
function isAlwaysFocusVisible(element) {
  const { tagName, readOnly, type } = element;
  if (tagName === "TEXTAREA" && !readOnly)
    return true;
  if (tagName === "SELECT" && !readOnly)
    return true;
  if (tagName === "INPUT" && !readOnly) {
    return alwaysFocusVisibleInputTypes.includes(type);
  }
  if (element.isContentEditable)
    return true;
  return false;
}
function isAlwaysFocusVisibleDelayed(element) {
  const role = element.getAttribute("role");
  if (role !== "combobox")
    return false;
  return !!element.dataset.name;
}
function getLabels(element) {
  if ("labels" in element) {
    return element.labels;
  }
  return null;
}
function isNativeCheckboxOrRadio(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "input" && element.type) {
    return element.type === "radio" || element.type === "checkbox";
  }
  return false;
}
function isNativeTabbable(tagName) {
  if (!tagName)
    return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea" || tagName === "a";
}
function supportsDisabledAttribute(tagName) {
  if (!tagName)
    return true;
  return tagName === "button" || tagName === "input" || tagName === "select" || tagName === "textarea";
}
function getTabIndex(focusable, trulyDisabled, nativeTabbable, supportsDisabled, tabIndexProp) {
  if (!focusable) {
    return tabIndexProp;
  }
  if (trulyDisabled) {
    if (nativeTabbable && !supportsDisabled) {
      return -1;
    }
    return;
  }
  if (nativeTabbable) {
    return tabIndexProp;
  }
  return tabIndexProp || 0;
}
function useDisableEvent(onEvent, disabled) {
  return (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
    onEvent == null ? void 0 : onEvent(event);
    if (event.defaultPrevented)
      return;
    if (disabled) {
      event.stopPropagation();
      event.preventDefault();
    }
  });
}
var isKeyboardModality = true;
function onGlobalMouseDown(event) {
  const target = event.target;
  if (target && "hasAttribute" in target) {
    if (!target.hasAttribute("data-focus-visible")) {
      isKeyboardModality = false;
    }
  }
}
function onGlobalKeyDown(event) {
  if (event.metaKey)
    return;
  if (event.ctrlKey)
    return;
  if (event.altKey)
    return;
  isKeyboardModality = true;
}
var useFocusable = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  (_a) => {
    var _b = _a, {
      focusable = true,
      accessibleWhenDisabled,
      autoFocus,
      onFocusVisible
    } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
      "focusable",
      "accessibleWhenDisabled",
      "autoFocus",
      "onFocusVisible"
    ]);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable)
        return;
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("mousedown", onGlobalMouseDown, true);
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.addGlobalEventListener)("keydown", onGlobalKeyDown, true);
    }, [focusable]);
    if (isSafariBrowser) {
      (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!focusable)
          return;
        const element = ref.current;
        if (!element)
          return;
        if (!isNativeCheckboxOrRadio(element))
          return;
        const labels = getLabels(element);
        if (!labels)
          return;
        const onMouseUp = () => queueMicrotask(() => element.focus());
        labels.forEach((label) => label.addEventListener("mouseup", onMouseUp));
        return () => {
          labels.forEach(
            (label) => label.removeEventListener("mouseup", onMouseUp)
          );
        };
      }, [focusable]);
    }
    const disabled = focusable && (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.disabledFromProps)(props);
    const trulyDisabled = !!disabled && !accessibleWhenDisabled;
    const [focusVisible, setFocusVisible] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable)
        return;
      if (trulyDisabled && focusVisible) {
        setFocusVisible(false);
      }
    }, [focusable, trulyDisabled, focusVisible]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!focusable)
        return;
      if (!focusVisible)
        return;
      const element = ref.current;
      if (!element)
        return;
      if (typeof IntersectionObserver === "undefined")
        return;
      const observer = new IntersectionObserver(() => {
        if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.isFocusable)(element)) {
          setFocusVisible(false);
        }
      });
      observer.observe(element);
      return () => observer.disconnect();
    }, [focusable, focusVisible]);
    const onKeyPressCapture = useDisableEvent(
      props.onKeyPressCapture,
      disabled
    );
    const onMouseDownCapture = useDisableEvent(
      props.onMouseDownCapture,
      disabled
    );
    const onClickCapture = useDisableEvent(props.onClickCapture, disabled);
    const onMouseDownProp = props.onMouseDown;
    const onMouseDown = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onMouseDownProp == null ? void 0 : onMouseDownProp(event);
      if (event.defaultPrevented)
        return;
      if (!focusable)
        return;
      const element = event.currentTarget;
      if (!isSafariBrowser)
        return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isPortalEvent)(event))
        return;
      if (!(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_8__.isButton)(element) && !isNativeCheckboxOrRadio(element))
        return;
      let receivedFocus = false;
      const onFocus = () => {
        receivedFocus = true;
      };
      const options = { capture: true, once: true };
      element.addEventListener("focusin", onFocus, options);
      (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.queueBeforeEvent)(element, "mouseup", () => {
        element.removeEventListener("focusin", onFocus, true);
        if (receivedFocus)
          return;
        (0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.focusIfNeeded)(element);
      });
    });
    const handleFocusVisible = (event, currentTarget) => {
      if (currentTarget) {
        event.currentTarget = currentTarget;
      }
      if (!focusable)
        return;
      const element = event.currentTarget;
      if (!element)
        return;
      if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(element))
        return;
      onFocusVisible == null ? void 0 : onFocusVisible(event);
      if (event.defaultPrevented)
        return;
      setFocusVisible(true);
    };
    const onKeyDownCaptureProp = props.onKeyDownCapture;
    const onKeyDownCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)(
      (event) => {
        onKeyDownCaptureProp == null ? void 0 : onKeyDownCaptureProp(event);
        if (event.defaultPrevented)
          return;
        if (!focusable)
          return;
        if (focusVisible)
          return;
        if (event.metaKey)
          return;
        if (event.altKey)
          return;
        if (event.ctrlKey)
          return;
        if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isSelfTarget)(event))
          return;
        const element = event.currentTarget;
        queueMicrotask(() => handleFocusVisible(event, element));
      }
    );
    const onFocusCaptureProp = props.onFocusCapture;
    const onFocusCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onFocusCaptureProp == null ? void 0 : onFocusCaptureProp(event);
      if (event.defaultPrevented)
        return;
      if (!focusable)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isSelfTarget)(event)) {
        setFocusVisible(false);
        return;
      }
      const element = event.currentTarget;
      const applyFocusVisible = () => handleFocusVisible(event, element);
      if (isKeyboardModality || isAlwaysFocusVisible(event.target)) {
        queueMicrotask(applyFocusVisible);
      } else if (isAlwaysFocusVisibleDelayed(event.target)) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.queueBeforeEvent)(event.target, "focusout", applyFocusVisible);
      } else {
        setFocusVisible(false);
      }
    });
    const onBlurProp = props.onBlur;
    const onBlur = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((event) => {
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (!focusable)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_5__.isFocusEventOutside)(event))
        return;
      setFocusVisible(false);
    });
    const autoFocusOnShow = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_SHA3WOPI_js__WEBPACK_IMPORTED_MODULE_9__.FocusableContext);
    const autoFocusRef = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useEvent)((element) => {
      if (!focusable)
        return;
      if (!autoFocus)
        return;
      if (!element)
        return;
      if (!autoFocusOnShow)
        return;
      queueMicrotask(() => {
        if ((0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.hasFocus)(element))
          return;
        if (!(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_7__.isFocusable)(element))
          return;
        element.focus();
      });
    });
    const tagName = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useTagName)(ref, props.as);
    const nativeTabbable = focusable && isNativeTabbable(tagName);
    const supportsDisabled = focusable && supportsDisabledAttribute(tagName);
    const style = trulyDisabled ? (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({ pointerEvents: "none" }, props.style) : props.style;
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
      "data-focus-visible": focusable && focusVisible ? "" : void 0,
      "data-autofocus": autoFocus ? true : void 0,
      "aria-disabled": disabled ? true : void 0
    }, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)(ref, autoFocusRef, props.ref),
      style,
      tabIndex: getTabIndex(
        focusable,
        trulyDisabled,
        nativeTabbable,
        supportsDisabled,
        props.tabIndex
      ),
      disabled: supportsDisabled && trulyDisabled ? true : void 0,
      // TODO: Test Focusable contentEditable.
      contentEditable: disabled ? void 0 : props.contentEditable,
      onKeyPressCapture,
      onClickCapture,
      onMouseDownCapture,
      onMouseDown,
      onKeyDownCapture,
      onFocusCapture,
      onBlur
    });
    return props;
  }
);
var Focusable = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createComponent)((props) => {
  props = useFocusable(props);
  return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", props);
});
if (true) {
  Focusable.displayName = "Focusable";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/MG4P3223.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/MG4P3223.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePopoverStore: () => (/* binding */ usePopoverStore),
/* harmony export */   usePopoverStoreProps: () => (/* binding */ usePopoverStoreProps)
/* harmony export */ });
/* harmony import */ var _ZSELSBRM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZSELSBRM.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ZSELSBRM.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _ariakit_core_popover_popover_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/popover/popover-store */ "./node_modules/@ariakit/core/esm/__chunks/AF6IUUFN.js");
"use client";




// src/popover/popover-store.ts

function usePopoverStoreProps(store, update, props) {
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.popover]);
  store = (0,_ZSELSBRM_js__WEBPACK_IMPORTED_MODULE_1__.useDialogStoreProps)(store, update, props);
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStoreProps)(store, props, "placement");
  return store;
}
function usePopoverStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStore)(_ariakit_core_popover_popover_store__WEBPACK_IMPORTED_MODULE_3__.createPopoverStore, props);
  return usePopoverStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/NWCBQ4CV.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/NWCBQ4CV.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Command: () => (/* binding */ Command),
/* harmony export */   useCommand: () => (/* binding */ useCommand)
/* harmony export */ });
/* harmony import */ var _KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./KK7H3W2B.js */ "./node_modules/@ariakit/react-core/esm/__chunks/KK7H3W2B.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var _ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/platform */ "./node_modules/@ariakit/core/esm/__chunks/MHPO2BXA.js");
"use client";





// src/command/command.ts





function isNativeClick(event) {
  if (!event.isTrusted)
    return false;
  const element = event.currentTarget;
  if (event.key === "Enter") {
    return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(element) || element.tagName === "SUMMARY" || element.tagName === "A";
  }
  if (event.key === " ") {
    return (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(element) || element.tagName === "SUMMARY" || element.tagName === "INPUT" || element.tagName === "SELECT";
  }
  return false;
}
var symbol = Symbol("command");
var useCommand = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  (_a) => {
    var _b = _a, { clickOnEnter = true, clickOnSpace = true } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["clickOnEnter", "clickOnSpace"]);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const tagName = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useTagName)(ref, props.as);
    const type = props.type;
    const [isNativeButton, setIsNativeButton] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(
      () => !!tagName && (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)({ tagName, type })
    );
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!ref.current)
        return;
      setIsNativeButton((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isButton)(ref.current));
    }, []);
    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const activeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const disabled = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.disabledFromProps)(props);
    const [isDuplicate, metadataProps] = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useMetadataProps)(props, symbol, true);
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      const element = event.currentTarget;
      if (event.defaultPrevented)
        return;
      if (isDuplicate)
        return;
      if (disabled)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.isSelfTarget)(event))
        return;
      if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_1__.isTextField)(element))
        return;
      if (element.isContentEditable)
        return;
      const isEnter = clickOnEnter && event.key === "Enter";
      const isSpace = clickOnSpace && event.key === " ";
      const shouldPreventEnter = event.key === "Enter" && !clickOnEnter;
      const shouldPreventSpace = event.key === " " && !clickOnSpace;
      if (shouldPreventEnter || shouldPreventSpace) {
        event.preventDefault();
        return;
      }
      if (isEnter || isSpace) {
        const nativeClick = isNativeClick(event);
        if (isEnter) {
          if (!nativeClick) {
            event.preventDefault();
            const _a2 = event, { view } = _a2, eventInit = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_a2, ["view"]);
            const click = () => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.fireClickEvent)(element, eventInit);
            if ((0,_ariakit_core_utils_platform__WEBPACK_IMPORTED_MODULE_7__.isFirefox)()) {
              (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.queueBeforeEvent)(element, "keyup", click);
            } else {
              queueMicrotask(click);
            }
          }
        } else if (isSpace) {
          activeRef.current = true;
          if (!nativeClick) {
            event.preventDefault();
            setActive(true);
          }
        }
      }
    });
    const onKeyUpProp = props.onKeyUp;
    const onKeyUp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useEvent)((event) => {
      onKeyUpProp == null ? void 0 : onKeyUpProp(event);
      if (event.defaultPrevented)
        return;
      if (isDuplicate)
        return;
      if (disabled)
        return;
      if (event.metaKey)
        return;
      const isSpace = clickOnSpace && event.key === " ";
      if (activeRef.current && isSpace) {
        activeRef.current = false;
        if (!isNativeClick(event)) {
          event.preventDefault();
          setActive(false);
          const element = event.currentTarget;
          const _a2 = event, { view } = _a2, eventInit = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_a2, ["view"]);
          queueMicrotask(() => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_6__.fireClickEvent)(element, eventInit));
        }
      }
    });
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      "data-active": active ? "" : void 0,
      type: isNativeButton ? "button" : void 0
    }, metadataProps), props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_4__.useMergeRefs)(ref, props.ref),
      onKeyDown,
      onKeyUp
    });
    props = (0,_KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_8__.useFocusable)(props);
    return props;
  }
);
var Command = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createComponent)((props) => {
  props = useCommand(props);
  return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", props);
});
if (true) {
  Command.displayName = "Command";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/OAYFXAQ2.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/OAYFXAQ2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisclosureContextProvider: () => (/* binding */ DisclosureContextProvider),
/* harmony export */   DisclosureScopedContextProvider: () => (/* binding */ DisclosureScopedContextProvider),
/* harmony export */   useDisclosureContext: () => (/* binding */ useDisclosureContext),
/* harmony export */   useDisclosureProviderContext: () => (/* binding */ useDisclosureProviderContext),
/* harmony export */   useDisclosureScopedContext: () => (/* binding */ useDisclosureScopedContext)
/* harmony export */ });
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
"use client";


// src/disclosure/disclosure-context.tsx
var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createStoreContext)();
var useDisclosureContext = ctx.useContext;
var useDisclosureScopedContext = ctx.useScopedContext;
var useDisclosureProviderContext = ctx.useProviderContext;
var DisclosureContextProvider = ctx.ContextProvider;
var DisclosureScopedContextProvider = ctx.ScopedContextProvider;




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/QZLXIDNP.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/QZLXIDNP.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompositeItem: () => (/* binding */ CompositeItem),
/* harmony export */   useCompositeItem: () => (/* binding */ useCompositeItem)
/* harmony export */ });
/* harmony import */ var _NWCBQ4CV_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NWCBQ4CV.js */ "./node_modules/@ariakit/react-core/esm/__chunks/NWCBQ4CV.js");
/* harmony import */ var _UH3I23HL_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UH3I23HL.js */ "./node_modules/@ariakit/react-core/esm/__chunks/UH3I23HL.js");
/* harmony import */ var _3IEDWLST_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./3IEDWLST.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3IEDWLST.js");
/* harmony import */ var _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./IB7YUKH5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";









// src/composite/composite-item.tsx





function isEditableElement(element) {
  if (element.isContentEditable)
    return true;
  if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(element))
    return true;
  return element.tagName === "INPUT" && !(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isButton)(element);
}
function getNextPageOffset(scrollingElement, pageUp = false) {
  const height = scrollingElement.clientHeight;
  const { top } = scrollingElement.getBoundingClientRect();
  const pageSize = Math.max(height * 0.875, height - 40) * 1.5;
  const pageOffset = pageUp ? height - pageSize + top : pageSize + top;
  if (scrollingElement.tagName === "HTML") {
    return pageOffset + scrollingElement.scrollTop;
  }
  return pageOffset;
}
function getItemOffset(itemElement, pageUp = false) {
  const { top } = itemElement.getBoundingClientRect();
  if (pageUp) {
    return top + itemElement.clientHeight;
  }
  return top;
}
function findNextPageItemId(element, store, next, pageUp = false) {
  var _a;
  if (!store)
    return;
  if (!next)
    return;
  const { renderedItems } = store.getState();
  const scrollingElement = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.getScrollingElement)(element);
  if (!scrollingElement)
    return;
  const nextPageOffset = getNextPageOffset(scrollingElement, pageUp);
  let id;
  let prevDifference;
  for (let i = 0; i < renderedItems.length; i += 1) {
    const previousId = id;
    id = next(i);
    if (!id)
      break;
    if (id === previousId)
      continue;
    const itemElement = (_a = (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_3__.getEnabledItem)(store, id)) == null ? void 0 : _a.element;
    if (!itemElement)
      continue;
    const itemOffset = getItemOffset(itemElement, pageUp);
    const difference = itemOffset - nextPageOffset;
    const absDifference = Math.abs(difference);
    if (pageUp && difference <= 0 || !pageUp && difference >= 0) {
      if (prevDifference !== void 0 && prevDifference < absDifference) {
        id = previousId;
      }
      break;
    }
    prevDifference = absDifference;
  }
  return id;
}
function targetIsAnotherItem(event, store) {
  if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event))
    return false;
  return (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_3__.isItem)(store, event.target);
}
function useRole(ref, props) {
  const roleProp = props.role;
  const [role, setRole] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(roleProp);
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useSafeLayoutEffect)(() => {
    const element = ref.current;
    if (!element)
      return;
    setRole(element.getAttribute("role") || roleProp);
  }, [roleProp]);
  return role;
}
function requiresAriaSelected(role) {
  return role === "option" || role === "treeitem";
}
function supportsAriaSelected(role) {
  if (role === "option")
    return true;
  if (role === "tab")
    return true;
  if (role === "treeitem")
    return true;
  if (role === "gridcell")
    return true;
  if (role === "row")
    return true;
  if (role === "columnheader")
    return true;
  if (role === "rowheader")
    return true;
  return false;
}
var useCompositeItem = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_6__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      rowId: rowIdProp,
      preventScrollOnKeyDown = false,
      moveOnKeyPress = true,
      tabbable = false,
      getItem: getItemProp,
      "aria-setsize": ariaSetSizeProp,
      "aria-posinset": ariaPosInSetProp
    } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__objRest)(_b, [
      "store",
      "rowId",
      "preventScrollOnKeyDown",
      "moveOnKeyPress",
      "tabbable",
      "getItem",
      "aria-setsize",
      "aria-posinset"
    ]);
    const context = (0,_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_8__.useCompositeContext)();
    store = store || context;
    const id = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useId)(props.id);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const row = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_8__.CompositeRowContext);
    const rowId = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(store, (state) => {
      if (rowIdProp)
        return rowIdProp;
      if (!state)
        return;
      if (!(row == null ? void 0 : row.baseElement))
        return;
      if (row.baseElement !== state.baseElement)
        return;
      return row.id;
    });
    const disabled = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_10__.disabledFromProps)(props);
    const trulyDisabled = disabled && !props.accessibleWhenDisabled;
    const getItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
      (item) => {
        const nextItem = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadValues)({}, item), {
          id: id || item.id,
          rowId,
          disabled: !!trulyDisabled
        });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [id, rowId, trulyDisabled, getItemProp]
    );
    const onFocusProp = props.onFocus;
    const hasFocusedComposite = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const onFocus = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onFocusProp == null ? void 0 : onFocusProp(event);
      if (event.defaultPrevented)
        return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isPortalEvent)(event))
        return;
      if (!id)
        return;
      if (!store)
        return;
      const { activeId, virtualFocus: virtualFocus2, baseElement: baseElement2 } = store.getState();
      if (targetIsAnotherItem(event, store))
        return;
      if (activeId !== id) {
        store.setActiveId(id);
      }
      if (!virtualFocus2)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event))
        return;
      if (isEditableElement(event.currentTarget))
        return;
      if (!(baseElement2 == null ? void 0 : baseElement2.isConnected))
        return;
      hasFocusedComposite.current = true;
      const fromComposite = event.relatedTarget === baseElement2 || (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_3__.isItem)(store, event.relatedTarget);
      if (fromComposite) {
        (0,_3IEDWLST_js__WEBPACK_IMPORTED_MODULE_3__.focusSilently)(baseElement2);
      } else {
        baseElement2.focus();
      }
    });
    const onBlurCaptureProp = props.onBlurCapture;
    const onBlurCapture = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onBlurCaptureProp == null ? void 0 : onBlurCaptureProp(event);
      if (event.defaultPrevented)
        return;
      const state = store == null ? void 0 : store.getState();
      if ((state == null ? void 0 : state.virtualFocus) && hasFocusedComposite.current) {
        hasFocusedComposite.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const preventScrollOnKeyDownProp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(preventScrollOnKeyDown);
    const moveOnKeyPressProp = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useBooleanEvent)(moveOnKeyPress);
    const onKeyDown = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_4__.isSelfTarget)(event))
        return;
      if (!store)
        return;
      const { currentTarget } = event;
      const state = store.getState();
      const item = store.item(id);
      const isGrid = !!(item == null ? void 0 : item.rowId);
      const isVertical = state.orientation !== "horizontal";
      const isHorizontal = state.orientation !== "vertical";
      const canHomeEnd = () => {
        if (isGrid)
          return true;
        if (isHorizontal)
          return true;
        if (!state.baseElement)
          return true;
        if (!(0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__.isTextField)(state.baseElement))
          return true;
        return false;
      };
      const keyMap = {
        ArrowUp: (isGrid || isVertical) && store.up,
        ArrowRight: (isGrid || isHorizontal) && store.next,
        ArrowDown: (isGrid || isVertical) && store.down,
        ArrowLeft: (isGrid || isHorizontal) && store.previous,
        Home: () => {
          if (!canHomeEnd())
            return;
          if (!isGrid || event.ctrlKey) {
            return store == null ? void 0 : store.first();
          }
          return store == null ? void 0 : store.previous(-1);
        },
        End: () => {
          if (!canHomeEnd())
            return;
          if (!isGrid || event.ctrlKey) {
            return store == null ? void 0 : store.last();
          }
          return store == null ? void 0 : store.next(-1);
        },
        PageUp: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.up, true);
        },
        PageDown: () => {
          return findNextPageItemId(currentTarget, store, store == null ? void 0 : store.down);
        }
      };
      const action = keyMap[event.key];
      if (action) {
        const nextId = action();
        if (preventScrollOnKeyDownProp(event) || nextId !== void 0) {
          if (!moveOnKeyPressProp(event))
            return;
          event.preventDefault();
          store.move(nextId);
        }
      }
    });
    const baseElement = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(
      store,
      (state) => (state == null ? void 0 : state.baseElement) || void 0
    );
    const providerValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(
      () => ({ id, baseElement }),
      [id, baseElement]
    );
    props = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_8__.CompositeItemContext.Provider, { value: providerValue, children: element }),
      [providerValue]
    );
    const isActiveItem = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(
      store,
      (state) => !!state && state.activeId === id
    );
    const virtualFocus = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(store, "virtualFocus");
    const role = useRole(ref, props);
    let ariaSelected;
    if (isActiveItem) {
      if (requiresAriaSelected(role)) {
        ariaSelected = true;
      } else if (virtualFocus && supportsAriaSelected(role)) {
        ariaSelected = true;
      }
    }
    const ariaSetSize = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(store, (state) => {
      if (ariaSetSizeProp != null)
        return ariaSetSizeProp;
      if (!state)
        return;
      if (!(row == null ? void 0 : row.ariaSetSize))
        return;
      if (row.baseElement !== state.baseElement)
        return;
      return row.ariaSetSize;
    });
    const ariaPosInSet = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(store, (state) => {
      if (ariaPosInSetProp != null)
        return ariaPosInSetProp;
      if (!state)
        return;
      if (!(row == null ? void 0 : row.ariaPosInSet))
        return;
      if (row.baseElement !== state.baseElement)
        return;
      const itemsInRow = state.renderedItems.filter(
        (item) => item.rowId === rowId
      );
      return row.ariaPosInSet + itemsInRow.findIndex((item) => item.id === id);
    });
    const isTabbable = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_9__.useStoreState)(store, (state) => {
      if (!(state == null ? void 0 : state.renderedItems.length))
        return true;
      if (state.virtualFocus)
        return false;
      if (tabbable)
        return true;
      return state.activeId === id;
    });
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadValues)({
      id,
      "aria-selected": ariaSelected,
      "data-active-item": isActiveItem ? "" : void 0
    }, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)(ref, props.ref),
      tabIndex: isTabbable ? props.tabIndex : -1,
      onFocus,
      onBlurCapture,
      onKeyDown
    });
    props = (0,_NWCBQ4CV_js__WEBPACK_IMPORTED_MODULE_11__.useCommand)(props);
    props = (0,_UH3I23HL_js__WEBPACK_IMPORTED_MODULE_12__.useCollectionItem)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadValues)({
      store
    }, props), {
      getItem,
      shouldRegisterItem: !!id ? props.shouldRegisterItem : false
    }));
    return (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_7__.__spreadValues)({}, props), {
      "aria-setsize": ariaSetSize,
      "aria-posinset": ariaPosInSet
    });
  }
);
var CompositeItem = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_6__.createMemoComponent)(
  (props) => {
    const htmlProps = useCompositeItem(props);
    return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_6__.createElement)("button", htmlProps);
  }
);
if (true) {
  CompositeItem.displayName = "CompositeItem";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/SFCBA2JZ.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/SFCBA2JZ.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDisclosureStore: () => (/* binding */ useDisclosureStore),
/* harmony export */   useDisclosureStoreProps: () => (/* binding */ useDisclosureStoreProps)
/* harmony export */ });
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _ariakit_core_disclosure_disclosure_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/disclosure/disclosure-store */ "./node_modules/@ariakit/core/esm/__chunks/Z5IGYIPT.js");
"use client";



// src/disclosure/disclosure-store.ts

function useDisclosureStoreProps(store, update, props) {
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.store, props.disclosure]);
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "open", "setOpen");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "mounted", "setMounted");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "animated");
  return store;
}
function useDisclosureStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_disclosure_disclosure_store__WEBPACK_IMPORTED_MODULE_2__.createDisclosureStore, props);
  return useDisclosureStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/SHA3WOPI.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/SHA3WOPI.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusableContext: () => (/* binding */ FocusableContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/focusable/focusable-context.ts

var FocusableContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(true);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/UH3I23HL.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/UH3I23HL.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollectionItem: () => (/* binding */ CollectionItem),
/* harmony export */   useCollectionItem: () => (/* binding */ useCollectionItem)
/* harmony export */ });
/* harmony import */ var _4UUKJZ4V_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./4UUKJZ4V.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4UUKJZ4V.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";





// src/collection/collection-item.ts


var useCollectionItem = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      shouldRegisterItem = true,
      getItem = _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.identity,
      element: element
    } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, [
      "store",
      "shouldRegisterItem",
      "getItem",
      // @ts-expect-error This prop may come from a collection renderer.
      "element"
    ]);
    const context = (0,_4UUKJZ4V_js__WEBPACK_IMPORTED_MODULE_4__.useCollectionContext)();
    store = store || context;
    const id = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useId)(props.id);
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(element);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      const element2 = ref.current;
      if (!id)
        return;
      if (!element2)
        return;
      if (!shouldRegisterItem)
        return;
      const item = getItem({ id, element: element2 });
      return store == null ? void 0 : store.renderItem(item);
    }, [id, shouldRegisterItem, getItem, store]);
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_5__.useMergeRefs)(ref, props.ref)
    });
    return props;
  }
);
var CollectionItem = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createComponent)(
  (props) => {
    const htmlProps = useCollectionItem(props);
    return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", htmlProps);
  }
);
if (true) {
  CollectionItem.displayName = "CollectionItem";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxContextProvider: () => (/* binding */ ComboboxContextProvider),
/* harmony export */   ComboboxItemCheckedContext: () => (/* binding */ ComboboxItemCheckedContext),
/* harmony export */   ComboboxItemValueContext: () => (/* binding */ ComboboxItemValueContext),
/* harmony export */   ComboboxScopedContextProvider: () => (/* binding */ ComboboxScopedContextProvider),
/* harmony export */   useComboboxContext: () => (/* binding */ useComboboxContext),
/* harmony export */   useComboboxProviderContext: () => (/* binding */ useComboboxProviderContext),
/* harmony export */   useComboboxScopedContext: () => (/* binding */ useComboboxScopedContext)
/* harmony export */ });
/* harmony import */ var _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IB7YUKH5.js */ "./node_modules/@ariakit/react-core/esm/__chunks/IB7YUKH5.js");
/* harmony import */ var _7H5KSHHF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./7H5KSHHF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/7H5KSHHF.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";




// src/combobox/combobox-context.tsx

var ctx = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_1__.createStoreContext)(
  [_7H5KSHHF_js__WEBPACK_IMPORTED_MODULE_2__.PopoverContextProvider, _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_3__.CompositeContextProvider],
  [_7H5KSHHF_js__WEBPACK_IMPORTED_MODULE_2__.PopoverScopedContextProvider, _IB7YUKH5_js__WEBPACK_IMPORTED_MODULE_3__.CompositeScopedContextProvider]
);
var useComboboxContext = ctx.useContext;
var useComboboxScopedContext = ctx.useScopedContext;
var useComboboxProviderContext = ctx.useProviderContext;
var ComboboxContextProvider = ctx.ContextProvider;
var ComboboxScopedContextProvider = ctx.ScopedContextProvider;
var ComboboxItemValueContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(
  void 0
);
var ComboboxItemCheckedContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(false);




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/XM66DUTO.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/XM66DUTO.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRefProperty: () => (/* binding */ getRefProperty),
/* harmony export */   isValidElementWithRef: () => (/* binding */ isValidElementWithRef),
/* harmony export */   mergeProps: () => (/* binding */ mergeProps),
/* harmony export */   setRef: () => (/* binding */ setRef)
/* harmony export */ });
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";


// src/utils/misc.ts


function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function isValidElementWithRef(element) {
  if (!element)
    return false;
  if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(element))
    return false;
  if (!("ref" in element))
    return false;
  return true;
}
function getRefProperty(element) {
  if (!isValidElementWithRef(element))
    return null;
  return element.ref;
}
function mergeProps(base, overrides) {
  const props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, base);
  for (const key in overrides) {
    if (!(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.hasOwnProperty)(overrides, key))
      continue;
    if (key === "className") {
      const prop = "className";
      props[prop] = base[prop] ? `${base[prop]} ${overrides[prop]}` : overrides[prop];
      continue;
    }
    if (key === "style") {
      const prop = "style";
      props[prop] = base[prop] ? (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({}, base[prop]), overrides[prop]) : overrides[prop];
      continue;
    }
    const overrideValue = overrides[key];
    if (typeof overrideValue === "function" && key.startsWith("on")) {
      const baseValue = base[key];
      if (typeof baseValue === "function") {
        props[key] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }
    props[key] = overrideValue;
  }
  return props;
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/Y6GYTNQ2.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/Y6GYTNQ2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCollectionStore: () => (/* binding */ useCollectionStore),
/* harmony export */   useCollectionStoreProps: () => (/* binding */ useCollectionStoreProps)
/* harmony export */ });
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _ariakit_core_collection_collection_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/collection/collection-store */ "./node_modules/@ariakit/core/esm/__chunks/22K762VQ.js");
"use client";



// src/collection/collection-store.ts

function useCollectionStoreProps(store, update, props) {
  (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_0__.useUpdateEffect)(update, [props.store]);
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStoreProps)(store, props, "items", "setItems");
  return store;
}
function useCollectionStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_collection_collection_store__WEBPACK_IMPORTED_MODULE_2__.createCollectionStore, props);
  return useCollectionStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ZEXNX5JH.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ZEXNX5JH.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxList: () => (/* binding */ ComboboxList),
/* harmony export */   useComboboxList: () => (/* binding */ useComboboxList)
/* harmony export */ });
/* harmony import */ var _W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var _CLE7NTOY_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CLE7NTOY.js */ "./node_modules/@ariakit/react-core/esm/__chunks/CLE7NTOY.js");
/* harmony import */ var _KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./KK7H3W2B.js */ "./node_modules/@ariakit/react-core/esm/__chunks/KK7H3W2B.js");
/* harmony import */ var _3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";







// src/combobox/combobox-list.tsx




var useComboboxList = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  (_a) => {
    var _b = _a, { store, focusable = true, alwaysVisible } = _b, props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, ["store", "focusable", "alwaysVisible"]);
    const context = (0,_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.invariant)(
      store,
       true && "ComboboxList must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const id = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useId)(props.id);
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented)
        return;
      if (event.key === "Escape") {
        store == null ? void 0 : store.move(null);
      }
    });
    const restoreVirtualFocus = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const onFocusVisibleProp = props.onFocusVisible;
    const onFocusVisible = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onFocusVisibleProp == null ? void 0 : onFocusVisibleProp(event);
      if (event.defaultPrevented)
        return;
      if (event.type !== "focus")
        return;
      if (!store)
        return;
      const { virtualFocus } = store.getState();
      if (!virtualFocus)
        return;
      const { relatedTarget, currentTarget } = event;
      if (relatedTarget && currentTarget.contains(relatedTarget))
        return;
      restoreVirtualFocus.current = true;
      store.setState("virtualFocus", false);
    });
    const onBlurProp = props.onBlur;
    const onBlur = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (event.defaultPrevented)
        return;
      if (!restoreVirtualFocus.current)
        return;
      if (!(0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_7__.isFocusEventOutside)(event))
        return;
      restoreVirtualFocus.current = false;
      store == null ? void 0 : store.setState("virtualFocus", true);
    });
    props = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxScopedContextProvider, { value: store, children: element }),
      [store]
    );
    const mounted = store.useState("mounted");
    const hidden = (0,_CLE7NTOY_js__WEBPACK_IMPORTED_MODULE_8__.isHidden)(mounted, props.hidden, alwaysVisible);
    const style = hidden ? (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, props.style), { display: "none" }) : props.style;
    const multiSelectable = store.useState(
      (state) => Array.isArray(state.selectedValue)
    );
    const role = (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useAttribute)(ref, "role", props.role);
    const isCompositeRole = role === "listbox" || role === "tree" || role === "grid";
    const ariaMultiSelectable = isCompositeRole ? multiSelectable || void 0 : void 0;
    props = (0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      id,
      hidden,
      role: "listbox",
      tabIndex: focusable ? -1 : void 0,
      "aria-multiselectable": ariaMultiSelectable
    }, props), {
      ref: (0,_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(id ? store.setContentElement : null, ref, props.ref),
      style,
      onKeyDown,
      onFocusVisible,
      onBlur
    });
    props = (0,_KK7H3W2B_js__WEBPACK_IMPORTED_MODULE_9__.useFocusable)((0,_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({ focusable }, props));
    return props;
  }
);
var ComboboxList = (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createComponent)((props) => {
  const htmlProps = useComboboxList(props);
  return (0,_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", htmlProps);
});
if (true) {
  ComboboxList.displayName = "ComboboxList";
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ZKJ2WLF7.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ZKJ2WLF7.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useComboboxStore: () => (/* binding */ useComboboxStore),
/* harmony export */   useComboboxStoreProps: () => (/* binding */ useComboboxStoreProps)
/* harmony export */ });
/* harmony import */ var _7GBW5FLS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./7GBW5FLS.js */ "./node_modules/@ariakit/react-core/esm/__chunks/7GBW5FLS.js");
/* harmony import */ var _MG4P3223_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MG4P3223.js */ "./node_modules/@ariakit/react-core/esm/__chunks/MG4P3223.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _ariakit_core_combobox_combobox_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/combobox/combobox-store */ "./node_modules/@ariakit/core/esm/combobox/combobox-store.js");
"use client";




// src/combobox/combobox-store.ts

function useComboboxStoreProps(store, update, props) {
  store = (0,_MG4P3223_js__WEBPACK_IMPORTED_MODULE_0__.usePopoverStoreProps)(store, update, props);
  store = (0,_7GBW5FLS_js__WEBPACK_IMPORTED_MODULE_1__.useCompositeStoreProps)(store, update, props);
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStoreProps)(store, props, "value", "setValue");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStoreProps)(store, props, "selectedValue", "setSelectedValue");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStoreProps)(store, props, "resetValueOnHide");
  (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStoreProps)(store, props, "resetValueOnSelect");
  return store;
}
function useComboboxStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_2__.useStore)(_ariakit_core_combobox_combobox_store__WEBPACK_IMPORTED_MODULE_3__.createComboboxStore, props);
  return useComboboxStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/__chunks/ZSELSBRM.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/__chunks/ZSELSBRM.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDialogStore: () => (/* binding */ useDialogStore),
/* harmony export */   useDialogStoreProps: () => (/* binding */ useDialogStoreProps)
/* harmony export */ });
/* harmony import */ var _SFCBA2JZ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SFCBA2JZ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/SFCBA2JZ.js");
/* harmony import */ var _EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EKQEJRUF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/EKQEJRUF.js");
/* harmony import */ var _ariakit_core_dialog_dialog_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/dialog/dialog-store */ "./node_modules/@ariakit/core/esm/__chunks/SX2XFD6A.js");
"use client";



// src/dialog/dialog-store.ts

function useDialogStoreProps(store, update, props) {
  return (0,_SFCBA2JZ_js__WEBPACK_IMPORTED_MODULE_0__.useDisclosureStoreProps)(store, update, props);
}
function useDialogStore(props = {}) {
  const [store, update] = (0,_EKQEJRUF_js__WEBPACK_IMPORTED_MODULE_1__.useStore)(_ariakit_core_dialog_dialog_store__WEBPACK_IMPORTED_MODULE_2__.createDialogStore, props);
  return useDialogStoreProps(store, update, props);
}




/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-item-value.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxItemValue: () => (/* binding */ ComboboxItemValue),
/* harmony export */   useComboboxItemValue: () => (/* binding */ useComboboxItemValue)
/* harmony export */ });
/* harmony import */ var _chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var _chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";











// src/combobox/combobox-item-value.tsx



function normalizeValue(value) {
  return (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.normalizeString)(value).toLowerCase();
}
function splitValue(itemValue, userValue) {
  userValue = normalizeValue(userValue);
  let index = normalizeValue(itemValue).indexOf(userValue);
  const parts = [];
  while (index !== -1) {
    if (index !== 0) {
      parts.push(
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", { "data-autocomplete-value": "", children: itemValue.substr(0, index) }, parts.length)
      );
    }
    parts.push(
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", { "data-user-value": "", children: itemValue.substr(index, userValue.length) }, parts.length)
    );
    itemValue = itemValue.substr(index + userValue.length);
    index = normalizeValue(itemValue).indexOf(userValue);
  }
  if (itemValue) {
    parts.push(
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", { "data-autocomplete-value": "", children: itemValue }, parts.length)
    );
  }
  return parts;
}
var useComboboxItemValue = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  (_a) => {
    var _b = _a, { store, value } = _b, props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, ["store", "value"]);
    const context = (0,_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_5__.useComboboxScopedContext)();
    store = store || context;
    const itemContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_5__.ComboboxItemValueContext);
    const itemValue = value != null ? value : itemContext;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.invariant)(
      store,
       true && "ComboboxItemValue must be wrapped in a ComboboxItem component."
    );
    const stateValue = store.useState(
      (state) => itemValue && state.value ? state.value : void 0
    );
    const children = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(
      () => itemValue && stateValue ? splitValue(itemValue, stateValue) : itemValue,
      [itemValue, stateValue]
    );
    props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
      children
    }, props);
    return props;
  }
);
var ComboboxItemValue = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createComponent)(
  (props) => {
    const htmlProps = useComboboxItemValue(props);
    return (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", htmlProps);
  }
);
if (true) {
  ComboboxItemValue.displayName = "ComboboxItemValue";
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-item.js":
/*!************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-item.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxItem: () => (/* binding */ ComboboxItem),
/* harmony export */   useComboboxItem: () => (/* binding */ useComboboxItem)
/* harmony export */ });
/* harmony import */ var _chunks_G6ONQ5EH_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../__chunks/G6ONQ5EH.js */ "./node_modules/@ariakit/react-core/esm/__chunks/G6ONQ5EH.js");
/* harmony import */ var _chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var _chunks_QZLXIDNP_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../__chunks/QZLXIDNP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/QZLXIDNP.js");
/* harmony import */ var _chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../__chunks/6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";



















// src/combobox/combobox-item.tsx






function isSelected(storeValue, itemValue) {
  if (itemValue == null)
    return;
  if (storeValue == null)
    return false;
  if (Array.isArray(storeValue)) {
    return storeValue.includes(itemValue);
  }
  return storeValue === itemValue;
}
var useComboboxItem = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      value,
      hideOnClick,
      selectValueOnClick = true,
      setValueOnClick,
      focusOnHover = false,
      moveOnKeyPress = true,
      getItem: getItemProp
    } = _b, props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__objRest)(_b, [
      "store",
      "value",
      "hideOnClick",
      "selectValueOnClick",
      "setValueOnClick",
      "focusOnHover",
      "moveOnKeyPress",
      "getItem"
    ]);
    const context = (0,_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__.useComboboxScopedContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_5__.invariant)(
      store,
       true && "ComboboxItem must be wrapped in a ComboboxList or ComboboxPopover component."
    );
    const getItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
      (item) => {
        const nextItem = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({}, item), { value });
        if (getItemProp) {
          return getItemProp(nextItem);
        }
        return nextItem;
      },
      [value, getItemProp]
    );
    const multiSelectable = store.useState(
      (state) => Array.isArray(state.selectedValue)
    );
    setValueOnClick = setValueOnClick != null ? setValueOnClick : !multiSelectable;
    hideOnClick = hideOnClick != null ? hideOnClick : value != null && !multiSelectable;
    const onClickProp = props.onClick;
    const setValueOnClickProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(setValueOnClick);
    const selectValueOnClickProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(selectValueOnClick);
    const hideOnClickProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(hideOnClick);
    const onClick = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onClickProp == null ? void 0 : onClickProp(event);
      if (event.defaultPrevented)
        return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_7__.isDownloading)(event))
        return;
      if ((0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_7__.isOpeningInNewTab)(event))
        return;
      if (value != null) {
        if (selectValueOnClickProp(event)) {
          store == null ? void 0 : store.setSelectedValue((prevValue) => {
            if (!Array.isArray(prevValue))
              return value;
            if (prevValue.includes(value)) {
              return prevValue.filter((v) => v !== value);
            }
            return [...prevValue, value];
          });
        }
        if (setValueOnClickProp(event)) {
          store == null ? void 0 : store.setValue(value);
        }
      }
      if (hideOnClickProp(event)) {
        store == null ? void 0 : store.move(null);
        store == null ? void 0 : store.hide();
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const onKeyDown = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onKeyDownProp == null ? void 0 : onKeyDownProp(event);
      if (event.defaultPrevented)
        return;
      const baseElement = store == null ? void 0 : store.getState().baseElement;
      if (!baseElement)
        return;
      if ((0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__.hasFocus)(baseElement))
        return;
      const printable = event.key.length === 1;
      if (printable || event.key === "Backspace" || event.key === "Delete") {
        queueMicrotask(() => baseElement.focus());
        if ((0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_9__.isTextField)(baseElement)) {
          store == null ? void 0 : store.setValue(baseElement.value);
        }
      }
    });
    const selected = store.useState(
      (state) => isSelected(state.selectedValue, value)
    );
    if (multiSelectable && selected != null) {
      props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
        "aria-selected": selected
      }, props);
    }
    props = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useWrapElement)(
      props,
      (element) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxItemValueContext.Provider, { value, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_4__.ComboboxItemCheckedContext.Provider, { value: selected != null ? selected : false, children: element }) }),
      [value, selected]
    );
    const contentElement = store.useState("contentElement");
    props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      role: (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_9__.getPopupItemRole)(contentElement),
      children: value
    }, props), {
      onClick,
      onKeyDown
    });
    const moveOnKeyPressProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(moveOnKeyPress);
    props = (0,_chunks_QZLXIDNP_js__WEBPACK_IMPORTED_MODULE_10__.useCompositeItem)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({
      store
    }, props), {
      getItem,
      // Dispatch a custom event on the combobox input when moving to an item
      // with the keyboard so the Combobox component can enable inline
      // autocompletion.
      moveOnKeyPress: (event) => {
        if (!moveOnKeyPressProp(event))
          return false;
        const moveEvent = new Event("combobox-item-move");
        const baseElement = store == null ? void 0 : store.getState().baseElement;
        baseElement == null ? void 0 : baseElement.dispatchEvent(moveEvent);
        return true;
      }
    }));
    props = (0,_chunks_G6ONQ5EH_js__WEBPACK_IMPORTED_MODULE_11__.useCompositeHover)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_3__.__spreadValues)({ store, focusOnHover }, props));
    return props;
  }
);
var ComboboxItem = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createMemoComponent)(
  (props) => {
    const htmlProps = useComboboxItem(props);
    return (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", htmlProps);
  }
);
if (true) {
  ComboboxItem.displayName = "ComboboxItem";
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-label.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxLabel: () => (/* binding */ ComboboxLabel),
/* harmony export */   useComboboxLabel: () => (/* binding */ useComboboxLabel)
/* harmony export */ });
/* harmony import */ var _chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var _chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../__chunks/3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
"use client";











// src/combobox/combobox-label.ts

var useComboboxLabel = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createHook)(
  (_a) => {
    var _b = _a, { store } = _b, props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__objRest)(_b, ["store"]);
    const context = (0,_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_2__.useComboboxProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_3__.invariant)(
      store,
       true && "ComboboxLabel must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const comboboxId = store.useState((state) => {
      var _a2;
      return (_a2 = state.baseElement) == null ? void 0 : _a2.id;
    });
    props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_1__.__spreadValues)({
      htmlFor: comboboxId
    }, props);
    return props;
  }
);
var ComboboxLabel = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createMemoComponent)(
  (props) => {
    const htmlProps = useComboboxLabel(props);
    return (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", htmlProps);
  }
);
if (true) {
  ComboboxLabel.displayName = "ComboboxLabel";
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox-provider.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComboboxProvider: () => (/* binding */ ComboboxProvider)
/* harmony export */ });
/* harmony import */ var _chunks_ZKJ2WLF7_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../__chunks/ZKJ2WLF7.js */ "./node_modules/@ariakit/react-core/esm/__chunks/ZKJ2WLF7.js");
/* harmony import */ var _chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../__chunks/W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";


















// src/combobox/combobox-provider.tsx

function ComboboxProvider(props = {}) {
  const store = (0,_chunks_ZKJ2WLF7_js__WEBPACK_IMPORTED_MODULE_1__.useComboboxStore)(props);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_2__.ComboboxContextProvider, { value: store, children: props.children });
}



/***/ }),

/***/ "./node_modules/@ariakit/react-core/esm/combobox/combobox.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@ariakit/react-core/esm/combobox/combobox.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Combobox: () => (/* binding */ Combobox),
/* harmony export */   useCombobox: () => (/* binding */ useCombobox)
/* harmony export */ });
/* harmony import */ var _chunks_JCH6MLL2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../__chunks/JCH6MLL2.js */ "./node_modules/@ariakit/react-core/esm/__chunks/JCH6MLL2.js");
/* harmony import */ var _chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../__chunks/W76OTZCC.js */ "./node_modules/@ariakit/react-core/esm/__chunks/W76OTZCC.js");
/* harmony import */ var _chunks_7QTPYGNZ_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../__chunks/7QTPYGNZ.js */ "./node_modules/@ariakit/react-core/esm/__chunks/7QTPYGNZ.js");
/* harmony import */ var _chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../__chunks/3ORBWXWF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/3ORBWXWF.js");
/* harmony import */ var _chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../__chunks/6O5OEQGF.js */ "./node_modules/@ariakit/react-core/esm/__chunks/6O5OEQGF.js");
/* harmony import */ var _chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__chunks/4R3V3JGP.js */ "./node_modules/@ariakit/react-core/esm/__chunks/4R3V3JGP.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ariakit/core/utils/dom */ "./node_modules/@ariakit/core/esm/__chunks/DLOEKDPY.js");
/* harmony import */ var _ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ariakit/core/utils/events */ "./node_modules/@ariakit/core/esm/utils/events.js");
/* harmony import */ var _ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ariakit/core/utils/focus */ "./node_modules/@ariakit/core/esm/utils/focus.js");
/* harmony import */ var _ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ariakit/core/utils/misc */ "./node_modules/@ariakit/core/esm/__chunks/Y3OOHFCN.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
"use client";
















// src/combobox/combobox.ts






function isFirstItemAutoSelected(items, activeValue, autoSelect) {
  if (!autoSelect)
    return false;
  const firstItem = items.find((item) => !item.disabled && item.value);
  return (firstItem == null ? void 0 : firstItem.value) === activeValue;
}
function hasCompletionString(value, activeValue) {
  if (!activeValue)
    return false;
  if (value == null)
    return false;
  value = (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.normalizeString)(value);
  return activeValue.length > value.length && activeValue.toLowerCase().indexOf(value.toLowerCase()) === 0;
}
function isInputEvent(event) {
  return event.type === "input";
}
function isAriaAutoCompleteValue(value) {
  return value === "inline" || value === "list" || value === "both" || value === "none";
}
var useCombobox = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createHook)(
  (_a) => {
    var _b = _a, {
      store,
      focusable = true,
      autoSelect: autoSelectProp = false,
      getAutoSelectId,
      showOnChange = true,
      setValueOnChange = true,
      showOnMouseDown = true,
      setValueOnClick = true,
      showOnKeyDown = true,
      moveOnKeyPress = true,
      autoComplete = "list"
    } = _b, props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__objRest)(_b, [
      "store",
      "focusable",
      "autoSelect",
      "getAutoSelectId",
      "showOnChange",
      "setValueOnChange",
      "showOnMouseDown",
      "setValueOnClick",
      "showOnKeyDown",
      "moveOnKeyPress",
      "autoComplete"
    ]);
    const context = (0,_chunks_W76OTZCC_js__WEBPACK_IMPORTED_MODULE_5__.useComboboxProviderContext)();
    store = store || context;
    (0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.invariant)(
      store,
       true && "Combobox must receive a `store` prop or be wrapped in a ComboboxProvider component."
    );
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [valueUpdated, forceValueUpdate] = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useForceUpdate)();
    const canAutoSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const composingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const autoSelect = store.useState(
      (state) => !!autoSelectProp && state.virtualFocus
    );
    const inline = autoComplete === "inline" || autoComplete === "both";
    const [canInline, setCanInline] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(inline);
    (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useUpdateLayoutEffect)(() => {
      if (!inline)
        return;
      setCanInline(true);
    }, [inline]);
    const storeValue = store.useState("value");
    const activeValue = store.useState(
      (state) => inline && canInline ? state.activeValue : void 0
    );
    const items = store.useState("renderedItems");
    const open = store.useState("open");
    const contentElement = store.useState("contentElement");
    const value = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
      if (!inline)
        return storeValue;
      if (!canInline)
        return storeValue;
      const firstItemAutoSelected = isFirstItemAutoSelected(
        items,
        activeValue,
        autoSelect
      );
      if (firstItemAutoSelected) {
        if (hasCompletionString(storeValue, activeValue)) {
          const slice = (activeValue == null ? void 0 : activeValue.slice(storeValue.length)) || "";
          return storeValue + slice;
        }
        return storeValue;
      }
      return activeValue || storeValue;
    }, [inline, canInline, items, activeValue, autoSelect, storeValue]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      const element = ref.current;
      if (!element)
        return;
      const onCompositeItemMove = () => setCanInline(true);
      element.addEventListener("combobox-item-move", onCompositeItemMove);
      return () => {
        element.removeEventListener("combobox-item-move", onCompositeItemMove);
      };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!inline)
        return;
      if (!canInline)
        return;
      if (!activeValue)
        return;
      const firstItemAutoSelected = isFirstItemAutoSelected(
        items,
        activeValue,
        autoSelect
      );
      if (!firstItemAutoSelected)
        return;
      if (!hasCompletionString(storeValue, activeValue))
        return;
      queueMicrotask(() => {
        const element = ref.current;
        if (!element)
          return;
        (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.setSelectionRange)(element, storeValue.length, activeValue.length);
      });
    }, [
      valueUpdated,
      inline,
      canInline,
      activeValue,
      items,
      autoSelect,
      storeValue
    ]);
    const scrollingElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const getAutoSelectIdProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(getAutoSelectId);
    const autoSelectIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!open)
        return;
      if (!contentElement)
        return;
      const scrollingElement = (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getScrollingElement)(contentElement);
      if (!scrollingElement)
        return;
      scrollingElementRef.current = scrollingElement;
      const onWheel = () => {
        canAutoSelectRef.current = false;
      };
      const onScroll = () => {
        if (!store)
          return;
        if (!canAutoSelectRef.current)
          return;
        const { activeId } = store.getState();
        if (activeId === null)
          return;
        if (activeId === autoSelectIdRef.current)
          return;
        canAutoSelectRef.current = false;
      };
      const options = { passive: true, capture: true };
      scrollingElement.addEventListener("wheel", onWheel, options);
      scrollingElement.addEventListener("scroll", onScroll, options);
      return () => {
        scrollingElement.removeEventListener("wheel", onWheel, true);
        scrollingElement.removeEventListener("scroll", onScroll, true);
      };
    }, [open, contentElement, store]);
    (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useSafeLayoutEffect)(() => {
      if (!storeValue)
        return;
      if (composingRef.current)
        return;
      canAutoSelectRef.current = true;
    }, [storeValue]);
    (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useSafeLayoutEffect)(() => {
      if (open)
        return;
      canAutoSelectRef.current = false;
    }, [open]);
    const resetValueOnSelect = store.useState("resetValueOnSelect");
    (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useUpdateEffect)(() => {
      var _a2;
      const canAutoSelect = canAutoSelectRef.current;
      if (!store)
        return;
      if ((!autoSelect || !canAutoSelect) && !resetValueOnSelect)
        return;
      const { baseElement, contentElement: contentElement2, activeId } = store.getState();
      if (baseElement && !(0,_ariakit_core_utils_focus__WEBPACK_IMPORTED_MODULE_8__.hasFocus)(baseElement))
        return;
      if (contentElement2 == null ? void 0 : contentElement2.hasAttribute("data-placing")) {
        const observer = new MutationObserver(forceValueUpdate);
        observer.observe(contentElement2, { attributeFilter: ["data-placing"] });
        return () => observer.disconnect();
      }
      if (autoSelect && canAutoSelect) {
        const userAutoSelectId = getAutoSelectIdProp(items);
        const autoSelectId = userAutoSelectId !== void 0 ? userAutoSelectId : store.first();
        autoSelectIdRef.current = autoSelectId;
        store.move(autoSelectId != null ? autoSelectId : null);
      } else {
        const element = (_a2 = store.item(activeId)) == null ? void 0 : _a2.element;
        if (element && "scrollIntoView" in element) {
          element.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
      return;
    }, [
      store,
      valueUpdated,
      storeValue,
      autoSelect,
      resetValueOnSelect,
      getAutoSelectIdProp,
      items
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (!inline)
        return;
      const combobox = ref.current;
      if (!combobox)
        return;
      const elements = [combobox, contentElement].filter(
        (value2) => !!value2
      );
      const onBlur2 = (event) => {
        if (elements.every((el) => (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__.isFocusEventOutside)(event, el))) {
          store == null ? void 0 : store.setValue(value);
        }
      };
      elements.forEach((el) => el.addEventListener("focusout", onBlur2));
      return () => {
        elements.forEach((el) => el.removeEventListener("focusout", onBlur2));
      };
    }, [inline, contentElement, store, value]);
    const onChangeProp = props.onChange;
    const showOnChangeProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(showOnChange);
    const setValueOnChangeProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(setValueOnChange);
    const onChange = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onChangeProp == null ? void 0 : onChangeProp(event);
      if (event.defaultPrevented)
        return;
      if (!store)
        return;
      const { value: value2, selectionStart, selectionEnd } = event.target;
      const nativeEvent = event.nativeEvent;
      canAutoSelectRef.current = true;
      if (isInputEvent(nativeEvent)) {
        if (nativeEvent.isComposing) {
          canAutoSelectRef.current = false;
          composingRef.current = true;
        }
        if (inline) {
          const textInserted = nativeEvent.inputType === "insertText" || nativeEvent.inputType === "insertCompositionText";
          const caretAtEnd = selectionStart === value2.length;
          setCanInline(textInserted && caretAtEnd);
        }
      }
      if (setValueOnChangeProp(event)) {
        const isSameValue = value2 === store.getState().value;
        (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)(() => store == null ? void 0 : store.setValue(value2));
        (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.setSelectionRange)(event.currentTarget, selectionStart, selectionEnd);
        if (inline && autoSelect && isSameValue) {
          forceValueUpdate();
        }
      }
      if (showOnChangeProp(event)) {
        store.show();
      }
      if (!autoSelect || !canAutoSelectRef.current) {
        store.setActiveId(null);
      }
    });
    const onCompositionEndProp = props.onCompositionEnd;
    const onCompositionEnd = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(
      (event) => {
        canAutoSelectRef.current = true;
        composingRef.current = false;
        onCompositionEndProp == null ? void 0 : onCompositionEndProp(event);
        if (event.defaultPrevented)
          return;
        if (!autoSelect)
          return;
        forceValueUpdate();
      }
    );
    const onMouseDownProp = props.onMouseDown;
    const setValueOnClickProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(setValueOnClick);
    const showOnMouseDownProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(showOnMouseDown);
    const onMouseDown = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      onMouseDownProp == null ? void 0 : onMouseDownProp(event);
      if (event.defaultPrevented)
        return;
      if (event.button)
        return;
      if (event.ctrlKey)
        return;
      if (!store)
        return;
      store.setActiveId(null);
      if (setValueOnClickProp(event)) {
        store.setValue(value);
      }
      if (showOnMouseDownProp(event)) {
        (0,_ariakit_core_utils_events__WEBPACK_IMPORTED_MODULE_9__.queueBeforeEvent)(event.currentTarget, "mouseup", store.show);
      }
    });
    const onKeyDownProp = props.onKeyDown;
    const showOnKeyDownProp = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useBooleanEvent)(showOnKeyDown);
    const onKeyDown = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)(
      (event) => {
        onKeyDownProp == null ? void 0 : onKeyDownProp(event);
        if (!event.repeat) {
          canAutoSelectRef.current = false;
        }
        if (event.defaultPrevented)
          return;
        if (event.ctrlKey)
          return;
        if (event.altKey)
          return;
        if (event.shiftKey)
          return;
        if (event.metaKey)
          return;
        if (!store)
          return;
        const { open: open2, activeId } = store.getState();
        if (open2)
          return;
        if (activeId !== null)
          return;
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          if (showOnKeyDownProp(event)) {
            event.preventDefault();
            store.show();
          }
        }
      }
    );
    const onBlurProp = props.onBlur;
    const onBlur = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useEvent)((event) => {
      canAutoSelectRef.current = false;
      onBlurProp == null ? void 0 : onBlurProp(event);
      if (event.defaultPrevented)
        return;
    });
    const id = (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useId)(props.id);
    const ariaAutoComplete = isAriaAutoCompleteValue(autoComplete) ? autoComplete : void 0;
    const isActiveItem = store.useState((state) => state.activeId === null);
    props = (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
      id,
      role: "combobox",
      "aria-autocomplete": ariaAutoComplete,
      "aria-haspopup": (0,_ariakit_core_utils_dom__WEBPACK_IMPORTED_MODULE_7__.getPopupRole)(contentElement, "listbox"),
      "aria-expanded": open,
      "aria-controls": contentElement == null ? void 0 : contentElement.id,
      "data-active-item": isActiveItem || void 0,
      value
    }, props), {
      ref: (0,_chunks_6O5OEQGF_js__WEBPACK_IMPORTED_MODULE_6__.useMergeRefs)(ref, props.ref),
      onChange,
      onCompositionEnd,
      onMouseDown,
      onKeyDown,
      onBlur
    });
    props = (0,_chunks_7QTPYGNZ_js__WEBPACK_IMPORTED_MODULE_10__.useComposite)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadProps)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({
      store,
      focusable
    }, props), {
      // Enable inline autocomplete when the user moves from the combobox input
      // to an item.
      moveOnKeyPress: (event) => {
        if ((0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_2__.isFalsyBooleanCallback)(moveOnKeyPress, event))
          return false;
        if (inline)
          setCanInline(true);
        return true;
      }
    }));
    props = (0,_chunks_JCH6MLL2_js__WEBPACK_IMPORTED_MODULE_11__.usePopoverAnchor)((0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({ store }, props));
    return (0,_chunks_4R3V3JGP_js__WEBPACK_IMPORTED_MODULE_4__.__spreadValues)({ autoComplete: "off" }, props);
  }
);
var Combobox = (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createComponent)((props) => {
  const htmlProps = useCombobox(props);
  return (0,_chunks_3ORBWXWF_js__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", htmlProps);
});
if (true) {
  Combobox.displayName = "Combobox";
}



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
/******/ 				var [chunkIds, fn, priority] = deferred[i];
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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
/******/ 			var [chunkIds, moreModules, runtime] = data;
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
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunksearch_console"] = globalThis["webpackChunksearch_console"] || [];
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