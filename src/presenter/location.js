import SortView from "../view/sort";
import FilmsView from "../view/films";
import FilmsListView from "../view/films-list";
import FilmsContainerView from "../view/films-list-container";
import ButtonShowView from "../view/button-show-more";
import FilmsListRatingView from "../view/films-list-rating";
import FilmsListCommentView from "../view/films-list-comment";
import ListEmptyView from "../view/list-empty";
import {updateItem} from "../utils/common";
import {render, RenderPosition, remove} from "../utils/render";
import MoviePresenter from "./movie";
import {sortDate, sortRating, sortComment} from "../utils/helper";
import {SortType} from "../consts";

const CARDS_COUNT_PER_STEP = 5;
const CARDS_EXTRA_COUNT = 2;

export default class Location {
  constructor(locationContainer) {
    this._locationContainer = locationContainer;
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._moviePresenterObjects = {};
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();

    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ButtonShowView();
    this._listEmptyComponent = new ListEmptyView();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._renderFilmsListTopRated = this._renderFilmsListTopRated.bind(this);
  }

  init(locationFilms) {
    this._locationFilms = locationFilms.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this._isRating = locationFilms.every((card) => card.rating === 0);
    this._isComments = locationFilms.every((card) => card.comments.length === 0);
    this._sourcedLocationFilms = locationFilms.slice();
    this._renderLocation();
  }

  _sortFilms(sortType) {
    // 2. Этот исходный массив фильмов необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _locationFilms
    switch (sortType) {
      case SortType.DATE:
        this._locationFilms.sort(sortDate);
        break;
      case SortType.RATING:
        this._locationFilms.sort(sortRating);
        break;
      default:
      // case SortType.DEFAULT:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.locationFilms = this._sourcedLocationFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем киношки
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
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
    const moviePresenter = new MoviePresenter(containerComponent, this._handleCardChange, this._handleModeChange);
    moviePresenter.init(card);
    this._moviePresenterObjects[card.id] = moviePresenter;
  }

  _renderFilmsCards(from, to) {
    // Метод для рендеринга N-фильмов за раз
    this._locationFilms
      .slice(from, to)
      .forEach((locationFilm) => this._renderFilmsCard(locationFilm, this._filmsContainerComponent));
  }

  _renderListEmpty() {
    render(this._filmsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleCardChange(updatedCard) {
    this._locationFilms = updateItem(this._locationFilms, updatedCard);
    // this._sourcedLocationFilms = updateItem(this._sourcedLocationFilms, updatedCard); // нужна ли эта строчка???
    this._moviePresenterObjects[updatedCard.id].init(updatedCard);
  }

  _handleShowMoreButtonClick() {
    this._renderFilmsCards(this._renderedCardCount, this._renderedCardCount + CARDS_COUNT_PER_STEP);
    this._renderedCardCount += CARDS_COUNT_PER_STEP;
    if (this._renderedCardCount >= this._locationFilms.length) {
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
    this._renderFilmsCards(0, Math.min(this._locationFilms.length, CARDS_COUNT_PER_STEP));

    if (this._locationFilms.length > CARDS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

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
    if (!this._locationFilms.length) {
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
