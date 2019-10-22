const express = require('express'); //gestor de servidor
const path = require('path'); //gestor de rutas
const exphbs = require('express-handlebars'); //gestor de plantillas
const methodOverride = require('method-override'); //Permite usar PUT y DELETE en HTTP
//console.log('Server running');

//initialization
const app = express(); //servidor
require('./database'); //base de datos


//settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//routes
app.use(require('./routes/index'));


//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server
const server = app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});


rutine = require('./routines');// rutinas del sistemas (obtener datos de las apis, gestionar la acción de los sockets, etc)

//webSockets
const SocketIO =require('socket.io');
const io = SocketIO.listen(server);
rutine.sockets(io);

// node-cron ('*sec *min *hour *dayMonth *month *dayWeek') //gestor de tareas programadas por calendario

const cron = require('node-cron');

cron.schedule('*/12 * * * *',() =>{
    rutine.weather(io);    
});

cron.schedule('*/6 * * * *',() =>{
    rutine.plantaLabe(io);    
});





//let t=0;
//cron.schedule('*/5 * * * * *',() =>{
    //t=t+5;
    //console.log('update');
    //io.emit('update',12);
    //if(t==15){console.log('quince')};
    //if(t==15){t=0}
//});


