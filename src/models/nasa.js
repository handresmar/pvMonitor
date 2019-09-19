const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DatanasaSchema= new Schema({
    mgntd: String,
    vlr: Number,
    date: Date
});

module.exports = mongoose.model('datanasa',DatanasaSchema);