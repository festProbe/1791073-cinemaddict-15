import { FILM_COUNT, UpdateType } from './utils/constants';
import { renderElement, RenderPosition } from './utils/render';
import { genetateFilmCard } from './mock/film-card';
import FilmsModel from './model/films';
import ProfileRatingView from './view/main-containers/header';
import MoviesPresenter from './presenter/movies-list';
import FilmsStatView from './view/film-card-components/footer-stat';
import FilterModel from './model/filters';
import Filter from './presenter/filter';
import CommentsModel from './model/comments';

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);

const filtersModel = new FilterModel();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
filmsModel.setFilms(UpdateType.PATCH, films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');

const watchedFilmsCount = films.filter((film) => film.isInHistory).length;
renderElement(siteHeaderElement, new ProfileRatingView(watchedFilmsCount), RenderPosition.BEFOREEND);

const moviesPresenter = new MoviesPresenter(siteMainElement, filmsModel, filtersModel, commentsModel);
const filtersPresenter = new Filter(siteMainElement, filtersModel, filmsModel, moviesPresenter);
filtersPresenter.init();
moviesPresenter.init();

const siteFooterStatisticElement = footerElement.querySelector('.footer__statistics');
renderElement(siteFooterStatisticElement, new FilmsStatView(films.length), RenderPosition.BEFOREEND);

