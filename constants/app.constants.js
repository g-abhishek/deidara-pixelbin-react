module.exports = {
    APPLICATION_JSON: "application/json",

    filesPaths: {
        JAVASCRIPT: {
            OUTPUT: ["/plugins/", "transformation.js", "image.js", "pixelbin.js"],
            TEMPLATES: [
                "plugin.nunjucks",
                "transformation.nunjucks",
                "image.nunjucks",
                "pixelbin.nunjucks",
            ],
        },
    },
};
