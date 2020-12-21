import CommentUserView from "../view/comment-user";
import MessageUserView from "../view/message-user";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {UserAction, UpdateType} from "../consts";

export default class Comments {
  constructor(commentsContainer, changeData, commentsModel) {
    this._commentsContainer = commentsContainer;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._commentUserComponent = null;
    this._messageUserComponent = null;
    this._handleDeleteCommentBtnClick = this._handleDeleteCommentBtnClick.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;
    const allComments = this._commentsContainer.getElement().querySelector(`.film-details__comments-list`);
    const messageContainer = this._commentsContainer.getElement().querySelector(`.film-details__comments-wrap`);
    this._renderCommentsList(allComments);

    this._renderMessageUser(messageContainer);
  }
  _renderCommentsList(container) {
    const comments = this._movie.comments;


    comments.forEach((comment) => {

      this._commentUserComponent = new CommentUserView(comment);
      render(container, this._commentUserComponent, RenderPosition.BEFOREEND);

      this._commentUserComponent.getCommentBtnName();
      this._commentUserComponent.setCommentDeleteBtnHandler(this._handleDeleteCommentBtnClick);
    });
  }

  _renderMessageUser(container) {

    this._messageUserComponent = new MessageUserView();
    render(container, this._messageUserComponent, RenderPosition.BEFOREEND);

    this._messageUserComponent.restoreHandlers();

  }

  _handleModelEvent() {
    this.init();
  }

  _handleAddComment({emotion, text}) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,

    );
  }

  _handleDeleteCommentBtnClick() {
    let commentsLength = this._commentsContainer.getElement().querySelector(`.film-details__comments-count`);
    const deleteCommentBtn = this._commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
    deleteCommentBtn.disabled = true;
    // deleteCommentBtn.textContent = `Deleting`;
    remove(this._commentUserComponent);
    commentsLength.textContent -= 1;
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._movie,
            {
              isWatchlist: !this._movie.isWatchlist
            }
        )

    );
  }
}
