import { AUTHORIZATION, END_POINT, UpdateType } from './utils/constants';
import { renderElement, RenderPosition } from './utils/render';
import FilmsModel from './model/films';
import ProfileRatingView from './view/main-containers/header';
import MoviesPresenter from './presenter/movies-list';
import FilmsStatView from './view/film-card-components/footer-stat';
import FilterModel from './model/filters';
import Filter from './presenter/filter';
import Api from './api';

const api = new Api(END_POINT, AUTHORIZATION);

const filtersModel = new FilterModel();
const filmsModel = new FilmsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const moviesPresenter = new MoviesPresenter(siteMainElement, filmsModel, filtersModel, api);
const filtersPresenter = new Filter(siteMainElement, filtersModel, filmsModel, moviesPresenter);

const siteFooterStatisticElement = footerElement.querySelector('.footer__statistics');

filtersPresenter.init();
moviesPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    const watchedFilms = filmsModel.getFilms().filter((film) => film.userDetails.isAlreadyWatched).length;
    renderElement(siteHeaderElement, new ProfileRatingView(watchedFilms), RenderPosition.BEFOREEND);
    renderElement(siteFooterStatisticElement, new FilmsStatView(filmsModel.getFilms().length), RenderPosition.BEFOREEND);
  })
  .catch((error) => {
    filmsModel.setFilms(UpdateType.INIT, []);
    throw new Error(error);
  });
