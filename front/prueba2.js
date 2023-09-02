export let nombrePaises = [];
export let capitalesPaises = [];
export let banderasPaises = [];
const url = 'http://localhost:1234/obtenerDatos';
const preguntaElements = document.getElementsByClassName("pregunta");
import {generarPreguntas, preguntasAleatorias} from "./metodos.js";

conectar();
async function conectar() {
    try {
        const response = await fetch(url);
        const data = await response.json()
        nombrePaises = data.nombrePaises;
        capitalesPaises = data.capitalesPaises;
        banderasPaises = data.banderasPaises;
        alert("Datos cargados exitosamente");
    } catch (error) {
        console.error("Error:", error);
    }
}
async function mostrarDatos() {
    
    mostrarOpciones();
}
function mostrarOpciones() {
    generarPreguntas();
    for (let index = 0; index < 4; index++) {
        const preguntaElement = preguntaElements[index];
        const preguntaActual = preguntasAleatorias[index];
        let contenido = "";

        if (preguntaActual.tipo === "bandera") {
            contenido = `
                <div class="tarjeta" data-respuesta="${preguntaActual.respuesta}">
                    <img src="${preguntaActual.respuesta}" class="img" />
                </div>`;
        } else if (preguntaActual.tipo === "capital") {
            contenido = `
                <div class="tarjeta" data-respuesta="${preguntaActual.respuesta}">
                    <h2>${preguntaActual.respuesta}</h2>
                </div>`;
        }

        preguntaElement.innerHTML = contenido;
        preguntaElement.addEventListener("click", verificarRespuesta);
    }
}

function verificarRespuesta(event) {
    const tarjetaSeleccionada = event.target.closest(".tarjeta");
    if (!tarjetaSeleccionada) return;

    const respuestaCorrecta = tarjetaSeleccionada.getAttribute("data-respuesta");
    const seleccionUsuario = tarjetaSeleccionada.innerText;

    if (seleccionUsuario === respuestaCorrecta) {
        alert("¡Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta. La respuesta correcta es: " + respuestaCorrecta);
    }
}

document.getElementById("IniciarJuego").addEventListener("click", function () {
    alert("Bienvenido");
    mostrarOpciones();
});



