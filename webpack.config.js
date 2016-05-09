const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

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
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
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
