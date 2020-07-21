'use strict';

(function () {

  var pinButtonTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapFiltersContainer = document.querySelector('map__filters-container');
  var map = document.querySelector('.map');

  var renderPins = function (offers) {
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
        var card = window.card.renderCardPopup(targetOffer);
        map.insertBefore(card, mapFiltersContainer);
      });
    }
    window.data.mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
