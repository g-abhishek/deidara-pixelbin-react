module.exports = {
    APPLICATION_JSON: "application/json",

    filesPaths: {
        JAVASCRIPT: {
            OUTPUT: ["/plugins/", "transformation.js", "image.js", "pixelbin.js", "package.json", "README.md"],
            TEMPLATES: [
                "plugin.nunjucks",
                "transformation.nunjucks",
                "image.nunjucks",
                "pixelbin.nunjucks",
                "package.nunjucks",
                "readme.nunjucks"
            ]
        },
    },
};