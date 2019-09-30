const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DataNasaSchema= new Schema({
    mgntd: String,
    vlr: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('datanasa',DataNasaSchema);