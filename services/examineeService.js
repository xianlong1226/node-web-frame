/**处理考生信息的service */
const BaseService = require('./baseService.js');

class ExamineeService extends BaseService {
    constructor() {
        super(arguments);
    }

    //async函数会返回一个Promise对象
    //async函数的返回值会作为Promise对象then方法的参数
    //async函数内抛出的异常会导致Promise对象变为reject状态，抛出的错误会被Promise对象的catch方法接收到
    async checkExists(examNumber) {
        let currentObj = this;
        let examineeInfo;

        examineeInfo = await new Promise(function(resolve, reject) {//await关键字会等待Promise对象的执行结果
            currentObj.redis.hget("Exam.ATS.Examinees", examNumber, function(err, result) {
                if (err) {
                    return reject(err);
                }

                //这里需要我们手动捕获异常，因为这是在回调函数内部，Promise自己捕获不到该异常信息
                try {
                    if (result) {
                        result = JSON.parse(result);
                    }
                } catch (ex) {
                    return reject(ex);
                }
                return resolve(result);
            });
        });

        return examineeInfo;
    }
}

module.exports = ExamineeService;