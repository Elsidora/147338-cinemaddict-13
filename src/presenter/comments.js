import CommentUserView from "../view/comment-user";
import MessageUserView from "../view/message-user";
import {render, RenderPosition, remove} from "../utils/render";

export default class Comments {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;
    this._messageUser = null;
    this._renderCommentsList = this._renderCommentsList.bind(this);
    // this._renderMessageUser = this._renderMessageUser.bind(this);
  }

  init(movie) {
    this._movie = movie;
    this._renderCommentsList();
    // this._renderMessageUser(this._message);
  }
  _renderCommentsList() {
    const comments = this._movie.comments;
    const allComments = this._commentsContainer.getElement().querySelector(`.film-details__comments-list`);
    let commentsLength = this._commentsContainer.getElement().querySelector(`.film-details__comments-count`);
    comments.forEach((comment) => {
      this._commentUserComponent = new CommentUserView(comment);
      render(allComments, this._commentUserComponent, RenderPosition.BEFOREEND);
      const deleteCommentBtnClickHandler = () => {
        const deleteCommentBtn = this._commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
        deleteCommentBtn.disabled = true;
        // deleteCommentBtn.textContent = `Deleting`;
        remove(this._commentUserComponent);
        commentsLength.textContent -= 1;
      };
      this._commentUserComponent.getCommentBtnName();
      this._commentUserComponent.setCommentDeleteBtnHandler(deleteCommentBtnClickHandler);
    });
    const messageContainer = this._commentsContainer.getElement().querySelector(`.film-details__comments-wrap`);
    this._messageUserComponent = new MessageUserView();
    render(messageContainer, this._messageUserComponent, RenderPosition.BEFOREEND);
    this._messageUserComponent.restoreHandlers();
  }
}
