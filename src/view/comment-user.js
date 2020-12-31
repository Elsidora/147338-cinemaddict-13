import AbstractView from "./abstract";
import {helpersDate} from "../utils/helper";
const createCommentUserTemplate = (comment) => {
  const {author, emotion, text, date} = comment;

  const commentDate = helpersDate.releaseCommentDate(date);
  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
  </span>
  <div>
    <p class="film-details__comment-text">${text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${commentDate}</span>
      <button class="film-details__comment-delete"></button>
    </p>
  </div>
</li>`;
};

export default class CommentUser extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
    this._commentDeleteBtnHandler = this._commentDeleteBtnHandler.bind(this);
    // this.getCommentBtnName = this.getCommentBtnName.bind(this);
  }

  getTemplate() {
    return createCommentUserTemplate(this._comment);
  }

  /*
  getCommentBtnName() {
    const commentButton = this.getElement().querySelector(`.film-details__comment-delete`);
    commentButton.textContent = commentButton.disabled ? `Deleting...` : `Delete`;
    return commentButton.textContent;
  }
  */

  _commentDeleteBtnHandler(evt) {
    evt.preventDefault();
    this._callback.commentDeleteBtn(this._comment);
  }

  setCommentDeleteBtnHandler(callback) {
    this._callback.commentDeleteBtn = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._commentDeleteBtnHandler);
  }
}
