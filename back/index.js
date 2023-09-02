import {cargarDatos} from "./datos.js";


async function main() {
    await cargarDatos(); // Espera a que los datos se carguen
    console.log('index.js - linea 6');
    
    
}
main(); // Llama a la función principal
