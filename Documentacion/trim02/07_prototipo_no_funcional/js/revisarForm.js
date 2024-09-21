const btnComentario = document.querySelector(".submit-comentario");
const contentComentario = document.querySelector(".content-comentario");
const submitComentario = document.getElementById("submit-comentario");
const cerrarModal = document.getElementById("cerrar-modal")

btnComentario.addEventListener("click", () => {
    contentComentario.classList.add("active");
} )

submitComentario.addEventListener("click", () => {
    contentComentario.classList.remove("active");
})

cerrarModal.addEventListener("click", () => {
    contentComentario.classList.remove("active");
    contentComentario.classList.add("close");
})