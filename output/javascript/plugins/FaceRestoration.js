import Transformation from "../transformation.js";

/**
* Face Restoration Module

* returns Transformation
*/
export const restore = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["face.restore", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

export default {
    restore,
};
