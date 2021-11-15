$('#modalPrincipal').modal({backdrop: 'static', keyboard: false})
$('#modalPrincipal').modal('show');

// Arrancamos a jugar!
let cantidadVidas;
let cantidadPiedras;
let trooperYInit = document.getElementById('trooper').getBoundingClientRect().y;
let validatorGame;
let botonesVolverAJugar = document.querySelectorAll('#volverAJugar');
let divCantObstaculos = document.getElementById('cantObstaculos');
let fondo;
let musica = document.getElementById("musica");

botonesVolverAJugar.forEach(function(boton) {
    boton.addEventListener('click', modalsGame);
});

function modalsGame(){
    // musica.currentTime = 0;
    // musica.play();
    $('#modalPrincipal').modal('hide');
    $('#modalPerdiste').modal('hide');
    $('#modalGanaste').modal('hide');
    fondo = document.getElementById('fondos').value;
    startAnimations();
    startGame();
};
  
document.addEventListener('keydown', (event) => {
    
    var name = event.key;
    switch (name) {
        case 'ArrowUp':
            if (document.getElementById('trooper').classList.contains('caminar')){
                document.getElementById('trooper').classList.remove('caminar');
                document.getElementById('trooper').classList.add('saltar');
                setTimeout(function() {
                    document.getElementById('trooper').classList.remove('saltar');
                    document.getElementById('trooper').classList.add('caminar');
                }, 500);
            }
            else{
                document.getElementById('trooper').classList.remove('correr');
                document.getElementById('trooper').classList.add('saltar');
                setTimeout(function() {
                    document.getElementById('trooper').classList.remove('saltar');
                    document.getElementById('trooper').classList.add('correr');
                }, 500);
            }
            
            break;
        case 'ArrowRight':
            // velocidadFondo(true);
            document.getElementById('trooper').classList.remove('caminar');
            document.getElementById('trooper').classList.add('correr');
            break;
        case 'ArrowLeft':
            // velocidadFondo(false);
            document.getElementById('trooper').classList.remove('correr');
            document.getElementById('trooper').classList.add('caminar');
            break;
    }
}, false);

function startGame(){
    cargarFondo();
    validatorGame = setInterval(function() {
    
        var piedraX = document.getElementById('obstaculo').getBoundingClientRect().x; // disminuye hasta el trooper
        var arturX = document.getElementById('obstaculo2').getBoundingClientRect().x; // disminuye hasta el trooper
        var corazonX = document.getElementById('vida').getBoundingClientRect().x; // disminuye hasta el trooper

        var trooperX = document.getElementById('trooper').getBoundingClientRect().x; // Siempre igual
        var trooperY = document.getElementById('trooper').getBoundingClientRect().y; // Siempre igual menos cuando salta que resta
        
        if ((((trooperX+35) >= piedraX) && (trooperX+5 < piedraX)) && (trooperY ==  trooperYInit)) { // No salto la piedra
            cantidadVidas--;
            changeLifes();
            document.getElementById('trooper').classList.remove('caminar');
            document.getElementById('trooper').classList.add('morir');
            setTimeout(function() {
                document.getElementById('trooper').classList.remove('morir');
                document.getElementById('trooper').classList.add('caminar');
            }, 500);
        } 
        else if ((((trooperX+35) >= arturX) && (trooperX+15 < arturX)) && (trooperY ==  trooperYInit)) { // No salto a arturo
            cantidadVidas--;
            changeLifes();
            document.getElementById('trooper').classList.remove('caminar');
            document.getElementById('trooper').classList.add('morir');
            setTimeout(function() {
                document.getElementById('trooper').classList.remove('morir');
                document.getElementById('trooper').classList.add('caminar');
            }, 500);
        } 
        else if (((((trooperX+35) >= piedraX) && (trooperX+5<piedraX)) && (trooperY <  trooperYInit)) 
                    || ((((trooperX+35) >= arturX) && (trooperX+15<arturX)) && (trooperY <  trooperYInit))){ // Salto algun obstaculo
            cantidadPiedras --;
            divCantObstaculos.innerHTML = cantidadPiedras;
        }
        
        var diferencia = Math.abs(eval(trooperX-corazonX)); // Agarro corazon
        if (diferencia <= 15) {
            if (cantidadVidas < 3) {
                cantidadVidas ++;
                changeLifes();
                document.getElementById('vida').style.backgroundSize = "150px";
                document.getElementById('vida').style.top = "430px";
                document.getElementById('vida').style.left = "80px";
                document.getElementById('vida').classList.add('remove-animation');
                setTimeout(function() {
                    document.getElementById('vida').style.backgroundSize = "75px";
                    document.getElementById('vida').style.top = "530px";
                    document.getElementById('vida').classList.remove('remove-animation');
                    
                }, 500);
                    
            }
        }

        if (cantidadVidas == 0) {
            endGame();
        }
        if (cantidadPiedras == 0) {
            winGame();
        }

    }, 100);
}

