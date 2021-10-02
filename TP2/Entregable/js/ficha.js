/*
  # Clase Ficha
  #
  # Se hereda la clase Figura para dibujar las imagenes que correspondan y de que color. 
  # Cada ficha tiene una posicion (x, y) que corresponde a una posicion del canvas , desde su centro.
  # Responde con un booleano en caso que este siendo clickeada y modifica su posicion en caso de ser necesario
  # donde se re-dibuja en el canvas (x,y). Cuando una ficha ya esta en uso, no puede modificar su posicion  (matriz[c][f])
  #
*/

class Ficha extends Figura {
  constructor(posX,posY,context,imagen,color,highlightedStyle) {
    super(posX,posY,context,imagen);
    this.color = color;
    this.radius = 22;
    this.highlighted = false; 
    this.highlightedStyle = highlightedStyle;
    this.posXOriginal=posX;
    this.posYOriginal=posY;
    this.enuso = false;
  }

  draw() {
    let imgX = this.posX - this.radius;
    let imgY = this.posY - this.radius;
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    this.context.fill();
    if (this.highlighted === true) {
      this.context.strokeStyle = this.highlightedStyle;
      this.context.lineWidth = 5;
      this.context.stroke();
    }
    this.context.drawImage(this.imagen, imgX, imgY,44,43);
    this.context.closePath();
    }

  getRadius() {
    return this.radius;
  }

  setHighlighted(boolean) {
    this.highlighted = boolean;
  }

  isPointInside(x,y) {
    let _x = this.posX - x;
    let _y = this.posY - y;
    return Math.sqrt(_x * _x + _y * _y) < this.radius;
  }
  
  setPosition(x,y) {
    if (this.enuso==false) {
      this.posX = x;
      this.posY = y;
    }
  }

  getPosXOriginal() {
    return this.posXOriginal;
  }

  getPosYOriginal() {
    return this.posYOriginal;
  }
  
  setUso() {
    this.enuso = true;
  }

  getUso() {
    return this.enuso;
  }

  getColor() {
    return this.color;
  }
}
