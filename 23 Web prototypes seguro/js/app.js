// ! Constructors
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
function UI() {}

// ! Prototypes
// Calc cotization
Seguro.prototype.cotizarSeguro = function () {
    // 1 = Americano 1.15, 2 = Asiatico 1.05, 3 = Europeo 1.35
    let cantidad;
    const base = 2000; //
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    // Read year
    const diferencia = new Date().getFullYear() - this.year;
    // 3% - for year
    cantidad -= (diferencia * 3 * cantidad) / 100;
    // Basic 30% more, complete 50% more
    if (this.tipo === 'completo') {
        cantidad *= 1.5;
    } else {
        cantidad *= 1.3;
    }
    cantidad = Math.round(cantidad);
    return cantidad;
};

// Complete years options
UI.prototype.llenarOpciones = () => {
    const max = new Date().getUTCFullYear(),
        min = max - 23;
    const selectYear = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        option.classList = '.option';
        selectYear.appendChild(option); // Insert years in HTML
    }
};
// Show messages in screen
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const formulario = document.querySelector('#cotizar-seguro');
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10', 'font-bold');
    div.textContent = mensaje;
    // Remove message before continuing
    const mensajes = document.querySelectorAll('.mensaje').item(0);
    if (mensajes !== null) {
        mensajes.remove();
    }
    // Insert message in HTML
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 2000);
};
UI.prototype.mostrarResultado = (total, seguro) => {
    // Destructuring object Seguro
    let { marca, year, tipo } = seguro;
    marca === '1' ? (marca = 'Americano') : marca === '2' ? (marca = 'Asiatico') : (marca = 'Europeo');
    // ? Another form make same
    // marca==='1' ? textMarca='Americano' : marca==='2' ? textMarca='Asiatico' : textMarca='Europeo'
    // ? Another form make same
    // const marca2 = document.querySelector('#marca')
    // const textMarca2 = marca2.item(marca2.value).textContent
    // Create result
    tipo === 'basico' ? (tipo = 'Basico') : (tipo = 'Completo');
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class='header'>Tu resumen</p>
    <p class='font-bold'>Marca: <span class='font-normal'>${marca}</span></p>
    <p class='font-bold'>Año: <span class='font-normal'>${year}</span></p>
    <p class='font-bold'>Seguro: <span class='font-normal'>${tipo}</span></p>
    <p class='font-bold'>Total: <span class='font-normal'>$${total}</span></p>
    `;
    const resultado = document.querySelector('#resultado');
    // Show spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'; // Remove spinner
        resultado.appendChild(div); // Show result
    }, 2000);
};

// ! Instance objects
const createUI = new UI();

// ! Load events listeners
document.addEventListener('DOMContentLoaded', () => {
    createUI.llenarOpciones(); // Complete years options
});

formulario();
function formulario() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

// ! Functions
function cotizarSeguro(e) {
    e.preventDefault();
    // Check model select
    const marca = document.querySelector('#marca').value;
    // Check year select
    const year = document.querySelector('#year').value;
    // Check tipe select
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // Hide previous cotization result
    const resultados = document.querySelector('#resultado div');
    if (resultados !== null) {
        resultados.remove();
    }
    // Validate form
    if (marca === '' || year === '' || tipo === '') {
        createUI.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return; // Stop function
    }
    // Disable principal button
    desactivarBtn();
    // Call function to show message
    createUI.mostrarMensaje('Cotizando...', 'correcto');
    // Instance object Seguro
    const seguro = new Seguro(marca, year, tipo);
    // Call function to calc cotization
    const total = seguro.cotizarSeguro();
    // Show result
    createUI.mostrarResultado(total, seguro);
}

function desactivarBtn() {
    const desactivarBtn = document.querySelector('button[type=submit]');
    desactivarBtn.disabled = true;
    desactivarBtn.classList.add('cursor-not-allowed', 'opacity-50');
    setTimeout(() => {
        desactivarBtn.disabled = false;
        desactivarBtn.classList.remove('cursor-not-allowed', 'opacity-50');
    }, 2000);
}