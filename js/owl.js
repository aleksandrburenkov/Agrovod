$(document).ready(function () {
    $('.carousel-one').owlCarousel({
        items: 1,
        loop: true,
        animateOut: 'fadeOut',
        autoplay: true,
        autoplayTimeout: 3500,
        smartSpeed: 3500,
    });
});
$(document).ready(function () {
    $('.carousel-two').owlCarousel({
        items: 4,
        loop: true,
        margin: 8,
        // animateOut: 'fadeOut',
        // autoplay: true,
        autoplayTimeout: 3500,
        smartSpeed: 3500,
        nav: true,
        navText: [
            '<svg class="prew"fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 17L5 9.5L20 2" stroke="#59C22A" stroke-width="4" stroke-linecap="round"/></svg>',
            '<svg class="next"fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 17L5 9.5L20 2" stroke="#59C22A" stroke-width="4" stroke-linecap="round"/></svg>',
        ],
        // navText: ['<img src="" alt="">', '<img src="" alt="">'],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 4,
            },
        },
    });
});
