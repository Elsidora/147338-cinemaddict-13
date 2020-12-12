import AbstractView from "./abstract";
import {SortType} from "../consts";
const createSortTemplate = () => {
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-type="${SortType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-type="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-type="${SortType.RATING}">Sort by rating</a></li>
</ul>`;
};

export default class Sort extends AbstractView {

  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    const {target} = evt;
    if (target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    const activeButton = this.getElement().querySelector(`.sort__button--active`);
    activeButton.classList.remove(`sort__button--active`);
    target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(target.dataset.type);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

