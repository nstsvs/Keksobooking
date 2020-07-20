'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var offerFormRoomNumber = adForm.querySelector('#room_number');
  var offerFormCapacity = adForm.querySelector('#capacity');

  var offerFormPrice = adForm.querySelector('#price');
  var offerFormType = adForm.querySelector('#type');
  var offerFormTimeIn = adForm.querySelector('#timein');
  var offerFormTimeOut = adForm.querySelector('#timeout');

  var offerTypesMinPrices = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  // валидация количества комнат и гостей
  var guestsValidation = function () {
    if (offerFormRoomNumber.value !== '100' && offerFormCapacity.value === '0') {
      offerFormCapacity.setCustomValidity('Укажите количество гостей');
    } else if (offerFormRoomNumber.value === '100' && offerFormCapacity.value !== '0') {
      offerFormCapacity.setCustomValidity('100 комнат - не для гостей');
    } else if (offerFormRoomNumber.value < offerFormCapacity.value) {
      offerFormCapacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      offerFormCapacity.setCustomValidity('');
    }
  };

  guestsValidation();

  // валидация полей 'Тип жилья' и 'Цена за ночь'
  var minPriceValidation = function () {
    offerFormPrice.min = offerTypesMinPrices[offerFormType.value];
    offerFormPrice.placeholder = offerTypesMinPrices[offerFormType.value];
  };

  // валидация поля 'Время заезда и выезда'
  var onOfferTimeInChange = function () {
    offerFormTimeOut.value = offerFormTimeIn.value;
  };

  var onOfferTimeOutChange = function () {
    offerFormTimeIn.value = offerFormTimeOut.value;
  };

  offerFormCapacity.addEventListener('change', guestsValidation);
  offerFormRoomNumber.addEventListener('change', guestsValidation);
  offerFormType.addEventListener('change', minPriceValidation);
  offerFormTimeIn.addEventListener('change', onOfferTimeInChange);
  offerFormTimeOut.addEventListener('change', onOfferTimeOutChange);
})();
