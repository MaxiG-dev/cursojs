(function () {
    let DB;

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        formulario.addEventListener('submit', validarCliente);

        conectarDB();
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

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (
            nombre === '' ||
            email === '' ||
            telefono === '' ||
            empresa === ''
        ) {
            return;
        }

        // add to DB...
        // create a new object with all the info

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        };

        // Generate a unique ID
        cliente.id = Date.now();

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        // NEW:
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        // console.log(objectStore);
        objectStore.add(cliente);

        transaction.oncomplete = () => {
            console.log('Cliente Agregado');

            // Show message that everything is ok...
            imprimirAlerta('Se agregó correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = () => {
            console.log('Hubo un error!');
            imprimirAlerta('Hubo un Error', 'error');
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
