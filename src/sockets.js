module.exports = function(io){
    
    io.on('connection', (socket) => {
        console.log('new connection', socket.id);
        });
}