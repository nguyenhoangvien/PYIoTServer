const config        = require('../../common/config/evn.config');
const mongoose      = require('mongoose');
const url           = config.mongoose.url;
const key           = config.mongoose.key;
const { 
    options, 
    controlSchema
}                   = require('../../common/service/common.service');
//Find all control
exports.findAllControl = (idcustom, series) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let controls = custom.model("control-" + series, controlSchema); 
    return controls.find()
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}
//Find one control
exports.findOneControl = (idcustom, series, ID) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let controls = custom.model("control-" + series, controlSchema); 
    return controls.find({ID: ID})
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}
//Add control
exports.addControl = (idcustom, series, info) => {
    let data = {
        ID: info.addr + '.' + info.id,
        name: info.name
    }
    let custom = mongoose.createConnection(url + idcustom + key, options);  
    let controls = custom.model("control-" + series, controlSchema); 
    let control = new controls(data);
    return control.save()
    .then((result) => {
        mongoose.disconnect();
        return result;    
    })
}
//Edit control
exports.editControl = (idcustom, series, ID, info) => {
    let custom = mongoose.createConnection(url + idcustom + key, options);
    let controls = custom.model("control-" + series, controlSchema);
    return controls.findOneAndUpdate({ID: ID}, info, {new: true})    
    .then((result) => {
        mongoose.disconnect();
        return result;   
    })
}
