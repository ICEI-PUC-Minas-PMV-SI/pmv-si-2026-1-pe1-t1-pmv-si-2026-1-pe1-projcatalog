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

    if (isEmpresa) window.location.href =
        "/src/pages/bussines/dashboard/dashboard.html";
    else window.location.href =
        "/src/pages/client/catalog/catalog.html";

});

renderForm();