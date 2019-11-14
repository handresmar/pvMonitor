const socket = io();

/*  ---------------- Variables Plnt LABE ----------------*/
let plntLabInv1=document.getElementById('pltLabeInv1').getContext('2d');
let plntLabInv2=document.getElementById('pltLabeInv2').getContext('2d');
let plntLabInv3=document.getElementById('pltLabeInv3').getContext('2d');
let plntLabInv4=document.getElementById('pltLabeInv4').getContext('2d');
let plntLabInv5=document.getElementById('pltLabeInv5').getContext('2d');
let plntLabInv6=document.getElementById('pltLabeInv6').getContext('2d');
let plntLabInv7=document.getElementById('pltLabeInv7').getContext('2d');


/*  ---------------- Variables internas  ----------------*/
let inv1={};
let inv2={};
let inv3={};
let inv4={};
let inv5={};
let inv6={};
let inv7={};


/* ---------------- Chartjs ----------------------*/ 
const plotchart=(inv,plntLabInv)=>{
    
    let myChart = new Chart(plntLabInv,{
        type:'line',
        data:{
            labels:[],
            datasets:[
            {
                label: 'Potencia Canal 1 [W]',
                yAxisID: 'pot',
                data:[],
                borderWidth:3,
                borderColor:'rgba(255, 128,96)',
                backgroundColor:'rgba(255, 128,96)',
                fill: false
            },
            {
                label: 'Potencia Canal 2 [W]',
                yAxisID: 'pot',
                data:[],
                borderWidth:3,
                borderColor:'rgba(255, 255,0)',
                backgroundColor:'rgba(255, 255,0)',
                fill:false
            },
            {
                label: 'Tensión Canal 1 [V]',
                yAxisID: 'volt',
                borderWidth:2,
                borderColor:'rgba(128, 128,128)',
                backgroundColor:'rgba(128, 128,128)',
                data:[],
                fill:false
            },
            {
                label: 'Tensión Canal 2 [V]',
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
    myChart.data.datasets[0].data=inv.potCh1;
    myChart.data.datasets[1].data=inv.vCh1;
    myChart.data.datasets[2].data=inv.potCh2;
    myChart.data.datasets[3].data=inv.vCh2;
    myChart.data.labels=inv.date;
    myChart.update();

}


/* ---------------- sockets ----------------------*/ 

  socket.on('onConnect', function(daOpWea, daPltLabe){
    console.log(daPltLabe);
    setData(daPltLabe);

}); 
socket.on('updtPltlabe', function(daPltLabe){
    /*console.log(daOpWea);*/
    updateData(daPltLabe);
});


/* ---------------- function ---------------- */

const setData=(data)=>{

    for(var j=0; j<7; j++){ 
        let vCh1=[];
        let vCh2=[];
        let potCh1=[];
        let potCh2=[];
        let date=[];

        for (var i=data.length-1; i>=0 ; i--){
            vCh1.push(data[i].inversores[j].canales[0].volt);
            vCh2.push(data[i].inversores[j].canales[1].volt);
            potCh1.push(data[i].inversores[j].canales[0].pot);
            potCh2.push(data[i].inversores[j].canales[1].pot);
            date.push(new Date(data[i].date).toLocaleString('es-Co'));
        };      

        switch(j){
            case 0:
                inv1={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv1,plntLabInv1);
                slicedat(inv1);
                break;
            case 1:
                inv2={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv2,plntLabInv2);
                slicedat(inv2);
                break;
            case 2:
                inv3={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv3,plntLabInv3);
                slicedat(inv3);
                break;
            case 3:
                inv4={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv4,plntLabInv4);
                slicedat(inv4);
                break;
            case 4:
                inv5={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv5,plntLabInv5);
                slicedat(inv5);
                break;
            case 5:
                inv6={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv6,plntLabInv6);
                slicedat(inv6);
                break;
            case 6:
                inv7={potCh1,potCh2,vCh1,vCh2,date};
                plotchart(inv7,plntLabInv7);
                slicedat(inv7);
                break;
        }
    };
   
    return;
}

const slicedat=(inv)=>{
    for(const x in inv){
        inv[x]=inv[x].slice(1);   
    }
}

const updateData=(data)=>{
    for(var j=0; j<7; j++){
        switch(j){
            case 0:
                inv1.vCh1.push(data.inversores[j].canales[0].volt);
                inv1.vCh2.push(data.inversores[j].canales[1].volt);
                inv1.potCh1.push(data.inversores[j].canales[0].pot);
                inv1.potCh2.push(data.inversores[j].canales[1].pot);
                inv1.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv1,plntLabInv1);
                slicedat(inv1);
                break;
            case 1:
                inv2.vCh1.push(data.inversores[j].canales[0].volt);
                inv2.vCh2.push(data.inversores[j].canales[1].volt);
                inv2.potCh1.push(data.inversores[j].canales[0].pot);
                inv2.potCh2.push(data.inversores[j].canales[1].pot);
                inv2.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv2,plntLabinv2);
                slicedat(inv2);
                break;

            case 2:
                inv3.vCh1.push(data.inversores[j].canales[0].volt);
                inv3.vCh2.push(data.inversores[j].canales[1].volt);
                inv3.potCh1.push(data.inversores[j].canales[0].pot);
                inv3.potCh2.push(data.inversores[j].canales[1].pot);
                inv3.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv3,plntLabinv3);
                slicedat(inv3);
                break;
            case 3:
                inv4.vCh1.push(data.inversores[j].canales[0].volt);
                inv4.vCh2.push(data.inversores[j].canales[1].volt);
                inv4.potCh1.push(data.inversores[j].canales[0].pot);
                inv4.potCh2.push(data.inversores[j].canales[1].pot);
                inv4.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv4,plntLabinv4);
                slicedat(inv4);
                break;
            case 4:
                inv5.vCh1.push(data.inversores[j].canales[0].volt);
                inv5.vCh2.push(data.inversores[j].canales[1].volt);
                inv5.potCh1.push(data.inversores[j].canales[0].pot);
                inv5.potCh2.push(data.inversores[j].canales[1].pot);
                inv5.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv5,plntLabinv5);
                slicedat(inv5);
                break;
            case 5:
                inv6.vCh1.push(data.inversores[j].canales[0].volt);
                inv6.vCh2.push(data.inversores[j].canales[1].volt);
                inv6.potCh1.push(data.inversores[j].canales[0].pot);
                inv6.potCh2.push(data.inversores[j].canales[1].pot);
                inv6.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv6,plntLabinv6);
                slicedat(inv6);
                break;
            case 6:
                inv7.vCh1.push(data.inversores[j].canales[0].volt);
                inv7.vCh2.push(data.inversores[j].canales[1].volt);
                inv7.potCh1.push(data.inversores[j].canales[0].pot);
                inv7.potCh2.push(data.inversores[j].canales[1].pot);
                inv7.date.push(new Date(data[i].date).toLocaleString('es-Co'));
                plotchart(inv7,plntLabinv7);
                slicedat(inv7);
                break;
        }

    }
}
