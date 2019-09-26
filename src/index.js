const express = require('express'); //gestor de servidor
const path = require('path'); //gestor de rutas
const exphbs = require('express-handlebars'); //gestor de plantillas
const methodOverride = require('method-override'); 

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
app.use(express.urlencoded());
app.use(methodOverride('_method'));


//routes
app.use(require('./routes/index'));


//static files
app.use(express.static(path.join(__dirname,'public')));

//start the server
const server = app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});

//webSockets
const SocketIO =require('socket.io');
const io = SocketIO.listen(server);
require('./routes/sockets')(io);

// node-cron
rut = require('./routines');
const cron = require('node-cron');
cron.schedule('*/10 * * * * *',() =>{
    
    
});
cron.schedule(' */15 * * * *',() =>{
    rut.weather();    
});