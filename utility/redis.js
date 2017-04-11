const redis = require('redis');
let redisConfig = require('../config/db.config.js').redis;

let redisClient = redis.createClient(redisConfig.port, redisConfig.ip, redisConfig.options);

module.exports.redisClient = redisClient;