'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersContainer = document.querySelector('map__filters-container');

  window.util.disableElements(mapFilters);
  window.form.addMainPinAddress(false, mainPin.offsetLeft, mainPin.offsetTop);

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.util.enableElements(mapFilters);

    var pinsHtml = window.pin.renderList(window.data.generatedRents, map, mapFiltersContainer);
    mapPins.appendChild(pinsHtml);

    window.form.addMainPinAddress(true, mainPin.offsetLeft, mainPin.offsetTop);
    mainPin.removeEventListener('mousedown', onMousePageActivate);
    mainPin.removeEventListener('keydown', onKeyboardPageActivate);
  };

  var activatePage = function () {
    activateMap();
    window.form.activate();
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

  window.map = {
    mainPin: mainPin
  };
})();
