import ProfileView from "./view/profile";
import SiteMenuView from "./view/site-menu";
import FooterStatisticsView from "./view/footer-statistics";
import {render, RenderPosition} from "./utils/render";

import LocationPresenter from "./presenter/location";
import FilmsModel from "./model/films";
import {generateCard} from "./mock/card";
import {generateFilter} from "./mock/filter";
const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const filmsModel = new FilmsModel();
const locationPresenter = new LocationPresenter(siteMainElement, filmsModel);

const CARDS_COUNT = 23;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);
const filters = generateFilter(cards);
filmsModel.setFilms(cards);
const historyCount = filters.find((filter) => filter.name === `history`).count;

const footerStatisticsComponent = new FooterStatisticsView(cards);

render(siteHeaderElement, new ProfileView(historyCount), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREEND);
locationPresenter.init(cards);
render(siteFooterElement.querySelector(`.footer__statistics`), footerStatisticsComponent, RenderPosition.BEFOREEND);
