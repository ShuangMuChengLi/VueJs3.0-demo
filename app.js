const createError = require('http-errors');
const express = require('express');
const path = require('path');
const url = require('url');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// webpack配置
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev');
const compiler = webpack(config);
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// 静态资源文件夹
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "api")));

// 本地json模拟远程服务器api  post请求转get
app.use('/api/*', function (req , res, next) {
    console.log(111)
    if(req.method === "POST"){
        req.method = "GET";
    }
    next();
});
// 代理本地json模拟远程服务器api
const apiProxyLocal = proxy('/api', {
    target: 'http://localhost:3000',
    pathRewrite: function (path) {
        let obj = url.parse(path);
        let search = obj.search;
        let pathname = obj.pathname;
        let first = pathname.replace(/^\/api/ , "");
        let two = first.replace(/$/ , ".json");
        console.log(two)
        return two + (search || "");
    }
});
app.use('/api/*', apiProxyLocal);

// 代理服务器api
const apiProxyRemote = proxy('/xlcloud-custody-webapp', {
    target: 'http://10.130.146.29:8220',
    changeOrigin: false,
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/xlcloud-custody-webapp': '',     // rewrite path
    },
});
app.use('/xlcloud-custody-webapp/*', apiProxyRemote);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
