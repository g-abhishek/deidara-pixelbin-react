const path = require("path");

module.exports = {
    entry: {
        main: path.resolve("./", "index.js")
    },
    output: {
        path: path.resolve("./", "dist"),
        filename: "[name].[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: ["babel-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    devServer: {
        contentBase: path.resolve("./", "./dist"),
    },
};
