// Variable 
let estudiantes = [];

// carga desde localStorage
function cargarDesdeLocalStorage() {
    const estudiantesJSON = localStorage.getItem('estudiantes');
    if (estudiantesJSON) {
        estudiantes = JSON.parse(estudiantesJSON);
        mostrarListaEnDOM();
    }
}

// Almacena la información de los estudiantes 
function guardarEnLocalStorage() {
    const estudiantesJSON = JSON.stringify(estudiantes);
    localStorage.setItem('estudiantes', estudiantesJSON);
}

// Función para evaluar la pre-entrega
function evaluarPreEntrega() {
    console.log("Haciendo clic en el botón"); // Verifica si la función se está llamando correctamente

    // Solicitar al usuario ingresar información
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let materia = document.getElementById('materia').value;

    console.log("Información del estudiante:", nombre, apellido, materia); // Verifica si los valores se están capturando correctamente

    let estudiante = {
        nombre: nombre,
        apellido: apellido,
        materia: materia
    };

    //  array
    estudiantes.push(estudiante);

    console.log("Estudiantes después de agregar:", estudiantes); // Verifica si el estudiante se está agregando correctamente

    //mensaje de bienvenida
    alert(`Bienvenida ${nombre} ${apellido}. Su materia es: ${materia}`);

    // Utilizar un bucle while para solicitar la nota hasta que se ingrese una entrada válida mayor o igual a 7
    while (true) {
        // Solicitar al usuario ingresar la nota de la pre-entrega
        let input = prompt("Ingresa la nota de la pre-entrega:");
        notaPreEntrega = parseFloat(input);

        // Verificar si la entrada es válida
        if (!isNaN(notaPreEntrega)) {
            if (notaPreEntrega >= 7) {
                alert("Aprobado en la pre-entrega");
            } else {
                alert("Desaprobado en la pre-entrega");
            }

            break; 
        } else {
            alert("Por favor, ingrese una nota válida.");
        }
    }

    // Después de agregar un estudiante
    mostrarListaEnDOM();
    guardarEnLocalStorage();
}

function mostrarListaEnDOM() {
    const listaEstudiantes = document.getElementById('listaEstudiantes');

    // Limpiar la lista actual
    listaEstudiantes.innerHTML = '';

    // Crear elementos y agregarlos al DOM
    estudiantes.forEach(estudiante => {
        const elementoEstudiante = document.createElement('li');
        elementoEstudiante.textContent = `${estudiante.nombre} ${estudiante.apellido} - ${estudiante.materia}`;
        listaEstudiantes.appendChild(elementoEstudiante);
    });
}

const botonAgregarEstudiante = document.getElementById('agregarEstudiante');
if (botonAgregarEstudiante) {
    botonAgregarEstudiante.addEventListener('click', evaluarPreEntrega);
} else {
    console.error("No se encontró el botón 'Agregar Estudiante'"); // Verifica si el botón se está seleccionando correctamente
}

// Al cargar desde localStorage
cargarDesdeLocalStorage();
