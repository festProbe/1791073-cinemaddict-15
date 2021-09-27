import { AUTHORIZATION, END_POINT, STORE_NAME, UpdateType } from './utils/constants';
import { renderElement, RenderPosition } from './utils/render';
import FilmsModel from './model/films';
import MoviesPresenter from './presenter/movies-list';
import FilmsStatView from './view/film-card-components/footer-stat';
import FilterModel from './model/filters';
import Filter from './presenter/filter';
import Api from './api/api';
import Store from './api/storage';
import Provider from './api/provider';
import { toast } from './utils/toast';


const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filtersModel = new FilterModel();
const filmsModel = new FilmsModel();

const headerElement = document.querySelector('header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const moviesPresenter = new MoviesPresenter(siteMainElement, filmsModel, filtersModel, apiWithProvider);
const filtersPresenter = new Filter(headerElement, filtersModel, filmsModel, moviesPresenter);

const siteFooterStatisticElement = footerElement.querySelector('.footer__statistics');

filtersPresenter.init();
moviesPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    renderElement(siteFooterStatisticElement, new FilmsStatView(filmsModel.getFilms().length), RenderPosition.BEFOREEND);
  })
  .catch((error) => {
    filmsModel.setFilms(UpdateType.INIT, []);
    throw new Error(error);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  toast('Не удалось подключиться к сети.');
});
