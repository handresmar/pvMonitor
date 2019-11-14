const socket = io();

/*  ---------------- Variables Plnt LABE ----------------*/
let plntLabInv1=document.getElementById('pltLabeInv1').getContext('2d');
let plntLabInv2=document.getElementById('pltLabeInv2').getContext('2d');
let plntLabInv3=document.getElementById('pltLabeInv3').getContext('2d');
let plntLabInv4=document.getElementById('pltLabeInv4').getContext('2d');
let plntLabInv5=document.getElementById('pltLabeInv5').getContext('2d');
let plntLabInv6=document.getElementById('pltLabeInv6').getContext('2d');
let plntLabInv7=document.getElementById('pltLabeInv7').getContext('2d');


let vCh1=[];
let vCh2=[];
let potCh1=[];
let potCh2=[];
let date=[];

let myChart = new Chart(plntLabInv1,{
    type:'line',
    data:{
        labels:[],
        datasets:[
        {
            label: 'Potencia Canal 1',
            yAxisID: 'pot',
            data:[],
            borderWidth:3,
            borderColor:'rgba(255, 179,96)',
            backgroundColor:'rgba(255, 179,96)',
            fill: false
        },
        {
            label: 'Potencia Canal 2',
            yAxisID: 'pot',
            data:[],
            borderWidth:3,
            borderColor:'rgba(255, 255,0)',
            backgroundColor:'rgba(255, 255,0)',
            fill:false
        },
        {
            label: 'Tensión Canal 1',
            yAxisID: 'volt',
            borderWidth:2,
            borderColor:'rgba(128, 128,128)',
            backgroundColor:'rgba(128, 128,128)',
            data:[],
            fill:false
        },
        {
            label: 'Tensión Canal 2',
            yAxisID: 'volt',
            data:[],
            borderWidth:2,
            borderColor:'rgba(110, 110,110)',
            backgroundColor:'rgba(120, 120,120)',
            fill:false
        }]
    },
    options:{
        maintainAspectRatio: false,
        layout:{
            padding:{
                left:10,
                right: 25,
                top: 25,
                bottom:0
            }
        },
        scales:{
            xAxes:[{
                ticks:{
                    display:false
                }
            }],
            yAxes:[
            {
                id:'pot',
                type:'linear',
                position: 'left'
            },
            {
                id:'volt',
                type:'linear',
                position: 'right'
            }
        ]
        },

        title:{

        },
        legend:{

        },
        elements:{
            point:{
                radius: 2
            }
        }
    }
});

/* ---------------- sockets ----------------------*/ 

  socket.on('onConnect', function(daOpWea, daPltLabe){
    console.log(daPltLabe);
    setData(daPltLabe);

}); 
socket.on('updtPltlabe', function(daPltLabe){
    console.log(daOpWea);
    updateData(daOpWea);
});


/* ---------------- function ---------------- */

const setData=(data)=>{
    vCh1=[];
    vCh2=[];
    potCh1=[];
    potCh2=[];
    date=[];

    for (var i=data.length-1; i>=0 ; i--){
        console.log(data[i].date);
        vCh1.push(data[i].inversores[0].canales[0].volt);
        vCh2.push(data[i].inversores[0].canales[1].volt);
        potCh1.push(data[i].inversores[0].canales[0].pot);
        potCh2.push(data[i].inversores[0].canales[1].pot);
        date.push(new Date(data[i].date).toLocaleString('es-Co'));
    };
    myChart.data.datasets[0].data=potCh1;
    myChart.data.datasets[1].data=vCh1;
    myChart.data.datasets[2].data=potCh2;
    myChart.data.datasets[3].data=vCh2;
    myChart.data.labels=date;
    myChart.update();
    return;
}


const updateData=(data)=>{
}