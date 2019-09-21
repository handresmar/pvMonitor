(function(){
    const socket = io();
    //variables
    var indexNav=document.getElementById('indexNav'),
        estacionNav=document.getElementById('estacionNav'),
        plantasNav=document.getElementById('plantasNav'),
        basesNav=document.getElementById('basesNav');
        
        index=document.getElementById('index');
        estacion=document.getElementById('estacion');
        plantas=document.getElementById('plantas');
        bases=document.getElementById('bases');
    
    //default:
    
    estacion.style.display='none';
    plantas.style.display='none';
    bases.style.display='none';

    // functions

        var inicio = function(){
            index.style.display='block';
            
        };

        var estacion = function(){
            index.style.display='none';
            estacion.style.display='block';
        };

        var plantas = function(){
            index.style.display='none';
            plantas.style.display='block';
        };

        var bases = function(){
            index.style.display='none';
            bases.style.display='block';
        };

    //events

    indexNav.addEventListener('click',inicio);
    estacionNav.addEventListener('click',estacion);
    plantasNav.addEventListener('click',plantas);
    basesNav.addEventListener('click',bases);
     
  

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

}())

