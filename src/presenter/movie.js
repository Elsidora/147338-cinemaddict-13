import CardView from "../view/card";
import PopupView from "../view/popup";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {isEscapeEvent} from "../utils/helper";
import CommentsPresenter from "./comments";
import {UserAction, UpdateType} from "../const";


export default class Movie {
  constructor(movieContainer, changeData) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._movieComponent = null;
    this._popupComponent = null;
    this._commentsPresenter = null;
    this._handleElementClick = this._handleElementClick.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleClosePopupBtnClick = this._handleClosePopupBtnClick.bind(this);
    this._handleEscapePress = this._handleEscapePress.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    const prevPopupComponent = this._popupComponent;
    this._movieComponent = new CardView(movie);
    this._popupComponent = new PopupView(movie);
    this._commentsPresenter = new CommentsPresenter(this._popupComponent);
    this._commentsPresenter.init(this._movie);

    this._setMovieControlsClickHandlers();
    this._setPopupControlsClickHandlers();
    this._movieComponent.setElementClickHandler(this._handleElementClick);

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._movieContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (document.body.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._movieComponent);
    remove(this._popupComponent);
  }

  _handleElementClick() {
    this._renderPopup();
  }

  _handleClosePopup() {
    if (this._popupComponent) {
      remove(this._popupComponent);
    }
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._handleEscapePress);
  }

  _handleEscapePress(evt) {
    isEscapeEvent(evt, this._handleClosePopup);
  }

  _handleClosePopupBtnClick() {
    this._handleClosePopup();
  }

  _renderPopup() {
    const popupElement = document.body.querySelector(`.film-details`);
    if (document.body.contains(popupElement)) {
      document.body.removeChild(popupElement);
    }
    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
    document.body.classList.add(`hide-overflow`);
    this._setPopupControlsClickHandlers();
    this._setMovieControlsClickHandlers();
    this._popupComponent.setPopupCloseBtnHandler(this._handleClosePopupBtnClick);
    document.addEventListener(`keydown`, this._handleEscapePress);
  }

  _setMovieControlsClickHandlers() {
    this._movieComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._movieComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._movieComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _setPopupControlsClickHandlers() {
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
