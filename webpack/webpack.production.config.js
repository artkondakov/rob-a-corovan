const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  ...base,
  entry: {
    robACorovanFn: './src/index.js',
    robACorovan: './src/windowed.js',
  },
  
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: './',
    libraryTarget: 'umd'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new HtmlWebpackPlugin({
      title: 'rob-a-corovan',
      template: './src/index.html',
      minify: true,
      inject: true,
      templateParameters: {
        mode: 'production',
      },
    }),
  ]
}
