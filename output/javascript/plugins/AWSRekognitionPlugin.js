import Transformation from "../transformation.js";

/**
* AWS Rekognition Plugin
* @param {integer} maximumLabels - Maximum labels
* @param {integer} minimumConfidence - Minimum confidence

* returns Transformation
*/
export const detectLabels = function ({ maximumLabels = 5, minimumConfidence = 55 }) {
    return new Transformation([`awsRek.detectLabels(l:${maximumLabels},c:${minimumConfidence})`]);
};

/**
* AWS Rekognition Plugin
* @param {integer} minimumConfidence - Minimum confidence

* returns Transformation
*/
export const moderation = function ({ minimumConfidence = 55 }) {
    return new Transformation([`awsRek.moderation(c:${minimumConfidence})`]);
};

export default {
    detectLabels,
    moderation,
};
