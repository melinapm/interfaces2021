"use strict";

/// Menu con JQuery
$(document).ready(function(){
  $('#div_principal').load('muro.html',function() {
      $("#div_principal").fadeIn(800);
    });
  $("#home").click(function(e){
    e.preventDefault();
    $('#div_principal').load('muro.html',function() {
        $("#div_principal").fadeIn(800);
      });
   })
  // Para agregar un html nuevo simplemente crearlo con un section 
  // y agregarlo remplazando el id en los botones del nav y aqui el html
   $("#buscar").click(function(e){
     e.preventDefault();
     $('#div_principal').load('buscar.html',function() {
         $("#div_principal").fadeIn(800);
       });
    })
    $("#perfil").click(function(e){
      e.preventDefault();
      $('#div_principal').load('perfil.html',function() {
          $("#div_principal").fadeIn(800);
        });
     })
     $("#buscar").click(function(e){
      e.preventDefault();
      $('#div_principal').load('buscar.html',function() {
          $("#div_principal").fadeIn(800);
        });
     })
});
