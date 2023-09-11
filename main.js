// Importa las funciones necesarias desde capitales.js y banderas.js
import { opcionesCapitales, preguntasAleatorias } from "./capitales.js";
import { opcionesBanderas } from "./banderas.js";

// Variables y funciones que serán utilizadas en el servidor de Node.js
let opciones = [];
let respuesta;
let respCorrectas = 0;
let respIncorrectas = 0;
let preguntaActual = 0;

function mezclarOpciones() {
  opciones = opcionesCapitales.concat(opcionesBanderas);
  opciones.sort(() => Math.random() - 0.5);
}

function iniciarJuego() {
  if (preguntaActual < preguntasAleatorias.length) {
    const pregunta = preguntasAleatorias[preguntaActual];
    console.log(`Pregunta: ${pregunta.texto}`);
    respuesta = pregunta.respuesta;
    for (let i = 0; i < pregunta.opciones.length; i++) {
      const opcion = pregunta.opciones[i];
      console.log(`Opción ${i + 1}: ${opcion}`);
    }
  } else {
    mostrarPuntaje();
    //btnReiniciar();
  }
}

/*function btnReiniciar() {
  // Reiniciar el juego: Restablecer las variables y volver a mezclar las opciones
  preguntaActual = 0;
  respCorrectas = 0;
  respIncorrectas = 0;
  ocultarPuntaje();
  mezclarOpciones();
  iniciarJuego();
}*/

function mostrarPuntaje() {
  console.log('Puntaje: ' + respCorrectas);
}

function ocultarPuntaje() {
  // Lógica para ocultar el puntaje (si es necesario)
}

function validarRespuesta(seleccion, respuesta) {
  if (seleccion.value === respuesta && preguntaActual < preguntasAleatorias.length) {
    respCorrectas++;
    console.log('¡Respuesta correcta!');
  } else {
    respIncorrectas++;
    console.log('¡Respuesta incorrecta!');
  }
  preguntaActual++;
  iniciarJuego();
}

// Event listener adaptado para Node.js
function opcionesElementClickListener(e) {
  opcionSeleccionada = e.target;
  if (opcionSeleccionada.type === 'radio' && opcionSeleccionada.name === 'respuesta') {
    validarRespuesta(opcionSeleccionada, respuesta);
  }
}

// Asigna el event listener en Node.js (si es necesario)
// Ejemplo: opcionesElement.addEventListener('click', opcionesElementClickListener);

// Exporta las funciones que necesitas en tu servidor de Node.js
export default {
  mezclarOpciones,
  iniciarJuego,
  //btnReiniciar,
  mostrarPuntaje,
  ocultarPuntaje,
  opcionesElementClickListener,
};
