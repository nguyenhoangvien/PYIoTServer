
const config        = require('../../common/config/evn.config');
const mongoose      = require('mongoose');
const url           = config.mongoose.url;
const key           = config.mongoose.key;
const {options, deviceSchema, activeSchema} = require('../../common/service/common.service');

//Find device in Admin Database
exports.findDeviceAdminDB = (series) => {
    let admin = mongoose.createConnection(url + 'admin' + key, options); 
    let devices = admin.model('device', activeSchema);   
    return devices.find({series: series})
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}
//Add device in Admin Database
exports.addDeviceAdminDB = (series) => {
    let admin = mongoose.createConnection(url + 'admin' + key, options);
    let devices = admin.model('device', activeSchema);
    let device = new devices({series: series});  
    return device.save()
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
}
//Edit status device in Admin Database
exports.editDeviceAdminDB = (idcustom, series) => {
    let admin = mongoose.createConnection(url + 'admin' + key, options);
    let devices = admin.model('device', activeSchema);
    return devices.findOneAndUpdate({series: series}, {status: idcustom}, {new: true})
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
}
//Find device in Custom Database
exports.findDeviceCustomDB = (idcustom, series) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);
    let devices = custom.model('device', deviceSchema);
    return devices.find({series: series})
    .then((result) => {
        mongoose.disconnect();
        return result;   
    })
}
//Add device in Custom Database
exports.addDeviceCustomDB = (idcustom, info) => {
    let custom = mongoose.createConnection(url + idcustom + key, options); 
    let devices = custom.model('device', deviceSchema);
    let device = new devices(info);
    return device.save()
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
}

exports.editDeviceCustomDB = (idcustom, series, info) => {
    let custom = mongoose.createConnection(url + idcustom + key, options); 
    let devices = custom.model('device', deviceSchema);
    return devices.findOneAndUpdate({series: series}, info, {new: true})
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
}
