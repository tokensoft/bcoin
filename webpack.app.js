'use strict';

const Path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const str = JSON.stringify;
const env = process.env;

module.exports = {
  target: 'web',
  entry: {
    'app': './browser/src/app',
    'worker': './lib/workers/worker'
  },
  output: {
    path: Path.join(__dirname, 'browser'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['-browser.js', '.js', '.json'],
    alias: require('bcrypto/compat')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BCOIN_NETWORK':
        str(env.BCOIN_NETWORK || 'main'),
      'process.env.BCOIN_WORKER_FILE':
        str(env.BCOIN_WORKER_FILE || '/bcoin-worker.js')
    }),
    new UglifyJsPlugin()
  ]
};
