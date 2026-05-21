const promoCards = document.querySelectorAll(".promo-card");

promoCards.forEach(card => {
    card.addEventListener("click", () => {

        const promoValue = card.querySelector(".promo-info").textContent;

        console.log(promoValue);
        if (promoValue) window.location.href = "/src/pages/client/details/details.html"
    });
});