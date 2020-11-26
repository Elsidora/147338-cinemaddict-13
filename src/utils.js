import dayjs from "dayjs";

// Функция для отрисовки шаблона

const render = (container, template, place) => {
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


export {render, getRandomInteger, getRandomBoolean, getRandomArrayElement, shuffle, helpersDate, getDurationMovie};
