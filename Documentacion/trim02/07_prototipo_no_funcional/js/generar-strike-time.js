window.onload = function() {
    //Obtener la hora actual del sistema
    const now = new Date();

    //Extraer la hora
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    //Asignar la hora al input
    document.getElementById("hora").value = `${hours}:${minutes}`;
}