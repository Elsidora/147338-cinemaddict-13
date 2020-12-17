import SortView from "../view/sort";
import FilmsView from "../view/films";
import FilmsListView from "../view/films-list";
import FilmsContainerView from "../view/films-list-container";
import ButtonShowView from "../view/button-show-more";
import FilmsListRatingView from "../view/films-list-rating";
import FilmsListCommentView from "../view/films-list-comment";
import ListEmptyView from "../view/list-empty";
// import {updateItem} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";
import MoviePresenter from "./movie";
import {sortDate, sortRating, sortComment} from "../utils/helper";
import {SortType} from "../consts";

const CARDS_COUNT_PER_STEP = 5;
const CARDS_EXTRA_COUNT = 2;

export default class Location {
  constructor(locationContainer, filmsModel) {
    this._locationContainer = locationContainer;
    this._filmsModel = filmsModel;
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._moviePresenterObjects = {};
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();

    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ButtonShowView();
    this._listEmptyComponent = new ListEmptyView();

    // this._handleCardChange = this._handleCardChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._renderFilmsListTopRated = this._renderFilmsListTopRated.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {

    // this._isRating = locationFilms.every((card) => card.rating === 0);
    // this._isComments = locationFilms.every((card) => card.comments.length === 0);

    this._renderLocation();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._filmsModel.getFilms.slice().sort(sortDate);

      case SortType.RATING:
        return this._filmsModel.getFilms.slice().sort(sortRating);
    }
    // console.log(this._filmsModel.getFilms());
    return this._filmsModel.getFilms();
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем киношки
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    // - Очищаем список
    this._clearFilmsList();
    // - Рендерим список заново
    this._renderCardsList();
  }

  _renderSortFilms() {
    render(this._locationContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    const moviePresenter = new MoviePresenter(containerComponent, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(card);
    this._moviePresenterObjects[card.id] = moviePresenter;
  }

  _renderFilmsCards(films) {
    films.forEach((film) => this._renderFilmsCard(film, this._filmsContainerComponent));
  }

  _renderListEmpty() {
    render(this._filmsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
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
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда...)
    // - обновить всё (например, при переключении фильтра)
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
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmsList() {

    Object
      .values(this._moviePresenterObjects)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenterObjects = {};
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
    // remove(this._filmsListRatingComponent);
    // remove(this._filmsListCommentComponent);

  }

  _renderCardsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, CARDS_COUNT_PER_STEP));

    if (filmCount > CARDS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
    // console.log(films);
    this._renderFilmsCards(films);
    // this._renderFilmsListTopRated();
    // this._renderFilmsListMostCommented();
  }

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
}
