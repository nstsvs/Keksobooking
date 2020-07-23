'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // получение рандомного элемента массива
  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  // перемешивание массива
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // рандомные элементы перемешанного массива
  var generateRandomArray = function (array) {
    var result = [];
    var resultLength = getRandomNumber(1, array.length);
    shuffleArray(array);

    for (var i = 0; i < resultLength; i++) {
      result.push(array[i]);
    }
    return result;
  };

  var disableElements = function (elementsCollection) {
    for (var i = 0; i < elementsCollection.length; i++) {
      elementsCollection[i].setAttribute('disabled', 'disabled');
    }
  };

  var enableElements = function (elementsCollection) {
    for (var i = 0; i < elementsCollection.length; i++) {
      elementsCollection[i].removeAttribute('disabled');
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    disableElements: disableElements,
    enableElements: enableElements,
    generateRandomArray: generateRandomArray
  };
})();
