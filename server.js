var http    	= require('http');
var ip      	= require('ip');
var port    	= process.env.PORT || 3000;
var express     = require('express');
var app         = express();
var server  	= http.Server(app);
var io          = require('./src/socketio/socket').init(server);

console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + port);
server.listen(port);


io.on("connection", function(socket){
    console.log("Connect: " + socket.id);
    
})

var morgan      = require('morgan');
//const commonService = require('./src/common/service/common.service');
const Devices = require('./src/api/router.config');
const Users   = require('./src/users/router.config');
const Auth    = require('./src/authorization/router.config');



app.use(morgan('dev'));
app.use(express.json());

Auth.routesConfig(app);
Users.routesConfig(app);
Devices.routesConfig(app);

app.use(express.urlencoded({extended: true}));//