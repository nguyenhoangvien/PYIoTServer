const devices = require('./controllers/device.controller');
const sensors = require('./controllers/sensor.controller');
const controls = require('./controllers/control.controller');
const auth = require('../common/middleware/auth.validation.middleware');

exports.routesConfig = function(app){
    //Add device in Admin Database
    app.get('/active/:series', [
        devices.checkAddDeviceAdminDB,
        devices.addDeviceAdminDB
    ])
    //Load ID custom
    app.get('/idcustom/:series', [
        devices.getIDcustom
    ])
    //Add device in Custom Database
    app.post('/device/:idcustom', [
        devices.checkExistDeviceAdminDB,
        devices.registerDeviceAdminDB,
        devices.checkExistDeviceCustomDB,
        devices.addDeviceCustomDB
    ])
    //Edit info device in Custom Database
    app.put('/device/edit/:idcustom/:series', [
        devices.editDeviceCustomDB
    ])
/****************************CONTROL****************************/
    //Add control
    app.post('/control/:idcustom/:series', [
        auth.customAuth,
        devices.checkUsedDevice,
        controls.checkExistControl,
        controls.checkNumControl,
        controls.addControl
    ])
    //Get one value for device GPRS
    app.get('/conrol/:idcustom/:series/:addr/:id/:value', [
        controls.getOneValue,
    ])
    //Edit one value for device GPRS
    app.put('/conrol/:idcustom/:series/:addr/:id/:value', [
        controls.editOneValue
    ])
    //Get all value for device Wifi
    app.get('/conrol/:idcustom/:series/:addr/:id', [
        auth.deviceAuth,
        controls.getAllValue    
    ])
    //Edit all value for device Wifi
    app.put('/conrol/:idcustom/:series/:addr/:id', [
        auth.deviceAuth,
        controls.editAllValue    
    ])
    //Get all control for app moblie
    app.get('/conrol/:idcustom/:series', [
        auth.customAuth,
        controls.getAllControl
    ])
/****************************SENSOR****************************/
    //Add sensor
    app.post('/sensor/:idcustom/:series', [
        auth.customAuth,
        devices.checkUsedDevice,
        sensors.checkExistSensor,
        sensors.checkNumSensor,
        sensors.addSensor
    ])
    //Update value for device GPRS
    app.put('/sensor/:idcustom/:series/:addr/:id/:value', [
        sensors.updateValueSensor
    ])
    //Update value for device Wifi
    app.put('/sensor/:idcustom/:series/:addr/:id', [
        auth.deviceAuth,
        sensors.updateValueSensor
    ])
    //Edit 
    app.put('/sensor/:idcustom/:series', [
        auth.customAuth,
        sensors.editInfoSensor
    ])
    //Get one value
    app.get('/sensor/:idcustom/:series/:addr/:id', [
        auth.customAuth,
        sensors.getNewValue
    ])
    //Get all value
    app.get('/sensor/:idcustom/:series', [
        auth.customAuth,
        sensors.getAllValue
    ])

}