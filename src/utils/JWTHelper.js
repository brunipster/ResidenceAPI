const jwt = require('jsonwebtoken');
const { JWTSecret , JWTExpire} = require('@Utils/constants')

module.exports = {
    generateToken : (user) => {
        return jwt.sign({ user }, JWTSecret , {expiresIn:JWTExpire});
    }
}