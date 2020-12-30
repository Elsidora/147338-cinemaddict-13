import SortView from "../view/sort";
import FilmsView from "../view/films";
import FilmsListView from "../view/films-list";
import FilmsContainerView from "../view/films-list-container";
import ButtonShowView from "../view/button-show-more";
import FilmsListRatingView from "../view/films-list-rating";
import FilmsListCommentView from "../view/films-list-comment";
import ListEmptyView from "../view/list-empty";
import LoadingView from "../view/loading";
// import {updateItem} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";
import {filter} from "../utils/filter";
import MoviePresenter from "./movie";
import {sortDate, sortRating, sortComment} from "../utils/helper";
import {SortType, UpdateType, UserAction} from "../consts";

const CARDS_COUNT_PER_STEP = 5;
const CARDS_EXTRA_COUNT = 2;

export default class Location {
  constructor(locationContainer, filmsModel, filterModel, api) {
    this._locationContainer = locationContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    // this._commentsModel = commentsModel;
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;
    this._sortComponent = null;
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();

    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = null;
    this._listEmptyComponent = new ListEmptyView();
    this._loadingComponent = new LoadingView();

    // this._handleCardChange = this._handleCardChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._renderFilmsListTopRated = this._renderFilmsListTopRated.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    // this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {
    console.log(this._filmsModel.getFilms());

    // this._isRating = locationFilms.every((card) => card.rating === 0);
    // this._isComments = locationFilms.every((card) => card.comments.length === 0);

    this._renderLocation();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortDate);

      case SortType.RATING:
        return filtredFilms.sort(sortRating);
    }
    // console.log(this._filmsModel.getFilms());
    return filtredFilms;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем киношки
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearLocation({resetRenderedFilmCount: true});
    this._renderLocation();
  }

  _renderSortFilms() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._locationContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListWrap() {
    render(this._locationContainer, this._filmsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListAll() {
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsListContainer() {
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsCard(card, containerComponent) {
    const moviePresenter = new MoviePresenter(containerComponent, this._handleViewAction, this._handleModeChange, this._commentsModel);
    moviePresenter.init(card);
    this._moviePresenter[card.id] = moviePresenter;
  }

  _renderFilmsCards(films) {
    films.forEach((film) => this._renderFilmsCard(film, this._filmsContainerComponent));
  }

  _renderListEmpty() {
    render(this._filmsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._filmsListComponent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  /*
  _handleCardChange(updatedCard) {

    this._moviePresenterObjects[updatedCard.id].init(updatedCard);
  }
  */

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        console.log(`Step3 заходим в _handleViewAction общего презентера location`);
        // this._filmsModel.updateFilm(updateType, update);
        this._api.updateMovie(update).then((response) => {
          console.log(response);
          this._filmsModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда )
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда)
        this._clearLocation();
        this._renderLocation();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearLocation({resetRenderedFilmCount: true, resetSortType: true});
        this._renderLocation();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderLocation();
        break;
    }
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedCardCount = Math.min(filmCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedCardCount, newRenderedCardCount);

    // console.log(films);
    this._renderFilmsCards(films);
    this._renderedCardCount = newRenderedCardCount;
    if (this._renderedCardCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ButtonShowView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearLocation({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._sortComponent);
    remove(this._filmsComponent);
    remove(this._filmsListComponent);

    remove(this._filmsContainerComponent);
    remove(this._listEmptyComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedCardCount = CARDS_COUNT_PER_STEP;
    } else {
      this._renderedCardCount = Math.min(filmCount, this._renderedCardCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
    // remove(this._filmsListRatingComponent);
    // remove(this._filmsListCommentComponent);

  }

  _renderLocation() {
    const films = this._getFilms();
    const filmCount = this._getFilms().length;

    if (this._isLoading) {
      this._renderFilmsListWrap();
      this._renderFilmsListAll();
      this._filmsListComponent.getElement().innerHTML = ``;
      this._renderLoading();
      return;
    }

    if (!this._getFilms().length) {
      this._renderFilmsListWrap();
      this._renderFilmsListAll();
      this._filmsListComponent.getElement().innerHTML = ``;
      this._renderListEmpty();
      return;
    }

    this._renderSortFilms();
    this._renderFilmsListWrap();
    this._renderFilmsListAll();
    this._renderFilmsListContainer();

    this._renderFilmsCards(films.slice(0, Math.min(filmCount, this._renderedCardCount)));
    if (filmCount > this._renderedCardCount) {
      this._renderShowMoreButton();
    }

    // this._renderFilmsListTopRated();
    // this._renderFilmsListMostCommented();
  }

  /*
  _renderFilmsListTopRated() {
    if (this._isRating) {
      return;
    }
    const locationRatingFilms = this._locationFilms.sort(sortRating);
    const filmsListRatingComponent = new FilmsListRatingView();
    const filmsRatingContainerComponent = new FilmsContainerView();
    render(this._filmsComponent, filmsListRatingComponent, RenderPosition.BEFOREEND);
    render(filmsListRatingComponent, filmsRatingContainerComponent, RenderPosition.BEFOREEND);
    locationRatingFilms
      .slice(0, CARDS_EXTRA_COUNT)
      .forEach((locationFilm) => this._renderFilmsCard(locationFilm, filmsRatingContainerComponent.getElement()));
  }

  _renderFilmsListMostCommented() {
    if (this._isComments) {
      return;
    }
    const locationCommentFilms = this._locationFilms.sort(sortComment);
    const filmsListCommentComponent = new FilmsListCommentView();
    const filmsCommentContainerComponent = new FilmsContainerView();
    render(this._filmsComponent, filmsListCommentComponent, RenderPosition.BEFOREEND);
    render(filmsListCommentComponent, filmsCommentContainerComponent, RenderPosition.BEFOREEND);
    locationCommentFilms
      .slice(0, CARDS_EXTRA_COUNT)
      .forEach((locationFilm) => this._renderFilmsCard(locationFilm, filmsCommentContainerComponent));
  }
  _renderLocation() {
    if (!this._getFilms().length) {
      this._renderFilmsListWrap();
      this._renderFilmsListAll();
      this._filmsListComponent.getElement().innerHTML = ``;
      this._renderListEmpty();
      return;
    }
    this._renderSortFilms();
    this._renderFilmsListWrap();
    this._renderFilmsListAll();
    this._renderFilmsListContainer();

    this._renderCardsList();
    // this._renderFilmsListTopRated();
  }
  */
}
