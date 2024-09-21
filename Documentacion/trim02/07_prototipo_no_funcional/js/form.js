const Form1 = document.querySelector('.Form1');
const Form2 = document.querySelector('.Form2');
const Form3 = document.querySelector('.Form3');
const Form4 = document.querySelector('.Form4');
const Form5 = document.querySelector('.Form5');
const Form6 = document.querySelector('.Form6');

const Next1 = document.getElementById('Next1');
const Next2 = document.getElementById('Next2');
const Next3 = document.getElementById('Next3');
const Next4 = document.getElementById('Next4');
const Next5 = document.getElementById('Next5');

const Back1 = document.getElementById('Back1');
const Back2 = document.getElementById('Back2');
const Back3 = document.getElementById('Back3');
const Back4 = document.getElementById('Back4');
const Back5 = document.getElementById('Back5');

const progress = document.querySelector('.progress');

const step1 = document.querySelector('.step-col-1');
const step2 = document.querySelector('.step-col-2');
const step3 = document.querySelector('.step-col-3');
const step4 = document.querySelector('.step-col-4');
const step5 = document.querySelector('.step-col-5');
const step6 = document.querySelector('.step-col-6');

const files = document.querySelectorAll('input[type="file"]');
const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');
const select = document.getElementById("options")

const buttton = document.getElementById('btn-booking'),
      toast = document.querySelector('.toast'),
      checkIcon = document.querySelector('.check'),
      errorIcon = document.querySelector('.error-icon'),
      closeIcon = document.querySelector('.close'),
      progressToast = document.querySelector('.progressToast'),
      span1 = document.querySelector('.text-1'),
      span2 = document.querySelector('.text-2');


Next1.addEventListener("click", () => {
    Form1.classList.add("active-negative");
    Form2.classList.add("active-0");

    step1.classList.add("active-negative");
    step2.classList.add("active-0");

    progress.classList.add("active-form2");
    Form1.classList.remove("active-0");
    Form2.classList.remove("active-positive");

    step1.classList.remove("active-0");
    step2.classList.remove("active-positive");

    progress.classList.remove("active-form1");
});

Back1.addEventListener("click", () => {
    Form1.classList.remove("active-negative");
    Form2.classList.remove("active-0");

    step1.classList.remove("active-negative");
    step2.classList.remove("active-0");

    progress.classList.remove("active-form2");
    Form1.classList.add("active-0");
    Form2.classList.add("active-positive");

    step1.classList.add("active-0");
    step2.classList.add("active-positive");

    progress.classList.add("active-form1");
});

Next2.addEventListener("click", () => {
    Form2.classList.add("active-negative");
    Form3.classList.add("active-0")

    step2.classList.add("active-negative");
    step3.classList.add("active-0");

    progress.classList.add("active-form3");

    Form2.classList.remove("active-0");
    Form3.classList.remove("active-positive");

    step2.classList.remove("active-0");
    step3.classList.remove("active-positive");

    progress.classList.remove("active-form2");
});

Back2.addEventListener("click", () => {
    Form2.classList.remove("active-negative");
    Form3.classList.remove("active-0");

    step2.classList.remove("active-negative");
    step3.classList.remove("active-0");

    progress.classList.remove("active-form3");

    Form2.classList.add("active-0");
    Form3.classList.add("active-positive");

    step2.classList.add("active-0");
    step3.classList.add("active-positive");

    progress.classList.add("active-form2");
});

Next3.addEventListener("click", () => {
    Form3.classList.remove("active-0");
    Form4.classList.remove("active-positive");

    step3.classList.remove("active-0");
    step4.classList.remove("active-positive");

    progress.classList.remove("active-form3");

    Form3.classList.add("active-negative");
    Form4.classList.add("active-0");

    step3.classList.add("active-negative");
    step4.classList.add("active-0");

    progress.classList.add("active-form4");
});

Back3.addEventListener("click", () => {
    Form3.classList.remove("active-negative");
    Form4.classList.remove("active-0");

    step3.classList.remove("active-negative");
    step4.classList.remove("active-0");

    progress.classList.remove("active-form4");

    Form3.classList.add("active-0");
    Form4.classList.add("active-positive");

    step3.classList.add("active-0");
    step4.classList.add("active-positive");

    progress.classList.add("active-form3");
});

