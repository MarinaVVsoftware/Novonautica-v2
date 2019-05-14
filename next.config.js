const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const path = require("path");

// adecuación para ser deployeado en now.sh
module.exports = withImages(
  withCSS({
    target: "serverless",
    webpack(config, options) {
      config.resolve.alias["components"] = path.join(__dirname, "components");
      return config;
    }
  })
);
