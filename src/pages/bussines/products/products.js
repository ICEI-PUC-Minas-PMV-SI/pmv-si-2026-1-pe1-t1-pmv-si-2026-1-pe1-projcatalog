document.addEventListener("DOMContentLoaded", () => {
    
    // 1. VERIFICAR LOGIN DA EMPRESA
    const loggedInfo = JSON.parse(localStorage.getItem("loggedCompany"));

    if (!loggedInfo || loggedInfo.type !== "company") {
        alert("Acesso negado. Faça login como empresa.");
        window.location.href = "../../../../index.html"; 
        return;
    }

    const emailEmpresaLogada = loggedInfo.data.email;

    // 2. BUSCAR DADOS GLOBAIS
    const allCompanies = JSON.parse(localStorage.getItem("companies")) || {};
    let company = allCompanies[emailEmpresaLogada] || loggedInfo.data;

    // Garante que a empresa tenha o array de produtos
    if (!company.products) {
        company.products = [];
    }

    // 3. SELEÇÃO DE ELEMENTOS DO DOM
    const productsList = document.querySelector(".products-list");
    const addButton = document.querySelector(".add-item-btn");
    const cancelButton = document.querySelector(".cancel-btn");
    const formContainer = document.querySelector(".product-form-container");
    const productForm = document.querySelector(".product-form");
    const formTitle = document.querySelector(".form-title");

    const inputName = document.querySelector("#product-name");
    const inputPrice = document.querySelector("#product-price");
    const inputDescription = document.querySelector("#product-description");

    // Variável para saber se estamos criando ou editando
    let editingProductId = null;


    // FUNÇÃO: RENDERIZAR LISTA DE PRODUTOS
    function renderProducts() {
        productsList.innerHTML = ""; // Limpa a lista na tela

        if (company.products.length === 0) {
            productsList.innerHTML = "<p>Você ainda não cadastrou nenhum produto ou serviço.</p>";
            return;
        }

        // Desenha os cards com base no LocalStorage
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
                            <i class="fa-regular fa-place-to-square"></i> EDITAR
                        </button>
                        <button class="delete-btn" onclick="deleteProduct('${product.id}')">
                            <i class="fa-regular fa-trash-can"></i> EXCLUIR
                        </button>
                    </div>
                </div>
            `;
        });
    }


    // FUNÇÃO: SALVAR (CRIAR OU EDITAR)
    productForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = inputName.value.trim();
        // Limpa o preço (tira R$, pontos e troca vírgula por ponto para o JS entender como número)
        let precoRaw = inputPrice.value.replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');
        const preco = parseFloat(precoRaw) || 0;
        const descricao = inputDescription.value.trim();

        if (!nome || !descricao) {
            alert("Nome e Descrição são obrigatórios!");
            return;
        }

        if (editingProductId) {
            // MODO EDIÇÃO: Procura o produto e atualiza
            const index = company.products.findIndex(p => p.id === editingProductId);
            if (index !== -1) {
                company.products[index].nome = nome;
                company.products[index].preco = preco;
                company.products[index].descricao = descricao;
            }
        } else {
            // MODO CRIAÇÃO: Cria um novo objeto
            const novoProduto = {
                id: "prod-" + Date.now(), // Gera um ID único
                nome: nome,
                descricao: descricao,
                preco: preco,
                categoria: company.categoria || "GERAL",
                imagem: "https://placehold.co/400x400", // Imagem padrão
                promocao: false
            };
            company.products.push(novoProduto);
        }

        // Salvar no Banco Global
        allCompanies[emailEmpresaLogada] = company;
        localStorage.setItem("companies", JSON.stringify(allCompanies));

        // Salvar na Sessão Local
        loggedInfo.data = company;
        localStorage.setItem("loggedCompany", JSON.stringify(loggedInfo));

        // Fecha form, reseta e renderiza a lista nova
        closeForm();
        renderProducts();
        alert(editingProductId ? "Produto atualizado!" : "Produto cadastrado!");
    });


    // FUNÇÃO: ABRIR FORMULÁRIO (PARA CRIAR)

    addButton.addEventListener("click", () => {
        formContainer.classList.add("active");
        formTitle.textContent = "NOVO ITEM";
        inputName.value = "";
        inputPrice.value = "";
        inputDescription.value = "";
        editingProductId = null; // Avisa que é criação
    });


    // FUNÇÃO: ABRIR FORMULÁRIO (PARA EDITAR)

    window.editProduct = function(productId) {
        const product = company.products.find(p => p.id === productId);
        if (!product) return;

        formContainer.classList.add("active");
        formTitle.textContent = "EDITAR ITEM";
        
        inputName.value = product.nome;
        inputPrice.value = product.preco.toFixed(2).replace('.', ',');
        inputDescription.value = product.descricao;
        
        editingProductId = product.id; // Avisa o sistema que estamos editando este ID

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // FUNÇÃO: EXCLUIR PRODUTO

    window.deleteProduct = function(productId) {
        const confirmDelete = confirm("Tem certeza que deseja excluir este item?");
        if (!confirmDelete) return;

        // Filtra a lista removendo o item com o ID selecionado
        company.products = company.products.filter(p => p.id !== productId);

        // Salva as alterações
        allCompanies[emailEmpresaLogada] = company;
        localStorage.setItem("companies", JSON.stringify(allCompanies));
        
        loggedInfo.data = company;
        localStorage.setItem("loggedCompany", JSON.stringify(loggedInfo));

        renderProducts();
    };


    // FUNÇÃO: FECHAR FORMULÁRIO

    function closeForm() {
        formContainer.classList.remove("active");
        editingProductId = null;
    }

    cancelButton.addEventListener("click", closeForm);


    // NAVEGAÇÃO LATERAL (SIDEBAR)

    const menuButtons = document.querySelectorAll('.sidebar-menu .menu-item');
    if (menuButtons.length >= 3) {
        menuButtons[0].addEventListener('click', () => window.location.href = "../dashboard/dashboard.html");
        menuButtons[1].addEventListener('click', () => window.location.href = "../profile/profile.html");
        menuButtons[2].addEventListener('click', () => window.location.reload());
    }

    // CARREGA A LISTA INICIAL AO ABRIR A PÁGINA
    renderProducts();
});