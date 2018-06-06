const crypto = require('crypto');

module.exports = {

    /**
     * @param decrypted
     */
    encrypt: function (decrypted) {
        var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
        var crypted = cipher.update(decrypted.toString(), 'utf8', 'hex');
        crypted += cipher.final('hex');

        return crypted
    },

    /**
     * @param encrypted
     */
    decrypt: function (encrypted) {
        var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
        var decrypted = decipher.update(encrypted.toString(), 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted
    }

};