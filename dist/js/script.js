let slider_goods; // слайдер товаров
let slider_blog;
let timer_benefits; //Анимация преимуществ (телефон)
let regExp_number = /[^0-9]/; //Регулярное выражение, тлько цифры

// Прослушивать медиазапросы
const breakpoint_mob = window.matchMedia('(max-width:767px)'); // 0 - 767
const breakpoint_tablet = window.matchMedia('(max-width:991px)'); // 767 - 991
const breakpoint_laptop = window.matchMedia('(max-width:1199px)'); // 991 - 1999
const breakpoint_desktop = window.matchMedia('(min-width:1200px)'); // 1999 >

const breakpointChecker = function () {
    if (breakpoint_mob.matches === true) {
        // console.log('mob');
        hideHeader(1);
        // Отключаем сладер товаров
        if (slider_goods !== undefined) {
            if (slider_goods.length === 1) {
                slider_goods.destroy(true, true);
            } else {
                slider_goods.forEach(slider => {
                    slider.destroy(true, true);
                })
            }
        }
        // Запуск анимации преимуществ
        animateBenefitsIndex(1);

        mobMenuDropdown(1);

        // Подсказка
        prompt(1);

        // Отключаем сладер на странице блога
        if (slider_blog !== undefined) {
            slider_blog.destroy(true, true);
        }


        return false;
    }
    if (breakpoint_tablet.matches === true) {
        // console.log('tablet');

        hideHeader(0);
        //Включить слайдер товаров
        enableSwiper();

        // Запуск анимации преимуществ
        animateBenefitsIndex(1);

        mobMenuDropdown(1);

        // Меню каталог
        // menuCatalog('mobile');

        // Подсказка
        prompt(1);

        // Отключаем сладер на странице блога
        if (slider_blog !== undefined) {
            slider_blog.destroy(true, true);
        }


        return false;
    }
    if (breakpoint_laptop.matches === true) {
        // console.log('laptop');

        hideHeader(0);
        //Включить слайдер товаров
        enableSwiper();
        // Отключить анимацию преимуществ
        animateBenefitsIndex(0);

        mobMenuDropdown(1);

        // Меню каталог
        // menuCatalog('mobile');

        // Подсказка
        prompt(0);

        // Включаем сладер на странице блога
        enableSliderBlogCatalog();


        return false;
    }
    if (breakpoint_desktop.matches === true) {
        hideHeader(0);

        //Включить слайдер товаров
        enableSwiper();

        mobMenuDropdown(0);
        // console.log('desk');

        // Меню каталог
        // menuCatalog('desktop');

        // Подсказка
        prompt(0);

        // Включаем сладер на странице блога
        enableSliderBlogCatalog();

        return false;
    }
};

breakpoint_mob.addEventListener('change', breakpointChecker);
breakpoint_tablet.addEventListener('change', breakpointChecker);
breakpoint_laptop.addEventListener('change', breakpointChecker);
breakpoint_desktop.addEventListener('change', breakpointChecker);
breakpointChecker();

window.onload = function () {
    customScrollbar();
};

//Удалить клас
function removeClass(node, className) {
    node.forEach(item => {
        item.classList.remove(className);
    })
}
// Mask Phone
let mask_phones = document.querySelectorAll('._js-mask-phone');
if (mask_phones.length !== 0){
    mask_phones.forEach(phone => {
        let mask = new Inputmask({
            showMaskOnHover: false,
            mask: '+380 (99) - 999 - 99 - 99',
            placeholder: " ",
        });
        mask.mask(phone);
    })
}

// Анимация при скроле

function animation(){
    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animScroll)

        function animScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index],
                    animItemHeight = animItem.offsetHeight,
                    animItemOffset = offset(animItem).top,
                    animStart = (animItem.dataset.start !== undefined) ? +animItem.dataset.start : 2;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
        }

        animScroll();
    }
}
animation();
//Burger
function menuMob() {
    let burger = document.querySelector('.burger'),
        mob_menu = document.querySelector('.hidden-header'),
        btn_close = document.querySelector('.js-close-menu'),
        overlay_header = document.querySelector('.overlay-header');

    burger.addEventListener('click', function () {
        mob_menu.classList.add('active');
        overlay_header.classList.add('active');
        document.body.classList.add('_hide_scroll');
    })
    btn_close.addEventListener('click', function () {
        mob_menu.classList.remove('active');
        overlay_header.classList.remove('active');
        document.body.classList.remove('_hide_scroll');
    })

    overlay_header.addEventListener('click', () => {
        mob_menu.classList.remove('active');
        overlay_header.classList.remove('active');
        document.body.classList.remove('_hide_scroll');
    })

    // window.addEventListener('click', function (e){
    //     let tg = e.target;
    //     if (tg.closest('.hm-wrapper') === null && !tg.classList.contains('burger')){
    //         mob_menu.classList.remove('active');
    //         document.body.classList.remove('_hide_scroll');
    //     }
    // })
}

menuMob();

//Скрыть хеадер при скроле
function hideHeader(device) {
    // 1 - mob
    // 0 - tablet/desc


    let last_scroll = 0;
    const header = document.querySelector('header'),
        defaultOffset = 100;

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('active');

    if (device) {

        window.addEventListener('scroll', () => {
            if (scrollPosition() > defaultOffset) {
                header.classList.add('active');
            } else if (scrollPosition() < last_scroll) {
                header.classList.remove('active');
            }
            last_scroll = scrollPosition();
        })
    } else {
        window.addEventListener('scroll', () => {
            if (scrollPosition() > last_scroll && !containHide() && scrollPosition() > defaultOffset) {
                header.classList.add('active');

                // Фиксировать слайдер товара на странице товара (product)
                if (document.querySelector('.product-images__wrapper') !== null){
                    stickySliderProduct();
                }
            } else if (scrollPosition() < last_scroll && containHide()) {
                header.classList.remove('active');

                if (document.querySelector('.product-images__wrapper') !== null){
                    stickySliderProduct();
                }
            }
            last_scroll = scrollPosition();
        })
    }
}

// меню Моб версия, выпадающий список (dropdown)
function mobMenuDropdown(action) {
    // 1 - mob
    // 0 - desk
    let menu_btn_dropdown = document.querySelectorAll('.hm-nav .dropdown');

    if (menu_btn_dropdown.length !== 0) {
        menu_btn_dropdown.forEach(dropdown => {
            if (action) {
                dropdown.addEventListener('click', () => {
                    dropdown.classList.toggle('active');
                })
            } else {
                dropdown.addEventListener('mouseenter', (e) => {
                    if (!dropdown.classList.contains('active')) {
                        let container = dropdown.closest('.container');
                        let list = dropdown.querySelector('.dropdown-list');

                        let container_right = container.getBoundingClientRect().right; // правый край контейнера

                        if (list.getBoundingClientRect().right > container_right) {
                            let left = (list.getBoundingClientRect().right - container_right + 20) * -1;
                            list.style.left = left + 'px';
                            // console.log(left)
                        }
                        dropdown.classList.add('active');
                    }
                })

                dropdown.addEventListener('mouseleave', (e) => {
                    dropdown.classList.remove('active');
                })
                // dropdown.addEventListener('click', () => {
                //     dropdown.classList.toggle('active');
                // })
            }

        })
    }
}

