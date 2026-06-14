document.addEventListener("DOMContentLoaded", () => {
    
    // Pega quem está logado
    const loggedInfo = JSON.parse(localStorage.getItem("loggedCompany"));

    // Se não houver empresa logada, redireciona para a página inicial
    if (!loggedInfo || loggedInfo.type !== "company") {
        alert("Acesso negado. Faça login como empresa.");
        window.location.href = "../../../../index.html"; 
        return;
    }


    const emailEmpresaLogada = loggedInfo.data.email;
    const allCompanies = JSON.parse(localStorage.getItem("companies")) || {};
    

    const company = allCompanies[emailEmpresaLogada] || loggedInfo.data;

    const produtosAtivos = company.products ? company.products.length : 0;
    const visitasMes = company.visitasMes || 0; 
    const cliquesContato = company.cliquesContato || 0; 

    // Cálculo da média
    let somaNotas = 0;
    let totalAvaliacoes = 0;
    
    if (company.avaliacoes) {
        for (const emailUsuario in company.avaliacoes) {
            somaNotas += company.avaliacoes[emailUsuario].nota;
            totalAvaliacoes++;
        }
    }
    const avaliacaoMedia = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : 0;

    const statElements = document.querySelectorAll('.stat-card h2');

    if (statElements.length >= 4) {
        statElements[0].setAttribute('data-target', visitasMes);
        statElements[1].setAttribute('data-target', cliquesContato);
        statElements[2].setAttribute('data-target', avaliacaoMedia);
        statElements[3].setAttribute('data-target', produtosAtivos);
    }

    const counters = document.querySelectorAll("[data-target]");

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        let current = 0;
        
        const increment = target > 0 ? target / 40 : 0;

        const updateCounter = () => {
            if (target === 0) {
                counter.innerText = "0";
                return; 
            }

            current += increment;

            if (current >= target) {
                if (target % 1 !== 0) {
                    counter.innerText = target.toFixed(1);
                } else {
                    counter.innerText = target;
                }
                return;
            }

            if (target % 1 !== 0) {
                counter.innerText = current.toFixed(1);
            } else {
                counter.innerText = Math.floor(current);
            }

            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    });

    // Botões do Painel
    const actionButtons = document.querySelectorAll('.action-card button');

    if (actionButtons.length >= 2) {
        actionButtons[0].addEventListener('click', () => {
           window.location.href = "../profile/profile.html";
        });

        actionButtons[1].addEventListener('click', () => {
            window.location.href = "../products/products.html";
        });
    }
});