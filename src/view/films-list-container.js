import AbstractView from "./abstract";
const createFilmsListContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class FilmsContainer extends AbstractView {

  getTemplate() {
    return createFilmsListContainerTemplate();
  }
}
