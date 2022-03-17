const path = require("path");

module.exports = {
    entry: {
        pixelbin: path.resolve("./", "pixelbin.js")
    },
    output: {
        path: path.resolve("./", "dist"),
        filename: "[name].[contenthash].js",
        library: {
            name: "Pixelbin",
            type: "umd",
        },
        libraryExport: "default",
        clean: true,
    },
    externals: {
        axios: {
          commonjs: 'axios',
          commonjs2: 'axios',
          amd: 'axios',
          root: 'axios',
        },
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
        contentBase: path.resolve("./", "./dist"),
    },
};
