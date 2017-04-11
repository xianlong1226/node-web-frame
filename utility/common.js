const crypto = require('crypto');

let CommonMethod = {
    encrypt: function(plaintext) {
        if (!plaintext) {
            return "";
        }
        let key = new Buffer('atsexam@123'.substr(0, 8));
        let iv = new Buffer('atsexam@123');
        let cipher = crypto.createCipheriv('des', key, iv);
        cipher.setAutoPadding(true) //default true
        let ciph = cipher.update(plaintext, 'utf8', 'base64');
        ciph += cipher.final('base64');
        return ciph;
    },
    decrypt: function(encrypt_text) {
        if (!encrypt_text) {
            return "";
        }
        let key = new Buffer('atsexam@123'.substr(0, 8));
        let iv = new Buffer('atsexam@123');
        let decipher = crypto.createDecipheriv('des', key, iv);
        decipher.setAutoPadding(true);
        let txt = decipher.update(encrypt_text, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    },
    md5: function(str){
        let md5 = crypto.createHash('md5');
        md5.update(str.toString());
        let jm = md5.digest('hex').toLowerCase();
        return jm;
    }
}

module.exports = CommonMethod;