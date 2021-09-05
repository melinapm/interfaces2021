//<----------Canvas--------->
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

//<----------Variables de la imagen a subir--------->
let image;
let imageData;
let imageAspectRatio;
let imageScaledWidth;
let imageScaledHeight;

//<----------Variables de herramientas de dibujo --------->
let paint = false;
let lazo = "lapiz";
let color = "rgb(0,0,0)";
let tamanio_pincel = 1;
let tamanio_goma = 5;

//<---------------------------------------Barra de herramientas-------------------------------------->

function filtrosChiquitos(){
  
}
function fotito(){
  negativo();
  document.getElementById("img-negativo").src = canvas.toDataURL("image/png");
  sepia();
  document.getElementById("img-sepia").src = canvas.toDataURL("image/png");
  brillo();
  document.getElementById("img-brillo").src = canvas.toDataURL("image/png");
  binario();
  document.getElementById("img-binario").src = canvas.toDataURL("image/png");
  blur();
  document.getElementById("img-blur").src = canvas.toDataURL("image/png");
  saturacion();
  document.getElementById("img-saturacion").src = canvas.toDataURL("image/png");
  original();
}
//<---------------------------------------Pincel Goma Colores-------------------------------------->
function startPosition(){
  paint = true;
}

function finishPosition(){
  paint = false;
  context.beginPath();
}

function draw(e){
  if(!paint) return;
  if (lazo=="lapiz") {
    context.lineWidth = tamanio_pincel;
    context.strokeStyle=color;
  }
  if (lazo=="borrador") {
    context.lineWidth = tamanio_goma;
    context.strokeStyle="rgb(255,255,255)";
  }
  context.lineCap = "round";
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  context.beginPath();
  context.moveTo(e.offsetX, e.offsetY);
}  

// Herramientas de dibujo
function pincel(){
  if (this.id == "pincel")
    color = "rgb(0,0,0)";
  lazo = "lapiz";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function goma(){
  lazo = "borrador";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function colores(e){
  color = e.target.style.color;
  pincel();
}

//<---------------------------------------FIN Barra de herramientas-------------------------------------->


//<----------Metodos para subir y descargar imagen--------->
function save() { //PREPARA EL ARCHIVO PARA HACER UN SAVE
  let dataURL = canvas.toDataURL();
  downloadImage(dataURL, 'my-canvas.jpeg');
}

function downloadImage(data, filename = 'untitled.jpeg') {  //DESCARGA LO QUE HAYA EN TU CANVAS
  let a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

function subir(){ //SUBE UNA FOTO DESDE DISCO
  let input = document.querySelector('#input1'); //ACA TIENE QUE IR EL ELEMENTO HTML PARA SUBIR LA FOTO
  input.click();
  // when click OK in the File Dialog
  input.onchange = e => {
      limpiar();
      // getting a hold of the file reference
      let file = e.target.files[0];

      // setting up the reader
      reader = new FileReader();
      reader.readAsDataURL(file); // this is reading as data url

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
          let content = readerEvent.target.result; // this is the content!

          image = new Image();
          //image.crossOrigin = 'Anonymous';

          image.src = content;

          image.onload = function () {
               imageAspectRatio = (1.0 * this.height) / this.width;
               imageScaledWidth = canvas.width;
               imageScaledHeight = canvas.width * imageAspectRatio;
               canvas.width = imageScaledWidth;
               canvas.height = imageScaledHeight;
               /*canvas.width = this.width;
               canvas.width = this.width;
               imageScaledWidth = this.width;
               imageScaledHeight = this.height;
              // draw image on canvas
              context.drawImage(this, 0, 0, canvas.width, canvas.height);*/

              // draw image on canvas
              context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
              fotito();
              // get imageData from content of canvas
          }
      }
  }
}
//<----------------------------------------------------------------------->

function limpiar(){ //DEJA EL CANVAS EN BLANCO
  context.fillStyle = "#FFFFFF"; // canvas background color
  context.fillRect(0, 0, canvas.width, canvas.height);
  image=null; //Limpia la foto por si dan en descargar no descargue lo antiguo
}

function getR(x,y){
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index + 0];
}

function getG(x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 1];
}

function getB(x,y){
  index = (x + y * imageData.width) * 4;
  return imageData.data[index + 2];
}

function original(){ //Foto original
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
}

//<------------------------------------------FILTROS-------------------------------------->

function negativo(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r = getR(x,y);
        g = getG(x,y);
        b = getB(x,y);
        imageData.data[index + 0] = 255-r;
        imageData.data[index + 1] = 255-g;
        imageData.data[index + 2] = 255-b;
      }
    }
    context.putImageData(imageData, 0, 0);
}

