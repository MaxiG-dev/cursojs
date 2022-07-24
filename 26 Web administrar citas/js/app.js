// ! Variables inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// ! Variables for UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// ! Classes
class Citas {
    constructor() {
        this.citas = [];
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        // Create alert
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }
        // Alert message
        divMensaje.textContent = mensaje;
        // Add div to DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))
        // Remove alert after five seconds
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
}

const ui = new UI();
const administrarCitas = new Citas();

// ! Register events whit eventListener
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);
    formulario.addEventListener('submit', nuevaCita);
}

// ! Principal object for save inputs
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// ! Add dates to principal object
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

// ! Validate and add a new cita to class cita
function nuevaCita(e) {
    e.preventDefault();

    // Destructuring object
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validate 
    if (mascota === '' || propietario === '' || fecha === '' || telefono === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
}   