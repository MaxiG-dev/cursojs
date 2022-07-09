// ! Variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// ! Events listeners
eventListener();
function eventListener() {
    document.addEventListener('DOMContentLoaded', startApp);
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        nuevoGasto();
    });
}

// ! Classes
class Presupuesto {
    constructor(presupuesto, restante) {
        this.presupuesto = presupuesto;
        this.restante = restante;
    }
}
const presupuestoSave = new Presupuesto();

// ! Arrays
gastos = [];

// ! Functions
function startApp() {
    let askpresupuesto = askPresupuesto();
    presupuestoSave.presupuesto = askpresupuesto;
    presupuestoSave.restante = askpresupuesto;
    sincLocalStorage();
    actualizarPresupuesto();
    // TODO Leer LocalStorage y compruebo si esta vacio e insertar tareas y actualizo el array gastos
}

function askPresupuesto() {
    const presupuesto = 5000; //! prompt('¿Cual es tu presupuesto?');
    if (
        presupuesto === '' ||
        presupuesto <= 0 ||
        isNaN(presupuesto) ||
        presupuesto === null
    ) {
        window.location.reload();
        return;
    }
    return parseInt(presupuesto);
}

function actualizarPresupuesto() {
    const divRestante = document.querySelector('.restante');
    let { presupuesto, restante } = presupuestoSave;
    if (gastos.length > 0) {
        for (let i = 0; i < gastos.length; i++) {
            restante -= gastos[i].cantidad;
            insertarGasto(i);
        }
    }
    divRestante.classList.remove('alert-success');
    divRestante.classList.remove('alert-warning');
    divRestante.classList.remove('alert-danger');
    let porcentaje = (restante * 100) / presupuesto;
    if (porcentaje > 50 || presupuesto === restante) {
        divRestante.classList.add('alert-success');
    } else if (porcentaje <= 25) {
        divRestante.classList.add('alert-danger');
    } else if (porcentaje <= 50) {
        divRestante.classList.add('alert-warning');
    }
    if (restante <= 0) {
        formulario.querySelector('button[type=submit]').disabled = true;
        if (document.querySelector('.primario .alert') !== null) {
            setTimeout(() => {
                insertarMensaje('El presupuesto se ha agotado', 'error');
            }, 2000);
        } else {
            insertarMensaje('El presupuesto se ha agotado', 'error');
        }
    } else {
        formulario.querySelector('button[type=submit]').disabled = false;
    }
    const textPresupuesto = document.querySelector('.presupuesto p');
    const textRestante = document.querySelector('.restante p');
    textPresupuesto.textContent = `Presupuesto: $${presupuesto}`;
    textRestante.textContent = `Restante: $${restante}`;
}

function nuevoGasto() {
    const gasto = formulario.children.item(0).children.item(1).value;
    const cantidad = parseInt(
        formulario.children.item(1).children.item(1).value
    );
    if (gasto === '' || cantidad === '') {
        insertarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    if (Math.round(gasto) <= 0 || Math.round(gasto) >= 0) {
        insertarMensaje('El gasto debe tener un nombre valido', 'error');
        return;
    }
    if (isNaN(cantidad) || cantidad < 0) {
        insertarMensaje('La cantidad debe ser un numero entero', 'error');
        return;
    }
    gastos = [...gastos, { gasto: gasto, cantidad: cantidad, id: Date.now() }]; // Update gastos array
    limpiarHTML();
    insertarMensaje('Gasto agregado correctamente!', 'success'); // insert HTML
    actualizarPresupuesto();
    sincLocalStorage();
    formulario.reset(); // reset formulario
}

function insertarGasto(i) {
    const { gasto, cantidad, id } = gastos[i];
    const nuevoGasto = document.createElement('li');
    nuevoGasto.className =
        'list-group-item d-flex justify-content-between align-items-center';
    nuevoGasto.dataset.id = id;
    nuevoGasto.innerHTML = `${gasto} <span class='badge badge-primary badge-pill'>$${cantidad}</span>
    `;
    const btnBorrar = document.createElement('button');
    btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
    btnBorrar.innerHTML = 'Borrar &times;';
    btnBorrar.onclick = () => {
        borrarGasto(id);
    };
    nuevoGasto.appendChild(btnBorrar);
    gastoListado.appendChild(nuevoGasto);
}

function insertarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    if (document.querySelector('.primario .alert') !== null) {
        document.querySelector('.primario .alert').remove();
    }
    divMensaje.classList.add('text-center', 'alert');
    divMensaje.textContent = mensaje;
    if (tipo === 'error') {
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-success');
    }
    document.querySelector('.primario').insertBefore(divMensaje, formulario); // insert in HTML
    setTimeout(() => {
        divMensaje.remove();
    }, 2000);
}

function sincLocalStorage() {
    if (
        localStorage.getItem('gastosTest') !== '[]' &&
        localStorage.getItem('gastosTest') !== null
    ) {
        if (gastos.length === 0 || gastos === null) {
            gastos = JSON.parse(localStorage.getItem('gastosTest'));
        }
    }
    localStorage.setItem('gastosTest', JSON.stringify(gastos));
}

function limpiarHTML() {
    while (gastoListado.firstChild) {
        gastoListado.firstChild.remove();
    }
}

function borrarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    limpiarHTML();
    actualizarPresupuesto();
    insertarMensaje('Gasto eliminado correctamente!')
    if (this.gastos.length === 0) {
        localStorage.setItem('gastosTest', JSON.stringify(this.gastos));
    } else {
        sincLocalStorage();
    }
}
