const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.tsx",
  plugins: [new HtmlWebpackPlugin({
    title: 'AVG (Development)',
    template: './client/index.html'
  }), new Dotenv()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
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
    publicPath: '/build/',
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