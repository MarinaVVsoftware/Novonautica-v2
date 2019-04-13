const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
require("dotenv").config();
const webpack = require("webpack");

// adecuación para ser deployeado en now.sh
module.exports = withImages(
  withCSS({
    target: "serverless",
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  })
);
