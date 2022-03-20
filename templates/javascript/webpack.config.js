const path = require("path");

module.exports = {
    entry: {
        pixelbin: path.resolve("./artifacts/javascript/", "pixelbin.js")
    },
    output: {
        path: path.resolve("./artifacts/javascript/", "./dist"),
        filename: "[name].v1.js",
        library: {
            name: "Pixelbin",
            type: "umd",
        },
        libraryExport: "default",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    devServer: {
        contentBase: path.resolve("./artifacts/javascript/", "./dist"),
    },
};
