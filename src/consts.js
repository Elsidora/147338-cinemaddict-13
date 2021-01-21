const emotions = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const WatchedFilmsCount = {
  MIN: 10,
  MIDDLE: 20,
};

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
  INIT: `INIT`,
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const MenuStats = {
  MOVIES: `MOVIES`,
  STATISTICS: `STATISTICS`,
};
const StoreKey = {
  FILMS_KEY: `cinema-films-localstorage`,
  COMMENTS_KEY: `cinema-comments-localstorage`,
  VERSION: `v13.0`,
};

export {SortType, UserAction, UpdateType, FilterType, MenuStats, WatchedFilmsCount, StoreKey, emotions};
