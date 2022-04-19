"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _asyncRetry = _interopRequireDefault(require("async-retry"));

var _core = _interopRequireDefault(require("@pixelbin/core"));

var _PixelBinErrors = require("../../errors/PixelBinErrors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const DEFAULT_RETRY_OPTS = {
  retries: 3,
  backOffFactor: 2,
  interval: 500
};

function fetchImageWithRetry(url, cancelToken, retryOpts) {
  return (0, _asyncRetry.default)(async bail => {
    try {
      const response = await _axios.default.get(url, {
        withCredentials: false,
        responseType: "blob",
        cancelToken: cancelToken,

        validateStatus(status) {
          return status === 200;
        }

      });
      return response;
    } catch (err) {
      // This will trigger a retry
      if (err.response?.status === 202) {
        return Promise.reject(err);
      } // This would exit without any retries


      bail(err);
    }
  }, {
    retries: retryOpts.retries,
    factor: retryOpts.backOffFactor,
    minTimeout: retryOpts.interval
  });
}

const PixelBinImage = ({
  url,
  urlObj,
  onLoad = () => {},
  onError = () => {},
  onExhausted = () => {},
  retryOpts = {},
  LoaderComponent,
  ...imgProps
}) => {
  const imgRef = (0, _react.useRef)();
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [isSuccess, setIsSuccess] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    // Neither `url` nor `urlObj` was provided
    if (!(url || urlObj)) return onError(new _PixelBinErrors.PDKIllegalArgumentError("Please provide either `url` or `urlObj` prop"));

    try {
      url = urlObj ? _core.default.utils.objToUrl(urlObj) : url;
    } catch (err) {
      return onError(err);
    }
    /**
     * If the component is unmounted before API call finishes, we use CancelToken to cancel the API call.
     * If in case the component unmounts just after the call is finished but any state updates haven't been made,
     * we use `unmounted` to prevent any state updates.
     */


    let unmounted = false;

    let source = _axios.default.CancelToken.source();

    setIsLoading(true);
    setIsSuccess(false);
    /**
     * If image was fetched successfully, set it as the src.
     * If an error occurs & its status is 202, means we ran out of retries.
     * Any other error is a genuine error and needs to be propagated to the caller.
     * Note: `setIsSuccess` is called before updating the src,
     * because img tag needs to be rendered for its ref to be accessed.
     */

    fetchImageWithRetry(url, source.token, { ...DEFAULT_RETRY_OPTS,
      ...retryOpts
    }).then(result => {
      if (unmounted) return;
      setIsSuccess(true);
      imgRef.current.src = URL.createObjectURL(result.data);
    }).catch(err => {
      if (unmounted) return;

      if (err.response?.status !== 202) {
        return onError(err);
      }

      onExhausted(err);
    }).finally(() => setIsLoading(false));
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup"); // When component is unmounted remove blob from memory

      if (imgRef.current) URL.revokeObjectURL(imgRef.current.src);
    };
  }, [url, urlObj]);

  if (isLoading && LoaderComponent) {
    return /*#__PURE__*/_react.default.createElement(LoaderComponent, null);
  } else if (isSuccess) {
    return /*#__PURE__*/_react.default.createElement("img", _extends({
      // For SSR
      src: typeof window === "undefined" ? url : "",
      "data-testid": "pixelbin-image"
    }, imgProps, {
      ref: imgRef,
      onLoad: onLoad,
      onError: onError
    }));
  } else {
    /**
     * If there were any errors in fetching the image, or the retries exhausted
     */
    return /*#__PURE__*/_react.default.createElement("img", {
      "data-testid": "pixelbin-empty-image"
    });
  }
};

var _default = PixelBinImage;
exports.default = _default;