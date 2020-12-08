import CardView from "../view/card";
import {render, RenderPosition, remove, replace} from "../utils/render";

export default class Movie {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;
    this._movieComponent = null;
    this._handleElementClick = this._handleElementClick.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevMovieComponent = this._movieComponent;
    this._movieComponent = new CardView(movie);

    this._movieComponent.setElementClickHandler(this._handleElementClick);

    if (prevMovieComponent === null) {
      render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._movieContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);
  }

  _handleElementClick() {
    console.log(this._movie);
  }
}
