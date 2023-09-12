document.addEventListener('DOMContentLoaded', () => {
  const iniciarJuegoBtn = document.getElementById('IniciarJuego');
  const resetBtn = document.getElementById('reset');
  const instruccion = document.getElementById('instruccion');
  const pregunta = document.getElementById('pregunta');
  const opciones = document.getElementById('opciones');

  iniciarJuegoBtn.addEventListener('DOMContentLoaded', async () => {
    try {
      // Hacer una solicitud al servidor para cargar datos
      const response = await fetch('http://localhost:8080/cargarDatos'); // Ruta configurada en tu servidor
      if (response.status === 200) {
        console.log('Datos cargados');
        const datos = await response.json();
        mostrarPreguntas();
        // Ahora puedes utilizar los datos recibidos para generar preguntas y comenzar el juego
        instruccion.style.display = 'none';
        pregunta.classList.add('tarjeta');
        opciones.classList.add('tarjeta');
        // Lógica para generar preguntas y comenzar el juego con los datos
      } else {
        console.error('Error al cargar datos del servidor');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('¿Desea reiniciar el juego?')) {
      instruccion.style.display = 'inline';
      pregunta.classList.remove('tarjeta');
      opciones.classList.remove('tarjeta');
      // Lógica para reiniciar el juego
    }
  });
});

// Función para mostrar preguntas en el estilo del segundo código
function mostrarPreguntasEnHTML(preguntas) {
  // Supongamos que tienes un contenedor HTML para mostrar las preguntas
  const preguntasContainer = document.getElementById('pregunta');
  preguntasContainer.innerHTML = ''; // Limpia el contenedor

  // Recorre las preguntas y crea elementos HTML para mostrarlas
  preguntas.forEach((pregunta, index) => {
      const preguntaElement = document.createElement('div');
      preguntaElement.innerHTML = `<h2 class="display-2 text-center">${pregunta.texto}</h2>`;
      
      // Crear elementos para las opciones y agregarlos al elemento de la pregunta
      pregunta.opciones.forEach((opcion, opcionIndex) => {
          let opcionHTML = '';
          if (pregunta.tipo === 'capital') {
              opcionHTML = `<label class="custom-radio form-check">
                  <input type="radio" name="respuesta" 
                  value="${opcion}" data-respuesta="${opcion}" 
                  id="opcion-${opcionIndex}" style="display: none;" class="form-check-input"> 
                  <span class="form-check-label">${opcion}</span>
              </label>`;
          } else {
              opcionHTML = `<label class="img-fluid custom-radio form-check">
                  <input type="radio" name="respuesta" 
                  value="${opcion}" data-respuesta="${opcion}" 
                  id="opcion-${opcionIndex}" style="display: none;" class="form-check-input"> 
                  <img src="${opcion}" alt="" class="img-fluid">
              </label>`;
          }
          preguntaElement.innerHTML += opcionHTML;
      });

      // Agregar la pregunta al contenedor
      preguntasContainer.appendChild(preguntaElement);
  });
}

// Función para obtener preguntas desde el servidor
async function obtenerPreguntasDesdeServidor() {
  try {
      const response = await fetch('http://localhost:8080/obtenerPreguntas'); // Hace una solicitud al servidor
      if (response.status === 200) {
          const { preguntas } = await response.json(); // Obtiene las preguntas del servidor
          mostrarPreguntasEnHTML(preguntas); // Llama a la función para mostrar las preguntas
      } else {
          console.error('Error al obtener preguntas del servidor');
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }
}
const iniciarJuegoBtn = document.getElementById('IniciarJuego');
iniciarJuegoBtn.addEventListener('click', () => {
  obtenerPreguntasDesdeServidor();
});


/*export function mostrarPreguntas() {
  if (preguntaActual < preguntasAleatorias.length) {
    const pregunta = preguntasAleatorias[preguntaActual];
    preguntaElement.innerHTML = `<h2 class="display-2 text-center">${pregunta.texto}</h2>`;
    respuesta = pregunta.respuesta;
    opcionesElement.innerHTML = '';
    for (let i = 0; i < pregunta.opciones.length; i++) {
      const opcion = pregunta.opciones[i];
      let opcionHTML = '';
      if (pregunta.tipo === 'capital') {
        opcionHTML = `<label class="custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${opcion}" data-respuesta="${opcion}" 
          id="opcion-${i}" style="display: none;" class="form-check-input"> 
          <span class="form-check-label">${opcion}</span>
        </label>`;
      } else {
        opcionHTML = `<label class="img-fluid custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${opcion}" data-respuesta="${opcion}" 
          id="opcion-${i}" style="display: none;" class="form-check-input"> 
          <img src="${opcion}" alt="" class="img-fluid">
        </label>`;
      }
      opcionesElement.innerHTML += opcionHTML;
    }
  } else {
    mostrarPuntaje();
    btnReiniciar();
  }
}*/