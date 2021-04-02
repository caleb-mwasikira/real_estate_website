const mongoose = require('mongoose');


const AuthorisationSchema = mongoose.Schema({
    role: { type: String, default: "User"},
    permissions: {
        type: [ String ],
        default: undefined
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Authorisation", AuthorisationSchema);