// Еффект при клике на кнопку
let btn_clickable = document.querySelectorAll('.clickable');

if (btn_clickable.length > 0){
    btn_clickable.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!btn.classList.contains('._click')){
                e.preventDefault();
                btn.classList.add('_click');
                setTimeout(() => {
                    btn.classList.remove('_click');
                    // console.log(btn.hasAttribute('href'));
                    if (btn.hasAttribute('href')){
                        window.location = btn.href;
                    }
                }, 300)
            }
        })
    })
}

// Кнопка прокрутки вверх
window.addEventListener('scroll', showBntScrollTop);
window.addEventListener('load', showBntScrollTop);
let btn_scroll_top = document.querySelector('.btn-scroll-top');
btn_scroll_top.addEventListener('click', () => {
    btn_scroll_top.classList.add('click');
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
    btn_scroll_top.classList.remove('active');
    setTimeout(() => {
        btn_scroll_top.classList.remove('click');
    }, 300)
})
function showBntScrollTop(){
    let top = document.documentElement.scrollTop;
    if (top > 3000){
        if (!btn_scroll_top.classList.contains('active')) btn_scroll_top.classList.add('active');
    }else {
        if (btn_scroll_top.classList.contains('active')) btn_scroll_top.classList.remove('active');
    }
}


//Слайдер на главной странице в хеадере
if (document.querySelector('.slider-index__header') !== null){
    const slider_index__header = new Swiper('.slider-index__header', {
        pagination: {
            el: '.swiper-pagination',
        },
        loop: true,
        speed: 500,
        navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },
        breakpoints: {
            768: {
                spaceBetween: 20
            }
        },
        on: {
            init: function (swiper) {
                highlightSliderArrowOnClick(swiper);
            }
        },
    });
}


//Подсветить стрелки слайдера при клике
function highlightSliderArrowOnClick(swiper) {
    let speed = swiper.params.speed;//время пролистывания слайда

    swiper.navigation.nextEl.addEventListener('click', function () {
        swiper.navigation.nextEl.classList.add('_click');
        setTimeout(function () {
            swiper.navigation.nextEl.classList.remove('_click');
        }, speed)
    });
    swiper.navigation.prevEl.addEventListener('click', function () {
        swiper.navigation.prevEl.classList.add('_click');
        setTimeout(function () {
            swiper.navigation.prevEl.classList.remove('_click');
        }, speed)
    })
}


//Анимация преимуществ на главном екране главной страницы
function animateBenefitsIndex(play) {
    if (play) {
        let benefits = document.querySelectorAll('.header-benefits .item');
        if (benefits.length !== 0) {
            timer_benefits = setInterval(() => {
                for (let i = 0; i < benefits.length; i++) {
                    if (benefits[i].classList.contains('active')) {
                        const next_index = (i + 1 < benefits.length) ? i + 1 : 0;

                        benefits[i].classList.remove('active');
                        benefits[next_index].classList.add('active');
                        break;
                    }
                }
            }, 5000)
        }
    } else {
        timer_benefits = clearInterval(timer_benefits);
    }
}

//Показать еще
let btn_load_more = document.querySelectorAll('.js-more-show');

if (btn_load_more.length !== 0) {
    btn_load_more.forEach(btn => {
        btn.addEventListener('click', () => {
            let parent = btn.closest('.js-parent-tg');

            if (btn.dataset.count === 'all') {
                let items = parent.querySelectorAll('.js-item');
                let count = 0;

                items.forEach(item => {
                    if (+item.dataset.show === 0) {
                        item.style.animationDuration = 300 + (count * 100) + 'ms';
                        item.classList.add('active');
                        count++;
                    }
                })
                btn.style.display = 'none';
                parent.querySelector('.js-more-hide').style.display = 'block';
            } else {
                const items = parent.querySelectorAll('.js-item:not(.active)'),
                    count = +btn.dataset.count;

                for (let i = 0; i < count; i++) {
                    if (items[i] !== undefined) {
                        items[i].style.animationDuration = 300 + (i * 100) + 'ms';
                        items[i].classList.add('active');
                    }
                }

                if (parent.querySelectorAll('.js-item:not(.active)').length === 0) btn.remove();

            }

        })
    })
}
//Показать меньше
let btn_hide_more = document.querySelectorAll('.js-more-hide');

if (btn_hide_more.length !== 0) {
    btn_hide_more.forEach(btn => {
        btn.addEventListener('click', () => {
            let parent = btn.closest('.js-parent-tg'),
                items = parent.querySelectorAll('.js-item');

            items.forEach(item => {
                if (+item.dataset.show === 0) {
                    item.classList.remove('active');
                }
            })
            btn.style.display = 'none';
            parent.querySelector('.js-more-show').style.display = 'block';
        })
    })
}

// Касомный скроллбар
function customScrollbar() {
    let scroll_block = document.querySelectorAll('._js-scroll');

    if (scroll_block.length !== 0) {
        if (breakpoint_desktop.matches){
            scroll_block.forEach(scroll_item => {
                if (scroll_item.querySelector('.swiper')){
                    let swiper = new Swiper(scroll_item.querySelector('.swiper'), {
                        slidesPerView: scroll_item.querySelector('.swiper').dataset.sliderElem,
                        spaceBetween: 20,
                        scrollbar: {
                            el: '.scrollbar-desktop',
                            draggable: true,
                        },
                        freeMode: {
                            enabled: true,
                            // sticky: true,
                            minimumVelocity: 0.3
                        },
                    })
                }
            })
        }else {
            scroll_block.forEach(scroll_item => {
                let content = scroll_item.querySelector('._js-scroll__content'),
                    content_width = content.scrollWidth, // ширина блока
                    scroll_width = content_width - content.clientWidth; //сколько нужно прокрутить до конца
                // scroll_width = content_width - (scroll_item.querySelector('._js-scroll__content').clientWidth); //сколько нужно прокрутить до конца
                // scroll_width = content_width - (scroll_item.querySelector('.container').clientWidth - 20); //сколько нужно прокрутить до конца

                if (scroll_width !== 0) {
                    let scrollbar = scroll_item.querySelector('._js-scrollbar'),//блок скролбара
                        scrollbar_elem = scrollbar.querySelector('span'),//елемент скроллбара
                        scrollbar_elem_scrolling = scrollbar.clientWidth - (scrollbar_elem.clientWidth + 6); // 6 - отступ у елемента скролбара

                    let coef = scroll_width / scrollbar_elem_scrolling;//соотношение прокрутки блока и скролбара

                    content.addEventListener('scroll', function () {
                        let scroll = content.scrollLeft;

                        if (scroll > scroll_width) {
                            scrollbar_elem.style.left = scroll_width + 'px';
                        } else {
                            scrollbar_elem.style.left = (scroll / coef) + 'px';
                        }
                    })
                } else {
                    // scroll_item.querySelector('._js-scrollbar').remove();
                    scroll_item.classList.add('_hide-scroll');
                }
            })
        }
    }
}

