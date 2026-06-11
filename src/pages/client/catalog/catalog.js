import { BASE_URL } from "../../../scripts/common.js"

const promoCards = document.querySelectorAll(".promo-card");
let currentStore = 0;
let selectedCategory = "TODOS";
let searchTerm = "";
let currentPromoGroup = 0;
let promoInterval = null;
let isAnimatingStore = false;

const PROMOS_PER_PAGE = 4;

const searchInput =
    document.querySelector(".search-input");

const filterButtons =
    document.querySelectorAll(".filter-btn");
promoCards.forEach(card => {
    card.addEventListener("click", () => {

        const promoValue = card.querySelector(".promo-info").textContent;

        if (promoValue) window.location.href = `${BASE_URL()}/src/pages/client/details/details.html`
    });
});

const promotions = getFilteredPromotions();

console.log("Promoções encontradas:", promotions.length);

function attachPromoEvents() {

    document
        .querySelectorAll(".promo-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                window.location.href =
                    `${BASE_URL()}/src/pages/client/details/details.html`;
            });
        });
}

function nextPromoPage() {
    console.log("Página atual:", currentPromoGroup);
    const promotions =
        getFilteredPromotions();

    const totalPages =
        Math.ceil(
            promotions.length / PROMOS_PER_PAGE
        );

    if (totalPages <= 1) return;

    currentPromoGroup++;

    if (currentPromoGroup >= totalPages) {
        currentPromoGroup = 0;
    }



    renderPromotions();
}

function startPromoCarousel() {
    promoInterval =
        setInterval(() => {

            nextPromoPage();

        }, 6000);
}

function restartPromoCarousel() {

    clearInterval(promoInterval);

    startPromoCarousel();
}

function animateStore(direction) {

    if (isAnimatingStore) return;

    isAnimatingStore = true;

    const companies =
        getFilteredCompanies();

    const wrapper =
        document.querySelector(
            ".store-card-wrapper"
        );

    const currentCard =
        wrapper.querySelector(
            ".store-card"
        );

    const nextCard =
        document.createElement("div");

    nextCard.className =
        "store-card";

    const company =
        companies[currentStore];

    nextCard.innerHTML =
        getStoreCardHTML(company);

    wrapper.appendChild(nextCard);

    if (direction === "right") {

        currentCard.classList.add(
            "slide-out-left"
        );

        nextCard.classList.add(
            "slide-in-right"
        );

    } else {

        currentCard.classList.add(
            "slide-out-right"
        );

        nextCard.classList.add(
            "slide-in-left"
        );
    }

    nextCard.addEventListener(
        "animationend",
        () => {

            currentCard.remove();

            isAnimatingStore = false;

        },
        { once: true }
    );
}

function renderPromotions() {

    const promoGrid =
        document.querySelector(".promo-grid");

    const promotions =
        getFilteredPromotions();

    const totalPages =
        Math.ceil(
            promotions.length / PROMOS_PER_PAGE
        );

    if (
        currentPromoGroup >= totalPages &&
        totalPages > 0
    ) {
        currentPromoGroup = 0;
    }

    const start =
        currentPromoGroup * PROMOS_PER_PAGE;

    const currentPromotions =
        promotions.slice(
            start,
            start + PROMOS_PER_PAGE
        );

    promoGrid.classList.add("fade");

    setTimeout(() => {

        promoGrid.innerHTML = "";

        currentPromotions.forEach(
            ({ company, product }) => {

                promoGrid.innerHTML += `
                    <div
                        class="promo-card"
                        data-email="${company.email}"
                        data-product-id="${product.id}"
                    >
                        <div class="promo-image">
                            <img
                                src="${product.imagem}"
                                alt="${product.nome}"
                            />
                        </div>

                        <div class="promo-info">
                            ${product.nome}
                        </div>
                    </div>
                `;
            }
        );

        if (!currentPromotions.length) {

            promoGrid.innerHTML = `
                <p>Nenhuma promoção encontrada.</p>
            `;
        }

        promoGrid.classList.remove("fade");

        attachPromoEvents();

    }, 200);

    renderDots(totalPages);
}

