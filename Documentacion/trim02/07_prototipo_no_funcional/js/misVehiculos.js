const vehiculos = document.querySelectorAll('.tipo-vehiculos');
const modal = document.querySelector(".modal-agregar");
const actualizarVehiculo = document.getElementById("submit-actualizar");
const cerrarModal = document.getElementById("cerrar-modal");
const actualizarModal = document.getElementById("submit-actualizar-modal");
const modalEliminar = document.querySelector(".modal-eliminar");
const eliminarVehiculo = document.querySelector(".btn-vehiculo");
const btnCancelar = document.querySelector(".btn-cancelar");
const btnEliminar = document.querySelector(".btn-borrar");
const toastVehiculo = document.querySelector(".toast");
const progressToast = document.querySelector(".progressToast");

const modal2 = document.querySelector(".modal-agregar2");
const actualizarVehiculo2 = document.getElementById("submit-actualizar2");
const cerrarModal2 = document.getElementById("cerrar-modal2");
const actualizarModal2 = document.getElementById("submit-actualizar-modal2");

let vehiculoActual = 0;

document.querySelector('.flecha-izquierda').addEventListener('click', () => {
    cambiarVehiculo(-1);
});

document.querySelector('.flecha-derecha').addEventListener('click', () => {
    cambiarVehiculo(1);
});

function cambiarVehiculo(direccion) {
    vehiculos[vehiculoActual].style.display = 'none'; // Ocultar el vehículo actual
    vehiculoActual = (vehiculoActual + direccion + vehiculos.length) % vehiculos.length; // Cambiar índice
    vehiculos[vehiculoActual].style.display = 'flex'; // Mostrar el nuevo vehículo
}

actualizarVehiculo.addEventListener("click", () => {
    modal.classList.add("active");
});

cerrarModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

actualizarModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

eliminarVehiculo.addEventListener("click", () => {
    modalEliminar.classList.add("active");
})

btnEliminar.addEventListener("click", () => {
    modalEliminar.classList.remove("active");
    toastVehiculo.classList.add("active");
    progressToast.classList.add("active");

    setTimeout(() => {
        toastVehiculo.classList.remove("active");
    }, 3000); //1s = 1000 milliseconds

    setTimeout(() => {
        progressToast.classList.remove("active");
    }, 3000);

})

btnCancelar.addEventListener("click", () => {
    modalEliminar.classList.remove("active");
})

actualizarVehiculo2.addEventListener("click", () => {
    modal2.classList.add("active");
});

cerrarModal2.addEventListener("click", () => {
    modal2.classList.remove("active");
});

actualizarModal2.addEventListener("click", () => {
    modal2.classList.remove("active");
});