//Повторяющийся слайдер товаров
function enableSwiper() {
    if (document.querySelector('.slider-goods') !== null){
        slider_goods = new Swiper('.slider-goods', {
            speed: 500,
            spaceBetween: 20,
            navigation: {
                nextEl: '.arrow-right',
                prevEl: '.arrow-left',
            },
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                992: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                1200: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                    spaceBetween: 0,
                    allowTouchMove: false,
                }
            },
            on: {
                init: function (swiper) {
                    // console.log(swiper);
                    highlightSliderArrowOnClick(swiper);
                }
            },
        });
    }
}

// Добавить/удалить в понравившейся/сравнения
function compare(btn) {
    // console.log(btn);
    if (btn.classList.contains('_added')) {
        //Удаляем
        btn.classList.remove('_click');
        btn.classList.remove('_added');
    } else {
        //Добавляем
        btn.classList.add('_click');
        btn.classList.add('_added');
    }
}

function like(btn) {
    if (btn.classList.contains('_liked')) {
        //Удаляем
        btn.classList.remove('_click');
        btn.classList.remove('_liked');
    } else {
        //Добавляем
        btn.classList.add('_click');
        btn.classList.add('_liked');
    }
}
if (document.querySelector('.slider-cart-img') !== null){

    console.log(document.querySelector('.slider-cart-img'))
    let slider_goods_img = new Swiper('.slider-cart-img', {
        speed: 300,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.arrow-right_img',
            prevEl: '.arrow-left_img',
        },
        breakpoints: {
            768: {
                allowTouchMove: false,
            },

        },
    });
}

// Добавление в корзину
function addCart(btn) {
    let text_buy = btn.querySelector('span').textContent;
    btn.classList.add('_add');
    btn.querySelector('span').innerHTML = btn.dataset.add;

    setTimeout(() => {
        btn.classList.remove('_add');
        btn.querySelector('span').innerHTML = text_buy;
    }, 2000)
}


//Табы
let tab_block = document.querySelectorAll('.js-tabs');

if (tab_block.length !== 0) {
    tab_block.forEach(block => {
        let tab_btns = block.querySelectorAll('.js-tab'),
            tab_items = block.querySelectorAll('.js-tab-content');

        tab_btns.forEach(btn => {
            btn.addEventListener('click', () => {
                removeClass(tab_btns, 'active');
                removeClass(tab_items, 'active');

                btn.classList.add('active');
                tab_items.forEach(item => {
                    // console.log(item);
                    if (btn.dataset.id === item.dataset.id) {
                        item.classList.add('active');
                        customScrollbar();
                        if (block.querySelector('._js-faq')){
                            recalcFaqHeight(item);
                        }
                    }
                })
            })
        })
    })
}

// Меню в блоке О нас на Главной
let menu_about_link = document.querySelectorAll('.menu-about a');

if (menu_about_link.length !== 0) {
    menu_about_link.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            removeClass(menu_about_link, 'active');

            link.classList.add('active');
            setTimeout(() => {
                window.location.href = link.href;
            }, 200)
        })
    })
}

//Показать / скрыть контент
let btns_hide = document.querySelectorAll('.js-hidden-btn');

if (btns_hide.length !== 0) {
    btns_hide.forEach(btn => {
        btn.addEventListener('click', function () {
            let hide_block = btn.closest('.js-parent').querySelector('.js-hidden__content');

            //console.log(btn.dataset.hide);
            if (btn.dataset.hide !== undefined){
                let prev_text = btn.textContent;
                hide_block.classList.toggle('_show');

                btn.textContent = btn.dataset.hide;
                btn.dataset.hide = prev_text;
                btn.classList.toggle('active');
            }else {
                hide_block.classList.add('_show');
                btn.remove();
            }
        })
    })
}

//Счетчик в карточке товара
let counter_timer,
    counter_press;

function countPres(tg, actions, event) {
    if (event.type === 'touchend') event.preventDefault();

    clearTimeout(counter_timer);
    clearInterval(counter_press);

    let input = tg.closest('.js-counter').querySelector('input');

    if (input.value !== '') {
        if (regExp_number.test(input.value)) {
            input.value = 1;
        }
    } else {
        input.value = 1;
    }

    if (actions) { // увеличить
        input.value = +input.value + 1;
    } else { //уменьшить
        input.value = +input.value - 1;
        if (input.value < 1) input.value = 1;
    }
}

function countHold(tg, actions, event) {
    let input = tg.closest('.js-counter').querySelector('input');
    if (input.value !== '') {
        if (regExp_number.test(input.value)) {
            input.value = 1;
        }
    } else {
        input.value = 1;
    }

    counter_timer = setTimeout(() => {
        counter_press = setInterval(() => {

            if (actions) { // увеличить
                input.value = +input.value + 1;
            } else { //уменьшить
                input.value = +input.value - 1;
                if (input.value < 1) input.value = 1;
            }

        }, 70)
    }, 500)
}

function counterOnChange(tg) {
    if (tg.value !== '') {
        if (regExp_number.test(tg.value)) {
            tg.value = 1;
        }
        // tg.value = tg.value.replace(/\D/, '1');
    } else {
        tg.value = 1;
    }
}

// Выпадающий список для единиц измерения (measurement)
function selectMeasurement(tg) {
    // let select = tg.querySelector('.measurement-select');
    // items = tg.querySelector('li');

    setTimeout(() => {
        let parent = tg.closest('.js-measurement'),
            li = parent.querySelectorAll('li');

        parent.classList.toggle('active');

        li.forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('_selected')) {
                    // console.log(li);
                    removeClass(li, '_selected');

                    tg.innerHTML = item.innerHTML;
                    item.classList.add('_selected');
                }
                parent.classList.remove('active');
            })
        })
    }, 50)
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.js-measurement.active')) {
        document.querySelectorAll('.js-measurement').forEach(select => {
            select.classList.remove('active');
        });
    }
});

// Каталог, вариант отображения каталога
let btn_cat_display = document.querySelectorAll('.js-cat-display'),
    cat_list = document.querySelector('.js-cat');

