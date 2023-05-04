// config-overrides.js
const { aliasWebpack } = require("react-app-alias");

module.exports = function override(config) {
    aliasWebpack({ tsconfig: "./tsconfig.json" })(config);
    return config;
};