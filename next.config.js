const withCSS = require("@zeit/next-css");

// adecuación para ser deployeado en now.sh
module.exports = withCSS({
  target: "serverless"
});
