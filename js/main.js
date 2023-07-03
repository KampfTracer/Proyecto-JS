let prestamo = true; // Variable que indica si se debe seguir solicitando préstamos

// Definición de la clase Usuario
class Usuario {
  constructor(nombre, email, edad) {
    this.nombre = nombre;
    this.email = email;
    this.edad = edad;
    this.montoPrestamo = 0;
    this.plazo = 0;
    this.tasaInteres = 0;
    this.cuotaMensual = 0;
  }

  mostrarDatos() {
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Email: ${this.email}`);
    console.log(`Edad: ${this.edad}`);
    console.log(`Monto del préstamo: $${this.montoPrestamo.toFixed(2)}`);
    console.log(`Plazo del préstamo: ${this.plazo} meses`);
    console.log(`Tasa de interés anual: ${this.tasaInteres}%`);
    console.log(`Cuota mensual: $${this.cuotaMensual.toFixed(2)}`);
  }
}

// Arreglo para almacenar los usuarios registrados
const usuarios = [];

// Función para solicitar el monto del préstamo
const solicitarMonto = () => {
  let monto;

  while (true) {
    monto = parseFloat(prompt("Ingrese el monto del préstamo:"));

    if (isNaN(monto)) {
      alert("Ingrese un valor numérico válido.");
    } else {
      break;
    }
  }

  return monto;
};

// Función para solicitar la tasa de interés anual
const solicitarInteres = () => {
  let interes;

  while (true) {
    interes = parseFloat(prompt("Ingrese el interés anual del préstamo (%):"));

    if (isNaN(interes)) {
      alert("Ingrese un valor numérico válido.");
    } else {
      break;
    }
  }

  return interes;
};

// Función para solicitar el plazo del préstamo en meses
const solicitarPlazo = () => {
  let plazo;

  while (true) {
    plazo = parseInt(prompt("Ingrese el plazo del préstamo (en meses):"));

    if (isNaN(plazo)) {
      alert("Ingrese un valor numérico válido.");
    } else {
      break;
    }
  }

  return plazo;
};

// Función para registrar un nuevo usuario y calcular el préstamo
const registrarYCalcularPrestamo = () => {
  let nombre = ingresarNombre();
  let email = ingresarEmail();
  let edad = ingresarEdad();

  // Función para ingresar el nombre del usuario
  function ingresarNombre() {
    while (true) {
      let nombre = prompt("Ingrese su nombre:");

      if (!nombre) {
        alert("El nombre no puede estar vacío.");
      } else {
        return nombre;
      }
    }
  }

  // Función para ingresar el email del usuario
  function ingresarEmail() {
    while (true) {
      let email = prompt("Ingrese su email:");

      if (!email) {
        alert("El email no puede estar vacío.");
      } else if (!validarEmail(email)) {
        alert("Ingrese un email válido.");
      } else {
        return email;
      }
    }
  }

  // Función para ingresar la edad del usuario
  function ingresarEdad() {
    while (true) {
      let edad = parseInt(prompt("Ingrese su edad:"));

      if (isNaN(edad)) {
        alert("Ingrese un valor numérico para su edad.");
      } else {
        return edad;
      }
    }
  }

  // Función para validar el formato del email
  function validarEmail(email) {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  }

  // Solicitar los datos del préstamo
  let monto = solicitarMonto();
  let interes = solicitarInteres();
  let plazo = solicitarPlazo();

  // Crear una instancia del usuario
  const usuario = new Usuario(nombre, email, edad);
  usuario.montoPrestamo = monto;
  usuario.plazo = plazo;
  usuario.tasaInteres = interes;

  // Calcular la cuota mensual
  let tasaInteres = interes / 100 / 12;
  usuario.cuotaMensual = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo));

  // Agregar el usuario al arreglo de usuarios
  usuarios.push(usuario);

  // Mostrar mensaje de usuario registrado exitosamente
  alert("¡Usuario registrado exitosamente!");
};

// Función para mostrar los usuarios registrados
const mostrarUsuarios = () => {
  if (usuarios.length === 0) {
    alert("Aún no se han registrado usuarios.");
  } else {
    let usuariosTexto = "Usuarios registrados:\n";

    usuarios.forEach(usuario => {
      usuariosTexto += `Nombre: ${usuario.nombre} (${usuario.email})\n`;
      usuariosTexto += `Edad: ${usuario.edad}\n`;
      usuariosTexto += `Monto del préstamo: $${usuario.montoPrestamo.toFixed(2)}\n`;
      usuariosTexto += `Plazo del préstamo: ${usuario.plazo} meses\n`;
      usuariosTexto += `Tasa de interés anual: ${usuario.tasaInteres}%\n`;
      usuariosTexto += `Cuota mensual: $${usuario.cuotaMensual.toFixed(2)}\n\n`;
    });

    alert(usuariosTexto);
  }
};

// Función para ejecutar el programa principal
const ejecutarPrograma = () => {
  let opcion;

  do {
    opcion = prompt(`Seleccione una opción:
    1. Registrar un nuevo usuario y calcular préstamo
    2. Mostrar usuarios registrados
    3. Salir`);

    switch (opcion) {
      case "1":
        registrarYCalcularPrestamo();
        break;
      case "2":
        mostrarUsuarios();
        break;
      case "3":
        alert("Hasta luego!");
        break;
      default:
        alert("No te pases de listo. Intente nuevamente.");
        break;
    }
  } while (opcion !== "3");
};

ejecutarPrograma();
