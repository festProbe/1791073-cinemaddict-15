import { createFilmCardTemplate } from './view/film-card';
import { createFilmsCountTemplate } from './view/films-count-stat';
import { createProfileRatingTemplate } from './view/header';
import { createNavigationMenuTemplate } from './view/navigation-sort-menu';
//import { createPopupTemplate } from './view/popup';
import { createShowMoreButtonTemplate } from './view/show-more-btn';
import { createSortMenuTemplate } from './view/sort-menu';

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;


const renderPage = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
renderPage(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');
const navMenuElement = siteMainElement.querySelector('.main-navigation');
renderPage(navMenuElement, createNavigationMenuTemplate(), 'beforeend');
const sortMenuElement = siteMainElement.querySelector('.sort');
renderPage(sortMenuElement, createSortMenuTemplate(), 'beforeend');


const filmCardContainer = document.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT; i++) {
  renderPage(filmCardContainer, createFilmCardTemplate(), 'beforeend');
}

const extraFilmsElements = document.querySelectorAll('.films-list--extra > .films-list__container');
for (const element of extraFilmsElements) {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    renderPage(element, createFilmCardTemplate(), 'beforeend');
  }
}
renderPage(siteMainElement, createShowMoreButtonTemplate(), 'beforeend');
//renderPage(siteMainElement, createMainPage(), 'beforeend');

const siteFooterStatisticElement = document.querySelector('.footer__statistics');
renderPage(siteFooterStatisticElement, createFilmsCountTemplate(), 'beforeend');

//const filmPopupElement = document.querySelector('.film-details');
//renderPage(filmPopupElement, createPopupTemplate(), 'beforeend');
