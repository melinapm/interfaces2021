"use strict";

// TP1 - E4
// 4. Especificar la función para pintar un cuadrado utilizando un gradiente.


// Tipos de Grandientes
// createLinearGradient(x1, y1, x2, y2)
// createRadialGradient(x1, y1, r1, x2, y2, r2)
// createConicGradient(angle, x, y)

// Agrego color al gradiente
// gradient.addColorStop(position, color)


var ctx = document.getElementById('canvasE4').getContext('2d');

// Creo el grandiente
var gradienteLineal = ctx.createLinearGradient(0,0,0,150);
gradienteLineal.addColorStop(0, '#000');
gradienteLineal.addColorStop(0.9, '#fff');

// lo seteo
ctx.fillStyle = gradienteLineal;

// creo rectangulo negro
ctx.fillRect(0, 0, 150, 150);
ctx.strokeRect(0, 0, 150, 150); // Borde


/*
// Ejemplo MDN
var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
lingrad.addColorStop(0, '#00ABEB');
lingrad.addColorStop(0.5, '#fff');
lingrad.addColorStop(0.5, '#26C000');
lingrad.addColorStop(1, '#fff');

var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
lingrad2.addColorStop(0.5, '#000');
lingrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

// assign gradients to fill and stroke styles
ctx.fillStyle = lingrad;
// ctx.strokeStyle = lingrad2;

// draw shapes
ctx.fillRect(10, 10, 130, 130);
// ctx.strokeRect(50, 50, 50, 50);
*/