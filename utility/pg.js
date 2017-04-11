const pg = require('pg');
let pgConfig = require('../config/db.config.js').pg;

function exec(sql, params) {
    return new Promise(function(resolve, reject) {
        pg.connect(pgConfig, function(err, client, done) {
            if (err) {
                done();
                reject(err);
            }
            
            client.query(sql, params, function(err, result) {
                done();
                if(err){
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}

class PostgresService {
    constructor() {

    }
    static async exec(sql, params) {
        let result = await exec(sql, params);
        return result;
    }
    static async multiExec(){
        let resultArr = [];
        for(let i = 0;i < arguments.length;i += 2){
            let result = await exec(arguments[i], arguments[i + 1]);
            resultArr.push(result);
        }

        return resultArr;
    }
}

module.exports = PostgresService;