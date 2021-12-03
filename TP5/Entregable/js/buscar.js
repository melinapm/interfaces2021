"use strict";

function esconder(){
     let divs = document.querySelectorAll('.collapse');
     console.log(divs);
     divs.forEach(element => {
          element.classList.remove("show");
     });
}

document.addEventListener('keydown', (event) => {
    
     var name = event.key;
     if (name == "Enter") {
          cargaSpinner();
          setTimeout(muestraResultados, 2000); 
     }

});


function cargaSpinner() {
     document.getElementById("spinnerResultado").innerHTML = "<br><br><br> <div class=\"d-flex justify-content-center\"><div class=\"spinner-border text-info\" role=\"status\"><span class=\"sr-only\">Cargando...</span></div></div>";
};

function muestraResultados() {
     document.getElementById("spinnerResultado").innerHTML = "";
     document.getElementById("resultadosBusquedaJose").style.display = "block"; 
};


