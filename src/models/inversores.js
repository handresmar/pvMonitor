const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InversorSchema= new Schema({
    ID: String,
    frec: Number,
    temp: Number,
    date: { type: Date, default: Date.now },
    canal:[
        {
            ID: String,
            pwr: Number,
            volt: Number
        },
        {
            ID: String,
            pwr: Number,
            volt: Number
        },
        {
            ID: String,
            pwr: Number,
            volt: Number
        },
        {
            ID: String,
            pwr: Number,
            volt: Number
        }
    ]
});

module.exports = mongoose.model('inversores',InversorsSchema);