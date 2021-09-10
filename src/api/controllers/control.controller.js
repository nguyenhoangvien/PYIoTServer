const controls = require('../models/control.model');
const io = require('../../socketio/socket').getIO();

exports.checkExistControl = (req, res, next) => {
    let ID = req.body.addr + '.' + req.body.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    controls.findOneControl(idcustom, series, ID)
    .then((result) => {
        if(result.lentgh > 0){
            res.status(404).json({
                mgs: 'Control exist'
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

exports.checkNumControl = (req, res, next) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    controls.findAllControl(idcustom, series)
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

exports.addControl = (req, res) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    controls.addControl(idcustom, series, req.body)
    .then((result) => {
        let info = {
            ID: result.ID,
            name: result.name,
            mode: result.mode,
            index: result.index,
            status: result.status,
            lim_on: result.lim_on,
            lim_off: result.lim_off
        }
        res.status(200).json({
            mgs: 'Ok',
            inf: info
        })
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}

exports.getOneValue = (req, res) => {
    let ID = req.params.addr + '.' + req.params.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    let value = req.params.value;
    controls.findOneControl(idcustom, series, ID)
    .then((result) => {
        let data;
        if     (value === 'V0'){data = result[0].status;}
        else if(value === 'V1'){data = result[0].mode;}
        else if(value === 'V2'){data = result[0].index;}
        else if(value === 'V3'){data = result[0].lim_on;}
        else if(value === 'V4'){data = result[0].lim_off;}
        else if(value === 'V5'){data = result[0].name;}
        res.status(200).json(data)
    })
    .catch((error) => {
        res.status(500).json('Error')
    })
}
exports.getAllValue = (req, res) => {
    let ID = req.params.addr + '.' + req.params.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    controls.findOneControl(idcustom, series, ID)
    .then((result) => {
        res.status(200).json({
            mgs: 'Ok',
            inf: {
                name: result[0].name,
                mode: result[0].mode,
                index: result[0].index,
                status: result[0].status,
                lim_on: result[0].lim_on,
                lim_off: result[0].lim_off
            }
        })
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })    
}
exports.getAllControl = (req, res) => {
    let idcustom = req.params.idcustom;
    let series = req.params.series;      
    controls.findAllControl(idcustom, series)
    .then((result) => {
        res.status(200).json({
            mgs: 'Ok',
            inf: result
        })
    })
    .catch((error) => {
        res.status(500).json({
            mgs: 'Error'
        })
    })
}
exports.editOneValue = (req, res) => {
    let ID = req.params.addr + '.' + req.params.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;    
    let value = req.params.value;
    let val = req.body[0];
    let dat1;
    if     (value === 'V0'){dat1 = {status: val}}
    else if(value === 'V1'){dat1 = {mode: val}}
    else if(value === 'V2'){dat1 = {index: val}}
    else if(value === 'V3'){dat1 = {lim_on: val}}
    else if(value === 'V4'){dat1 = {lim_off: val}}
    else if(value === 'V5'){dat1 = {name: val}}
    controls.editControl(idcustom, series, ID, dat1)
    .then((result) => {
        let dat2;
        if     (value === 'V0'){dat2 = result.status;}
        else if(value === 'V1'){dat2 = result.mode;}
        else if(value === 'V2'){dat2 = result.index;}
        else if(value === 'V3'){dat2 = result.lim_on;}
        else if(value === 'V4'){dat2 = result.lim_off;}
        else if(value === 'V5'){dat2 = result.name;}
        res.status(200).json(dat2)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('Error')
    })
}
exports.editAllValue = (req, res) => {
    let ID = req.params.addr + '.' + req.params.id;
    let idcustom = req.params.idcustom;
    let series = req.params.series;
    controls.editControl(idcustom, series, ID, req.body)
    .then((result) => {
        let inf = {
            ID: result.ID,
            _id: result._id,
            name: result.name,
            mode: result.mode,
            index: result.index,
            status: result.status,
            lim_on: result.lim_on,
            lim_off: result.lim_off, 
        }
        if(req.body.name    == null){delete inf.name}
        if(req.body.mode    == null){delete inf.mode}
        if(req.body.index   == null){delete inf.index}
        if(req.body.status  == null){delete inf.status}
        if(req.body.lim_on  == null){delete inf.lim_on}
        if(req.body.lim_off == null){delete inf.lim_off}
        res.status(200).json({
            mgs: 'Ok',
            inf: inf
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            mgs: 'Error'
        })
    })    
}