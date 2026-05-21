const storeForm = document.querySelector('.store-form');

storeForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const inputs = storeForm.querySelectorAll('input, textarea');

    const formData = {};

    inputs.forEach((input) => {

        formData[input.placeholder] = input.value;

    });

    console.log('Dados da loja:', formData);

    alert('Alterações salvas com sucesso!');

});