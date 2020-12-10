import PopupView from "../view/popup";
import {isEscapeEvent} from "../utils/helper";
import CommentUserView from "../view/comment-user";
import {render, RenderPosition, remove, replace} from "../utils/render";

export default class PopupMovie {
  constructor() {
    this._container = document.body;
    this._popupComponent = null;

  }

  init(movie) {
    this._movie = movie;
    // const prevPopupComponent = this._popupComponent;
    this._popupComponent = new PopupView(movie);
    this._renderPopup();
  }

  _closePopup() {
    // const popupElement = siteBody.querySelector(`.film-details`);
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
    this._container.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._escapePressHandler);
  }

  _escapePressHandler(evt) {
    isEscapeEvent(evt, this._closePopup);
  }

  _closePopupBtnClickHandler() {
    this._closePopup();
  }

  _renderPopup() {
    // const popupComponent = new PopupView(card);
    console.log(this._container);
    this._container.appendChild(this._popupComponent.getElement());
    const comments = this._movie.comments;
    const allComments = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    let commentsLength = this._popupComponent.getElement().querySelector(`.film-details__comments-count`);
    comments.forEach((comment) => {
      const commentUserComponent = new CommentUserView(comment);
      render(allComments, commentUserComponent, RenderPosition.BEFOREEND);
      const deleteCommentBtnClickHandler = () => {
        const deleteCommentBtn = commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
        deleteCommentBtn.disabled = true;
        commentUserComponent.getCommentBtnName();
        remove(commentUserComponent);
        commentsLength.textContent -= 1;
      };
      commentUserComponent.getCommentBtnName();
      commentUserComponent.setCommentDeleteBtnHandler(deleteCommentBtnClickHandler);
    });

    this._popupComponent.setPopupCloseBtnHandler(this._closePopupBtnClickHandler);
    this._popupComponent.setEscapePressHandler(this._escapePressHandler);
  }
}
