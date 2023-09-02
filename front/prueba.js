let nombrePaises = [];
let capitalesPaises = [];
let banderasPaises = [];
let preguntasAleatorias = [];
const url = 'http://localhost:1234/obtenerDatos';
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
function generarPreguntas() {
    preguntasAleatorias = [];
    // Generar preguntas del tipo "A qué país pertenece esta bandera?"
    for (let i = 0; i < 5; i++) {
        const pregunta = {
            tipo: "bandera",
            texto: "A qué país pertenece esta bandera?",
            respuesta: obtenerRespuestaPais(),
            opciones: obtenerOpcionesPaises(),
        };
        preguntasAleatorias.push(pregunta);
    }
    // Generar preguntas del tipo "A qué país pertenece esta capital?"
    for (let i = 0; i < 5; i++) {
        const pregunta = {
            tipo: "capital",
            texto: "A qué país pertenece esta capital?",
            respuesta: obtenerRespuestaPais(),
            opciones: obtenerOpcionesPaises(),
        };
        preguntasAleatorias.push(pregunta);
    }
    preguntasAleatorias.sort(() => Math.random() - 0.5);
}
function obtenerRespuestaPais() {
    // Elegir aleatoriamente un índice entre 0 y la longitud del arreglo de países (nombrePaises)
    const indiceAleatorio = Math.floor(Math.random() * nombrePaises.length);

    // Devolver el país correspondiente al índice aleatorio como respuesta
    return nombrePaises[indiceAleatorio];
}
function obtenerOpcionesPaises(respuestaCorrecta) {
    const opciones = [];
    // Agregar la respuesta correcta a las opciones
    opciones.push(respuestaCorrecta);
    // Generar opciones incorrectas hasta alcanzar la cantidad deseada de opciones
    while (opciones.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * nombrePaises.length);
        const opcionAleatoria = nombrePaises[indiceAleatorio];
        // Agregar la opción aleatoria si no está ya en las opciones y no es la respuesta correcta
        if (!opciones.includes(opcionAleatoria) && opcionAleatoria !== respuestaCorrecta) {
            opciones.push(opcionAleatoria);
        }
    }
    // Mezclar el arreglo de opciones para que no siempre estén en el mismo orden
    opciones.sort(() => Math.random() - 0.5);
    return opciones;
}
generarPreguntas();
async function mostrarDatos() {
    const preguntaElements = document.getElementsByClassName("pregunta");

    for (let index = 0; index < 4; index++) {
        const preguntaElement = preguntaElements[index];
        const preguntaActual = preguntasAleatorias[index]; // Obtener la pregunta actual del arreglo preguntasAleatorias

        // Verificar el tipo de pregunta y obtener los datos correspondientes
        let contenido = "";
        if (preguntaActual.tipo === "bandera") {
            contenido = `
                <div class="tarjeta">
                    <img src="${preguntaActual.opciones[0]}" class="img" />
                </div>`;
        } else if (preguntaActual.tipo === "capital") {
            contenido = `
                <div class="tarjeta">
                    <h2>${preguntaActual.opciones[0]}</h2>
                </div>`;
        }
        
        preguntaElement.innerHTML = contenido;
    }
}

document.getElementById("IniciarJuego").addEventListener("click", function () {
    alert("Bienvenido");
        mostrarDatos();
});


//<h2>${nombrePaises[index]}</h2>
//<h2>${capitalesPaises[index]}</h2>



