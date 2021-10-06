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

// Foto de fichas
let fichas;
let fichaimg = new Image();
fichaimg.src = './imagenes/ficha_J1.png';

// Carga el canvas con la imagen de fondo y el tamaño predefinido
function clearCanvas(){
  context.drawImage(fondo, 0, 0, canvas.width, canvas.height);
}

// Variables para el timer del turno
let tiempoTurnoSeg = 30;
let timeOutTurnoMostrado;
let timerTurno;

// TimerGlobal del juego en milisegundos
let timeOutGlobal;
let segTimeOutGlobal = 60000;

// Hago que no se pueda hacer click por fuera del modal ;)
$('#jugarModal').modal({backdrop: 'static', keyboard: false})

//Jugadores
let nombreJ1;
let nombreJ2;
let colorJ1;
let colorJ2;
let jugadores = new Array(2);

//Tablero
let tablero;
let columnas = 0;
let nLineas;


// Funciones del Juego

function imprimirTurno(){
  context.textAlign="center";
  context.font="20pt Verdana";
  context.fillStyle = "grey";
  context.shadowOffsetX = 3;
  context.shadowOffsetY = 3;
  context.shadowColor = "rgba(0,0,0,0.3)";
  if (jugadores[0].getTurno()==true) {
    context.fillText("Juega " + nombreJ1 + " - " + timeOutTurnoMostrado, canvas.width/2 ,30);
  }
  else {
    context.fillText("Juega " + nombreJ2 + " - " + timeOutTurnoMostrado, canvas.width/2 ,30);
  }
}

function imprimirJugadores(){
   context.font="20pt Verdana";
   context.textAlign="left";
   context.fillStyle = colorJ1;
   context.fillText(nombreJ1, 10 ,30);
   context.textAlign="right";
   context.fillStyle = colorJ2;
   context.fillText(nombreJ2, canvas.width - 10 ,30);
}

function generateFichas(){
  jugadores[0].drawFichitas();
  jugadores[1].drawFichitas();
}

function limpiar(){
  clearCanvas();
  tablero.draw();
}

function drawFichas(){
  limpiar();
  jugadores[0].drawFichitas();
  jugadores[1].drawFichitas();
  imprimirJugadores();
  imprimirTurno();
}

function findClickedFigure(x,y) { //Chequea si clickee una figura
  let fichasjugador;
  if (jugadores[0].getTurno()==true) {
    fichasjugador=jugadores[0].getFichas();
    for (let i = 0; i < fichasjugador.length; i++) {
      if (fichasjugador[i].isPointInside(x,y)){
        return fichasjugador[i];
      }
    }
  }
  else {
    fichasjugador=jugadores[1].getFichas();
    for (let i = 0; i < fichasjugador.length; i++) {
      if (fichasjugador[i].isPointInside(x,y)){
        return fichasjugador[i];
      }
    }
  }
}

let lastClickedFigure = null;
let isMouseDown = false;

function onMouseDown(event){
  isMouseDown = true;
  if (lastClickedFigure != null) {
    lastClickedFigure.setHighlighted(false);
    lastClickedFigure = null;
  }
  let clickedfigure = findClickedFigure(event.layerX, event.layerY);
  if (clickedfigure != null ) {
    clickedfigure.setHighlighted(true);
    lastClickedFigure = clickedfigure;
  }
  drawFichas();
}

function onMouseMoved(event){
  if (isMouseDown && lastClickedFigure != null) {
    lastClickedFigure.setPosition(event.layerX,event.layerY);
    drawFichas();
  }
}

