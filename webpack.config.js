const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.tsx', // Ensure correct entry point
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Ensure '.ts' and '.tsx' are included
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', "postcss-loader"], // Handle CSS if needed
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ], 
    historyApiFallback: true,
  },
};