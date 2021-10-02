/*
  # Clase Caida
  #
  # Corresponde a la zona donde se puede dejar la ficha para
  # que caiga sobre la columna correspondiente
*/

class Caida {
  constructor(posX,context) {
    this.posX = posX;
    this.posY = 50;
    this.width = 49;
    this.height = 45;
    this.context = context;
  }
  draw(){
    this.context.beginPath();
    this.context.rect(this.posX, this.posY, this.width, this.height);
    this.context.fillStyle="green";
    this.context.lineWidth = 1;
    this.context.stroke();
    this.context.fill();
  }
  getPosX(){
    return this.posX;
  }
}
