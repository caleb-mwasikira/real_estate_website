const mongoose = require('mongoose');


const PhotoSchema = mongoose.Schema({
    img_url: String,
    desc: String
});

const AgentSchema = mongoose.Schema({
    full_name: String,
    email: String,
    phone_number: String,
    img_url: String
});

const ApartmentShema = mongoose.Schema({
    name: String,
    address: String,
    img_url: String,
    desc: String,
    photos: {
        type: [ PhotoSchema ],
        default: undefined
    },
    price: {
        currency_code: String,
        amount: Number
    },
    sale_status: String,
    is_verified: Boolean,
    facilities: {
        type: Map,
        of: String
    },
    agent_assigned: {
        type: [ AgentSchema ],
        default: undefined
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Apartment", ApartmentShema);
