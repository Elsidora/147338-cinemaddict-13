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


export {SortType, UserAction, UpdateType, FilterType, MenuStats, WatchedFilmsCount, emotions};
