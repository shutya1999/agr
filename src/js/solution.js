let slider_elements;
window.onload = function (){
    if (document.querySelector('.grid') !== null){
        var msnry = new Masonry( '.grid', {
            itemSelector: '.item',
            columnWidth: '.item',
            gutter: 20,
            percentPosition: true,
            transitionDuration: 0
        });
    }
}

if (document.querySelector('.slider-header') !== null){
    const slider_header = new Swiper('.slider-header', {
        pagination: {
            el: '.swiper-pagination',
        },
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

    if (breakpoint_desktop.matches){
        if (slider_elements !== undefined){
            slider_elements.destroy(true, true);
        }
        // Подсветить точку при клике на товар
        let elements = document.querySelectorAll('.img-elements .elem'),
            marks = document.querySelectorAll('.solution-products .mark');

        elements.forEach(elem => {
            elem.addEventListener('click', () => {
                let elem_id = +elem.dataset.id,
                    elem_index = +elem.dataset.slideIndex;

                marks.forEach(mark => {
                    let mark_id = +mark.dataset.id,
                        mark_index = +mark.dataset.slideIndex;
                    if (elem_id === mark_id && elem_index === mark_index){
                        removeClass(elements, 'active');
                        removeClass(marks, 'active');

                        elem.classList.add('active');
                        mark.classList.add('active');
                    }
                })
            })
        })
    }else {
        enableSliderElements();
    }
    function enableSliderElements(){
        slider_elements = new Swiper('.slider-elements', {
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: false
            },
            on: {
                slideChange: function () {
                    let active_index = this.activeIndex;
                    let marks = this.el.closest('.item').querySelectorAll('.mark');
                    marks.forEach(mark => {
                        if (+mark.dataset.slideIndex === +active_index){
                            removeClass(marks, 'active');
                            mark.classList.add('active');
                        }
                    })
                    // console.log(marks);
                },
            },
        });
    }
}

function placeMark(){
    let images = document.querySelectorAll('.js-block-marks img'),
        imgLoadCounter = 0;


    imagesLoaded( document.querySelector('.js-block-marks'), function( instance ) {
        let marks = document.querySelectorAll('.js-mark:not(.init)');

        if (marks.length !== 0){
            marks.forEach(mark => {
                let parent = mark.closest('.js-mark-img'),
                    point = mark.querySelector('.point'),
                    desc = mark.querySelector('.mark-description');

                point.style.left = `${mark.dataset.left}%`;
                point.style.top = `${mark.dataset.top}%`;

                desc.style.left = `calc(${mark.dataset.left}% - ${desc.clientWidth}px)`;
                desc.style.top = `calc(${mark.dataset.top}% - ${desc.clientHeight + 15}px)`;

                let coords_parent = getCoords(parent),
                    coords_desc = getCoords(desc);

                //Если блок описания выходит за левый край
                if (desc.getBoundingClientRect().left <= parent.getBoundingClientRect().left){
                    let offset_left = coords_parent.left - coords_desc.left;
                    desc.style.transform = `translateX(${offset_left + 10}px)`
                }

                //Если блок описания выходит за верхний край
                if ((getCoords(parent).top - getCoords(desc).top) >= 0){
                    desc.style.top = `calc(${mark.dataset.top}% + 15px)`;
                }

                mark.classList.add('init');
            })
            markShow(marks);
            showFirstMark();
        }
    });
}
placeMark();
setTimeout(() => {
    placeMark();
    console.log('init');
}, 1000)

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

function markShow(marks){
    marks.forEach(mark => {
        mark.querySelector('.point').addEventListener('click', () => {
            if (mark.classList.contains('active')){
                mark.classList.toggle('active');
            }else {
                removeClass(mark.closest('.js-mark-img').querySelectorAll('.mark'), 'active');
                mark.classList.toggle('active');
                if (mark.dataset.id !== undefined){
                    const id = mark.dataset.id,
                          slide_index = +mark.dataset.slideIndex;

                    if (slider_elements !== undefined){
                        slider_elements.forEach(slider => {
                            if (slider.el.id === `element-${id}`){
                                slider.slideTo(slide_index, 500);
                            }
                        })
                    }else {
                        let slides = mark.closest('.content').querySelectorAll('.elem');
                        removeClass(slides, 'active');
                        slides.forEach(elem => {
                            if (+elem.dataset.slideIndex === slide_index){
                                let parent = elem.closest('.slider-elements');
                                let scroll = elem.offsetTop - ((parent.clientHeight / 2) - (elem.clientHeight / 2));

                                parent.scrollTo({
                                    left: 0,
                                    top: scroll,
                                    behavior: 'smooth'
                                });
                                elem.classList.add('active');
                            }
                        })
                    }
                }
            }
        })
    })
}
function showFirstMark(){
    let items = document.querySelectorAll('.js-block-marks .item');

    items.forEach(item => {
        item.querySelector('.mark').classList.add('active');
    })
}
