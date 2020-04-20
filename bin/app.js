const createError = require('http-errors');
const express = require('express');
const path = require('path');
const url = require('url');
const proxy = require('http-proxy-middleware');
const env = process.env.NODE_ENV;
const config = require('../config/config');
const app = express();

// 开发环境下，Node.js的express框架集成webpack即时编译
if(env === 'development'){
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.dev');
  const compiler = webpack(webpackConfig);
  // Node.js的express框架集成webpack即时编译
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    stats: {
      colors: true,
      chunks: false
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  }));
  // 热重载
  if(config.hmr){
    app.use(require('webpack-hot-middleware')(compiler));
  }
}

// 静态资源文件夹
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../api')));
app.use(express.static(path.join(__dirname, '../')));

// 本地json模拟远程服务器api  post请求转get
// 接口名字后面添加请求方式，与本地json一一映射
// 代理本地json模拟远程服务器api
app.use('/api/*', function (req, res, next) {
  let baseUrl = req.baseUrl;
  proxy('/api', {
    target: 'http://localhost:' + config.port,
    pathRewrite: function (path) {
      switch (req.method) {
      case 'POST':
        baseUrl += '_post';
        break;
      case 'GET':
        baseUrl += '_get';
        break;
      case 'DELETE':
        baseUrl += '_delete';
        break;
      case 'PUT':
        baseUrl += '_put';
        break;
      case 'PATCH':
        baseUrl += '_patch';
        break;
      }
      req.method = 'GET';
      let obj = url.parse(path);
      let search = obj.search;
      let pathDeletePre = baseUrl.replace(/^\/api/, '');
      let pathAddSuffix = pathDeletePre.replace(/$/, '.json');
      return pathAddSuffix + (search || '');
    }
  })(req, res);
});

// 代理服务器api
// 代理项目服务器api
app.use(`${config.api}/*`, proxy(`${config.api}`, {
  target: config.server,
  changeOrigin: false,
  ws: true,
  pathRewrite:{
    [config.api]: ''
  }
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  if(req.app.get('env') === 'development'){
    res.locals.error = err ;
  }else{
    res.locals.error = {};
  }

  let status = err.status || 500;
  // render the error page
  res.status(err.status || 500);
  res.end(status + '');
});

module.exports = app;
