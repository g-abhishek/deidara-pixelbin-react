import Transformation from "../transformation.js";

/**
 * Image Generation Module
 * @param {string} prompt - Prompt
 * returns Transformation
 */
export const generate = function (
    config = {
        prompt: "A cute puppy",
    },
) {
    const paramIdMap = {
        prompt: "p",
    };
    const params = ["prompt"].filter((param) => config.hasOwnProperty(param));
    const transformation = ["iGen.generate", "("];
    params.map((param, idx) => {
        transformation.push(`${paramIdMap[param]}:${config[param]}`);
        if (idx !== params.length - 1) transformation.push(",");
    });
    transformation.push(")");
    return new Transformation([transformation.join("")]);
};

export default {
    generate,
};
