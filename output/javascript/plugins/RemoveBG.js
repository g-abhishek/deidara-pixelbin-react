import Transformation from "../transformation.js";

/**
* RemoveBG Background Removal Module

* returns Transformation
*/
export const bg = function ({}) {
    return new Transformation([`remove.bg()`]);
};

export default {
    bg,
};
