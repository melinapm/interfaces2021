class Jugador {
  constructor(turno,cantfichas,color,posfichaini){
    this.turno = turno;
    this.fichas = new Array(cantfichas);
    this.color = color;
    this.posfichaini = posfichaini;
    this.posYinicial = 80;
    for (let i = 0; i < cantfichas; i++) {
      if (this.posYinicial>950 && this.color=="blue") {
        this.posfichaini += 50;
        this.posYinicial = 80;
      }
      else if (this.posYinicial>950 && this.color=="red") {
        this.posfichaini -= 50;
        this.posYinicial = 80;
      }
      this.fichas[i] = new Ficha(this.posfichaini,this.posYinicial,context,fichaimg,this.color,this.color);
      this.posYinicial += 50;
    }
  }
  setTurno(boolean){
    this.turno = boolean;
  }
  drawFichitas(){
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].draw();
    }
  }
  getTurno(){
    return this.turno;
  }
  getFichas(){
    return this.fichas;
  }
}
