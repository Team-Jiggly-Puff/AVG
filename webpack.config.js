const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.ts",
  plugins: [new HtmlWebpackPlugin({
    title: 'AVG (Development)',
    template: './client/index.html'
  }), new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    // publicPath: '/build/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    proxy: [
      {
        context: ['/api'],
        secure: false,
        target: 'http://localhost:3000',
      },
    ],
    hot: true
  },
};