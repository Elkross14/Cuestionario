var contador = 0;
var correctas = 0;
var incorrectas = 0;

//muestra los priemros botones
if (contador == 0) {
    ocultarElemento("final");
    siguientePregunta();
}

//muestra tanto la preguntas como sus opciones correspondientes
function siguientePregunta() {

    //ocultar comentario y botón si están visibles
    ocultarElemento("mensaje");
    ocultarElemento("boton");

    //verificar si es el final del test
    if (contador == preguntasObjeto.length) {

        ejecutarFinalTest();

    //mostrará la siguiente pregunta con sus respuestas
    } else {

        //obtener pregunta
        mostrarEnNavegador(preguntasObjeto[contador].pregunta, "pregunta");

        //obtener respuestas
        var cadenaRespuestas = "";

        for (var i = 0; i < respuestasObjeto.length; i++) {

            if (respuestasObjeto[i].idPregunta == preguntasObjeto[contador].id) {

                //Formato que tendrá cada botón
                cadenaRespuestas += "<p>"
                    + "<button type='button'class='btn btn-outline-secondary btn-lg btn-block quiz-text-button' id=" + respuestasObjeto[i].idRespuesta + " onclick='comprobarRespuesta(&#34;" +
                    respuestasCorrectasObjeto[contador].idRespuesta + "&#34;,&#34;" +
                    respuestasObjeto[i].idRespuesta + "&#34;)'>"
                    + respuestasObjeto[i].respuesta
                    + "</button>"
                    + "</p>";
            }
        }

        //salida por pantalla
        mostrarEnNavegador(cadenaRespuestas, "respuesta");
        ajustarAltura("quiz");
    }

    //aumenta el contador
    contador++;
}


//muesta en el navegador los parametros pasados 
function mostrarEnNavegador(cadena, posicion) {

    cadena = JSON.stringify(cadena);
    cadena = cadena.replace(/\"/g, '');//elimino comillas
    document.getElementById(posicion).innerHTML = cadena;
}


//muestra la pantalla final del cuestionario
function ejecutarFinalTest() {

    document.getElementById("aciertos").innerHTML = correctas;
    document.getElementById("fallos").innerHTML = incorrectas;

    ocultarElemento("quiz");
    mostrarElemento("final", "flex");

    ajustarAltura("final");//ajustará altura de la web al formato de pantalla
}


//pondrá la etiqueta padre-flex en caso de que el contenido no rellene toda la pantalla de forma vertical
function ajustarAltura(id) {

    document.getElementById(id).classList.remove("padre-flex");//desactiva el ajuste vertical para que no haya errores en la lectura

    var alturaVentana = window.innerHeight; //altura del navegador del cliente en px
    var alturaPagina = document.getElementsByTagName('body')[0].clientHeight; //altura de todos los contenidos de la página juntos en px

    //alert("alturaVentana: " + alturaVentana + " || alturaPagina: " + alturaPagina);

    if (alturaPagina < alturaVentana) {

        document.getElementById(id).classList.add("padre-flex");
    }
    else if (alturaVentana < alturaPagina) {

        document.getElementById(id).classList.remove("padre-flex");
    }
}


//comprueba si la respuesta es correcta
function comprobarRespuesta(correcta, seleccionada) {

    var mensaje = " ";

    //comprobar si ha acertado
    if (correcta == seleccionada) {

        document.getElementById(seleccionada).classList.remove("btn-outline-secondary");
        document.getElementById(seleccionada).classList.add("btn-success");

        mensaje = "<p class='text-primary'>La respuesta es correcta</p>";

        correctas++;

    } else {

        document.getElementById(seleccionada).classList.remove("btn-outline-secondary");
        document.getElementById(seleccionada).classList.add("btn-danger");
        document.getElementById(correcta).classList.remove("btn-outline-secondary");
        document.getElementById(correcta).classList.add("btn-success");

        mensaje = "<p class='text-danger'>La respuesta es incorrecta</p>";

        incorrectas++;
    }

    //deshabilitar botones
    deshabilitarBotones("respuesta");

    //devolver respuesta
    document.getElementById("mensaje").innerHTML = mensaje;
    mostrarElemento("mensaje", "block");
    mostrarElemento("boton", "block");

}


//desabilita todos los componentes que haya dentro del div especificado
function deshabilitarBotones(nombreDiv) {

    var nodes = document.getElementById(nombreDiv).getElementsByTagName('*');

    for (var i = 0; i < nodes.length; i++) {

        nodes[i].disabled = true;
    }
}

//oculta un elemento específico mediante id
function ocultarElemento(id) {

    document.getElementById(id).style.display = 'none';
}

//muestra un elemento específico mediante id
function mostrarElemento(id, type) {

    document.getElementById(id).style.display = type;
}