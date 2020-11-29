import {createElement} from "../utils";
const getUserStatus = (count) => {
  if (count <= 10) {
    return `Novice`;
  } else if (count <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

const createProfileTemplate = (historyCount) => {
  const userStatus = getUserStatus(historyCount);
  return `<section class="header__profile profile">
  ${historyCount !== 0 ? `<p class="profile__rating">${userStatus}</p>` : ``}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class Profile {
  constructor(countMovies) {
    this._countMovies = countMovies;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._countMovies);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
