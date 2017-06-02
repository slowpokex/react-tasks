var path = require('path');
var webpack = require('webpack')
var glob = require("glob");


module.exports = {

    devtool : "source-map",
    
    entry : glob.sync('./src/*.js'),

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "eslint-loader",
                include: [
                    path.resolve(__dirname, "src"),
                    ]
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'react-hot-loader'
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],

                use: [
                  {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "stage-0", "react"],
                        plugins: [ require('babel-plugin-transform-runtime') ]
                    }
                  }
                ]
            }
            ,{
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
             }                          
        ]
    }
}