import CardView from "../view/card";
import PopupPresenter from "./popup";
import {render, RenderPosition, remove, replace} from "../utils/render";


export default class Movie {
  constructor(movieContainer, changeData) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._movieComponent = null;
    this._popupPresenter = null;
    this._handleElementClick = this._handleElementClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    const prevPopupPresenter = this._popupPresenter;
    this._movieComponent = new CardView(movie);
    this._popupPresenter = new PopupPresenter(this._changeData);
    this._movieComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._movieComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._movieComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._movieComponent.setElementClickHandler(this._handleElementClick);

    if (prevMovieComponent === null || prevPopupPresenter === null) {
      render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._movieContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupPresenter);
  }

  destroy() {
    remove(this._movieComponent);
    remove(this._popupPresenter);
  }

  _handleElementClick() {
    this._popupPresenter.init(this._movie);
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatchlist: !this._movie.isWatchlist
            }
        )

    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._movie,
            {
              isFavorite: !this._movie.isFavorite
            }
        )
    );
  }

}
