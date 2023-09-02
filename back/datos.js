import express from "express";
import fetch from "node-fetch";
import cors from "cors";
let datos = [];
let nombrePaises = [];
let capitalesPaises = [];
let banderasPaises = [];
const app = express();
const PORT = process.env.PORT ?? 3000;
const paisesUrl = "https://restcountries.com/v3.1/all";
app.use(express.json());
app.use(cors());
const cargarDatos = async () => {
    try {
        const resultados = await fetch(paisesUrl);
        datos = await resultados.json();
        nombrePaises = datos.map(pais => pais.name.common);
        capitalesPaises = datos.map(pais => pais.capital);
        banderasPaises = datos.map(pais => pais.flags.png);
        console.log("Datos cargados exitosamente");
    } catch (error) {
        console.error("Error al obtener datos de los países:", error);
    }
};

// Ruta para cargar los datos
app.get('/', async (request, response) => {
    await cargarDatos();
    response.status(200).json({ message: "Datos cargados exitosamente" });
});

// Ruta para obtener los nombres de los países
app.get('/obtenerDatos', async (request, response) => {
    await cargarDatos();
    const dataToSend = {
        nombrePaises: nombrePaises,
        capitalesPaises: capitalesPaises,
        banderasPaises: banderasPaises

    };
    response.send(dataToSend);
});


// Escuchar en el puerto designado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Carga los datos al iniciar el servidor
export {cargarDatos};
