const Datatest = require('../models/datatest');
const Datanasa = require('../models/nasa');

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