/* 试卷相关的路由,该路由内的方法都需要登录才能访问 */

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.json({"result": "success", "message": ""});
});

module.exports = router;