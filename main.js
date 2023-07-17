// Crear la clase Usuario
class Usuario {
  constructor(nombre, apellido, email, edad, montoPrestamo, plazo, tasaInteres, cuotaMensual, dni) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.edad = edad;
    this.montoPrestamo = montoPrestamo;
    this.plazo = plazo;
    this.tasaInteres = tasaInteres;
    this.cuotaMensual = cuotaMensual;
    this.dni = dni;
  }
}

// Arreglo para almacenar los usuarios registrados
let curso = [];

// Función para agregar un usuario
function agregarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const edad = document.getElementById("edad").value;
  const montoPrestamo = document.getElementById("montoPrestamo").value;
  const plazo = document.getElementById("plazo").value;
  const tasaInteres = document.getElementById("tasaInteres").value;
  const cuotaMensual = calcularCuotaMensual(montoPrestamo, plazo, tasaInteres);
  const dni = document.getElementById("dni").value;

  if (!nombre || !apellido || !email || !edad || !montoPrestamo || !plazo || !tasaInteres || !dni) {
    document.getElementById("mensaje").textContent = "Debe ingresar todos los datos del usuario";
    return;
  }

  if (dniDuplicado(dni)) {
    document.getElementById("mensaje").textContent = "Ya existe un usuario con ese DNI";
    return;
  }

  if (!validarEmail(email)) {
    document.getElementById("mensaje").textContent = "Ingrese un correo electrónico válido";
    return;
  }

  const nuevoUsuario = new Usuario(nombre, apellido, email, edad, montoPrestamo, plazo, tasaInteres, cuotaMensual, dni);

  curso.push(nuevoUsuario);
  guardarEnLocalStorage();
  document.getElementById("mensaje").textContent = "Se agregó correctamente el usuario";

  // Reiniciar los campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("email").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("montoPrestamo").value = "";
  document.getElementById("plazo").value = "";
  document.getElementById("tasaInteres").value = "";
  document.getElementById("dni").value = "";

  listarUsuarios();
}

// Función para verificar si el DNI está duplicado
function dniDuplicado(dni) {
  return curso.some((usuario) => usuario.dni === dni);
}

// Función para calcular la cuota mensual
function calcularCuotaMensual(monto, plazo, tasaInteres) {
  const tasaMensual = tasaInteres / 100 / 12;
  return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
}

// Función para validar el formato del correo electrónico
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Cargar datos desde el localStorage al array curso
function cargarDesdeLocalStorage() {
  const usuariosGuardados = localStorage.getItem("curso");
  if (usuariosGuardados) {
    curso = JSON.parse(usuariosGuardados);
  }
}

// Guardar datos del array curso en el localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("curso", JSON.stringify(curso));
}

// Función para eliminar un usuario del array curso
function eliminarUsuario(index) {
  curso.splice(index, 1);
  guardarEnLocalStorage();
  listarUsuarios();
}

// Función para mostrar la lista de usuarios en el DOM
function listarUsuarios() {
  const contenedorUsuarios = document.getElementById("usuariosContainer");
  contenedorUsuarios.innerHTML = "";

  if (curso.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay usuarios para mostrar";
    contenedorUsuarios.appendChild(mensaje);
  } else {
    curso.forEach((usuario, index) => {
      const tarjeta = crearTarjetaUsuario(usuario, index);
      contenedorUsuarios.appendChild(tarjeta);
    });
  }
}

// Función para crear una tarjeta con los datos del usuario
function crearTarjetaUsuario(usuario, index) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "card text-bg-dark mb-3";
  tarjeta.style = "max-width: 18rem;";

  const tarjetaHeader = document.createElement("div");
  tarjetaHeader.className = "card-header";
  tarjetaHeader.textContent = "Usuario";

  const tarjetaBody = document.createElement("div");
  tarjetaBody.className = "card-body";

  const titulo = document.createElement("h5");
  titulo.className = "card-title";
  titulo.textContent = `${usuario.nombre} ${usuario.apellido}`;

  const texto = document.createElement("p");
  texto.className = "card-text";
  texto.innerHTML = `DNI: ${usuario.dni}, Edad: ${usuario.edad}<br>
                    Correo: ${usuario.email}<br>
                    Tasa de interés: ${usuario.tasaInteres}%<br>
                    Cuota mensual: $${usuario.cuotaMensual ? usuario.cuotaMensual.toFixed(2) : "N/A"}`;

  const botonEliminar = document.createElement("button");
  botonEliminar.className = "btn btn-danger";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", () => eliminarUsuario(index));

  tarjetaBody.appendChild(titulo);
  tarjetaBody.appendChild(texto);
  tarjetaBody.appendChild(botonEliminar);
  tarjeta.appendChild(tarjetaHeader);
  tarjeta.appendChild(tarjetaBody);

  return tarjeta;
}

// Cargar datos del localStorage al array curso cuando se inicia la página
cargarDesdeLocalStorage();
listarUsuarios();

// Evento para agregar un usuario cuando se presiona el botón
document.getElementById("btnAgregar").addEventListener("click", agregarUsuario);

// Evento para mostrar todos los usuarios cuando se presiona el botón
document.getElementById("btnMostrarUsuarios").addEventListener("click", listarUsuarios);

// Evento para ocultar la lista de usuarios cuando se presiona el botón
document.getElementById("btnEsconderLista").addEventListener("click", esconderLista);

// Evento para buscar un usuario por DNI
document.getElementById("buscarDNI").addEventListener("input", buscarUsuarioPorDni);

// Función para ocultar la lista de usuarios
function esconderLista() {
  const contenedorUsuarios = document.getElementById("usuariosContainer");
  contenedorUsuarios.innerHTML = "";
}

// Función para buscar el usuario por DNI
function buscarUsuarioPorDni() {
  const dniBuscado = document.getElementById("buscarDNI").value;
  const usuariosEncontrados = curso.filter((usuario) => usuario.dni === dniBuscado);

  const contenedorUsuarios = document.getElementById("usuariosContainer");
  contenedorUsuarios.innerHTML = "";

  if (usuariosEncontrados.length > 0) {
    usuariosEncontrados.forEach((usuario) => {
      const tarjeta = crearTarjetaUsuario(usuario);
      contenedorUsuarios.appendChild(tarjeta);
    });

    document.getElementById("mensaje").textContent = "";
  } else {
    document.getElementById("mensaje").textContent = "No se encontró ningún usuario con ese DNI";
  }
}

// Función para borrar el contenido del LocalStorage y el array curso
function borrarLocalStorage() {
  localStorage.removeItem("curso");
  curso = [];
  alert("Se ha borrado todo el contenido del LocalStorage");
}

// Cargar datos del localStorage al array curso cuando inicia
cargarDesdeLocalStorage();
