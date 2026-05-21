function updateActiveMenu(btnList, menu) {
    const currentPath = window.location.pathname;

    btnList.forEach(link => {
        const linkText = link.textContent.trim();
        const route = menu[linkText];

        link.classList.remove("active");

        if (route && currentPath.includes(route)) {
            link.classList.add("active");
        }
    });
}

function navigate(key, menu) {
    return (event) => {
        event.preventDefault();

        const route = menu[key]

        if (route) window.location.href = route
    }
}

export { updateActiveMenu, navigate }