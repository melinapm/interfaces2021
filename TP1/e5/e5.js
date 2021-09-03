"use strict";

// TP1 - E5
// 5. Pintar un rectángulo en pantalla, utilizando tres colores en un gradiente: 
// De negro a amarillo en la primera mitad del ancho del rectángulo, y de amarillo 
// a rojo, en la segunda mitad. Por otro lado, en Y el degrade se mantiene constante


// Tipos de Grandientes
// createLinearGradient(x1, y1, x2, y2)
// createRadialGradient(x1, y1, r1, x2, y2, r2)
// createConicGradient(angle, x, y)

// Agrego color al gradiente
// gradient.addColorStop(position, color)


var ctx = document.getElementById('canvasE5').getContext('2d');

// Creo el grandiente
var gradienteLineal = ctx.createLinearGradient(150,0,0,0);
gradienteLineal.addColorStop(0, 'rgb(190,0,0)')
gradienteLineal.addColorStop(0.5, 'rgb(190,190,0)');
gradienteLineal.addColorStop(0.5, 'rgb(190,190,0)');
gradienteLineal.addColorStop(0.9, 'rgb(0,0,0)');

// lo seteo
ctx.fillStyle = gradienteLineal;

// creo rectangulo negro
ctx.fillRect(0, 0, 150, 150);
ctx.strokeRect(0, 0, 150, 150); // Borde

