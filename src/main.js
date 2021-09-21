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
const filmsModel = new FilmsModel(api);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

renderElement(siteHeaderElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

const moviesPresenter = new MoviesPresenter(siteMainElement, filmsModel, filtersModel);
const filtersPresenter = new Filter(siteMainElement, filtersModel, filmsModel, moviesPresenter);
filtersPresenter.init();
moviesPresenter.init();

const siteFooterStatisticElement = footerElement.querySelector('.footer__statistics');
renderElement(siteFooterStatisticElement, new FilmsStatView(), RenderPosition.BEFOREEND);


api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.INIT, films);
})
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