function brillo(){
  var ajusteBrillo = 40;
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r = getR(x,y);
        g = getG(x,y);
        b = getB(x,y);
        imageData.data[index + 0] = r + ajusteBrillo;
        imageData.data[index + 1] = g + ajusteBrillo;
        imageData.data[index + 2] = b + ajusteBrillo;
      }
    }
    context.putImageData(imageData, 0, 0);
}

function binario() {
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r=getR(x,y);
        g=getG(x,y);
        b=getB(x,y);
        let prom= r+g+b;
        if (prom<=382) {
          imageData.data[index + 0] = 0;
          imageData.data[index + 1] = 0;
          imageData.data[index + 2] = 0;
        }
        else {
          imageData.data[index + 0] = 255;
          imageData.data[index + 1] = 255;
          imageData.data[index + 2] = 255;
        }
      }
    }
    context.putImageData(imageData, 0, 0);
  }

function sepia(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
          r=getR(x,y);
          g=getG(x,y);
          b=getB(x,y);
          imageData.data[index + 0] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
          imageData.data[index + 1] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
          imageData.data[index + 2] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
      }
      }
      context.putImageData(imageData, 0, 0);
  }
  
function blur(){
context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
for (let x = 0; x < imageData.width; x++) {
  for (let y = 0; y < imageData.height; y++) {
      if (x==0 && y==0) { //esquina superior izquierda
      r = ((getR(x,y)+getR(x+1,y)+getR(x,y+1)+getR(x+1,y+1))/4);
      g = ((getG(x,y)+getG(x+1,y)+getG(x,y+1)+getG(x+1,y+1))/4);
      b = ((getB(x,y)+getB(x+1,y)+getB(x,y+1)+getB(x+1,y+1))/4);
      }
      else if ((x!=0 && x!=imageData.width-1) && (y==0)) { //borde superior
      r = ((getR(x,y)+getR(x-1,y)+getR(x-1,y+1)+getR(x,y+1)+getR(x+1,y+1)+getR(x+1,y))/6);
      g = ((getG(x,y)+getG(x-1,y)+getG(x-1,y+1)+getG(x,y+1)+getG(x+1,y+1)+getG(x+1,y))/6);
      b = ((getB(x,y)+getB(x-1,y)+getB(x-1,y+1)+getB(x,y+1)+getB(x+1,y+1)+getB(x+1,y))/6);
      }
      else if (x==imageData.width-1 && y==0) { //esquina superior derecha
      r = ((getR(x,y)+getR(x-1,y)+getR(x-1,y+1)+getR(x,y+1))/4);
      g = ((getG(x,y)+getG(x-1,y)+getG(x-1,y+1)+getG(x,y+1))/4);
      b = ((getB(x,y)+getB(x-1,y)+getB(x-1,y+1)+getB(x,y+1))/4);
      }
      else if (x==imageData.width-1 && (y!=0 && y!=imageData.height-1)) { //borde derecho
      r = ((getR(x,y)+getR(x,y-1)+getR(x-1,y-1)+getR(x-1,y)+getR(x-1,y+1)+getR(x,y+1))/6);
      g = ((getG(x,y)+getG(x,y-1)+getG(x-1,y-1)+getG(x-1,y)+getG(x-1,y+1)+getG(x,y+1))/6);
      b = ((getB(x,y)+getB(x,y-1)+getB(x-1,y-1)+getB(x-1,y)+getB(x-1,y+1)+getB(x,y+1))/6);
      }
      else if (x==imageData.width-1 && y==imageData.height-1) { //esquina inferior derecha
      r = ((getR(x,y)+getR(x,y-1)+getR(x-1,y-1)+getR(x-1,y))/4);
      g = ((getG(x,y)+getG(x,y-1)+getG(x-1,y-1)+getG(x-1,y))/4);
      b = ((getB(x,y)+getB(x,y-1)+getB(x-1,y-1)+getB(x-1,y))/4);
      }
      else if ((x!=0 && x!=imageData.width-1) && y==imageData.height-1) { //borde inferior
      r = ((getR(x,y)+getR(x-1,y)+getR(x-1,y-1)+getR(x,y-1)+getR(x+1,y-1)+getR(x+1,y))/6);
      g = ((getG(x,y)+getG(x-1,y)+getG(x-1,y-1)+getG(x,y-1)+getG(x+1,y-1)+getG(x+1,y))/6);
      b = ((getB(x,y)+getB(x-1,y)+getB(x-1,y-1)+getB(x,y-1)+getB(x+1,y-1)+getB(x+1,y))/6);
      }
      else if (x==0 && y==imageData.height-1) { //esquina inferior izquierda
      r = ((getR(x,y)+getR(x,y-1)+getR(x+1,y-1)+getR(x+1,y))/4);
      g = ((getG(x,y)+getG(x,y-1)+getG(x+1,y-1)+getG(x+1,y))/4);
      b = ((getB(x,y)+getB(x,y-1)+getB(x+1,y-1)+getB(x+1,y))/4);
      }
      else if (x==0 && (y!=0 && y!=imageData.height-1)) { //borde izquierdo
      r = ((getR(x,y)+getR(x,y-1)+getR(x+1,y-1)+getR(x+1,y)+getR(x+1,y+1)+getR(x,y+1))/6);
      g = ((getG(x,y)+getG(x,y-1)+getG(x+1,y-1)+getG(x+1,y)+getG(x+1,y+1)+getG(x,y+1))/6);
      b = ((getB(x,y)+getB(x,y-1)+getB(x+1,y-1)+getB(x+1,y)+getB(x+1,y+1)+getB(x,y+1))/6);

      }
      else { //resto
      r = ((getR(x-1,y-1)+getR(x-1,y)+getR(x-1,y+1)+getR(x,y-1)+getR(x,y)+getR(x,y+1)+getR(x+1,y+1)+getR(x+1,y)+getR(x+1,y-1))/9);
      g = ((getG(x-1,y-1)+getG(x-1,y)+getG(x-1,y+1)+getG(x,y-1)+getG(x,y)+getG(x,y+1)+getG(x+1,y+1)+getG(x+1,y)+getG(x+1,y-1))/9);
      b = ((getB(x-1,y-1)+getB(x-1,y)+getB(x-1,y+1)+getB(x,y-1)+getB(x,y)+getB(x,y+1)+getB(x+1,y+1)+getB(x+1,y)+getB(x+1,y-1))/9);
      }
      imageData.data[index + 0] = r;
      imageData.data[index + 1] = g;
      imageData.data[index + 2] = b;
  }
  }
  context.putImageData(imageData, 0, 0);
}


