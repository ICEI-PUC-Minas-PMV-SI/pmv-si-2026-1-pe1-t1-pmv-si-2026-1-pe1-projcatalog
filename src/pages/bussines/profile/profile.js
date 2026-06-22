document.addEventListener("DOMContentLoaded", () => {
    
    // Verificar se a empresa está logada
    const loggedInfo = JSON.parse(localStorage.getItem("loggedCompany"));

    if (!loggedInfo || loggedInfo.type !== "company") {
        alert("Acesso negado. Faça login como empresa.");
        window.location.href = "../../../../index.html"; 
        return;
    }

    const emailEmpresaLogada = loggedInfo.data.email;

    const allCompanies = JSON.parse(localStorage.getItem("companies")) || {};
    const company = allCompanies[emailEmpresaLogada] || loggedInfo.data;

    const storeForm = document.querySelector('.store-form');
    
    const inputNome = document.getElementById('inputNome');
    const inputDescricao = document.getElementById('inputDescricao');
    const inputEndereco = document.getElementById('inputEndereco');
    const inputTelefone = document.getElementById('inputTelefone');
    const inputHorario = document.getElementById('inputHorario');
    const inputSite = document.getElementById('inputSite');

    inputNome.value = company.razaoSocial || "";
    inputDescricao.value = company.descricao || "";
    inputEndereco.value = company.endereco || "";
    inputTelefone.value = company.telefone || "";
    inputHorario.value = company.horario || ""; 
    inputSite.value = company.site || "";

    // SALVAR AS ALTERAÇÕES quando o formulário for enviado
    storeForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        company.razaoSocial = inputNome.value.trim();
        company.descricao = inputDescricao.value.trim();
        company.endereco = inputEndereco.value.trim();
        company.telefone = inputTelefone.value.trim();
        company.horario = inputHorario.value.trim();
        company.site = inputSite.value.trim();

        company.whatsapp = inputTelefone.value.replace(/\D/g, "");

        allCompanies[emailEmpresaLogada] = company;
        localStorage.setItem("companies", JSON.stringify(allCompanies));

        loggedInfo.data = company;
        localStorage.setItem("loggedCompany", JSON.stringify(loggedInfo));

        alert('Alterações salvas com sucesso!');

        window.location.href = "../dashboard/dashboard.html";
    });


    const menuButtons = document.querySelectorAll('.sidebar-menu .menu-item');
    if (menuButtons.length >= 3) {
        

        menuButtons[0].addEventListener('click', () => {
            window.location.href = "../dashboard/dashboard.html";
        });
        
        menuButtons[1].addEventListener('click', () => {
            window.location.reload();
        });

        menuButtons[2].addEventListener('click', () => {
            window.location.href = "../products/products.html";
        });
    }
});