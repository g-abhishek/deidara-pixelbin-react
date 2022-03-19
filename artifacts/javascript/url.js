import {
    getObjFromUrl,
    getUrlTransformationString,
    getImageUrlWithOptions,
} from "./utils/transformation.utils";

const config = {
    operationSeparator: "~",
    parameterSeparator: ",",
};

const urlToObj = function (url) {
    return getObjFromUrl(url, config, false);
};

const generatePixelbinPattern = function (transformationList) {
    return getUrlTransformationString(transformationList, config);
};

const objToUrl = function (obj) {
    return getImageUrlWithOptions(
        obj.original,
        generatePixelbinPattern(obj.transformations, config),
        obj.version,
    );
};

export { urlToObj, objToUrl };
