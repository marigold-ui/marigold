"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["_app-client_content_components_form_number-field_number-field-format_demo_tsx"],{

/***/ "(app-client)/./content/components/form/number-field/number-field-format.demo.tsx":
/*!***************************************************************************!*\
  !*** ./content/components/form/number-field/number-field-format.demo.tsx ***!
  \***************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/../node_modules/.pnpm/next@13.4.8_@babel+core@7.21.8_@opentelemetry+api@1.4.1_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Stack/Stack.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/NumberField/NumberField.tsx\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Stack, {\n        space: 4,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.NumberField, {\n                label: \"Amount\",\n                defaultValue: 19.99,\n                formatOptions: {\n                    style: \"currency\",\n                    currency: \"USD\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/form/number-field/number-field-format.demo.tsx\",\n                lineNumber: 5,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.NumberField, {\n                label: \"Decimals\",\n                formatOptions: {\n                    signDisplay: \"exceptZero\",\n                    minimumFractionDigits: 1,\n                    maximumFractionDigits: 2\n                },\n                defaultValue: 0\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/form/number-field/number-field-format.demo.tsx\",\n                lineNumber: 13,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.NumberField, {\n                label: \"Length\",\n                defaultValue: 150,\n                minValue: 0,\n                formatOptions: {\n                    style: \"unit\",\n                    unit: \"centimeter\",\n                    unitDisplay: \"short\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/form/number-field/number-field-format.demo.tsx\",\n                lineNumber: 22,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.NumberField, {\n                label: \"Percentage\",\n                defaultValue: 0.42,\n                formatOptions: {\n                    style: \"percent\"\n                }\n            }, void 0, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/form/number-field/number-field-format.demo.tsx\",\n                lineNumber: 32,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/form/number-field/number-field-format.demo.tsx\",\n        lineNumber: 4,\n        columnNumber: 3\n    }, undefined));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vY29udGVudC9jb21wb25lbnRzL2Zvcm0vbnVtYmVyLWZpZWxkL251bWJlci1maWVsZC1mb3JtYXQuZGVtby50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEQ7QUFFMUQsK0RBQWUsa0JBQ2IsOERBQUNDLHVEQUFLQTtRQUFDQyxPQUFPOzswQkFDWiw4REFBQ0YsNkRBQVdBO2dCQUNWRyxPQUFNO2dCQUNOQyxjQUFjO2dCQUNkQyxlQUFlO29CQUNiQyxPQUFPO29CQUNQQyxVQUFVO2dCQUNaOzs7Ozs7MEJBRUYsOERBQUNQLDZEQUFXQTtnQkFDVkcsT0FBTTtnQkFDTkUsZUFBZTtvQkFDYkcsYUFBYTtvQkFDYkMsdUJBQXVCO29CQUN2QkMsdUJBQXVCO2dCQUN6QjtnQkFDQU4sY0FBYzs7Ozs7OzBCQUVoQiw4REFBQ0osNkRBQVdBO2dCQUNWRyxPQUFNO2dCQUNOQyxjQUFjO2dCQUNkTyxVQUFVO2dCQUNWTixlQUFlO29CQUNiQyxPQUFPO29CQUNQTSxNQUFNO29CQUNOQyxhQUFhO2dCQUNmOzs7Ozs7MEJBRUYsOERBQUNiLDZEQUFXQTtnQkFDVkcsT0FBTTtnQkFDTkMsY0FBYztnQkFDZEMsZUFBZTtvQkFDYkMsT0FBTztnQkFDVDs7Ozs7Ozs7Ozs7aUJBR04sRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb250ZW50L2NvbXBvbmVudHMvZm9ybS9udW1iZXItZmllbGQvbnVtYmVyLWZpZWxkLWZvcm1hdC5kZW1vLnRzeD80YWFjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE51bWJlckZpZWxkLCBTdGFjayB9IGZyb20gJ0BtYXJpZ29sZC9jb21wb25lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxuICA8U3RhY2sgc3BhY2U9ezR9PlxuICAgIDxOdW1iZXJGaWVsZFxuICAgICAgbGFiZWw9XCJBbW91bnRcIlxuICAgICAgZGVmYXVsdFZhbHVlPXsxOS45OX1cbiAgICAgIGZvcm1hdE9wdGlvbnM9e3tcbiAgICAgICAgc3R5bGU6ICdjdXJyZW5jeScsXG4gICAgICAgIGN1cnJlbmN5OiAnVVNEJyxcbiAgICAgIH19XG4gICAgLz5cbiAgICA8TnVtYmVyRmllbGRcbiAgICAgIGxhYmVsPVwiRGVjaW1hbHNcIlxuICAgICAgZm9ybWF0T3B0aW9ucz17e1xuICAgICAgICBzaWduRGlzcGxheTogJ2V4Y2VwdFplcm8nLFxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDEsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIH19XG4gICAgICBkZWZhdWx0VmFsdWU9ezB9XG4gICAgLz5cbiAgICA8TnVtYmVyRmllbGRcbiAgICAgIGxhYmVsPVwiTGVuZ3RoXCJcbiAgICAgIGRlZmF1bHRWYWx1ZT17MTUwfVxuICAgICAgbWluVmFsdWU9ezB9XG4gICAgICBmb3JtYXRPcHRpb25zPXt7XG4gICAgICAgIHN0eWxlOiAndW5pdCcsXG4gICAgICAgIHVuaXQ6ICdjZW50aW1ldGVyJyxcbiAgICAgICAgdW5pdERpc3BsYXk6ICdzaG9ydCcsXG4gICAgICB9fVxuICAgIC8+XG4gICAgPE51bWJlckZpZWxkXG4gICAgICBsYWJlbD1cIlBlcmNlbnRhZ2VcIlxuICAgICAgZGVmYXVsdFZhbHVlPXswLjQyfVxuICAgICAgZm9ybWF0T3B0aW9ucz17e1xuICAgICAgICBzdHlsZTogJ3BlcmNlbnQnLFxuICAgICAgfX1cbiAgICAvPlxuICA8L1N0YWNrPlxuKTtcbiJdLCJuYW1lcyI6WyJOdW1iZXJGaWVsZCIsIlN0YWNrIiwic3BhY2UiLCJsYWJlbCIsImRlZmF1bHRWYWx1ZSIsImZvcm1hdE9wdGlvbnMiLCJzdHlsZSIsImN1cnJlbmN5Iiwic2lnbkRpc3BsYXkiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJtYXhpbXVtRnJhY3Rpb25EaWdpdHMiLCJtaW5WYWx1ZSIsInVuaXQiLCJ1bml0RGlzcGxheSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-client)/./content/components/form/number-field/number-field-format.demo.tsx\n"));

/***/ })

}]);