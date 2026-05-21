import { BASE_URL } from "../../../scripts/common.js"

const promoCards = document.querySelectorAll(".promo-card");

promoCards.forEach(card => {
    card.addEventListener("click", () => {

        const promoValue = card.querySelector(".promo-info").textContent;

        if (promoValue) window.location.href = `${BASE_URL()}/src/pages/client/details/details.html`
    });
});