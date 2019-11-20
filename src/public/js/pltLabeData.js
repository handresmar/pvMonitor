const socket = io();

/*  ---------------- Variables Plnt LABE ----------------*/
let plntLabInv1=document.getElementById('pltLabeInv1').getContext('2d');
let plntLabInv2=document.getElementById('pltLabeInv2').getContext('2d');
let plntLabInv3=document.getElementById('pltLabeInv3').getContext('2d');
let plntLabInv4=document.getElementById('pltLabeInv4').getContext('2d');
let plntLabInv5=document.getElementById('pltLabeInv5').getContext('2d');
let plntLabInv6=document.getElementById('pltLabeInv6').getContext('2d');
let plntLabInv7=document.getElementById('pltLabeInv7').getContext('2d');


let pltLabTempInv1=document.getElementById('pltLabTempInv1');
let pltLabFrecInv1=document.getElementById('pltLabFrecInv1');
let pltLabTempInv2=document.getElementById('pltLabTempInv2');
let pltLabFrecInv2=document.getElementById('pltLabFrecInv2');
let pltLabTempInv3=document.getElementById('pltLabTempInv3');
let pltLabFrecInv3=document.getElementById('pltLabFrecInv3');
let pltLabTempInv4=document.getElementById('pltLabTempInv4');
let pltLabFrecInv4=document.getElementById('pltLabFrecInv4');
let pltLabTempInv5=document.getElementById('pltLabTempInv5');
let pltLabFrecInv5=document.getElementById('pltLabFrecInv5');
let pltLabTempInv6=document.getElementById('pltLabTempInv6');
let pltLabFrecInv6=document.getElementById('pltLabFrecInv6');
let pltLabTempInv7=document.getElementById('pltLabTempInv7');
let pltLabFrecInv7=document.getElementById('pltLabFrecInv7');

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
    myChart.data.datasets[1].data=inv.potCh2;
    myChart.data.datasets[2].data=inv.vCh1;
    myChart.data.datasets[3].data=inv.vCh2;
    myChart.data.labels=inv.date;
    myChart.update();

}


/* ---------------- sockets ----------------------*/ 

  socket.on('onConnect', function(daOpWea, daPltLabe){
    //console.log(daPltLabe);
    setData(daPltLabe);

}); 
socket.on('updtPltlabe', function(daPltLabe){
    /*console.log(daOpWea);*/
    updateData(daPltLabe);
    console.log('nuevo dato planta labe');
    //console.log(daPltLabe);
});


/* ---------------- function ---------------- */
const tempfrecCard=(data)=>{
    pltLabTempInv1.innerHTML=data.inversores[0].temp;
    pltLabFrecInv1.innerHTML=data.inversores[0].frec;
    pltLabTempInv2.innerHTML=data.inversores[1].temp;
    pltLabFrecInv2.innerHTML=data.inversores[1].frec;
    pltLabFrecInv3.innerHTML=data.inversores[2].frec;
    pltLabTempInv3.innerHTML=data.inversores[2].temp;
    pltLabTempInv4.innerHTML=data.inversores[3].temp;
    pltLabFrecInv4.innerHTML=data.inversores[3].frec;
    pltLabTempInv5.innerHTML=data.inversores[4].temp;
    pltLabFrecInv5.innerHTML=data.inversores[4].frec;
    pltLabTempInv6.innerHTML=data.inversores[5].temp;
    pltLabFrecInv6.innerHTML=data.inversores[5].frec;
    pltLabTempInv7.innerHTML=data.inversores[6].temp;
    pltLabFrecInv7.innerHTML=data.inversores[6].frec;
}



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
            if(i==0){
                tempfrecCard(data[i]);
            }
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
    tempfrecCard(data);
    for(var j=0; j<7; j++){
        switch(j){
            case 0:
                inv1.vCh1.push(data.inversores[j].canales[0].volt);
                inv1.vCh2.push(data.inversores[j].canales[1].volt);
                inv1.potCh1.push(data.inversores[j].canales[0].pot);
                inv1.potCh2.push(data.inversores[j].canales[1].pot);
                inv1.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv1,plntLabInv1);
                slicedat(inv1);
                break;
            case 1:
                inv2.vCh1.push(data.inversores[j].canales[0].volt);
                inv2.vCh2.push(data.inversores[j].canales[1].volt);
                inv2.potCh1.push(data.inversores[j].canales[0].pot);
                inv2.potCh2.push(data.inversores[j].canales[1].pot);
                inv2.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv2,plntLabInv2);
                slicedat(inv2);
                break;

            case 2:
                inv3.vCh1.push(data.inversores[j].canales[0].volt);
                inv3.vCh2.push(data.inversores[j].canales[1].volt);
                inv3.potCh1.push(data.inversores[j].canales[0].pot);
                inv3.potCh2.push(data.inversores[j].canales[1].pot);
                inv3.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv3,plntLabInv3);
                slicedat(inv3);
                break;
            case 3:
                inv4.vCh1.push(data.inversores[j].canales[0].volt);
                inv4.vCh2.push(data.inversores[j].canales[1].volt);
                inv4.potCh1.push(data.inversores[j].canales[0].pot);
                inv4.potCh2.push(data.inversores[j].canales[1].pot);
                inv4.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv4,plntLabInv4);
                slicedat(inv4);
                break;
            case 4:
                inv5.vCh1.push(data.inversores[j].canales[0].volt);
                inv5.vCh2.push(data.inversores[j].canales[1].volt);
                inv5.potCh1.push(data.inversores[j].canales[0].pot);
                inv5.potCh2.push(data.inversores[j].canales[1].pot);
                inv5.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv5,plntLabInv5);
                slicedat(inv5);
                break;
            case 5:
                inv6.vCh1.push(data.inversores[j].canales[0].volt);
                inv6.vCh2.push(data.inversores[j].canales[1].volt);
                inv6.potCh1.push(data.inversores[j].canales[0].pot);
                inv6.potCh2.push(data.inversores[j].canales[1].pot);
                inv6.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv6,plntLabInv6);
                slicedat(inv6);
                break;
            case 6:
                inv7.vCh1.push(data.inversores[j].canales[0].volt);
                inv7.vCh2.push(data.inversores[j].canales[1].volt);
                inv7.potCh1.push(data.inversores[j].canales[0].pot);
                inv7.potCh2.push(data.inversores[j].canales[1].pot);
                inv7.date.push(new Date(data.date).toLocaleString('es-Co'));
                plotchart(inv7,plntLabInv7);
                slicedat(inv7);
                break;
        }

    }
}
