
const directors = [
  `Cristofer Nolan`,
  `Stiven Spilberg`,
  `Martin Scorseze`,
  `Stenly Kubrik`,
  `Alfred Hichkok`,
  `Akira Kurosava`,
  `Kventin Tarantino`,
];

const writers = [
  `Bill Wilder`,
  `Robert Taun`,
  `Fransis Koppola`,
  `Charly Caufman`,
  `Vudy Allen`,
  `Nora Efron`,
  `Ernest Leman`,
];

const actors = [
  `Alex Petrov`,
  `Dmitry Palamarchuk`,
  `Maks Averin`,
  `Vladimir Zherebtzov`,
  `Kseniya Lavrova-Glinka`,
  `Eldar Lebedev`,
  `Nick Machulsky`,
];

const countries = [
  `Russia`,
  `Italy`,
  `Spain`,
  `USA`,
  `Finland`,
  `Germany`,
  `Canada`,
];

const genres = [
  `Drama`,
  `Travell`,
  `Musical`,
  `Fantasy`,
  `Adventure`,
  `Comedy`,
  `History`,
];

const ages = [6, 12, 16, 18];

const authors = [
  `Vasilisa`,
  `Ella`,
  `Vadim`,
  `Roman`,
  `Luba`,
];

const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const textComments = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

const SortType = {
  DEFAULT: `default`,
  DATE: `sort-by-date`,
  RATING: `sort-by-rating`,
};

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  SUPER: `SUPER`,
  INIT: `INIT`,
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export {SortType, UserAction, UpdateType, FilterType, directors, writers, actors, countries, genres, ages, authors, emotions, textComments};
