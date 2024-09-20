
const parkingContainerCar = document.getElementById("parking-container-car");
const parkingContainerMotorBike = document.getElementById("parking-container-motorbike");
const parkingContainerBicycle = document.getElementById("parking-container-bicycle");

const parkingContainerCarWidth = parkingContainerCar.clientWidth;
console.log(parkingContainerCarWidth);
const parkingContainerCarHeight = parkingContainerCar.clientHeight;
console.log(parkingContainerCarHeight);
const parkingContainerBikerWidth = parkingContainerMotorBike.clientWidth;
console.log(parkingContainerBikerWidth);
const parkingContainerBikerHeight = parkingContainerMotorBike.clientHeight;
console.log(parkingContainerBikerHeight);
const parkingContainerBicyleWidth = parkingContainerBicycle.clientWidth;
console.log(parkingContainerBicyleWidth);
const parkingContainerBicyleHeight = parkingContainerBicycle.clientHeight;
console.log(parkingContainerBicyleHeight);

const spotSize = 50; //Tamaño fijo de cada casilla


function generarEspacios() {
    //Calcular el numero de casillas por fila y columna;
    const spotsPerRowCar = Math.floor(parkingContainerCarWidth / (spotSize + 4));
    const spotsPerColumnCar = Math.floor(parkingContainerCarHeight / (spotSize + 4));

    const spotsPerRowBiker = Math.floor(parkingContainerBikerWidth / (spotSize + 4));
    const spotsPerColumnBiker = Math.floor(parkingContainerBikerHeight / (spotSize + 4));

    const spotsPerRowBicyle = Math.floor(parkingContainerBicyleWidth / (spotSize + 4));
    const spotsPerColumnBicycle = Math.floor(parkingContainerBicyleHeight / (spotSize + 4));

    //Limpiar casillas existentes antes de agregar nuevas
    parkingContainerCar.innerHTML = '';
    parkingContainerMotorBike.innerHTML = '';
    parkingContainerBicycle.innerHTML = '';

    let parkingSpotsCar = ''
    let parkingSpotsBiker = ''
    let parkingSpotsBicycle = ''

    //Crear las casillas para carro
    for (let i = 0; i < spotsPerRowCar * spotsPerColumnCar; i++) {
        const colores = ['green', 'red'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        const spot = document.createElement('div');
        spot.classList.add("parking-spot");
        spot.classList.add(colorAleatorio);
        spot.innerHTML = `
        <a href="realizar-reserva.html">
            <i class="fas fa-car icon-car"></i>
        </a>
        
        `;

        parkingSpotsCar += spot.outerHTML;
    }

    parkingContainerCar.innerHTML = parkingSpotsCar;

    //Crear las casillas para moto
    for (let i = 0; i < spotsPerRowBiker * spotsPerColumnBiker; i++) {
        const colores = ['green', 'red'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        const spot = document.createElement('div');
        spot.classList.add("parking-spot");
        spot.classList.add(colorAleatorio);
        spot.innerHTML = `
        <a href="realizar-reserva.html">
            <i class="fa-solid fa-motorcycle icon-car"></i>
        </a>
        `;

        parkingSpotsBiker += spot.outerHTML;
    }

    parkingContainerMotorBike.innerHTML = parkingSpotsBiker;

    //Crear las casillas bicicleta
    for (let i = 0; i < spotsPerRowBicyle * spotsPerColumnBicycle; i++) {
        const colores = ['green', 'red'];
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        const spot = document.createElement('div');
        spot.classList.add("parking-spot");
        spot.classList.add(colorAleatorio);
        spot.innerHTML = `
        <a href="realizar-reserva.html">
            <i class="fa-solid fa-bicycle icon-car"></i>
        </a>
        `;

        parkingSpotsBicycle += spot.outerHTML;
    }

    parkingContainerBicycle.innerHTML = parkingSpotsBicycle;
}

// window.onload = function() {
//     setTimeout(generarEspacios, 100);  // Retrasa la ejecución del script 100ms
// };

generarEspacios();



//Añadir el event listener para el evento resize 
//window.addEventListener('resize', generarEspacios);


document.addEventListener('DOMContentLoaded', function(){
    const añadir = document.getElementById('añadir');
    const espaciomodal = document.getElementById('espaciomodal');
    const closemodal = document.getElementById('closemodal');
    const form = document.getElementById('form');

    añadir.addEventListener('click', function () {

        form.querySelector('#area').value = '';
        form.querySelector('#espacio').value = '';
        form.querySelector('#option').value = '';
        form.querySelector('#establecer').value = '';


        espaciomodal.style.display = 'block';
    });

    closemodal.addEventListener('click', function () {
        // Ocultar el modal al hacer clic en el botón de cerrar
        espaciomodal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === strikeModal) {
            // Ocultar el modal si se hace clic fuera del contenido del modal
            espaciomodal.style.display = 'none';
        }
    });


})