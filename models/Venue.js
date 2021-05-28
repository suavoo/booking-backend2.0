const { model, Schema } = require('mongoose');

const venueSchema = new Schema({
    name: String,
    userId: String,
    createdAt: String,
    adress: String,
    city: String,
    region: String,
    country: String,
    contactname: String,
    tel: String,
    email: String,
    technik: String,
    time: String,
    note: String
});

module.exports = model('Venue', venueSchema);