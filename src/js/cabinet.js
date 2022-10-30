let code_inputs = document.querySelectorAll('.input-code');
for (let i = 0; i < code_inputs.length; i++){
    code_inputs[i].addEventListener('input', (e) => {
        let input = code_inputs[i],
            next_input = code_inputs[i + 1],
            value = (e.data === null) ? '' : e.data.replace(regExp_number, '');

        input.value = value;

        if (value.trim() !== '' && !regExp_number.test(value)){
            if (i === code_inputs.length - 1){
                sendCode();
            }else {
                next_input.focus();
            }
        }
    })

    code_inputs[i].addEventListener('keyup', (e) => {
        if (e.keyCode === 8 || e.keyCode === 37){
            if (code_inputs[i - 1] !== undefined){
                code_inputs[i - 1].focus();
            }
        }
        if (e.keyCode === 39){
            if (code_inputs[i + 1] !== undefined){
                code_inputs[i + 1].focus();
            }
        }
    })
}
function clearCodeInput(){
    for (let i = 0; i < code_inputs.length; i++){
        code_inputs[i].value = '';
    }
}
function sendCode(){
    let valid = true;
    let code_block = document.querySelector('.cabinet-code');
    for (let i = 0; i < code_inputs.length; i++){
        if (code_inputs[i].value.trim() === ''){
            valid = false;
            code_block.classList.add('has-error');
            break;
        }
    }

    if (valid){
        code_block.classList.remove('has-error');
        // Відправка коду на перевірку
        console.log('Send Code');
    }
}

// Login
let login_block = document.querySelector('.cabinet-login.login');
if (login_block){
    let login_next = document.querySelector('.next-step'),
        login_prev = document.querySelector('.prev-step'),
        form_login = document.querySelector('.form-login'),
        phone_input = form_login.querySelector('._js-mask-phone'),
        cur_step = 0;

    login_next.addEventListener('click', (e) => {
        e.preventDefault();
        let phone_valid = phone_input.inputmask.isComplete();

        if (phone_valid){
            phone_input.closest('.form-group').classList.remove('has-error');
            // Тут відправка номера телефону
            // ..
            //
            // phone_input.inputmask.unmaskedvalue() - номер телефону без маски

            login_block.querySelector('.cabinet-login__step-wrapper').style.setProperty('--step', 1);
            code_inputs[0].focus();
        }else {
            phone_input.closest('.form-group').classList.add('has-error');
        }
    })
    login_prev.addEventListener('click', (e) => {
        e.preventDefault();
        clearCodeInput();
        // cur_step = 0;
        login_block.querySelector('.cabinet-login__step-wrapper').style.setProperty('--step', 0);
        phone_input.value = '';
        phone_input.closest('.form-group').classList.remove('has-error');
        phone_input.closest('.form-group').classList.remove('focus');
    })

    let btn_send_code = document.querySelector('.btn-send-code');

    btn_send_code.addEventListener('click', (e) => {
        e.preventDefault();
        sendCode();

    })
}


// Edit user profile
// Select city/ Для доставки Агромат (Склад)
if (document.querySelector('#select-city')){
    const select_city = new CustomSelect('#select-city', {
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
}

let forms_edit = document.querySelectorAll('.form-edit form');

if (forms_edit.length > 0){
    forms_edit.forEach(form => {

        let btn_edit = form.querySelector('.item-top .edit');
        console.log(btn_edit);
        btn_edit.addEventListener('click', () => {
            form.classList.add('_editing');

        })
    })
}

// History
function handlerMap(btn){
    btn.closest('._js-order-map').classList.toggle('_map-visible');
    let cur_text = btn.textContent;
    btn.innerHTML = btn.dataset.text;
    btn.dataset.text = cur_text;
}

overlay_popup.addEventListener('click', () => {
    document.querySelectorAll('._js-history-item').forEach(item => {
        item.classList.remove('active');
    })
})
function openHistory(){
    let visible_items = document.querySelectorAll('._js-history-item .item-visible:not(._init)');

    visible_items.forEach(item => {

        item.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('btn-arrow')){
                target.closest('._js-history-item').classList.toggle('active');
            }else {
                if (breakpoint_mob.matches){
                    console.log('fff');
                    target.closest('._js-history-item').classList.add('active');
                    overlay_popup.classList.add('active');
                    document.body.classList.add('_hide_scroll');
                }
            }
        })

        item.classList.add('_init');
    })
}
openHistory();

function closeHistory(elem){
    elem.closest('._js-history-item').classList.remove('active');
    overlay_popup.classList.remove('active');
    document.body.classList.remove('_hide_scroll');
}

// History card
function historyCards(){
    let history_card_items = document.querySelectorAll('._js-show-history-card:not(_init)');
    history_card_items.forEach(card => {
        card.addEventListener('click', () => {
            card.closest('.card').classList.toggle('active');
        })
        card.classList.add('_init');
    })
}
historyCards();
