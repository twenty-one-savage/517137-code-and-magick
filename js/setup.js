'use strict';
// Константа длины массива
var WIZARDS_LENGTH = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

// Находим окно настроек на странице
var userDialog = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var usernameInput = userDialog.querySelector('.setup-user-name');

var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');

// В найденном окне настроек находим поле с похожими волшебниками, позже мы будем добавлять в этот список волшебников
var similarListElement = userDialog.querySelector('.setup-similar-list');
// Обращаемся к шаблону и его содержимому, который в дальнейшем будем клонировать (через cloneNode)
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Заводим массивы с нужными данными
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// Функция для создания случайного целого числа
var getRandomInt = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Массив с волшебниками
var wizards = [];

// Функция для создания массива с объектами (волшебниками)
var createArray = function (arr) {
  for (var i = 0; i < WIZARDS_LENGTH; i++) {
    arr[i] = {
      name: WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length, 0)] + ' ' + WIZARDS_SURNAMES[getRandomInt(WIZARDS_SURNAMES.length, 0)],
      coatColor: WIZARD_COAT_COLORS[getRandomInt(WIZARD_COAT_COLORS.length, 0)],
      eyesColor: WIZARD_EYES_COLORS[getRandomInt(WIZARD_EYES_COLORS.length, 0)]
    };
  }
};

createArray(wizards);

// Функция для создания волшебника
var renderWizard = function (wizard) {
  // Клонируем содержимое тега <template> и записываем в переменную
  var wizardElement = similarWizardTemplate.cloneNode(true);
  // Далее работаем со свойствами объекта (имя и фамилия, цвет мантии, цвет глаз)
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция для создания фргамента, в котором будет наш массив
var makeFragment = function (arr) {
  // Создаем пустой фрагмент
  var fragment = document.createDocumentFragment();
  // Далее вставляем, в ранее созданный фрагмент, волшебников
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  return fragment;
};

// Вставляем содержимое фрагмента (наш массив) в DOM-дерево
similarListElement.appendChild(makeFragment(wizards));

// Отображаем блок "список похожих магов" на странице
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};
var closePopup = function () {
  userDialog.classList.add('hidden');
};
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('click', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onPopupEnterPress);
setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE || evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Проверка валидации инпута
usernameInput.addEventListener('invalid', function () {
  if (usernameInput.validity.tooShort) {
    usernameInput.setCustomValidity('Имя должно содержать более 2-х символов');
  } else if (usernameInput.validity.tooLong) {
    usernameInput.setCustomValidity('Имя должно содержать менее 25-ти символов');
  } else if (usernameInput.validity.valueMissing) {
    usernameInput.setCustomValidity('Заполните поле');
  } else {
    usernameInput.setCustomValidity('');
  }
});

// По клику по мантии изменяется её цвет
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = WIZARD_COAT_COLORS[getRandomInt(WIZARD_COAT_COLORS.length, 0)];
});

// По клику на глаза изменяется их цвет
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = WIZARD_EYES_COLORS[getRandomInt(WIZARD_EYES_COLORS.length, 0)];
});

// По клику на фаербол изменяется его цвет
wizardFireball.addEventListener('click', function () {
  wizardFireball.style.background = WIZARD_FIREBALL_COLORS[getRandomInt(WIZARD_FIREBALL_COLORS.length, 0)];
});
