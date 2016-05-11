const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const CSS_LOADER = `css?modules&importLoaders=1&\
localIdentName=[name]__[local]___[hash:base64:5]`;

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
        loader: `style!${CSS_LOADER}!postcss`,
        include: PATHS.app,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app,
      },
    ],
  },
  postcss() {
    return [
      require('autoprefixer'),
      require('postcss-nested'),
    ];
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
