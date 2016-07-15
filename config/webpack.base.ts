import * as path from 'path';
import * as fs from 'fs';
import * as helpers from './helpers';

const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin.js');
const { ForkCheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined;
  const ifProd = plugin => addPlugin(env.prod, plugin);
  const removeEmpty = array => array.filter(i => !!i);

  const commonPlugins = removeEmpty([
    ifProd(new webpack.optimize.DedupePlugin()),

    ifProd(new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true
    })),

    ifProd(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })),

    ifProd(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      comments: false
    })),

    ifProd(new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    }))
  ]);

  const common = {
    debug: !env.prod,
    context: helpers.root('src'),
    devtool: env.prod ? 'source-map' : 'cheap-module-source-map',
    resolve: {
      root: helpers.root('src'),
      modulesDirectories: ['node_modules'],
      extensions: ['', '.ts', '.js'],
      plugins: [
        new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
      ]
    },
    module: {
      preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
      ],
      loaders: [
        {
          test: /\.ts$/,
          loader: ['awesome-typescript', 'angular2-template'],
          exclude: [
            /\.(spec|e2e)\.ts$/,
            /node_modules/
          ]
        }, {
          test: /\.html$/,
          loader: 'raw'
        }, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.css$/,
          loader: 'to-string!css!postcss'
        }, {
          test: /\.(jpe?g|png|gif|ico|svg)$/,
          loader: 'url',
          query: { limit: 10000, name: '/assets/images/[name].[hash].[ext]' }
        }, {
          test: /\.(eof|woff|woff2|ttf|eot)$/,
          loader: 'url',
          query: { limit: 10000, name: '/assets/fonts/[name].[hash].[ext]' }
        }
      ]
    },
    postcss: [
      require('postcss-partial-import'),
      require('postcss-nested'),
      require('postcss-conditionals'),
      require('postcss-mixins'),
      require('lost')(),
      require('postcss-cssnext')({
        browsers: ['last 2 versions']
      }),
      require('postcss-color-function')
    ],
  }

  const client = {
    target: 'web',
    entry: {
      'client': helpers.root('src/client.ts')
    },
    output: {
      filename: '[name].js',
      path: helpers.root('dist/client'),
      publicPath: helpers.root('dist/client'),
      chunkFilename: '[id].[name].js',
      pathinfo: !env.prod
    },
    plugins: [
      ...commonPlugins,
      // new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([{
        from: 'icons',
        to: 'assets/icons'
      }]),
      new CopyWebpackPlugin([{
        from: 'images',
        to: 'assets/images'
      }])
    ],
    node: {
      global: true,
      __dirname: true,
      __filename: true,
      process: true,
      Buffer: false
    }
  }

  const server = {
    target: 'node',
    entry: {
      'server': helpers.root('src/server/index.ts') // context is './src'
    },
    output: {
      path: helpers.root('dist/server'),
      publicPath: helpers.root('dist/server'),
      filename: '[name].js',
      chunkFilename: '[id].server.js',
      library: 'server',
      libraryTarget: 'commonjs2'
    },
    plugins: [
      ...commonPlugins,
    ],
    externals: helpers.checkNodeImport,
    node: {
      global: true,
      __dirname: true,
      __filename: true,
      process: true,
      Buffer: true
    }
  }

  const CLIENT_CONFIG = Object.assign({}, common, client);
  const SERVER_CONFIG = Object.assign({}, common, server);

  return [CLIENT_CONFIG, SERVER_CONFIG]
}
