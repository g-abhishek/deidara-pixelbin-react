import Transformation from "../transformation.js";

export const bg = function ({}) {
    return new Transformation([`remove.bg()`]);
};

export default {
    bg,
};
