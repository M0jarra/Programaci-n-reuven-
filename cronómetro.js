document.addEventListener("DOMContentLoaded", () => {
  // Variables para controlar el cronómetro
  let tiempoInicio;
  let intervalo;
  let corriendo = false;
  let presionandoEspacio = false;

  // Referencias a los elementos HTML que muestran el cronómetro y la combinación
  const cronometroDisplay = document.getElementById("cronometro");
  const combinacionDisplay = document.getElementById("scramble");

  // Array de movimientos posibles
  const movimientos = ["R", "R'", "R2", "L", "L'", "L2", "U", "U'", "U2", "D", "D'", "D2", "F", "F'", "F2", "B", "B'", "B2"];

 // Función para generar una combinación aleatoria de 20 movimientos, sin repetir el mismo movimiento dos veces seguidas
function generarCombinacion() {
  let combinacion = [];
  let ultimoMovimiento = null;

  for (let i = 0; i < 20; i++) {
    let movimientoAleatorio;

    // Repetir hasta obtener un movimiento distinto al último
    do {
      movimientoAleatorio = movimientos[Math.floor(Math.random() * movimientos.length)];
    } while (movimientoAleatorio === ultimoMovimiento);

    combinacion.push(movimientoAleatorio);
    ultimoMovimiento = movimientoAleatorio; // Actualizar el último movimiento
  }

  return combinacion.join(" ");
}


  // Función para formatear el tiempo a 3 decimales
  function formatearTiempo(tiempo) {
    return (tiempo / 1000).toFixed(3);
  }

  // Función que se ejecuta al iniciar el cronómetro
  function iniciarCronometro() {
    tiempoInicio = Date.now();
    intervalo = setInterval(() => {
      const tiempoActual = Date.now() - tiempoInicio;
      cronometroDisplay.textContent = formatearTiempo(tiempoActual);
    }, 1);

    cronometroDisplay.style.color = "green";
    corriendo = true;
  }

  // Función que se ejecuta al detener el cronómetro
  function detenerCronometro() {
    clearInterval(intervalo);
    cronometroDisplay.style.color = "#ebe2d5";
    corriendo = false;

    // Genera una nueva combinación aleatoria y la muestra en el display
    combinacionDisplay.textContent = generarCombinacion();
  }

  // Evento que se activa al presionar la tecla espacio
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !presionandoEspacio) {
      presionandoEspacio = true;
    }
  });

  // Evento que se activa al soltar la tecla espacio
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space" && presionandoEspacio) {
      if (corriendo) {
        detenerCronometro();
      } else {
        cronometroDisplay.textContent = "0.000"; // Reinicia el display a 0 antes de iniciar
        iniciarCronometro();
      }
      presionandoEspacio = false;
    }
  });
});

