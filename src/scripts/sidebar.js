import { updateActiveMenu, navigate } from "./common.js"

const menuButtons = document.querySelectorAll(".menu-item");

const menu = {
    "Minha Loja": "/src/pages/bussines/profile/profile.html",
    "Dashboard": "/src/pages/bussines/dashboard/dashboard.html",
    "Produtos/Serviços": "/src/pages/bussines/profile/profile.html"
}

menuButtons.forEach(link => {
    link.addEventListener("click", navigate(link.querySelector('p').textContent, menu));

    updateActiveMenu(menuButtons, menu)
});
