const DataWeather = require('../models/oweather');
const Datanasa = require('../models/nasa');
 /* ---------------- sockets ----------------------*/ 
module.exports = function(io){
    io.on('connection', async (socket) => {
        console.log('new connection', socket.id);
        let dataWeather =  await DataWeather.find().sort({ _id: -1, }).limit(20);
        //console.log(data);
        socket.emit('onConnect',dataWeather);
        socket.on('newData', (data) => {
            socket.broadcast.emit('onConnect',data);
            //console.log('mi dato:'+ data);
        });
    });
}
/*
module.exports = function(io){
    io.on('connection', async (socket) => {
        console.log('new connection', socket.id);
        let data =  await Datanasa.find().sort({ _id: -1 }).limit(1);
        //console.log(data);
        socket.emit('onConnect',data[0].vlr);
        socket.on('newData', (data) => {
            socket.broadcast.emit('onConnect',data);
            //console.log('mi dato:'+ data);
        });
    });
}
*/