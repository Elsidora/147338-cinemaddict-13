import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/films";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsListContainerTemplate} from "./view/films-list-container";
import {createCardTemplate} from "./view/card";
import {createButtonShowMoreTemplate} from "./view/button-show-more";
import {createFilmsListRatingTemplate} from "./view/films-list-rating";
import {createFilmsListCommentTemplate} from "./view/films-list-comment";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {render} from "./utils";
import {createPopupTemplate} from "./view/popup";

import {generateCard} from './mock/card.js';


const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const CARD_COUNT = 20;
// const CARD_COUNT = 5;
const CARD_EXTRA_COUNT = 2;

const cards = new Array(CARD_COUNT).fill().map(generateCard);

render(siteBody, createPopupTemplate(cards[0]), `beforeend`);
render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsWrapElement = siteMainElement.querySelector(`.films`);

render(filmsWrapElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = filmsWrapElement.querySelector(`.films-list`);

render(filmsListElement, createFilmsListContainerTemplate(), `beforeend`);

const renderFilmsListContainer = () => {
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  for (let i = 1; i < CARD_COUNT; i += 1) {
    render(filmsListContainerElement, createCardTemplate(cards[i]), `beforeend`);
  }
};

renderFilmsListContainer();

render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);

render(filmsWrapElement, createFilmsListRatingTemplate(), `beforeend`);
render(filmsWrapElement, createFilmsListCommentTemplate(), `beforeend`);


const filmsListRatingElement = filmsWrapElement.querySelector(`#rating`);
render(filmsListRatingElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListCommentElement = filmsWrapElement.querySelector(`#comment`);
render(filmsListCommentElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListRatingContainerElement = filmsListRatingElement.querySelector(`.films-list__container`);
const filmsListCommentContainerElement = filmsListCommentElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_EXTRA_COUNT; i += 1) {
  render(filmsListRatingContainerElement, createCardTemplate(cards[i]), `beforeend`);
  render(filmsListCommentContainerElement, createCardTemplate(cards[i]), `beforeend`);
}


render(siteFooterElement.querySelector(`.footer__statistics`), createFooterStatisticsTemplate(), `beforeend`);
