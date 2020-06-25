'use strict';

var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHEKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PRICE_MIN = 500;
var PRICE_MAX = 10000;
var OFFERS_COUNT = 8;
var MAP_X_MIN = 0;
var MAP_X_MAX = 1200;
var MAP_Y_MIN = 130;
var MAP_Y_MAX = 630;
var MIN_ROOMS_NUMBER = 1;
var MAX_ROOMS_NUMBER = 4;
var MIN_GUESTS_NUMBER = 1;
var MAX_GUESTS_NUMBER = 10;

// получаем элементы с классом map__pin. Используем селектор.
// var pins = document.querySelectorAll('.map__pin');
// верхний template в начале страницы
var mapPins = document.querySelector('.map__pins');

// переключаем карту в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

// перемешиваем массив
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// получаем рандомные элементы перемешанного массива
var generateRandomArray = function (array) {
  var result = [];
  var resultLength = getRandomNumber(1, array.length);
  shuffleArray(array);

  for (var i = 0; i < resultLength; i++) {
    result.push(array[i]);
  }
  return result;
};

// получаем алиас типа жилья
var getHouseType = function (offerType) {
  var houseType = '';
  switch (offerType) {
    case 'flat':
      houseType = 'Квартира';
      break;
    case 'bungalo':
      houseType = 'Бунгало';
      break;
    case 'house':
      houseType = 'Дом';
      break;
    case 'palace':
      houseType = 'Дворец';
      break;
  }
  return houseType;
};

// генерируем список похожих объявлений
var generateRentList = function (count) {
  var resultArray = [];
  for (var i = 0; i < count; i++) {
    var locationX = getRandomNumber(MAP_X_MIN, MAP_X_MAX);
    var locationY = getRandomNumber(MAP_Y_MIN, MAP_Y_MAX);
    resultArray.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': 'Объявление №' + i,
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': getRandomElement(HOUSE_TYPE),
        'rooms': getRandomNumber(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
        'guests': getRandomNumber(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
        'checkin': getRandomElement(CHECKIN),
        'checkout': getRandomElement(CHEKOUT),
        'features': generateRandomArray(FEATURES),
        'description': 'Описание №' + i,
        'photos': generateRandomArray(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return resultArray;
};
var generatedPins = generateRentList(OFFERS_COUNT);

// кнопка в template с id = #pin
var pin = document.querySelector('#pin').content.querySelector('button');

// рендерим на страницу метки
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var pinElement = pin.cloneNode(true);
    var currentPin = pins[i];
    var pinImage = pinElement.querySelector('img');

    pinElement.style.top = currentPin.location.y + 'px';
    pinElement.style.left = currentPin.location.x + 'px';
    pinImage.alt = currentPin.offer.title;
    pinImage.src = currentPin.author.avatar;

    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};
renderPins(generatedPins);

var templatePopup = document.querySelector('#card').content.cloneNode(true);

var renderCardPopup = function () {

  var firstPin = generatedPins[0];

  var mapCard = templatePopup.querySelector('.map__card');
  var popupAvatar = mapCard.querySelector('.popup__avatar');
  var popupTitle = mapCard.querySelector('.popup__title');
  var popupAddress = mapCard.querySelector('.popup__text--address');
  var popupPrice = mapCard.querySelector('.popup__text--price');
  var popupCapacity = mapCard.querySelector('.popup__text--capacity');
  var popupFeatures = mapCard.querySelector('.popup__features');
  var popupTime = mapCard.querySelector('.popup__text--time');
  var popupDescription = mapCard.querySelector('.popup__description');
  var popupPhotos = mapCard.querySelector('.popup__photos').querySelector('.popup__photo');

  var mapSection = document.querySelector('.map');

  var houseType = getHouseType(firstPin.offer.type);
  mapCard.querySelector('.popup__type').textContent = houseType;

  popupFeatures.textContent = firstPin.offer.features;
  popupAvatar.src = firstPin.author.avatar;
  popupTitle.textContent = firstPin.offer.title;
  popupAddress.textContent = firstPin.offer.address.x + ' ' + firstPin.offer.address.y;
  popupPrice.textContent = firstPin.offer.price + ' ₽/ночь';
  popupCapacity.textContent = firstPin.offer.rooms + ' комнаты' + ' для ' + firstPin.offer.guests + ' гостей';
  popupTime.textContent = 'Заезд после ' + firstPin.offer.checkin + ', ' + 'выезд до ' + firstPin.offer.checkout;
  popupDescription.textContent = firstPin.offer.description;
  popupPhotos.src = firstPin.offer.photos;

  var renderFeaturesList = function () {
    var popupFeaturesCount = generateRandomArray(FEATURES);
    popupFeatures.innerHTML = [];

    for (var i = 0; i < popupFeaturesCount.length; i++) {
      var liElem = document.createElement('li');
      liElem.classList.add('popup__feature');
      liElem.classList.add('popup__feature--' + popupFeaturesCount[i]);
      popupFeatures.appendChild(liElem);
    }
  };
  renderFeaturesList(popupFeatures);

  var mapContainer = mapSection.children[1];
  mapSection.insertBefore(templatePopup, mapContainer);
};
renderCardPopup(templatePopup);
