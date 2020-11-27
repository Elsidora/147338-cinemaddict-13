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
import {renderTemplate} from "./utils";
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
const historyCount = filters.find((filter) => filter.name === `history`).count;

// renderTemplate(siteBody, createPopupTemplate(cards[0]), `beforeend`);
renderTemplate(siteHeaderElement, createProfileTemplate(historyCount), `beforeend`);
renderTemplate(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);
renderTemplate(siteMainElement, createSortTemplate(), `beforeend`);
renderTemplate(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsWrapElement = siteMainElement.querySelector(`.films`);

renderTemplate(filmsWrapElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = filmsWrapElement.querySelector(`.films-list`);

renderTemplate(filmsListElement, createFilmsListContainerTemplate(), `beforeend`);

const renderFilmsListContainer = () => {

  for (let i = 0; i < CARDS_COUNT_PER_STEP; i += 1) {
    renderTemplate(filmsListElement.querySelector(`.films-list__container`), createCardTemplate(cards[i]), `beforeend`);
  }
};

renderFilmsListContainer();

if (cards.length > CARDS_COUNT_PER_STEP) {
  renderTemplate(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);
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

renderTemplate(filmsWrapElement, createFilmsListRatingTemplate(), `beforeend`);
renderTemplate(filmsWrapElement, createFilmsListCommentTemplate(), `beforeend`);


const filmsListRatingElement = filmsWrapElement.querySelector(`#rating`);
renderTemplate(filmsListRatingElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListCommentElement = filmsWrapElement.querySelector(`#comment`);
renderTemplate(filmsListCommentElement, createFilmsListContainerTemplate(), `beforeend`);

const filmsListRatingContainerElement = filmsListRatingElement.querySelector(`.films-list__container`);
const filmsListCommentContainerElement = filmsListCommentElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_EXTRA_COUNT; i += 1) {
  renderTemplate(filmsListRatingContainerElement, createCardTemplate(cards[i]), `beforeend`);
  renderTemplate(filmsListCommentContainerElement, createCardTemplate(cards[i]), `beforeend`);
}


renderTemplate(siteFooterElement.querySelector(`.footer__statistics`), createFooterStatisticsTemplate(), `beforeend`);
