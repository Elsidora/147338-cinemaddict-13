import {getRandomInteger, getRandomBoolean, getRandomArrayElement, shuffle} from "../utils";
import {posters, directors, writers, actors, countries, genres, ages} from "../consts";
import {generateComment} from "./comment";

const DescriptionLength = {
  MIN: 1,
  MAX: 5,
};

const GenresCount = {
  MIN: 1,
  MAX: 3,
};

const WritersCount = {
  MIN: 1,
  MAX: 3,
};

const ActorsCount = {
  MIN: 1,
  MAX: 5,
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const generatePoster = () => getRandomArrayElement(posters);

const modifyFileName = (fileName) => {

  const dotIndex = fileName.indexOf(`.`);
  fileName = fileName.substring(0, dotIndex).replaceAll(`-`, ` `);
  return fileName[0].toUpperCase() + fileName.substring(1);
};

const getTitlesArray = (postersArray) => {
  return postersArray.map(modifyFileName);
};
const titles = getTitlesArray(posters);

const generateDirector = () => getRandomArrayElement(directors);

const generateWriters = () => {

  const randomWritersCount = getRandomInteger(WritersCount.MIN, WritersCount.MAX);
  let allWriters = [];
  for (let i = 0; i < randomWritersCount; i += 1) {
    const randomWriter = getRandomArrayElement(writers);
    allWriters.push(randomWriter);
  }
  allWriters = new Set(allWriters);
  return [...allWriters].join(`, `);
};

const generateActors = () => {

  const randomActorsCount = getRandomInteger(ActorsCount.MIN, ActorsCount.MAX);
  let allActors = [];
  for (let i = 0; i < randomActorsCount; i += 1) {
    const randomActor = getRandomArrayElement(actors);
    allActors.push(randomActor);
  }
  allActors = new Set(allActors);
  return [...allActors].join(`, `);
};

const generateRating = () => Number(`${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`);

const generateGenres = () => {

  const randomGenresCount = getRandomInteger(GenresCount.MIN, GenresCount.MAX);
  let allGenres = [];
  for (let i = 0; i < randomGenresCount; i += 1) {
    const randomGenre = getRandomArrayElement(genres);
    allGenres.push(randomGenre);
  }
  allGenres = new Set(allGenres);
  return [...allGenres];
};

const generateCountry = () => getRandomArrayElement(countries);

const generateAgeRating = () => getRandomArrayElement(ages);

const generateReleaseDate = () => {
  return getRandomInteger(1920, 2020);
};

const generateRuntime = () => {
  return getRandomInteger(0, 3) * 60 + getRandomInteger(0, 59);
};

const getComments = () => {
  return new Array(getRandomInteger(0, 5)).fill().map(generateComment);
};

export const generateCard = () => {

  const sentence = shuffle(text.split(`. `).slice());
  const description = sentence.slice(0, getRandomInteger(DescriptionLength.MIN, DescriptionLength.MAX)).join(`. `);
  const releaseDate = generateReleaseDate();
  const runtime = generateRuntime();

  return {
    comments: getComments(),
    poster: generatePoster(),
    title: getRandomArrayElement(titles),
    originTitle: getRandomArrayElement(titles),
    rating: generateRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    releaseDate,
    runtime,
    country: generateCountry(),
    genres: generateGenres(),
    description,
    ageRating: generateAgeRating(),
    isWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),

  };
};
