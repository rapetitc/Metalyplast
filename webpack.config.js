const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// LOADERS CONFIGURATION
const rulesForJSX = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
}
const rulesForFiles = {
  test: /\.png/,
  type: 'asset/resource'
}
const rulesForSASS = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}

// CONFIGURATION
module.exports = {
  entry: './dev/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      rulesForJSX,
      rulesForSASS,
      rulesForFiles,
    ]
  },
  plugins: [new HTMLWebpackPlugin({
    template: './public/index.html',
    inject: "body",
    favicon: './public/favicon.ico',
  })],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.resolve(__dirname, '/src'), 'node_modules'
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/dev'),
    },
    compress: true,
    port: 9900,
  },
}