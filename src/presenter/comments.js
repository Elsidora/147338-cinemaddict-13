import CommentUserView from "../view/comment-user";
import MessageUserView from "../view/message-user";
import {render, RenderPosition, remove} from "../utils/render";
import {UserAction, UpdateType} from "../consts";

export default class Comments {
  constructor(commentsContainer, changeData) {
    this._commentsContainer = commentsContainer;
    this._changeData = changeData;
    // this._commentUserComponent = null;
    // this._messageUserComponent = null;
    this._handleDeleteCommentBtnClick = this._handleDeleteCommentBtnClick.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);
    this._renderMessageUser = this._renderMessageUser.bind(this);
  }

  init(movie) {
    this._movie = movie;
    this._renderCommentsList();
    this._renderMessageUser();
  }
  _renderCommentsList() {
    const comments = this._movie.comments;
    const allComments = this._commentsContainer.getElement().querySelector(`.film-details__comments-list`);

    comments.forEach((comment) => {
      this._commentUserComponent = new CommentUserView(comment);
      render(allComments, this._commentUserComponent, RenderPosition.BEFOREEND);

      this._commentUserComponent.getCommentBtnName();
      this._commentUserComponent.setCommentDeleteBtnHandler(this._handleDeleteCommentBtnClick);
    });
  }

  _renderMessageUser() {
    const messageContainer = this._commentsContainer.getElement().querySelector(`.film-details__comments-wrap`);
    this._messageUserComponent = new MessageUserView();
    render(messageContainer, this._messageUserComponent, RenderPosition.BEFOREEND);
    this._messageUserComponent.restoreHandlers();
  }

  _handleDeleteCommentBtnClick() {
    let commentsLength = this._commentsContainer.getElement().querySelector(`.film-details__comments-count`);
    const deleteCommentBtn = this._commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
    deleteCommentBtn.disabled = true;
    // deleteCommentBtn.textContent = `Deleting`;
    remove(this._commentUserComponent);
    commentsLength.textContent -= 1;
  }
}
