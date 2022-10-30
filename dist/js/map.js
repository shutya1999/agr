let style_map = [
    {
        "stylers": [
            {
                "saturation": -100
            }
        ]
    }
];
const data_city = {
    0: {
        name: 'Україна',
        lat: 48.7363835,
        lng: 28.384574,
        zoom: 6
    },
    1: {
        name: 'Київ',
        lat: 50.4021702,
        lng: 30.3926086,
        zoom: 11
    },
    2: {
        name: 'Харків',
        lat: 49.9947277,
        lng: 36.1457427,
        zoom: 11
    },
    3: {
        name: 'Львів',
        lat: 49.840406,
        lng: 23.9820104,
        zoom: 13
    }

};
const data_shop = {
    1: [
        {
            city: 'Київ',
            name: 'АГРОМАТ A',
            description: 'вул. Академіка Булаховського, 4',
            link: 'test-link-1',
            prod_id: [4,1,2,3],
            img: 'img/index/photo-map_1',
            lat: 50.47559736571341,
            lng: 30.351345341150015
        },
        {
            city: 'Київ',
            name: 'АГРОМАТ В',
            description: 'вул. Академіка Булаховського, 2/1',
            link: 'test-link-2',
            prod_id: [1,2],
            img: 'img/index/photo-map_1',
            lat: 50.47559736571341,
            lng: 30.350799375786238
        },
        {
            city: 'Київ',
            name: 'АГРОМАТ',
            description: 'проспект Валерія Лобановського, 120',
            link: 'test-link-3',
            prod_id: [1],
            img: 'img/index/photo-map_1',
            lat: 50.40826846738166,
            lng: 30.498270530493357
        },
    ],
    2: [
        {
            city: 'Харків',
            name: 'АГРОМАТ',
            description: 'Харків пров. Банний, 1',
            link: 'test-link-4',
            prod_id: [1],
            img: 'img/index/photo-map_1',
            lat: 49.98598989786035,
            lng: 36.228227326849456
        },
        {
            city: 'Харків',
            name: 'АГРОМАТ A',
            description: 'вул. Алчевських, 15',
            link: 'test-link-5',
            prod_id: [1],
            img: 'img/index/photo-map_1',
            lat: 50.00333099322014,
            lng: 36.24093962700625
        },
    ],
    3: [
        {
            city: 'Львів',
            name: 'АГРОМАТ Б',
            description: 'вул. Б. Хмельницького, 11',
            link: 'test-link-6',
            prod_id: [1],
            img: 'img/index/photo-map_1',
            lat: 49.84624972110488,
            lng: 24.028823625158203
        },
        {
            city: 'Львів',
            name: 'АГРОМАТ',
            description: 'вул. Грабовського, 11',
            link: 'test-link-7',
            prod_id: [3,5],
            img: 'img/index/photo-map_1',
            lat: 49.834121642607144,
            lng: 24.026758227001636
        },
        {
            city: 'Львів',
            name: 'АГРОМАТ',
            description: 'вул. Городницька, 47',
            link: 'test-link-8',
            prod_id: [7],
            img: 'img/index/photo-map_1',
            lat: 49.862485665331256,
            lng: 24.037317253993532
        },
    ]
};

// import {sayHi, sayBye} from './say.js';

// Initialize and add the map
let map;
function initMap(city_id, shops) {
    console.log(document.getElementById("map"))
    let maps_position = {
        zoom: data_city[city_id].zoom,
        center: {
            lat: data_city[city_id].lat,
            lng: data_city[city_id].lng,
        }
    }

    const infoWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
    });

    map = new google.maps.Map(document.getElementById("map"), maps_position);
    map.setOptions({styles: style_map});

    // let locations = getMarker(city_id);

    for (let city_key in shops) {
        //console.log()
        let locations = shops[city_key];
        const markers = locations.map((position, i) => {
            let marker = new google.maps.Marker({
                position,
                icon: '/img/marker-icon.png'
            });

            marker.addListener("click", () => {
                infoWindow.setContent(generateMapPrompt(position));
                infoWindow.open(map, marker);
            });
            return marker;
        });
        const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
    }
}

