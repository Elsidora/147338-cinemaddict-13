// Функция для отрисовки шаблона

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Функция нахожждения рандомного числа

const getRandomInteger = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

// Функция нахождения рандомного булева значения

const getRandomBoolean = () => Math.random() >= 0.5;

// Функция перемешивания массива

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { render, getRandomInteger, getRandomBoolean, shuffle };