const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir-menu");
const cerrar = document.querySelector("#cerrar-menu");

//Seleccionar todos los submenus 
const menuItems = document.querySelectorAll(".menu-horizontal > li");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})



menuItems.forEach(item => {
    item.addEventListener("click", function () {
        const subMenu = this.querySelector(".menu-vertical");

        if(subMenu) {
            subMenu.classList.toggle("show");

            menuItems.forEach(otherItem => {
                const otherSubmenu = otherItem.querySelector(".menu-vertical");
                if(otherSubmenu && otherSubmenu !== subMenu) {
                    otherSubmenu.classList.remove("show");
                }
            });
        }
    });
});