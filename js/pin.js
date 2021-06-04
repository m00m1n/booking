'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  // отрисовка пина с аватаркой на карте
  var renderOfferItem = function (offer) {
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var offerItem = mapPinTemplate.cloneNode(true);
    var img = offerItem.querySelector('img');

    offerItem.style.left = (offer.location.x - PinSize.WIDTH / 2) + 'px';
    offerItem.style.top = (offer.location.y - PinSize.HEIGHT) + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.description;

    return offerItem;
  };

  // слушаем нажатие на пины с объявлениями
  var adPinsAllClickListener = function (arr) {
    var allAdPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main'); // массив всех меток, исключая главную

    var addPinClickListener = function (pin, i) {
      var onPinClickCard = function () {
        var numberOffer = i;

        window.card.show(arr[numberOffer]);
        pin.classList.add('map__pin--active');
      };
      pin.addEventListener('click', onPinClickCard);
    };

    // теперь слушаем клик на _каждом_ пине, кроме первой
    allAdPins.forEach(function (element, i) {
      addPinClickListener(element, i);
    });
  };

  // удаление пинов
  var removePins = function () {
    var allAdPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main');
    allAdPins.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    create: renderOfferItem,
    delete: removePins,
    addListeners: adPinsAllClickListener
  };
})();
