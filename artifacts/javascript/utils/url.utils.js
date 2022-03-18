import {
    getTransformationsFromUrl,
    getUrlTransformationString,
    getImageUrlWithOptions,
} from "./transformation.utils";

class UrlUtils {
    constructor(pixelbinObj) {
        this.pixelbin = pixelbinObj;
    }

    deconstructPixelbinUrl(url) {
        return getTransformationsFromUrl(url, this.pixelbin.config, false);
    }

    generatePixelbinPattern(transformationList) {
        return getUrlTransformationString(transformationList, this.pixelbin.config);
    }

    generatePixelbinUrl(imageUrl, transformationList, version = "v2") {
        return getImageUrlWithOptions(
            imageUrl,
            this.generatePixelbinPattern(transformationList, this.pixelbin.config),
            version,
        );
    }
}

function getUrlUtilsInstance(pixelbin) {
    const instance = new UrlUtils(pixelbin);
    return instance;
}

export { getUrlUtilsInstance };
