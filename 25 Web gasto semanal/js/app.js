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
    if (presupuesto === '' || presupuesto <= 0 || isNaN(presupuesto)) {
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
        insertarMensaje('Todos los campos son obligatorios', 'err1')
        return;
    }
    if (Math.round(gasto) <= 0 || Math.round(gasto) >= 0) {
        insertarMensaje('El gasto debe tener un nombre valido', 'err2')
        return;
    }
    if (isNaN(cantidad) || cantidad < 0) {
        insertarMensaje('La cantidad debe ser un numero entero', 'err3')
        return;
    }
    gastos = [...gastos, {gasto: gasto, cantidad: cantidad}]; // Update gastos array
    actualizarPresupuesto();
    sincLocalStorage();
    insertarMensaje('Gasto agregado correctamente', 'success'); // insert HTML
    formulario.reset(); // reset formulario
}
function insertarMensaje(mensaje, tipo) {
    if (tipo === 'err1') {
        console.log(mensaje);
    } else if (tipo === 'err2') {
        console.log(mensaje);
    } else if (tipo === 'err3') {
        console.log(mensaje);
    } else {
        console.log(mensaje);
    }
}
function sincLocalStorage() {
    if (localStorage.getItem('gastosTest') !== '[]' && localStorage.getItem('gastosTest') !== null) {
        if (gastos.length === 0 || gastos === null) {
            gastos = JSON.parse(localStorage.getItem('gastosTest'))
        }
    }
    localStorage.setItem('gastosTest', JSON.stringify(gastos));
}
