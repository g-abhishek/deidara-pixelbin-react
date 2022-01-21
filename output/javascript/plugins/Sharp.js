import Transformation from "../transformation.js";

/**
* Sharp Image Library Module
* @param {integer} height - Height
* @param {integer} width - Width
* @param {enum} fit - Fit
* @param {color} background - Background
* @param {enum} position - Position

* returns Transformation
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
* Sharp Image Library Module
* @param {integer} quality - Quality

* returns Transformation
*/
export const compress = function ({ quality = 90 }) {
    return new Transformation([`t.compress(q:${quality})`]);
};

/**
* Sharp Image Library Module
* @param {integer} top - Top
* @param {integer} left - Left
* @param {integer} bottom - Bottom
* @param {integer} right - Right
* @param {color} background - Background

* returns Transformation
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
* Sharp Image Library Module
* @param {integer} top - Top
* @param {integer} left - Left
* @param {integer} height - Height
* @param {integer} width - Width

* returns Transformation
*/
export const extract = function ({ top = 10, left = 10, height = 50, width = 20 }) {
    return new Transformation([`t.extract(t:${top},l:${left},h:${height},w:${width})`]);
};

/**
* Sharp Image Library Module
* @param {integer} threshold - Threshold

* returns Transformation
*/
export const trim = function ({ threshold = 10 }) {
    return new Transformation([`t.trim(t:${threshold})`]);
};

/**
* Sharp Image Library Module
* @param {integer} angle - Angle
* @param {color} background - Background

* returns Transformation
*/
export const rotate = function ({ angle = 0, background = "000000" }) {
    return new Transformation([`t.rotate(a:${angle},b:${background})`]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const flip = function ({}) {
    return new Transformation([`t.flip()`]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const flop = function ({}) {
    return new Transformation([`t.flop()`]);
};

/**
* Sharp Image Library Module
* @param {integer} sigma - Sigma
* @param {integer} flat - Flat
* @param {integer} jagged - Jagged

* returns Transformation
*/
export const sharpen = function ({ sigma = 1, flat = 1, jagged = 2 }) {
    return new Transformation([`t.sharpen(s:${sigma},f:${flat},j:${jagged})`]);
};

/**
* Sharp Image Library Module
* @param {integer} size - Size

* returns Transformation
*/
export const median = function ({ size = 3 }) {
    return new Transformation([`t.median(s:${size})`]);
};

/**
* Sharp Image Library Module
* @param {integer} sigma - Sigma

* returns Transformation
*/
export const blur = function ({ sigma = 1 }) {
    return new Transformation([`t.blur(s:${sigma})`]);
};

/**
* Sharp Image Library Module
* @param {color} background - Background

* returns Transformation
*/
export const flatten = function ({ background = "000000" }) {
    return new Transformation([`t.flatten(b:${background})`]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const negate = function ({}) {
    return new Transformation([`t.negate()`]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const normalise = function ({}) {
    return new Transformation([`t.normalise()`]);
};

/**
* Sharp Image Library Module
* @param {integer} a - A
* @param {integer} b - B

* returns Transformation
*/
export const linear = function ({ a = 1, b = 0 }) {
    return new Transformation([`t.linear(a:${a},b:${b})`]);
};

/**
* Sharp Image Library Module
* @param {integer} brightness - Brightness
* @param {integer} saturation - Saturation
* @param {integer} hue - Hue

* returns Transformation
*/
export const modulate = function ({ brightness = 1, saturation = 1, hue = 90 }) {
    return new Transformation([`t.modulate(b:${brightness},s:${saturation},h:${hue})`]);
};

/**
* Sharp Image Library Module

* returns Transformation
*/
export const grey = function ({}) {
    return new Transformation([`t.grey()`]);
};

/**
* Sharp Image Library Module
* @param {color} color - Color

* returns Transformation
*/
export const tint = function ({ color = "000000" }) {
    return new Transformation([`t.tint(c:${color})`]);
};

/**
* Sharp Image Library Module
* @param {integer} quality - Quality
* @param {boolean} progressive - Progressive

* returns Transformation
*/
export const jpg = function ({ quality = 90, progressive = false }) {
    return new Transformation([`t.jpg(q:${quality},p:${progressive})`]);
};

/**
* Sharp Image Library Module
* @param {integer} quality - Quality
* @param {boolean} progressive - Progressive
* @param {integer} compressionLevel - Compressionlevel

* returns Transformation
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
