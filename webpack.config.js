var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool : 'eval-source-map',
    
  entry : glob.sync('./src/**/*.{js,jsx}'),

  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('./styles.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js'
    })
  ],

  module: {
        
    rules: [
        {
          test: /\.js?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          include: [
            path.resolve(__dirname, 'src'),
          ]
        },
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'react-hot-loader'
        },
        {
          test: /\.js?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],

          use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'stage-0', 'react'],
                  plugins: [ require('babel-plugin-transform-runtime') ]
              }
            }
          ]
          }
        ,{
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
            publicPath: '/'
          })
        }
    ]
  }
};
