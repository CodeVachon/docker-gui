var path = require("path");
var webpack = require("webpack");
var componentPath = path.resolve("./");

module.exports = {
    entry: "app/app.js",
    output: {
        path: "public/js",
        filename: "app.js"
    },
    resolve: {
        root: componentPath,
    },
    "target": "atom",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
