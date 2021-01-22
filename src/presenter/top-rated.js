import {FilmCount, FilmListHeader, UpdateType, UserAction} from "../consts";
import FilmsListView from '../view/films-list';
import FilmsContainerView from '../view/films-list-container';
import MoviePresenter from './movie';
import {sortRating} from '../utils/helper';
import {render, remove, RenderPosition} from '../utils/render';


export default class TopRated {
  constructor(container, filmsModel, api, commentsModel, filterModel) {
    this._container = container;
    this._api = api;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;

    this._filmsContainerComponent = null;
    this._filmsListComponent = null;
    this._moviePresenter = {};

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._getMovies().length) {
      this._filmsContainerComponent = new FilmsContainerView();
      this._filmsListComponent = new FilmsListView(FilmListHeader.TOP_RATED);

      render(this._container, this._filmsListComponent, RenderPosition.BEFOREEND);
      render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);
      this._renderSection();
    }
  }

  _getMovies() {
    const allFilms = this._filmsModel.getFilms().slice();
    const filmsWithRating = allFilms.filter((film) => film.rating > 0);
    return filmsWithRating.sort(sortRating);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateMovie(update).then((response) => {
          this._moviesModel.updateMovieCard(updateType, response);
        });
        break;
    }
  }

  _handleModelEvent(updateType, updatedMovie) {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this._moviePresenter[updatedMovie.id] !== undefined) {
          this._moviePresenter[updatedMovie.id].init(updatedMovie);
        }
        break;
    }
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._filmsContainerComponent, this._handleViewAction, this._filmsModel, this._commentsModel, this._api);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(movies) {
    movies
    .slice(FilmCount.EXTRA_MIN, FilmCount.EXTRA_MAX)
    .forEach((movie) => this._renderMovie(movie));
  }

  destroy() {
    this._clear();
    remove(this._filmsListComponent);
    remove(this._filmsContainerComponent);
  }

  _clear() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
  }

  _renderSection() {
    const movies = this._getMovies().slice();
    this._renderMovies(movies);
  }
}
