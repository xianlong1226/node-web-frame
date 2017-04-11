/* 外部访问的接口,该路由中的方法调用都不需要登录验证,但需要token验证,传输数据要加密 */

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.json({"result": "success", "message": ""});
});

module.exports = router;