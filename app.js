const createError = require('http-errors');
const express = require('express');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev');
const compiler = webpack(config);
const app = express();
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use('/api', proxy({
    target: 'http://www.example.org',
    pathRewrite: {
        '^/api/old-path': '/api/new-path',     // rewrite path
    },
    ws: true,
    changeOrigin: true
}));
app.use('/local-api', proxy({
    target: 'http://localhost:3000',
    pathRewrite: function (path, req) {
        path = path.replace(/^\/local-api\/json/ ,"/json/");
        path = path.replace(/$/ ,".json");
        return path;
    },
    changeOrigin: true
}));

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
