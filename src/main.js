import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
// import SortView from "./view/sort";
// import FilmsView from "./view/films";
// import FilmsListView from "./view/films-list";
// import FilmsContainerView from "./view/films-list-container";
// import CardView from "./view/card";
// import ButtonShowView from "./view/button-show-more";
import FilmsListRatingView from "./view/films-list-rating";
import FilmsListCommentView from "./view/films-list-comment";
import FooterStatisticsView from "./view/footer-statistics";
// import ListEmptyView from "./view/list-empty";
import {render, RenderPosition, remove} from "./utils/render";
import {isEscapeEvent} from "./utils/helper";
import PopupView from "./view/popup";
import CommentUserView from "./view/comment-user";
import LocationPresenter from "./presenter/location";
import {generateCard} from "./mock/card";
import {generateFilter} from "./mock/filter";
const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const locationPresenter = new LocationPresenter(siteMainElement);

const CARDS_COUNT = 23;
const CARDS_EXTRA_COUNT = 2;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);
const cardsCopyRating = cards.slice();
const cardsCopyComments = cards.slice();
const filters = generateFilter(cards);
const historyCount = filters.find((filter) => filter.name === `history`).count;

// const sortComponent = new SortView();
// const filmsComponent = new FilmsView();
// const filmsListComponent = new FilmsListView();
// const filmsContainerComponent = new FilmsContainerView();
// const listEmptyComponent = new ListEmptyView();
// const filmsListRatingComponent = new FilmsListRatingView();
// const filmsListCommentComponent = new FilmsListCommentView();
// const filmsRatingContainerComponent = new FilmsContainerView();
// const filmsCommentContainerComponent = new FilmsContainerView();
const footerStatisticsComponent = new FooterStatisticsView(cards);

const closePopup = () => {
  const popupElement = siteBody.querySelector(`.film-details`);
  if (popupElement) {
    siteBody.removeChild(popupElement);
  }
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
  let commentsLength = popupComponent.getElement().querySelector(`.film-details__comments-count`);
  card.comments.forEach((comment) => {
    const commentUserComponent = new CommentUserView(comment);
    render(allComments, commentUserComponent, RenderPosition.BEFOREEND);
    const deleteCommentBtnClickHandler = () => {
      const deleteCommentBtn = commentUserComponent.getElement().querySelector(`.film-details__comment-delete`);
      deleteCommentBtn.disabled = true;
      commentUserComponent.getCommentBtnName();
      // deleteCommentBtn.textContent = `Deleting...`;
      console.log(deleteCommentBtn);
      remove(commentUserComponent);
      commentsLength.textContent -= 1;
    };
    commentUserComponent.getCommentBtnName();
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
// render(siteMainElement, sortComponent, RenderPosition.BEFOREEND);
locationPresenter.init(cards);

// render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

// render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
/*
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

  const isRating = cards.every((card) => card.rating === 0);
  const isComments = cards.every((card) => card.comments.length === 0);

  if (isRating) {
    remove(filmsListRatingComponent);
  } else {
    render(filmsComponent, filmsListRatingComponent, RenderPosition.BEFOREEND);
    render(filmsListRatingComponent, filmsRatingContainerComponent, RenderPosition.BEFOREEND);
  }

  if (isComments) {
    remove(filmsListCommentComponent);
  } else {
    render(filmsComponent, filmsListCommentComponent, RenderPosition.BEFOREEND);
    render(filmsListCommentComponent, filmsCommentContainerComponent, RenderPosition.BEFOREEND);
  }

  const cardsMaxRating = cardsCopyRating.sort((a, b) => {
    return b.rating - a.rating;
  });

  const cardsMaxComment = cardsCopyComments.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });

  for (let j = 0; j < CARDS_EXTRA_COUNT; j += 1) {
    renderCard(filmsRatingContainerComponent.getElement(), cardsMaxRating[j]);
    renderCard(filmsCommentContainerComponent.getElement(), cardsMaxComment[j]);
  }
}
*/
render(siteFooterElement.querySelector(`.footer__statistics`), footerStatisticsComponent, RenderPosition.BEFOREEND);
