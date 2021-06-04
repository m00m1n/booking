'use strict';

(function () {
  // перемещение маркера
  var MainPin = {
    WIDTH: 65,
    HEIGHT: 70
  };

  var HALF_MAIN_PIN_WIDTH = Math.round(MainPin.WIDTH / 2);

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapPinsWidth = window.util.getElementWidth(mapPins);

  // Действия с главной меткой для деактивации
  // запоминаем координаты
  var mainPinInitialPosition = window.util.getMapPinCoordinates(mapPinMain);

  // функция, которая подставляет изначальные координаты
  var resetMainPin = function () {
    mapPinMain.style.left = mainPinInitialPosition.x + 'px';
    mapPinMain.style.top = mainPinInitialPosition.y + 'px';
  };

  // обработчики событий
  var onMapPinMainKeydown = function (evt) {
    window.util.actionIfEnterEvent(evt, window.page.activate);
  };

  var onMapPinFirstKeydown = function (evt) {
    window.util.actionIfLeftBtnEvent(evt, window.page.activate);
  };

  var onMainPinDown = function (evt) {
    evt.preventDefault();
    // диапазон, в котором метка может перемещаться
    var moveRange = {
      top: 130 - MainPin.HEIGHT,
      right: mapPinsWidth - HALF_MAIN_PIN_WIDTH,
      bottom: 630 - MainPin.HEIGHT, // Для удобства пользователей значение Y-координаты адреса должно быть ограничено интервалом от 130 до 630.
      left: 0 - HALF_MAIN_PIN_WIDTH
    };

    // записываем начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.setAddress(window.util.getMapPinCoordinates(mapPinMain), HALF_MAIN_PIN_WIDTH, MainPin.HEIGHT);

      // расчет смещения
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // переназначаем координаты на текущие
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // вычисляем новые координаты для метки
      var shiftX = mapPinMain.offsetLeft - shift.x;
      var shiftY = mapPinMain.offsetTop - shift.y;

      // проверка по оси X
      if (shiftX > moveRange.right) {
        shiftX = moveRange.right;
      } else if (shiftX < moveRange.left) {
        shiftX = moveRange.left;
      }

      // проверка по оси Y
      if (shiftY < moveRange.top) {
        shiftY = moveRange.top;
      } else if (shiftY >= moveRange.bottom) {
        shiftY = moveRange.bottom;
      }

      // фиксируем положение в стилях
      mapPinMain.style.top = shiftY + 'px';
      mapPinMain.style.left = shiftX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // слушаем события мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMainPinDown);

  // добавление обработчиков
  var setMainPinEventListeners = function () {
    mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
    mapPinMain.addEventListener('mousedown', onMapPinFirstKeydown);
  };

  // удаление обработчиков после активации
  var removeMainPinEventListeners = function () {
    mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);
    mapPinMain.removeEventListener('mousedown', onMapPinFirstKeydown);
  };

  window.mainPin = {
    element: mapPinMain,
    startCoords: mainPinInitialPosition,
    size: MainPin,
    halfWidth: HALF_MAIN_PIN_WIDTH,
    reset: resetMainPin,
    addEvtListeners: setMainPinEventListeners,
    removeEvtListeners: removeMainPinEventListeners
  };
})();
