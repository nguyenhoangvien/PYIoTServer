const jwtSecret = require('../../common/config/evn.config').jwt_secret
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = (req, res) => {
    try{
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(200).json({
            mgs: "Ok",
            token: token
        });
    }catch (err){
        res.status(500).json({
            mgs: err
        });
    }
};