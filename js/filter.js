'use strict';

(function () {
  var PriceStep = {
    LOW: 10000,
    HIGH: 50000
  };
  var FilterValue = {
    LOW: 'low',
    HIGH: 'high',
    MIDDLE: 'middle',
    ANY: 'any'
  };

  var filterForm = document.querySelector('.map__filters');
  var filterSelectList = filterForm.querySelectorAll('.map__filter');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRoomsNum = filterForm.querySelector('#housing-rooms');
  var filterGuestsNum = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');

  // деактивация фильтра
  var deactivateFilter = function () {
    window.util.setDisableAttr(filterSelectList);
    filterFeatures.setAttribute('disabled', 'disabled');
  };

  // активация фильтра
  var activateFilter = function () {
    window.util.removeDisableAttr(filterSelectList);
    filterFeatures.removeAttribute('disabled', 'disabled');
  };

  // вспомогательная функция для получения выбранного элемента option
  var getSelectOptionValue = function (selectList) {
    var option;
    for (var i = 0; i < selectList.options.length; i++) {
      if (selectList.options[i].selected) {
        option = selectList.options[i];
        break;
      }
    }
    return option;
  };

  // фильтрация по типу жилья
  var filterByType = function (element) {
    if (getSelectOptionValue(filterHouseType).value === FilterValue.ANY) {
      return true;
    } else {
      return element.offer.type === getSelectOptionValue(filterHouseType).value;
    }
  };

  // вспомогательная функция, которая помогает сопоставить зачения цены с значениями в фильтре
  var checkOfferPrice = function (element) {
    var price = parseInt(element.offer.price, 10);
    if (price < PriceStep.LOW) {
      return FilterValue.LOW;
    } else if (price >= PriceStep.LOW && price <= PriceStep.HIGH) {
      return FilterValue.MIDDLE;
    } else if (price > PriceStep.HIGH) {
      return FilterValue.HIGH;
    } else {
      return FilterValue.ANY;
    }
  };

  // фильтрация по цене
  var filterByPrice = function (element) {
    if (getSelectOptionValue(filterPrice).value === FilterValue.ANY) {
      return true;
    } else {
      return checkOfferPrice(element) === getSelectOptionValue(filterPrice).value;
    }
  };

  // фильтрация по количеству комнат
  var filterByRoomNum = function (element) {
    if (getSelectOptionValue(filterRoomsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return element.offer.rooms === parseInt(getSelectOptionValue(filterRoomsNum).value, 10);
    }
  };

  // фильтрация по количеству гостей
  var filterByGuestsNum = function (element) {
    if (getSelectOptionValue(filterGuestsNum).value === FilterValue.ANY) {
      return true;
    } else {
      return element.offer.guests === parseInt((getSelectOptionValue(filterGuestsNum).value), 10);
    }
  };

  // фильтрация по доп удобствам
  var filterByFeature = function (element) {
    var featureItems = filterFeatures.querySelectorAll('.map__checkbox');
    var filterResult = true;
    for (var i = 0; i < featureItems.length; i++) {
      if (featureItems[i].checked) {
        if (element.offer.features.indexOf(featureItems[i].value) === -1) {
          filterResult = false;
          break;
        }
      }
    }
    return filterResult;
  };

  // фильтруем имеющиеся (полученные до этого с сервера) данные
  var getFilteredOffers = function () {
    var filteredOffers = window.dataFiltered.filter(function (element) {
      return filterByType(element) &&
          filterByPrice(element) &&
          filterByRoomNum(element) &&
          filterByGuestsNum(element) &&
          filterByFeature(element);
    });
    return filteredOffers;
  };

  var updatePins = function () {
    window.card.remove();
    window.pin.delete();
    var filteredOffers = getFilteredOffers();
    window.data.insert(filteredOffers);
  };

  var debouncedPinsUpdate = window.debounce.set(updatePins);

  var onFilterChange = function (evt) {
    if (evt.target && evt.target.matches('select.map__filter') || evt.target.matches('input.map__checkbox')) {
      debouncedPinsUpdate();
    }
  };

  var addFiltersFormListener = function () {
    filterForm.addEventListener('change', onFilterChange);
  };

  var resetFiltersForm = function () {
    filterForm.removeEventListener('change', onFilterChange);
    filterForm.reset();
  };

  window.filter = {
    updatePins: updatePins,
    addEvtListener: addFiltersFormListener,
    reset: resetFiltersForm,
    deactivate: deactivateFilter,
    activate: activateFilter
  };
})();
