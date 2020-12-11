import PopupView from "../view/popup";
import {isEscapeEvent} from "../utils/helper";
import CommentUserView from "../view/comment-user";
import {render, RenderPosition, remove, replace} from "../utils/render";

export default class PopupMovie {
  constructor(changeData) {
    this._container = document.body;
    this._changeData = changeData;
    // this._movie = null;
    this._popupComponent = null;
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupBtnClick = this._handleClosePopupBtnClick.bind(this);
    this._handleEscapePress = this._handleEscapePress.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevPopupComponent = this._popupComponent;
    // console.log(prevPopupComponent);
    this._popupComponent = new PopupView(movie);
    if (prevPopupComponent === null) {
      render(this._container, this._popupComponent, RenderPosition.BEFOREEND);
      this._renderPopup();
      return;
    }

    console.log(prevPopupComponent);

    if (document.body.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
      remove(prevPopupComponent);
    }

  }
  _handleClosePopup() {
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
    // render(this._сontainer, this._popupComponent, RenderPosition.BEFOREEND);
    // document.body.appendChild(this._popupComponent.getElement());

    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._popupComponent.setPopupCloseBtnHandler(this._handleClosePopupBtnClick);
    document.addEventListener(`keydown`, this._handleEscapePress);
    this._renderCommentsList();

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
