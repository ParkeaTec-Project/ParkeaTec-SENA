const vehiculos = document.querySelectorAll('.tipo-vehiculos');
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