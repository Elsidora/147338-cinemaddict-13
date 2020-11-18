import {createProfileTemplate} from "./view/profile";
import {createSiteMenuTemplate} from "./view/site-menu";
import {createSortTemplate} from "./view/sort";
import {createFilmsTemplate} from "./view/films";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsListContainerTemplate} from "./view/films-list-container";
import {createCardTemplate} from "./view/card";
import {createButtonShowMoreTemplate} from "./view/button-show-more";
import {createFilmsListExtraTemplate} from "./view/films-list-extra";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {render} from "./utils";


const siteBody = document.querySelector(`body`);
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

const CARD_COUNT = 5;
const CARD_EXTRA_COUNT = 2;


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

  for (let i = 0; i < CARD_COUNT; i += 1) {
    render(filmsListContainerElement, createCardTemplate(), `beforeend`);
  }
};

renderFilmsListContainer();

render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);

for (let j = 0; j < CARD_EXTRA_COUNT; j += 1) {
  render(filmsWrapElement, createFilmsListExtraTemplate(), `beforeend`);
}


const filmsListExtraElements = filmsWrapElement.querySelectorAll(`.films-list--extra`);

[...filmsListExtraElements].forEach((filmsListExtraElement, index) => {
  render(filmsListExtraElement, createFilmsListContainerTemplate(), `beforeend`);
  filmsListExtraElement.querySelector('h2').textContent = index === 0 ? "Top rated" : "Most Commented";
  for (let i = 0; i < CARD_EXTRA_COUNT; i += 1) {
    const filmsListContainerElement = filmsListExtraElement.querySelector(`.films-list__container`);

    render(filmsListContainerElement, createCardTemplate(), `beforeend`);
  }
});


render(siteFooterElement, createFooterStatisticsTemplate(), `beforeend`);
