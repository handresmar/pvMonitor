const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PromDiaPltLabe= new Schema({
    potProm: Number,//potencia promedio diaria
    enDia: Number, //energía generada diaria
    date: { type: Date, default: Date.now } //Fecha
});

module.exports = mongoose.model('pltLabProm',PromDiaPltLabe);