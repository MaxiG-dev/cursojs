// ! Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

cargarEventsListeners();
function cargarEventsListeners() {
    // Cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);
    // Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);
    // Resetear formulario
    btnReset.addEventListener("click", resetearFormulario);
    // Enviar email
    btnEnviar.addEventListener("click", enviarEmail);
}

// ! Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
    // Validar email
    if (e.target.type === "email") {
        limpiarError();
        if (regExp.test(e.target.value)) {
            colorFormulario("verde", e.target);
        } else {
            colorFormulario("rojo", e.target);
            mostrarError("El email no es valido");
        }
        // Validar asunto
    } else if (e.target.type === "text") {
        limpiarError();
        mensajeError(e.target);
        // Validar mensaje
    } else if (e.target.type === "textarea") {
        limpiarError();
        mensajeError(e.target);
    }
    // Si todos los campos son validos habilitamos el boton de enviar
    if (
        regExp.test(email.value) &&
        asunto.value !== "" &&
        mensaje.value !== ""
    ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    } else {
        iniciarApp();
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "error",
        "border-2",
        "border-red-700",
        "bg-red-600",
        "text-white",
        "text-center",
        "p-3",
        "font-bold",
        "mt-5"
    );
    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function colorFormulario(color, elemento) {
    switch (color) {
        case "rojo":
            elemento.classList.remove("border-green-500");
            elemento.classList.add("border", "border-red-500");
            break;
        case "verde":
            elemento.classList.remove("border-red-500");
            elemento.classList.add("border", "border-green-500");
            break;
    }
}

function limpiarError() {
    const error = document.querySelector("p.error");
    if (error !== null) {
        error.remove();
    }
}

function mensajeError(elemento) {
    if (elemento.value.length > 0) {
        colorFormulario("verde", elemento);
    } else {
        colorFormulario("rojo", elemento);
        mostrarError("Todos los campos son obligatorios");
    }
}

function enviarEmail(e) {
    e.preventDefault();
    // Mostrar spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    iniciarApp();
    // Delay 2 seg
    setTimeout(() => {
        spinner.style.display = "none";
        // Mensaje se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envio correctamente";
        parrafo.classList.add(
            "text-center",
            "my-10",
            "p-5",
            "bg-green-500",
            "text-white",
            "font-bold"
        );
        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);
    }, 2000);
}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    limpiarError();
    email.classList.remove("border-green-500", "border-red-500");
    asunto.classList.remove("border-green-500", "border-red-500");
    mensaje.classList.remove("border-green-500", "border-red-500");
}