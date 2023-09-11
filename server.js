import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import funciones from "./main.js";

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
        console.log("Datos cargados exitosamente");
    } catch (error) {
        console.error("Error al obtener datos de los países:", error);
    }
};

// Ruta para cargar los datos
app.get('/iniciarJuego', async (request, response) => {
    await cargarDatos();
    funciones.iniciarJuego();
    response.status(200).json({ mensaje: "Juego iniciado" });
});


// Escuchar en el puerto designado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Carga los datos al iniciar el servidor
export { cargarDatos };
