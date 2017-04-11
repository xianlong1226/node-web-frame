/**所有service的基类 */
const config = require('../config/config.js');
const pg = require('../utility/pg.js');
const redis = require('../utility/redis.js').redisClient;

class BaseService{
    constructor(){
        this.pg = pg;
        this.redis = redis;
        this.config = config;
    }

    log(message){
        if(config.debug){
            console.log(message);
        }
    }
}

module.exports = BaseService;