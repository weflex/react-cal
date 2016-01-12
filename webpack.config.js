'use strict';

function dir (subpath) {
  return require('path').join(__dirname, subpath);
}

module.exports = {
 entry: dir('./src/index.jsx'),
  output: {
    path: './dist',
    filename: 'build.js',
    library: 'Calendar',
    libraryTarget: 'umd'
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
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment'
  }
};
