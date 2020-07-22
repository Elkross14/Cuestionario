/*
*Añadirá la etiqueta padre-flex en el caso de que la ventana sea más grande a nivel vertical que el contenido de la página.
*/
ajustarAltura();

//lamará a la función una vez carguen todas lás imagenes de la página 
var imgs = document.images,
    len = imgs.length,
    counter = 0;

[].forEach.call(imgs, function (img) {
    if (img.complete)
        incrementCounter();
    else
        img.addEventListener('', incrementCounter, false);
});

function incrementCounter() {
    counter++;
    if (counter === len) {
        ajustarAltura();
    }
}


//ajusta la el tamaño vertical cuando se cambia el tamaño de ventana
var resizeTimer;

$(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(Resized, 100);//para evitar la repetición del evento de forma excesiva le ponemos 100 de retardo
});

function Resized() {
    window.onload = ajustarAltura();
};


//función que ajusta el tamaño de la página si es necesario
async function ajustarAltura() {

    var contenido = document.getElementById('contenido');

    contenido.style.padding = "0";
    contenido.classList.remove("padre-flex");//desactiva el ajuste vertical para que no haya errores en la lectura

    var alturaVentana = window.innerHeight; //altura del navegador del cliente en px
    var alturaPagina = document.getElementsByTagName('body')[0].clientHeight; //altura de todos los contenidos de la página juntos en px



    if (alturaPagina < alturaVentana) {

        document.getElementById('contenido').classList.add("padre-flex");

        //alert("alturaPagina: " + alturaPagina + " || alturaVentana: " + alturaVentana);

        var espacioARellenar = alturaVentana - alturaPagina;
        contenido.style.padding = espacioARellenar / 2 + "px 0";
    }
}