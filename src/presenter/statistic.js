import StatsView from "../view/stats";
import {render, remove, replace, RenderPosition} from "../utils/render";

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
    /*
    if (this._statsComponent === null) {
      this._renderStats();
      this._statsComponent.restoreHandlers();
    } else if (this._statsComponent !== null) {
      remove(this._statsComponent);
      this._statsComponent = null;
    }

    */
    const prevStatsComponent = this._statsComponent;
    const films = this._filmsModel.getFilms();
    this._statsComponent = new StatsView(films);
    if (prevStatsComponent === null) {
      this._renderStats();
      this._statsComponent.restoreHandlers();
      return;
    }

    replace(this._statsComponent, prevStatsComponent);
    this._statsComponent.restoreHandlers();
    remove(prevStatsComponent);
  }

  destroy() {
    remove(this._statsComponent);
    this._statsComponent = null;
  }

  _renderStats() {
    const films = this._filmsModel.getFilms();
    this._statsComponent = new StatsView(films);
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this.init();
  }
}
