document.addEventListener("DOMContentLoaded", () => {
    
    const loggedInfo = JSON.parse(localStorage.getItem("loggedCompany"));

    // Se não houver empresa logada, redireciona para a página inicial (login)
    if (!loggedInfo || loggedInfo.type !== "company") {
        alert("Acesso negado. Faça login como empresa.");
        // Ajuste o caminho abaixo conforme a estrutura de pastas do seu projeto
        window.location.href = "../../../../index.html"; 
        return;
    }

    const company = loggedInfo.data;


    const produtosAtivos = company.products ? company.products.length : 0;


    let somaNotas = 0;
    let totalAvaliacoes = 0;
    
    if (company.avaliacoes) {
        for (const emailUsuario in company.avaliacoes) {
            somaNotas += company.avaliacoes[emailUsuario].nota;
            totalAvaliacoes++;
        }
    }
    const avaliacaoMedia = totalAvaliacoes > 0 ? (somaNotas / totalAvaliacoes).toFixed(1) : 0;


    const visitasMes = company.visitasMes || Math.floor(Math.random() * 300) + 50;
    const cliquesContato = company.cliquesContato || Math.floor(Math.random() * 80) + 10;


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

    
    const actionButtons = document.querySelectorAll('.action-card button');

    if (actionButtons.length >= 2) {
        
       
        actionButtons[0].addEventListener('click', () => {
           
           window.location.href = "../profile/profile.html";
        });

        // Botão: GERENCIAR CATÁLOGO
        actionButtons[1].addEventListener('click', () => {
             // Altere o link abaixo para o local correto do seu arquivo HTML de Produtos
            window.location.href = "../products/products.html";
        });
    }
});