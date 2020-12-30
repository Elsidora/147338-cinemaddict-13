import ProfilePresenter from "./presenter/profile";
import FilterPresenter from "./presenter/filter";
import LocationPresenter from "./presenter/location";

import FooterPresenter from "./presenter/footer";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import Api from "./api";
import {UpdateType} from "./consts";

const AUTHORIZATION = `Basic Fb4rl8KmwXun6Vn7p`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);
const siteBody = document.body;
const siteHeaderElement = siteBody.querySelector(`.header`);
const siteMainElement = siteBody.querySelector(`.main`);
const siteFooterElement = siteBody.querySelector(`.footer`);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
// const commentsModel = new CommentsModel();
const profilePresenter = new ProfilePresenter(siteHeaderElement, filmsModel);
const locationPresenter = new LocationPresenter(siteMainElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const footerStatPresenter = new FooterPresenter(siteFooterElement, filmsModel);

profilePresenter.init();
filterPresenter.init();
locationPresenter.init();
footerStatPresenter.init();


api.getMovies()
  .then((cards) => {
    // console.log(cards);
    filmsModel.setFilms(UpdateType.INIT, cards);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
