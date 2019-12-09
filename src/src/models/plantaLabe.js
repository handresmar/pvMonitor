const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plntLabeSchema= new Schema({
    ID: String,
    date: { type: Date, default: Date.now },
    inversores:[
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        },
        {
            ID: String,
            frec: Number,
            temp: Number,
            canales:[
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                },
                {
                    ID: String,
                    pot: Number,
                    volt: Number
                }
            ]
        }
    ]
});

module.exports = mongoose.model('plantaLabe',plntLabeSchema);