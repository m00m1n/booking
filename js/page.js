'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  var activatePage = function () {
    if (!window.isPageActive) {
      window.server.download(window.data.onSuccess, window.message.error);
      window.isPageActive = true;
    }

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activate();
    window.form.addEvtListeners();
    window.filter.addEvtListener();
    window.filter.activate();
    window.mainPin.removeEvtListeners();
  };

  var resetState = function () {
    window.isPageActive = false;
    window.dataFiltered = null;
    window.card.remove();
    window.pin.delete();
    window.mainPin.reset();
    window.mainPin.addEvtListeners();
    window.form.deactivate();
    window.form.removeEvtListeners();
    window.filter.reset();
    window.filter.deactivate();

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  resetState();

  window.page = {
    activate: activatePage,
    deactivate: resetState
  };
})();