Next4.addEventListener("click", () => {
    Form4.classList.remove("active-0");
    Form5.classList.remove("active-positive");

    step4.classList.remove("active-0");
    step5.classList.remove("active-positive");

    progress.classList.remove("active-form4");

    Form4.classList.add("active-negative");
    Form5.classList.add("active-0");

    step4.classList.add("active-negative");
    step5.classList.add("active-0");

    progress.classList.add("active-form5");

})

Back4.addEventListener("click", () => {
    Form4.classList.remove("active-negative");
    Form5.classList.remove("active-0");

    step4.classList.remove("active-negative");
    step5.classList.remove("active-0");

    progress.classList.remove("active-form5");

    Form4.classList.add("active-0");
    Form5.classList.add("active-positive");

    step4.classList.add("active-0");
    step5.classList.add("active-positive");

    progress.classList.add("active-form4");
})

Next5.addEventListener("click", () => {
    Form5.classList.remove("active-0");
    Form6.classList.remove("active-positive");

    step5.classList.remove("active-0");
    step6.classList.remove("active-positive");

    progress.classList.remove("active-form5");

    Form5.classList.add("active-negative");
    Form6.classList.add("active-0");

    step5.classList.add("active-negative");
    step6.classList.add("active-0");

    progress.classList.add("active-form6");
});

Back5.addEventListener("click", () => {
    Form5.classList.remove("active-negative");
    Form6.classList.remove("active-0");

    step5.classList.remove("active-negative");
    step6.classList.remove("active-0");

    progress.classList.remove("active-form6");

    Form5.classList.add("active-0");
    Form6.classList.add("active-positive");

    step5.classList.add("active-0");
    step6.classList.add("active-positive");

    progress.classList.add("active-form5");
});


Back5.addEventListener("click", () => {
    Form5.classList.remove("active-negative");
    Form6.classList.remove("active-0");

    step5.classList.remove("active-negative");
    step6.classList.remove("active-0");

    progress.classList.remove("active-form6");

    Form5.classList.add("active-0");
    Form6.classList.add("active-positive");

    step5.classList.add("active-0");
    step6.classList.add("active-positive");

    progress.classList.add("active-form5");
})


files.forEach(file => {
    file.addEventListener("change", (e) => {
        const parent = file.closest(".content-img");
        const img = parent.querySelector(".content-img img");
        const iconFile = parent.querySelector(".icon-file");

        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            }
            img.style.display = "block";
            iconFile.style.display = "none";
    
            reader.readAsDataURL(e.target.files[0]);
        } else {
            img.style.display = "none";
            iconFile.style.display = "inline";
        }
    });
});


// Seleccionar el boton de envio
const submitBtn = document.getElementById("submit");

// Escuchar el evento de clic en el boton de envio
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Seleccionar todos los formularios
    const forms = document.querySelectorAll("form");

    // Recorrer todos los formularios
    forms.forEach(form => {
        const inputs = form.querySelectorAll("input:not([disabled]), select:not([disabled])");

        //Validar cada input y select
        inputs.forEach(input => {
            input.addEventListener("blur", () => {
                validateInput(input, select, textAreas);
            });

            if (!validateInput(input, select, textAreas)) {
                formIsValid = false;
            }
        });
    });

    if(formIsValid) {
        showSuccessToast();
    } else {
        showErrorToast();
    }
});

inputs.forEach(input => {
    input.addEventListener("blur", () => {
        validateInput(input);
    })
})

textAreas.forEach(textAreas => {
    textAreas.addEventListener("blur", () => {
        validateInput(textAreas);
    })
})

// Funciona para validar input 
function validateInput(input) {
    if (input.value.trim() === "") {
        input.classList.remove("active-input");
        return false;
    } else {
        input.classList.add("active-input");
        return true;
    }
}

//Funcion para mostrar el toast de éxito
function showSuccessToast() {
    span1.textContent = "Formulario";
    span2.textContent = "Enviado exitosamente";
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
    span2.textContent = "Enviado incorrectamente";
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