const request = require('request'); //request para uso en apis

 /* Variables de bases de datos ----------------------*/ 
const DataWeather = require('./models/oweather');
const Datanasa = require('./models/oweather');

/*  ---------------- WebSockets ----------------*/

module.exports.sockets=(io)=>{
  io.on('connection', async (socket) => {
      console.log('new connection', socket.id);
      let dataWeather =  await DataWeather.find().sort({ _id: -1, }).limit(20);
      //console.log(data);
      socket.emit('onConnect',dataWeather);
  });
}

/*  ---------------- Open Weather API ----------------*/

module.exports.weather=(io)=>{
  const proxyUrl= "http://proxy4.unal.edu.co:8080";
  const dir = 'https://api.openweathermap.org/data/2.5/weather';
  const parametros = {APPID: '224bf9e7ed9c7b7e1a84156ddd4783b8', id:3688689, units:'metric' };

  const proxiedRequest=request.defaults({'proxy':proxyUrl});

  proxiedRequest({url:dir, qs:parametros}, async function(err, res, body){
    if(err) { console.log(err); return; }
    console.log("OpenWeather: " + res.statusCode);
    let datos = JSON.parse(body);
    let weatdat={temp:datos.main.temp,pressure:datos.main.pressure, humidity: datos.main.humidity, date:new Date(datos.dt*1000)};

    let dataweather = new DataWeather(weatdat);
    await dataweather.save();

    io.emit('update',dataweather); //Emitir el dato actualizado al socket cliente    
  });
};



/*
------------------------------------------------------------------------------------
const parametros = {APPID: '224bf9e7ed9c7b7e1a84156ddd4783b8', id:3688689, units:'metric' };
const dir = 'https://api.openweathermap.org/data/2.5/weather';

request({url:dir, qs:parametros}, async function(err, res, body){
  if(err) { console.log(err); return; }
  await console.log("Get response: " + res.statusCode);
  const datos = JSON.parse(body);
  //console.log(datos.main);
  //const weather=datos.weather[0];
  //datos.dt :tiempo del dato
  //console.log(datos);
  //console.log(datos.dt);
  //console.log(Date.now();
  date= new Date(datos.dt*1000);
  console.log('Fecha: ',date.toLocaleString('es-CO'));
  console.log('Temperatura [°C]: ',datos.main.temp);
  console.log('Humedad relativa [%]: ',datos.main.humidity);
  console.log('Presión []: ',datos.main.pressure);
  
});------------------------------------------------------------------------------------


------------------------------------------------------------------------------------
request({url:dir, qs:parametros}, async function(err, res, body) {
  if(err) { console.log(err); return; }
  await console.log("Get response: " + res.statusCode);
  const datos = JSON.parse(body);
  //console.log(datos.main);
  //const weather=datos.weather[0];
  //datos.dt :tiempo del dato
  //console.log(datos);
  //console.log(datos.dt);
  //console.log(Date.now();
  date= new Date(datos.dt*1000);
  console.log('Fecha: ',date.toLocaleString('es-CO'));
  console.log('Temperatura [°C]: ',datos.main.temp);
  console.log('Humedad relativa [%]: ',datos.main.humidity);
  console.log('Presión []: ',datos.main.pressure);
  
});------------------------------------------------------------------------------------

------------------------------------------------------------------------------------
module.exports.sockets=(io)=>{
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
}--------------------------------------------------------------------------------------

*/