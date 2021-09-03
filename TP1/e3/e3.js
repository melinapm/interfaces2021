"use strict";

// TP1 - E3
// 3. Pintar una región rectangular de un color utilizando la estructura de ImageData.

// ImageData()
// The ImageData() constructor returns a newly instantiated ImageData object 
// built from the typed array given and having the specified width and height.
// Syntax
// new ImageData(array, width [, height]);
// new ImageData(width, height);

// El arreglo tiene un tamaño de 120000: son 10.000 pixels que cada uno corresponde
// a 4 valores (rgba). El constructor de ImageData especifica un ancho de 200, entonces
// la altura por defecto es 10.000 dividido 200 = 50, con un tamaño de 120000 la altura que
// defino es de 150

const canvas = document.getElementById('canvasE3');
const ctx = canvas.getContext('2d');
const arr = new Uint8ClampedArray(120000);

// Pinto cada pixel del arreglo
for (let i = 0; i < arr.length; i += 4) {
  arr[i + 0] = 0;    // R value
  arr[i + 1] = 190;  // G value
  arr[i + 2] = 0;    // B value
  arr[i + 3] = 255;  // A value
}

// Inicializo una nueva imagen con el arreglo de pixeles
let imageData = new ImageData(arr, 200);

// Dibujo la imagen en el canvas
ctx.putImageData(imageData, 0, 0);


// Otra forma sin generar el arreglo de pixeles
var imageData2 = new ImageData(100, 100);

for (var i=0; i < imageData2.data.length ; i+=4) {
    imageData2.data[i+0]=255;
    imageData2.data[i+1]=0;
    imageData2.data[i+2]=0;
    imageData2.data[i+3]=255;
}
ctx.putImageData(imageData2, 50, 50);