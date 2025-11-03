// @ts-check
const tseslint = require("typescript-eslint");
const humaConfig = require("@huma-engineering/eslint-config");

module.exports = tseslint.config(humaConfig);
