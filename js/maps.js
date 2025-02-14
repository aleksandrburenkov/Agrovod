import obg from './coordplacemarks.js';

ymaps.ready(function () {
    let geoObjects = [];
    let myMap = new ymaps.Map('map', {
        center: [53.243275888659575, 34.3729001680176],
        behaviors: ['default', 'scrollZoom'],
        zoom: 5.5,
        controls: [],
    });
    let myMapTo = new ymaps.Map('maps', {
        center: [53.21465257122406, 34.43811999999997],
        behaviors: ['default', 'scrollZoom'],
        zoom: 16,
        controls: [],
    });
    var myPlacemark = new ymaps.Placemark(
        [53.21465257122406, 34.43811999999997],
        {
            iconContent: `<strong  style='color:blue';>ООО АГРОВОД </strong>`,
            balloonContentHeader: 'г. Брянск, пер. Московский 10Б',
            balloonContentBody: 'Тел.+7(903)818-18-67 ',
            balloonContentFooter: 'Пн-Пт: 9:00 - 18.00',
        },
        {
            preset: 'islands#darkGreenStretchyIcon',
        }
    );

    let clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedDarkBlueClusterIcons',
        gridSize: 64,
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        clusterNumbers: [5],
        hasBalloon: true,
        hasHint: true,
        showInAlphabeticalOrder: true,
        zoomMargin: 100,
        clusterDisableClickZoom: false,
    });

    obg.forEach((elem, index) => {
        geoObjects[index] = new ymaps.Placemark(
            [elem][0][0],
            {
                balloonContentHeader: elem[1],
                balloonContentBody: elem[2],
                balloonContentFooter: '',
            },
            {
                iconLayout: 'default#image',
                iconImageHref: 'images/mark.png',
                iconImageSize: [47, 67],
                iconImageOffset: [-20, -60],
            }
        );
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
    myMapTo.geoObjects.add(myPlacemark);
    myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange: true,
    });
});

const mapTitle = document.createElement('div');
const before = document.createElement('div');
mapTitle.className = 'work__map-title';
before.className = 'work__map-before';
mapTitle.textContent = 'Для активации карты нажмите по ней';
map.appendChild(mapTitle);
map.appendChild(before);
before.addEventListener('click', (e) => {
    if (e.target) {
        before.style.cssText = 'display:none; transition: all .5s ease 0s;';
    }
});

before.onmousemove = function (event) {
    mapTitle.style.display = 'block';

    if (event.offsetY > 10) mapTitle.style.top = event.offsetY + 25 + 'px';
    if (event.offsetX > 10) mapTitle.style.left = event.offsetX + 25 + 'px';
};

before.onmouseleave = function () {
    mapTitle.style.display = 'none';
};