if (btn_cat_display.length !== 0) {
    if (sessionStorage.getItem("catalog_display")) {
        if (sessionStorage.getItem("catalog_display") === 'horizontal') {
            btn_cat_display.forEach(btn => {

                if (btn.dataset.display !== undefined){
                    removeClass(btn_cat_display, 'active');
                    if (btn.dataset.display === 'row') {
                        btn.classList.add('active');
                    }else {
                        btn.classList.add('active');
                    }
                }else {
                    btn.classList.remove('active');
                }

            })
            cat_list.classList.add(sessionStorage.getItem("catalog_display"));
        }
    }
    btn_cat_display.forEach(btn => {
        btn.addEventListener('click', function () {

            if (breakpoint_mob.matches || breakpoint_tablet.matches){
                // btn.classList.toggle('active');
                if (!cat_list.classList.contains('horizontal')) {
                    btn.classList.remove('active');
                    cat_list.classList.add('horizontal');
                    sessionStorage.setItem('catalog_display', 'horizontal');
                } else {
                    btn.classList.add('active');
                    cat_list.classList.remove('horizontal');
                    sessionStorage.setItem('catalog_display', '');
                }
            }else {
                removeClass(btn_cat_display, 'active');
                btn.classList.add('active');
                if (btn.dataset.display === 'row'){
                    cat_list.classList.remove('horizontal');
                    sessionStorage.setItem('catalog_display', '');
                }else {
                    cat_list.classList.add('horizontal');
                    sessionStorage.setItem('catalog_display', 'horizontal');
                }
            }
        })
    })
}

// Каталог
// Акордеон
let accordion_items = document.querySelectorAll('.js-accordion-trigger');

if (accordion_items.length !== 0) {
    accordion_items.forEach(item => {
        item.addEventListener('click', function () {
            item.closest('.js-accordion-item').classList.toggle('active');
        })
    })
}
// Открытие блока с фильтрами
let btn_open_filter = document.querySelector('.js-open-filter');

if (btn_open_filter) {
    let filter = document.querySelector('.js-filter'),
        btn_close_filter = document.querySelector('.js-close-filter');

    btn_open_filter.addEventListener('click', function () {
        filter.classList.add('active');
        document.body.classList.add('_hide_scroll');
    })
    btn_close_filter.addEventListener('click', function () {
        filter.classList.remove('active');
        document.body.classList.remove('_hide_scroll');
    })
}

let range_price_form = document.querySelector('.js-filter-range');
if (range_price_form) {
    let range_price = range_price_form.querySelector('#price-range'),
        input_min = range_price_form.querySelector('#input-price__min'),
        input_max = range_price_form.querySelector('#input-price__max'),
        validate_count = 0;

    noUiSlider.create(range_price, {
        start: [+range_price.dataset.currentMin, +range_price.dataset.currentMax],
        connect: true,
        step: +range_price.dataset.step,
        range: {
            'min': +range_price.dataset.min,
            'max': +range_price.dataset.max
        },
    });

    range_price.noUiSlider.on('slide', function (values) {
        input_min.value = Math.round(values[0]);
        input_max.value = Math.round(values[1]);

        input_min.classList.remove('_invalid');
        input_max.classList.remove('_invalid');
        range_price_form.querySelector('button').classList.remove('_disabled');
    });

    input_min.addEventListener('input', function () {
        validatePrice(input_min);
        if (input_max.classList.contains('_invalid')) validatePrice(input_max);
    })
    input_max.addEventListener('input', function () {
        validatePrice(input_max);

        if (input_min.classList.contains('_invalid')) validatePrice(input_min);
    })

    range_price_form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (+input_min.value > +input_max.value || +input_max.value < +input_min.value) {
            input_min.classList.add('_invalid');
            input_max.classList.add('_invalid');
        } else {
            input_min.classList.remove('_invalid');
            input_max.classList.remove('_invalid');

            //console.log('otpravka formi');

        }
    })

    function validatePrice(input) {
        let reg = /[^0-9]|^00|^01|^02|^03|^04|^05|^06|^07|^08|^09/;

        if (reg.test(input.value) || input.value.trim() === '') {
            input.classList.add('_invalid');
        } else {
            input.classList.remove('_invalid');
        }

        if (range_price_form.querySelectorAll('._invalid').length === 0) {
            range_price_form.querySelector('button').classList.remove('_disabled');
        } else {
            range_price_form.querySelector('button').classList.add('_disabled');
        }
    }
}

// Подсказки (prompt)
function prompt(device){
    // 1 - mob
    // 0 - desk
    let prompt_btns = document.querySelectorAll('.prompt-icon'),
        prompt = document.querySelectorAll('.prompt-content');

    prompt.forEach(item => {
        if (item.getBoundingClientRect().left <= 0){
            //console.log(item);
            item.classList.add('_right');
        }
    })

    if (prompt_btns.length !== 0){
        if (device){
            prompt_btns.forEach(item => {
                let parent = item.closest('.prompt');

                item.addEventListener('click', () => {
                    parent.classList.toggle('active');
                })
            })

            window.addEventListener("click", (e) => {
                if (e.target.closest('.prompt') === null){
                    prompt_btns.forEach(item => {
                        item.closest('.prompt').classList.remove('active');
                    })
                }
            })

        }else {
            prompt_btns.forEach(item => {
                let parent = item.closest('.prompt');
                item.addEventListener('mouseenter', () => {
                    parent.classList.add('active');
                })
                item.addEventListener('mouseleave', () => {
                    parent.classList.remove('active');
                })
            })
        }
    }
}
// Поиск в фильтре
let filter_search = document.querySelectorAll('.filter-search');

if (filter_search.length !== 0){
    filter_search.forEach(item => {
        let form_group_search = item.querySelector('.form-group__search'),
            input_search = form_group_search.querySelector('input'),
            icon = form_group_search.querySelector('.icon');
        let filters_name = item.querySelectorAll('.filter-param label');

        let block_hidden = item.querySelector('._hide-content'),
            btn_show = item.querySelector('.btn-hide');
        let j = true;
        //console.log(block_hidden);

        input_search.addEventListener('input', () => {
            form_group_search.classList.remove('has-error');
            let value = input_search.value;

            if (value.trim() !== ''){
                if (j && block_hidden !== null) {
                    block_hidden.classList.add('_show');
                    j = false;
                    btn_show.style.display = 'none';
                    // let prev_text = btn_show.textContent;
                    // block_hidden.classList.toggle('_show');
                    //
                    // btn_show.textContent = btn_show.dataset.hide;
                    // btn_show.dataset.hide = prev_text;
                }
                filters_name.forEach(name => {

                    if (name.textContent.toLocaleLowerCase().includes(value.toLocaleLowerCase())){
                        name.closest('.filter-param').classList.add('_highlight');
                        name.closest('.filter-param').classList.remove('_hide');
                    }else {
                        name.closest('.filter-param').classList.remove('_highlight');
                        name.closest('.filter-param').classList.add('_hide');
                    }
                })

                if (filters_name.length === item.querySelectorAll('._hide').length) form_group_search.classList.add('has-error');

                icon.classList.remove('_search');
                icon.classList.add('_close');
            }else {
                filters_name.forEach(name => {
                    name.closest('.filter-param').classList.remove('_highlight');
                    name.closest('.filter-param').classList.remove('_hide');
                })
            }
        })

        icon.addEventListener('click', () => {
            if (icon.classList.contains('_close')){
                filters_name.forEach(name => {
                    name.closest('.filter-param').classList.remove('_highlight');
                    name.closest('.filter-param').classList.remove('_hide');
                    form_group_search.classList.remove('has-error');
                    setTimeout(() => {
                        icon.classList.remove('_close');
                        icon.classList.add('_search');
                    }, 100)
                })
            }
        })

    })
}


