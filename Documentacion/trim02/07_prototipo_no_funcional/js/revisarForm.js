const btnComentario = document.querySelector(".submit-comentario");
const contentComentario = document.querySelector(".content-comentario");
const submitComentario = document.getElementById("submit-comentario");

btnComentario.addEventListener("click", () => {
    contentComentario.classList.add("active");
} )

submitComentario.addEventListener("click", () => {
    contentComentario.classList.remove("active");
})