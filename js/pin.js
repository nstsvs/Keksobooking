'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 85;

  var pinButtonTemplate = document.querySelector('#pin').content.querySelector('button');

  var renderPins = function (offers, parentContaier, beforeContainer) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var pinElement = pinButtonTemplate.cloneNode(true);
      var currentOffer = offers[i];
      var pinImage = pinElement.querySelector('img');

      pinElement.style.top = currentOffer.location.y + 'px';
      pinElement.style.left = currentOffer.location.x + 'px';
      pinImage.alt = currentOffer.offer.title;
      pinImage.src = currentOffer.author.avatar;
      pinElement.dataset.id = i;

      fragment.appendChild(pinElement);

      pinElement.addEventListener('click', function (event) {
        var pin = event.currentTarget;
        var pinId = Number(pin.dataset.id);
        var targetOffer = offers[pinId];
        var card = window.card.render(targetOffer);
        parentContaier.insertBefore(card, beforeContainer);
      });
    }
    return fragment;
  };

  window.pin = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    renderList: renderPins
  };
})();
