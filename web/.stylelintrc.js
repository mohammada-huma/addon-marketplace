"use strict";

module.exports = {
  extends: "stylelint-config-standard-scss",
  plugins: ["stylelint-use-logical"],
  rules: {
    "csstools/use-logical": [
      "always",
      {
        except: [
          "top",
          "bottom",
          /^(padding|margin|border)-(top|bottom)/,
          /width$/,
          /height$/,
        ],
      },
    ],
    "no-empty-source": null,
    "color-hex-length": null,
  },
};
