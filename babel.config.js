require("dotenv-expand")(
    require("dotenv").config({
        path: '.env',
    }));

module.exports = function (api) {
    const env = api.env();

    api.cache(() => env === "development");
    api.async(env === "development");

    return {
        presets: [
            "@babel/preset-modules",
            ["@babel/preset-typescript"],
        ],
        plugins: [
            "babel-plugin-add-module-exports",

            ["@babel/plugin-transform-runtime", {
                corejs: { version: 3, proposals: true }
            }],
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-transform-object-super",
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-partial-application",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-transform-async-to-generator",
            "@babel/plugin-transform-destructuring",
            "@babel/plugin-transform-for-of",
            "@babel/plugin-transform-regenerator",
            ["babel-plugin-transform-inline-environment-variables"],
        ],
    };

};
