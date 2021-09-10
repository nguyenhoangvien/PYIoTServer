const sensors = require('../models/sensor.model');
const {dateVN} = require('../../common/service/common.service');
//const io = require('../../socketio/socket').getIO();

exports.checkExistSensor = (req, res, next) => {
    let ID = req.body.addr + '.' + req.body.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    sensors.findOneSensor(idcustom, series, ID)
    .then((result) => {
        if(result.length > 0){
            res.status(404).json({
                mgs: 'Sensor exist'
            })   
        }else{
            next();
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}

exports.checkNumSensor = (req, res, next) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    sensors.findAllSensor(idcustom, series)
    .then((result) => {
        if(result.lentgh > 127){
            res.status(404).json({
                mgs: 'Over load'
            })
        }else{
            next();    
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}

exports.addSensor = (req, res) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    sensors.addSensor(idcustom, series, req.body)
    .then((result) => {
        let inf = {
            ID: result.ID,
            name: result.name,
            unit: result.unit,
            info: [{
                value: result.info[0].value,
            }]
        }
        res.status(200).json({
            mgs: 'Ok',
            inf: inf
        })
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}

exports.updateValueSensor = (req, res) => {
    let ID = req.params.addr + '.' + req.params.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    let value = req.params.value;
    if(value === 'V0'){
        sensors.updateValueSensor(idcustom, series, ID, req.body[0])
        .then((result) => {
            let len = result.info.length
            res.status(200).json(result.info[len - 1].value)
        })
        .catch((error) => {
            res.status(500).json('Error 1')
        })
    }else if(value === 'V1' || value === 'V2'){
        res.status(500).json('Error 2')
    }else if(value === undefined){
        sensors.updateValueSensor(idcustom, series, ID, req.body.value)
        .then((result) => {
            let len = result.info.length
            res.status(200).json({
                mgs: 'Ok',
                inf: result.info[len - 1].value
            })
        })
        .catch((error) => {
            res.status(500).json({
                mgs: 'Error'
            })
        })
    }
}

exports.editInfoSensor = (req, res) => {
    let series = req.params.series;
    let idcustom = req.params.idcustom;
    sensors.editInfoSensor(idcustom, series, req.body)
    .then((result) => {
        res.status(200).json({
            mgs: "Ok",
            inf: {
                ID: result.ID,
                name: result.name,
                unit: result.unit
            }
        })    
    })
}

exports.getNewValue = (req, res) => {
    let series = req.params.series;
    let idcustom = req.params.idcustom;
    let ID = req.params.addr + '.' + req.params.id;
    sensors.findOneSensor(idcustom, series, ID)
    .then((result) => {
        let len = result[0].info.length;
        res.status(200).json({
            mgs: "Ok",
            inf: {
                ID: result.ID,
                name: result.name,
                info: {
                    value: result[0].info[len - 1].value,
                    time: dateVN(result[0].info[len - 1]._id.getTimestamp())
                }
            }
        })    
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}

exports.getAllValue = (req, res) => {
    let series = req.params.series;
    let idcustom = req.params.idcustom;
    sensors.findAllSensor(idcustom, series)
    .then((result) => {
        let i = 0;
        let n_sensor = result.length;
        var data = [];
        if(n_sensor > 0){
            for(i = 0; i < n_sensor; i++){
                let n_val = result[i].info.length;
                data[i] = {
                    ID: result[i].ID,
                    _id: result[i]._id,
                    name: result[i].name,
                    unit: result[i].unit,
                    value: result[i].info[n_val - 1].value
                }
            }
            res.status(200).json({
                mgs: 'Ok',
                inf: data
            }) 
        }else{
            res.status(404).json({
                mgs: 'Not found'
            }) 
        }
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}