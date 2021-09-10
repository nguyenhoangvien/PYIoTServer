
const config        = require('../../common/config/evn.config');
const mongoose      = require('mongoose');
const url           = config.mongoose.url;
const key           = config.mongoose.key;
const { 
    options, 
    sensorSchema }  = require('../../common/service/common.service');

exports.findAllSensor = (idcustom, series) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let sensors = custom.model("sensor-" + series, sensorSchema); 
    return sensors.find()
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}

exports.findOneSensor = (idcustom, series, ID) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let sensors = custom.model("sensor-" + series, sensorSchema); 
    return sensors.find({ID: ID}) 
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}

exports.addSensor = (idcustom, series, info) => {
    let data = {
        ID: info.addr + '.' + info.id,
        name: info.name,
        unit: info.unit,
        info: [{
            value: 0
        }]
    }
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let sensors = custom.model("sensor-" + series, sensorSchema); 
    let sensor = new sensors(data);
    return sensor.save()
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}

exports.updateValueSensor = (idcustom, series, ID, info) => {
    let value = {"value": info}
    let custom = mongoose.createConnection(url + idcustom + key, options);
    let sensors = custom.model("sensor-" + series, sensorSchema);
    return sensors.findOneAndUpdate({ID: ID}, {$push: {info: value}}, {new: true})    
    .then((result) => {
        mongoose.disconnect();
        return result;   
    })
}

exports.editInfoSensor = (idcustom, series, info) => {
    let ID = info.addr + '.' + info.id;  
    let custom = mongoose.createConnection(url + idcustom + key, options);
    let monitors = custom.model("sensor-" + series, sensorSchema); 
    return monitors.findOneAndUpdate({ID: ID}, info, {new: true})    
    .then((result) => {
        mongoose.disconnect();
        return result;
    })
}