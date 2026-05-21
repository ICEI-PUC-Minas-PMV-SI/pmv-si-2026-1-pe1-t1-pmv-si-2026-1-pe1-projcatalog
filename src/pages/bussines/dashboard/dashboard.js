const counters = document.querySelectorAll("[data-target]");

counters.forEach(counter => {

    const target = parseFloat(counter.dataset.target);

    let current = 0;

    const increment = target / 40;

    const updateCounter = () => {

        if (current < target) {

            current += increment;

            if (target % 1 !== 0) {
                counter.innerText = current.toFixed(1);
            } else {
                counter.innerText = Math.floor(current);
            }

            requestAnimationFrame(updateCounter);

        } else {

            counter.innerText = target;
        }

    };

    updateCounter();

});  