if (document.querySelector('#select_sort_catalog') !== null){
    const select_sort_catalog = new CustomSelect('#select_sort_catalog');
}

let form_group = document.querySelectorAll('.form-group');

if (form_group.length !== 0) {
    form_group.forEach(item => {
        let input = item.querySelector('.form-control'),
            btn_close = item.querySelector('.icon');

        if (input !== null){
            if (btn_close !== null){
                btn_close.addEventListener('click', () => {
                    if (btn_close.classList.contains('_close')) {
                        input.value = '';
                        item.classList.remove('focus');
                    }
                })
            }


            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    item.classList.add('focus');
                } else {
                    item.classList.remove('focus');
                }
            })
        }
    })
}
// Интерактивная картка на главной
// Переключение Картка/список
let btn_map = document.querySelector('.interactive-map .js-btn-map'),
    btn_list = document.querySelector('.interactive-map .js-btn-list'),
    interactive_map_content = document.querySelector('.interactive-map .content-wrap');

if (interactive_map_content !== null){
    btn_map.addEventListener('click', () => {
        if (!btn_map.classList.contains('active')){
            btn_map.classList.add('active');
            btn_list.classList.remove('active');
            interactive_map_content.classList.remove('active');

            setInteractiveMapMargin();
        }
    })
    btn_list.addEventListener('click', () => {
        if (!btn_list.classList.contains('active')){
            btn_list.classList.add('active');
            btn_map.classList.remove('active');
            interactive_map_content.classList.add('active');

            setInteractiveMapMargin();
        }
    })

    setInteractiveMapMargin();
}

// Настройка отступов, если разная высота у карты и списка
function setInteractiveMapMargin(){
    let block = document.querySelector('.interactive-map .content-wrap');

    if (block){
        let map_height = document.querySelector('.interactive-map .map-wrap').clientHeight,
            list_height = document.querySelector('.interactive-map .list').clientHeight;

        const difference = Math.abs(map_height - list_height);

        if (map_height > list_height){
            if (block.classList.contains('active')){
                block.style.marginBottom = `-${difference}px`;
            }else {
                block.style.marginBottom = `0px`;
            }
        }if (list_height > map_height){
            if (block.classList.contains('active')){
                block.style.marginBottom = `0px`;
            }else {
                block.style.marginBottom = `-${difference}px`;
            }
        }
    }
}


// category_display == 0  - переход во вложеный список
// category_display == 1  - показывать все категории и подкатегории одним списком
const menu_data = {
    0: {
        section_name: 'Плитка',
        //section_img: '',
        section_link: 'plitka/',
        show_all_text: 'Дивитись всю плитку',
        category_display: 0,
        // action: {
        //     img: 'img/menu-catalog/action-1',
        //     text: 'Заповнювач швів Atis -50%',
        //     link: 'link-action-1'
        // },
        categories: {
            0: {
                name: 'Керамічна плитка та керамограніт',
                img: 'img/menu-catalog/plitka',
                link: '/link-cat-keramika',
                show_all_text: 'Дивитись всю керамічну плитку',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -10%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Плитка для ванної кімнати',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Плитка для кухні',
                        link: 'link-2',
                    },
                    2: {
                        name: 'Плитка для коридору',
                        link: 'link-3',
                    },
                    3: {
                        name: 'Плитка для підлоги',
                        link: 'link-4',
                    },
                    4: {
                        name: 'Плитка для стін',
                        link: 'link-5',
                    },
                    5: {
                        name: 'Керамограніт',
                        link: 'link-6',
                    },
                    6: {
                        name: 'Плитка великих форматів',
                        link: 'link-7',
                    },
                    7: {
                        name: 'Декоративні елементи',
                        link: 'link-8',
                    },
                }
            },
            1: {
                name: 'Клінкерна плитка',
                img: 'img/menu-catalog/klinkerna_plitka',
                link: '/link-cat-klinkernaplitka',
                show_all_text: 'Дивитись всю клінкерну плитку',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -5%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Клінкерна плитка для стін',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Клінкерна плитка для підлоги (фільтр)',
                        link: 'link-2',
                    },
                }
            },
            3: {
                name: 'Затирки (фуга)',
                img: 'img/menu-catalog/zatirka',
                link: '/link-cat-zatirka',
                show_all_text: 'Дивитись всю затирку',
                subcategories: {}
            },
        }
    },
    1: {
        section_name: 'Сантехніка',
        section_img: '',
        section_link: 'santehnika/',
        show_all_text: 'Дивитись всю сантехніку',
        category_display: 0,
        action: {
            img: 'img/menu-catalog/action-1',
            text: 'Заповнювач швів Atis -25%',
            link: 'link-action'
        },
        categories: {
            0: {
                name: 'Ванни',
                img: 'img/menu-catalog/categories/vanni',
                link: '/link-cat-vanni',
                show_all_text: 'Дивитись всі ванни',
                subcategories: {
                    0: {
                        name: 'Акрилові ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Ванни із штучного каменю',
                        link: 'link-2',
                    },
                    2: {
                        name: 'Кварилові ванни',
                        link: 'link-3',
                    },
                    3: {
                        name: 'Сталеві ванни',
                        link: 'link-4',
                    },
                    4: {
                        name: 'Чавунні ванни',
                        link: 'link-5',
                    },
                    5: {
                        name: 'Гідромасажні ванни',
                        link: 'link-6',
                    },
                }
            },
            1: {
                name: 'Комплектуючі для ванн',
                img: 'img/menu-catalog/categories/complectuyuji_dlya_vann',
                link: '/link-cat-kompl',
                show_all_text: 'Дивитись всі комплектуючі для ванн',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -99%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Ніжки для ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Каркаси для ванни',
                        link: 'link-1',
                    },
                    2: {
                        name: 'Панелі для ванни',
                        link: 'link-1',
                    },
                }
            }
        },
    },
    2: {
        section_name: 'Меблі і світло',
        section_img: '',
        section_link: 'mebli/',
        show_all_text: 'Дивитись всі меблі та світло',
        category_display: 0,
        action: {
            img: 'img/menu-catalog/action-1',
            text: 'Заповнювач швів Atis -25%',
            link: 'link-action'
        },
        categories: {
            0: {
                name: 'Ванни',
                img: 'img/menu-catalog/categories/vanni',
                link: '/link-cat-vanni',
                show_all_text: 'Дивитись всі ванни',
                subcategories: {
                    0: {
                        name: 'Акрилові ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Ванни із штучного каменю',
                        link: 'link-2',
                    },
                    2: {
                        name: 'Кварилові ванни',
                        link: 'link-3',
                    },
                    3: {
                        name: 'Сталеві ванни',
                        link: 'link-4',
                    },
                    4: {
                        name: 'Чавунні ванни',
                        link: 'link-5',
                    },
                    5: {
                        name: 'Гідромасажні ванни',
                        link: 'link-6',
                    },
                }
            },
            1: {
                name: 'Комплектуючі для ванн',
                img: 'img/menu-catalog/categories/complectuyuji_dlya_vann',
                link: '/link-cat-kompl',
                show_all_text: 'Дивитись всі комплектуючі для ванн',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -99%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Ніжки для ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Каркаси для ванни',
                        link: 'link-1',
                    },
                    2: {
                        name: 'Панелі для ванни',
                        link: 'link-1',
                    },
                }
            }
        },
    },
    3: {
        section_name: 'Мозаїка',
        section_img: '',
        section_link: 'mozaika/',
        show_all_text: 'Дивитись всю мозвїку',
        category_display: 0,
        action: {
            img: 'img/menu-catalog/action-1',
            text: 'Заповнювач швів Atis -25%',
            link: 'link-action'
        },
        categories: {
            0: {
                name: 'Ванни',
                img: 'img/menu-catalog/categories/vanni',
                link: '/link-cat-vanni',
                show_all_text: 'Дивитись всі ванни',
                subcategories: {
                    0: {
                        name: 'Акрилові ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Ванни із штучного каменю',
                        link: 'link-2',
                    },
                    2: {
                        name: 'Кварилові ванни',
                        link: 'link-3',
                    },
                    3: {
                        name: 'Сталеві ванни',
                        link: 'link-4',
                    },
                    4: {
                        name: 'Чавунні ванни',
                        link: 'link-5',
                    },
                    5: {
                        name: 'Гідромасажні ванни',
                        link: 'link-6',
                    },
                }
            },
            1: {
                name: 'Комплектуючі для ванн',
                img: 'img/menu-catalog/categories/complectuyuji_dlya_vann',
                link: '/link-cat-kompl',
                show_all_text: 'Дивитись всі комплектуючі для ванн',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -99%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Ніжки для ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Каркаси для ванни',
                        link: 'link-1',
                    },
                    2: {
                        name: 'Панелі для ванни',
                        link: 'link-1',
                    },
                }
            }
        },
    },
    4: {
        section_name: 'Будхімія',
        section_img: '',
        section_link: 'mebli/',
        show_all_text: 'Дивитись всю будхімію',
        category_display: 0,
        categories: {
            0: {
                name: 'Ванни',
                img: 'img/menu-catalog/categories/vanni',
                link: '/link-cat-vanni',
                show_all_text: 'Дивитись всі ванни',
                subcategories: {
                    0: {
                        name: 'Акрилові ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Ванни із штучного каменю',
                        link: 'link-2',
                    },
                    2: {
                        name: 'Кварилові ванни',
                        link: 'link-3',
                    },
                    3: {
                        name: 'Сталеві ванни',
                        link: 'link-4',
                    },
                    4: {
                        name: 'Чавунні ванни',
                        link: 'link-5',
                    },
                    5: {
                        name: 'Гідромасажні ванни',
                        link: 'link-6',
                    },
                }
            },
            1: {
                name: 'Комплектуючі для ванн',
                img: 'img/menu-catalog/categories/complectuyuji_dlya_vann',
                link: '/link-cat-kompl',
                show_all_text: 'Дивитись всі комплектуючі для ванн',
                action: {
                    img: 'img/menu-catalog/action-1',
                    text: 'Заповнювач швів Atis -99%',
                    link: 'link-action-1'
                },
                subcategories: {
                    0: {
                        name: 'Ніжки для ванни',
                        link: 'link-1',
                    },
                    1: {
                        name: 'Каркаси для ванни',
                        link: 'link-1',
                    },
                    2: {
                        name: 'Панелі для ванни',
                        link: 'link-1',
                    },
                }
            }
        },
    },

}


