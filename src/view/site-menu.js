import AbstractView from "./abstract";
import {FilterType} from "../consts";
const createFilterTemplate = (filter, currentFilterType) => {
  const {name, count} = filter;
  const nameUpperLetter = name[0].toUpperCase() + name.slice(1);
  const filterName = name === FilterType.ALL ? nameUpperLetter + ` movies` : nameUpperLetter;
  const isCount = (name !== FilterType.ALL) ? `<span class="main-navigation__item-count">${count}</span>` : ``;
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
    <a href="#stats" class="main-navigation__additional" data-type="${FilterType.STATS}">Stats</a>
  </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  /*
  markActiveFilter() {
    // const element = this.getElement();
    const statsElement = this.getElement().querySelector(`.main-navigation__additional`);
    console.log(this.getElement().querySelector(`.main-navigation__additional`));
    console.log(this.getElement().querySelector(`.main-navigation__item--active`));
    this.getElement().querySelector(`.main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
    if (statsElement.dataset.type === this._currentFilter) {
      statsElement.classList.add(`main-navigation__item--active`);
      return;
    }
  }
  */

  _filterTypeChangeHandler(evt) {
    const {target} = evt;
    console.log(target);
    if (target.tagName !== `A` && target.has.slice(1) === `stats`) {
      console.log(target.has.slice(1));
      return;
    }

    evt.preventDefault();

    const statsElement = this.getElement().querySelector(`.main-navigation__additional`);
    // console.log(target);
    if (statsElement.classList.contains(`main-navigation__additional--active`)) {
      console.log(this);
      statsElement.classList.remove(`main-navigation__additional--active`);

    }


    console.log(target.dataset.type);
    this._callback.filterTypeChange(target.dataset.type);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    const activeElement = this.getElement().querySelector(`.main-navigation__item--active`);
    console.log(activeElement);
    if (activeElement) {
      activeElement.classList.remove(`main-navigation__item--active`);
    }
    evt.target.classList.add(`main-navigation__additional--active`);
    this._callback.statsClick();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector(`[href="#stats"]`).addEventListener(`click`, this._statsClickHandler);
  }
}
