import {
    getTransformationsFromUrl,
    getUrlTransformationString,
    getImageUrlWithOptions,
} from "./transformation.utils";

class UrlUtils {
    constructor() {
        this.config = {
            operationSeparator: "~",
            parameterSeparator: ",",
        };
    }

    deconstructPixelbinUrl(url) {
        return getTransformationsFromUrl(url, this.config, false);
    }

    generatePixelbinPattern(transformationList) {
        return getUrlTransformationString(transformationList, this.config);
    }

    generatePixelbinUrl(imageUrl, transformationList, version = "v2") {
        return getImageUrlWithOptions(
            imageUrl,
            this.generatePixelbinPattern(transformationList, this.config),
            version,
        );
    }
}

function getUrlUtilsInstance(pixelbin) {
    const instance = new UrlUtils(pixelbin);
    return instance;
}

export { getUrlUtilsInstance };
