import AbstractView from "./abstract.js";

const createCommentsSectionTemplate = ({comments}) => {
  return `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
    </ul>
    </section>
    </div>`;
};

export default class CommentsSection extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createCommentsSectionTemplate(this._movie);
  }

  getCommentsWrap() {
    return this.getElement().querySelector(`.film-details__comments-wrap`);
  }

  getCommentsList() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }
}
