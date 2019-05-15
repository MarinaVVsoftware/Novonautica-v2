const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

// adecuación para ser deployeado en now.sh
module.exports = withImages(
  withCSS({
    target: "serverless",
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];

      return config;
    }
  })
);
