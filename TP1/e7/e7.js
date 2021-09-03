"use strict";

// TP1 - E7
// 7. Cargar una Imagen desde disco o URL
// a) Dibujar la imagen dentro del canvas

// CanvasRenderingContext2D.drawImage()
// void ctx.drawImage(image, dx, dy);
// void ctx.drawImage(image, dx, dy, dWidth, dHeight);
// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
// Parámetros
// image - Un elemento a dibujar dentro del context
// dx - La coordenada X del canvas, la esquina superior izquierda de la imagen origen.
// dy - La coordenada Y del canvas, la esquina superior izquierda de la imagen origen.
// dWidth - El ancho para dibujar la imagen en el canvas destino.
// dHeight - El alto para dibujar la imagen en el canvas destino. 
//     Esto permite escalar la imagen dibujada. 
//     Si no se especifica, el alto de  la imagen no se escala al dibujar.
// sx - La coordenada X de la esquina superior izquierda del sub-rectangulo 
//     de la imagen origen a dibujar en el contexto de destino.
// sy - La coordenada Y de la esquina superior izquierda del sub-rectangulo 
//     de la imagen origen a dibujar en el contexto de destino.
// sWidth - El ancho del sub-rectangulo de la imagen origen a dibujar en el 
//     contexto de destino. Si no se especifica, se utiliza todo el rectangulo 
//     entero desde las coordenadas especificadas por sx y sy hasta la esquina 
//     inferior derecha de la imagen.
// sHeight - La altura del sub-rectangulo de la imagen origen a dibujar en el 
//     contexto de destino.

// var img = new Image();
// img.src = 'erizos.jpg';
// img.onload = function() {
//     var ctx = document.getElementById('canvasE7').getContext('2d');
//     ctx.drawImage(img, 0, 0, 400, 200);
// }

// b) Implementar una función que aplique el filtro de escala de grises y 
// muestre el resultado en el canvas.

var img = new Image();
img.src = 'erizos.jpg';
img.onload = function() {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvasE7');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 400, 200);
  img.style.display = 'none';
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  var grayscale = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var grayscalebtn = document.getElementById('filtroGris');
  grayscalebtn.addEventListener('click', grayscale);
}