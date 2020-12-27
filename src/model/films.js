import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          title: film[film_info].title,
          originTitle: film[film_info].alternative_title,
          rating: film[film_info].total_rating,
          poster: film[film_info].poster,
          ageRating: film[film_info].age_rating,
          director: film[film_info].director,
          writers: film[film_info].writers,
          actors: film[film_info].actors,
          releaseDate: film[film_info].release.date,
          country: film[film_info].release.release_country,
          runtime: film[film_info].runtime,
          genres: film[film_info].genre,
          description: film[film_info].description,
          isWatchlist: film[user_details].watchlist,
          isWatched: film[user_details].already_watched,
          isFavorites: film[user_details].favorite,
          // dueDate: task.due_date !== null ? new Date(task.due_date) : task.due_date, // На клиенте дата хранится как экземпляр Date
          // isArchive: task.is_archived,
          // isFavorite: task.is_favorite,
          // repeating: task.repeating_days
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm[film_info].title,
    delete adaptedFilm[film_info].alternative_title,
    delete adaptedFilm[film_info].total_rating,
    delete adaptedFilm[film_info].poster,
    delete adaptedFilm[film_info].age_rating,
    delete adaptedFilm[film_info].director,
    delete adaptedFilm[film_info].writers,
    delete adaptedFilm[film_info].actors,
    delete adaptedFilm[film_info].release.date,
    delete adaptedFilm[film_info].release.release_country,
    delete adaptedFilm[film_info].runtime,
    delete adaptedFilm[film_info].genre,
    delete adaptedFilm[film_info].description,
    delete adaptedFilm[user_details].watchlist,
    delete adaptedFilm[user_details].already_watched,
    delete adaptedFilm[user_details].favorite,
    // delete adaptedTask.due_date;
    // delete adaptedTask.is_archived;
    // delete adaptedTask.is_favorite;
    // delete adaptedTask.repeating_days;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": {
            "title": film.title,
            "alternative_title": film.originTitle,
            "total_rating": film.rating,
            "poster": film.poster,
            "age_rating": film.ageRating,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.releaseDate,
              "release_country": film.country,
            },
            "runtime": film.runtime,
            "genre": film.genres,
            "description": film.description,
          },
          "user_details": {
            "watchlist": film.isWatchlist,
            "already_watched": film.isWatched,
            "favorite": film.isFavorites,
          }
          // "due_date": task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
          // "is_archived": task.isArchive,
          // "is_favorite": task.isFavorite,
          // "repeating_days": task.repeating
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedFilm.title,
    delete adaptedFilm.originTitle,
    delete adaptedFilm.rating,
    delete adaptedFilm.poster,
    delete adaptedFilm.ageRating,
    delete adaptedFilm.director,
    delete adaptedFilm.writers,
    delete adaptedFilm.actors,
    delete adaptedFilm.releaseDate,
    delete adaptedFilm.country,
    delete adaptedFilm.runtime,
    delete adaptedFilm.genres,
    delete adaptedFilm.description,
    delete adaptedFilm.isWatchlist,
    delete adaptedFilm.isWatched,
    delete adaptedFilm.isFavorites,
    
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    return adaptedFilm;
  }
}
