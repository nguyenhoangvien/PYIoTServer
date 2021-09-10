const devices = require('../models/device.model');
const {dateVN}    = require('../../common/service/common.service');
//Check add device in Admin Database
exports.checkAddDeviceAdminDB = (req, res, next) => {
    let series = req.params.series;
    devices.findDeviceAdminDB(series)
    .then((result) => {
        if(result.length > 0){
            res.status(200).json('Ok');
        }else{
            next();
        }
    })
    .catch((error) => {
        res.status(500).json('Error');
    })
}
//Add device in Admin Database
exports.addDeviceAdminDB = (req, res) => {
    let series = req.params.series;
    devices.addDeviceAdminDB(series)
    .then((result) => {
        res.status(200).json('Ok');
    })
    .catch((error) => {
        res.status(500).json('Error');   
    })
}
//Check exist device in Admin Database
exports.checkExistDeviceAdminDB = (req, res, next) => {
    let series = req.body.series;
    devices.findDeviceAdminDB(series)
    .then((result) => {
        if(result.length > 0){
            if(result[0].status === "Ready"){
                next();
            }else{
                res.status(201).json({
                    mgs: "Used"
                });    
            }
        }else{
            res.status(404).json({
                mgs: "Not exist"
            }); 
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: "Error"
        });
    })
}
//Register device in Admin Database
exports.registerDeviceAdminDB = (req, res, next) => {
    let idcustom = req.params.idcustom; 
    let series = req.body.series;
    devices.editDeviceAdminDB(idcustom, series)
    .then((result) => {
        if(result.status === idcustom){
            next();
        }else{
            res.status(404).json({
                mgs: "Error"
            });
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: "Error"
        });
    })
}
//Check exist device in Custom Database
exports.checkExistDeviceCustomDB = (req, res, next) => {
    let idcustom = req.params.idcustom;
    let series = req.body.series;
    devices.findDeviceCustomDB(idcustom, series)
    .then((result) => {
        if(result.length > 0){
            res.status(404).json({
                mgs: 'Used'
            }); 
        }else{
            next();
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        });    
    })
}

exports.addDeviceCustomDB = (req, res) => {
    let idcustom = req.params.idcustom; 
    devices.addDeviceCustomDB (idcustom, req.body)
    .then((result) => {
        res.status(200).json({
            mgs: 'Ok',
            inf: result
        });
    })
    .catch((error) => {
        return res.status(500).json({
            mgs: 'Error'
        });    
    })
}
//Check used device for add sensor and control
exports.checkUsedDevice = (req, res, next) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    devices.findDeviceCustomDB(idcustom, series)
    .then((result) => {
        if(result.length > 0){
            next();   
        }else{
            return res.status(404).json({
                mgs: 'Not exist'
            });
        }
    })
    .catch((error) => {
        return res.status(500).json({
            mgs: 'Error'
        });    
    })
}
//Edit device in Custom Database
exports.editDeviceCustomDB = (req, res) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    devices.editDeviceCustomDB(idcustom, series, req.body)
    .then((result) => {
        let info = {
            name: result.name,
            types: result.types,
            status: result.status
        }
        if(req.body.name == null){delete info.name}
        if(req.body.types == null){delete info.types}
        if(req.body.status == null){delete info.status}
        res.status(200).json({
            mgs: "Ok",
            inf: info
        })
    })
    .catch((error) => {
        return res.status(500).json({
            mgs: 'Error'
        });    
    })
}
//
exports.getIDcustom = (req, res) => {
    const serise = req.params.series;
    devices.findDeviceAdminDB(serise)
    .then((result) => {
        if(result[0].status !== 'Ready' && result.length > 0){
            res.status(200).json(result[0].status)
        }else{
            res.status(404).json('Not used') 
        }
    })
    .catch((error) => {
        return res.status(500).json('Error');    
    })
}