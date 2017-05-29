var path = require('path');
var webpack = require('webpack');

module.exports = {
    
    devtool : "source-map",
    
    entry : [
        "./src/index",
        "babel-polyfill",
        "webpack-hot-middleware/client"
        ],

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
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "stage-0", "react"],
                        plugins: [ require('babel-plugin-transform-runtime') ]
                    }
                }
            }
        ]
    }
}