let menu_catalog = document.querySelector('.menu-catalog');
let category_block = document.querySelector('.menu-catalog .menu-catalog__wrap._category'); // Блок с категорией
let subcategory_block = document.querySelector('.menu-catalog .menu-catalog__wrap._subcategory'); // Блок с подкатегорией
let category_list_block = document.querySelector('.menu-catalog .menu-catalog__wrap._category-list'); // Блок с отображением сразу всех категорий и подкатегорий
let btn_cat_section = document.querySelectorAll('.menu-catalog .menu-catalog__wrap._section li');

btn_cat_section.forEach(btn_section => {
    btn_section.addEventListener('mouseenter', () => {
        let id = btn_section.dataset.id;

        removeClass(btn_cat_section, 'active');
        // console.log(menu_data[id]);
        btn_section.classList.add('active');

        if (breakpoint_desktop.matches){
            generateCategoriesList(menu_data[id], id);
        }else {
            if (menu_data[id].category_display) {
                generateCategoriesSublist(menu_data[id]);
            } else {
                generateCategoriesList(menu_data[id], id);
            }
        }
    })
})

function generateCategoriesList(data, section_id) {
    let ul = category_block.querySelector('ul');

    ul.innerHTML = '';
    if (subcategory_block.classList.contains('active')) subcategory_block.classList.remove('active');

    category_block.querySelector('.back').innerHTML = data.section_name;
    for (let key in data.categories) {
        let li = `
            <li data-section="${section_id}" data-category="${key}" onclick="generateSubcategory(${section_id}, ${key})">
                <div class="img">
                    <picture>
                        <source srcset="${data.categories[key].img}.webp" type="image/webp">
                        <img src="${data.categories[key].img}.jpg" loading="lazy" alt="">
                    </picture>
                </div>
                <p class="list-text">${data.categories[key].name}</p>
            </li>          
        `;
        ul.insertAdjacentHTML('beforeend', li);
    }

    if (breakpoint_desktop.matches){
        ul.insertAdjacentHTML('beforeend', `<li><a href="${data.section_link}" class="list-text show-all">${data.show_all_text}</a></li>`);
    }

    setTimeout(() => {
        if (category_block.closest('.wrapper-desk').clientHeight < category_block.clientHeight) {
            //console.log('tuta');
            category_block.closest('.wrapper-desk').style.height = category_block.clientHeight + 'px';
        }else {
            category_block.style.height = category_block.closest('.wrapper-desk').clientHeight + 'px';
            //console.log('vertuta');
        }
    }, 50)


    if (data.action !== undefined && !isEmptyObject(data.action)){
        category_block.querySelector('.menu-action').classList.remove('_hide');
        // category_block.querySelector('.menu-action').style.display = 'block';
        let action_img = category_block.querySelector('.action-img'),
            a = category_block.querySelector('.menu-action a');

        action_img.innerHTML = `
            <picture>
                <source srcset="${data.action.img}.webp" type="image/webp">
                <img src="${data.action.img}.jpg" loading="lazy" alt="">
            </picture>
        `;

        a.href = data.action.link;
        a.innerHTML = `<span>${data.action.text}</span>`;
    }else {
        category_block.querySelector('.menu-action').classList.add('_hide');
    }

    category_block.classList.add('active');

}

