const socket=io();
/*------------ Variables DashBoard ---------*/
let plntLabProm=document.getElementById('pltLabeProm').getContext('2d');


/*------------ Chartjs ---------*/
let myChart=new Chart(plntLabProm,{
    type:'bar',
    data:{
        labels:[],
        datasets:[
            {
                label:'Potencia promedio diaria [W]',
                borderColor:'rgba(62, 149,205)',
                backgroundColor:'rgba(62, 149,205,0.7)',
                data: []
            },
            {
                label:'Energía promedio diaria [W h]',
                borderColor:'rgba(196,88,80)',
                backgroundColor:'rgb(196,88,80,0.7)',
                data: []

            }
        ]
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
        legend: { display: true },
        title: {
            display: true,
            text: ''
        },
        scales:{
            yAxes:[{
                ticks:{
                    beginAtZero:true
                }
            }]
        }
    }
})


  /* ---------------- sockets ----------------------*/ 

  socket.on('onConnect', function(daOpWea, daPltLabe, plaLabeProm){
    console.log(plaLabeProm);
    let prom=[];
    let enDia=[];
    let date=[];

    for (var i=plaLabeProm.length-1; i>=0 ; i--){
        prom.push(plaLabeProm[i].potProm);
        enDia.push(plaLabeProm[i].enDia);
        date.push(new Date(plaLabeProm[i].date).toLocaleString('es-CO',{year: 'numeric', month: 'numeric', day: 'numeric'}));
    };
    myChart.data.datasets[0].data=prom;
    myChart.data.datasets[1].data=enDia;
    myChart.data.labels=date;
    myChart.update();

}); 

