// Аккордеон карточки
function setAccordionHeightCards(){
    const items = document.querySelectorAll('.checkout-card');
    if (items.length > 0){
        items.forEach(item => {
            const top = item.querySelector('.card-top'),
                bottom = item.querySelector('.card-bottom');

            bottom.style.maxHeight = bottom.querySelector('.card-bottom__wrapper').clientHeight + 'px';

            top.removeEventListener('click', handler);
            top.addEventListener('click', handler);

            function handler(){
                // console.log('dddd');
                bottom.classList.toggle('_hide');
            }
        })
    }
}
// Если нужно изменить высоту конкретного аккордеона
function setAccordionHeightCard(card){
    const bottom = card.querySelector('.card-bottom');

    bottom.style.maxHeight = bottom.querySelector('.card-bottom__wrapper').clientHeight + 'px';
    // console.log('dadada');
}
window.addEventListener('load', () => {
    const checkoutBlock = document.querySelector('.checkout');

    // высота для других аккордеонов
    let accordion_items = document.querySelectorAll('._js-checkout-accordion');
    accordion_items.forEach(item => {
        item.style.setProperty('--height', item.clientHeight + 'px');
        item.style.maxHeight = '0px';
    })

    //  Аккордеон для карточек в чекауте
    setAccordionHeightCards();

    // Промокод (показать/скрыть)
    let btn_show_promocode = document.querySelectorAll('._js-show-promocode');
    if (btn_show_promocode.length !== 0){
        btn_show_promocode.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('._js-promocode').classList.add('active');
                setAccordionHeightCard(document.querySelector('.card-cost'));
            })
        })
    }

    // Переключатель способа доставки
    const btns_delivery = document.querySelectorAll('._js-btn-delivery'),
          delivery_items = document.querySelectorAll('._js-item-delivery'),
          delivery_radio = document.querySelectorAll('.delivery-radio input');

    // let delivery_data = {
    //     deliveryService: 0,
    // };

    // Выбор службы доставки
    btns_delivery.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            checkoutBlock.style.setProperty('--del-type', index);
            removeClass(delivery_items, 'active');
            delivery_items[index].classList.add('active');
            setAccordionHeightCard(document.querySelector('.card-delivery'));
        })
    })
    // Выбор конкретного способа доставки
    const delivery_info_block = document.querySelector('.delivery-info'),
          delivery_info_items = delivery_info_block.querySelectorAll('.item');

    delivery_radio.forEach((input, index) => {
        input.addEventListener('change', () => {
            delivery_info_block.classList.remove('vis');
            delivery_info_block.style.setProperty('--del-info-counter', index);
            setTimeout(() => {
                removeClass(delivery_info_items, 'active');
                delivery_info_items[index].classList.add('active');
                setAccordionHeightCard(document.querySelector('.card-delivery'));
                delivery_info_block.classList.add('vis');
            }, 150)
        })
    })

    // Показать/скрыть коммент к заказу
    const comment_checkbox = document.querySelector('#comment-checkbox'),
          comment_textarea = document.querySelector('#comment');

    comment_checkbox.addEventListener('change', () => {
        if (comment_checkbox.checked){
            comment_textarea.closest('.form-group').classList.add('active');
        }else {
            comment_textarea.closest('.form-group').classList.remove('active');
        }
        setAccordionHeightCard(document.querySelector('.card-delivery'));
    })

    // Получатель
    let recipient = document.querySelectorAll('.recipient');

    recipient.forEach(item => {
        let recipient_checkbox = item.querySelector('input[type="checkbox"]'),
            recipient_hidden = item.querySelector('.recipient-data');

        recipient_checkbox.addEventListener('input', () => {
            if (recipient_checkbox.checked){
                recipient_hidden.classList.add('active');
            }else {
                recipient_hidden.classList.remove('active');
            }
            setAccordionHeightCard(document.querySelector('.card-delivery'));
        })
    })

    // Выбор способа оплаты
    let payment_items = document.querySelectorAll('._js-payment');
    payment_items.forEach(item => {
        let radio = item.querySelector('[type="radio"]');

        radio.addEventListener('input', () => {
            removeClass(payment_items, 'active');
            item.classList.add('active');
            setAccordionHeightCard(document.querySelector('.card-payment'));
        })

    })

    // Select city/ Для доставки Агромат (Склад)
    const select_city_agromat_stock = new CustomSelect('#select-city_agromat_stock', {
        name: 'delivery-city', // значение атрибута name у кнопки
        targetValue: '0',
        search: true,
        // placeholder: 'ddd',
        options: [
            ['0', 'Київ'],
            ['1', 'Харків'],
            ['2', 'Одеса'],
            ['3', 'Полтава']
        ], // опции
    });
    // Select city/ Для доставки Агромат (Киев и область)
    const select_city_agromat_kiev = new CustomSelect('#select-city_agromat_kiev', {
        name: 'delivery-city', // значение атрибута name у кнопки
        targetValue: '0',
        search: true,
        options: [
            ['0', 'Київ'],
            ['1', 'Вишневе'],
            ['2', 'Бровари'],
            ['3', 'Буча']
        ], // опции
    });
    // Select city/ Для доставки Агромат (Киев и область)
    const select_city_agromat_ukraine = new CustomSelect('#select-city_agromat_ukraine', {
        name: 'delivery-city', // значение атрибута name у кнопки
        targetValue: '0',
        search: true,
        options: [
            ['0', 'Київ'],
            ['1', 'Харків'],
            ['2', 'Одеса'],
            ['3', 'Полтава']
        ], // опции
    });

    // Select city/ Выбор города Новой почты (отделение)
    const select_city_np_city = new CustomSelect('#select-city_np-city', {
        name: 'delivery-city', // значение атрибута name у кнопки
        targetValue: '0',
        search: true,
        options: [
            ['0', 'Київ'],
            ['1', 'Харків'],
            ['2', 'Одеса'],
            ['3', 'Полтава']
        ], // опции
    });
    // Select city/ Выбор отделения Новой почты
    const select_city_np_department = new CustomSelect('#select-city_np-department', {
        name: 'delivery-city', // значение атрибута name у кнопки
        // targetValue: '0',
        search: true,
        options: [
            ['0', 'Відділення №1'],
            ['1', 'Відділення №2'],
            ['2', 'Відділення №3'],
            ['3', 'Відділення №4']
        ], // опции
    });
    // Select city/ Выбор города Новой почты (курьер)
    const select_city_np_courier = new CustomSelect('#select-city_np-courier', {
        name: 'delivery-city', // значение атрибута name у кнопки
        // targetValue: '0',
        // placeholder: ''
        search: true,
        options: [
            ['0', 'Київ'],
            ['1', 'Харків'],
            ['2', 'Одеса'],
            ['3', 'Полтава']
        ], // опции
    });

})
window.addEventListener('resize', setAccordionHeightCards);
