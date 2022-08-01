(function() {

    document.addEventListener('DOMContentLoaded', () => {
        createDB();
    });

    function createDB() {
        const createDB = window.indexedDB.open('crm', 1);

        createDB.onerror = () => {
            console.log('Error creating database');
        }
        
        createDB.onsucess = () => {
            DB = createDB.result;
        };


        createDB.onupgradeneeded = (e) => {
            const db = e.target.result;
            const objetStore = db.createObjectStore('crm', {keyPath: 'id', autoIncrement: true});

            objetStore.createIndex('name', 'name', {unique: false});
            objetStore.createIndex('email', 'email', {unique: true});
            objetStore.createIndex('tel', 'tel', {unique: false});
            objetStore.createIndex('company', 'company', {unique: false});
            objetStore.createIndex('id', 'id', {unique: false});
            
            console.log('DB created and ready');
        }
    }
})();