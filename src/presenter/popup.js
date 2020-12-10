import PopupView from "../view/popup";
import {isEscapeEvent} from "../utils/helper";
import CommentUserView from "../view/comment-user";
import {render, RenderPosition, remove, replace} from "../utils/render";

export default class PopupMovie {
  constructor() {
    this._container = document.body;
    this._popupComponent = null;
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupBtnClick = this._handleClosePopupBtnClick.bind(this);
    this._handleEscapePress = this._handleEscapePress.bind(this);
  }

  init(movie) {
    this._movie = movie;
    // const prevPopupComponent = this._popupComponent;
    this._popupComponent = new PopupView(movie);
    this._renderPopup();
  }

  _handleClosePopup() {
    // const popupElement = siteBody.querySelector(`.film-details`);
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
    this._container.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._handleEscapePress);
  }

  _handleEscapePress(evt) {
    isEscapeEvent(evt, this._handleClosePopup);
  }

  _handleClosePopupBtnClick() {
    this._handleClosePopup();
  }

  _renderPopup() {
    this._container.appendChild(this._popupComponent.getElement());
    this._renderCommentsList();
    this._popupComponent.setPopupCloseBtnHandler(this._handleClosePopupBtnClick);
    document.addEventListener(`keydown`, this._handleEscapePress);
  }

  _renderCommentsList() {
    const comments = this._movie.comments;
    const allComments = this._popupComponent.getElement().querySelector(`.film-details__comments-list`);
    let commentsLength = this._popupComponent.getElement().querySelector(`.film-details__comments-count`);
    comments.forEach((comment) => {
      const commentUserComponent = new CommentUserView(comment);
      render(allComments, commentUserComponent, RenderPosition.BEFOREEND);
      const deleteCommentBtnClickHandler = () => {
        const deleteCommentBtn = commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
        deleteCommentBtn.disabled = true;
        // deleteCommentBtn.textContent = `Deleting`;
        commentUserComponent.getCommentBtnName();
        remove(commentUserComponent);
        commentsLength.textContent -= 1;
      };
      commentUserComponent.getCommentBtnName();
      commentUserComponent.setCommentDeleteBtnHandler(deleteCommentBtnClickHandler);
    });
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatchlist: !this._movie.isWatchlist
            }
        )

    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isFavorite: !this._movie.isFavorite
            }
        )
    );
  }

}