function generateCategoriesSublist(data) {
    let categories = data.categories;
    category_list_block.querySelector('.back').innerHTML = data.section_name;

    let cat_list = category_list_block.querySelector('.cat-list');
    cat_list.innerHTML = '';
    let list_subcategories;
    for (let key in categories) {
        let category = categories[key];

        let item = document.createElement('div');
        item.className = 'item';

        if (category.subcategories === undefined || isEmptyObject(category.subcategories)) {
            item.insertAdjacentHTML('beforeend', `
                <div class="img">
                    <picture>
                        <source srcset="${category.img}.webp" type="image/webp">
                        <img src="${category.img}.jpg" loading="lazy" alt="">
                    </picture>
                </div>
            `);
            item.insertAdjacentHTML('beforeend', `
                <a href="${category.link}" class="subcategory_name">${category.name}</a>
            `);

        } else {
            list_subcategories = document.createElement('ul');
            for (let key_subcat in category.subcategories) {
                list_subcategories.insertAdjacentHTML('beforeend', `
                    <li><a href="${category.subcategories[key_subcat].link}">${category.subcategories[key_subcat].name}</a></li>
               `);
            }

            item.insertAdjacentHTML('beforeend', `
                <div class="img">
                    <picture>
                        <source srcset="${category.img}.webp" type="image/webp">
                        <img src="${category.img}.jpg" loading="lazy" alt="">
                    </picture>
                </div>
            `);
            item.insertAdjacentHTML('beforeend', `
                <p class="subcategory_name">${category.name}</p>
            `);

            item.insertAdjacentElement('beforeend', list_subcategories);

            item.insertAdjacentHTML('beforeend', `
            <a href="${category.link}" class="link_category">Дивитися все</a>
        `);
        }

        cat_list.insertAdjacentElement('beforeend', item);
        category_list_block.classList.add('active');

    }
}

function generateSubcategory(section_id, category_id) {
    let category = menu_data[section_id].categories[category_id];
    let subcategories = category.subcategories;

    subcategory_block.querySelector('.back').innerHTML = menu_data[section_id].section_name;
    let ul = subcategory_block.querySelector('ul');
    ul.innerHTML = '';

    subcategory_block.querySelector('.subcategory_name').innerHTML = category.name;
    subcategory_block.querySelector('.img').innerHTML = `
        <picture>
            <source srcset="${category.img}.webp" type="image/webp">
            <img src="${category.img}.jpg" loading="lazy" alt="">
        </picture>`;

    subcategory_block.querySelector('.link_category').href = category.link;

    for (let key in subcategories) {
        let li = `
              <li><a href="${subcategories[key].link}">${subcategories[key].name}</a></li>
        `;
        ul.insertAdjacentHTML('beforeend', li);
    }

    if (breakpoint_desktop.matches){
        subcategory_block.querySelector('.back').innerHTML = category.name;
        ul.insertAdjacentHTML('beforeend', `<li><a href="${category.link}" class="list-text show-all">${category.show_all_text}</a></li>`);
    }

    if (category.action !== undefined && !isEmptyObject(category.action)){
        subcategory_block.querySelector('.menu-action').classList.remove('_hide');
        // category_block.querySelector('.menu-action').style.display = 'block';
        let action_img = subcategory_block.querySelector('.action-img'),
            a = subcategory_block.querySelector('.menu-action a');

        action_img.innerHTML = `
            <picture>
                <source srcset="${category.action.img}.webp" type="image/webp">
                <img src="${category.action.img}.jpg" loading="lazy" alt="">
            </picture>
        `;

        a.href = category.action.link;
        a.innerHTML = `<span>${category.action.text}</span>`;
    }else {
        subcategory_block.querySelector('.menu-action').classList.add('_hide');
    }

    subcategory_block.classList.add('active');
    // console.log(subcategories);
}

// Каталог, назад
let btn_close_category = category_block.querySelector('.js-close-category');
let btn_close_subcategory = subcategory_block.querySelector('.js-close-subcategory');
let btn_close_category_list = category_list_block.querySelector('.js-close-category_list');

btn_close_subcategory.addEventListener('click', () => {
    subcategory_block.classList.remove('active');
})
btn_close_category.addEventListener('click', () => {
    category_block.classList.remove('active');
})
btn_close_category_list.addEventListener('click', () => {
    category_list_block.classList.remove('active');
})

// Закрыть / Открыть каталог
let btn_close_cat_menu = document.querySelectorAll('.js-close-catalog-menu'),
    btn_open_cat_menu = document.querySelectorAll('.js-btn-open-menu-cat'),
    btn_toggle_cat_menu = document.querySelectorAll('.js-btn-toggle-menu-cat')
    overlay_header = document.querySelector('.overlay-header'),
    header = document.querySelector('header');

btn_toggle_cat_menu.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.hidden-header').classList.remove('active');
        document.body.classList.toggle('_hide_scroll');
        menu_catalog.classList.toggle('active');
        overlay_header.classList.toggle('active');
    })
})

btn_open_cat_menu.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.hidden-header').classList.remove('active');
        document.body.classList.add('_hide_scroll');
        menu_catalog.classList.add('active');
        overlay_header.classList.add('active');
    })
})

overlay_header.addEventListener('click', () => {
    document.body.classList.remove('_hide_scroll');
    menu_catalog.classList.remove('active');
    overlay_header.classList.remove('active');
})

btn_close_cat_menu.forEach(btn => {
    btn.addEventListener('click', () => {
        subcategory_block.classList.remove('active');
        category_block.classList.remove('active');
        category_list_block.classList.remove('active');
        menu_catalog.classList.remove('active');
        document.body.classList.remove('_hide_scroll');
        overlay_header.classList.remove('active');
    })
})

// POPUP
let popup_btns = document.querySelectorAll('.js-open-popup'),
    overlay_popup = document.querySelector('.overlay-popup'),
    popups = document.querySelectorAll('.popup');

// Open POPUP
if (popup_btns.length !== 0){
    popup_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            let popup_name = btn.dataset.popupName;

            document.body.classList.add('_hide_scroll');
            document.querySelector(`.${popup_name}`).classList.add('active');
            overlay_popup.classList.add('active');
        })
    })
}
//Close Popup
let close_popup_btns = document.querySelectorAll('.js-close-popup');
if (close_popup_btns.length !== 0){
    close_popup_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.remove('_hide_scroll');
            overlay_popup.classList.remove('active');
            btn.closest('.popup').classList.remove('active');
        })
    })
}

overlay_popup.addEventListener('click', function (){
    overlay_popup.classList.remove('active');
    document.body.classList.remove('_hide_scroll');
    removeClass(popups, 'active');
})

