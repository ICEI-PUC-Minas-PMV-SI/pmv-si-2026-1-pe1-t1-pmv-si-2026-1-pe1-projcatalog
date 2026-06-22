const favoritesGrid =
    document.getElementById(
        "favoritesGrid"
    );

const favoritesCount =
    document.getElementById(
        "favoritesCount"
    );

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || {};
}

function getCompanies() {

    return JSON.parse(
        localStorage.getItem("companies")
    ) || {};
}

function renderStars(rating) {

    const fullStars =
        Math.round(rating);

    let html = "";

    for (let i = 1; i <= 5; i++) {

        html += i <= fullStars
            ? `<i class="fa-solid fa-star"></i>`
            : `<i class="fa-regular fa-star"></i>`;
    }

    return html;
}

function removeFavorite(
    companyEmail,
    productId
) {

    const favorites =
        getFavorites();

    favorites[companyEmail] =
        favorites[companyEmail]
            .filter(
                product =>
                    product.id !== productId
            );

    if (
        !favorites[companyEmail].length
    ) {
        delete favorites[companyEmail];
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    renderFavorites();
}

function renderFavorites() {

    const favorites =
        getFavorites();

    const companies =
        getCompanies();

    favoritesGrid.innerHTML = "";

    let totalFavorites = 0;

    Object.entries(favorites)
        .forEach(
            ([email, products]) => {

                const company =
                    companies[email];

                if (!company) return;

                products.forEach(
                    product => {

                        totalFavorites++;

                        const reviews =
                            company.avaliacoes
                                ? Object.values(
                                    company.avaliacoes
                                )
                                : [];

                        const rating =
                            reviews.length
                                ? (
                                    reviews.reduce(
                                        (
                                            total,
                                            review
                                        ) =>
                                            total +
                                            review.nota,
                                        0
                                    ) /
                                    reviews.length
                                )
                                : 0;

                        favoritesGrid.innerHTML += `
                            <article class="card">

                                <div class="card-image">

                                    <span class="tag">
                                        ${company.categoria}
                                    </span>

                                    <button
                                        class="remove-btn"
                                        data-company="${email}"
                                        data-product="${product.id}"
                                    >
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>

                                    <img
                                        src="${product.imagem}"
                                        alt="${product.nome}"
                                    />

                                </div>

                                <div class="card-content">

                                    <h3>
                                        ${product.nome}
                                    </h3>

                                    <div class="rating">

                                        <div class="stars">
                                            ${renderStars(rating)}
                                        </div>

                                        <span>
                                            ${rating.toFixed(1)}
                                            (${reviews.length})
                                        </span>

                                    </div>

                                    <div class="address">

                                        <i class="fa-solid fa-building"></i>

                                        ${company.razaoSocial}

                                    </div>

                                    <div class="card-footer">

                                        <span>
                                            R$ ${Number(
                            product.preco
                        ).toFixed(2)}
                                        </span>

                                        <button
                                            class="details-btn"
                                            data-company="${email}"
                                        >
                                            VER DETALHES
                                        </button>

                                    </div>

                                </div>

                            </article>
                        `;
                    }
                );
            }
        );

    favoritesCount.textContent =
        `${totalFavorites} produto${totalFavorites !== 1 ? "s" : ""} salvo${totalFavorites !== 1 ? "s" : ""}`;

    if (!totalFavorites) {

        favoritesGrid.innerHTML = `
            <div class="empty-state">
                <h2>Nenhum favorito encontrado</h2>
                <p>
                    Adicione produtos aos favoritos para vê-los aqui.
                </p>
            </div>
        `;

        return;
    }

    document
        .querySelectorAll(".remove-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFavorite(
                        button.dataset.company,
                        button.dataset.product
                    );
                }
            );
        });

    document
        .querySelectorAll(".details-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const company =
                        companies[
                        button.dataset.company
                        ];

                    localStorage.setItem(
                        "selectedStore",
                        JSON.stringify(company)
                    );

                    window.location.href =
                        "../details/details.html";
                }
            );
        });
}

renderFavorites();