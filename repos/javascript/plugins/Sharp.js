import Transformation from "../transformation.js";

/**
* @param {integer} height
* @param {integer} width
* @param {enum} fit
* @param {color} background
* @param {enum} position

*/
export const resize = function ({
    height = 0,
    width = 0,
    fit = "cover",
    background = "000000",
    position = "center",
}) {
    return new Transformation([
        `t.resize(h:${height},w:${width},f:${fit},b:${background},p:${position})`,
    ]);
};

/**
* @param {integer} quality

*/
export const compress = function ({ quality = 90 }) {
    return new Transformation([`t.compress(q:${quality})`]);
};

/**
* @param {integer} top
* @param {integer} left
* @param {integer} bottom
* @param {integer} right
* @param {color} background

*/
export const extend = function ({
    top = 10,
    left = 10,
    bottom = 10,
    right = 10,
    background = "000000",
}) {
    return new Transformation([
        `t.extend(t:${top},l:${left},b:${bottom},r:${right},bc:${background})`,
    ]);
};

/**
* @param {integer} top
* @param {integer} left
* @param {integer} height
* @param {integer} width

*/
export const extract = function ({ top = 10, left = 10, height = 50, width = 20 }) {
    return new Transformation([`t.extract(t:${top},l:${left},h:${height},w:${width})`]);
};

/**
* @param {integer} threshold

*/
export const trim = function ({ threshold = 10 }) {
    return new Transformation([`t.trim(t:${threshold})`]);
};

/**
* @param {integer} angle
* @param {color} background

*/
export const rotate = function ({ angle = 0, background = "000000" }) {
    return new Transformation([`t.rotate(a:${angle},b:${background})`]);
};

export const flip = function ({}) {
    return new Transformation([`t.flip()`]);
};

export const flop = function ({}) {
    return new Transformation([`t.flop()`]);
};

/**
* @param {integer} sigma
* @param {integer} flat
* @param {integer} jagged

*/
export const sharpen = function ({ sigma = 1, flat = 1, jagged = 2 }) {
    return new Transformation([`t.sharpen(s:${sigma},f:${flat},j:${jagged})`]);
};

/**
* @param {integer} size

*/
export const median = function ({ size = 3 }) {
    return new Transformation([`t.median(s:${size})`]);
};

/**
* @param {integer} sigma

*/
export const blur = function ({ sigma = 1 }) {
    return new Transformation([`t.blur(s:${sigma})`]);
};

/**
* @param {color} background

*/
export const flatten = function ({ background = "000000" }) {
    return new Transformation([`t.flatten(b:${background})`]);
};

export const negate = function ({}) {
    return new Transformation([`t.negate()`]);
};

export const normalise = function ({}) {
    return new Transformation([`t.normalise()`]);
};

/**
* @param {integer} a
* @param {integer} b

*/
export const linear = function ({ a = 1, b = 0 }) {
    return new Transformation([`t.linear(a:${a},b:${b})`]);
};

/**
* @param {integer} brightness
* @param {integer} saturation
* @param {integer} hue

*/
export const modulate = function ({ brightness = 1, saturation = 1, hue = 90 }) {
    return new Transformation([`t.modulate(b:${brightness},s:${saturation},h:${hue})`]);
};

export const grey = function ({}) {
    return new Transformation([`t.grey()`]);
};

/**
* @param {color} color

*/
export const tint = function ({ color = "000000" }) {
    return new Transformation([`t.tint(c:${color})`]);
};

/**
* @param {integer} quality
* @param {boolean} progressive

*/
export const jpg = function ({ quality = 90, progressive = false }) {
    return new Transformation([`t.jpg(q:${quality},p:${progressive})`]);
};

/**
* @param {integer} quality
* @param {boolean} progressive
* @param {integer} compressionLevel

*/
export const png = function ({ quality = 90, progressive = false, compressionLevel = 9 }) {
    return new Transformation([`t.png(q:${quality},p:${progressive},c:${compressionLevel})`]);
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
