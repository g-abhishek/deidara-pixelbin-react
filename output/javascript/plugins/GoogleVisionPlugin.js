import Transformation from "../transformation.js";

/**
* Google Vision Plugin
* @param {integer} maximumLabels - Maximum labels

* returns Transformation
*/
export const detectLabels = function ({ maximumLabels = 5 }) {
    return new Transformation([`googleVis.detectLabels(l:${maximumLabels})`]);
};

export default {
    detectLabels,
};
