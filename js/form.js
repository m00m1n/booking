'use strict';

(function () {
  var HouseMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var addForm = document.querySelector('.ad-form');
  var addFormFields = addForm.querySelectorAll('fieldset');
  var addFormAddress = addForm.querySelector('#address');
  var addFormPrice = addForm.querySelector('#price');
  var addFormType = addForm.querySelector('#type');
  var addFormTimeGroup = addForm.querySelector('.ad-form__element--time');
  var addFormTimeIn = addForm.querySelector('#timein');
  var addFormTimeOut = addForm.querySelector('#timeout');
  var addFormRooms = addForm.querySelector('#room_number');
  var addFormGuests = addForm.querySelector('#capacity');

  var addFormResetBtn = addForm.querySelector('.ad-form__reset');

  // валидация формы
  // Вспомогательная функция для изменения минимального значение поля цены
  var changeMinPrice = function (value) {
    addFormPrice.setAttribute('min', value);
    addFormPrice.setAttribute('placeholder', value);
  };

  // Изменение минимальной цены при выборе типа жилья
  var onPriceChange = function (evt) {
    var value = evt.target.value;
    switch (value) {
      case 'bungalo':
        changeMinPrice(HouseMinPrice.BUNGALO);
        break;
      case 'flat':
        changeMinPrice(HouseMinPrice.FLAT);
        break;
      case 'house':
        changeMinPrice(HouseMinPrice.HOUSE);
        break;
      case 'palace':
        changeMinPrice(HouseMinPrice.PALACE);
        break;
    }
  };

  // Время въезда и выезда
  var onTimeChange = function (evt) {
    var target = evt.target;
    if (target === addFormTimeIn) {
      addFormTimeOut.value = target.value;
    } else {
      addFormTimeIn.value = target.value;
    }
  };

  // Проверка на соответствие количества комнат и гостей
  var onRoomNumChange = function () {
    var guests = parseInt(addFormGuests.value, 10);
    var rooms = parseInt(addFormRooms.value, 10);

    if (rooms === 1 && guests !== 1) {
      addFormRooms.setCustomValidity('Только для одного гостя');
    } else if (rooms === 2 && (guests < 1 || guests > 2)) {
      addFormRooms.setCustomValidity('Не больше двух гостей');
    } else if (rooms === 3 && (guests < 1 || guests > 3)) {
      addFormRooms.setCustomValidity('Не больше трех гостей');
    } else if (rooms === 100 && guests !== 0) {
      addFormRooms.setCustomValidity('Не для гостей');
    } else {
      addFormRooms.setCustomValidity('');
    }
  };

  var setAddFormAddress = function (coordinates, pinHalfWidth, pinHeight) {
    addFormAddress.value = (coordinates.x + pinHalfWidth) + ', ' + (coordinates.y + pinHeight);
  };

  var setDefaultAdress = function () {
    setAddFormAddress(window.mainPin.startCoords, window.mainPin.halfWidth, window.mainPin.size.HEIGHT);
  };

  var resetForm = function () {
    addForm.reset();
    setDefaultAdress();
  };

  var deactivateForm = function () {
    window.util.setDisableAttr(addFormFields);
    resetForm();
  };

  var activateForm = function () {
    window.util.removeDisableAttr(addFormFields);
  };

  var onFormSubmit = function () {
    window.message.success();
    window.page.deactivate();
  };

  var onSubmitBtnClick = function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(addForm), onFormSubmit, window.message.error);
  };

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    window.page.deactivate();
  };

  var addFormEvtListeners = function () {
    addFormType.addEventListener('change', onPriceChange);
    addFormTimeGroup.addEventListener('change', onTimeChange);
    addFormRooms.addEventListener('change', onRoomNumChange);
    addFormGuests.addEventListener('change', onRoomNumChange);
    addForm.addEventListener('submit', onSubmitBtnClick);
    addFormResetBtn.addEventListener('click', onResetBtnClick);
  };

  var removeFormEvtListeners = function () {
    addFormType.removeEventListener('change', onPriceChange);
    addFormTimeGroup.removeEventListener('change', onTimeChange);
    addFormRooms.removeEventListener('change', onRoomNumChange);
    addFormGuests.removeEventListener('change', onRoomNumChange);
    addForm.removeEventListener('submit', onSubmitBtnClick);
    addFormResetBtn.removeEventListener('click', onResetBtnClick);
  };

  window.form = {
    deactivate: deactivateForm,
    reset: resetForm,
    activate: activateForm,
    addEvtListeners: addFormEvtListeners,
    removeEvtListeners: removeFormEvtListeners,
    setAddress: setAddFormAddress
  };
})();
