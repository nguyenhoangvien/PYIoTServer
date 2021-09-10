const Users = require('./controllers/users.controller');
const Auth = require('../common/middleware/auth.validation.middleware');

exports.routesConfig = function (app){
    app.post('/user/registers', [
        Users.registers
    ]);
    
    app.post('/user/load/info', [
        Auth.customAuth,
        Users.loadUser
    ]);
    
}