function getMarker(city_id){
    let markers = [];

    if (city_id !== 0){
        data_shop[city_id].forEach(shop => {
            markers.push(shop)
        })
    }else {
        for (let city_shop in data_shop) {
            data_shop[city_shop].forEach(shop => {
                markers.push(shop)
            })
        }
    }
    return markers;
}

function moveMap(city_id){
    map.panTo(new google.maps.LatLng(data_city[city_id].lat,data_city[city_id].lng));
    map.setZoom(data_city[city_id].zoom);
}

function generateMapPrompt(data){
    let {name, city, description, link} = data;

    return `
        <a href="${link}">
            <div class="map-prompt__city">${city}</div>
            <div class="map-prompt__name">${name}</div>
            <div class="map-prompt__description">${description}</div>
        </a>       
    `;
}

window.addEventListener('load', () => {
    initMap(0, data_shop);
})

function generateListShop(data) {

    //console.log(data);
}


// Выпадающие списки
if (document.querySelector('#select_map-city') !== null){
    let select_map_city = new CustomSelect('#select_map-city');
    let select_map_product = new CustomSelect('#select-map-product');

    document.querySelector('#select_map-city').addEventListener('select.change', () => {
        let shops = filterShop(+select_map_city.value, +select_map_product.value);

        initMap(+select_map_city.value, shops);
        generateListIndex(+select_map_city.value, shops);
        setInteractiveMapMargin();
    })

    document.querySelector('#select-map-product').addEventListener('select.change', () => {
        let shops = filterShop(+select_map_city.value, +select_map_product.value);

        initMap(+select_map_city.value, shops);
        generateListIndex(+select_map_city.value, shops);
        setInteractiveMapMargin();
    })
}

function filterShop(city_id, prod_id){
    let shops = {};
    if (city_id !== 0){
        shops[city_id] = data_shop[city_id];
    }else {
        shops = data_shop
    }

    let filtered_shops = {};
    if (prod_id !== 0){
        for (let city_key in shops) {
            let arr = [];
            let shop = shops[city_key];
            for (let i = 0; i < shop.length; i++){
                if (shop[i]['prod_id'].includes(prod_id)){
                    arr.push(shop[i]);
                    filtered_shops[city_key] = arr;
                }
            }
        }
        return filtered_shops;
    }else {
        return shops;
    }
}

function generateListIndex(city_id, shops){
    let list_block = document.querySelector('._js-map_list');
    let total = 0; // Всего магазинов
    let city_name = data_city[city_id].name;

    if (list_block !== null){
        // let not_found_block = document.querySelector('.interactive-map .display-content .shop-not-found');
        list_block.innerHTML = '';
        let lim = 0; // Сколько магазинов выводить

        if (!isEmptyObject(shops)){
            // not_found_block.classList.remove('active');
            for (let city_key in shops) {
                let shop = shops[city_key];
                for (let i = 0; i < shop.length; i++){
                    if (lim < 10){
                        let {name, city, description, link, img} = shop[i];
                        let list_item = `
                            <div class="list-item">
                                <a href="${link}" class="link">
                                    <p class="city">${city}</p>
                                    <p class="name">${name}</p>
                                    <p class="description">${description}</p>
                                    <span class="arrow">Деталі</span>
                                    <span class="img">
                                        <picture>
                                            <source srcset="${img}.webp" type="image/webp">
                                            <img src="${img}.jpg" loading="lazy" alt="">
                                        </picture>
                                    </span>
                                </a>
                            </div>
                        `;
                        list_block.insertAdjacentHTML('beforeend', list_item);
                        lim++;
                    }
                    total++;
                }
            }
        }else {
            // not_found_block.classList.add('active');
        }

        document.querySelector('._js-total_shop_find ._city').innerHTML = city_name;
        document.querySelector('._js-total_shop_find ._count').innerHTML = total;
        // //console.log(total);

    }
}
