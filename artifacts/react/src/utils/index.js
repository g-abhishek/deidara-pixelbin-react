const nc = require("node-common")

export function getUrlFromObj(obj) {
    return nc.url.objToUrl(obj);
}
