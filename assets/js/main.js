$('.dropdown').on('click', function(e) {
    var target = $(e.target);
    var dropdown = target.closest('.dropdown');
    return !dropdown.hasClass('open') || !target.hasClass('dropdown-menu__search__input');
});

// Slick
$('.banner-slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    prevArrow: false,
    nextArrow: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                fade: true,
            }
        }
    ]
});