"use strict";

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const vars = require("./env");
const { NODE_ENV = "development" } = process.env;
const isProd = NODE_ENV === "production";
const entry = [path.join(__dirname, isProd ? `../src/prod.ts` : `../src/dev.ts`)];

module.exports = {
    target: "node",
    name: "server",
    externals: [nodeExternals()],
    bail: isProd,
    entry,
    devtool: false,
    mode: process.env.NODE_ENV,
    output: {
        filename: "[name]-bundle.js",
        chunkFilename: "[name].chunk.js",
        path: path.resolve(__dirname, "../bundle"),
        publicPath: "/",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ],
    },
    plugins: [new webpack.DefinePlugin(vars.stringified)],
};
