class Tropper {

    constructor(image){
        this.image = image;
        this.spriteWidth = 92;
        this.spriteHeight = 115;
        this.frameX = 0; // Mueve
        this.frameY = 0; // Cambia sprite
        this.gameFrame = 0;
        this.position = 0;
    }

  /*   draw() {
        ctx.drawImage(this.image, this.frameX, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0, 500, 115, 90);
    } */

    animate(){ 
        //ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        this.position = this.gameFrame % 9;
        this.frameX = this.spriteWidth * this.position;
        ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, 0, 500, this.spriteHeight, this.spriteWidth);

        if (this.frameX > 810){
            this.frameX = 0;
            this.gameFrame = 0;
        }

        this.gameFrame ++;

        requestAnimationFrame(this.animate.bind(this)); //bind(this) esta por que sino solamente conoce el conetexto en el primer ciclo
    };
    
}
    
