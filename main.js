// Variable para almacenar información de estudiantes
let estudiantes = [];

// Función para evaluar la pre-entrega
function evaluarPreEntrega() {
    // Solicitar al usuario ingresar información
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    materia = document.getElementById('materia').value;

    // Crear un objeto con la información del estudiante
    let estudiante = {
        nombre: nombre,
        apellido: apellido,
        materia: materia
    };

    // Agregar el objeto del estudiante al array
    estudiantes.push(estudiante);

    // Mostrar mensaje de bienvenida
    alert(`Bienvenida ${nombre} ${apellido}. Su materia es: ${materia}`);

    // Utilizar un bucle while para solicitar la nota hasta que se ingrese una entrada válida mayor o igual a 7
    while (true) {
        // Solicitar al usuario ingresar la nota de la pre-entrega
        let input = prompt("Ingresa la nota de la pre-entrega:");
        notaPreEntrega = parseFloat(input);

        // Verificar si la entrada es válida
        if (!isNaN(notaPreEntrega)) {
            if (notaPreEntrega >= 7) {
                // Mostrar el mensaje de resultado
                alert("Aprobado en la pre-entrega");
            } else {
                // Mostrar el mensaje de resultado
                alert("Desaprobado en la pre-entrega");
            }

            break; // Salir del bucle si la entrada es válida
        } else {
            alert("Por favor, ingrese una nota válida.");
        }
    }
}
