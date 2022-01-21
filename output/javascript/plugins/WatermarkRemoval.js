import Transformation from "../transformation.js";

/**
* Watermark Removal Plugin

* returns Transformation
*/
export const remove = function ({}) {
    return new Transformation([`wm.remove()`]);
};

export default {
    remove,
};
