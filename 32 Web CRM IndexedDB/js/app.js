(function () {
    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if (window.indexedDB.open('crm', 1)) {
            obtenerClientes();
        }
    });

    // IndexedDB Code
    function crearDB() {
        // create database with version 1
        const crearDB = window.indexedDB.open('crm', 1);

        // case error show error message
        crearDB.onerror = function () {
            console.log('Hubo un error');
        };

        // case sucess assign the result to database
        crearDB.onsuccess = function () {
            // assign result
            DB = crearDB.result;
        };

        // this method only runs once, configure the database
        crearDB.onupgradeneeded = function (e) {
            // the event that is going to be run we take the database
            const db = e.target.result;

            // define the objectstore, first parameter the name of the DB, second the options
            // keypath is where the indexes will be obtained from
            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true,
            });

            //createindex, name and keypath, 3ro the parameters
            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('Database creada y lista');
        };
    }

    function obtenerClientes() {
        let abrirConexion = window.indexedDB.open('crm', 1);

        // case error show error message
        abrirConexion.onerror = function () {
            console.log('Hubo un error');
        };

        // case sucess assign the result to database
        abrirConexion.onsuccess = function () {
            // assign result
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            // return objet request or petition,
            objectStore.openCursor().onsuccess = function (e) {
                // cursor will be located in the indicated record to access the data
                const cursor = e.target.result;

                //  console.log(e.target);

                if (cursor) {
                    const { nombre, empresa, email, telefono, id } =
                        cursor.value;

                    const listadoClientes =
                        document.querySelector('#listado-clientes');
                    listadoClientes.innerHTML += `

                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    //  console.log('llegamos al final...');
                }
            };
        };
    }
})();
