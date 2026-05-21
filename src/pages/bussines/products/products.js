const addButton = document.querySelector(".add-item-btn");
const cancelButton = document.querySelector(".cancel-btn");
const formContainer = document.querySelector(".product-form-container");

const formTitle = document.querySelector(".form-title");

const inputName = document.querySelector("#product-name");
const inputPrice = document.querySelector("#product-price");
const inputDescription = document.querySelector("#product-description");

const editButtons = document.querySelectorAll(".edit-btn");

/* ABRIR FORM NOVO ITEM */

addButton.addEventListener("click", () => {

    formContainer.classList.add("active");

    formTitle.textContent = "NOVO ITEM";

    inputName.value = "";
    inputPrice.value = "";
    inputDescription.value = "";

});

/* FECHAR FORM */

cancelButton.addEventListener("click", () => {
    formContainer.classList.remove("active");
});

/* EDITAR ITEM */

editButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        const title =
            card.querySelector(".card-title").textContent;

        const price =
            card.querySelector(".card-price").textContent;

        const description =
            card.querySelector(".card-description").textContent;

        formContainer.classList.add("active");

        formTitle.textContent = "EDITAR ITEM";

        inputName.value = title.trim();
        inputPrice.value = price.trim();
        inputDescription.value = description.trim();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});