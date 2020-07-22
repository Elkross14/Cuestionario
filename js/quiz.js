var contador = 0;
var correctas = 0;
var incorrectas = 0;
var sinContestar = 0;
var porcentajeAvanzado = 100 / preguntasObjeto.length;//porcentaje de la barra que tiene que aumentar con cada pregunta
var porcentajeHecho = porcentajeAvanzado;//porcentaje total de preguntas hechas
var temporizador;

const totalTime = 60;

window.onload = iniciarScript;


/**
 * Inicia el script para ver la primera pregunta y sus respuestas.
 */
function iniciarScript() {
    ocultarElemento("final");
    siguientePregunta();
}


/**
 * Muestra tanto la preguntas como sus opciones correspondientes.
 */
function siguientePregunta() {

    //ocultar comentario y botón si están visibles
    ocultarElemento("answer-block");
    ocultarElemento("mensaje");
    ocultarElemento("boton");

    //verificar si es el final del test
    if (contador == preguntasObjeto.length) {

        ejecutarFinalTest();

    } else {//mostrará la siguiente pregunta con sus respuestas

        //obtener pregunta
        var preguntaAMostrar = "<p class='fade-in'>" + preguntasObjeto[contador].pregunta + "</p>";
        mostrarEnNavegador(preguntaAMostrar, "pregunta");

        //obtener respuestas
        var cadenaRespuestas = "";

        for (var i = 0; i < respuestasObjeto.length; i++) {

            if (respuestasObjeto[i].idPregunta == preguntasObjeto[contador].id) {

                //Formato que tendrá cada botón
                cadenaRespuestas += "<p>"
                    + "<button type='button'class='btn btn-outline-secondary btn-lg btn-block quiz-text-button fade-in' id=" + respuestasObjeto[i].idRespuesta + " onclick='comprobarRespuesta(&#34;" +
                    respuestasCorrectasObjeto[contador].idRespuesta + "&#34;,&#34;" +
                    respuestasObjeto[i].idRespuesta + "&#34;)'>"
                    + respuestasObjeto[i].respuesta
                    + "</button>"
                    + "</p>";
            }
        }

        //salida por pantalla
        mostrarEnNavegador(cadenaRespuestas, "respuesta");

        //barra de progreso
        document.getElementById("progress-bar").style.width = porcentajeHecho + "%";
        porcentajeHecho += porcentajeAvanzado;

        ajustarAltura();

        iniciarCuentaAtras();
    }
    //aumenta el contador
    contador++;
}


/**
 * Muesta en el navegador los parametros pasados.
 * 
 * @param {*} cadena - Todo lo que se quiera mostrar en un lugar determinado de la página.
 * @param {string} posicion - Id del bloque en el que mostrar la cadena.
 */
