(function(){ 

    var indexNav = document.getElementById('indexNav');

    

    var nav = function(a){
        if(a==1){
            document.getElementById('index').style.display='none';
        }
    };

    indexNav.addEventListener("click", nav(1));
})();