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
import ListEmptyView from "./view/list-empty";
import {render, RenderPosition, isEscapeEvent} from "./utils";
import PopupView from "./view/popup";
import CommentUserView from "./view/comment-user";

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

const sortComponent = new SortView();
const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
const filmsContainerComponent = new FilmsContainerView();
const listEmptyComponent = new ListEmptyView();
const filmsListRatingComponent = new FilmsListRatingView();
const filmsListCommentComponent = new FilmsListCommentView();
const filmsRatingContainerComponent = new FilmsContainerView();
const filmsCommentContainerComponent = new FilmsContainerView();
const footerStatisticsComponent = new FooterStatisticsView(cards);

const closePopup = () => {
  siteBody.removeChild(siteBody.querySelector(`.film-details`));
  siteBody.classList.remove(`hide-overflow`);
  document.removeEventListener(`keydown`, onEscapePress);
};

const onEscapePress = (evt) => {
  isEscapeEvent(evt, closePopup);
};

const closePopupBtnClickHandler = () => {
  closePopup();
};

const renderPopup = (card) => {
  const popupComponent = new PopupView(card);
  siteBody.classList.add(`hide-overflow`);
  siteBody.appendChild(popupComponent.getElement());
  const allComments = popupComponent.getElement().querySelector(`.film-details__comments-list`);

  card.comments.forEach((comment) => {
    const commentUserComponent = new CommentUserView(comment);
    render(allComments, commentUserComponent.getElement(), RenderPosition.BEFOREEND);
  });

  popupComponent.setPopupCloseBtnHandler(closePopupBtnClickHandler);
  document.addEventListener(`keydown`, onEscapePress);
};

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  const filmCardPoster = cardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardTitle = cardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardComments = cardComponent.getElement().querySelector(`.film-card__comments`);

  const onElementClick = (evt) => {
    evt.preventDefault();
    renderPopup(card);
  };
  filmCardPoster.addEventListener(`click`, onElementClick);
  filmCardTitle.addEventListener(`click`, onElementClick);
  filmCardComments.addEventListener(`click`, onElementClick);
  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new ProfileView(historyCount).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
if (!cards.length) {
  sortComponent.getElement().remove();
  sortComponent.removeElement();
  filmsListComponent.getElement().innerHTML = ``;
  render(filmsListComponent.getElement(), listEmptyComponent.getElement(), RenderPosition.BEFOREEND);

} else {
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

    showMoreButtonComponent.setClickHandler(() => {
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
}

render(siteFooterElement.querySelector(`.footer__statistics`), footerStatisticsComponent.getElement(), RenderPosition.BEFOREEND);
