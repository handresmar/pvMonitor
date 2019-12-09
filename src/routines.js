const request = require('request'); //request para uso en apis
const cheerio = require('cheerio'); // obtener datos de documentos html

 /* Variables de bases de datos ----------------------*/ 
const DataWeather = require('./models/oweather');
const Datanasa = require('./models/nasa');
const PlantaLabe = require('./models/plantaLabe');
const PltLabePromDia= require('./models/PltLabPromDia');

/* Variables internas ----------------------*/ 
let pltLabeAcum=0;
let pltLabeProm=0;
let cont=0;



/*  ---------------- WebSockets ----------------*/

module.exports.sockets=(io)=>{
  io.on('connection', async (socket) => {
      console.log('new connection', socket.id);
      let dataWeather =  await DataWeather.find().sort({ _id: -1, }).limit(50);
      let plantaLabe =  await PlantaLabe.find().sort({ _id: -1, }).limit(150);
      let pltLabePromDia = await PltLabePromDia.find().sort({ _id: -1, }).limit(8);
      //console.log(data);
      socket.emit('onConnect',dataWeather, plantaLabe,pltLabePromDia);
  });
}

/*  ---------------- Open Weather API ----------------*/

module.exports.weather=(io)=>{
  const proxyUrl="http://proxy4.unal.edu.co:8080"; //proxy universidad
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


/*  ---------------- Obtener datos de ECU planta LABE ----------------*/

module.exports.plantaLabe=(io)=>{
  //console.log('Nuevo dato planta');

  const urlecu = 'http://10.42.5.108/index.php/realtimedata';
  let planta={};

  request(urlecu, async (err, res, body)=>{
    if (err) {  console.log('error: ', err);}
    //console.log('Body: ',body);
    var $ = cheerio.load(body);
    planta=getData($);
    let plantalabe = new PlantaLabe(planta);
    let p = 0;

    for(var i=0; i<7; i++){
      p=p+plantalabe.inversores[i].canales[0].pot;
      p=p+plantalabe.inversores[i].canales[1].pot;
    }

    if(p!=0){
      await plantalabe.save();
      io.emit('updtPltlabe',plantalabe);
      promedio(p);
    }
  })
}


/*---------------- Guardar promedio diario planta labe ----------------*/
module.exports.saveprom=async()=>{
  let promdiar={potProm:pltLabeProm, enDia:(pltLabeAcum/12)}
  let promediodiario = new PltLabePromDia(promdiar);
  await promediodiario.save();
}


/*-----------------------------Funciones auxiliares--------------------------------------------------- */
/*--------promedio------ */
const promedio=(p)=>{
  pltLabeAcum=pltLabeAcum+p;
  cont=cont+1;
  pltLabeProm=pltLabeAcum/cont;
  console.log('prom:', pltLabeProm);
}

const getData=($)=>{
  let a=[];
  $('tr').each(function(){
    a.push($(this).text().trim());
  });
  a=a.slice(1);
  return captor(a);
}

const captor=(a)=>{
  let b=[];
  let planta={'ID':'labe','Date':'','inversores':''};
  let inversor=[];
  
  for(let j=0; j<28;j+=4){
    data={};
    for(let i=0; i<4;i++){
      b=fromstring(a[i+j]);
      data=tojson(b,data,i,planta);
    }
    inversor.push(data);
  }
  planta.inversores=inversor; 
  return planta;
}


const fromstring=(a)=>{
let obj=[];
for(var i=0, j=0; i<a.length; i++){
  if(a[i]=='\n'||i==a.length-1){
    let b=a.substring(j,i);
    obj.push(b.trim());
    j=i;
  }
}
return obj;
}
const tojson=(b, data, can, planta)=>{
let canal={};
if(can==0){
  let canal={};
  let array=[];
  data.ID=b[0].slice(0,b[0].length-2);
  data.frec=b[2].replace(/\D/g,'')/10;
  data.temp=toNum(b[4]);
  planta.Date=new Date(b[5]);

  canal.ID=b[0];
  canal.pot=toNum(b[1]);
  canal.volt=toNum(b[3]);
  array.push(canal);
  data.canales=array;
}
if(can!=0){
  let array=data.canales;
  canal.ID=b[0];
  canal.pot=toNum(b[1]);
  canal.volt=toNum(b[2]);
  array.push(canal);
  data.canales=array;
}
return data;
}

const toNum=(b)=>{
  let num=parseInt(b.replace(/\D/g,''), 10);
  if(isNaN(num)){return 0;}
  else{return num;}
}


