import ProfilePresenter from "./presenter/profile";
import FilterPresenter from "./presenter/filter";
import StatsPresenter from "./presenter/statistic";
import LocationPresenter from "./presenter/location";
import FooterPresenter from "./presenter/footer-stats";

import FilmsModel from "./model/films-model";
import FilterModel from "./model/filter-model";
import CommentsModel from "./model/comments-model";

import Api from "./api/api";
import Store from "./api/store";
import Provider from "./api/provider";

import {UpdateType, MenuStats} from "./consts";

const AUTHORIZATION = `Basic Fb4rl8KmwXun6Vn7p`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(window.localStorage);
const apiWithProvider = new Provider(api, store);

const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);

let statsPresenter = null;

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

apiWithProvider.getMovies()
  .then((films) => {
    apiWithProvider.getAllComments()
    .then(() => {
      filmsModel.setFilms(UpdateType.INIT, films);
    });
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

const changeMenuState = (action) => {

  switch (action) {
    case MenuStats.MOVIES:
      locationPresenter.destroy();
      locationPresenter.init();
      if (statsPresenter !== null) {
        statsPresenter.destroy();
      }
      break;
    case MenuStats.STATISTICS:
      locationPresenter.destroy();
      statsPresenter = new StatsPresenter(siteMainElement, filmsModel);
      statsPresenter.init();
      break;
  }
};

const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel, changeMenuState);
const locationPresenter = new LocationPresenter(siteMainElement, filmsModel, filterModel, commentsModel, apiWithProvider);
const footerStatPresenter = new FooterPresenter(siteFooterElement, filmsModel);

profilePresenter.init();
filterPresenter.init();
locationPresenter.init();
footerStatPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
