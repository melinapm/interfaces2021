/*
  # Clase Tablero
  #
  # Clase encargada de dibujar el tablero, para esto asigna las celdas correspondientes
  # a cada posicion (x,y) que corresponde a (c,f) de la matriz del tablero, donde 
  # c son las columnas y f las filas. Tambien se dibuja la zona donde se pueden dejar las fichas para insertarlas. (zona de caidas) 
  # Retorna en que celda se debe insertar la ficha segun en que caida solto la ficha el jugador.
  # Se encarga de chequear si hay algun ganador por cada movimiento que hicieron los jugadores
  #
*/

class Tablero {
  constructor(filas,columnas,colorj1,colorj2,nombrej1,nombrej2) {
    this.colorj1=colorj1;
    this.colorj2=colorj2;
    this.nombrej1=nombrej1;
    this.nombrej2=nombrej2;
    this.filas=filas;
    this.columnas=columnas;
    this.posicion = (canvas.width - 50 * columnas)/2;
    this.caidas = new Array(columnas);
    this.matriz = new Array(columnas);
    this.ganador=null;
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
  
  getCaidas(){
    return this.caidas;
  }

  tirarFicha(columna){
    for (let i = this.filas-1; i >= 0; i--) {
      let celdaactual = this.matriz[columna][i];
      if (celdaactual.getFicha() == null) {
        return celdaactual;
      }
    }
  }

  checkganador(celdaactual){
    let color = celdaactual.getFicha().getColor();
    let columnaactual = celdaactual.getColumnaCelda();
    let filaactual = celdaactual.getFilaCelda();
    let cantfichas = 0;
    if (filaactual<this.filas-(nLineas-1)) { //CHEQUEA PARA ABAJO
      cantfichas=0;
      for (let i = filaactual; i < this.filas; i++) {
        if (this.matriz[columnaactual][i].getFicha().getColor()==color) {
          cantfichas++;
          if (cantfichas==nLineas) {
            if (color==colorj1) {
              this.ganador=nombrej1;
            }
            else {
              this.ganador=nombrej2;
            }
            return true;
          }
        }
      }
    }
    if(columnaactual>=(nLineas-1)) { //CHEQUEA DERECHA
      cantfichas=0;
      for (let i = columnaactual; i >= 0; i--) {
        if (this.matriz[i][filaactual].getFicha() != null) {
          if (this.matriz[i][filaactual].getFicha().getColor()==color) {
            cantfichas++;
            if (cantfichas==nLineas) {
              if (color==colorj1) {
                this.ganador=nombrej1;
              }
              else {
                this.ganador=nombrej2;
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if(columnaactual<this.columnas-(nLineas-1)) { //CHEQUEA izquierda
      cantfichas=0;
      for (let i = columnaactual; i < this.columnas; i++) {
        if (this.matriz[i][filaactual].getFicha () != null) {
          if (this.matriz[i][filaactual].getFicha().getColor()==color) {
            cantfichas++;
            if (cantfichas==nLineas) {
              if (color==colorj1) {
                this.ganador=nombrej1;
              }
              else {
                this.ganador=nombrej2;
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if (filaactual<this.filas-(nLineas-1) && columnaactual>=(nLineas-1)) { //chequea diagonal izquierda
      cantfichas = 0;
      let colaux = columnaactual;
      for (let i = filaactual ; i < this.filas; i++) {
        if(this.matriz[colaux][i].getFicha() != null){
          if(this.matriz[colaux][i].getFicha().getColor()==color){
            cantfichas++;
            colaux--;
            if (cantfichas==nLineas) {
              if (color==colorj1) {
                this.ganador=nombrej1;
              }
              else {
                this.ganador=nombrej2;
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
    if (filaactual<this.filas-(nLineas-1) && columnaactual<this.columnas-(nLineas-1)) {
      cantfichas = 0;
      let colaux = columnaactual;
      for (let i = filaactual ; i < this.filas; i++) {
        if(this.matriz[colaux][i].getFicha() != null){
          if(this.matriz[colaux][i].getFicha().getColor()==color){
            cantfichas++;
            colaux++;
            if (cantfichas==nLineas) {  
              console.log("llego");
              if (color==colorj1) {
                this.ganador=nombrej1;
              }
              else {
                this.ganador=nombrej2;
              }
              return true;
            }
          }
          else {
            break;
          }
        }
      }
    }
  }

  getGanador(){
    return this.ganador;
  }
}
