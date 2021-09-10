module.exports = {
    "jwt_secret": "6@49A8521073Qk",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    /*
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    */
    "mongoose": {
        "url": "mongodb://HoangVien:thienthu@103.107.182.214:27017/",
        "key": "?authSource=admin&w=1"
    },
    "gmail": {
        "user": "hoangvien.vnstech@gmail.com",
        "pass": "vhvghyhotjumeakj"
    }
};