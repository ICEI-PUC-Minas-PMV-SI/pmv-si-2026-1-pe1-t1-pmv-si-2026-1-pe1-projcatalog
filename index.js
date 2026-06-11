import { BASE_URL } from "./src/scripts/common.js"

const authForm = document.getElementById("authForm");
const toggleMode = document.getElementById("toggleMode");
const bottomText = document.getElementById("bottomText");
const cardSubtitle = document.getElementById("cardSubtitle");

const clienteBtn = document.getElementById("clienteBtn");
const empresaBtn = document.getElementById("empresaBtn");

let isLogin = true;
let isEmpresa = false;

function createInput(label, placeholder, icon, type = "text") {
    return `
        <div class="form-group">
          <label>${label}</label>

          <div class="input-wrapper">
            <i class="${icon}"></i>

            <input
              type="${type}"
              placeholder="${placeholder}"
            />
          </div>
        </div>
      `;
}

function validateForm() {
    const inputs = authForm.querySelectorAll("input");
    const submitBtn = authForm.querySelector(".submit-btn");

    let isValid = true;

    inputs.forEach((input) => {
        const value = input.value.trim();

        if (!value) {
            isValid = false;
            return;
        }

        // Validação específica por tipo
        if (input.name === "email") {
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                isValid = false;
            }
        }

        if (input.name === "senha") {
            if (value.length < 6) {
                isValid = false;
            }
        }

        if (input.name === "cnpj") {
            const cnpjLimpo = value.replace(/\D/g, "");

            if (cnpjLimpo.length !== 14) {
                isValid = false;
            }
        }
    });

    submitBtn.disabled = !isValid;
}

function bindValidationEvents() {
    const inputs = authForm.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("input", validateForm);
    });

    validateForm();
}

function renderForm() {
    authForm.innerHTML = "";

    if (isLogin) {

        cardSubtitle.innerText = isEmpresa
            ? "PARA EMPRESAS"
            : "ACESSO À CONTA";

        if (isEmpresa) {
            authForm.innerHTML += createInput(
                "CNPJ",
                "CNPJ",
                "fa-regular fa-id-card"
            );
        } else {
            authForm.innerHTML += createInput(
                "E-MAIL",
                "email@exemplo.com",
                "fa-regular fa-envelope"
            );
        }

        authForm.innerHTML += createInput(
            "SENHA",
            "••••••••",
            "fa-solid fa-lock",
            "password"
        );

        authForm.innerHTML += `
          <button  type="submit" class="submit-btn" id="login-btn">
            ENTRAR
          </button>
        `;

        bottomText.innerText = "Ainda não tem conta?";
        toggleMode.innerText = "CADASTRE-SE";

    } else {

        cardSubtitle.innerText = "CRIAR NOVA CONTA";

        if (isEmpresa) {

            authForm.innerHTML += createInput(
                "RAZÃO SOCIAL",
                "Razão Social",
                "fa-regular fa-building"
            );

            authForm.innerHTML += createInput(
                "CNPJ",
                "CNPJ",
                "fa-regular fa-id-card"
            );

        } else {

            authForm.innerHTML += createInput(
                "NOME COMPLETO",
                "Seu nome",
                "fa-regular fa-user"
            );
        }

        authForm.innerHTML += createInput(
            "E-MAIL",
            "email@exemplo.com",
            "fa-regular fa-envelope"
        );

        authForm.innerHTML += createInput(
            "SENHA",
            "••••••••",
            "fa-solid fa-lock",
            "password"
        );

        authForm.innerHTML += `
          <button  type="submit" class="submit-btn" id="signup-btn">
            CADASTRAR-SE
          </button>
        `;

        bottomText.innerText = "Já possui uma conta?";
        toggleMode.innerText = "FAZER LOGIN";
    }

    bindValidationEvents();

}

