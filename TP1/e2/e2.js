"use strict";

// TP1 - E2
// 2. Pintar una región rectangular de un color utilizando el Contexto de HTML5.

var canvas = document.getElementById('canvasE2');

// Checking for support
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(200, 0, 0)'; // setea o retorna el color, gradiente o patron a dibujar
    // void ctx.fillRect(x, y, width, height);
    ctx.fillRect(0, 0, 150, 150); // dibuja un rectángulo relleno en la posición ( x, y )
} else {
    console.log("canvas-unsupported")
    // canvas-unsupported code here
}