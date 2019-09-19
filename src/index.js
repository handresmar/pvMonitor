//console.log('Server running');
const express = require('express'); //gestor de servidor
const path = require('path'); //gestor de rutas
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

//initialization
const app = express(); // aplicación
require('./database');

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

//listening the server
app.listen(app.get('port'), () =>{
    console.log('server in port', app.get('port'));
});
