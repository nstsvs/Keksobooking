'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var offerFormAddress = adForm.querySelector('#address');

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

  disableElements(adFormElements);
  disableElements(mapFilters);

  var addMainPinAddress = function (isPageActivate) {
    var mainPinX = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
    var mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT / 2;
    if (isPageActivate === true) {
      mainPinY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
    }
    offerFormAddress.value = Math.round(mainPinX) + ', ' + Math.round(mainPinY);
    offerFormAddress.readOnly = true;
  };
  addMainPinAddress();

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableElements(adFormElements, mapFilters);
    enableElements(mapFilters);
    window.pin.renderPins(window.data.generatedRents);
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

  mainPin.addEventListener('mousedown', onMousePageActivate);
  mainPin.addEventListener('keydown', onKeyboardPageActivate);
})();
