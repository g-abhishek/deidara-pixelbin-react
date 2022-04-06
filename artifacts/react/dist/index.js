!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("async-retry")},function(e,t){e.exports=require("node-common")},function(e,t,r){"use strict";r.r(t),r.d(t,"PixelBinImage",(function(){return k}));var n=r(0),o=r.n(n),u=r(1),i=r.n(u),c=r(2),a=r.n(c),f=r(3);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){var t="function"==typeof Map?new Map:void 0;return(y=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return b(e,arguments,O(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),d(n,e)})(e)}function b(e,t,r){return(b=v()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&d(o,r.prototype),o}).apply(null,arguments)}function v(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(c,e);var t,r,n,o,u,i=(t=c,r=v(),function(){var e,n=O(t);if(r){var o=O(this).constructor;e=Reflect.construct(n,arguments,o)}else e=n.apply(this,arguments);return s(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).name="PDKIllegalArgumentError",t}return n=c,o&&p(n.prototype,o),u&&p(n,u),Object.defineProperty(n,"prototype",{writable:!1}),n}(y(Error)),h=["url","urlObj","onLoad","onError","onExhausted","retryOpts","LoaderComponent"];function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==r)return;var n,o,u=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(u.push(n.value),!t||u.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw o}}return u}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function E(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function R(e,t,r,n,o,u,i){try{var c=e[u](i),a=c.value}catch(e){return void r(e)}c.done?t(a):Promise.resolve(a).then(n,o)}var _={retries:3,backOffFactor:2,interval:500};function T(e,t,r){return a()(function(){var r,n=(r=regeneratorRuntime.mark((function r(n){var o,u;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,i.a.get(e,{withCredentials:!1,responseType:"blob",cancelToken:t,validateStatus:function(e){return 200===e}});case 3:return o=r.sent,r.abrupt("return",o);case 7:if(r.prev=7,r.t0=r.catch(0),202!==(null===(u=r.t0.response)||void 0===u?void 0:u.status)){r.next=11;break}return r.abrupt("return",Promise.reject(r.t0));case 11:n(r.t0);case 12:case"end":return r.stop()}}),r,null,[[0,7]])})),function(){var e=this,t=arguments;return new Promise((function(n,o){var u=r.apply(e,t);function i(e){R(u,n,o,i,c,"next",e)}function c(e){R(u,n,o,i,c,"throw",e)}i(void 0)}))});return function(e){return n.apply(this,arguments)}}(),{retries:r.retries,factor:r.backOffFactor,minTimeout:r.interval})}var k=function(e){var t=e.url,r=e.urlObj,u=e.onLoad,c=void 0===u?function(){}:u,a=e.onError,l=void 0===a?function(){}:a,p=e.onExhausted,s=void 0===p?function(){}:p,y=e.retryOpts,b=void 0===y?{}:y,v=e.LoaderComponent,d=E(e,h),O=Object(n.useRef)(),g=x(Object(n.useState)(!0),2),P=g[0],S=g[1],R=x(Object(n.useState)(),2),k=R[0],L=R[1];return Object(n.useEffect)((function(){if(!t&&!r)return l(new m("Please provide either `url` or `urlObj` prop"));try{t=r?(e=r,f.url.objToUrl(e)):t}catch(e){return l(e)}var e,n=!1,o=i.a.CancelToken.source();return S(!0),L(!1),T(t,o.token,w(w({},_),b)).then((function(e){n||(L(!0),O.current.src=URL.createObjectURL(e.data))})).catch((function(e){var t;if(!n)return 202!==(null===(t=e.response)||void 0===t?void 0:t.status)?l(e):void s(e)})).finally((function(){return S(!1)})),function(){n=!0,o.cancel("Cancelling in cleanup"),O.current&&URL.revokeObjectURL(O.current.src)}}),[t,r]),P&&v?o.a.createElement(v,null):k?o.a.createElement("img",j({src:"undefined"==typeof window?t:"","data-testid":"pixelbin-image"},d,{ref:O,onLoad:c,onError:l})):o.a.createElement("img",{"data-testid":"pixelbin-empty-image"})}}]));