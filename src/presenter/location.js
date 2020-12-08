import SortView from "../view/sort";
import FilmsView from "../view/films";
import FilmsListView from "../view/films-list";
import FilmsContainerView from "../view/films-list-container";
// import CardView from "../view/card";
import ButtonShowView from "../view/button-show-more";
import FilmsListRatingView from "../view/films-list-rating";
import FilmsListCommentView from "../view/films-list-comment";
import ListEmptyView from "../view/list-empty";
import {render, RenderPosition, remove} from "../utils/render";
import {isEscapeEvent} from "../utils/helper";
import PopupView from "../view/popup";
import CommentUserView from "../view/comment-user";
import MoviePresenter from "./movie";

const CARDS_COUNT_PER_STEP = 5;

export default class Location {
  constructor(locationContainer) {
    this._locationContainer = locationContainer;
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._sortComponent = new SortView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ButtonShowView();
    this._listEmptyComponent = new ListEmptyView();
    this._filmsListRatingComponent = new FilmsListRatingView();
    this._filmsListCommentComponent = new FilmsListCommentView();
    this._filmsRatingContainerComponent = new FilmsContainerView();
    this._filmsCommentContainerComponent = new FilmsContainerView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(locationFilms) {
    this._locationFilms = locationFilms.slice();
    this._renderLocation();
  }

  _renderSortFilms() {
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

  _renderFilmsCard(card) {
    const moviePresenter = new MoviePresenter(this._filmsContainerComponent);
    moviePresenter.init(card);
    this._moviePresenter[card.id] = moviePresenter;
  }

  _renderFilmsCards(from, to) {
    // Метод для рендеринга N-фильмов за раз
    this._locationFilms
      .slice(from, to)
      .forEach((locationFilm) => this._renderFilmsCard(locationFilm));
  }


  _renderListEmpty() {
    render(this._filmsListComponent, this._listEmptyComponent, RenderPosition.BEFOREEND);
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
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedCardCount = CARDS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderCardsList() {
    this._renderFilmsCards(0, Math.min(this._locationFilms.length, CARDS_COUNT_PER_STEP));

    if (this._locationFilms.length > CARDS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
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
  }
}
