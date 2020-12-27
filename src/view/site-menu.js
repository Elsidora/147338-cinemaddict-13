import AbstractView from "./abstract";
import {FilterType} from "../consts";
const createFilterTemplate = (filter, currentFilterType) => {
  const {name, count} = filter;
  const nameUpperLetter = name[0].toUpperCase() + name.slice(1);
  const filterName = name === FilterType.ALL ? nameUpperLetter + ` movies` : nameUpperLetter;
  const isCount = name !== FilterType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return `<a href="#${name}" class="main-navigation__item ${name === currentFilterType ? `main-navigation__item--active` : ``}" data-type="${name}">${filterName} ${isCount}</a>`;
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterTemplate(filter, currentFilterType))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    const {target} = evt;
    console.log(target);
    if (target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    console.log(target.dataset.type);
    this._callback.filterTypeChange(target.dataset.type);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    console.log(this.getElement().querySelector(`.main-navigation__items`));
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
