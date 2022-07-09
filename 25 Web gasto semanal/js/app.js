// ! Variables
const formulario = document.querySelector('#agregar-gasto');
const gasto = document.querySelector('#gasto ul');

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
    if (presupuesto === '' || presupuesto <= 0 || isNaN(presupuesto) || presupuesto === null) {
        window.location.reload();
        return;
    }
    return parseInt(presupuesto);
}
function actualizarPresupuesto() {
    let {presupuesto, restante} = presupuestoSave;
    if (gastos.length > 0) {
        for (let i = 0; i < gastos.length; i++) {
        restante -= gastos[i].cantidad
        }
        let porcentaje = restante * 100 / presupuesto
        if (porcentaje <= 0) {
            console.log('menos o = que 0');
        } else if (porcentaje <= 25) {
            console.log('menos que 25');
        } else if (porcentaje <= 50) {
            console.log('menos que 50');
        } else {
            console.log('mas que 50');
        }
        insertarGasto();
    }
    const textPresupuesto = document.querySelector('.presupuesto p')
    const textRestante = document.querySelector('.restante p')
    textPresupuesto.textContent = `Presupuesto: $${presupuesto}`
    textRestante.textContent = `Restante: $${restante}`
}
function nuevoGasto() {
    const gasto = formulario.children.item(0).children.item(1).value;
    const cantidad = parseInt(formulario.children.item(1).children.item(1).value);
    if (gasto === '' || cantidad === '') {
        insertarMensaje('Todos los campos son obligatorios', 'error')
        return;
    }
    if (Math.round(gasto) <= 0 || Math.round(gasto) >= 0) {
        insertarMensaje('El gasto debe tener un nombre valido', 'error')
        return;
    }
    if (isNaN(cantidad) || cantidad < 0) {
        insertarMensaje('La cantidad debe ser un numero entero', 'error')
        return;
    }
    gastos = [...gastos, {gasto: gasto, cantidad: cantidad, id: Date.now()}]; // Update gastos array
    actualizarPresupuesto();
    sincLocalStorage();
    insertarMensaje('Gasto agregado correctamente!', 'success'); // insert HTML
    formulario.reset(); // reset formulario
}
function insertarGasto() {
    const {gasto, cantidad, id} = gastos
    const nuevoGasto = document.createElement('li');
    nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';

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
    if (localStorage.getItem('gastosTest') !== '[]' && localStorage.getItem('gastosTest') !== null) {
        if (gastos.length === 0 || gastos === null) {
            gastos = JSON.parse(localStorage.getItem('gastosTest'))
        }
    }
    localStorage.setItem('gastosTest', JSON.stringify(gastos));
}