function saturacion(){
  context.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
  imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  let hsl;
  let rgb;
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        r = getR(x,y);
        g = getG(x,y);
        b = getB(x,y);
        hsl = rgbToHsl(r,g,b);
        hsl[1]=1;
        rgb = hslToRgb(hsl[0],hsl[1],hsl[2]);
        imageData.data[index + 0] = rgb[0];
        imageData.data[index + 1] = rgb[1];
        imageData.data[index + 2] = rgb[2];
      }
    }
    context.putImageData(imageData, 0, 0);
}


function deteccionBordes(){

}

//<---------------------------------Conversores de formato ------------------------------>
function rgbToHsl(r, g, b) {
  r =r/255;
  g =g/255;
  b =b/255;
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b);
  let h
  let s
  let l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  }
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
   h /= 6;
 }
 return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s == 0) {
    r = g = b = l;
  } else {
      function gorgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = gorgb(p, q, h + 1 / 3);
      g = gorgb(p, q, h);
      b = gorgb(p, q, h - 1 / 3);
  }
return [r * 255, g * 255, b * 255];
}

//<--------------------------------------------------------------------------------> 


//<-------------------------------------Eventos-------------------------------------------> 
document.querySelector("#subir").addEventListener("click",subir);
document.querySelector("#limpiar").addEventListener("click",limpiar);
document.querySelector("#descargar").addEventListener("click",save);
document.querySelector("#f-original").addEventListener("click",original);
document.querySelector("#f-negativo").addEventListener("click",negativo);
document.querySelector("#f-brillo").addEventListener("click",brillo);
document.querySelector("#f-binario").addEventListener("click",binario);
document.querySelector("#f-sepia").addEventListener("click",sepia);
document.querySelector("#f-blur").addEventListener("click",blur);
document.querySelector("#f-saturacion").addEventListener("click",saturacion);
document.querySelector("#f-deteccionBordes").addEventListener("click",deteccionBordes);
document.querySelector("#pincel").addEventListener("click",pincel);
document.querySelector("#goma").addEventListener("click",goma);

// Asignacion de funcion para colores
var botonesColores = document.querySelectorAll(".color").length;
for (var i = 0; i < botonesColores ; i++) {
    document.querySelectorAll(".color")[i].addEventListener("click", colores);
}

// Tamanio pincel
const selectElementTamPincel = document.querySelector('#tamanio_pincel');
selectElementTamPincel.addEventListener('change', (event) => {
  tamanio_pincel = event.target.value;
});

// Tamanio goma
const selectElementTamGoma = document.querySelector('#tamanio_goma');
selectElementTamGoma.addEventListener('change', (event) => {
  tamanio_goma = event.target.value;
});