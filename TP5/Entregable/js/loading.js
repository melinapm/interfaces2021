"use strict";
let timer;

function loading() {
    timer = setTimeout(showPage, 3000);
  }

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("contenido").style.display = "flex";
  }
