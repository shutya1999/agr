let slider_thumb = new Swiper(".slider-thumb", {
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    freeMode: {
        enabled: true,
        // sticky: true,
        minimumVelocity: 0.3
    },
    watchSlidesProgress: true,

    breakpoints: {
        320: {
            spaceBetween: 10,
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 15,
        },
    }

});

let main_slider = new Swiper('.main-slider', {
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.arrow-right',
        prevEl: '.arrow-left',
    },
    thumbs: {
        swiper: slider_thumb,
    },
    on: {
        init: function (swiper) {
            highlightSliderArrowOnClick(swiper);
        }
    },
});



// Выбор города
if (document.querySelector('#select_city-shop') !== null){
    const select_city = new CustomSelect('#select_city-shop');
}

// Сортировка отзывов
if (document.querySelector('#select_sort_review') !== null){
    const select_review_sort = new CustomSelect('#select_sort_review');
}

function stickySliderProduct(){
    let header = document.querySelector('header'),
        top = header.clientHeight + 20;

    if (!header.classList.contains('active')){
        top += header.querySelector('.hidden-header').clientHeight;
    }

    if (document.querySelector('.product-images__wrapper') !== null){
        document.querySelector('.product-images__wrapper').style.top = `${top}px`;
    }
}

// Выбор цвета от производителя
let color_items = document.querySelectorAll('.product-filters__color .content .form-group input'),
    selected_color = document.querySelector('.selected-color span')

color_items.forEach(item => {
    item.addEventListener('change', () => {
        selected_color.innerHTML = item.dataset.color;
        // console.log(item);
    })
})

// Плашка купить при прокрутке
let popup_buy_prod = document.querySelector('.product-header');

popup_buy_prod.style.height = document.querySelector('.hidden-header').clientHeight + "px";

let last_scroll = 0;
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const popup_buy_prod_class = () =>  popup_buy_prod.classList.contains('active');
const popup_buy_prod_pos_show = document.querySelector('.product-images__wrapper').getBoundingClientRect().bottom;

// console.log(popup_buy_prod_pos_show);

document.addEventListener('scroll', () => {

    if (scrollPosition() > popup_buy_prod_pos_show && !popup_buy_prod_class() && scrollPosition() > last_scroll){
        // console.log(document.querySelector('header').clientHeight);
        document.querySelector('.product-images__wrapper').style.top = `${document.querySelector('header').clientHeight + popup_buy_prod.clientHeight + 20}px`;
        popup_buy_prod.classList.add('active');
    }else if (scrollPosition() < last_scroll && popup_buy_prod_class()){
        popup_buy_prod.classList.remove('active');
    }

    last_scroll = scrollPosition();

})

