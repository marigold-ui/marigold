"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["_app-client_content_components_overlay_dialog_dialog-form_demo_tsx"],{

/***/ "(app-client)/./content/components/overlay/dialog/dialog-form.demo.tsx":
/*!****************************************************************!*\
  !*** ./content/components/overlay/dialog/dialog-form.demo.tsx ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/../node_modules/.pnpm/next@13.4.8_@babel+core@7.21.8_@opentelemetry+api@1.4.1_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Dialog/Dialog.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Button/Button.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Headline/Headline.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Stack/Stack.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/TextField/TextField.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Inline/Inline.tsx\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Dialog.Trigger, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                variant: \"primary\",\n                children: \"Login\"\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                lineNumber: 12,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Dialog, {\n                children: (param)=>/*#__PURE__*/ {\n                    let { close } = param;\n                    return (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_3__.Headline, {\n                                level: \"2\",\n                                children: \"Please log into account\"\n                            }, void 0, false, {\n                                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                lineNumber: 16,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_4__.Stack, {\n                                space: 2,\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_5__.TextField, {\n                                        label: \"Username\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                        lineNumber: 18,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_5__.TextField, {\n                                        label: \"Password\",\n                                        type: \"password\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                        lineNumber: 19,\n                                        columnNumber: 13\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_6__.Inline, {\n                                        space: 5,\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                                                variant: \"ghost\",\n                                                onPress: close,\n                                                children: \"Cancel\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                                lineNumber: 21,\n                                                columnNumber: 15\n                                            }, undefined),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                                                variant: \"primary\",\n                                                children: \"Login\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                                lineNumber: 24,\n                                                columnNumber: 15\n                                            }, undefined)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                        lineNumber: 20,\n                                        columnNumber: 13\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                                lineNumber: 17,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true);\n                }\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n                lineNumber: 13,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/overlay/dialog/dialog-form.demo.tsx\",\n        lineNumber: 11,\n        columnNumber: 3\n    }, undefined));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vY29udGVudC9jb21wb25lbnRzL292ZXJsYXkvZGlhbG9nL2RpYWxvZy1mb3JtLmRlbW8udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU84QjtBQUU5QiwrREFBZSxrQkFDYiw4REFBQ0Msd0RBQU1BLENBQUNLLE9BQU87OzBCQUNiLDhEQUFDTix3REFBTUE7Z0JBQUNPLFNBQVE7MEJBQVU7Ozs7OzswQkFDMUIsOERBQUNOLHdEQUFNQTswQkFDSjt3QkFBQyxFQUFFTyxLQUFLLEVBQUU7MkJBQ1Q7OzBDQUNFLDhEQUFDTiwwREFBUUE7Z0NBQUNPLE9BQU07MENBQUk7Ozs7OzswQ0FDcEIsOERBQUNMLHVEQUFLQTtnQ0FBQ00sT0FBTzs7a0RBQ1osOERBQUNMLDJEQUFTQTt3Q0FBQ00sT0FBTTs7Ozs7O2tEQUNqQiw4REFBQ04sMkRBQVNBO3dDQUFDTSxPQUFNO3dDQUFXQyxNQUFLOzs7Ozs7a0RBQ2pDLDhEQUFDVCx3REFBTUE7d0NBQUNPLE9BQU87OzBEQUNiLDhEQUFDVix3REFBTUE7Z0RBQUNPLFNBQVE7Z0RBQVFNLFNBQVNMOzBEQUFPOzs7Ozs7MERBR3hDLDhEQUFDUix3REFBTUE7Z0RBQUNPLFNBQVE7MERBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUc5Qjs7Ozs7Ozs7Ozs7aUJBSVYsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb250ZW50L2NvbXBvbmVudHMvb3ZlcmxheS9kaWFsb2cvZGlhbG9nLWZvcm0uZGVtby50c3g/OTBjYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCdXR0b24sXG4gIERpYWxvZyxcbiAgSGVhZGxpbmUsXG4gIElubGluZSxcbiAgU3RhY2ssXG4gIFRleHRGaWVsZCxcbn0gZnJvbSAnQG1hcmlnb2xkL2NvbXBvbmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoXG4gIDxEaWFsb2cuVHJpZ2dlcj5cbiAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCI+TG9naW48L0J1dHRvbj5cbiAgICA8RGlhbG9nPlxuICAgICAgeyh7IGNsb3NlIH0pID0+IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8SGVhZGxpbmUgbGV2ZWw9XCIyXCI+UGxlYXNlIGxvZyBpbnRvIGFjY291bnQ8L0hlYWRsaW5lPlxuICAgICAgICAgIDxTdGFjayBzcGFjZT17Mn0+XG4gICAgICAgICAgICA8VGV4dEZpZWxkIGxhYmVsPVwiVXNlcm5hbWVcIiAvPlxuICAgICAgICAgICAgPFRleHRGaWVsZCBsYWJlbD1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgLz5cbiAgICAgICAgICAgIDxJbmxpbmUgc3BhY2U9ezV9PlxuICAgICAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJnaG9zdFwiIG9uUHJlc3M9e2Nsb3NlfT5cbiAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cInByaW1hcnlcIj5Mb2dpbjwvQnV0dG9uPlxuICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvRGlhbG9nPlxuICA8L0RpYWxvZy5UcmlnZ2VyPlxuKTtcbiJdLCJuYW1lcyI6WyJCdXR0b24iLCJEaWFsb2ciLCJIZWFkbGluZSIsIklubGluZSIsIlN0YWNrIiwiVGV4dEZpZWxkIiwiVHJpZ2dlciIsInZhcmlhbnQiLCJjbG9zZSIsImxldmVsIiwic3BhY2UiLCJsYWJlbCIsInR5cGUiLCJvblByZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./content/components/overlay/dialog/dialog-form.demo.tsx\n"));

/***/ })

}]);