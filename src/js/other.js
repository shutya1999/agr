// Factories
if (document.querySelector('#factories-select-brand') !== null){
    const select_brand = new CustomSelect('#factories-select-brand');
}
if (document.querySelector('#factories-select-brand') !== null){
    const select_country = new CustomSelect('#factories-select-country');
}

// wholesale
if (document.querySelector('#factories-select-area') !== null){
    const select_area = new CustomSelect('#factories-select-area');
}
if (document.querySelector('#factories-select-region') !== null){
    const select_region = new CustomSelect('#factories-select-region');
}

// Video
let video_control_btn = document.querySelectorAll('._js-control-video');

if (video_control_btn.length !== 0){
    video_control_btn.forEach(btn => {
        btn.addEventListener('click', () => {
            let status = +btn.dataset.status,
                video = btn.closest('._js-video-parent').querySelector('video');

            // console.log(video);
            // console.log(video.played);

            if (video.paused){
                video.play();
                btn.closest('._js-video-parent').classList.remove('_paused');
                btn.closest('._js-video-parent').classList.add('_played');
            }else {
                video.pause();
                btn.closest('._js-video-parent').classList.remove('_played');
                btn.closest('._js-video-parent').classList.add('_paused');
            }
        })
    })
}

// Promotion single page
// Slider
let promo_single_slider = new Swiper('.slider-promotion', {
    speed: 500,
    navigation: {
        nextEl: '.arrow-right',
        prevEl: '.arrow-left',
    },
    on: {
        init: function (swiper) {
            highlightSliderArrowOnClick(swiper);
        }
    },
})

// Выбор города (promotion-single)
if (document.querySelector('#select_city-shop') !== null){
    const select_city = new CustomSelect('#select_city-shop');
}

