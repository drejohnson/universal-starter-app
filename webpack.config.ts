import * as path from 'path';
import * as fs from 'fs';
import * as APP_CONSTANTS from './constants';

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
    loader: 'ts',
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
    test: /\.(eot|gif|jpe?g|png|svg|woff2?|ttf)$/,
    loader: 'url',
    query: { limit: 10000 }
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
    require('postcss-mixins'),
    require('lost')(),
    require('postcss-cssnext')({
      browsers: AUTOPREFIXER_BROWSERS
    })
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
      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new CompressionPlugin({
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ]
];

// Common Config
const _COMMON_CONFIG = {
  context: APP_CONSTANTS.SRC_DIR,
  devtool: DEBUG ? 'cheap-module-source-map' : false,
  cache: DEBUG,
  debug: DEBUG,
  resolve: {
    root: APP_CONSTANTS.SRC_DIR,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.ts', '.js']
  },
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ],
    loaders: LOADERS
  },
  postcss: POSTCSS
};

// Client Config
const _CLIENT_CONFIG = {
  target: 'web',
  entry: {
    [APP_CONSTANTS.CLIENT_NAME]: [APP_CONSTANTS.CLIENT_SOURCE_PATH]
  },
  output: {
    path: APP_CONSTANTS.DIST_DIR,
    filename: '[name].js',
    publicPath: APP_CONSTANTS.DIST_DIR,
    chunkFilename: '[id].[name].js',
  },
  plugins: [
    ...PLUGINS,
    // new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/icons',
      to: 'icons'
    }]),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'images'
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
    [APP_CONSTANTS.SERVER_NAME]: APP_CONSTANTS.SERVER_SOURCE_PATH
  },
  output: {
    path: APP_CONSTANTS.DIST_DIR,
    publicPath: APP_CONSTANTS.DIST_DIR,
    filename: '[name].js',
    chunkFilename: '[id].' + APP_CONSTANTS.SERVER_NAME + '.js',
    library: APP_CONSTANTS.SERVER_NAME,
    libraryTarget: 'commonjs2'
  },
  plugins: [
    ...PLUGINS,
  ],
  externals: [
    NODE_MODULES.map(function(name) { return new RegExp('^' + name) }),
  ],
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
