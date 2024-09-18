const buttton = document.getElementById('btn-booking'),
      toast = document.querySelector('.toast'),
      checkIcon = document.querySelector('.check'),
      errorIcon = document.querySelector('.error-icon'),
      closeIcon = document.querySelector('.close'),
      progressToast = document.querySelector('.progressToast'),
      span1 = document.querySelector('.text-1'),
      span2 = document.querySelector('.text-2');


const form = document.getElementById('form')
const inputs = document.querySelectorAll(".input");
const select = document.getElementById("options");
const inputPuesto = document.getElementById('puesto-asignado');


form.addEventListener("submit", (event) => {
    event.preventDefault();

    let formIsValid = true;

    inputs.forEach(input => {
        //Hacer una validacion al desenforcar el input
        input.addEventListener("blur", () => {
            validateInput(input, select);
        });

        //Validar cada campo al enviar el formulario
        if (!validateInput(input, select)) {
            formIsValid = false;
        }            
    });

    if(formIsValid) {
        //Mostrar el toast de éxito
        showSuccessToast();
    } else {
        //Mostrar el toast de error
        showErrorToast();
    }
});

inputs.forEach(input => {
    input.addEventListener("blur", () => {

        validateInput(input);

    }) 
})


//Funcion para validar un input
function validateInput(input) {
    if (input.value.trim() === "") {
        console.log("El campo no puede estar vacio");
        input.classList.remove("active-input");
        return false;
    } else {
        console.log("Valido");
        input.classList.add("active-input");
        return true;
    }
}

//Funcion para mostrar el toast de éxito
function showSuccessToast() {
    span1.textContent = "Reserva";
    span2.textContent = "registrada exitosamente";
    toast.classList.add("active");
    progressToast.classList.add("active");
    errorIcon.classList.remove("active-error-icon");
    checkIcon.classList.remove('active-check');


    setTimeout(() => {
        toast.classList.remove("active");
        span1.textContent = "";
        span2.textContent = "";
    }, 3000); //1s = 1000 milliseconds

    setTimeout(() => {
        progressToast.classList.remove("active");
    }, 3000);
}


// const textoOriginal = span1.textContent;
// const textoOriginal2 = span2.textContent;

function showErrorToast() {
    // alert("datos vacios")
    span1.textContent = "Error";
    span2.textContent = "Reserva incorrecta";
    toast.classList.add("active-error");
    errorIcon.classList.add("active-error-icon");
    checkIcon.classList.add('active-check');
    progressToast.classList.add("active-error");

    setTimeout(() => {
        // span1.textContent = textoOriginal;
        // span2.textContent = textoOriginal2;
        span1.textContent = "";
        span2.textContent = "";
        toast.classList.remove("active-error");
        
    }, 3000); //1s = 1000 milliseconds

    setTimeout(() => {
        checkIcon.classList.remove("active-error");
        progressToast.classList.remove("active-error");
    }, 3000);
}


//Cerrar el toast al hacer clic en el icono de cerrar
closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
    toast.classList.remove("active-error");
  
    setTimeout(() => {
        progressToast.classList.remove("active");
    }, 300);
})