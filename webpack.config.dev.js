const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //sourcemap let us see our original code when debugin in the browser
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  }, // Webpack doesn't output code in development mode. It serves our app from memory.
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true, // this means that all request will be sent to index.html, this way we can load deep links and they'll all be handled by ReactRouter
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"], // this will allow us to import css just like we do javascript and webpack will bundle all of our css into a single file
      },
    ],
  },
};
