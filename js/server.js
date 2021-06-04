'use strict';

(function () {
  var Url = {
    GET: 'https://21.javascript.pages.academy/keksobooking/data',
    POST: 'https://21.javascript.pages.academy/keksobooking'
  };
  var ResponseCode = {
    SUCCESS: 200
  };

  var DataExchangeFormat = {
    JSON: 'json'
  };

  var TIMEOUT = 10000; // 10 cекунд

  var dataDownload = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DataExchangeFormat.JSON;

    addXhrListener(xhr, onSuccess, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var dataUpload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = DataExchangeFormat.JSON;

    addXhrListener(xhr, onSuccess, onError);
    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  var addXhrListener = function (xhr, action, errorAction) {
    xhr.addEventListener('load', function () {
      if (xhr.status === ResponseCode.SUCCESS) {
        action(xhr.response);
      } else {
        errorAction('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorAction('Произошла ошибка соединения. Пожалуйста, проверьте свое подключение к Интернету и повторите попытку снова.');
    });

    xhr.addEventListener('timeout', function () {
      errorAction('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
  };

  window.server = {
    download: dataDownload,
    upload: dataUpload
  };
})();
