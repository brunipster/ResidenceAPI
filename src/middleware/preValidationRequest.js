const jwt = require('jsonwebtoken')
const {JWTSecret} = require('@Utils/constants')
const User = require('@Models/User');

async function validateRoleUser(id, roles,res) {
    try {
        const user = await User.findOne({_id:id}).exec();
        if(user){
            if(roles.includes(user.rol)){
                return true
            }else{
                res.status(401).send("Access Denied");
            }
        }else{
            res.status(404).send("User not found");
        }
    } catch (error) {
        res.status(500).send("Unexpected Error");
    }
}

function executeService(fn,req, res, next){
    const routePromise = fn(req, res, next)
    if (routePromise.catch) {
        routePromise.catch(err => {
            return res.status(500).json({message: "Unexpected Error"});
        })
    }
}

module.exports = function (fn,roles = []) {
    return async (req,res,next) => {
        if(roles.length > 0){
            const JWToken = req.headers["x-access-token"];
            if(!JWToken) return res.status(403).json({message: "No token provided"})
            else {
                try {
                    const { user } = jwt.verify(JWToken,JWTSecret);
                    const resultValidateUser = await validateRoleUser(user,roles,res);
                    if(resultValidateUser){
                        executeService(fn,req, res, next);
                    }
                } catch (err) {
                    switch(err.name){
                        case "JsonWebTokenError":
                            return res.status(403).send("Token malformed");
                        case "TokenExpiredError":
                            return res.status(403).send("Token Expired");
                        default:
                            console.error("[ERROR]:Controller Error",err.message)
                            return res.status(500).json("Unexpected Error");
                    }
                }
            }
        }else{
            executeService(fn,req, res, next);
        }
    }
}