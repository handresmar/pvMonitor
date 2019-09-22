(function(){
    const socket = io();
  /* ---------------- navegacion ----------------------*/  
    //variables
    var indexNav=document.getElementById('indexNav'),
        estacionNav=document.getElementById('estacionNav'),
        plantasNav=document.getElementById('plantasNav'),
        basesNav=document.getElementById('basesNav');
        
        index=document.getElementById('index');
        estacion=document.getElementById('estacion');
        plantas=document.getElementById('plantas');
        bases=document.getElementById('bases');

    let irr = document.getElementById('irr-val');
    
    //default:
    
    estacion.style.display='none';
    plantas.style.display='none';
    bases.style.display='none';

    // functions
        var def = function(){
            index.style.display='none';
            estacion.style.display='none';
            plantas.style.display='none';
            bases.style.display='none';

        };
        var ini = function(){
            document.title='Principal';
            def();
            index.style.display='block';
            
        };

        var est = function(){
            document.title='Bases de Datos';
            def();
            estacion.style.display='block';
        };

        var plan = function(){
            document.title='Plantas Fotovoltáicas';
            def();
            plantas.style.display='block';
        };

        var bas = function(){
            document.title='Bases de Datos';
            def();    
            bases.style.display='block';
        };

    //events

    indexNav.addEventListener('click',ini);
    estacionNav.addEventListener('click',est);
    plantasNav.addEventListener('click',plan);
    basesNav.addEventListener('click',bas);
     
  /* ---------------- sockets ----------------------*/ 
        
  socket.on('onConnect', function(data){
        console.log(data);
        irr.innerHTML=data;
  }); 

}())




    //indexNav.addEventListener('click', navegar.inicio);
    //estacionNav.addEventListener('click',navegar.estacion;
    //plantasNav.addEventListener('click',navegar);
    //basesNav.addEventListener('click',navegar);



    //functions
    /*
    cccccc
       //functions
    var inicio = function(){
        index.style.display='grid';
    };
    var bases = function(){
        index.style.display='none';
    };

    //events
    indexNav.addEventListener('click', inicio);
    basesNav.addEventListener('click', bases);
ccccccc
    
    var inicio = function(){
        index.style.display='grid';
    };
    var bases = function(){
        index.style.display='none';
    };
    */
    /*
    function navegar(a){
        index.style.display='none';
        estacion.style.display='none';
        plantas.style.display='none';
        bases.style.display='none';
        if(a==1){
            index.style.display='grid';
        }
    }

        function nav(pag){
        //index.style.display='none';
        //estacion.style.display='none';
        //plantas.style.display='none';
        //bases.style.display='none';
        pag.style.display='grid';
    };
    */

