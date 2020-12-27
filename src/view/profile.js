import AbstractView from "./abstract";
import {filter} from "../utils/filter";
import {FilterType} from "../consts";

const getUserStatus = (count) => {
  if (count <= 10) {
    return `Novice`;
  } else if (count <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

const createProfileTemplate = (movies) => {
  const historyCount = filter[FilterType.HISTORY](movies).length;
  const userStatus = getUserStatus(historyCount);
  return `<section class="header__profile profile">
  ${historyCount ? `<p class="profile__rating">${userStatus}</p>` : ``}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class Profile extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createProfileTemplate(this._movies);
  }
}
