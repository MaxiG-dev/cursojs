// Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
let itemsForm = {
    email: false,
    asunto: false,
    mensaje: false,
};

cargarEventsListeners();
function cargarEventsListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}

// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    // if (e.target.value.length > 0) {
    //     // Eliminar errores
    //     const error = document.querySelector('p.error');
    //     if (error !== null) {
    //         error.remove();
    //     }
    //     colorFormulario('verde', e.target)
    // } else {
    //     colorFormulario('rojo', e.target)
    //     mostrarError('Todos los campos son obligatorios');
    // }

    // Validar email
    if (e.target.type === 'email') {
        limpiarError();
        const regExp =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regExp.test(e.target.value)) {
            colorFormulario('verde', e.target);
            itemsForm.email = true;
        } else {
            colorFormulario('rojo', e.target);
            mostrarError('El email no es valido');
            itemsForm.email = false;
        }
        // Validar asunto
    } else if (e.target.type === 'text') {
        limpiarError();
        mensajeError(e.target);
        // Validar mensaje
    } else if (e.target.type === 'textarea') {
        limpiarError();
        mensajeError(e.target);
    }

    // Si todos los campos son true habilitamos el boton de enviar
    if (
        itemsForm.email === true &&
        itemsForm.asunto === true &&
        itemsForm.mensaje === true
    ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        iniciarApp();
    }

    // switch (e.target.type) {
    //     case 'email':
    //         const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //         if (regExp.test(e.target.value)) {
    //             colorFormulario('verde', e.target)
    //         } else {
    //             colorFormulario('rojo', e.target)
    //             mostrarError('El email no es valido');
    //         }
    //     break;
    // }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        'error',
        'border-2',
        'border-red-700',
        'bg-red-600',
        'text-white',
        'text-center',
        'p-3',
        'font-bold',
        'mt-5'
    );
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function colorFormulario(color, elemento) {
    switch (color) {
        case 'rojo':
            elemento.classList.remove('border-green-500');
            elemento.classList.add('border', 'border-red-500');
            break;
        case 'verde':
            elemento.classList.remove('border-red-500');
            elemento.classList.add('border', 'border-green-500');
            break;
    }
}

function limpiarError() {
    const error = document.querySelector('p.error');
    if (error !== null) {
        error.remove();
    }
}

function mensajeError(elemento) {
    if (elemento.value.length > 0) {
        colorFormulario('verde', elemento);
        actualizarItemsForm(elemento, true);
    } else {
        colorFormulario('rojo', elemento);
        mostrarError('Todos los campos son obligatorios');
        actualizarItemsForm(elemento, false);
    }
}

function actualizarItemsForm(elemento, trueFalse) {
    if (elemento.id === 'asunto') {
        itemsForm.asunto = trueFalse;
    }
    if (elemento.id === 'mensaje') {
        itemsForm.mensaje = trueFalse;
    }
}