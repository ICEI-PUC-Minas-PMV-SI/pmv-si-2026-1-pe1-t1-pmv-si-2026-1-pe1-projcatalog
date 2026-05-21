import { updateActiveMenu, navigate } from "./common.js"

const menuLinks = document.querySelectorAll(".menu a");

const menu = {
    "Favoritos": "src/pages/client/favorites/favorites.html",
    "Início": "src/pages/client/catalog/catalog.html"
}

menuLinks.forEach(link => {
    link.addEventListener("click", navigate(link.textContent, menu));

    updateActiveMenu(menuLinks, menu)
});
