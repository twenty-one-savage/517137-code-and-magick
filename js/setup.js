'use strict';
// Находим окно настроек на странице
var userDialog = document.querySelector('.setup');

// Показываем окно настроек на странице
userDialog.classList.remove('hidden');

// В найденном окне настроек находим поле с похожими волшебниками, позже мы будем добавлять в этот список волшебников
var similarListElement = userDialog.querySelector('.setup-similar-list');
// Обращаемся к шаблону и его содержимому, который в дальнейшем будем клонировать (через cloneNode)
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Заводим массивы с нужными данными
var WIZARD_NAMES = [' Иван', ' Хуан Себастьян', ' Мария', ' Кристоф', ' Виктор', ' Юлия', ' Люпита', ' Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Функция для создания случайного целого числа
var getRandomInt = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Массив с количеством волшебников
var wizards = [{}, {}, {}, {}];

// Создаем свойства для волшебников (имя, цвет мантии, цвет глаз)
for (var i = 0; i < wizards.length; i++) {
  wizards[i].name = WIZARDS_SURNAMES[getRandomInt(WIZARDS_SURNAMES.length, 0)] + WIZARD_NAMES[getRandomInt(WIZARD_NAMES.length, 0)];
  wizards[i].coatColor = WIZARD_COAT_COLORS[getRandomInt(WIZARD_COAT_COLORS.length, 0)];
  wizards[i].eyesColor = WIZARD_EYES_COLORS[getRandomInt(WIZARD_EYES_COLORS.length, 0)];
}

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

// Функция для отрисовки волшебника на странице
var drawWizards = function (arr) {
  // Создаем пустой фрагмент
  var fragment = document.createDocumentFragment();
  // Далее вставляем, в ранее созданный фрагмент, волшебников
  for (i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }
  return fragment;
};

// Вставляем содержимое фрагмента в DOM-дерево
similarListElement.appendChild(drawWizards(wizards));

// Отображаем список похожих магов на странице
userDialog.querySelector('.setup-similar').classList.remove('hidden');
