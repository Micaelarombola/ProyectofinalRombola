class Estudiante {
    constructor(nombre, apellido, materia, notaPreEntrega) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.materia = materia;
        this.notaPreEntrega = notaPreEntrega;
    }
}

let estudiantes = [];

function agregarEstudiante(estudiante) {
    estudiantes.push(estudiante);
}

function mostrarEstudiantesEnDOM() {
    const listaEstudiantes = document.getElementById('listaEstudiantes');

    listaEstudiantes.innerHTML = '';

    estudiantes.forEach(estudiante => {
        const elementoEstudiante = document.createElement('li');
        elementoEstudiante.className = 'list-group-item';
        elementoEstudiante.textContent = `${estudiante.nombre} ${estudiante.apellido} - ${estudiante.materia} - Nota Pre-Entrega: ${estudiante.notaPreEntrega}`;
        listaEstudiantes.appendChild(elementoEstudiante);
    });
}

function mostrarGraficoNotasPromedio() {
    const ctx = document.getElementById('graficoNotasPromedio').getContext('2d');

    const materias = estudiantes.map(estudiante => estudiante.materia);
    const notasPromedio = estudiantes.map(estudiante => estudiante.notaPreEntrega);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: materias,
            datasets: [{
                label: 'Nota Pre-Entrega Promedio',
                data: notasPromedio,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const formularioEstudiante = document.getElementById('formularioEstudiante');
if (formularioEstudiante) {
    formularioEstudiante.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const materia = document.getElementById('materia').value;
        const notaPreEntrega = parseFloat(document.getElementById('notaPreEntrega').value);

        const nuevoEstudiante = new Estudiante(nombre, apellido, materia, notaPreEntrega);
        agregarEstudiante(nuevoEstudiante);

        mostrarEstudiantesEnDOM();
        guardarEnLocalStorage();
        mostrarGraficoNotasPromedio();

        // Limpiar el formulario
        formularioEstudiante.reset();
    });
} else {
    console.error("No se encontró el formulario 'formularioEstudiante'");
}

function cargarDesdeLocalStorage() {
    const estudiantesJSON = localStorage.getItem('estudiantes');
    if (estudiantesJSON) {
        estudiantes = JSON.parse(estudiantesJSON);
        mostrarEstudiantesEnDOM();
        mostrarGraficoNotasPromedio(); // Agregar esta línea para mostrar el gráfico al cargar desde localStorage
    }
}

function guardarEnLocalStorage() {
    const estudiantesJSON = JSON.stringify(estudiantes);
    localStorage.setItem('estudiantes', estudiantesJSON);
}

function obtenerDatosDesdeAPI() {
    fetch('https://api.example.com/estudiantes')
        .then(response => response.json())
        .then(data => {
            data.forEach(estudiante => {
                const nuevoEstudiante = new Estudiante(estudiante.nombre, estudiante.apellido, estudiante.materia, estudiante.notaPreEntrega);
                agregarEstudiante(nuevoEstudiante);
            });

            mostrarEstudiantesEnDOM();
            mostrarGraficoNotasPromedio();
            guardarEnLocalStorage();
        })
        .catch(error => console.error('Error al obtener datos desde la API:', error));
}

// Al cargar desde localStorage
cargarDesdeLocalStorage();

// Llamada a función para obtener datos desde la API externa
obtenerDatosDesdeAPI();
