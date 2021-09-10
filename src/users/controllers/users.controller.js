const crypto     = require('crypto');
const Users = require('../models/users.model');
const {dateVN, sendMail}    = require('../../common/service/common.service');

exports.registers = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
                     .update(req.body.passwd)
                     .digest("base64");
    req.body.passwd = salt + "$" + hash;
    req.body.permissionLevel = 1;
    Users.findByEmail(req.body.email)
    .then((result) => {
        if(result.length >= 1){
            res.status(404).json({
                mgs: 'Email exist'
            })
        }else{
            Users.createUser(req.body)
            .then((result) => {
                const text = {
                    from: 'Custom Service',
                    to: result.email,
                    subject: 'Thông báo đăng kí',
                    html: '<p>Xin chào ' 
                        + result.name + 
                        ' bạn đã tạo tài khoản mới trên hệ thống: </p><ul><li>Email: ' 
                        + result.email + 
                        '</li><li>Mã tài khoản: ' 
                        + result._id + '</li></ul>'
                }
                sendMail(text);
                //const created = dateVN(result.created);
                res.status(201).json({
                    mgs: 'Ok'
                });
            });
        } 
    })
};

exports.loadUser = (req, res) => {
    let email = req.body.email;
    Users.findByEmail(email)
    .then((result) => {
        if(result.length >= 1){
            res.status(201).json({
                mgs: "Ok",
                name: result[0].name,
                idcustom: result[0]._id
            })
        }else{
            res.status(404).json({
                mgs: "Mail not exist"
            })
        }
    })
}
