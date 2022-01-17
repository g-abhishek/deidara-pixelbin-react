import Transformation from "../transformation.js";

/**
* @param {enum} type

*/
export const upscale = function ({ type = "2x" }) {
    return new Transformation([`sr.upscale(t:${type})`]);
};

export default {
    upscale,
};
