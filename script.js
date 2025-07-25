document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
        },
    });

    // Service Filter
    const serviceCategory = document.getElementById('service-category');
    const area = document.getElementById('area');
    const providers = document.getElementById('providers');

    function filterProviders() {
        const selectedService = serviceCategory.value;
        const selectedArea = area.value;

        const cards = providers.getElementsByClassName('bg-white');
        Array.from(cards).forEach(card => {
            const expertise = card.querySelector('p:nth-child(2)').textContent.split(': ')[1];
            const location = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];

            if ((selectedService === '' || expertise === selectedService) &&
                (selectedArea === '' || location === selectedArea)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    serviceCategory.addEventListener('change', filterProviders);
    area.addEventListener('change', filterProviders);
});
