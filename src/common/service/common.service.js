const mongoose    = require('mongoose');
const nodemailer  = require('nodemailer');
const moment      = require('moment-timezone');
const Schema      = mongoose.Schema;
const config      = require('../../common/config/evn.config');
const transporter =  nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: config.gmail.user,
        pass: config.gmail.pass
    }
});

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true, 
};

const dateVN = (time) => {
    return moment.tz(time, "Asia/Ho_Chi_Minh").format();
};

const sendMail = (mailOptions) => {
    transporter.verify(function(error, success) {
        if(error){
            console.log(error);
        }else{
            console.log('Kết nối thành công!');
            transporter.sendMail(mailOptions, function(error, info) {
                if(error){
                    console.log(error);
                }else{
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}

const userSchema = new Schema({
    email: String,
    name: String,
    passwd: String,
    permissionLevel: Number,
    created: {
        type: Date,
        default: Date.now()
    }
});

const activeSchema = new Schema({
    series: String,
    status: {
        type: String,
        default: "Ready"
    },
    active: {
        type: Date,
        default: Date.now()
    }  
});

const deviceSchema = new Schema({
    status: {
        type: Number,
        default: 0
    },
    series: {
        type: String,
        default: "VNS23110000"
    },
    types: {
        type: String,
        default: "ON BOARD"
    },
    name: {
        type: String,
        default: "CPU"
    }
})

const controlSchema = new Schema({
    ID: String,
    name: {
        type: String,
        default: "Button"
    },
    mode: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: 32
    },
    lim_on: {
        type: Number,
        default: 0.0
    },
    lim_off: {
        type: Number,
        default: 0.0
    }
});

const sensorSchema = new Schema({
    ID: String,
    name: {
        type: String,
        default: "Sensor"
    },
    unit: {
        type: String,
        default: "(%)"
    },
    info: [{
        value: {
            type: Number,
            default: 0
        }
    }]
});

module.exports = { 
    dateVN: dateVN,
    options: options,
    sendMail: sendMail,
    userSchema: userSchema,
    sensorSchema: sensorSchema,
    activeSchema: activeSchema,
    deviceSchema: deviceSchema,
    controlSchema: controlSchema
}