"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["_app-client_content_components_content_divider_divider-section_demo_tsx"],{

/***/ "(app-client)/./content/components/content/divider/divider-section.demo.tsx":
/*!*********************************************************************!*\
  !*** ./content/components/content/divider/divider-section.demo.tsx ***!
  \*********************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/../node_modules/.pnpm/next@13.4.8_@babel+core@7.21.8_@opentelemetry+api@1.4.1_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Menu/Menu.tsx\");\n/* harmony import */ var _marigold_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @marigold/components */ \"(app-client)/../packages/components/src/Divider/Divider.tsx\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Menu, {\n        \"aria-label\": \"Only a Menu\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item, {\n                children: [\n                    \"Item 1\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.Divider, {\n                        variant: \"section\"\n                    }, void 0, false, {\n                        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n                        lineNumber: 7,\n                        columnNumber: 7\n                    }, undefined)\n                ]\n            }, 1, true, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n                lineNumber: 5,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item, {\n                children: [\n                    \"Item 2\",\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_2__.Divider, {\n                        variant: \"section\"\n                    }, void 0, false, {\n                        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 7\n                    }, undefined)\n                ]\n            }, 2, true, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n                lineNumber: 9,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_marigold_components__WEBPACK_IMPORTED_MODULE_1__.Menu.Item, {\n                children: \"Item 3\"\n            }, 3, false, {\n                fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n                lineNumber: 13,\n                columnNumber: 5\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/sebastian/Projects/marigold/docs/content/components/content/divider/divider-section.demo.tsx\",\n        lineNumber: 4,\n        columnNumber: 3\n    }, undefined));\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vY29udGVudC9jb21wb25lbnRzL2NvbnRlbnQvZGl2aWRlci9kaXZpZGVyLXNlY3Rpb24uZGVtby50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUQ7QUFFckQsK0RBQWUsa0JBQ2IsOERBQUNDLHNEQUFJQTtRQUFDQyxjQUFXOzswQkFDZiw4REFBQ0Qsc0RBQUlBLENBQUNFLElBQUk7O29CQUFTO2tDQUVqQiw4REFBQ0gseURBQU9BO3dCQUFDSSxTQUFROzs7Ozs7O2VBRkg7Ozs7OzBCQUloQiw4REFBQ0gsc0RBQUlBLENBQUNFLElBQUk7O29CQUFTO2tDQUVqQiw4REFBQ0gseURBQU9BO3dCQUFDSSxTQUFROzs7Ozs7O2VBRkg7Ozs7OzBCQUloQiw4REFBQ0gsc0RBQUlBLENBQUNFLElBQUk7MEJBQVM7ZUFBSDs7Ozs7Ozs7OztpQkFFcEIsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb250ZW50L2NvbXBvbmVudHMvY29udGVudC9kaXZpZGVyL2RpdmlkZXItc2VjdGlvbi5kZW1vLnRzeD9mMDZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpdmlkZXIsIE1lbnUgfSBmcm9tICdAbWFyaWdvbGQvY29tcG9uZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPE1lbnUgYXJpYS1sYWJlbD1cIk9ubHkgYSBNZW51XCI+XG4gICAgPE1lbnUuSXRlbSBrZXk9ezF9PlxuICAgICAgSXRlbSAxXG4gICAgICA8RGl2aWRlciB2YXJpYW50PVwic2VjdGlvblwiIC8+XG4gICAgPC9NZW51Lkl0ZW0+XG4gICAgPE1lbnUuSXRlbSBrZXk9ezJ9PlxuICAgICAgSXRlbSAyXG4gICAgICA8RGl2aWRlciB2YXJpYW50PVwic2VjdGlvblwiIC8+XG4gICAgPC9NZW51Lkl0ZW0+XG4gICAgPE1lbnUuSXRlbSBrZXk9ezN9Pkl0ZW0gMzwvTWVudS5JdGVtPlxuICA8L01lbnU+XG4pO1xuIl0sIm5hbWVzIjpbIkRpdmlkZXIiLCJNZW51IiwiYXJpYS1sYWJlbCIsIkl0ZW0iLCJ2YXJpYW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-client)/./content/components/content/divider/divider-section.demo.tsx\n"));

/***/ })

}]);