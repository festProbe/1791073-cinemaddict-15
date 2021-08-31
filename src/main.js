import { FILM_COUNT } from './utils/constants';
import { renderElement, RenderPosition } from './utils/render';
import { genetateFilmCard } from './mock/film-card';
import { generateFilter } from './mock/filters';
import ProfileRatingView from './view/main-containers/header';
import FIltersView from './view/main-containers/navigation-menu';
import MoviesPresenter from './presenter/movies-list';
import FilmsStatView from './view/film-card-components/films-count-stat';

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new ProfileRatingView(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderElement(siteMainElement, new FIltersView(filters), RenderPosition.BEFOREEND);

const footerElement = document.querySelector('.footer');

new MoviesPresenter(siteMainElement, films);

const siteFooterStatisticElement = footerElement.querySelector('.footer__statistics');
renderElement(siteFooterStatisticElement, new FilmsStatView(), RenderPosition.BEFOREEND);

