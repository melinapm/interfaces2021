$('#modalPrincipal').modal({backdrop: 'static', keyboard: false})
$("#modalPrincipal").modal('show');

// Arrancamos a jugar!
let cantidadVidas;
let cantidadPiedras;
let trooperYInit = document.getElementById('trooper').getBoundingClientRect().y;
let validatorGame;
let botonesVolverAJugar = document.querySelectorAll("#volverAJugar");
let divCantObstaculos = document.getElementById('cantObstaculos');

botonesVolverAJugar.forEach(function(boton) {
    boton.addEventListener("click", modalsGame);
});

function modalsGame(){
    $("#modalPrincipal").modal('hide');
    $("#modalPerdiste").modal('hide');
    $("#modalGanaste").modal('hide');
    startAnimations();
    startGame();
};
  
document.addEventListener('keydown', (event) => {
    
    var name = event.key;
    switch (name) {
        case 'ArrowUp':
            document.getElementById('trooper').classList.remove('caminar');
            document.getElementById('trooper').classList.add('saltar');
            setTimeout(function() {
                document.getElementById('trooper').classList.remove('saltar');
                document.getElementById('trooper').classList.add('caminar');
            }, 100);
            break;
    }
}, false);

function startGame(){
    validatorGame = setInterval(function() {
    
        var piedraX = document.getElementById('obstaculo').getBoundingClientRect().x; // disminuye hasta el trooper

        var trooperX = document.getElementById('trooper').getBoundingClientRect().x; // Siempre igual
        var trooperY = document.getElementById('trooper').getBoundingClientRect().y; // Siempre igual menos cuando salta que resta
        
        if ((((trooperX+35) >= piedraX) && (trooperX <= piedraX+10)) && (trooperY ==  trooperYInit)) {
            cantidadVidas--;
            changeLifes();
            document.getElementById('trooper').classList.remove('caminar');
            document.getElementById('trooper').classList.add('morir');
            setTimeout(function() {
                document.getElementById('trooper').classList.remove('morir');
                document.getElementById('trooper').classList.add('caminar');
            }, 1000);} 
        else if (((trooperX+35) >= piedraX) && (trooperY <  trooperYInit)) {
            cantidadPiedras --;
            divCantObstaculos.innerHTML = cantidadPiedras;
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
    $("#modalPerdiste").modal('show');
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
    var animations = document.getElementsByClassName("layer");
    for (var i = 0; i < animations.length; i++) {
        animations.item(i).classList.add('remove-animation');;
    }
}

function startAnimations(){
    cantidadVidas = 3;
    cantidadPiedras = 10;
    divCantObstaculos.innerHTML = cantidadPiedras;
    changeLifes();
    var animations = document.getElementsByClassName("layer");
    for (var i = 0; i < animations.length; i++) {
        animations.item(i).classList.remove('remove-animation');;
    }
}


function winGame(){
    $('#modalGanaste').modal({backdrop: 'static', keyboard: false})
    $("#modalGanaste").modal('show');
    clearInterval(validatorGame);
    stopAnimations();
}