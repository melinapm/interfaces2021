"use strict";

// TP1 - E1
//Definir una matriz de 100 elementos x 100 elementos y completarla con
//valores enteros random

let widthMat = 2;   //x
let heightMat = 2;  //y
let numeroMinimo = 0;
let numeroMaximo = 10;

document.addEventListener("DOMContentLoaded", generarMatriz(widthMat, heightMat));

// Generar matriz con numeros aletorios
function generarMatriz(widthMat, heightMat){

    let matriz = [];
    for (let x=0; x < widthMat; x++) {
        matriz[x] = [];
        for (let y=0; y < heightMat; y++) {
            matriz[x][y] = Math.floor(Math.random() * (numeroMaximo - numeroMinimo)) + numeroMinimo;
        }
    }
    mostrarMatriz(matriz);
    //console.log( "El valor maximo de la matriz es: " + maximoMatriz(matriz));
    //matrizParesImpares(matriz);
    promedioFilas(matriz)
}

// Mostrar matriz
function mostrarMatriz(matriz){
    for (let y=0; y < heightMat; y++) {
        for (let x=0; x < widthMat; x++) {
            console.log("x: " +x+ " y: " +y+ " Valor: " + matriz[x][y]);
        }
    }
}

// a) Escribir una función que retorne el valor máximo de toda la matriz
function maximoMatriz(matriz){
    let maximo = 0;
    for (let x=0; x < matriz.length; x++)
        for (let y=0; y < matriz[x].length; y++)
            if ( matriz[x][y] > maximo)
                maximo = matriz[x][y];
    return maximo;
}

//b) Escribir una función que retorne el valor máximo contenido en las filas pares y el valor
//mínimo en las filas impares
function matrizParesImpares(matriz){
    let maximoPares = 0;
    let minimoImpares = numeroMaximo + 1;

    for (let x=0; x < matriz.length; x++)
        for (let y=0; y < matriz[x].length; y++)
            if (y % 2 == 0) {
                if ( matriz[x][y] > maximoPares)
                    maximoPares = matriz[x][y];
            } else {
                if ( matriz[x][y] < minimoImpares)
                    minimoImpares = matriz[x][y];
            }
           
    console.log("El maximo valor de las filas pares es: " + maximoPares);
    console.log("El minimo valor de las filas impares es: " + minimoImpares);
}

// c) Calcular el valor promedio de cada fila y guardarlos en un arreglo.
function promedioFilas(matriz){
    let arrayPromedio = [];
    
    for(let y=0; y < heightMat ; y++){
        let sumaTotal = 0;
        for(let x=0; x < widthMat; x++)
            sumaTotal = sumaTotal + matriz[x][y];
        arrayPromedio.push(sumaTotal / widthMat);
    }

    for(let x=0; x < arrayPromedio.length; x++)
        console.log(arrayPromedio[x]);
}