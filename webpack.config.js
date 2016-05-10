const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

let config = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
        include: PATHS.app,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app,
      },
    ],
  },
};

if (TARGET === 'start' || !TARGET) {
  Object.assign(config, {
    devtool: 'eval',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
    },
  });

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
