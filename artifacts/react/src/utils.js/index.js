import { config, versionRegex } from "../constants";
import { PDKIllegalArgumentError } from "../errors/PixelBinErrors";

export const getPatternFromTransformations = function (transformationList) {
    return transformationList?.length
        ? transformationList
            .reduce((result, ele) => {
                if (ele.hasOwnProperty("name")) {
                    let pattern;
                    if (ele.plugin === "p") {
                        pattern = `p:${ele.name}`;
                    } else {
                        ele.values = ele.values || [];
                        const paramsStr = ele.values
                            .map(({ key, value }) => {
                                return `${key}:${value}`;
                            })
                            .join(config.parameterSeparator);
                        pattern = `${ele.plugin}.${ele.name}(${paramsStr})`;
                    }
                    result.push(pattern);
                }
                return result;
            }, [])
            .join(config.operationSeparator)
        : null;
};

const getUrlFromObj = function (obj) {
    if (!obj.baseUrl) obj["baseUrl"] = "https://cdn.pixelbin.io";
    if (!obj.cloudName) throw new PDKIllegalArgumentError("Key 'cloudName' should be defined");
    if (!obj.filePath) throw new PDKIllegalArgumentError("Key 'filePath' should be defined");
    if (!obj.version || !versionRegex.test(obj.version)) obj.version = "v2";
    if (!obj.zone || !/([a-zA-Z0-9_-]{6})/.test(obj.zone)) obj.zone = "";

    obj["pattern"] = obj["transformationPattern"] || getPatternFromTransformations(obj["transformations"]) || "original";

    const urlKeySorted = ["baseUrl", "version", "cloudName", "zoneSlug", "pattern", "filePath"];
    const urlArr = [];
    urlKeySorted.forEach((key) => {
        if (obj[key]) urlArr.push(obj[key]);
    });
    return urlArr.join("/");
};

export { getUrlFromObj };
