(function(){
    
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
     
}())
