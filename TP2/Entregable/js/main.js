//<----------------------- Canvas ----------------------->
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// Fondo canvas
let fondo = new Image();
fondo.src = './imagenes/fondo.jpg';
fondo.onload = clearCanvas;

// Foto casillero vacio
let imgCasilleroVacio = new Image();
imgCasilleroVacio.src = './imagenes/casillerovacio.png';

// Carga el canvas con la imagen de fondo y el tamaño predefinido
function clearCanvas(){
  context.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

// Cambiar por JSE6-7 - Modal jugar
$("#jugarModal").modal('show');

document.querySelector("#jugar").addEventListener("click",newGame);

function newGame(){
  // Oculto el modal
  $("#jugarModal").modal('hide');

  // Variables cargadas por input
  let nombreJ1 = document.querySelector("#nombreJ1").value;
  let nombreJ2 = document.querySelector("#nombreJ2").value;
  let nLineas = document.querySelector("#nLineas").value;
  let fichas = 0;
  let columnas = 0;

  switch (nLineas) {
    case "4":
      console.log(nLineas);
      filas = 6;
      columnas = 7;
      break;
    case "5":
      filas = 7;
      columnas = 8;
      break;
    case "6":
      filas = 8;
      columnas = 9;
      break;
    case "7":
      filas = 9;
      columnas = 10;
      break;
  }

  clearCanvas();
  // Dibujar Tablero
  tablero = new Tablero(filas,columnas, imgCasilleroVacio);
  tablero.draw();

}