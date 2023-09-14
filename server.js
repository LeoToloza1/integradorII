import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import funciones from "./main.js";
import {obtenerPreguntas, preguntasAleatorias} from "./capitales.js"
const app = express();
const PORT = process.env.PORT || 8080;
const paisesUrl = "https://restcountries.com/v3.1/all";
app.use(express.json());
app.use(cors());
export let datos = [];

const cargarDatos = async () => {
    try {
        const resultados = await fetch(paisesUrl);
        datos = await resultados.json();
        console.log("Datos cargados exitosamente- desde el backend");
    } catch (error) {
        console.error("Error al obtener datos de los países:", error);
    }
};

// Ruta para cargar los datos
app.get('/cargarDatos', async (request, response) => {
    await cargarDatos();
    response.status(200).json({ mensaje: "datos Cargados" });
});

app.get('/obtenerPreguntas', async (request, response) => {
    await cargarDatos();
    const preguntas = obtenerPreguntas(); // Modifica obtenerPreguntas() para que devuelva las preguntas
    funciones.mezclarOpciones();
    response.json({ preguntas: preguntas}); // Envía las preguntas generadas como respuesta
});


// Escuchar en el puerto designado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Carga los datos al iniciar el servidor
export { cargarDatos };
