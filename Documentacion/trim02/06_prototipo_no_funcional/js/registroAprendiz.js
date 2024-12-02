const formulario = document.getElementById('formularioRegistroAprendiz');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = formulario.nombre.value;
  const email = formulario.email.value;
  const password = formulario.contraseña.value; 
  const confirmPassword = formulario.confirmarContraseña;
  const 


  let isValid = true;

  // Validación de nombre (ejemplo)
  if (nombre.trim() === '') {
    alert('Por favor, ingresa tu nombre.');
    isValid = false;
  }

  // Validación de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');   

    isValid = false;
  }

  // Validación de contraseña (mínimo 8 caracteres)
  if (contraseña.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    isValid = false;
  }

  if (isValid) {
    // Si todos los campos son válidos, puedes enviar el formulario
    console.log('Formulario enviado correctamente');
    // Aquí puedes enviar los datos a un servidor
  }
});