const config        = require('../../common/config/evn.config');
const mongoose      = require('mongoose');
const url           = config.mongoose.url;
const key           = config.mongoose.key;
const { userSchema, 
        options }   = require('../../common/service/common.service')

exports.findByEmail = (email) => {
    let connect = mongoose.createConnection(url + 'admin' + key, options);
    let Users = connect.model('user', userSchema);
    return Users.find({email: email})
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
};

exports.findById = (id) => {
    let connect = mongoose.createConnection(url + 'admin' + key, options);
    let Users = connect.model('user', userSchema);
    return Users.findById(id)
    .then((result) => {
        mongoose.disconnect();
        return result;
    });
};

exports.createUser = (userData) => {
    let connect = mongoose.createConnection(url + 'admin' + key, options);
    let Users = connect.model('user', userSchema);
    let user = new Users(userData);
    return user.save()
    .then((result) => {
        mongoose.disconnect();
        return result;     
    })
};