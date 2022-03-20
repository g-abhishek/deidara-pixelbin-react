import { getUrlParts, version2Regex } from "./common.utils";
import {PDKInvalidUrlError, PDKIllegalArgumentError} from "../errors/PixelbinErrors";

export const getUrlFromObj = function (obj, config){
    if(!obj.baseUrl) obj["baseUrl"] = "https://cdn.pixelbin.io";
    if(!obj.cloudName) throw new PDKIllegalArgumentError("key cloudName should be defined");
    if(!obj.filePath) throw new PDKIllegalArgumentError("key filePath should be defined");
    obj["pattern"] = getPatternFromTransformations(obj["transformations"], config) || "original";
    if(!obj.version || !version2Regex.test(obj.version)) obj.version = "v2";
    if(!obj.zone || !/([a-zA-Z0-9_-]{6})/.test(obj.zone)) obj.zone = "";
    const urlKeySorted = ["baseUrl", "version", "cloudName", "zoneSlug", "pattern", "filePath"];
    const urlArr = [];
    urlKeySorted.forEach((key) => {
        if (obj[key]) urlArr.push(obj[key]);
    });
    return urlArr.join("/");

};

const getPartsFromUrl = function (url) {
    const parts = getUrlParts(url);
    return {
            baseUrl: `${parts["protocol"]}//${parts["host"]}`,
            filePath: parts["filePath"],
            pattern: parts["pattern"],
            version: parts["version"],
            zone: parts["zoneSlug"],
            cloudName: parts["cloudName"],
    }
}

function removeLeadingDash(str) {
    if (str.charAt(0) === "-") {
        return str.substr(1);
    }
    return str;
}

function getParamsList(dSplit, prefix) {
    return removeLeadingDash(dSplit.split("(")[1].replace(")", "").replace(prefix, "")).split(",");
}

function getParamsObject(paramsList) {
    const params = [];
    paramsList.forEach((item) => {
        const [param, val] = item.split(":");
        if (param) {
            params.push({
                key : param,
                value : val
            });
        }
    });
    return params.length && params;
}

function txtToOptions(dSplit) {
    // Figure Out Module
    const fullFnName = dSplit.split("(")[0];
    
    const [pluginId, operationName] = fullFnName.split(".");

    if (pluginId === "p") {
        const params = getParamsObject(getParamsList(dSplit, ""));
        const presetName = params.find(({key, value}) => key === "n");
        if(presetName?.key){
            return {
                plugin: pluginId,
                name: presetName.value,
            }
        }
        return;
    }

    const values = getParamsObject(getParamsList(dSplit, "."));
    const [plugin, name] = dSplit.split("(")[0].split(".")
    const transformation = {
        values: values,
        plugin,
        name,
    };
    if(!transformation.values)
        delete transformation["values"];
    return transformation;
}

const getTransformationsFromPattern = function (pattern, url, config, flatten = false) {
    if (pattern === "original") {
        return [];
    }

    const dSplit = pattern.split(config.operationSeparator);
    let opts = dSplit
        .map((x) => {
            if (x.startsWith("p:")) {
                const [, presetString] = x.split(":");
                x = `p.apply(n:${presetString})`
            }
            return txtToOptions(x);
        })
        .flat(); // Flatten preset sub-lists
    if (flatten) opts = opts.flat();
    return opts;
};

export const getObjFromUrl = function (url, config, flatten) {
    const parts = getPartsFromUrl(url);
    parts.transformations = getTransformationsFromPattern(parts.pattern, url, config, flatten);
    delete parts["pattern"];
    return parts;
};

export const getPatternFromTransformations = function (transformationList, config) {
    return transformationList?.length
        ? transformationList
              .map((o) => {
                  if (o.hasOwnProperty("name")) {
                      if (o.plugin === "p") {
                          return `p:${o.name}`;
                      } else {
                        o.values = o.values || [];
                        const paramsStr = o.values
                            .map(({key, value}) => {
                                return `${key}:${value}`;
                            })
                            .join(config.parameterSeparator);
                          return `${o.plugin}.${o.name}(${paramsStr})`;
                      }
                  } else {
                      return null;
                  }
              })
              .filter((ele) => ele) // Remove invalid transforms.
              .join(config.operationSeparator)
        : null;
};

export const getUnArchivedPresets = (presets) => {
    return presets.filter((ele) => !ele.archived);
};

export const rgbHex = function (red, green, blue, alpha) {
    const isPercent = (red + (alpha || "")).toString().includes("%");

    if (typeof red === "string") {
        [red, green, blue, alpha] = red
            .match(/(0?\.?\d{1,3})%?\b/g)
            .map((component) => Number(component));
    } else if (alpha !== undefined) {
        alpha = Number.parseFloat(alpha);
    }

    if (
        typeof red !== "number" ||
        typeof green !== "number" ||
        typeof blue !== "number" ||
        red > 255 ||
        green > 255 ||
        blue > 255
    ) {
        throw new TypeError("Expected three numbers below 256");
    }

    if (typeof alpha === "number") {
        if (!isPercent && alpha >= 0 && alpha <= 1) {
            alpha = Math.round(255 * alpha);
        } else if (isPercent && alpha >= 0 && alpha <= 100) {
            alpha = Math.round((255 * alpha) / 100);
        } else {
            throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
        }

        alpha = (alpha | (1 << 8)).toString(16).slice(1); // eslint-disable-line no-bitwise
    } else {
        alpha = "";
    }

    return (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) + alpha; // eslint-disable-line no-bitwise
};
