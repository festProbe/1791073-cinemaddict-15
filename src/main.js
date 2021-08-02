import { createFilmCardTemplate } from './view/film-card';
import { filmsListContainer } from './view/films-container';
import { createFilmListTemplate } from './view/films-list-container';
import { createFilmsCountTemplate } from './view/films-count-stat';
import { createProfileRatingTemplate } from './view/header';
import { createNavigationMenuTemplate } from './view/navigation-menu';
//import { createPopupTemplate } from './view/popup';
import { createShowMoreButtonTemplate } from './view/show-more-btn';
import { createSortMenuTemplate } from './view/sort-menu';
import { createMostCommentedFilmsListTemplate } from './view/most-commented-films-container';
import { createTopRatedFilmsListTemplate } from './view/top-rated-films-container';

const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;


const renderPage = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
renderPage(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');
renderPage(siteMainElement, createNavigationMenuTemplate(), 'beforeend');
renderPage(siteMainElement, createSortMenuTemplate(), 'beforeend');

renderPage(siteMainElement, filmsListContainer(), 'beforeend');

const filmsContainer = document.querySelector('.films');
renderPage(filmsContainer, createFilmListTemplate(), 'beforeend');
const filmCardContainer = document.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT; i++) {
  renderPage(filmCardContainer, createFilmCardTemplate(), 'beforeend');
}

renderPage(filmsContainer, createTopRatedFilmsListTemplate(), 'beforeend');
const topRatedFilmsElement = document.querySelector('.films-list--top-rated > .films-list__container');
for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  renderPage(topRatedFilmsElement, createFilmCardTemplate(), 'beforeend');
}

renderPage(filmsContainer, createMostCommentedFilmsListTemplate(), 'beforeend');
const mostCommentedFilmsElement = document.querySelector('.films-list--most-commented > .films-list__container');
for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  renderPage(mostCommentedFilmsElement, createFilmCardTemplate(), 'beforeend');
}

renderPage(siteMainElement, createShowMoreButtonTemplate(), 'beforeend');

const siteFooterStatisticElement = document.querySelector('.footer__statistics');
renderPage(siteFooterStatisticElement, createFilmsCountTemplate(), 'beforeend');

//renderPage(siteMainElement, createPopupTemplate(), 'beforeend');
