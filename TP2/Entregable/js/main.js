//<----------------------- Canvas ----------------------->
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

// Fondo canvas
let fondo = new Image();
fondo.src = './imagenes/fondo.jpg';
fondo.onload = clearCanvas;

// Carga el canvas con la imagen de fondo y el tamaño predefinido
function clearCanvas(){
  context.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

// Cambiar por JSE6-7 - Modal jugar
$("#jugarModal").modal('show');

document.querySelector("#jugar").addEventListener("click",newGame);

function newGame(){
  $("#jugarModal").modal('hide');
  console.log(document.querySelector("#nombreJ1").value)
  console.log(document.querySelector("#nombreJ2").value)
}