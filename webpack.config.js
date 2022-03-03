const path = require("path");
const ExtractCSS = require("mini-css-extract-plugin");
const autoPrefixer = require("autoprefixer");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.join(__dirname, "src", "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "src", "static");

const config = {
  plugins: [new ExtractCSS()],
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          ExtractCSS.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoPrefixer],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
};

module.exports = config;
