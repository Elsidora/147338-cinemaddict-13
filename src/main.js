import ProfilePresenter from "./presenter/profile";
import FilterPresenter from "./presenter/filter";
import LocationPresenter from "./presenter/location";

import FooterPresenter from "./presenter/footer";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import {generateCard} from "./mock/card";
// import {generateFilter} from "./mock/filter";
const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const siteFooterStatElement = siteFooterElement.querySelector(`.footer__statistics`);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
const locationPresenter = new LocationPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const footerStatPresenter = new FooterPresenter(siteFooterStatElement, filmsModel);

const CARDS_COUNT = 23;

const cards = new Array(CARDS_COUNT).fill().map(generateCard);
filmsModel.setFilms(cards);

profilePresenter.init();
filterPresenter.init();
locationPresenter.init();
footerStatPresenter.init();
