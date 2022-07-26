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
let editando;

// ! Classes
class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCitas(cita) {
        this.citas = [...this.citas, cita];
        localStorage.setItem('citas', (JSON.stringify(this.citas)));
    }
    localStorageCitas(array) {
        this.citas = array;
    }
    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id )
        localStorage.setItem('citas', (JSON.stringify(this.citas)));
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

    imprimirCitas({citas}) {
        this.limpiarHTML();
        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting whit elements
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: ${propietario}</span>
            `;
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: ${telefono}</span>
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: ${fecha}</span>
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: ${hora}</span>
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: ${sintomas}</span>
            `;
            // Create button to delete citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>`;
            btnEliminar.onclick = () => eliminarCita(id)

            // Create button to edit citas
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>`;
            btnEditar.onclick = () => cargarEdicion(cita)

            // Add divCita to the HTML
            contenedorCitas.appendChild(divCita);
            
            // Add p to divCita
            divCita.appendChild(mascotaParrafo); 
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

        })
    }
    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.citas !== '' && localStorage.citas !== undefined && localStorage.citas !== null && localStorage.citas !== '[null]' && localStorage.citas !== '[]') {
            console.log('test local storage');
            administrarCitas.localStorageCitas(JSON.parse(localStorage.getItem('citas')));
            ui.imprimirCitas(administrarCitas)
        }
    })
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

// ! Add info to principal object
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj);
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
    if (editando) {
        ui.imprimirAlerta('Se editó correctamente', 'success');
        formulario.querySelector('button[type=submit]').textContent = 'Crear cita';
        editando = false;
    } else {
        // Generate id
        citaObj.id = Date.now();

        // Create a new cita
        administrarCitas.agregarCitas({...citaObj});

        // Show alert
        ui.imprimirAlerta('Se agregó correctamente', 'success');
    }

    // Reset form and object
    formulario.reset();
    reiniciarObjeto();

    // Show HTML whit citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.fecha = '';
    citaObj.telefono = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    // Delete cita
    administrarCitas.eliminarCita(id);
    // Show alert
    ui.imprimirAlerta('La cita se eliminó correctamente', 'sucess')
    // Refresh the citas
    ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    // Fill form
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Fill object
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Change form button
    formulario.querySelector('button[type=submit]').textContent = 'Guardar cambios';
    editando = true;
}

// Administrador de cira ver video 8