const jwt = require('jsonwebtoken');
const tokenSecret = 'secretissecret';

module.exports = {

    /**
     * @param payload
     */
    issue: function (payload) {
        jwt.sign(payload, tokenSecret, {expiresIn: '7d'})
    },

    /**
     * @param token
     */
    verify: function (token) {
        jwt.verify(token, tokenSecret)
    }
};