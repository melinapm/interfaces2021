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
