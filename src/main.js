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

import {generateCard} from "./mock/card";
import {generateFilter} from "./mock/filter";


const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const CARDS_COUNT = 23;
const CARDS_COUNT_PER_STEP = 5;
const CARDS_EXTRA_COUNT = 2;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);
const filters = generateFilter(cards);
const historyCount = filters.find((element) => element.name === `history`).count;

render(siteHeaderElement, createProfileTemplate(historyCount), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsWrapElement = siteMainElement.querySelector(`.films`);

render(filmsWrapElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = filmsWrapElement.querySelector(`.films-list`);

render(filmsListElement, createFilmsListContainerTemplate(), `beforeend`);

const renderFilmsListContainer = () => {

  for (let i = 1; i < CARDS_COUNT_PER_STEP; i += 1) {
    render(filmsListElement.querySelector(`.films-list__container`), createCardTemplate(cards[i]), `beforeend`);
  }
};

renderFilmsListContainer();

if (cards.length > CARDS_COUNT_PER_STEP) {
  render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);
  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
  let renderedCardCount = CARDS_COUNT_PER_STEP;

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => render(filmsListElement.querySelector(`.films-list__container`), createCardTemplate(card), `beforeend`));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButton.remove();
    }
  });
}

render(filmsWrapElement, createFilmsListRatingTemplate(), `beforeend`);
render(filmsWrapElement, createFilmsListCommentTemplate(), `beforeend`);


const filmsListRatingElement = filmsWrapElement.querySelector(`#rating`);
render(filmsListRatingElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListCommentElement = filmsWrapElement.querySelector(`#comment`);
render(filmsListCommentElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListRatingContainerElement = filmsListRatingElement.querySelector(`.films-list__container`);
const filmsListCommentContainerElement = filmsListCommentElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_EXTRA_COUNT; i += 1) {
  render(filmsListRatingContainerElement, createCardTemplate(cards[i]), `beforeend`);
  render(filmsListCommentContainerElement, createCardTemplate(cards[i]), `beforeend`);
}


render(siteFooterElement.querySelector(`.footer__statistics`), createFooterStatisticsTemplate(), `beforeend`);
