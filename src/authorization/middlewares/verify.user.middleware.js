const Users  = require('../../users/models/users.model');
const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    if(req.body){
        if(!req.body.email){
            errors.push('Missing email field');
        }
        if(!req.body.passwd){
            errors.push('Missing password field');
        }
        if(errors.length){
            return res.status(400).send({mgs: errors.join(',')});
        }else{
            return next();
        }
    }else{
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    
    Users.findByEmail(req.body.email)
    .then((user) => {
        
        if(!user[0]){
            res.status(404).json({});
        }else{
            let passwordFields = user[0].passwd.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.passwd).digest("base64");
            if(hash === passwordFields[1]) {
                req.body = {
                    userId: user[0]._id,
                    email: user[0].email,
                    permissionLevel: user[0].permissionLevel,
                    provider: 'email',
                    name: user[0].firstName + ' ' + user[0].lastName,
                };
                return next();
            }else{
                return res.status(400).json({errors: 'Failed'});
            }
        }
    });
};