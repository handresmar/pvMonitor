const socket = io();

let irr = document.getElementById('irr-val');

let weaTemp=document.getElementById('weaTemp');
let weaHum=document.getElementById('weaHum');
let weaPres=document.getElementById('weaPres');
let weaDate=document.getElementById('weaDate');

let canvas = document.getElementById('canvas').getContext('2d');

//variables internas
var temps=[];
var hum=[];
var date=[];

/*  ---------------- chatjs ----------------*/
let myChart = new Chart(canvas,{
    type:'line',
    data:{
        labels:[],
        datasets:[{
            label: 'Temperatura [°C]',
            yAxisID: 'temp',
            data:[],
            backgroundColor:'rgba(255, 99, 132, 0.05)',
            borderWidth:1.2,
            borderColor:'rgba(255, 99, 132)'
            //fill:false
        },
        {   
            label: 'Humedad relativa [%]',
            yAxisID: 'hum',
            data:[],
            backgroundColor:'rgba(54, 162, 235, 0.05)',
            borderWidth:1.2,
            borderColor:'rgba(54, 162, 235)'
            //fill:false
        }
        ],
        
    },

    options:{
        scales:{
            yAxes:[{
                id: 'temp',
                type: 'linear',
                position: 'left',
                }, {
                id: 'hum',
                type: 'linear',
                position: 'right',
                ticks: {}
            }]
        },
        title:{
            display: true,
            text: 'Temperatura y humedad Bogotá'
        },
        legend:{
            //position: 'right'
        }
    }
});


  /* ---------------- sockets ----------------------*/ 

socket.on('onConnect', function(data){
    console.log(data);
    setWeather(data);

}); 
socket.on('update', function(data){
    console.log(data);
    updateWeather(data);
});


/* ---------------- function ---------------- */
const setWeather=(data)=>{
    temps=[];
    hum=[];
    date=[];
    for (var i=data.length-1; i>=0 ; i--){
        temps.push(data[i].temp);
        hum.push(data[i].humidity);
        date.push(new Date(data[i].date).toLocaleString('es-CO'));
    };
    console.log(temps);
    updatechart();
    return;
}
const updateWeather=(data)=>{
    console.log('update',data);
    temps=temps.slice(1);
    temps.push(data.temp);
    hum=hum.slice(1);
    hum.push(data.humidity);
    date=date.slice(1);
    date.push(new Date(data.date).toLocaleString('es-CO'));
    updatechart();
    return;
}
const updatechart=()=>{
    myChart.data.datasets[0].data=temps;
    myChart.data.datasets[1].data=hum;
    myChart.data.labels=date;
    myChart.update();
    return;
}




    /*temp=data[0].temp.toString()+',0';
    irr.innerHTML=temp;
    weaTemp.innerHTML=data[0].temp;
    weaHum.innerHTML=data[0].humidity;
    weaPres.innerHTML=data[0].pressure;
    let date= new Date(data[0].date);
    weaDate.innerHTML=date.toLocaleString('es-CO');*/