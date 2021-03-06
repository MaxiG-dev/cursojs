(function () {
    let DB;
    let idCliente;
    const formulario = document.querySelector('#formulario');

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', actualizarCliente);

        // Check if the client exists
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });

    function conectarDB() {
        // Open connection to DB

        let abrirConexion = window.indexedDB.open('crm', 1);

        // case error show error message
        abrirConexion.onerror = function () {
            console.log('Hubo un error');
        };

        // case sucess assign the result to database
        abrirConexion.onsuccess = function () {
            // assign result
            DB = abrirConexion.result;
        };
    }

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        console.log(objectStore);

        var request = objectStore.openCursor();
        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value.id == id) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        };
    }

    function llenarFormulario(datosCliente) {
        const { nombre, email, empresa, telefono } = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
    }

    function actualizarCliente(e) {
        e.preventDefault();

        if (
            nombreInput.value === '' ||
            emailInput.value === '' ||
            empresaInput.value === '' ||
            telefonoInput.value === ''
        ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // update...
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente),
        };

        console.log(clienteActualizado);

        // update...
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = () => {
            imprimirAlerta('Editado Correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = (error) => {
            console.log(error);
            console.log('Hubo un errorr.');
        };
    }

    function imprimirAlerta(mensaje, tipo) {
        // create div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add(
            'px-4',
            'py-3',
            'rounded',
            'max-w-lg',
            'mx-auto',
            'mt-6',
            'text-center'
        );

        if (tipo === 'error') {
            divMensaje.classList.add(
                'bg-red-100',
                'border-red-400',
                'text-red-700'
            );
        } else {
            divMensaje.classList.add(
                'bg-green-100',
                'border-green-400',
                'text-green-700'
            );
        }

        // Error message
        divMensaje.textContent = mensaje;

        // Insert in the DOM
        formulario.appendChild(divMensaje);

        // Remove alert after 3 seconds
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
})();
