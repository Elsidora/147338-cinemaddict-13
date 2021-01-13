import FilterView from "../view/site-menu";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {filter} from "../utils/filter";
import {FilterType, UpdateType} from "../consts";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatsClick = this._handleStatsClick.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    // this._filterComponent.markActiveFilter();
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatsClickHandler(this._handleStatsClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  /*
  _handleStatsClick() {
    if (FilterType.STATS === this._currentFilter) {
      const films = this._filmsModel.getFilms();
      this._filmsModel.setFilms(UpdateType.SUPER, films);
      // this._filterModel.setFilter(UpdateType.SUPER, FilterType.STATS);
    }
  }
  */

  _handleStatsClick() {
    console.log(`ella`);
    const films = this._filmsModel.getFilms();
    this._filmsModel.setFilms(UpdateType.SUPER, films);
  }


  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        name: FilterType.ALL,
        // count: ``,
      },
      {
        name: FilterType.WATCHLIST,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        name: FilterType.HISTORY,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        name: FilterType.FAVORITES,
        count: filter[FilterType.FAVORITES](films).length
      },

    ];
  }
}
