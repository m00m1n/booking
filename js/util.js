'use strict';

(function () {
  // кнопки
  var KeyCodeNum = {
    LEFT_BTN_CODE: 0,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27
  };

  // функция для получение размера элемента
  var getElementWidth = function (element) {
    var width = window.getComputedStyle(element).width;
    return parseInt(width, 10);
  };

  // функция для нажатия на enter
  var actionIfEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCodeNum.ENTER_KEYCODE) {
      action();
    }
  };

  var actionIfEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCodeNum.ESC_KEYCODE) {
      action();
    }
  };

  // функция для нажатия на левую кнопку мыши
  var actionIfLeftBtnEvent = function (evt, action) {
    if (typeof evt === 'object') {
      switch (evt.button) {
        case KeyCodeNum.LEFT_BTN_CODE:
          action();
          break;
      }
    }
  };

  // функция для получения координат метки
  var getMapPinCoordinates = function (pin) {
    return {
      x: pin.offsetLeft,
      y: pin.offsetTop
    };
  };

  // функция для установки атрибута disabled
  var setDisableAttr = function (elementList) {
    var elementArray = Array.from(elementList);
    elementArray.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  // активация полей
  var removeDisableAttr = function (elementList) {
    var elementArray = Array.from(elementList);
    elementArray.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  window.util = {
    getElementWidth: getElementWidth, // получение размера элемента
    actionIfEnterEvent: actionIfEnterEvent, // нажатие на enter
    actionIfLeftBtnEvent: actionIfLeftBtnEvent, // нажатие на левую кнопку мыши
    actionIfEscEvent: actionIfEscEvent, // нажатие на ESC
    getMapPinCoordinates: getMapPinCoordinates, // функция для получения координат метки
    setDisableAttr: setDisableAttr, // функция для установки атрибута disabled для списка элементов
    removeDisableAttr: removeDisableAttr // функция для удаления атрибута disabled для списка элементов
  };
})();