function addClient({ nome, email, senha }) {
    const clients = JSON.parse(localStorage.getItem("clients")) || {};

    if (clients[email]) {
        throw new Error("Já existe um cliente com este e-mail.");
    }

    clients[email] = {
        nome,
        email,
        senha
    };

    localStorage.setItem("clients", JSON.stringify(clients));

    return clients[email];
}

function addCompany({
    razaoSocial,
    cnpj,
    email,
    senha,
    image
}) {
    const companies =
        JSON.parse(localStorage.getItem("companies")) || {};

    if (companies[email]) {
        throw new Error("Já existe uma empresa com este e-mail.");
    }

    companies[email] = {
        razaoSocial,
        cnpj,
        email,
        senha,
        image,
        products: []
    };

    localStorage.setItem(
        "companies",
        JSON.stringify(companies)
    );

    return companies[email];
}

function seedDatabase() {
    if (
        localStorage.getItem("clients") &&
        localStorage.getItem("companies")
    ) {
        return;
    }

    const clients = {
        "joao.silva@email.com": {
            nome: "João Silva",
            email: "joao.silva@email.com",
            senha: "123456"
        },
        "maria.santos@email.com": {
            nome: "Maria Santos",
            email: "maria.santos@email.com",
            senha: "123456"
        },
        "pedro.almeida@email.com": {
            nome: "Pedro Almeida",
            email: "pedro.almeida@email.com",
            senha: "123456"
        },
        "ana.costa@email.com": {
            nome: "Ana Costa",
            email: "ana.costa@email.com",
            senha: "123456"
        },
        "lucas.rocha@email.com": {
            nome: "Lucas Rocha",
            email: "lucas.rocha@email.com",
            senha: "123456"
        }
    };

    const companies = {
        "contato@techstore.com": {
            razaoSocial: "Tech Store LTDA",
            categoria: "SERVIÇOS",
            cnpj: "11.111.111/0001-11",
            email: "contato@techstore.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
            products: [
                {
                    id: "tech-001",
                    nome: "Notebook Gamer RTX",
                    descricao: "Notebook gamer de alta performance",
                    preco: 5999.90,
                    categoria: "SERVIÇOS",
                    imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
                    promocao: true
                },
                {
                    id: "tech-002",
                    nome: "Monitor Ultrawide",
                    descricao: "Monitor 34 polegadas",
                    preco: 1899.90,
                    categoria: "SERVIÇOS",
                    imagem: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc",
                    promocao: false
                }
            ]
        },

        "vendas@ecohouse.com": {
            razaoSocial: "Eco House LTDA",
            categoria: "MODA",
            cnpj: "22.222.222/0001-22",
            email: "vendas@ecohouse.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
            products: [
                {
                    id: "eco-001",
                    nome: "Mesa Sustentável",
                    descricao: "Mesa feita de madeira reciclada",
                    preco: 799.90,
                    categoria: "MODA",
                    imagem: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                    promocao: true
                }
            ]
        },

        "contato@gamerhub.com": {
            razaoSocial: "Gamer Hub LTDA",
            categoria: "SERVIÇOS",
            cnpj: "33.333.333/0001-33",
            email: "contato@gamerhub.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1511512578047-dfb367046420",
            products: [
                {
                    id: "gamer-001",
                    nome: "Mouse RGB Pro",
                    descricao: "Mouse gamer RGB",
                    preco: 199.90,
                    categoria: "SERVIÇOS",
                    imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
                    promocao: true
                }
            ]
        },

        "vendas@smartwear.com": {
            razaoSocial: "Smart Wear LTDA",
            categoria: "MODA",
            cnpj: "44.444.444/0001-44",
            email: "vendas@smartwear.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
            products: [
                {
                    id: "wear-001",
                    nome: "Smartwatch Fit",
                    descricao: "Relógio inteligente",
                    preco: 399.90,
                    categoria: "MODA",
                    imagem: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
                    promocao: true
                }
            ]
        },

        "contato@bookworld.com": {
            razaoSocial: "Book World LTDA",
            categoria: "PADARIAS",
            cnpj: "55.555.555/0001-55",
            email: "contato@bookworld.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
            products: [
                {
                    id: "book-001",
                    nome: "Clean Code",
                    descricao: "Livro de desenvolvimento",
                    preco: 89.90,
                    categoria: "PADARIAS",
                    imagem: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
                    promocao: true
                }
            ]
        },

        "contato@petcenter.com": {
            razaoSocial: "Pet Center LTDA",
            categoria: "MERCADOS",
            cnpj: "66.666.666/0001-66",
            email: "contato@petcenter.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1517849845537-4d257902454a",
            products: [
                {
                    id: "pet-001",
                    nome: "Ração Premium",
                    descricao: "Ração para cães adultos",
                    preco: 149.90,
                    categoria: "MERCADOS",
                    imagem: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
                    promocao: true
                }
            ]
        },

        "vendas@fitlife.com": {
            razaoSocial: "Fit Life LTDA",
            categoria: "BELEZA",
            cnpj: "77.777.777/0001-77",
            email: "vendas@fitlife.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
            products: [
                {
                    id: "fit-001",
                    nome: "Whey Protein",
                    descricao: "Proteína concentrada",
                    preco: 129.90,
                    categoria: "BELEZA",
                    imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
                    promocao: true
                }
            ]
        },

        "contato@mobdesign.com": {
            razaoSocial: "Mob Design LTDA",
            categoria: "MODA",
            cnpj: "88.888.888/0001-88",
            email: "contato@mobdesign.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            products: [
                {
                    id: "mob-001",
                    nome: "Sofá Moderno",
                    descricao: "Sofá para sala",
                    preco: 2499.90,
                    categoria: "MODA",
                    imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
                    promocao: true
                }
            ]
        },

        "vendas@beautystore.com": {
            razaoSocial: "Beauty Store LTDA",
            categoria: "BELEZA",
            cnpj: "99.999.999/0001-99",
            email: "vendas@beautystore.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
            products: [
                {
                    id: "beauty-001",
                    nome: "Kit Skincare",
                    descricao: "Kit completo facial",
                    preco: 89.90,
                    categoria: "BELEZA",
                    imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                    promocao: true
                }
            ]
        },

        "contato@autoparts.com": {
            razaoSocial: "Auto Parts LTDA",
            categoria: "RESTAURANTES",
            cnpj: "10.101.010/0001-10",
            email: "contato@autoparts.com",
            senha: "123456",
            image:
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
            products: [
                {
                    id: "auto-001",
                    nome: "Óleo Sintético",
                    descricao: "Óleo automotivo premium",
                    preco: 59.90,
                    categoria: "RESTAURANTES",
                    imagem: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
                    promocao: true
                }
            ]
        },
        "contato@pizzamaster.com": {
            razaoSocial: "Pizza Master LTDA",
            categoria: "RESTAURANTES",
            cnpj: "12.345.678/0001-01",
            email: "contato@pizzamaster.com",
            senha: "123456",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            products: [
                {
                    id: "pizza-001",
                    nome: "Pizza Calabresa Grande",
                    descricao: "Pizza tradicional de calabresa",
                    preco: 49.90,
                    categoria: "RESTAURANTES",
                    imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
                    promocao: true
                },
                {
                    id: "pizza-002",
                    nome: "Pizza Quatro Queijos",
                    descricao: "Pizza especial",
                    preco: 54.90,
                    categoria: "RESTAURANTES",
                    imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
                    promocao: true
                }
            ]
        },

        "contato@padariacentral.com": {
            razaoSocial: "Padaria Central LTDA",
            categoria: "PADARIAS",
            cnpj: "23.456.789/0001-02",
            email: "contato@padariacentral.com",
            senha: "123456",
            image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
            products: [
                {
                    id: "pad-001",
                    nome: "Pão Francês",
                    descricao: "Pão fresquinho",
                    preco: 1.20,
                    categoria: "PADARIAS",
                    imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
                    promocao: true
                },
                {
                    id: "pad-002",
                    nome: "Bolo de Cenoura",
                    descricao: "Bolo caseiro",
                    preco: 24.90,
                    categoria: "PADARIAS",
                    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                    promocao: true
                }
            ]
        },

        "contato@mercadobrasil.com": {
            razaoSocial: "Mercado Brasil LTDA",
            categoria: "MERCADOS",
            cnpj: "34.567.890/0001-03",
            email: "contato@mercadobrasil.com",
            senha: "123456",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
            products: [
                {
                    id: "merc-001",
                    nome: "Arroz Tipo 1",
                    descricao: "Pacote 5kg",
                    preco: 29.90,
                    categoria: "MERCADOS",
                    imagem: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
                    promocao: true
                },
                {
                    id: "merc-002",
                    nome: "Feijão Carioca",
                    descricao: "Pacote 1kg",
                    preco: 8.99,
                    categoria: "MERCADOS",
                    imagem: "https://a-static.mlcdn.com.br/800x800/feijao-carioca-kicaldo-tipo-1-1kg/idealsupermercado3457/cca5e4ca73fc11eead164201ac185040/088362dc2edf6b112ec860df62d38c28.jpeg",
                    promocao: true
                }
            ]
        },

        "contato@salonlux.com": {
            razaoSocial: "Salon Lux LTDA",
            categoria: "BELEZA",
            cnpj: "45.678.901/0001-04",
            email: "contato@salonlux.com",
            senha: "123456",
            image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
            products: [
                {
                    id: "beauty-002",
                    nome: "Escova Progressiva",
                    descricao: "Tratamento capilar",
                    preco: 149.90,
                    categoria: "BELEZA",
                    imagem: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
                    promocao: true
                },
                {
                    id: "beauty-003",
                    nome: "Hidratação Premium",
                    descricao: "Cuidado capilar",
                    preco: 89.90,
                    categoria: "BELEZA",
                    imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                    promocao: true
                }
            ]
        },

        "contato@modaurbana.com": {
            razaoSocial: "Moda Urbana LTDA",
            categoria: "MODA",
            cnpj: "56.789.012/0001-05",
            email: "contato@modaurbana.com",
            senha: "123456",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
            products: [
                {
                    id: "moda-001",
                    nome: "Jaqueta Jeans",
                    descricao: "Modelo unissex",
                    preco: 199.90,
                    categoria: "MODA",
                    imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d",
                    promocao: true
                },
                {
                    id: "moda-002",
                    nome: "Tênis Casual",
                    descricao: "Confortável e moderno",
                    preco: 249.90,
                    categoria: "MODA",
                    imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                    promocao: true
                }
            ]
        }
    };

    const companyMetadata = {
        "contato@techstore.com": {
            descricao: "Loja especializada em tecnologia, informática e equipamentos gamers.",
            endereco: "Av. Afonso Pena, 2500 - Centro, Belo Horizonte/MG",
            telefone: "(31) 3333-1111",
            whatsapp: "5531999111111",
            site: "https://www.techstore.com.br",
            avaliacoes: {
                "joao.silva@email.com": { comentario: "Excelente atendimento.", nota: 5 },
                "maria.santos@email.com": { comentario: "Entrega rápida.", nota: 4 }
            }
        },
        "vendas@ecohouse.com": {
            descricao: "Móveis e decoração sustentável.",
            endereco: "Rua dos Ipês, 120 - Savassi, Belo Horizonte/MG",
            telefone: "(31) 3333-2222",
            whatsapp: "5531999222222",
            site: "https://www.ecohouse.com.br",
            avaliacoes: {
                "ana.costa@email.com": { comentario: "Produtos lindos.", nota: 5 },
                "lucas.rocha@email.com": { comentario: "Boa qualidade.", nota: 4 }
            }
        },
        "contato@gamerhub.com": {
            descricao: "Periféricos e acessórios gamers.",
            endereco: "Av. Brasil, 500 - Centro, Belo Horizonte/MG",
            telefone: "(31) 3333-3333",
            whatsapp: "5531999333333",
            site: "https://www.gamerhub.com.br",
            avaliacoes: {
                "pedro.almeida@email.com": { comentario: "Mouse excelente.", nota: 5 },
                "joao.silva@email.com": { comentario: "Bom custo-benefício.", nota: 4 }
            }
        },
        "vendas@smartwear.com": {
            descricao: "Moda inteligente e wearables.",
            endereco: "Rua da Bahia, 800 - Lourdes, Belo Horizonte/MG",
            telefone: "(31) 3333-4444",
            whatsapp: "5531999444444",
            site: "https://www.smartwear.com.br",
            avaliacoes: {
                "maria.santos@email.com": { comentario: "Relógio muito bonito.", nota: 5 },
                "ana.costa@email.com": { comentario: "Gostei bastante.", nota: 4 }
            }
        },
        "contato@bookworld.com": {
            descricao: "Livraria com títulos nacionais e internacionais.",
            endereco: "Av. Augusto de Lima, 450 - Centro, Belo Horizonte/MG",
            telefone: "(31) 3333-5555",
            whatsapp: "5531999555555",
            site: "https://www.bookworld.com.br",
            avaliacoes: {
                "lucas.rocha@email.com": { comentario: "Ótimos livros.", nota: 5 },
                "joao.silva@email.com": { comentario: "Bom catálogo.", nota: 4 }
            }
        },
        "contato@petcenter.com": {
            descricao: "Produtos para cães e gatos.",
            endereco: "Rua Pium-i, 300 - Anchieta, Belo Horizonte/MG",
            telefone: "(31) 3333-6666",
            whatsapp: "5531999666666",
            site: "https://www.petcenter.com.br",
            avaliacoes: {
                "ana.costa@email.com": { comentario: "Meu pet adorou.", nota: 5 },
                "pedro.almeida@email.com": { comentario: "Boa variedade.", nota: 4 }
            }
        },
        "vendas@fitlife.com": {
            descricao: "Suplementos e nutrição esportiva.",
            endereco: "Av. do Contorno, 9000 - Gutierrez, Belo Horizonte/MG",
            telefone: "(31) 3333-7777",
            whatsapp: "5531999777777",
            site: "https://www.fitlife.com.br",
            avaliacoes: {
                "lucas.rocha@email.com": { comentario: "Whey excelente.", nota: 5 },
                "maria.santos@email.com": { comentario: "Preço justo.", nota: 4 }
            }
        },
        "contato@mobdesign.com": {
            descricao: "Móveis modernos para casa e escritório.",
            endereco: "Rua Curitiba, 2200 - Lourdes, Belo Horizonte/MG",
            telefone: "(31) 3333-8888",
            whatsapp: "5531999888888",
            site: "https://www.mobdesign.com.br",
            avaliacoes: {
                "joao.silva@email.com": { comentario: "Sofá muito confortável.", nota: 5 },
                "ana.costa@email.com": { comentario: "Acabamento ótimo.", nota: 4 }
            }
        },
        "vendas@beautystore.com": {
            descricao: "Cosméticos e cuidados pessoais.",
            endereco: "Rua Alagoas, 850 - Funcionários, Belo Horizonte/MG",
            telefone: "(31) 3333-9999",
            whatsapp: "5531999999999",
            site: "https://www.beautystore.com.br",
            avaliacoes: {
                "maria.santos@email.com": { comentario: "Produtos excelentes.", nota: 5 },
                "ana.costa@email.com": { comentario: "Recomendo.", nota: 5 }
            }
        },
        "contato@autoparts.com": {
            descricao: "Peças e acessórios automotivos.",
            endereco: "Av. Amazonas, 4500 - Nova Suíça, Belo Horizonte/MG",
            telefone: "(31) 3333-1010",
            whatsapp: "5531999101010",
            site: "https://www.autoparts.com.br",
            avaliacoes: {
                "pedro.almeida@email.com": { comentario: "Óleo de qualidade.", nota: 4 },
                "lucas.rocha@email.com": { comentario: "Atendimento rápido.", nota: 5 }
            }
        },
        "contato@pizzamaster.com": {
            descricao: "Pizzaria artesanal tradicional.",
            endereco: "Rua dos Timbiras, 1200 - Centro, Belo Horizonte/MG",
            telefone: "(31) 3333-2020",
            whatsapp: "5531999202020",
            site: "https://www.pizzamaster.com.br",
            avaliacoes: {
                "joao.silva@email.com": { comentario: "Melhor pizza da cidade.", nota: 5 },
                "maria.santos@email.com": { comentario: "Muito saborosa.", nota: 5 }
            }
        },
        "contato@padariacentral.com": {
            descricao: "Padaria artesanal com produção diária.",
            endereco: "Rua Espírito Santo, 450 - Centro, Belo Horizonte/MG",
            telefone: "(31) 3333-3030",
            whatsapp: "5531999303030",
            site: "https://www.padariacentral.com.br",
            avaliacoes: {
                "ana.costa@email.com": { comentario: "Pães sempre frescos.", nota: 5 },
                "pedro.almeida@email.com": { comentario: "Bolos deliciosos.", nota: 4 }
            }
        },
        "contato@mercadobrasil.com": {
            descricao: "Mercado completo para compras do dia a dia.",
            endereco: "Av. Teresa Cristina, 800 - Prado, Belo Horizonte/MG",
            telefone: "(31) 3333-4040",
            whatsapp: "5531999404040",
            site: "https://www.mercadobrasil.com.br",
            avaliacoes: {
                "lucas.rocha@email.com": { comentario: "Grande variedade.", nota: 5 },
                "joao.silva@email.com": { comentario: "Bons preços.", nota: 4 }
            }
        },
        "contato@salonlux.com": {
            descricao: "Salão de beleza premium.",
            endereco: "Rua Sergipe, 980 - Savassi, Belo Horizonte/MG",
            telefone: "(31) 3333-5050",
            whatsapp: "5531999505050",
            site: "https://www.salonlux.com.br",
            avaliacoes: {
                "maria.santos@email.com": { comentario: "Serviço impecável.", nota: 5 },
                "ana.costa@email.com": { comentario: "Equipe excelente.", nota: 5 }
            }
        },
        "contato@modaurbana.com": {
            descricao: "Moda casual e urbana.",
            endereco: "Av. Getúlio Vargas, 1400 - Savassi, Belo Horizonte/MG",
            telefone: "(31) 3333-6060",
            whatsapp: "5531999606060",
            site: "https://www.modaurbana.com.br",
            avaliacoes: {
                "pedro.almeida@email.com": { comentario: "Roupas modernas.", nota: 4 },
                "lucas.rocha@email.com": { comentario: "Ótimo atendimento.", nota: 5 }
            }
        }
    };

    Object.entries(companyMetadata).forEach(([email, metadata]) => {
        companies[email] = {
            ...companies[email],
            ...metadata
        };
    });

    const promotions = {
        "contato@techstore.com": companies["contato@techstore.com"].products,
        "contato@gamerhub.com": companies["contato@gamerhub.com"].products,
        "vendas@smartwear.com": companies["vendas@smartwear.com"].products,
        "contato@bookworld.com": companies["contato@bookworld.com"].products,
        "contato@petcenter.com": companies["contato@petcenter.com"].products,
        "vendas@fitlife.com": companies["vendas@fitlife.com"].products,
        "contato@mobdesign.com": companies["contato@mobdesign.com"].products,
        "vendas@beautystore.com": companies["vendas@beautystore.com"].products,
        "contato@pizzamaster.com": companies["contato@pizzamaster.com"].products,
        "contato@padariacentral.com": companies["contato@padariacentral.com"].products,
        "contato@mercadobrasil.com": companies["contato@mercadobrasil.com"].products,
        "contato@salonlux.com": companies["contato@salonlux.com"].products,
        "contato@modaurbana.com": companies["contato@modaurbana.com"].products
    };

    const favorites = {
        "contato@techstore.com": companies["contato@techstore.com"].products,
        "contato@gamerhub.com": companies["contato@gamerhub.com"].products,
        "vendas@smartwear.com": companies["vendas@smartwear.com"].products,
        "contato@bookworld.com": companies["contato@bookworld.com"].products,
        "contato@petcenter.com": companies["contato@petcenter.com"].products,
        "vendas@fitlife.com": companies["vendas@fitlife.com"].products,
    };

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    localStorage.setItem(
        "promotions",
        JSON.stringify(promotions)
    );

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

    localStorage.setItem(
        "companies",
        JSON.stringify(companies)
    );
}

