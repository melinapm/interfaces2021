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
          document.getElementById("resultadosBusquedaJose").style.display = "block"; 
     }

     }
);