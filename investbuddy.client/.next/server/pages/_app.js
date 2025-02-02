/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/ScrollTopButton.js":
/*!***************************************!*\
  !*** ./components/ScrollTopButton.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-scroll */ \"react-scroll\");\n/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst ScrollTopButton = ({ showOffset , duration , easing , tooltip  })=>{\n    const [show, setShow] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleShow = (e)=>{\n            if (e.currentTarget.pageYOffset > showOffset) {\n                setShow(true);\n            } else {\n                setShow(false);\n            }\n        };\n        window.addEventListener(\"scroll\", handleShow);\n        return ()=>window.removeEventListener(\"scroll\", handleShow);\n    }, [\n        showOffset\n    ]);\n    const scrollToTop = ()=>{\n        react_scroll__WEBPACK_IMPORTED_MODULE_2__.animateScroll.scrollToTop({\n            duration: duration,\n            smooth: easing\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        type: \"btton\",\n        className: `btn-scroll-top${show ? \" show\" : \"\"}`,\n        onClick: scrollToTop,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                className: \"btn-scroll-top-tooltip text-muted fs-sm me-2\",\n                children: tooltip\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\components\\\\ScrollTopButton.js\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"i\", {\n                className: \"btn-scroll-top-icon fi-chevron-up\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\components\\\\ScrollTopButton.js\",\n                lineNumber: 31,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\components\\\\ScrollTopButton.js\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollTopButton);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1Njcm9sbFRvcEJ1dHRvbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBMkM7QUFDVztBQUV0RCxNQUFNSSxrQkFBa0IsQ0FBQyxFQUFFQyxXQUFVLEVBQUVDLFNBQVEsRUFBRUMsT0FBTSxFQUFFQyxRQUFPLEVBQUUsR0FBSztJQUVyRSxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1YsK0NBQVFBLENBQUMsS0FBSztJQUV0Q0MsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLE1BQU1VLGFBQWEsQ0FBQ0MsSUFBTTtZQUN4QixJQUFJQSxFQUFFQyxhQUFhLENBQUNDLFdBQVcsR0FBR1QsWUFBWTtnQkFDNUNLLFFBQVEsSUFBSTtZQUNkLE9BQU87Z0JBQ0xBLFFBQVEsS0FBSztZQUNmLENBQUM7UUFDSDtRQUVBSyxPQUFPQyxnQkFBZ0IsQ0FBQyxVQUFVTDtRQUNsQyxPQUFPLElBQU1JLE9BQU9FLG1CQUFtQixDQUFDLFVBQVVOO0lBQ3BELEdBQUc7UUFBQ047S0FBVztJQUVmLE1BQU1hLGNBQWMsSUFBTTtRQUN4QmYsbUVBQWtCLENBQUM7WUFDakJHLFVBQVVBO1lBQ1ZhLFFBQVFaO1FBQ1Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDYTtRQUFPQyxNQUFLO1FBQVFDLFdBQVcsQ0FBQyxjQUFjLEVBQUViLE9BQU8sVUFBVSxFQUFFLENBQUMsQ0FBQztRQUFFYyxTQUFTTDs7MEJBQy9FLDhEQUFDTTtnQkFBS0YsV0FBVTswQkFBZ0RkOzs7Ozs7MEJBQ2hFLDhEQUFDaUI7Z0JBQUVILFdBQVU7Ozs7Ozs7Ozs7OztBQUduQjtBQUVBLGlFQUFlbEIsZUFBZUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYXhpc3R1ZHhicmljby5jbGllbnQvLi9jb21wb25lbnRzL1Njcm9sbFRvcEJ1dHRvbi5qcz9jNmY1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGFuaW1hdGVTY3JvbGwgYXMgc2Nyb2xsIH0gZnJvbSAncmVhY3Qtc2Nyb2xsJ1xuXG5jb25zdCBTY3JvbGxUb3BCdXR0b24gPSAoeyBzaG93T2Zmc2V0LCBkdXJhdGlvbiwgZWFzaW5nLCB0b29sdGlwIH0pID0+IHtcblxuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVNob3cgPSAoZSkgPT4ge1xuICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5wYWdlWU9mZnNldCA+IHNob3dPZmZzZXQpIHtcbiAgICAgICAgc2V0U2hvdyh0cnVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2hvdyhmYWxzZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2hvdylcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZVNob3cpXG4gIH0sIFtzaG93T2Zmc2V0XSlcblxuICBjb25zdCBzY3JvbGxUb1RvcCA9ICgpID0+IHtcbiAgICBzY3JvbGwuc2Nyb2xsVG9Ub3Aoe1xuICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgc21vb3RoOiBlYXNpbmdcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIHR5cGU9J2J0dG9uJyBjbGFzc05hbWU9e2BidG4tc2Nyb2xsLXRvcCR7c2hvdyA/ICcgc2hvdycgOiAnJ31gfSBvbkNsaWNrPXtzY3JvbGxUb1RvcH0+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J2J0bi1zY3JvbGwtdG9wLXRvb2x0aXAgdGV4dC1tdXRlZCBmcy1zbSBtZS0yJz57dG9vbHRpcH08L3NwYW4+XG4gICAgICA8aSBjbGFzc05hbWU9J2J0bi1zY3JvbGwtdG9wLWljb24gZmktY2hldnJvbi11cCc+PC9pPlxuICAgIDwvYnV0dG9uPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbFRvcEJ1dHRvblxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiYW5pbWF0ZVNjcm9sbCIsInNjcm9sbCIsIlNjcm9sbFRvcEJ1dHRvbiIsInNob3dPZmZzZXQiLCJkdXJhdGlvbiIsImVhc2luZyIsInRvb2x0aXAiLCJzaG93Iiwic2V0U2hvdyIsImhhbmRsZVNob3ciLCJlIiwiY3VycmVudFRhcmdldCIsInBhZ2VZT2Zmc2V0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzY3JvbGxUb1RvcCIsInNtb290aCIsImJ1dHRvbiIsInR5cGUiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwic3BhbiIsImkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/ScrollTopButton.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap_SSRProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap/SSRProvider */ \"react-bootstrap/SSRProvider\");\n/* harmony import */ var react_bootstrap_SSRProvider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_SSRProvider__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nprogress */ \"nprogress\");\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_ScrollTopButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ScrollTopButton */ \"./components/ScrollTopButton.js\");\n/* harmony import */ var _scss_theme_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../scss/theme.scss */ \"./scss/theme.scss\");\n/* harmony import */ var _scss_theme_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_scss_theme_scss__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\nconst Finder = ({ Component , pageProps  })=>{\n    // Bind NProgress to Next Router events (Page loading animation)\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on(\"routeChangeStart\", ()=>nprogress__WEBPACK_IMPORTED_MODULE_4___default().start());\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on(\"routeChangeComplete\", ()=>nprogress__WEBPACK_IMPORTED_MODULE_4___default().done());\n    next_router__WEBPACK_IMPORTED_MODULE_2___default().events.on(\"routeChangeError\", ()=>nprogress__WEBPACK_IMPORTED_MODULE_4___default().done());\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_bootstrap_SSRProvider__WEBPACK_IMPORTED_MODULE_1___default()), {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: \"Finder | Directory & Listings React / Next.js Bootstrap Template\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: \"Finder - Directory & Listings React / Next.js Bootstrap Template\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 20,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"keywords\",\n                        content: \"react, nextjs, bootstrap, business, directory, listings, e-commerce, car dealer, city guide, real estate, job board, user account, multipurpose, ui kit, css3, javascript, gallery, slider, touch\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 21,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"author\",\n                        content: \"Createx Studio\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 22,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"apple-touch-icon\",\n                        sizes: \"180x180\",\n                        href: \"/favicon/apple-touch-icon.png\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 23,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        type: \"image/png\",\n                        sizes: \"32x32\",\n                        href: \"/favicon/favicon-32x32.png\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        type: \"image/png\",\n                        sizes: \"16x16\",\n                        href: \"/favicon/favicon-16x16.png\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"manifest\",\n                        href: \"/favicon/site.webmanifest\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 26,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"mask-icon\",\n                        color: \"#5bbad5\",\n                        href: \"/favicon/safari-pinned-tab.svg\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 27,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"msapplication-TileColor\",\n                        content: \"#766df4\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 28,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"theme-color\",\n                        content: \"#ffffff\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                        lineNumber: 29,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ScrollTopButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                showOffset: 600,\n                duration: 800,\n                easing: \"easeInOutQuart\",\n                tooltip: \"Top\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\amahaman\\\\source\\\\repos\\\\investbuddy\\\\investbuddy.client\\\\pages\\\\_app.js\",\n        lineNumber: 16,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Finder);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBcUQ7QUFDckI7QUFDSjtBQUNLO0FBQzBCO0FBQ2hDO0FBRTNCLE1BQU1LLFNBQVMsQ0FBQyxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxHQUFLO0lBRTNDLGdFQUFnRTtJQUNoRU4sNERBQWdCLENBQUMsb0JBQW9CLElBQU1FLHNEQUFlO0lBQzFERiw0REFBZ0IsQ0FBQyx1QkFBdUIsSUFBTUUscURBQWM7SUFDNURGLDREQUFnQixDQUFDLG9CQUFvQixJQUFNRSxxREFBYztJQUV6RCxxQkFDRSw4REFBQ0gsb0VBQVdBOzswQkFDViw4REFBQ0Usa0RBQUlBOztrQ0FDSCw4REFBQ1U7d0JBQUtDLE1BQUs7d0JBQVdDLFNBQVE7Ozs7OztrQ0FDOUIsOERBQUNDO2tDQUFNOzs7Ozs7a0NBQ1AsOERBQUNIO3dCQUFLQyxNQUFLO3dCQUFjQyxTQUFROzs7Ozs7a0NBQ2pDLDhEQUFDRjt3QkFBS0MsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0Y7d0JBQUtDLE1BQUs7d0JBQVNDLFNBQVE7Ozs7OztrQ0FDNUIsOERBQUNFO3dCQUFLQyxLQUFJO3dCQUFtQkMsT0FBTTt3QkFBVUMsTUFBSzs7Ozs7O2tDQUNsRCw4REFBQ0g7d0JBQUtDLEtBQUk7d0JBQU9HLE1BQUs7d0JBQVlGLE9BQU07d0JBQVFDLE1BQUs7Ozs7OztrQ0FDckQsOERBQUNIO3dCQUFLQyxLQUFJO3dCQUFPRyxNQUFLO3dCQUFZRixPQUFNO3dCQUFRQyxNQUFLOzs7Ozs7a0NBQ3JELDhEQUFDSDt3QkFBS0MsS0FBSTt3QkFBV0UsTUFBSzs7Ozs7O2tDQUMxQiw4REFBQ0g7d0JBQUtDLEtBQUk7d0JBQVlJLE9BQU07d0JBQVVGLE1BQUs7Ozs7OztrQ0FDM0MsOERBQUNQO3dCQUFLQyxNQUFLO3dCQUEwQkMsU0FBUTs7Ozs7O2tDQUM3Qyw4REFBQ0Y7d0JBQUtDLE1BQUs7d0JBQWNDLFNBQVE7Ozs7Ozs7Ozs7OzswQkFHbkMsOERBQUNSO2dCQUFXLEdBQUdDLFNBQVM7Ozs7OzswQkFFeEIsOERBQUNILG1FQUFlQTtnQkFDZGtCLFlBQVk7Z0JBQ1pDLFVBQVU7Z0JBQ1ZDLFFBQU87Z0JBQ1BDLFNBQVE7Ozs7Ozs7Ozs7OztBQUloQjtBQUVBLGlFQUFlcEIsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ByYXhpc3R1ZHhicmljby5jbGllbnQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNTUlByb3ZpZGVyIGZyb20gJ3JlYWN0LWJvb3RzdHJhcC9TU1JQcm92aWRlcidcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgTlByb2dyZXNzIGZyb20gJ25wcm9ncmVzcydcbmltcG9ydCBTY3JvbGxUb3BCdXR0b24gZnJvbSAnLi4vY29tcG9uZW50cy9TY3JvbGxUb3BCdXR0b24nXG5pbXBvcnQgJy4uL3Njc3MvdGhlbWUuc2NzcydcblxuY29uc3QgRmluZGVyID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkgPT4ge1xuXG4gIC8vIEJpbmQgTlByb2dyZXNzIHRvIE5leHQgUm91dGVyIGV2ZW50cyAoUGFnZSBsb2FkaW5nIGFuaW1hdGlvbilcbiAgUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VTdGFydCcsICgpID0+IE5Qcm9ncmVzcy5zdGFydCgpKVxuICBSb3V0ZXIuZXZlbnRzLm9uKCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgKCkgPT4gTlByb2dyZXNzLmRvbmUoKSlcbiAgUm91dGVyLmV2ZW50cy5vbigncm91dGVDaGFuZ2VFcnJvcicsICgpID0+IE5Qcm9ncmVzcy5kb25lKCkpXG5cbiAgcmV0dXJuIChcbiAgICA8U1NSUHJvdmlkZXI+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAgPHRpdGxlPkZpbmRlciB8IERpcmVjdG9yeSAmYW1wOyBMaXN0aW5ncyBSZWFjdCAvIE5leHQuanMgQm9vdHN0cmFwIFRlbXBsYXRlPC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT0nZGVzY3JpcHRpb24nIGNvbnRlbnQ9J0ZpbmRlciAtIERpcmVjdG9yeSAmYW1wOyBMaXN0aW5ncyBSZWFjdCAvIE5leHQuanMgQm9vdHN0cmFwIFRlbXBsYXRlJyAvPlxuICAgICAgICA8bWV0YSBuYW1lPSdrZXl3b3JkcycgY29udGVudD0ncmVhY3QsIG5leHRqcywgYm9vdHN0cmFwLCBidXNpbmVzcywgZGlyZWN0b3J5LCBsaXN0aW5ncywgZS1jb21tZXJjZSwgY2FyIGRlYWxlciwgY2l0eSBndWlkZSwgcmVhbCBlc3RhdGUsIGpvYiBib2FyZCwgdXNlciBhY2NvdW50LCBtdWx0aXB1cnBvc2UsIHVpIGtpdCwgY3NzMywgamF2YXNjcmlwdCwgZ2FsbGVyeSwgc2xpZGVyLCB0b3VjaCcgLz5cbiAgICAgICAgPG1ldGEgbmFtZT0nYXV0aG9yJyBjb250ZW50PSdDcmVhdGV4IFN0dWRpbycgLz5cbiAgICAgICAgPGxpbmsgcmVsPSdhcHBsZS10b3VjaC1pY29uJyBzaXplcz0nMTgweDE4MCcgaHJlZj0nL2Zhdmljb24vYXBwbGUtdG91Y2gtaWNvbi5wbmcnIC8+XG4gICAgICAgIDxsaW5rIHJlbD0naWNvbicgdHlwZT0naW1hZ2UvcG5nJyBzaXplcz0nMzJ4MzInIGhyZWY9Jy9mYXZpY29uL2Zhdmljb24tMzJ4MzIucG5nJyAvPlxuICAgICAgICA8bGluayByZWw9J2ljb24nIHR5cGU9J2ltYWdlL3BuZycgc2l6ZXM9JzE2eDE2JyBocmVmPScvZmF2aWNvbi9mYXZpY29uLTE2eDE2LnBuZycgLz5cbiAgICAgICAgPGxpbmsgcmVsPSdtYW5pZmVzdCcgaHJlZj0nL2Zhdmljb24vc2l0ZS53ZWJtYW5pZmVzdCcgLz5cbiAgICAgICAgPGxpbmsgcmVsPSdtYXNrLWljb24nIGNvbG9yPScjNWJiYWQ1JyBocmVmPScvZmF2aWNvbi9zYWZhcmktcGlubmVkLXRhYi5zdmcnIC8+XG4gICAgICAgIDxtZXRhIG5hbWU9J21zYXBwbGljYXRpb24tVGlsZUNvbG9yJyBjb250ZW50PScjNzY2ZGY0JyAvPlxuICAgICAgICA8bWV0YSBuYW1lPSd0aGVtZS1jb2xvcicgY29udGVudD0nI2ZmZmZmZicgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIFxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgXG4gICAgICA8U2Nyb2xsVG9wQnV0dG9uXG4gICAgICAgIHNob3dPZmZzZXQ9ezYwMH1cbiAgICAgICAgZHVyYXRpb249ezgwMH1cbiAgICAgICAgZWFzaW5nPSdlYXNlSW5PdXRRdWFydCdcbiAgICAgICAgdG9vbHRpcD0nVG9wJ1xuICAgICAgLz5cbiAgICA8L1NTUlByb3ZpZGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbmRlclxuIl0sIm5hbWVzIjpbIlNTUlByb3ZpZGVyIiwiUm91dGVyIiwiSGVhZCIsIk5Qcm9ncmVzcyIsIlNjcm9sbFRvcEJ1dHRvbiIsIkZpbmRlciIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImV2ZW50cyIsIm9uIiwic3RhcnQiLCJkb25lIiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwidGl0bGUiLCJsaW5rIiwicmVsIiwic2l6ZXMiLCJocmVmIiwidHlwZSIsImNvbG9yIiwic2hvd09mZnNldCIsImR1cmF0aW9uIiwiZWFzaW5nIiwidG9vbHRpcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./scss/theme.scss":
/*!*************************!*\
  !*** ./scss/theme.scss ***!
  \*************************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "nprogress":
/*!****************************!*\
  !*** external "nprogress" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nprogress");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-bootstrap/SSRProvider":
/*!**********************************************!*\
  !*** external "react-bootstrap/SSRProvider" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap/SSRProvider");

/***/ }),

/***/ "react-scroll":
/*!*******************************!*\
  !*** external "react-scroll" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-scroll");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();