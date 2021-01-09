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
    this._commentUserComponent = null;
    this._messageUserComponent = null;

    this._renderCommentsBlock = this._renderCommentsBlock.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);

    // this._filmsModel.addObserver(this._handleModelEvent);
    // this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;
    const prevCommentsSectionComponent = this._commentsSectionComponent;
    this._commentsSectionComponent = new CommentsSectionView(this._movie);
    if (prevCommentsSectionComponent === null) {
      this._renderCommentsBlock();
      return;
    }

    if (this._commentsContainer.contains(prevCommentsSectionComponent.getElement())) {
      // remove(prevCommentsSectionComponent);
      replace(this._commentsSectionComponent, prevCommentsSectionComponent);
      this._renderCommentsBlock();

    }
  }

  destroy() {
    this._commentsContainer = null;
    remove(this._commentsSectionComponent);
    if (this._commentUserComponent !== null) {
      remove(this._commentUserComponent);
    }
    remove(this._messageUserComponent);
  }

  _renderCommentsBlock() {
    render(this._commentsContainer, this._commentsSectionComponent, RenderPosition.BEFOREEND);
    const commentsList = this._commentsSectionComponent.getCommentsList();
    const comments = this._commentsModel.getComments();

    if (comments.length) {
      comments.forEach((comment) => {
        this._commentUserComponent = new CommentUserView(comment);
        render(commentsList, this._commentUserComponent, RenderPosition.BEFOREEND);

        this._commentUserComponent.setCommentDeleteBtnHandler(this._handleDeleteComment);
      });
    }

    this._messageUserComponent = new MessageUserView();
    render(this._commentsSectionComponent, this._messageUserComponent, RenderPosition.BEFOREEND);

    this._messageUserComponent.setFormSubmitHandler(this._handleAddComment);
    this._messageUserComponent.restoreHandlers();
  }

  _handleAddComment(comment) {
    console.log(`4 - presenter comments add`);
    this._api.addComment(this._movie, comment)
        .then((response) => {
          console.log(response);
          this._commentsModel.setComments(UpdateType.PATCH, response);
          this._changeData(
              UserAction.UPDATE_FILM,
              UpdateType.PATCH,
              this._movie
          );

        });
  }


  _handleDeleteComment() {
    const comments = this._commentsModel.getComments();
    const index = comments.findIndex((comment) => comment.delete);
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
