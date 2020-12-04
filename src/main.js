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
import {render, RenderPosition, remove} from "./utils/render";
import {isEscapeEvent} from "./utils/helper";
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
  const popupElement = siteBody.querySelector(`.film-details`);
  siteBody.removeChild(popupElement);
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
  siteBody.appendChild(popupComponent.getElement());
  const allComments = popupComponent.getElement().querySelector(`.film-details__comments-list`);
  let commentsLength = popupComponent.getElement().querySelector(`.film-details__comments-count`).textContent;
  console.log(commentsLength);
  card.comments.forEach((comment) => {
    const commentUserComponent = new CommentUserView(comment);
    render(allComments, commentUserComponent, RenderPosition.BEFOREEND);
    const deleteCommentBtnClickHandler = () => {
      remove(commentUserComponent);
      commentsLength -= 1;
      popupComponent.getElement().querySelector(`.film-details__comments-count`).textContent = commentsLength;
    };
    commentUserComponent.setCommentDeleteBtnHandler(deleteCommentBtnClickHandler);
  });

  popupComponent.setPopupCloseBtnHandler(closePopupBtnClickHandler);
  popupComponent.setEscapePressHandler(onEscapePress);
};

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardView(card);
  const onElementClick = () => {
    renderPopup(card);
  };
  cardComponent.setElementClickHandler(onElementClick);
  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new ProfileView(historyCount), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
if (!cards.length) {
  remove(sortComponent);
  filmsListComponent.getElement().innerHTML = ``;
  render(filmsListComponent, listEmptyComponent, RenderPosition.BEFOREEND);

} else {
  render(filmsListComponent, filmsContainerComponent, RenderPosition.BEFOREEND);

  const renderFilmsListContainer = () => {

    for (let i = 0; i < CARDS_COUNT_PER_STEP; i += 1) {
      renderCard(filmsContainerComponent.getElement(), cards[i]);
    }
  };

  renderFilmsListContainer();

  if (cards.length > CARDS_COUNT_PER_STEP) {

    const showMoreButtonComponent = new ButtonShowView();
    render(filmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);
    let renderedCardCount = CARDS_COUNT_PER_STEP;

    const onShowMoreButtonClick = () => {
      cards
        .slice(renderedCardCount, renderedCardCount + CARDS_COUNT_PER_STEP)
        .forEach((card) => renderCard(filmsContainerComponent.getElement(), card));

      renderedCardCount += CARDS_COUNT_PER_STEP;

      if (renderedCardCount >= cards.length) {
        remove(showMoreButtonComponent);
      }
    };
    showMoreButtonComponent.setClickHandler(onShowMoreButtonClick);
  }

  render(filmsComponent, filmsListRatingComponent, RenderPosition.BEFOREEND);
  render(filmsComponent, filmsListCommentComponent, RenderPosition.BEFOREEND);

  render(filmsListRatingComponent, filmsRatingContainerComponent, RenderPosition.BEFOREEND);

  render(filmsListCommentComponent, filmsCommentContainerComponent, RenderPosition.BEFOREEND);

  for (let j = 0; j < CARDS_EXTRA_COUNT; j += 1) {
    renderCard(filmsRatingContainerComponent.getElement(), cards[j]);
    renderCard(filmsCommentContainerComponent.getElement(), cards[j]);
  }
}

render(siteFooterElement.querySelector(`.footer__statistics`), footerStatisticsComponent, RenderPosition.BEFOREEND);
