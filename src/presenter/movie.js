import CardView from "../view/card";
import PopupView from "../view/popup";
import {render, RenderPosition, remove, replace} from "../utils/render";
import {isEscapeEvent} from "../utils/helper";
// import CommentsModel from "../model/comments";
import CommentsPresenter from "./comments";
import {UserAction, UpdateType} from "../consts";


export default class Movie {
  constructor(movieContainer, changeData, filmsModel, commentsModel, api) {
    this._movieContainer = movieContainer;
    this._changeData = changeData;
    this._filmsModel = filmsModel;
    this._api = api;
    this._commentsModel = commentsModel;
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
    this._destroyCommentPresenter = this._destroyCommentPresenter.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    const prevPopupComponent = this._popupComponent;
    // this._commentsModel = new CommentsModel(this._movie);
    this._movieComponent = new CardView(movie);
    this._popupComponent = new PopupView(movie);

    this._setMovieControlsClickHandlers();
    this._setPopupControlsClickHandlers();
    this._movieComponent.setElementClickHandler(this._handleElementClick);


    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
      // console.log(this.getCommentsLength());
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._movieContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
      // console.log(this.getCommentsLength());
    }

    if (document.body.contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
      this._popupComponent.setPopupCloseBtnHandler(this._handleClosePopupBtnClick);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._movieComponent);
    remove(this._popupComponent);
  }

  _handleModelEvent() {

    this._renderPopup();
  }

  _destroyCommentPresenter() {
    if (this._commentsPresenter !== null) {
      this._commentsPresenter.destroy();
      this._commentsPresenter = null;
      // this._commentsContainer = null;
    }
  }

  _handleElementClick() {
    this._renderPopup();
  }

  _handleClosePopup() {
    this._destroyCommentPresenter();
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

    this._api.getComments(this._movie)
      .then((comments) => {
        this._commentsModel.setComments(UpdateType.INIT, comments);
        this._commentsPresenter = new CommentsPresenter(this._popupComponent, this._changeData, this._filmsModel, this._commentsModel, this._api);
        this._commentsPresenter.init(this._movie);
      })
      .catch(() => {
        this._commentsModel.setComments(UpdateType.INIT, []);
      });


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
        UpdateType.PATCH,
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
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isWatched: !this._movie.isWatched,
              watchingDate: new Date(),
            }
        )
    );
  }

  _handleFavoriteClick() {
    // console.log(`Step2 инициализируется колбэк в презентере movie`);
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isFavorites: !this._movie.isFavorites
            }
        )
    );
  }
}