function onMouseUp(){
  isMouseDown = false;
  if (lastClickedFigure != null) {
    clearInterval(timeOutGlobal);
    let posxficha = lastClickedFigure.getPosX();
    let posyficha = lastClickedFigure.getPosY();
    let caidas = tablero.getCaidas();

    // Se calcula la zona de caida de forma dinamica en relacion a la cantidad de columnas
    let maxValorCaida;
    maxValorCaida = (canvas.width /2 ) + (50 * columnas / 2)
    let minValorCaida;
    minValorCaida = (canvas.width /2 ) - (50 * columnas / 2)

    if ((posyficha > 50 && posyficha < 95) && (posxficha > minValorCaida && posxficha < maxValorCaida)) {
      for (let i = 0; i < caidas.length; i++) {
        if ((posyficha > 50 && posyficha   < 95) && (posxficha > caidas[i].getPosX() && posxficha < caidas[i].getPosX()+49)) {
          let celda=tablero.tirarFicha(i);
          if (celda != null) {
            celda.setFicha(lastClickedFigure);
            lastClickedFigure.setPosition(celda.getPosX()+25,celda.getPosY()+25);
            lastClickedFigure.setUso();
            tablero.checkganador(celda); // Valido por cada caida de ficha si alguien gano
            // Reseteo el timer y lo inicio para el cambio de turno
            clearInterval(timerTurno);
            alertaTurno();
            if (jugadores[0].getTurno()==true) {
              jugadores[0].setTurno(false);
              jugadores[1].setTurno(true);
            }
            else {
              jugadores[1].setTurno(false);
              jugadores[0].setTurno(true);
            }
          }
          else {
            lastClickedFigure.setPosition(lastClickedFigure.getPosXOriginal(),lastClickedFigure.getPosYOriginal());
          }
        }
      }
    }
    else {
      lastClickedFigure.setPosition(lastClickedFigure.getPosXOriginal(),lastClickedFigure.getPosYOriginal());
    }
    drawFichas();
  }
  if (tablero.getGanador() != null) {
    clearCanvas();
    if (tablero.getGanador() == "Jugador 1")
      document.querySelector("#nombreGanador").innerHTML = "¡Gano " + jugadores[0].getNombre() + "!";
    else
      document.querySelector("#nombreGanador").innerHTML = "¡Gano " + jugadores[1].getNombre() + "!";
    $("#modalGanador").modal('show');

    canvas.removeEventListener('mousedown',onMouseDown,false); //ESTOS LISTENER NO SE SI VAN ACA
    canvas.removeEventListener('mouseup',onMouseUp,false);
    canvas.removeEventListener('mousemove',onMouseMoved,false);
    
  }
  timerJuego();
}


function newGame(){
  // Asigno el nombre de los jugadores
  nombreJ1 = document.querySelector("#nombreJ1").value;
  nombreJ2 = document.querySelector("#nombreJ2").value;
  // Asigno el color de los jugadores
  colorJ1 = document.querySelector("#colorJ1").value;
  colorJ2 = document.querySelector("#colorJ2").value;
  // Oculto el modal
  $("#jugarModal").modal('hide');

  // Me traigo cual n en lineas voy a jugar como int
  nLineas = parseInt(document.querySelector("#nLineas").value); 
  // Calculo el tamaño del tablero en relacion a la cantidad de lineas
  filas = nLineas + 2;
  columnas = nLineas + 3;

  clearCanvas();
  // Dibujar Tablero
  tablero = new Tablero(filas,columnas, imgCasilleroVacio);
  tablero.draw();

  // Crea los jugadores y las fichas
  
  let cantfichas = parseInt((filas*columnas)/2);
  jugadores[0] = new Jugador(nombreJ1,true,cantfichas,"blue",40);
  jugadores[1] = new Jugador(nombreJ2,false,cantfichas,"red",canvasWidth-40);
  jugadores[0].drawFichitas();
  jugadores[1].drawFichitas();
  canvas.addEventListener('mousedown',onMouseDown,false); //ESTOS LISTENER NO SE SI VAN ACA
  canvas.addEventListener('mouseup',onMouseUp,false);
  canvas.addEventListener('mousemove',onMouseMoved,false);
  clearInterval(timerTurno); // Reseteo el timer por si es un nuevo juego
  alertaTurno(); // Inicia el timer
}

// Boton modal Jugar
document.querySelector("#jugar").addEventListener("click",newGame);
// Boton nuevo juego
document.querySelector("#nuevoJuego").addEventListener("click", function(){
  $("#jugarModal").modal('show');
});
document.querySelector("#volverAJugar").addEventListener("click", function(){
  $("#modalGanador").modal('hide');
  newGame();
});


// Funcion para llevar el timer de cada turno
function alertaTurno() {
  timeOutTurnoMostrado = tiempoTurnoSeg;
  duration = timeOutTurnoMostrado;
  var timer = duration, seconds; // Variables del interval
  
  timerTurno = setInterval(function () {
    
       seconds = parseInt(timer % 60, 10); // Paso el valor a segundos
       seconds = seconds < 10 ? "0" + seconds : seconds; // Si los seg son < 10 que se muestren como 0? (01,02 ...)
       timeOutTurnoMostrado = "0:" + seconds; // Variable que se muestra en la pantalla
       
       if (--timer <= 0) { // Fin del turno!
          // Vuelvo todo al inicio y cambio el turno del jugador
          timer = duration;
          timeOutTurnoMostrado = tiempoTurnoSeg;
          duration = timeOutTurnoMostrado;
          timer = duration, seconds;
          if (jugadores[0].getTurno()==true) {
            jugadores[0].setTurno(false);
            jugadores[1].setTurno(true);
          }
          else {
            jugadores[1].setTurno(false);
            jugadores[0].setTurno(true);
          }     
       }
     drawFichas(); // Llamo para mostrar las fichas, la info de los jugadores y el tiempo de turno
   }, 1000);
}

// Funcion para llevar el timer global del juego
function timerJuego() {
  timeOutGlobal = window.setInterval(function(){
    $("#jugarModal").modal('show');
  }, segTimeOutGlobal);
}