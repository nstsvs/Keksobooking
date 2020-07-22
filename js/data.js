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

  // список похожих объявлений
  var generateRentList = function (count) {
    var resultArray = [];
    for (var i = 0; i < count; i++) {
      var locationX = window.util.getRandomNumber(MAP_X_MIN, MAP_X_MAX);
      var locationY = window.util.getRandomNumber(MAP_Y_MIN, MAP_Y_MAX);
      resultArray.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': 'Объявление №' + i,
          'address': locationX + ', ' + locationY,
          'price': window.util.getRandomNumber(PRICE_MIN, PRICE_MAX),
          'type': window.util.getRandomElement(HOUSE_TYPE),
          'rooms': window.util.getRandomNumber(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
          'guests': window.util.getRandomNumber(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
          'checkin': window.util.getRandomElement(CHECKIN),
          'checkout': window.util.getRandomElement(CHEKOUT),
          'features': window.util.generateRandomArray(FEATURES),
          'description': 'Описание №' + i,
          'photos': window.util.generateRandomArray(PHOTOS),
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
    generatedRents: generatedRents,
    MAP_X_MIN: MAP_X_MIN,
    MAP_X_MAX: MAP_X_MAX,
    MAP_Y_MIN: MAP_Y_MIN,
    MAP_Y_MAX: MAP_Y_MAX
  };
})();
