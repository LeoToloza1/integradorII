document.addEventListener('DOMContentLoaded', () => {
  const iniciarJuegoBtn = document.getElementById('IniciarJuego');
  const resetBtn = document.getElementById('reset');
  const instruccion = document.getElementById('instruccion');
  const pregunta = document.getElementById('pregunta');
  const opciones = document.getElementById('opciones');

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Hacer una solicitud al servidor para cargar datos
      const response = await fetch('http://localhost:8080/cargarDatos'); // Ruta configurada en tu servidor
      if (response.status === 200) {
        console.log('Datos cargados');
        const datos = await response.json();
        //mostrarPreguntasEnHTML();
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

});

// Función para mostrar preguntas en el estilo del segundo código
async function mostrarPreguntasEnHTML() {
  const response = await fetch('http://localhost:8080/obtenerPreguntas');
  const preguntasContainer = document.getElementById('pregunta');
  preguntasContainer.innerHTML = '';

  if (response.status === 200) {
    const { preguntas } = await response.json();
    
    for (let index = 0; index < 4; index++) {
      const preguntaElement = document.createElement('div');
      preguntaElement.innerHTML = `<h2 class="display-2 text-center">${preguntas[index].texto}</h2>`;
      
      let opcionHTML = '';
      if (preguntas[index].tipo === 'capital') {
        opcionHTML = `<label class="custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${preguntas[index].opciones}" data-respuesta="${preguntas[index].opciones}" 
          id="opcion-${preguntas[index].opciones}" style="display: none;" class="form-check-input"> 
          <span class="form-check-label">${preguntas[index].opciones}</span>
        </label>`;
      } else {
        opcionHTML = `<label class="img-fluid custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${preguntas[index].opciones}" data-respuesta="${preguntas[index].opciones}" 
          id="opcion-${preguntas[index].opciones}" style="display: none;" class="form-check-input"> 
          <img src="${preguntas[index].opciones}" alt="" class="img-fluid">
        </label>`;
      }
      
      preguntaElement.innerHTML += opcionHTML;
      // Agregar la pregunta al contenedor
      preguntasContainer.appendChild(preguntaElement);
    }
  }
}

// Función para obtener preguntas desde el servidor
async function obtenerPreguntasDesdeServidor() {
  try {
    const response = await fetch('http://localhost:8080/obtenerPreguntas');
    if (response.status === 200) {
      const { preguntas } = await response.json();
      mostrarPreguntasEnHTML(preguntas);
    } else {
      console.error('Error al obtener preguntas del servidor');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

const iniciarJuegoBtn = document.getElementById('IniciarJuego');
iniciarJuegoBtn.addEventListener('click', () => {
  mostrarPreguntasEnHTML();
});
