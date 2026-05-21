const BASE_URL = window.location.pathname.includes('pmv-si-2026-1-pe1-t1-pmv-si-2026-1-pe1-projcatalog')
    ? '/pmv-si-2026-1-pe1-t1-pmv-si-2026-1-pe1-projcatalog'
    : '';

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

        console.log({ route, menu, key, BASE_URL })

        if (route) window.location.href = `${BASE_URL}/${route}`
    }
}

export { updateActiveMenu, navigate }