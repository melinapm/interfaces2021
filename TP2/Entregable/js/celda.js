/*
  # Clase Celda
  #
  # Se hereda la clase Figura para dibujar las imagenes que correspondan, celda vacia o en uso. 
  # Si la celda esta en uso se le asigna una ficha correspondientes a uno de los jugadores.
  # Cada celda tiene una posicion (c, f) que corresponde a la matriz
  # donde se dibuja el tablero (x,y) (matriz[c][f])
  #
*/

class Celda extends Figura {
  constructor(posX,posY,context,imagen,enuso,columnaCelda,filaCelda){
    super(posX,posY,context,imagen);
    this.width = 50;
    this.height = 50;
    this.enuso=enuso;
    this.ficha=null;
    this.columnaCelda = columnaCelda;
    this.filaCelda = filaCelda;
  }
  draw(){
    this.context.rect(this.posX, this.posY, this.width, this.height);
    this.context.drawImage(this.imagen, this.posX, this.posY);
  }
  setFicha(ficha){
    this.ficha=ficha;
  }
  getFicha(){
    return this.ficha;
  }
  getColumnaCelda(){
    return this.columnaCelda;
  }
  getFilaCelda(){
    return this.filaCelda;
  }
}
