const { model, Schema } = require('mongoose');

const artistSchema = new Schema({
    name: String,
    userId: String,
    createdAt: String,
    genre: String,
    technik: String,
    tel: String,
    email: String,
    page: String,
    iban: String,
    prozente: Number
});

module.exports = model('Artist', artistSchema);