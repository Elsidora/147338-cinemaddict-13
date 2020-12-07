import CardView from "../view/card";
import {render, RenderPosition, remove} from "../utils/render";

export default class Movie {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;
    this._movieComponent = null;
    this._handleElementClick = this._handleElementClick.bind(this);
  }

  init(movie) {
    this._movie = movie;
    this._movieComponent = new CardView(movie);

    this._movieComponent.setElementClickHandler(this._handleElementClick);
    render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
  }

  _handleElementClick() {
    console.log(this._movie);
  }
}
