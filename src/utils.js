import dayjs from "dayjs";
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Принцип работы прост:
// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
const createElement = (template) => {
  const newElement = document.createElement(`div`); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
// Единственный нюанс, что HTML в строке должен иметь общую обёртку,
// то есть быть чем-то вроде <nav><a>Link 1</a><a>Link 2</a></nav>,
// а не просто <a>Link 1</a><a>Link 2</a>


// Функция для отрисовки шаблона

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Функция нахождения рандомного числа

const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

// Функция нахождения рандомного булева значения

const getRandomBoolean = () => Math.random() >= 0.5;

const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

// Функция перемешивания массива

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const helpersDate = {
  releaseTrimmdDate: (dateObject) => dayjs(dateObject).format(`YYYY`),
  releaseFullDate: (dateObject) => dayjs(dateObject).format(`DD MMMM YYYY`),
  releaseCommentDate: (dateObject) => dayjs(dateObject).format(`YYYY/MM/DD HH:mm`),
};

const getDurationMovie = (minutesCount) => {
  const hours = Math.floor(minutesCount / 60);
  const minutes = minutesCount % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};


export {renderElement, renderTemplate, createElement, RenderPosition, getRandomInteger, getRandomBoolean, getRandomArrayElement, shuffle, helpersDate, getDurationMovie};
