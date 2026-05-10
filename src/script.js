// Lista de prestadores de serviço (Simulando um banco de dados local)
const servicos = [
    {
        id: 1,
        nome: "João Marceneiro",
        categoria: "Marcenaria",
        descricao: "Móveis planejados e pequenos reparos residenciais de alta qualidade.",
        distancia: 1.2, // Em quilômetros (Para atender o RNF-03)
        whatsapp: "5531999999999", // Link direto conforme RF-04
        imagem: "https://via.placeholder.com/150" // Placeholder para a foto do serviço
    },
    {
        id: 2,
        nome: "Ana Costureira",
        categoria: "Moda",
        descricao: "Ajustes de roupas e confecção de peças sob medida com agilidade.",
        distancia: 0.8,
        whatsapp: "5531888888888",
        imagem: "https://via.placeholder.com/150"
    }
];

// Função para exibir os serviços na tela (Manipulação do DOM)
function renderizarServicos() {
    const vitrine = document.getElementById('vitrine-servicos');
    vitrine.innerHTML = ''; // Limpa a vitrine antes de renderizar

    servicos.forEach(servico => {
        const card = `
            <article class="card-servico">
                <img src="${servico.imagem}" alt="Foto de ${servico.nome}">
                <div class="card-info">
                    <h2>${servico.nome}</h2>
                    <p>${servico.descricao}</p>
                    <span class="distancia">A ${servico.distancia}km de você</span>
                    <div class="card-acoes">
                        <a href="https://wa.me/${servico.whatsapp}" target="_blank" class="btn-contato">WhatsApp</a>
                        <button class="btn-favoritar" onclick="favoritar(${servico.id})">⭐</button>
                    </div>
                </div>
            </article>
        `;
        vitrine.innerHTML += card;
    });
}

// Chama a função ao carregar a página
window.onload = renderizarServicos;

function favoritar(id) {
    console.log("Serviço favoritado: " + id);
    alert("Você favoritou um serviço! (RF-06 em andamento)");
}