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
  }

  _renderFilmsCard() {

  }

  _renderListEmpty() {

  }

  _renderShowMoreButton() {

  }

  _renderLocation() {

  }
}
