"use strict";

// TP1 - E6
// 6. Pintar un rectángulo en pantalla, utilizando tres o cuatro colores en un 
// gradiente. Los tres colores deben ser armonías tonales. Puede ser en el eje X o Y

// Tipos de Grandientes
// createLinearGradient(x1, y1, x2, y2)
// createRadialGradient(x1, y1, r1, x2, y2, r2)
// createConicGradient(angle, x, y)

// Agrego color al gradiente
// gradient.addColorStop(position, color)


var ctx = document.getElementById('canvasE6').getContext('2d');

// Creo el grandiente
var gradienteLineal = ctx.createLinearGradient(0,0,0,150);
gradienteLineal.addColorStop(0, 'rgb(56, 160, 45)')
gradienteLineal.addColorStop(0.5, 'rgb(142, 183, 51)');
gradienteLineal.addColorStop(0.5, 'rgb(142, 183, 51)');
gradienteLineal.addColorStop(0.9, 'rgb(195, 193, 54)');

// lo seteo
ctx.fillStyle = gradienteLineal;

// creo rectangulo negro
ctx.fillRect(0, 0, 150, 150);
ctx.strokeRect(0, 0, 150, 150); // Borde

