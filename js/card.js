'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content;

  var renderFeaturesList = function (element, features) {
    for (var i = 0; i < features.length; i++) {
      var liElem = document.createElement('li');
      liElem.classList.add('popup__feature');
      liElem.classList.add('popup__feature--' + features[i]);
      element.appendChild(liElem);
    }
  };

  var renderPhotosList = function (photos, element) {
    element.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      element.insertAdjacentHTML('beforeend', '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
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

    var houseType = window.data.houseTypeAliases[rentInfo.offer.type];
    mapCard.querySelector('.popup__type').textContent = houseType;

    popupFeatures.innerHTML = '';
    renderFeaturesList(popupFeatures, rentInfo.offer.features);

    popupAvatar.src = rentInfo.author.avatar;
    popupTitle.textContent = rentInfo.offer.title;
    popupAddress.textContent = rentInfo.offer.address.x + ' ' + rentInfo.offer.address.y;
    popupPrice.textContent = rentInfo.offer.price + ' ₽/ночь';
    popupCapacity.textContent = rentInfo.offer.rooms + ' комнаты' + ' для ' + rentInfo.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + rentInfo.offer.checkin + ', ' + 'выезд до ' + rentInfo.offer.checkout;
    popupDescription.textContent = rentInfo.offer.description;

    mapCard.querySelector('.popup__close').addEventListener('click', function () {
      mapCard.remove();
      document.removeEventListener('keydown', onKeyboardCloseCard);
    });

    document.addEventListener('keydown', onKeyboardCloseCard);

    return popupTemplate;
  };

  var onKeyboardCloseCard = function (evt, mapCard) {
    if (evt.key === 'Escape') {
      mapCard.remove();
    }
    document.removeEventListener('keydown', onKeyboardCloseCard);
  };

  window.card = {
    renderCardPopup: renderCardPopup
  };
})();
