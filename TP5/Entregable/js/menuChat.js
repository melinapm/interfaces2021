"use strict";

/// Menu con JQuery
$(document).ready(function(){
     $("#chat").click(function(e){
          e.preventDefault();
          $('#div_principal').load('chat.html',function() {
               $("#div_principal").fadeIn(800);
          });
     })
     $("#chatTodos").click(function(e){
          e.preventDefault();
          $('#div_principal').load('chat.html',function() {
               $("#div_principal").fadeIn(800);
               });
          })               
});



document.getElementById("botonPublicar").addEventListener("click", function() {
     document.getElementById("textoPublicacionPrueba").innerHTML = document.getElementById("textoPublicacion").value; 
     //console.log(document.getElementById("publicacionPrueba"));
     document.getElementById("publicacionPrueba").style.display = "block"; 
});

document.addEventListener('keydown', (event) => {
    
     var name = event.key;
     if (name == "Enter") {
          document.getElementById("comentarioPrueba").innerHTML = document.getElementById("textoComentarioPrueba").value;
          console.log(document.getElementById("comentarioPruebaDiv"));
          document.getElementById("comentarioPruebaDiv").style.display = "flex"; 
     }

     }
);