function getFormData() {
    const inputs = authForm.querySelectorAll("input");

    const values = {};

    inputs.forEach((input) => {
        const label = input
            .closest(".form-group")
            ?.querySelector("label")
            ?.innerText
            ?.trim();

        values[label] = input.value.trim();
    });

    if (isEmpresa) {
        return {
            razaoSocial: values["RAZÃO SOCIAL"],
            cnpj: values["CNPJ"],
            email: values["E-MAIL"],
            senha: values["SENHA"]
        };
    }

    return {
        nome: values["NOME COMPLETO"],
        email: values["E-MAIL"],
        senha: values["SENHA"]
    };
}

function setLoggedClient(client) {
    localStorage.setItem(
        "loggedUser",
        JSON.stringify({
            type: "client",
            data: client
        })
    );
}

function setLoggedCompany(company) {
    localStorage.setItem(
        "loggedCompany",
        JSON.stringify({
            type: "company",
            data: company
        })
    );
}

function getClientByEmail(email) {
    const clients = JSON.parse(
        localStorage.getItem("clients")
    ) || {};

    return clients[email] || null;
}

function getCompanyByEmail(email) {
    const companies = JSON.parse(
        localStorage.getItem("companies")
    ) || {};

    return companies[email] || null;
}

toggleMode.addEventListener("click", () => {
    isLogin = !isLogin;
    renderForm();
});

