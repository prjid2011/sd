'use strict';

// Modules
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';
console.log(ENV);

module.exports = function makeWebpackConfig() {
  /**
   Config
  **/
  const config = {};

  /**
   * Entry
   */
  config.entry = {
    app: './src/app/app.js'
  };

  config.output = {
    // Absolute output directory
    path: __dirname + '/dist',
    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
 
    config.devtool = 'eval-source-map';

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  // Initialize module
  config.module = {
    rules: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
		test: /\.js$/,
		exclude: /node_modules/,
		use: [{
		    loader: 'babel-loader',
		    options: {
			    presets: ['@babel/preset-env']
		    }
		}]
    }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
   
		test: /\.scss$/,
		use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
     /* test: /\.html$/,
      loader: 'raw-loader'*/
	  test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
	}, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ] 
    }]
  };
  
  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
	  new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ];

  // Skip rendering index.html in test mode
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
  config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      //new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    )


  /**
   * Dev server configuration
   */
  config.devServer = {
    contentBase: './src/public'
   /* stats: 'minimal',
    host: '0.0.0.0'*/
  };
  return config;
}();
