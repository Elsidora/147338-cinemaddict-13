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

    this._commentsSectionComponent = null;
    this._commentUserComponent = null;
    this._messageUserComponent = null;
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;
    const prevCommentsSection = this._commentsSectionComponent;
    this._commentsSectionComponent = new CommentsSectionView(this._movie);
    const messageContainer = this._commentsSectionComponent.getCommentsWrap();
    const allComments = this._commentsSectionComponent.getCommentsList();

    if (prevCommentsSection === null) {
      this._renderCommentsSection();
      this._renderCommentsList(allComments);

      this._renderMessageUser(messageContainer);
      console.log(this._commentsModel.getComments());
      // this.getCommentsArrayLength();
      return;
    }
    if (this._commentsContainer.getElement().contains(prevCommentsSection.getElement())) {
      replace(this._commentsSectionComponent, prevCommentsSection);
      // this._renderCommentsSection();
      this._renderCommentsList(allComments);

      this._renderMessageUser(messageContainer);
    }
    remove(prevCommentsSection);
  }

  _renderCommentsSection() {
    // console.log(this._commentsContainer);
    // console.log(this._commentsContainer.getElement().querySelector(`.film-details__inner`));
    render(this._commentsContainer.getElement().querySelector(`.film-details__inner`), this._commentsSectionComponent, RenderPosition.BEFOREEND);
  }
  _renderCommentsList(container) {
    const comments = this._commentsModel.getComments();


    comments.forEach((comment) => {

      this._commentUserComponent = new CommentUserView(comment);
      render(container, this._commentUserComponent, RenderPosition.BEFOREEND);

      // this._commentUserComponent.getCommentBtnName();
      this._commentUserComponent.setCommentDeleteBtnHandler(this._handleDeleteComment);
    });
  }

  _renderMessageUser(container) {

    this._messageUserComponent = new MessageUserView();
    render(container, this._messageUserComponent, RenderPosition.BEFOREEND);
    this._messageUserComponent.setFormSubmitHandler(this._handleAddComment);

    this._messageUserComponent.restoreHandlers();
  }

  _handleModelEvent() {
    this.init(this._movie);
  }

  _handleAddComment(comment) {
    this._api.addComment(this._movie, comment).then((response) => {
      this._commentsModel.addComment(UpdateType.PATCH, response);
      this._changeData(UserAction.UPDATE_FILM, UpdateType.PATCH, this._movie);
    });

    // this._commentsModel.addComment(UpdateType.PATCH, comment);
    this.getCommentsArrayLength();
  }

  _handleDeleteComment(comment) {
    this._commentsModel.deleteComment(UpdateType.PATCH, comment);
    // const deleteCommentBtn = this._commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
    // deleteCommentBtn.disabled = true;
    // deleteCommentBtn.textContent = `Deleting`;
    this.getCommentsArrayLength();
  }

  getCommentsArrayLength() {
    let commentsLength = this._commentsSectionComponent.getCommentsCount();
    commentsLength.textContent = this._commentsModel.getComments().length;
  }


}