clienteBtn.addEventListener("click", () => {
    isEmpresa = false;

    clienteBtn.classList.add("active");
    empresaBtn.classList.remove("active");

    renderForm();
});

empresaBtn.addEventListener("click", () => {
    isEmpresa = true;

    empresaBtn.classList.add("active");
    clienteBtn.classList.remove("active");

    renderForm();
});

authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = getFormData()
    let loginAllowed = false

    if (!isLogin) {
        if (isEmpresa) {
            addCompany(data)
        }
        else {
            addClient(data)
        }

        loginAllowed = true
    }

    if (isLogin || loginAllowed) {
        if (isEmpresa) {
            const companyData = getCompanyByEmail(data.email)

            if (data.senha === companyData.senha) {
                setLoggedCompany(companyData)
                loginAllowed = true
            }
        }
        else {
            const clientData = getClientByEmail(data.email)

            console.log(clientData, data)
            if (data.senha === clientData.senha) {
                setLoggedClient(clientData)
                loginAllowed = true
            }
        }
    }

    if (loginAllowed) {
        if (isEmpresa) {
            window.location.href =
                `${BASE_URL()}/src/pages/bussines/dashboard/dashboard.html`
        }
        else {
            window.location.href =
                `${BASE_URL()}/src/pages/client/catalog/catalog.html`
        }
    }

});

seedDatabase();
renderForm();