import UI from "./classes/UI.js";
import Citas from "./classes/Citas.js";
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from "./selectores.js";

// ! Instance classes 
const ui = new UI();
const administrarCitas = new Citas();

let editando;

// ! Principal object for save inputs
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// ! LocalStorage Sync
!function () {
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.citas !== '' && localStorage.citas !== undefined && localStorage.citas !== null && localStorage.citas !== '[null]' && localStorage.citas !== '[]') {
            administrarCitas.localStorageCitas(JSON.parse(localStorage.getItem('citas')));
            ui.imprimirCitas(administrarCitas)
        }
    })
} ();

// ! Add info to principal object
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// ! Validate and add a new cita to class cita
export function nuevaCita(e) {
    e.preventDefault();

    // Destructuring object
    const { mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validate 
    if (mascota === '' || propietario === '' || fecha === '' || telefono === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    if (editando) {
        administrarCitas.editarCita({...citaObj})
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

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.fecha = '';
    citaObj.telefono = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Delete cita
    administrarCitas.eliminarCita(id);
    // Show alert
    ui.imprimirAlerta('La cita se eliminó correctamente', 'sucess')
    // Refresh the citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
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
