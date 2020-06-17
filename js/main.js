'use strict';

var AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHEKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_MIN = 500;
var PRICE_MAX = 500000;


// получаем элементы с классом map__pin. Используем селектор.
// var pins = document.querySelectorAll('.map__pin');
// верхний template в начале страницы
var mapPins = document.querySelector('.map__pins');
// кнопка в template с id = #pin
var pin = document.querySelector('#pin').content.querySelector('button');

// переключаем карту в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var generatedPins = [];

// получаем рандомное число
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// получаем рандомный элемент массива
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

// генерируем список похожих объявлений
var generateRentList = function () {
  for (var i = 0; i < 8; i++) {
    generatedPins.push({
      'author': {
        'avatar': 'img/avatars/user' + AVATARS[i] + '.png',
      },
      'offer': {
        'title': 'Объявление №' + i,
        'address': {
          'x': getRandomNumber(130, 630),
          'y': getRandomNumber(130, 630)
        },
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': getRandomElement(HOUSE_TYPE),
        'rooms': getRandomNumber(1, 4),
        'guests': getRandomNumber(1, 10),
        'checkin': getRandomElement(CHECKIN),
        'checkout': getRandomElement(CHEKOUT),
        'features': getRandomElement(FEATURES),
        'description': 'Описание №' + i,
        'photos': getRandomElement(PHOTOS)
      },
      'location': {
        'x': getRandomNumber(130, 630),
        'y': getRandomNumber(130, 630)
      }
    });
  }
};
generateRentList();

// рендерим на страницу метки
var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < generatedPins.length; j++) {
    var pinElement = pin.cloneNode(true);
    var currentPin = generatedPins[j];
    var pinImage = pinElement.querySelector('img');

    pinElement.style.top = currentPin.location.y + 'px';
    pinElement.style.left = currentPin.location.x + 'px';
    pinImage.alt = 'currentPin.offer.title + j';
    pinImage.src = currentPin.author.avatar;

    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};
renderPins();
