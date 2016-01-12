'use strict';

function dir (subpath) {
  return require('path').join(__dirname, subpath);
}

module.exports = {
  entry: ['webpack/hot/dev-server', dir('app/dev.jsx')],
  output: {
    path: './',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /server/],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /react-baidu-map\/index\.jsx$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /server/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};
