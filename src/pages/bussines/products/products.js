document.addEventListener("DOMContentLoaded", () => {
    
    // VERIFICAR LOGIN
    const loggedInfo = JSON.parse(localStorage.getItem("loggedCompany"));

    if (!loggedInfo || loggedInfo.type !== "company") {
        alert("Acesso negado. Faça login como empresa.");
        window.location.href = "../../../../index.html"; 
        return;
    }

    const emailEmpresaLogada = loggedInfo.data.email;

    // BUSCAR DADOS
    const allCompanies = JSON.parse(localStorage.getItem("companies")) || {};
    let company = allCompanies[emailEmpresaLogada] || loggedInfo.data;

    if (!company.products) {
        company.products = [];
    }

    //  SELEÇÃO DE ELEMENTOS
    const productsList = document.querySelector(".products-list");
    const addButton = document.querySelector(".add-item-btn");
    const cancelButton = document.querySelector(".cancel-btn");
    const formContainer = document.querySelector(".product-form-container");
    const productForm = document.querySelector(".product-form");
    const formTitle = document.querySelector(".form-title");

    const inputName = document.querySelector("#product-name");
    const inputPrice = document.querySelector("#product-price");
    const inputDescription = document.querySelector("#product-description");
    const inputImage = document.querySelector("#product-image"); // NOVO CAMPO DE IMAGEM

    let editingProductId = null;

    // FUNÇÃO: RENDERIZAR LISTA

    function renderProducts() {
        productsList.innerHTML = ""; 

        if (company.products.length === 0) {
            productsList.innerHTML = "<p>Você ainda não cadastrou nenhum produto ou serviço.</p>";
            return;
        }

        company.products.forEach(product => {
            productsList.innerHTML += `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-info">
                        <div class="product-title">
                            <h3 class="card-title">${product.nome}</h3>
                            <span class="price-badge card-price">R$ ${parseFloat(product.preco).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <p class="card-description">${product.descricao}</p>
                    </div>
                    <div class="product-actions">
                        <button class="edit-btn" onclick="editProduct('${product.id}')">
                            <i class="fa-regular fa-pen-to-square"></i> EDITAR
                        </button>
                        <button class="delete-btn" onclick="deleteProduct('${product.id}')">
                            <i class="fa-regular fa-trash-can"></i> EXCLUIR
                        </button>
                    </div>
                </div>
            `;
        });
    }

    // FUNÇÃO: SALVAR E ATUALIZAR CATÁLOGO
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = inputName.value.trim();
        let precoRaw = inputPrice.value.replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');
        const preco = parseFloat(precoRaw) || 0;
        const descricao = inputDescription.value.trim();
        
        // Se a pessoa não botar link nenhum, usa o cinza padrão
        const imagem = inputImage.value.trim() || "https://placehold.co/400x400";

        if (!nome || !descricao) {
            alert("Nome e Descrição são obrigatórios!");
            return;
        }

        if (editingProductId) {
            const index = company.products.findIndex(p => p.id === editingProductId);
            if (index !== -1) {
                company.products[index].nome = nome;
                company.products[index].preco = preco;
                company.products[index].descricao = descricao;
                company.products[index].imagem = imagem; // Atualiza a imagem
            }
        } else {
            const novoProduto = {
                id: "prod-" + Date.now(),
                nome: nome,
                descricao: descricao,
                preco: preco,
                categoria: company.categoria || "GERAL",
                imagem: imagem, // Salva o link da imagem
                promocao: true
            };
            company.products.push(novoProduto);
        }

        allCompanies[emailEmpresaLogada] = company;
        localStorage.setItem("companies", JSON.stringify(allCompanies));

        const allPromotions = JSON.parse(localStorage.getItem("promotions")) || {};
        allPromotions[emailEmpresaLogada] = company.products.filter(p => p.promocao === true);
        localStorage.setItem("promotions", JSON.stringify(allPromotions));

        loggedInfo.data = company;
        localStorage.setItem("loggedCompany", JSON.stringify(loggedInfo));

        closeForm();
        renderProducts();
        alert(editingProductId ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!");
    });

    // ABRIR FORM (CRIAR)
    addButton.addEventListener("click", () => {
        formContainer.classList.add("active");
        formTitle.textContent = "NOVO ITEM";
        inputName.value = "";
        inputPrice.value = "";
        inputDescription.value = "";
        inputImage.value = ""; // Limpa a imagem
        editingProductId = null; 
    });

    // ABRIR FORM (EDITAR)
    window.editProduct = function(productId) {
        const product = company.products.find(p => p.id === productId);
        if (!product) return;

        formContainer.classList.add("active");
        formTitle.textContent = "EDITAR ITEM";
        inputName.value = product.nome;
        inputPrice.value = product.preco.toFixed(2).replace('.', ',');
        inputDescription.value = product.descricao;
        
        inputImage.value = product.imagem === "https://placehold.co/400x400" ? "" : product.imagem;
        
        editingProductId = product.id; 

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // EXCLUIR

    window.deleteProduct = function(productId) {
        const confirmDelete = confirm("Tem certeza que deseja excluir este item?");
        if (!confirmDelete) return;

        company.products = company.products.filter(p => p.id !== productId);

        allCompanies[emailEmpresaLogada] = company;
        localStorage.setItem("companies", JSON.stringify(allCompanies));
        
        const allPromotions = JSON.parse(localStorage.getItem("promotions")) || {};
        allPromotions[emailEmpresaLogada] = company.products.filter(p => p.promocao === true);
        localStorage.setItem("promotions", JSON.stringify(allPromotions));

        loggedInfo.data = company;
        localStorage.setItem("loggedCompany", JSON.stringify(loggedInfo));

        renderProducts();
    };


    // FECHAR E NAVEGAÇÃO

    function closeForm() {
        formContainer.classList.remove("active");
        editingProductId = null;
    }

    cancelButton.addEventListener("click", closeForm);

    const menuButtons = document.querySelectorAll('.sidebar-menu .menu-item');
    if (menuButtons.length >= 3) {
        menuButtons[0].addEventListener('click', () => window.location.href = "../dashboard/dashboard.html");
        menuButtons[1].addEventListener('click', () => window.location.href = "../profile/profile.html");
        menuButtons[2].addEventListener('click', () => window.location.reload());
    }

    renderProducts();
});