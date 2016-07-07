var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
var webpack = require('webpack');
var atImport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var bemLinter = require('postcss-bem-linter');
var autoprefixer = require('autoprefixer');
//
var vars = require('postcss-advanced-variables');
var nested = require('postcss-nested');
var flexbugs = require('postcss-flexbugs-fixes');



module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry    : {
    todos: ['webpack-hot-middleware/client', './app/index.js'],
    vendor: ['react']
  },
  output   : {
    path    : path.join(__dirname, 'static'),
    filename: 'js/[name].js',
    publicPath: '/static/'
  },
  resolve  : {
    root: ['node_modules', 'app'],
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions        : ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module   : {
    loaders: [{
      test   : /\.js[x]?$/,
      exclude: /node_modules/,
      loader : 'babel-loader'
    }, {
      test  : /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
      test  : /\.(png|jpg)$/,
      loader: 'file-loader?name=images/[name].[ext]'
    }, {
      test  : /\.woff$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    }]
  },
  externals: {},
  postcss  : [
    atImport({path: ['node_modules', './app']}),
    vars(),
    nested(),
    flexbugs(),
    autoprefixer(),
    bemLinter(),
    customProperties()],
  plugins  : [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.js"),
    new FlowStatusWebpackPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
