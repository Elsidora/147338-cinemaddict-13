import {createElement} from "../utils";
const createFilmsListCommentTemplate = () => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
</section>`;
};

export default class FilmsLisstComment {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListCommentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