function endGame(){
    $('#modalPerdiste').modal({backdrop: 'static', keyboard: false})
    $('#modalPerdiste').modal('show');
    clearInterval(validatorGame);
    stopAnimations();
}
function changeLifes(){
    let vidas = document.getElementById('vidas');
    switch (cantidadVidas) {
        case 3:
            vidas.style.background = 'url(images/lifes.png) 0px 30px';
            break;
        case 2:
            vidas.style.background = 'url(images/lifes.png) 0px 70px';
            break;
        case 1:
            vidas.style.background = 'url(images/lifes.png) 0px 110px';
            break;
        case 0:
            vidas.style.background = 'url(images/lifes.png) 0px 150px';
            break;
    }
}

function stopAnimations(){
    var animations = document.getElementsByClassName('layer');
    for (var i = 0; i < animations.length; i++) {
        animations.item(i).classList.add('remove-animation');
    }
}

function startAnimations(){
    cantidadVidas = 3;
    cantidadPiedras = 10;
    divCantObstaculos.innerHTML = cantidadPiedras;
    changeLifes();
    var animations = document.getElementsByClassName('layer');
    for (var i = 0; i < animations.length; i++) {
        animations.item(i).classList.remove('remove-animation');;
    }
}


function winGame(){
    $('#modalGanaste').modal({backdrop: 'static', keyboard: false})
    $('#modalGanaste').modal('show');
    clearInterval(validatorGame);
    stopAnimations();
}

function cargarFondo(){
    if (fondo == 'Dia') {
        document.getElementById('fondo0').style.background = 'url(images/layer-0b.png)';
        document.getElementById('fondo1').style.background = 'url(images/layer-1b.png)';
        document.getElementById('fondo2').style.background = 'url(images/layer-2b.png)';
        document.getElementById('fondo3').style.background = 'url(images/layer-3b.png)';
        document.getElementById('fondo4').style.background = 'url(images/layer-4b.png)';
        document.getElementById('fondo5').style.background = 'url(images/layer-5b.png)';
        document.getElementById('fondo6').style.background = '';
        document.getElementById('fondo7').style.background = 'url(images/layer-7b.png)';
        document.getElementById('fondo8').style.background = '';
        document.getElementById('fondo9').style.background = '';
    } else {
        document.getElementById('fondo0').style.background = 'url(images/layer-0.png)';
        document.getElementById('fondo1').style.background = 'url(images/layer-1.png)';
        document.getElementById('fondo2').style.background = 'url(images/layer-2.png)';
        document.getElementById('fondo3').style.background = 'url(images/layer-3.png)';
        document.getElementById('fondo4').style.background = 'url(images/layer-4.png)';
        document.getElementById('fondo5').style.background = 'url(images/layer-5.png)';
        document.getElementById('fondo6').style.background = 'url(images/layer-6.png)';
        document.getElementById('fondo7').style.background = 'url(images/layer-7.png)';
        document.getElementById('fondo8').style.background = 'url(images/layer-8.png)';
        document.getElementById('fondo9').style.background = 'url(images/layer-9.png)';
    }
}

// function velocidadFondo(incremento){
//     if (incremento){
//         document.getElementById('obstaculo').style.animationDuration = "3s";
//         document.getElementById('obstaculo2').style.animationDuration = "5s";
//         document.getElementsByClassName('fondo9')[0].style.animationDuration = "1s";
//         document.getElementsByClassName('fondo8')[0].style.animationDuration = "3s";
//         document.getElementsByClassName('fondo7')[0].style.animationDuration = "5s";
//         document.getElementsByClassName('fondo6')[0].style.animationDuration = "12s";
//         document.getElementsByClassName('fondo5')[0].style.animationDuration = "20s";
//         document.getElementsByClassName('fondo4')[0].style.animationDuration = "25s";
//         document.getElementsByClassName('fondo3')[0].style.animationDuration = "30s";
//         document.getElementsByClassName('fondo2')[0].style.animationDuration = "40s";        
//     } else {
//         document.getElementById('obstaculo').style.animationDuration = "6s";
//         document.getElementById('obstaculo2').style.animationDuration = "10s";
//         document.getElementsByClassName('fondo9')[0].style.animationDuration = "10s";
//         document.getElementsByClassName('fondo8')[0].style.animationDuration = "13s";
//         document.getElementsByClassName('fondo7')[0].style.animationDuration = "15s";
//         document.getElementsByClassName('fondo6')[0].style.animationDuration = "22s";
//         document.getElementsByClassName('fondo5')[0].style.animationDuration = "30s";
//         document.getElementsByClassName('fondo4')[0].style.animationDuration = "35s";
//         document.getElementsByClassName('fondo3')[0].style.animationDuration = "40s";
//         document.getElementsByClassName('fondo2')[0].style.animationDuration = "50s";
//     }
// }