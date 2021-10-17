// Variables globales
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;

// Fondos
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2= new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = 'layer-6.png';
const backgroundLayer7 = new Image();
backgroundLayer7.src = 'layer-7.png';

// Cuando tengo todo cargado
window.addEventListener('load', function() {
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= - this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, 0.1);
    const layer2 = new Layer(backgroundLayer2, 0.2);
    const layer3 = new Layer(backgroundLayer3, 0.3);
    const layer4 = new Layer(backgroundLayer4, 0.5);
    const layer5 = new Layer(backgroundLayer5, 0.7);
    const layer6 = new Layer(backgroundLayer6, 0.9);
    const layer7 = new Layer(backgroundLayer7, 1);
    
    const gameObject = [layer1, layer2, layer3, layer4, layer5, layer6, layer7];
    
    // Funcion para mover el fondo
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Reseteo el context asi no arrastra la imagen
        gameObject.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
});
