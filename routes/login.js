/* 登录和退出的接口,该路由中的方法调用都不需要登录验证 */

const passport = require('passport');
let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.json({"result": "success", "message": ""});
});

//登录方式1
//设置successFlash或failureFlash时，需要req.flash()，但是express 3.x后该方法被删除了，所以需要引入connect-flash来实现。
router.post('/login1', passport.authenticate('local', {
	successFlash: true,
	successRedirect: '/login/loginchecksuccess',
	failureFlash: true,
	failureRedirect: '/login/logincheckfail'
}));
//登录成功的事件
router.get('/loginchecksuccess', function(req, res) {
	let message = req.flash('success');
	if (message) {
		message = message[0];
	}
	res.json({
		"result": "success",
		"message": message
	});
});
//登录失败的事件
router.get('/logincheckfail', function(req, res) {
	let message = req.flash('fail');
	if (message) {
		message = message[0];
	}
	res.json({
		"result": "fail",
		"message": message
	});
});

//登录方式2
router.post('/login2', passport.authenticate('local', {
	successFlash: true,
	failureFlash: true
}), function(req, res, next) {
	//至于策略验证成功才会调用该方法。如果验证失败需要像登录方式1一样指定失败时调用的函数或者在页面中判断返回状态401。
	let message = req.flash('success');
	if (message) {
		message = message[0];
	}
	res.json({
		"result": "success",
		"message": message
	});
});

//登录方式3
//如果上述两种内置的方式都无法满足你的需求，那么你可以通过直接调用的方式验证。
router.post('/login3', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		//err user info 分别对应策略中传入done()函数中的值。
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({"result": "fail","message": info.message});
		}
		//这种方式需要我们自己调用req.logIn方法来建立session。
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return res.json({"result": "success","message": info.message});
		});

	})(req, res, next);
});

//退出登录
router.post('/logout', function(req, res) {
	req.logout();
	res.json({
		"result": "success",
		"message": "退出成功"
	});
});

module.exports = router;