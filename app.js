var express = require('express');
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan');
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    session = require('express-session');


var routes = require('./routes/index');
var mongoose = require('mongoose');
mongoose.connect('mongodb://wssgcg1213:6884650@localhost:27017/wsvoter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
//app.use(bodyParser.json()); //不需要json
app.use(bodyParser.urlencoded());
app.use(cookieParser()); //解析cookie
app.use(session({ //session中间件
    genid: function(req) {
        return uuid.v4() // UUID生成唯一识别码
    },
    resave: false,
    saveUninitialized: true,
    secret: 'ZeroLing' //sec
}));

app.use('/wsvoter', express.static(path.join(__dirname, 'public')));  //设置静态路径
app.use('/wsvoter', routes); //路由

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// 以下是报错
//开发环境
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.end('error' + err.message);
    });
}

//线上环境报错
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end('error' + err.message);
});


module.exports = app;
