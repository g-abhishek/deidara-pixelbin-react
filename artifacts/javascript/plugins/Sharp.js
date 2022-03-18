import Transformation from "../transformation.js";

/**
 * Sharp Image Library Module
 * @param {integer} height - Height* @param {integer} width - Width* @param {enum} fit - Fit* @param {color} background - Background* @param {enum} position - Position
 * returns Transformation
 */
export const resize = function (
    config = {
        height: 0,
        width: 0,
        fit: "cover",
        background: "000000",
        position: "center",
    },
) {
    const paramIdMap = {
        height: "h",
        width: "w",
        fit: "f",
        background: "b",
        position: "p",
    };
    const params = ["height", "width", "fit", "background", "position"].filter((param) =>
        config.hasOwnProperty(param),
    );
    const transformation = ["t.resize", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} quality - Quality
 * returns Transformation
 */
export const compress = function (
    config = {
        quality: 90,
    },
) {
    const paramIdMap = {
        quality: "q",
    };
    const params = ["quality"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.compress", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} bottom - Bottom* @param {integer} right - Right* @param {color} background - Background
 * returns Transformation
 */
export const extend = function (
    config = {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
        background: "000000",
    },
) {
    const paramIdMap = {
        top: "t",
        left: "l",
        bottom: "b",
        right: "r",
        background: "bc",
    };
    const params = ["top", "left", "bottom", "right", "background"].filter((param) =>
        config.hasOwnProperty(param),
    );
    const transformation = ["t.extend", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} top - Top* @param {integer} left - Left* @param {integer} height - Height* @param {integer} width - Width
 * returns Transformation
 */
export const extract = function (
    config = {
        top: 10,
        left: 10,
        height: 50,
        width: 20,
    },
) {
    const paramIdMap = {
        top: "t",
        left: "l",
        height: "h",
        width: "w",
    };
    const params = ["top", "left", "height", "width"].filter((param) =>
        config.hasOwnProperty(param),
    );
    const transformation = ["t.extract", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} threshold - Threshold
 * returns Transformation
 */
export const trim = function (
    config = {
        threshold: 10,
    },
) {
    const paramIdMap = {
        threshold: "t",
    };
    const params = ["threshold"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.trim", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} angle - Angle* @param {color} background - Background
 * returns Transformation
 */
export const rotate = function (
    config = {
        angle: 0,
        background: "000000",
    },
) {
    const paramIdMap = {
        angle: "a",
        background: "b",
    };
    const params = ["angle", "background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.rotate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const flip = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flip", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const flop = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flop", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} sigma - Sigma* @param {integer} flat - Flat* @param {integer} jagged - Jagged
 * returns Transformation
 */
export const sharpen = function (
    config = {
        sigma: 1,
        flat: 1,
        jagged: 2,
    },
) {
    const paramIdMap = {
        sigma: "s",
        flat: "f",
        jagged: "j",
    };
    const params = ["sigma", "flat", "jagged"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.sharpen", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} size - Size
 * returns Transformation
 */
export const median = function (
    config = {
        size: 3,
    },
) {
    const paramIdMap = {
        size: "s",
    };
    const params = ["size"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.median", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} sigma - Sigma
 * returns Transformation
 */
export const blur = function (
    config = {
        sigma: 1,
    },
) {
    const paramIdMap = {
        sigma: "s",
    };
    const params = ["sigma"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.blur", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {color} background - Background
 * returns Transformation
 */
export const flatten = function (
    config = {
        background: "000000",
    },
) {
    const paramIdMap = {
        background: "b",
    };
    const params = ["background"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.flatten", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const negate = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.negate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const normalise = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.normalise", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} a - A* @param {integer} b - B
 * returns Transformation
 */
export const linear = function (
    config = {
        a: 1,
        b: 0,
    },
) {
    const paramIdMap = {
        a: "a",
        b: "b",
    };
    const params = ["a", "b"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.linear", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} brightness - Brightness* @param {integer} saturation - Saturation* @param {integer} hue - Hue
 * returns Transformation
 */
export const modulate = function (
    config = {
        brightness: 1,
        saturation: 1,
        hue: 90,
    },
) {
    const paramIdMap = {
        brightness: "b",
        saturation: "s",
        hue: "h",
    };
    const params = ["brightness", "saturation", "hue"].filter((param) =>
        config.hasOwnProperty(param),
    );
    const transformation = ["t.modulate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const grey = function (config = {}) {
    const paramIdMap = {};
    const params = [].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.grey", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {color} color - Color
 * returns Transformation
 */
export const tint = function (
    config = {
        color: "000000",
    },
) {
    const paramIdMap = {
        color: "c",
    };
    const params = ["color"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.tint", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} quality - Quality* @param {boolean} progressive - Progressive
 * returns Transformation
 */
export const jpg = function (
    config = {
        quality: 90,
        progressive: false,
    },
) {
    const paramIdMap = {
        quality: "q",
        progressive: "p",
    };
    const params = ["quality", "progressive"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["t.jpg", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

/**
 * Sharp Image Library Module
 * @param {integer} quality - Quality* @param {boolean} progressive - Progressive* @param {integer} compressionLevel - Compressionlevel
 * returns Transformation
 */
export const png = function (
    config = {
        quality: 90,
        progressive: false,
        compressionLevel: 9,
    },
) {
    const paramIdMap = {
        quality: "q",
        progressive: "p",
        compressionLevel: "c",
    };
    const params = ["quality", "progressive", "compressionLevel"].filter((param) =>
        config.hasOwnProperty(param),
    );
    const transformation = ["t.png", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

export default {
    resize,
    compress,
    extend,
    extract,
    trim,
    rotate,
    flip,
    flop,
    sharpen,
    median,
    blur,
    flatten,
    negate,
    normalise,
    linear,
    modulate,
    grey,
    tint,
    jpg,
    png,
};
