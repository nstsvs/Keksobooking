'use strict';

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
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 85;

// получаем элементы с классом map__pin. Используем селектор.
// var pins = document.querySelectorAll('.map__pin');
// верхний template в начале страницы
var mapPins = document.querySelector('.map__pins');

// переключаем карту в активное состояние
var map = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('map__filters-container');
// map.classList.remove('map--faded');

// кнопка в template с id = #pin
var pinButtonTemplate = document.querySelector('#pin').content.querySelector('button');

var cardTemplate = document.querySelector('#card').content;

var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('.ad-form__element');
var offerFormAddress = adForm.querySelector('#address');
var offerFormRoomNumber = adForm.querySelector('#room_number');
var offerFormCapacity = adForm.querySelector('#capacity');

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
var houseTypeAliases = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
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
var generatedRents = generateRentList(OFFERS_COUNT);

// рендерим на страницу метки
var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var pinElement = pinButtonTemplate.cloneNode(true);
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
renderPins(generatedRents);

var renderFeaturesList = function (element, features) {
  for (var i = 0; i < features.length; i++) {
    var liElem = document.createElement('li');
    liElem.classList.add('popup__feature');
    liElem.classList.add('popup__feature--' + features[i]);
    element.appendChild(liElem);
  }
};

var renderPhotosList = function (photos, element) {
  var photoElem = element.querySelector('.popup__photo');
  element.innerHTML = '';
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photo = photoElem.cloneNode(true);
    photo.src = photos[i];
    fragment.appendChild(photo);
  }
  element.appendChild(fragment);
};

var renderCardPopup = function (rentInfo) {
  var popupTemplate = cardTemplate.cloneNode(true);

  var mapCard = popupTemplate.querySelector('.map__card');
  var popupAvatar = mapCard.querySelector('.popup__avatar');
  var popupTitle = mapCard.querySelector('.popup__title');
  var popupAddress = mapCard.querySelector('.popup__text--address');
  var popupPrice = mapCard.querySelector('.popup__text--price');
  var popupCapacity = mapCard.querySelector('.popup__text--capacity');
  var popupFeatures = mapCard.querySelector('.popup__features');
  var popupTime = mapCard.querySelector('.popup__text--time');
  var popupDescription = mapCard.querySelector('.popup__description');
  var popupPhotos = mapCard.querySelector('.popup__photos');

  renderPhotosList(rentInfo.offer.photos, popupPhotos);

  var houseType = houseTypeAliases[rentInfo.offer.type];
  mapCard.querySelector('.popup__type').textContent = houseType;

  popupFeatures.innerHTML = [];
  renderFeaturesList(popupFeatures, rentInfo.offer.features);

  popupAvatar.src = rentInfo.author.avatar;
  popupTitle.textContent = rentInfo.offer.title;
  popupAddress.textContent = rentInfo.offer.address.x + ' ' + rentInfo.offer.address.y;
  popupPrice.textContent = rentInfo.offer.price + ' ₽/ночь';
  popupCapacity.textContent = rentInfo.offer.rooms + ' комнаты' + ' для ' + rentInfo.offer.guests + ' гостей';
  popupTime.textContent = 'Заезд после ' + rentInfo.offer.checkin + ', ' + 'выезд до ' + rentInfo.offer.checkout;
  popupDescription.textContent = rentInfo.offer.description;

  return popupTemplate;
};
// var cardPopup = renderCardPopup(generatedRents[0]);
// map.insertBefore(cardPopup, mapFiltersContainer);

var disableElements = function (elementsCollection) {
  for (var i = 0; i < elementsCollection.length; i++) {
    elementsCollection[i].setAttribute('disabled', 'disabled');
  }
};

var enableElements = function (elementsCollection) {
  for (var i = 0; i < elementsCollection.length; i++) {
    elementsCollection[i].removeAttribute('disabled');
  }
};

disableElements(adFormElements, mapFilters);

// Активация страницы
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableElements(adFormElements, mapFilters);
  renderPins();
  addMainPinAddress(true);
  mainPin.removeEventListener('mousedown', onMousePageActivate);
  mainPin.removeEventListener('keydown', onKeyboardPageActivate);
};

var onMousePageActivate = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

var onKeyboardPageActivate = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
};

// Получение и заполнения поля адреса главной метки
var addMainPinAddress = function (isPageActivate) {
  var mainPinX = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
  var mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
  if (isPageActivate === true) {
    mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
  }
  offerFormAddress.value = Math.round(mainPinX) + ', ' + Math.round(mainPinY);
  offerFormAddress.readOnly = true;
};

// Валидация количетсва комнат и гостей
var guestsValidationHandler = function () {
  if (offerFormRoomNumber.value !== '100' && offerFormCapacity.value === '0') {
    offerFormCapacity.setCustomValidity('Укажите количество гостей');
  } else if (offerFormRoomNumber.value < offerFormCapacity.value) {
    offerFormCapacity.setCustomValidity('Количество гостей не может превышать количество комнат');
  } else if (offerFormRoomNumber.value === '100' && offerFormCapacity.value !== '0') {
    offerFormCapacity.setCustomValidity('100 комнат - не для гостей');
  } else {
    offerFormCapacity.setCustomValidity('');
  }
};

addMainPinAddress();
mainPin.addEventListener('mousedown', onMousePageActivate);
mainPin.addEventListener('keydown', onKeyboardPageActivate);
offerFormCapacity.addEventListener('change', guestsValidationHandler);