function mostrarEnNavegador(cadena, posicion) {

    cadena = JSON.stringify(cadena);
    cadena = cadena.replace(/\"/g, '');//elimino comillas
    document.getElementById(posicion).innerHTML = cadena;
}


/**
 * Muestra la pantalla final del cuestionario.
 */
function ejecutarFinalTest() {

    document.getElementById("final").classList.remove('d-none');

    document.getElementById("aciertos").innerHTML = correctas;
    document.getElementById("fallos").innerHTML = incorrectas;
    document.getElementById("sinContestar").innerHTML = sinContestar;

    ocultarElemento("head");
    ocultarElemento("quiz");
    mostrarElemento("final", "flex");

    ajustarAltura();//ajustará altura de la web al formato de pantalla
}


/**
 * Comprueba si la respuesta es correcta.
 * 
 * @param {number} correcta - Id numérico de la respuesta correcta para esa pregunta.
 * @param {number} seleccionada - Id numérico de la respuesta seleccionada.
 */
function comprobarRespuesta(correcta, seleccionada) {

    quitarColoresAnswerBlock();

    pararCuentaAtras();

    //comprobar si ha acertado
    if (correcta == seleccionada) {

        //cambia el color del boton pulsado en verde
        document.getElementById(seleccionada).classList.remove("btn-outline-secondary");
        document.getElementById(seleccionada).classList.add("btn-success");

        mostrarAnswerBlock("success");

        correctas++;

    } else {

        //cambia el color del botón pulsado a rojo y el de la respuesta correcta a verde
        document.getElementById(seleccionada).classList.remove("btn-outline-secondary");
        document.getElementById(seleccionada).classList.add("btn-danger");
        document.getElementById(correcta).classList.remove("btn-outline-secondary");
        document.getElementById(correcta).classList.add("btn-success");

        mostrarAnswerBlock("error");

        incorrectas++;
    }

    //deshabilitar botones
    deshabilitarBotones("respuesta");
}


/**
 * Mostrará por pantalla el answerBlock diciendo si hemos acertado, fallado o dejado pasar la pregunta.
 * 
 * @param {string} type - El tipo de AnswerBlock que hay que mostrar. Tipos: success, error, timeOut.
 */
function mostrarAnswerBlock(type) {
    var mensaje = " ";

    switch (type) {
        case "success":

            //Aparece el siguiente texto en color verde
            mensaje = "<p class='success'><i class='fas fa-check-circle'></i>La respuesta es correcta</p>";

            //pone el color del botón button-next en verde
            document.getElementById("button-next").classList.add("success-bg");

            //pone el fondo de answer-block en verde
            document.getElementById("answer-block").classList.add("success-bg-light");

            break;


        case "error":

            //Aparece el siguiente texto en color rojo
            mensaje = "<p class='error'><i class='fas fa-times-circle'></i>La respuesta es incorrecta</p>";

            //pone el color del botón button-next en rojo
            document.getElementById("button-next").classList.add("error-bg");

            //pone el fondo de answer-block en rojo
            document.getElementById("answer-block").classList.add("error-bg-light");

            break;


        case "timeOut":

            //Aparece el siguiente texto en color gris
            mensaje = "<p class='text-secondary'><i class='fas fa-clock'></i>El tiempo ha pasado</p>";

            //pone el color del botón button-next en gris
            document.getElementById("button-next").classList.add("btn-secondary");

            //pone el fondo de answer-block en gris
            document.getElementById("answer-block").classList.add("timeOut-bg-light");

            break;
    }

    //devolver respuesta
    document.getElementById("mensaje").innerHTML = mensaje;
    mostrarElemento("answer-block", "block");
    mostrarElemento("mensaje", "block");
    mostrarElemento("boton", "block");
}


/**
 * Inicia la cuenta atrás para responder la pregunta. 
 */
function iniciarCuentaAtras() {

    var timer = totalTime;

    document.getElementById("temporizador").classList.remove("gray-light");
    document.getElementById("temporizador").classList.add("success");

    actualizarCuentaAtras(timer);

}


/**
 * Actualiza el contador de la pregunta.
 * Si el contador termina pone la pregunta como no contestada.
 * 
 * @param {number} timer - Cantidad de tiempo en segundos para responder la pregunta.
 */
function actualizarCuentaAtras(timer) {


    document.getElementById('cuentraAtras').innerHTML = timer;

    if (timer == 0) {

        deshabilitarBotones("respuesta");
        quitarColoresAnswerBlock();
        mostrarAnswerBlock("timeOut");

        sinContestar++;

    } else {

        if (timer <= 15) {

            document.getElementById("temporizador").classList.remove("success");
            document.getElementById("temporizador").classList.add("error");
        }

        timer--;

        temporizador = setTimeout(function () { actualizarCuentaAtras(timer) }, 1000);
    }
}


/**
 * Detiene la cuenta atras y cambia el color del temporizador a gris
 */
function pararCuentaAtras() {

    //Ponemos el color gris al temporizador
    document.getElementById("temporizador").classList.remove("success");
    document.getElementById("temporizador").classList.remove("error");
    document.getElementById("temporizador").classList.add("gray-light");

    //detiene el temporizador
    clearTimeout(temporizador);
}


/**
 * Desabilita todos los componentes que haya dentro del div especificado.
 * 
 * @param {string} idDiv - Id del bloque en el que se quiere deshabilitar sus componentes internos
 */
function deshabilitarBotones(idDiv) {

    var nodes = document.getElementById(idDiv).getElementsByTagName('*');

    for (var i = 0; i < nodes.length; i++) {

        nodes[i].disabled = true;
    }
}


/**
 * Oculta un elemento específico mediante id.
 * 
 * @param {string} id - Id del bloque que se quiere ocultar visualmente
 */
function ocultarElemento(id) {

    document.getElementById(id).style.display = 'none';
}


/**
 * Muestra un elemento específico mediante id.
 * 
 * @param {string} id - Id del bloque que se desea mostrar en pantalla.
 * @param {string} type - Tipo de display para mostrarlo. Se aceptan todos los permitidos por CSS3.
 */
function mostrarElemento(id, type) {

    document.getElementById(id).style.display = type;
}


/**
 * Quitará todas las clases que dan color tanto al fondo del bloque como al botón
 */
function quitarColoresAnswerBlock() {
    document.getElementById("button-next").classList.remove("success-bg", "error-bg", "btn-secondary");
    document.getElementById("answer-block").classList.remove("success-bg-light", "error-bg-light", "timeOut-bg-light");
}