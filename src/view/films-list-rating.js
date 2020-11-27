import {createElement} from "../utils";
const createFilmsListRatingTemplate = () => {
  return `<section class="films-list films-list--extra" id="rating">
  <h2 class="films-list__title">Top rated</h2>
</section>`;
};

export default class FilmsListRating {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListRatingTemplate();
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
