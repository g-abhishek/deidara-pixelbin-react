import Transformation from "../transformation.js";

/**
* EraseBG Background Removal Module
* @param {enum} industryType - Industry type

* returns Transformation
*/
export const bg = function ({ industryType = "general" }) {
    return new Transformation([`erase.bg(i:${industryType})`]);
};

export default {
    bg,
};
