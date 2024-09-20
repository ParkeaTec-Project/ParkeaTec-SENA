//Funcion para mostrar el toast de éxito
function showSuccessToast() {
    span1.textContent = "Usuario";
    span2.textContent = "registrado exitosamente";
    toast.classList.add("active");
    progressToast.classList.add("active");
    errorIcon.classList.remove("active-error-icon");
    checkIcon.classList.remove("active-check");

    setTimeout(() => {
        toast.classList.remove("active");
        span1.textContent = "";
        span2.textContent = "";
    }, 3000); //1s = 1000 milliseconds

    setTimeout(() => {
        progressToast.classList.remove("active");
    }, 3000);
}

function showErrorToast() {
    span1.textContent = "Error";
    span2.textContent = "No se puede registrar el usuario";
    toast.classList.add("active-error");
    errorIcon.classList.add("active-error-icon");
    checkIcon.classList.add("active-check");
    progressToast.classList.add("active-error");

    setTimeout(() => {
        span1.textContent = ""; 
        span2.textContent = "";
        toast.classList.remove("active-error"); 
    }, 3000) //1s = 1000 milliseconds

    setTimeout(() => {
        checkIcon.classList.remove("active-error");
        progressToast.classList.remove("active-error");
    }, 3000);
}

//Cerrar el toast al hacer click en el icono de cerrar
closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
    toast.classList.remove("active-error");

    setTimeout(() => {
        progressToast.classList.remove("active");
    }, 300);
})