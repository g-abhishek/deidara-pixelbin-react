import Transformation from "../transformation.js";

/**
* @param {integer} maximumLabels
* @param {integer} minimumConfidence

*/
export const detectLabels = function ({ maximumLabels = 5, minimumConfidence = 55 }) {
    return new Transformation([`awsRek.detectLabels(l:${maximumLabels},c:${minimumConfidence})`]);
};

/**
* @param {integer} minimumConfidence

*/
export const moderation = function ({ minimumConfidence = 55 }) {
    return new Transformation([`awsRek.moderation(c:${minimumConfidence})`]);
};

export default {
    detectLabels,
    moderation,
};
