import { renderTemplate } from './utils/utils';
import { genetateFilmCard } from './mock/film-card';
import { createFilmCardsTemplate } from './view/film-card';
import { filmsContainerTemplate } from './view/films-container';
import { createFilmListTemplate } from './view/films-list-container';
import { createFilmsCountTemplate } from './view/films-count-stat';
import { createProfileRatingTemplate } from './view/header';
import { createNavigationMenuTemplate } from './view/navigation-menu';
import { createPopupTemplate } from './view/popup';
import { createShowMoreButtonTemplate } from './view/show-more-btn';
import { createSortMenuTemplate } from './view/sort-menu';
import { createMostCommentedFilmsListTemplate } from './view/most-commented-films-container';
import { createTopRatedFilmsListTemplate } from './view/top-rated-films-container';
import { generateFilter } from './mock/filters';
import { createControlsTemplate } from './view/film-controls';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);
const filter = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createNavigationMenuTemplate(filter), 'beforeend');
renderTemplate(siteMainElement, createSortMenuTemplate(), 'beforeend');

renderTemplate(siteMainElement, filmsContainerTemplate(), 'beforeend');

const filmsContainer = document.querySelector('.films');
renderTemplate(filmsContainer, createFilmListTemplate(), 'beforeend');
renderTemplate(filmsContainer, createTopRatedFilmsListTemplate(), 'beforeend');
renderTemplate(filmsContainer, createMostCommentedFilmsListTemplate(), 'beforeend');

const filmList = document.querySelector('.films-list');
const filmCardContainer = filmList.querySelector('.films-list__container');
const filmListHiddenTitile = filmList.querySelector('.films-list__title');

const footerElement = document.querySelector('.footer');

let counter = 0;

const createFilmCard = (container, film) => {
  renderTemplate(container, createFilmCardsTemplate(film), 'beforeend');
  const filmPoster = document.querySelectorAll('.film-card__poster')[counter];
  renderTemplate(filmPoster, createControlsTemplate(film), 'afterend');

  const showPopup = (filmData) => {
    renderTemplate(footerElement, createPopupTemplate(filmData), 'afterend');
    const popup = document.querySelector('.film-details');

    const closePopupClickHandler = () => {
      popup.remove();
    };

    const onEscKeydown = (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        evt.preventDefault();
        closePopupClickHandler();
      }
    };

    document.addEventListener('keydown', onEscKeydown);

    popup.querySelector('.film-details__close-btn').addEventListener('click', closePopupClickHandler);
  };

  const openPopupClickHandler = () => {
    //document.querySelector('.film-details').remove();
    showPopup(film);
  };

  const filmTitile = document.querySelectorAll('.film-card__title')[counter];
  const filmComments = document.querySelectorAll('.film-card__comments')[counter];

  filmPoster.addEventListener('click', openPopupClickHandler);
  filmTitile.addEventListener('click', openPopupClickHandler);
  filmComments.addEventListener('click', openPopupClickHandler);
  counter++;
};

if (films.length === 0) {
  filmListHiddenTitile.classList.remove('visually-hidden');
}

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  createFilmCard(filmCardContainer, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmList, createShowMoreButtonTemplate(), 'beforeend');
  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        createFilmCard(filmCardContainer, film);
      });
    renderedFilmCount += FILM_COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const topRatedFilms = films
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, TOP_RATED_FILM_COUNT);

if (topRatedFilms.length === 0) {
  document.querySelector('.films-list--top-rated').remove();
}

const topRatedFilmsElement = document.querySelector('.films-list--top-rated > .films-list__container');
for (let i = 0; i < topRatedFilms.length; i++) {
  createFilmCard(topRatedFilmsElement, topRatedFilms[i]);
}

const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, MOST_COMMENTED_FILM_COUNT);

const mostCommentedFilmsElement = document.querySelector('.films-list--most-commented > .films-list__container');
for (let i = 0; i < mostCommentedFilms.length; i++) {
  createFilmCard(mostCommentedFilmsElement, mostCommentedFilms[i]);
}

const siteFooterStatisticElement = document.querySelector('.footer__statistics');
renderTemplate(siteFooterStatisticElement, createFilmsCountTemplate(), 'beforeend');


