const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...base,
  entry: {
    app: './src/windowed.js',
  },
  
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'dev-a-corovan.js',
    publicPath: '/'
  },

  devtool: 'eval',

  devServer: {
    historyApiFallback: true,
    hot: true,
    devMiddleware: {
      publicPath: '/'
    },
    static: {
      directory: path.resolve(__dirname, '..', 'dist'),
    },
    port: 1337,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'rob-a-corovan',
      template: './src/index.html',
      templateParameters: {
        mode: 'development',
      },
      inject: 'body',
    }),
  ]
}
