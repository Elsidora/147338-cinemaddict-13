import StatsView from "../view/stats";
import {render, remove, RenderPosition} from "../utils/render";

export default class Stats {
  constructor(statsContainer, filmsModel) {
    this._statsContainer = statsContainer;
    this._filmsModel = filmsModel;
    // this._filterModel = filterModel;

    this._statsComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderStats();
    this._statsComponent.restoreHandlers();
  }

  destroy() {
    if (this._statsComponent !== null) {
      remove(this._statsComponent);
      this._statsComponent = null;
    }
  }

  _renderStats() {
    const films = this._filmsModel.getFilms();
    console.log(films);
    this._statsComponent = new StatsView(this._filmsModel.getFilms());
    console.log(this._filmsModel.getFilms());
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this.init();
  }
}
