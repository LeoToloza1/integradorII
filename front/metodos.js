export let preguntasAleatorias = [];
let respuestaCorrecta;
import{nombrePaises,banderasPaises,capitalesPaises} from "./prueba2.js";
export function generarPreguntas() {   
    for (let i = 0; i < 5; i++) {
        const pregunta = {
            tipo: "bandera",
            texto: "A qué país pertenece esta bandera?",
            respuesta: obtenerRespuestaPais(),
            opciones: obtenerOpcionesPaises(obtenerRespuestaPais()),
        };
        preguntasAleatorias.push(pregunta);
        console.log(JSON.stringify(pregunta));
    }
    
    for (let i = 0; i < 5; i++) {
        const pregunta = {
            tipo: "capital",
            texto: "A qué país pertenece esta capital?",
            respuesta: obtenerRespuestaPais(),
            opciones: obtenerOpcionesPaises(obtenerRespuestaPais()),
        };
        preguntasAleatorias.push(pregunta);
        console.log(JSON.stringify(pregunta));
    }
   preguntasAleatorias.sort(() => Math.random() - 0.5);
}

export function obtenerRespuestaPais() {
    const indiceAleatorio = Math.floor(Math.random() * banderasPaises.length);
    respuestaCorrecta= banderasPaises[indiceAleatorio]; 
   return respuestaCorrecta;
}
export function obtenerOpcionesPaises(respuestaCorrecta) {
    const opciones = [];
    opciones.push(respuestaCorrecta);
    while (opciones.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * nombrePaises.length);
        const opcionAleatoria = nombrePaises[indiceAleatorio];
        if (!opciones.includes(opcionAleatoria)) {
            opciones.push(opcionAleatoria);
        }
    }
    opciones.sort(() => Math.random() - 0.5);
    return opciones;
}
