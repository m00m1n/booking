'use strict';

(function () {
  var houseTypeToName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setAdFieldRequiredValue = function (element, data) {
    // Выведите заголовок объявления offer.title в заголовок .popup__title
    element.querySelector('.popup__title').textContent = data.offer.title;
    // Выведите адрес offer.address в блок .popup__text--address
    element.querySelector('.popup__text--address').textContent = data.offer.address;
    // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь
    element.querySelector('.popup__text--price').textContent = data.offer.price;
    // В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
    element.querySelector('.popup__type').textContent = houseTypeToName[data.offer.type];
    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
    element.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
  };

  var setAdFieldFeaturesValue = function (element, data) {
    if (data.offer.features.length === 0) {
      element.querySelector('.popup__features').classList.add('hidden');
    } else {
      element.querySelector('.popup__features').innerHTML = '';

      for (var i = 0; i < data.offer.features.length; i++) {
        var newItem = document.createElement('li');
        newItem.className = 'popup__feature popup__feature--' + data.offer.features[i];
        element.querySelector('.popup__features').appendChild(newItem);
      }
    }
  };

  var setAdFieldDescValue = function (element, data) {
    if (data.offer.description === 0) {
      element.querySelector('.popup__description').classList.add('hidden');
    } else {
      element.querySelector('.popup__description').textContent = data.offer.description;
    }
  };

  var setAdPhoto = function (element, data) {
    var photoWrapper = element.querySelector('.popup__photos');
    var similarPhotoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
    if (data.offer.features.length === 0) {
      photoWrapper.style.cssText = 'display: none';
    } else {
      // ищем блок для фото, чтобы очистить его содержимое
      photoWrapper.innerHTML = ''; // тут чистим его содержимое, теперь он пустой

      for (var i = 0; i < data.offer.photos.length; i++) {
        var newPhoto = similarPhotoTemplate.cloneNode(true);
        newPhoto.src = data.offer.photos[i];
        photoWrapper.appendChild(newPhoto);
      }
    }
  };

  var checkAvatar = function (element, data) {
    if (data.author.avatar) {
      element.querySelector('.popup__avatar').src = data.author.avatar;
    } else {
      element.querySelector('.popup__avatar').classList.add('hidden');
    }
  };

  var renderCard = function (offer) {
    var adCard = adCardTemplate.cloneNode(true);
    // вставляем значения в обязательные поля
    setAdFieldRequiredValue(adCard, offer);
    // В список .popup__features выведите все доступные удобства в объявлении.
    setAdFieldFeaturesValue(adCard, offer);
    // В блок .popup__description выведите описание объекта недвижимости offer.description.
    setAdFieldDescValue(adCard, offer);
    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
    setAdPhoto(adCard, offer);
    // Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.
    checkAvatar(adCard, offer);

    return adCard;
  };

  var insertCard = function (offer) {
    // тк попап показывается только один, а пользователь может кликнуть на метку в момент, когда текущий открыт, то сперва проверяем открыта ли карточка, если да закрываем
    if (map.querySelector('.popup')) {
      removeCard();
    }

    var card = renderCard(offer);
    var mapFiltersContainer = map.querySelector('.map__filters-container');
    map.insertBefore(card, mapFiltersContainer);

    var cardPopup = map.querySelector('.popup'); // После того как вставили находим этот карточку
    var cardCloseBtn = cardPopup.querySelector('.popup__close');
    cardCloseBtn.focus();

    cardCloseBtn.addEventListener('click', removeCard); // слушаем клик на крестике для закрытия
    document.addEventListener('keydown', onMapKeydown);
  };

  var onMapKeydown = function (evt) {
    window.util.actionIfEscEvent(evt, function () {
      removeCard();
    });
  };

  var removeCard = function () {
    var cardPopup = map.querySelector('.popup');
    var currentPin = map.querySelector('.map__pin--active');
    if (map.querySelector('.popup')) {
      cardPopup.querySelector('.popup__close').removeEventListener('click', removeCard);
      document.removeEventListener('keydown', onMapKeydown);

      cardPopup.remove();
      currentPin.classList.remove('map__pin--active');
    }
  };

  window.card = {
    show: insertCard,
    remove: removeCard
  };
})();