const companies =
    Object.values(
        JSON.parse(localStorage.getItem("companies"))
    );

function renderStore() {

    const companies =
        getFilteredCompanies();

    const storeCard =
        document.querySelector(".store-card");

    if (!companies.length) {

        storeCard.innerHTML =
            "<div class='store-info'>Nenhuma empresa encontrada.</div>";

        return;
    }

    const company =
        companies[currentStore];

    storeCard.innerHTML =
        getStoreCardHTML(company);
}

function getFilteredCompanies() {
    const companies = Object.values(
        JSON.parse(localStorage.getItem("companies")) || {}
    );

    return companies.filter(company => {

        const categoryMatch =
            selectedCategory === "TODOS" ||
            company.categoria === selectedCategory;

        const search = searchTerm.toLowerCase();

        const companyMatch =
            company.razaoSocial.toLowerCase().includes(search);

        const productMatch =
            company.products.some(product =>
                product.nome.toLowerCase().includes(search)
            );

        return categoryMatch && (companyMatch || productMatch || !search);
    });
}

function getFilteredPromotions() {
    const promotions =
        JSON.parse(localStorage.getItem("promotions")) || {};

    const companies =
        JSON.parse(localStorage.getItem("companies")) || {};

    const search = searchTerm.toLowerCase();

    const filteredPromotions = [];

    Object.entries(promotions).forEach(([email, products]) => {

        const company = companies[email];

        if (!company) return;

        const categoryMatch =
            selectedCategory === "TODOS" ||
            company.categoria === selectedCategory;

        if (!categoryMatch) return;

        products.forEach(product => {

            const productMatch =
                product.nome.toLowerCase().includes(search);

            const companyMatch =
                company.razaoSocial.toLowerCase().includes(search);

            if (!search || productMatch || companyMatch) {
                filteredPromotions.push({
                    company,
                    product
                });
            }
        });
    });

    return filteredPromotions;
}

function updateCatalog() {

    currentStore = 0;
    currentPromoGroup = 0;

    renderPromotions();
    renderStore();

    restartPromoCarousel();
}

function renderDots(totalPages) {

    const sliderDots =
        document.getElementById("sliderDots");

    sliderDots.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {

        const dot =
            document.createElement("div");

        dot.classList.add("dot");

        if (i === currentPromoGroup) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentPromoGroup = i;

            renderPromotions();
            restartPromoCarousel();
        });

        sliderDots.appendChild(dot);
    }
}

function getStoreCardHTML(company) {
    return `
        <div class="store-image">
            <img
                src="${company.image}"
                alt="${company.razaoSocial}"
            />
        </div>

        <div class="store-info">
            <h3>${company.razaoSocial}</h3>

            <p>${company.categoria}</p>

            <div class="stars">
                ★★★★★
            </div>
        </div>
    `;
}

searchInput.addEventListener("input", event => {

    searchTerm = event.target.value.trim();

    updateCatalog();
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory =
            button.textContent.trim();

        updateCatalog();
    });
});

document
    .getElementById("prevStore")
    .addEventListener("click", () => {

        if (isAnimatingStore) return;

        const companies =
            getFilteredCompanies();

        if (!companies.length) return;

        currentStore--;

        if (currentStore < 0) {
            currentStore =
                companies.length - 1;
        }

        animateStore("left");
    });

document
    .getElementById("nextStore")
    .addEventListener("click", () => {

        if (isAnimatingStore) return;

        const companies =
            getFilteredCompanies();

        if (!companies.length) return;

        currentStore++;

        if (currentStore >= companies.length) {
            currentStore = 0;
        }

        animateStore("right");
    });


updateCatalog();
