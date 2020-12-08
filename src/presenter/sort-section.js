import SortView from "../view/sort";

export default class SortSection {
  constructor(sortSectionContainer) {
    this._sortSectionContainer = sortSectionContainer;

    this._sortComponent = new SortView();
  }

  init() {

  }
}
