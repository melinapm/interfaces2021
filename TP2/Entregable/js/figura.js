/*
  # Clase Figura
  #
  # Todos los metodos para asignar una imagen.
  # La hereda celda para poder insertar una imagen en los 
  # casillos vacios y tambien para las fichas cuando son insertadas
*/

class Figura {
  constructor(posX, posY, context,imagen) {
    this.posX = posX;
    this.posY = posY;
    this.imagen = new Image();
    this.imagen = imagen;
    this.context = context;
    }

  setFill(fill){
    this.fill = fill;
  }
  getPosition(){
    return{
      x : this.getPosX(),
      y : this.getPosY()
    };
  }
  getPosX(){
    return this.posX;
  }
  getPosY(){
    return this.posY;
  }
  getFill(){
    return this.fill;
  }
  getImg(){
    return img;
  }
  setImg(img){
    this.imagen.src = img;
    pat = this.context.createPattern(img,"no-repeat");
  }

}
