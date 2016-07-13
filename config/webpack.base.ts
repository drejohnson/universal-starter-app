import * as path from 'path';
import * as fs from 'fs';
import * as helpers from './helpers'

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.NODE_ENV !== 'production';

// Node Modules
const NODE_MODULES = fs.readdirSync('node_modules').filter((name) => {
  return name != '.bin';
});

// Loaders
const LOADERS = [
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
];

// PostCSS
const POSTCSS = function() {
  const AUTOPREFIXER_BROWSERS = [
    'last 2 versions'
  ];
  return [
    require('postcss-partial-import'),
    require('postcss-nested'),
    require('postcss-conditionals'),
    require('postcss-mixins'),
    require('lost')(),
    require('postcss-cssnext')({
      browsers: AUTOPREFIXER_BROWSERS
    }),
    require('postcss-color-function')
  ]
}

// Common Plugins
const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      ENV: JSON.stringify(ENV),
      NODE_ENV: JSON.stringify(ENV)
    }
  }),
  ...DEBUG ? [] : [
    // production
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
     beautify: false,
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true },
      comments: false
    }),
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ]
];

// Common Config
const _COMMON_CONFIG = {
  context: helpers.root('src'),
  devtool: DEBUG ? 'cheap-module-source-map' : false,
  cache: DEBUG,
  debug: DEBUG,
  resolve: {
    root: helpers.root('src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.ts', '.js']
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
    loaders: LOADERS
  },
  postcss: POSTCSS,
  // Configure settings for image-webpack-loader
  // imageWebpackLoader: {
  //   // Do not minify images when webpack is in debug mode (development)
  //   bypassOnDebug: DEBUG
  // },
};

// Client Config
const _CLIENT_CONFIG = {
  target: 'web',
  entry: {
    'client': helpers.root('src/client.ts') // context is './src'
  },
  output: {
    path: helpers.root('dist/client'),
    filename: '[name].js',
    publicPath: helpers.root('dist/client'),
    chunkFilename: '[id].[name].js',
  },
  plugins: [
    ...PLUGINS,
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
};

// Server Config
const _SERVER_CONFIG = {
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
    ...PLUGINS,
  ],
  externals: helpers.checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

export const CLIENT_CONFIG = Object.assign({}, _COMMON_CONFIG, _CLIENT_CONFIG);
export const SERVER_CONFIG = Object.assign({}, _COMMON_CONFIG, _SERVER_CONFIG);

// Exports
module.exports = [CLIENT_CONFIG, SERVER_CONFIG];
