"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PixelBinDownloadButton;
exports.pollTransformedImage = void 0;

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

const pollTransformedImage = (url, cancelToken, retryOpts) => {
  return (0, _asyncRetry.default)(async bail => {
    try {
      const response = await _axios.default.head(url, {
        cancelToken: cancelToken,

        validateStatus(status) {
          return status === 200;
        }

      });
      return response;
    } catch (err) {
      // This will trigger a retry
      if (err.response?.status === 202) {
        return Promise.reject(err.response);
      } // Any other errors won't be retried


      bail(err);
    }
  }, {
    retries: retryOpts.retries,
    factor: retryOpts.backOffFactor,
    minTimeout: retryOpts.interval
  });
};

exports.pollTransformedImage = pollTransformedImage;

function PixelBinDownloadButton({
  children,
  url,
  urlObj,
  retryOpts = {},
  onDownloadStart = () => {},
  onDownloadFinish = () => {},
  onError = () => {},
  onExhausted = () => {},
  ...restProps
}) {
  const [isUnmounted, setIsUnmounted] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    return () => setIsUnmounted(true);
  }, []);

  const downloadImage = e => {
    e.stopPropagation();
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


    let source = _axios.default.CancelToken.source();

    setIsUnmounted(false);
    onDownloadStart();
    pollTransformedImage(`${url}?download=true`, source.token, { ...DEFAULT_RETRY_OPTS,
      ...retryOpts
    }).then(() => {
      if (isUnmounted) return;
      onDownloadFinish();
      const link = document.createElement("a");
      link.href = `${url}?download=true`;
      link.download = "pixelbin-transformed";
      link.click();
    }).catch(err => {
      if (isUnmounted) return;
      console.log(err);

      if (err.response?.status !== 202) {
        return onError(err);
      }

      onExhausted(err);
    });
  };

  return /*#__PURE__*/_react.default.createElement("button", _extends({
    "data-testid": "pixelbin-download-button"
  }, restProps, {
    onClick: downloadImage
  }), children);
}