const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const ejs = require('ejs');
const flash = require('connect-flash');

let app = express();

//持久化session到redis，passport必须
app.use(session({
	store: new RedisStore({host: '127.0.0.1', port: 6379, ttl: 60 * 60 * 24, prefix: 'passport:'}),
	name: 'test',//cookie名
	secret: '12345',
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	},
	resave: false,//官方文档强烈建议设置为false
	saveUninitialized: false //官方文档强烈建议设置为false
}));

//初始化passport,passport必须
app.use(passport.initialize());
//如果要持久化登陆session，注意在这之前要先使用express.session()
app.use(passport.session());

//序列化用户信息,passport必须
passport.serializeUser(function(user, done) {
	done(null, user);
});
//反序列化用户信息,passport必须
passport.deserializeUser(function(user, done) {
	done(null, user);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(flash());

//配置全局公共方法库
global.tool = require('./utility/common.js');

//配置路由,文件名就是路有名
let routesArr = fs.readdirSync('./routes','utf8');
routesArr.forEach(function(filename, index, arr){
    app.use('/' + path.basename(filename,path.extname(filename)), require('./routes/' + filename));
});

//配置service,文件名就是service的名字，所有文件都要以Service.js结尾。
let servicesArr = fs.readdirSync('./services','utf8');
servicesArr.forEach(function(filename, index, arr){
    if(!filename.endsWith('Service.js')){
        throw Error('service ' + filename + ' end no with Service suffix');
    }
    let _service = require('./services/' + filename);
    global[path.basename(filename,path.extname(filename))] = new _service();
});

//template engine
// app.set('views', path.join(__dirname, 'views')); //设置res.render函数查找的目录
// app.engine('.html', ejs.__express); //设置模板引擎为html
// app.set('view engine', 'html');

//static file
app.use('/page',express.static(__dirname + '/static/page'));
app.use('/js',express.static(__dirname + '/static/js'));
app.use('/css',express.static(__dirname + '/static/css'));
app.use('/images',express.static(__dirname + '/static/images'));
app.use('/mobile',express.static(__dirname + '/static/mobile'));

//使用passport的local策略
passport.use(require('./passport_strategys/local.js'));

//刷新session信息，如果你想要执行每次请求的时候都更新过期时间，那么必须写这个
app.use(function(req, res, next) {
    if(req.session){
        req.session.a = Date();
        //req.session.touch();//不需要显示调用，session中间件会自动做
    }
	next();
});

// 处理404
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 这里处理所有传递给next()的err
// 开发环境处理
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(err.status || 500);
		res.json({"result":"error","message":err.stack});
	});
} else {
	// 生产环境处理
	app.use(function(err, req, res, next) {
		console.error(err.stack);
		res.status(err.status || 500);
		res.json({"result":"error","message":err.stack});
	});
}

//监听端口
let port = process.env.PORT || 3021;
app.listen(port, function(req, res) {
	console.log('listen http://127.0.0.1:' + port);
});

module.exports = app;