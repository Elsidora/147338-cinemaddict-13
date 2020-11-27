import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import SortView from "./view/sort";
import FilmsView from "./view/films";
import FilmsListView from "./view/films-list";
import FilmsContainerView from "./view/films-list-container";
import CardView from "./view/card";
import ButtonShowView from "./view/button-show-more";
import FilmsListRatingView from "./view/films-list-rating";
import FilmsListCommentView from "./view/films-list-comment";
import FooterStatisticsView from "./view/footer-statistics";
import {renderTemplate, render, RenderPosition} from "./utils";
import PopupView from "./view/popup";

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

const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
const filmsContainerComponent = new FilmsContainerView();
const filmsListRatingComponent = new FilmsListRatingView();
const filmsListCommentComponent = new FilmsListCommentView();
const filmsRatingContainerComponent = new FilmsContainerView();
const filmsCommentContainerComponent = new FilmsContainerView();

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  const PopupComponent = new PopupView(card);

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

// renderTemplate(siteBody, new PopupView(cards[0]).getElement(), `beforeend`);
render(siteHeaderElement, new ProfileView(historyCount).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

render(filmsListComponent.getElement(), filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

const renderFilmsListContainer = () => {

  for (let i = 0; i < CARDS_COUNT_PER_STEP; i += 1) {
    renderCard(filmsContainerComponent.getElement(), cards[i]);
  }
};

renderFilmsListContainer();

if (cards.length > CARDS_COUNT_PER_STEP) {

  const showMoreButtonComponent = new ButtonShowView();
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  let renderedCardCount = CARDS_COUNT_PER_STEP;

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => renderCard(filmsContainerComponent.getElement(), card));

    renderedCardCount += CARDS_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(filmsComponent.getElement(), filmsListRatingComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsComponent.getElement(), filmsListCommentComponent.getElement(), RenderPosition.BEFOREEND);

render(filmsListRatingComponent.getElement(), filmsRatingContainerComponent.getElement(), RenderPosition.BEFOREEND);

render(filmsListCommentComponent.getElement(), filmsCommentContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let j = 0; j < CARDS_EXTRA_COUNT; j += 1) {
  renderCard(filmsRatingContainerComponent.getElement(), cards[j]);
  renderCard(filmsCommentContainerComponent.getElement(), cards[j]);
}


render(siteFooterElement.querySelector(`.footer__statistics`), new FooterStatisticsView().getElement(), RenderPosition.BEFOREEND);
