const webpack = require('webpack');
const express =require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const nodeConfig = require('./server.config');

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, { 
  noInfo: true, 
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));
app.use(express.static('static'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET? POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,' +
    ' Content-Type, Accept');
  next();
});

app.listen(nodeConfig.server.port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.',
      nodeConfig.server.port, nodeConfig.server.port);
  }
});

module.exports = app;
