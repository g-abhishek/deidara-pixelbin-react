import Transformation from "../transformation.js";

/**
* Artifact Removal Plugin

* returns Transformation
*/
export const remove = function ({}) {
    return new Transformation([`af.remove()`]);
};

export default {
    remove,
};
