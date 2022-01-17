import path, { dirname } from "path";

console.log(dirname);

export default {
    entry: path.resolve("/home/aditya/Desktop/fynd-repo/test-repo", "app.js"),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js"],
    },
    output: {
        path: path.resolve("/home/aditya/Desktop/fynd-repo/test-repo", "./dist"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.resolve("/home/aditya/Desktop/fynd-repo/test-repo", "./dist"),
    },
};
