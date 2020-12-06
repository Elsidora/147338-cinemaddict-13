import FilmsView from "../view/films";
import FilmsListView from "../view/films-list";
import FilmsContainerView from "../view/films-list-container";
import CardView from "../view/card";
import ButtonShowView from "../view/button-show-more";
import FilmsListRatingView from "../view/films-list-rating";
import FilmsListCommentView from "../view/films-list-comment";
import ListEmptyView from "../view/list-empty";
import {render, RenderPosition, remove} from "../utils/render";
import {isEscapeEvent} from "../utils/helper";
import PopupView from "../view/popup";
import CommentUserView from "../view/comment-user";

export default class Location {
  constructor(locationContainer) {
    this._locationContainer = locationContainer;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._listEmptyComponent = new ListEmptyView();
    this._filmsListRatingComponent = new FilmsListRatingView();
    this._filmsListCommentComponent = new FilmsListCommentView();
    this._filmsRatingContainerComponent = new FilmsContainerView();
    this._filmsCommentContainerComponent = new FilmsContainerView();
  }

  init(locationFilms) {
    this._locationFilms = locationFilms.slice();

    render(this._locationContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderLocation();
  }

  _renderFilmsListContainer() {
    render(this._filmsListComponent, this._filmsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmsCard(card) {
    const cardComponent = new CardView(card);
    const onElementClick = () => {
      renderPopup(card);
    };
    cardComponent.setElementClickHandler(onElementClick);
    render(this._renderFilmsListContainer(), cardComponent, RenderPosition.BEFOREEND);
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

  _renderShowMoreButton() {
    const showMoreButtonComponent = new ButtonShowView();
    render(this._filmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);
    let renderedCardCount = CARDS_COUNT_PER_STEP;

    const onShowMoreButtonClick = () => {
      this._locationFilms
        .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
        .forEach((locationFilm) => this._renderFilmsCard(locationFilm));

      renderedCardCount += CARDS_COUNT_PER_STEP;

      if (renderedCardCount >= this._locationFilms.length) {
        remove(showMoreButtonComponent);
      }
    };
    showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
  }

  _renderCardsList() {
    this._renderFilmsCards(0, Math.min(this._locationFilms.length, TASK_COUNT_PER_STEP));

    if (this._locationFilms.length > TASK_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderLocation() {
    if (!this._locationFilms.length) {
      this._filmsListComponent.getElement().innerHTML = ``;
      this._renderListEmpty();
    } else {
      this._renderFilmsListContainer();
    }

    this._renderCardsList();
  }
}
