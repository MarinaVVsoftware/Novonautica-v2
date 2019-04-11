const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

// adecuación para ser deployeado en now.sh
module.exports = withImages(
  withCSS({
    target: "serverless"
  })
);
