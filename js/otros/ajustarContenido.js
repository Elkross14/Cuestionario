/** 
 * Añadirá la etiqueta padre-flex en el caso de que la ventana sea más grande a nivel vertical que el contenido de la página.
 * 
 * Bug no arreglado: cuando tiene que cargar una nueva imagen no la tiene en cuenta para el tamaño total de la página web
 *  lo que puede ocasionar ciertos desajustes. En el momento en el que la imagen está guardada en caché deja de producirse 
 *  el error.
 * 
 * @author Pabloduran.es <pabloduran@pabloduran.es>
 * @version 1.0
 * 
 * Última actualización:
 *  -se ha cambiado el padre-fles por justify-content-center
 *  -se ha puesto un retardo de 100 milisegundos a la ejecución de la alineción vertical para
 *      permitir que aparezcan las imágenes una vez se haya cargado la página. Funciona tambien 
 *      con redes lentas ya que se ejecuta cuando página es totalmente cargada.
 */

//window.onload = ajustarAltura();
window.onload = setTimeout(function () { ajustarAltura() }, 100); //conseguimos que tenga en cuetna las imagenes que ponemos en la página

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

    var alturaVentana = window.innerHeight; //altura del navegador del cliente en px
    var alturaPagina = document.getElementsByTagName('body')[0].clientHeight; //altura de todos los contenidos de la página juntos en px


    if (alturaPagina < alturaVentana) {

        var espacioARellenar = alturaVentana - alturaPagina;
        contenido.style.padding = espacioARellenar / 2 + "px 0";
    }
}