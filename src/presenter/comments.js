import CommentsSectionView from "../view/comments-section";
import CommentUserView from "../view/comment-user";
import MessageUserView from "../view/message-user";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {UserAction, UpdateType} from "../consts";

export default class Comments {
  constructor(commentsContainer, changeData, filmsModel, commentsModel, api) {
    this._commentsContainer = commentsContainer;
    this._changeData = changeData;
    this._filmsModel = filmsModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._movie = null;
    this._commentsSectionComponent = null;
    // this._commentUserComponent = null;
    // this._messageUserComponent = null;

    this._renderCommentsSection = this._renderCommentsSection.bind(this);
    this._renderMessageUser = this._renderMessageUser.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);

    // this._filmsModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;
    const prevCommentsSectionComponent = this._commentsSectionComponent;
    this._commentsSectionComponent = new CommentsSectionView(this._movie);
    if (prevCommentsSectionComponent === null) {
      this._renderCommentsSection();
      this._renderCommentsList();

      this._renderMessageUser();
      return;
    }

    if (this._commentsContainer.getElement().contains(prevCommentsSectionComponent.getElement())) {
      replace(this._commentsSectionComponent, prevCommentsSectionComponent);
      this._renderCommentsList();
    }

    remove(prevCommentsSectionComponent);

  }

  _renderCommentsSection() {
    // console.log(this._commentsContainer);
    // console.log(this._commentsContainer.getElement().querySelector(`.film-details__inner`));
    render(this._commentsContainer.getElement().querySelector(`.film-details__inner`), this._commentsSectionComponent, RenderPosition.BEFOREEND);
  }
  _renderCommentsList() {
    const allComments = this._commentsSectionComponent.getCommentsList();
    const comments = this._commentsModel.getComments();

    comments.forEach((comment) => {

      this._commentUserComponent = new CommentUserView(comment);
      render(allComments, this._commentUserComponent, RenderPosition.BEFOREEND);

      this._commentUserComponent.setCommentDeleteBtnHandler(this._handleDeleteComment);
    });
  }

  _renderMessageUser() {
    const messageContainer = this._commentsSectionComponent.getCommentsWrap();
    this._messageUserComponent = new MessageUserView();
    render(messageContainer, this._messageUserComponent, RenderPosition.BEFOREEND);
    this._messageUserComponent.setFormSubmitHandler(this._handleAddComment);

    this._messageUserComponent.restoreHandlers();
  }

  _handleModelEvent() {
    // this.destroy();
    this.init(this._movie);
  }
  destroy() {
    // this._commentsContainer = null;
    // if (this._commentUserComponent !== null) {
      // remove(this._commentUserComponent);
    // }
    remove(this._commentsSectionComponent);
    // remove(this._messageUserComponent);
  }

  _handleAddComment(comment) {
    console.log(`4 - presenter comments add`);
    this._api.addComment(this._movie, comment)
        .then((response) => {
          console.log(response);
          this._commentsModel.addComment(UpdateType.PATCH, response);
          this._changeData(
              UserAction.UPDATE_FILM,
              UpdateType.PATCH,
              this._movie
          );
          console.log(this._changeData);

        });
  }

  /*
  _handleDeleteComment(comment) {
    this._api.deleteComment(this._movie).then(() => {
      this._commentsModel.deleteComment(UpdateType.PATCH, comment);
      this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._movie);
    // const deleteCommentBtn = this._commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
    // deleteCommentBtn.disabled = true;
    // deleteCommentBtn.textContent = `Deleting`;
    });
    this.getCommentsArrayLength();
  }
  */

  _handleDeleteComment() {
    const comments = this._commentsModel.getComments();
    // console.log(comments);
    const index = comments.findIndex((comment) => comment.delete);
    // console.log(index);
    this._api.deleteComment(comments[index].id)
        .then(() => {
          this._commentsModel.deleteComment(comments[index].id);
          this._changeData(
              UserAction.UPDATE_FILM,
              UpdateType.PATCH,
              this._movie
          );
        });
  }
}
