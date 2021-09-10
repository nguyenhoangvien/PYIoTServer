const crypto = require('crypto');
const jwt    = require('jsonwebtoken');
const secret = require('../config/evn.config').jwt_secret;
//For custom
exports.customAuth = (req, res, next) => {
    if(req.headers['authorization']) {
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).json({
                    mgs: "Failed"
                });
            }else{
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }
        }catch(err){
            return res.status(500).json({
                mgs: "Failed"
            });
        }
    }else{
        return res.status(403).json({
            mgs: "Failed"
        });
    }
};

exports.deviceAuth = (req, res, next) => {
    if(req.headers['VNSTECH']){
        let VNSTECH = req.headers['VNSTECH'];
        if(VNSTECH === secret){
            return next();
        }else{
            return res.status(401).json({
                mgs: "Failed"
            });
        }
    }else{
        return res.status(403).json({
            mgs: "Failed"
        });    
    }
}