const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: Object,
        of: new mongoose.Schema({
            hash: String,
            salt: String
        }),
        required: true
    },
    keys: {
        type: Object,
        of: new mongoose.Schema({
            idRSAPrivate: String,
            idRSAPublic: String
        }),
    },
    role: {
        type: String,
        default: "User"
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);