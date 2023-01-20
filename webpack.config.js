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
  // MAIN FILE TO PACK
  entry: './dev/index.js',

  // WHERE WILL BE BUNDLED
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || 'development',

  // LOADERS CONFIGURATION
  module: {
    rules: [
      rulesForJSX,
      rulesForSASS,
      rulesForFiles,
    ]
  },

  // HTML TEMPLATER
  plugins: [new HTMLWebpackPlugin({
    template: './dev/index.html',
    inject: "body",
    favicon: './dev/favicon.ico',
  })],

  // PATH RESOLVE
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },

  // DEV SERVER ENTRY POINT
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
}