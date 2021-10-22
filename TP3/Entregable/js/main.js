// Variables globales
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 0;

// Fondos
const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png';
const backgroundLayer2= new Image();
backgroundLayer2.src = 'images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'images/layer-3.png';

// Trooper
let playerImage = new Image();
playerImage.src = 'images/walk.png';



$('#modalPrincipal').modal({backdrop: 'static', keyboard: false})
$("#modalPrincipal").modal('show');

// Cuando tengo todo cargado
window.addEventListener('load', function() {

    // Arrancamos a jugar!
    document.addEventListener('keydown', (event) => {
        $("#modalPrincipal").modal('hide');
        var name = event.key;
        if (name == 'ArrowRight') {
            staggerFrames = 5;
            gameSpeed = 10;
        }
    }, false);

    const layer1 = new Layer(backgroundLayer1, 0.3);
    const layer2 = new Layer(backgroundLayer2, 0.5);
    const layer3 = new Layer(backgroundLayer3, 0.8);
    
    const gameObject = [layer1, layer2, layer3];
    
    const tropper = new Tropper(playerImage);

    // Funcion para mover el fondo
    function animateBackground() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Reseteo el context asi no arrastra la imagen
        gameObject.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animateBackground);
    };

    animateBackground();
    tropper.animate();
});



