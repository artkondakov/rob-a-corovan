const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      }
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
