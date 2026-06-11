import { updateActiveMenu, navigate, BASE_URL } from "./common.js"

const menuLinks = document.querySelectorAll(".menu a");
const userContainer = document.querySelector(".user-container");

const menu = {
    "Favoritos": "src/pages/client/favorites/favorites.html",
    "Início": "src/pages/client/catalog/catalog.html"
}

menuLinks.forEach(link => {
    link.addEventListener("click", navigate(link.textContent, menu));

    updateActiveMenu(menuLinks, menu)
});

function getLoggedUser() {
    return JSON.parse(
        localStorage.getItem("loggedUser")
    );
}

function fillLoggedUserName() {
    const userNameElement =
        document.getElementById("logged-user-name");

    const loggedUser = getLoggedUser();

    if (!loggedUser || !userNameElement) return;

    if (loggedUser.type === "client") {
        userNameElement.textContent =
            loggedUser.data.nome;
    }

    if (loggedUser.type === "company") {
        userNameElement.textContent =
            loggedUser.data.razaoSocial;
    }
}

userContainer?.addEventListener("click", () => {
    localStorage.setItem("loggedUser", JSON.stringify(undefined));

    window.location.href = `${BASE_URL()}/`;
});

fillLoggedUserName();