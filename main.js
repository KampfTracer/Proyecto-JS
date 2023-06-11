let prestamo = true;

// Función principal para calcular el préstamo
const calcularPrestamo = () => {
  while (prestamo) {
    // Solicitar al usuario el monto del préstamo
    let monto = parseFloat(prompt("Ingrese el monto del préstamo:"));
    
    // Solicitar al usuario el interés anual del préstamo
    let interes = parseFloat(prompt("Ingrese el interés anual del préstamo (%):"));
    
    // Solicitar al usuario el plazo del préstamo en meses
    let plazo = parseInt(prompt("Ingrese el plazo del préstamo (en meses):"));

    // Verificar si los valores ingresados son numéricos
    if (isNaN(monto) || isNaN(interes) || isNaN(plazo)) {
      console.log("Ingrese valores numéricos válidos.");
      continue; // Volver al inicio del ciclo while
    }

    // Llamar a la función para calcular la cuota mensual del préstamo
    calcularCuota(monto, interes, plazo);
    prestamo = false; // Salir del ciclo while
  }
};

// Función para calcular la cuota mensual del préstamo
const calcularCuota = (monto, interes, plazo) => {
  let tasaInteres = interes / 100 / 12; // Calcular la tasa de interés mensual
  let cuota = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo)); // Calcular la cuota mensual

  // Mostrar el resultado por consola
  console.log("La cuota mensual es: $" + cuota.toFixed(2));
};

// Llamar a la función principal para calcular el préstamo
calcularPrestamo();