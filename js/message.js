'use strict';

(function () {
  var createErrorMessage = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorPopup = errorTemplate.cloneNode(true);
    var errorButton = errorPopup.querySelector('.error__button');

    errorButton.focus();
    errorPopup.style.zIndex = 100;
    errorPopup.querySelector('.error__message').textContent = errorMessage;

    // вставляем блок с ошибкой на страницу
    document.body.insertAdjacentElement('afterbegin', errorPopup);

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      errorPopup.remove();
    });

    var onDocumentKeydown = function (evt) {
      window.util.actionIfEscEvent(evt, function () {
        removeErrorMessage();
      });
    };

    var removeErrorMessage = function () {
      errorPopup.remove();
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var createSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successPopup = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successPopup);

    var onDocumentKeydown = function (evt) {
      window.util.actionIfEscEvent(evt, function () {
        removeSuccessMessage();
      });
    };

    var removeSuccessMessage = function () {
      successPopup.remove();
      window.form.reset();
      document.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  window.message = {
    error: createErrorMessage,
    success: createSuccessMessage
  };
})();
