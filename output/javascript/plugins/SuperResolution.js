import Transformation from "../transformation.js";

/**
* Super Resolution Module
* @param {enum} type - Type

* returns Transformation
*/
export const upscale = function ({ type = "2x" }) {
    return new Transformation([`sr.upscale(t:${type})`]);
};

export default {
    upscale,
};
