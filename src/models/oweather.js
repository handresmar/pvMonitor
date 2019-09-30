const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataWeatherSchema= new Schema({
    temp: Number,
    pressure: Number,
    humidity: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('dataweather',DataWeatherSchema);