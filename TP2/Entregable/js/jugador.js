/*
  # Clase Jugador
  #
  # Cada jugador se encarga de dibujar sus fichas al momento de instanciarse 
*/

class Jugador {
  constructor(nombre,turno,cantfichas,color,colorj1,colorj2,posfichaini) {
    this.nombre = nombre;
    this.turno = turno;
    this.fichas = new Array(cantfichas);
    this.color = color;
    this.colorj1 = colorj1;
    this.colorj2 = colorj2;
    this.posfichaini = posfichaini;
    this.posYinicial = 80;
    for (let i = 0; i < cantfichas; i++) {
      if (this.posYinicial>canvas.height && this.color==colorj1) {
        this.posfichaini += 50;
        this.posYinicial = 80;
      }
      else if (this.posYinicial>canvas.height && this.color==colorj2) {
        this.posfichaini -= 50;
        this.posYinicial = 80;
      }
      this.fichas[i] = new Ficha(this.posfichaini,this.posYinicial,context,fichaimg,this.color,this.color);
      this.posYinicial += 50;
    }
  }

  setTurno(boolean) {
    this.turno = boolean;
  }

  drawFichitas() {
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].draw();
    }
  }

  getTurno() {
    return this.turno;
  }

  getFichas() {
    return this.fichas;
  }

  getNombre() {
    return this.nombre;
  }

}
