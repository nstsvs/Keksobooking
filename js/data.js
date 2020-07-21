'use strict';

(function () {

  var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHEKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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

  var houseTypeAliases = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var mapPins = document.querySelector('.map__pins');

  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // получение рандомного элемента массива
  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  // перемешивание массива
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // рандомные элементы перемешанного массива
  var generateRandomArray = function (array) {
    var result = [];
    var resultLength = getRandomNumber(1, array.length);
    shuffleArray(array);

    for (var i = 0; i < resultLength; i++) {
      result.push(array[i]);
    }
    return result;
  };

  // список похожих объявлений
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
  var generatedRents = generateRentList(OFFERS_COUNT);

  window.data = {
    OFFERS_COUNT: OFFERS_COUNT,
    HOUSE_TYPE: HOUSE_TYPE,
    houseTypeAliases: houseTypeAliases,
    mapPins: mapPins,
    generatedRents: generatedRents
  };
})();
