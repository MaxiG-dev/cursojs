// ! Variables
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventsListeners();
function cargarEventsListeners() {
    // Funcion agregar cursos al carrito
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        carritoStorage();
        vaciarCarrito();
    });
}

// ! Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

// Eliminar curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        // Selecciona la id del curso del carrito
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(
            (curso) => curso.id !== cursoId
        );
        // Llamamos la funcion para actualizar el HTML
        carritoHTML();
        // Llamamos la funcion para actualizar el LocalStorage
        carritoStorage();
    }
}

// Lee el contenido del curso al que dimos click y extrae la información
function leerDatosCursos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };
    // Revisa si un elemento ya esta en el carrito para actualizar la cantidad
    const revisarCursos = articulosCarrito.some(
        (curso) => curso.id === infoCurso.id
    );
    if (revisarCursos) {
        // Actualizamos la cantidad del carrito
        const cursos = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto con la cantidad actualizada
            } else {
                return curso; // retorna los objetos que no estan dupicados
            }
        });
        articulosCarrito = [...cursos];
        carritoStorage();
    } else {
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        carritoStorage();
    }
    carritoHTML(); // Llama la funcion para agregar cursos al carrito
}

// Muestra los cursos en el carrito de compras
function carritoHTML() {
    // Limpia el HTML del carrito
    vaciarCarrito();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
        // Agrega el HTML al tbody del carrito
        listaCarrito.appendChild(row);
    });
}

// Vacia el carrito
function vaciarCarrito() {
    // ? Forma lenta de vaciar HTML
    // listaCarrito.innerHTML  = '';
    // ! Forma rapida de vaciar HTML
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

// Almacena cursos en LocalStorage
function carritoStorage() {
    localStorage.setItem('carritoStorage', JSON.stringify(articulosCarrito));
}

// Revisa el LocalStorage al actualizar la pagina y si tiene cursos los agrega al carrito
revisarLocalStorage();
function revisarLocalStorage() {
    const getCarritoStorage = localStorage.getItem('carritoStorage');
    if (getCarritoStorage === '[]' || getCarritoStorage === null) {
        // No ejecutamos nada
    } else {
        // Actualizamos el objeto y llamamos la funcion carritoHTML
        const carritoLocalStorage = getCarritoStorage;
        articulosCarrito = JSON.parse(carritoLocalStorage);
        carritoHTML();
    }
}