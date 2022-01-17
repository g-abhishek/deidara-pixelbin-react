import Transformation from "../transformation.js";

/**
* @param {enum} industryType

*/
export const bg = function ({ industryType = "general" }) {
    return new Transformation([`erase.bg(i:${industryType})`]);
};

export default {
    bg,
};
