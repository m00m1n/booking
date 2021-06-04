'use strict';

(function () {
  var OFFERS_NUMBER = 5;

  var mapPins = document.querySelector('.map__pins');

  var onSuccessData = function (data) {
    getOffersData(data);
  };

  var getOffersData = function (data) {
    var offersArray = data.filter(function (obj) {
      return (obj.offer !== undefined);
    });
    window.dataFiltered = offersArray;
    insertIntoMap(window.dataFiltered);
  };

  // вставляем пины на карту
  var insertIntoMap = function (arr) {
    renderSimmiliarOffers(arr);
    window.pin.addListeners(arr);
  };

  // вставляем пины
  var renderSimmiliarOffers = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var elementIndex = i;
      if (elementIndex === OFFERS_NUMBER) {
        break;
      } else {
        fragment.appendChild(window.pin.create(arr[i]));
      }
    }
    mapPins.appendChild(fragment);
  };

  window.data = {
    onSuccess: onSuccessData,
    render: renderSimmiliarOffers,
    insert: insertIntoMap
  };
})();
