/* 其他的接口 */

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.json({"result": "success", "message": ""});
});

module.exports = router;