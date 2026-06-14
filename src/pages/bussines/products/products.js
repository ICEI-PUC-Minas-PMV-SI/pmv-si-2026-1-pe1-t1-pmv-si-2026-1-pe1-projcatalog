var loggedCompanyTexto = localStorage.getItem("loggedCompany");

if (!loggedCompanyTexto) {
    window.location.href = "../../../../index.html";
}

var loggedCompany = JSON.parse(loggedCompanyTexto);

var todasEmpresasTexto = localStorage.getItem("companies");
var todasEmpresas = JSON.parse(todasEmpresasTexto);

var empresa = todasEmpresas[loggedCompany.data.email];

if (!empresa.products) {
    empresa.products = [];
}

var addButton = document.querySelector(".add-item-btn");
var cancelButton = document.querySelector(".cancel-btn");
var formContainer = document.querySelector(".product-form-container");
var productForm = document.querySelector(".product-form");

var formTitle = document.querySelector(".form-title");

var inputId = document.querySelector("#product-id");
var inputName = document.querySelector("#product-name");
var inputPrice = document.querySelector("#product-price");
var inputDescription = document.querySelector("#product-description");

var productsList = document.querySelector("#products-list");

function formatarPreco(numero) {

    if (isNaN(numero)) {
        numero = 0;
    }

    var textoComPonto = numero.toFixed(2);

    var textoComVirgula = textoComPonto.replace(".", ",");

    return "R$ " + textoComVirgula;
}

function converterPrecoParaNumero(texto) {

    var textoLimpo = texto.replace("R$", "");
    textoLimpo = textoLimpo.replace(/\s/g, "");

    textoLimpo = textoLimpo.replace(".", "");

    textoLimpo = textoLimpo.replace(",", ".");

    var numero = parseFloat(textoLimpo);

    if (isNaN(numero)) {
        numero = 0;
    }

    return numero;
}

function salvarEmpresa() {

    todasEmpresas[empresa.email] = empresa;

    localStorage.setItem("companies", JSON.stringify(todasEmpresas));

    var novoLoggedCompany = {
        type: "company",
        data: empresa
    };

    localStorage.setItem("loggedCompany", JSON.stringify(novoLoggedCompany));
}

function gerarNovoId() {

    var numero = empresa.products.length + 1;
    var novoId = "produto-" + numero;

    var jaExiste = false;

    for (var i = 0; i < empresa.products.length; i++) {
        if (empresa.products[i].id === novoId) {
            jaExiste = true;
        }
    }

    while (jaExiste) {

        numero = numero + 1;
        novoId = "produto-" + numero;

        jaExiste = false;

        for (var i = 0; i < empresa.products.length; i++) {
            if (empresa.products[i].id === novoId) {
                jaExiste = true;
            }
        }
    }

    return novoId;
}

function desenharLista() {

    if (empresa.products.length === 0) {

        productsList.innerHTML =
            "<div class='empty-state'>Nenhum produto ou serviço cadastrado ainda.</div>";

        return;
    }

    var html = "";

    for (var i = 0; i < empresa.products.length; i++) {

        var produto = empresa.products[i];

        var precoFormatado = formatarPreco(produto.preco);

        html += "<div class='product-card'>";

        html += "  <div class='product-info'>";
        html += "    <div class='product-title'>";
        html += "      <h3 class='card-title'>" + produto.nome + "</h3>";
        html += "      <span class='price-badge card-price'>" + precoFormatado + "</span>";
        html += "    </div>";
        html += "    <p class='card-description'>" + produto.descricao + "</p>";
        html += "  </div>";

        html += "  <div class='product-actions'>";
        html += "    <button class='edit-btn' data-id='" + produto.id + "'>";
        html += "      <i class='fa-regular fa-pen-to-square'></i> EDITAR";
        html += "    </button>";
        html += "    <button class='delete-btn' data-id='" + produto.id + "'>";
        html += "      <i class='fa-regular fa-trash-can'></i> EXCLUIR";
        html += "    </button>";
        html += "  </div>";

        html += "</div>";
    }

    productsList.innerHTML = html;

    ligarBotoesEditarExcluir();
}

function limparFormulario() {

    inputId.value = "";
    inputName.value = "";
    inputPrice.value = "";
    inputDescription.value = "";

    formTitle.textContent = "NOVO ITEM";
}


function ligarBotoesEditarExcluir() {

    var botoesEditar = document.querySelectorAll(".edit-btn");
    var botoesExcluir = document.querySelectorAll(".delete-btn");

    // EDITAR
    for (var i = 0; i < botoesEditar.length; i++) {

        botoesEditar[i].addEventListener("click", function (evento) {

            var idClicado = evento.currentTarget.getAttribute("data-id");

            var produtoEncontrado = null;

            for (var j = 0; j < empresa.products.length; j++) {
                if (empresa.products[j].id === idClicado) {
                    produtoEncontrado = empresa.products[j];
                }
            }

            if (produtoEncontrado === null) {
                return;
            }

            formContainer.classList.add("active");

            formTitle.textContent = "EDITAR ITEM";

            inputId.value = produtoEncontrado.id;
            inputName.value = produtoEncontrado.nome;
            inputPrice.value = formatarPreco(produtoEncontrado.preco);
            inputDescription.value = produtoEncontrado.descricao;

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    for (var i = 0; i < botoesExcluir.length; i++) {

        botoesExcluir[i].addEventListener("click", function (evento) {

            var idClicado = evento.currentTarget.getAttribute("data-id");

            var confirmou = window.confirm("Tem certeza que deseja excluir este item?");

            if (!confirmou) {
                return;
            }

            var novaLista = [];

            for (var j = 0; j < empresa.products.length; j++) {
                if (empresa.products[j].id !== idClicado) {
                    novaLista.push(empresa.products[j]);
                }
            }

            empresa.products = novaLista;

            salvarEmpresa();

            desenharLista();
        });
    }
}

addButton.addEventListener("click", function () {

    formContainer.classList.add("active");

    limparFormulario();
});

cancelButton.addEventListener("click", function () {

    formContainer.classList.remove("active");

    limparFormulario();
});

inputPrice.addEventListener("input", function () {

    var apenasNumeros = inputPrice.value.replace(/\D/g, "");

    if (apenasNumeros === "") {
        inputPrice.value = "";
        return;
    }

    var valorEmReais = Number(apenasNumeros) / 100;

    inputPrice.value = formatarPreco(valorEmReais);
});

productForm.addEventListener("submit", function (evento) {

    evento.preventDefault();

    var nome = inputName.value.trim();
    var descricao = inputDescription.value.trim();
    var preco = converterPrecoParaNumero(inputPrice.value);

    if (nome === "" || descricao === "" || preco <= 0) {
        window.alert("Preencha o nome, a descrição e um preço válido.");
        return;
    }

    if (inputId.value !== "") {

        for (var i = 0; i < empresa.products.length; i++) {

            if (empresa.products[i].id === inputId.value) {

                empresa.products[i].nome = nome;
                empresa.products[i].descricao = descricao;
                empresa.products[i].preco = preco;
            }
        }

    } else {

        var novoProduto = {
            id: gerarNovoId(),
            nome: nome,
            descricao: descricao,
            preco: preco,
            categoria: empresa.categoria,
            imagem: empresa.image,
            promocao: false
        };

        empresa.products.push(novoProduto);
    }

    salvarEmpresa();

    formContainer.classList.remove("active");

    limparFormulario();

    desenharLista();
});


desenharLista();