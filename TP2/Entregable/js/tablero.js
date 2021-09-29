/*
  # Clase Tablero
  #
  # Clase encargada de dibujar el tablero, para esto asigna las celdas correspondientes
  # a cada posicion (x,y) que corresponde a (c,f) de la matriz del tablero, donde 
  # c son las columnas y f las filas.
  # Tambien se dibuja la zona donde se pueden dejar las fichas para insertarlas. (zona de caidas) 
  # 
  #
*/

class Tablero {
  constructor(filas,columnas) {
    this.filas=filas;
    this.columnas=columnas;
    this.posicion = (canvas.width-50*columnas)/2;
    this.caidas = new Array(columnas);
    this.matriz = new Array(columnas);
    for (let c = 0; c < columnas; c++) {
      this.matriz[c] = [];
      this.caidas[c] = new Caida(this.posicion+50*c,context);
      for (let f = 0; f < filas; f++) {
        this.matriz[c][f] = new Celda(this.posicion+50*c,100+50*f,context,imgCasilleroVacio,false,c,f);
      }
    }
  }

  draw(){
    for (let c = 0; c < this.columnas; c++) {
      this.caidas[c].draw();
      for (let f = 0; f < this.filas; f++) {
        this.matriz[c][f].draw();
      }
    }
  }
  
}
