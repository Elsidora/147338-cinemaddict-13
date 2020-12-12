import CommentUserView from "../view/comment-user";
import {render, RenderPosition, remove, replace} from "../utils/render";

export default class Comments {
  constructor(commentsContainer) {
    this._commentsContainer = commentsContainer;

    this._renderCommentsList = this._renderCommentsList.bind(this);
  }

  init(movie) {
    this._movie = movie;
    // this._commentUserComponent = new CommentUserView(movie);

    this._renderCommentsList();
  }
  _renderCommentsList() {
    const comments = this._movie.comments;
    const allComments = this._commentsContainer.getElement().querySelector(`.film-details__comments-list`);
    let commentsLength = this._commentsContainer.getElement().querySelector(`.film-details__comments-count`);
    comments.forEach((comment) => {
      const commentUserComponent = new CommentUserView(comment);
      render(allComments, commentUserComponent, RenderPosition.BEFOREEND);
      const deleteCommentBtnClickHandler = () => {
        const deleteCommentBtn = commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
        deleteCommentBtn.disabled = true;
        // deleteCommentBtn.textContent = `Deleting`;
        remove(commentUserComponent);
        commentsLength.textContent -= 1;
      };
      commentUserComponent.getCommentBtnName();
      commentUserComponent.setCommentDeleteBtnHandler(deleteCommentBtnClickHandler);
    });
  }
}
