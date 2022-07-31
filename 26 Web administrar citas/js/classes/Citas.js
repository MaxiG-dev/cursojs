class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCitas(cita) {
        this.citas = [...this.citas, cita];
        localStorage.setItem('citas', JSON.stringify(this.citas));
    }
    localStorageCitas(array) {
        this.citas = array;
    }
    eliminarCita(id) {
        this.citas = this.citas.filter((cita) => cita.id !== id);
        localStorage.setItem('citas', JSON.stringify(this.citas));
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map((cita) =>
            cita.id === citaActualizada.id ? citaActualizada : cita
        );
        localStorage.setItem('citas', JSON.stringify(this.citas));
    }
}

export default Citas;