function showAlert(type, title, description){
    // type: success, error
    let alert = document.querySelector(`.alert.alert-${type}`);

    if (alert !== undefined && alert !== null){
        if (title !== false){
            alert.querySelector('.popup-title').innerHTML = title;
        }
        if (description !== false){
            alert.querySelector('.alert-desc').innerHTML = description;
        }

        document.body.classList.add('_hide_scroll');
        overlay_popup.classList.add('active');
        alert.classList.add('active');
    }
}

// Comparison
let controlButton_listener = true;
window.addEventListener('load', () => {
    let comparison_main, comparison_params;

    comparison_params = new Swiper('.comparison-content .slider-params', {
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2.3,
                freeMode: true,
                // spaceBetween: 20
            },
        },
        on: {
            slideNextTransitionStart: function (swiper){
                comparison_main.slideTo(swiper.activeIndex, 500);
            },
            slidePrevTransitionStart: function (swiper){
                comparison_main.slideTo(swiper.activeIndex, 500);
            },
        },
    })
    comparison_main = new Swiper('.comparison-content .main-slider', {
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 20,
            },
        },
        on: {
            slideNextTransitionStart: function (swiper){
                comparison_params.slideTo(swiper.activeIndex, 500);
            },
            slidePrevTransitionStart: function (swiper){
                comparison_params.slideTo(swiper.activeIndex, 500);
            },
        },
    });

    let param_elements = document.querySelectorAll('.comparison-content .slider-params .swiper-slide');
    let param_elem_title = document.querySelectorAll('.slider-params__wrapper .sidebar .item');

    if (param_elements.length !== 0){
        let count = param_elements[0].querySelectorAll('.item').length;
        for (let i = 0; i < count; i++){
            let max_height = 0;
            param_elements.forEach(item => {
                if (item.querySelectorAll('.item')[i].clientHeight > max_height){
                    max_height = item.querySelectorAll('.item')[i].clientHeight;
                }
            })
            setHeight(max_height, i);
        }

        function setHeight(height, index){
            param_elem_title[index].style.height = height + 'px';
            param_elements.forEach(item => {
                item.querySelectorAll('.item')[index].style.height = height + 'px';
            })
        }
    }
})

function showControlButton(tg){
    let parent = tg.closest('.element-control');

    if (parent.classList.contains('active')){
        let control_button = document.querySelectorAll('.element-control');
        control_button.forEach(item => {item.classList.remove('active')});

        parent.classList.remove('active');
    }else {
        let control_button = document.querySelectorAll('.element-control');
        control_button.forEach(item => {item.classList.remove('active')});

        parent.classList.add('active');
    }

    if (controlButton_listener){
        window.addEventListener('click', (e) => {
            if (!e.target.closest('.element-control')) {
                document.querySelectorAll('.element-control').forEach(item => {
                    item.classList.remove('active');
                });
            }
        })
        controlButton_listener = false;
    }
}

// Blog
//Слайдер на странице каталога
function enableSliderBlogCatalog(){
    slider_blog = new Swiper('.last-news__slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        allowTouchMove: false,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },
    });
}

// Like / dislike
function reviewVotes(tg, action){
    // action - лайк или дизлайк
    if (tg.classList.contains('active')){
        tg.classList.remove('active');
    }else {
        tg.classList.add('active');
    }
}

// Страница категории блога
function blogCategory(){
    let category_list = document.querySelector('.category-list'),
        btn_more = document.querySelector('.btn-more');
        show_item = 6; // Сколько показывать запсией (6 - телефон, 15 - десктоп)

    if (category_list !== null){
        let posts = category_list.querySelectorAll('.cart-blog');
        if (breakpoint_mob.matches || breakpoint_tablet.matches){

            for (let i = posts.length-1; i >= show_item; --i){
                posts[i].remove();
            }

        }else {
            show_item = 15;

        }

        btn_more.dataset.show = show_item;
    }

    let tabs = document.querySelectorAll('.js-tab-news');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (){
            removeClass(tabs, 'active');
            tab.classList.add('active');

            let response = fetch('https://newsapi.org/v2/top-headlines?country=ua&apiKey=24a2fd9a342e4f2085eac4219ec90dd8')
                .then(response => response.json())
                .then(function (json){
                    if (json.status === 'ok'){
                        let news = json.articles;

                        category_list.innerHTML = '';

                        for (let i = 0; i <= show_item; i++){
                            let {urlToImage, title} = news[i];
                            let post = `
                                <div class="cart-blog item _anim-items _anim-no-hide" data-start="4">
                                    <div class="blog-tags">
                                        <div class="blog-tag">Експерти</div>
                                    </div>
                                    <a href="">
                                        <div class="img">
<!--                                            <picture>-->
<!--                                                <source srcset="img/blog/img-1.webp" type="image/webp">-->
<!--                                                <img src="img/blog/img-1.jpg" loading="lazy" alt="">-->
<!--                                            </picture>-->
                                            <img src="${urlToImage}" loading="lazy" alt="">
                                        </div>
                                        <div class="info">
                                            <p class="name">${title}</p>
                                            <div class="bottom">
                                                <p class="date">24 лютого</p>
                                                <div class="stat">
                                                    <div class="viewed">${getRndInteger(0, 100)}</div>
                                                    <div class="comments">${getRndInteger(0, 20)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            `;
                            category_list.insertAdjacentHTML('beforeend', post);
                        }

                        animation();
                    }else {
                        return false;
                    }
                })
        })
    })
}
blogCategory();

// Сортировка комментариев на странице блога
if (document.querySelector('#select_sort_comments') !== null){
    const select_review_sort = new CustomSelect('#select_sort_comments');
}
// Faq opened
let faq = document.querySelectorAll('._js-faq');
if (faq.length !== 0){
    faq.forEach(faq_item => {
        let faq_content = faq_item.querySelector('._js-faq-content'),
            faq_title = faq_item.querySelector('._js-faq-title');

        faq_content.style.setProperty('--height-faq', faq_content.clientHeight + 'px');
        faq_content.style.maxHeight = '0px';

        faq_title.addEventListener('click', () => {
            faq_title.closest('._js-faq').classList.toggle('active');
        })

    })
}
function recalcFaqHeight(block){
    let faq_content = block.querySelectorAll('._js-faq-content');

    faq_content.forEach(item => {
        item.style = '';
        item.style.setProperty('--height-faq', item.clientHeight + 'px');
        item.style.maxHeight = '0px';
    })
}

// Open Popup Cart
const btn_open_cart = document.querySelector('._js-open-modal-car'),
      modal_cart = document.querySelector('._js-cart-modal');

if (btn_open_cart){
    btn_open_cart.addEventListener('click', () => {
        modal_cart.classList.add('active');
    })
}


// Для теста, можно удалять!!
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


// Проверка обекта на пустоту
function isEmptyObject(obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}


