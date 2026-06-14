const company = JSON.parse(
    localStorage.getItem("selectedStore")
);

if (!company) {

    window.location.href = "../home/home.html";
}

const companyName =
    document.getElementById("companyName");

const companyCategory =
    document.getElementById("companyCategory");

const companyDescription =
    document.getElementById("companyDescription");

const companyAddress =
    document.getElementById("companyAddress");

const companyPhone =
    document.getElementById("companyPhone");

const companyWebsite =
    document.getElementById("companyWebsite");

const companyLogo =
    document.getElementById("companyLogo");

const bannerImage =
    document.getElementById("bannerImage");

const productsGrid =
    document.getElementById("productsGrid");

const whatsappBtn =
    document.getElementById("whatsappBtn");

const callBtn =
    document.getElementById("callBtn");



// FUNÇÃO CONTADOR DE CLIQUES

function registrarCliqueContato(emailEmpresa) {
    const companies = JSON.parse(localStorage.getItem("companies")) || {};
    
    if (companies[emailEmpresa]) {
        companies[emailEmpresa].cliquesContato = (companies[emailEmpresa].cliquesContato || 0) + 1;
        localStorage.setItem("companies", JSON.stringify(companies));
    }
}



function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || {};
}

function isFavorite(productId) {

    const favorites =
        getFavorites();

    const companyFavorites =
        favorites[company.email] || [];

    return companyFavorites.some(
        product => product.id === productId
    );
}

function toggleFavorite(product) {

    const favorites =
        getFavorites();

    if (!favorites[company.email]) {
        favorites[company.email] = [];
    }

    const index =
        favorites[company.email]
            .findIndex(
                item => item.id === product.id
            );

    if (index >= 0) {

        favorites[company.email]
            .splice(index, 1);

        if (
            !favorites[company.email].length
        ) {
            delete favorites[company.email];
        }

    } else {

        favorites[company.email]
            .push(product);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    renderProducts();
}

function formatPrice(price) {

    if (price === undefined || price === null)
        return "Consultar";

    return Number(price)
        .toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
}

function renderCompany() {

    companyName.textContent =
        company.razaoSocial || "Empresa";

    companyCategory.textContent =
        company.categoria || "Categoria";

    companyDescription.textContent =
        company.descricao ||
        "Nenhuma descrição cadastrada.";

    companyAddress.textContent =
        company.endereco ||
        "Endereço não informado";

    companyPhone.textContent =
        company.telefone ||
        "Telefone não informado";

    companyWebsite.textContent =
        company.site ||
        "Site não informado";

    companyLogo.src =
        company.image ||
        "https://placehold.co/300x300";

    bannerImage.src =
        company.image ||
        "https://placehold.co/1200x400";

    companyLogo.alt =
        company.razaoSocial;

    bannerImage.alt =
        company.razaoSocial;

    if (company.telefone) {

        const phone =
            company.telefone
                .replace(/\D/g, "");

        whatsappBtn.onclick = () => {
            
            // Registra o clique no banco 
            registrarCliqueContato(company.email); 

            window.open(
                `https://wa.me/55${phone}`,
                "_blank"
            );
        };

        callBtn.onclick = () => {

            // Registra o clique no banco 
            registrarCliqueContato(company.email); 

            window.location.href =
                `tel:${phone}`;
        };
    }
}

function renderProducts() {

    productsGrid.innerHTML = "";

    const products =
        company.products || [];

    if (!products.length) {

        productsGrid.innerHTML = `
            <div class="empty-products">
                Nenhum produto cadastrado.
            </div>
        `;

        return;
    }

    products.forEach(product => {

        const favorite =
            isFavorite(product.id);

        productsGrid.innerHTML += `
            <article class="product-card">

                <div class="product-image">

                    <img
                        src="${product.imagem}"
                        alt="${product.nome}"
                    />

                </div>

                <div class="product-top">

                    <h3>
                        ${product.nome}
                    </h3>

                    <span>
                        ${formatPrice(product.preco)}
                    </span>

                </div>

                <p>
                    ${product.descricao || "Sem descrição."}
                </p>

                <button
                    class="favorite-btn"
                    data-product-id="${product.id}"
                >
                    ${favorite
                ? "REMOVER DOS FAVORITOS"
                : "ADICIONAR AOS FAVORITOS"
            }
                </button>

            </article>
        `;
    });

    document
        .querySelectorAll(
            ".favorite-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;

                    const product =
                        products.find(
                            item =>
                                item.id ===
                                productId
                        );

                    if (product) {
                        toggleFavorite(product);
                    }
                }
            );
        });
}

renderCompany();
renderProducts();