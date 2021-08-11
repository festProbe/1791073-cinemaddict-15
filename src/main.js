import { renderPage } from './utils/utils';
import { genetateFilmCard } from './mock/film-card';
import { createFilmCardsTemplate } from './view/film-card';
import { filmsListContainer } from './view/films-container';
import { createFilmListTemplate } from './view/films-list-container';
import { createFilmsCountTemplate } from './view/films-count-stat';
import { createProfileRatingTemplate } from './view/header';
import { createNavigationMenuTemplate } from './view/navigation-menu';
import { createPopupTemplate } from './view/popup';
import { createShowMoreButtonTemplate } from './view/show-more-btn';
import { createSortMenuTemplate } from './view/sort-menu';
import { createMostCommentedFilmsListTemplate } from './view/most-commented-films-container';
import { createTopRatedFilmsListTemplate } from './view/top-rated-films-container';
import { createMostCommentedFilmsTemplate } from './view/most-commented-film-cards';
import { createTopRatedFilmCardsTemplate } from './view/top-rated-film-cards';
import { generateFilter } from './mock/filters';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);
const filter = generateFilter(films);

const showPopups = () => {
  const popup = document.querySelectorAll('.film-details');
  const comments = document.querySelectorAll('.film-card__comments');
  for (let i = 0; i < comments.length; i++) {
    comments[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      popup[i].classList.remove('visually-hidden');
      const popupCloseButton = popup[i].querySelector('.film-details__close-btn');
      popupCloseButton.addEventListener('click', (evnt) => {
        evnt.preventDefault();
        closePopup(popup[i]);
      });
      document.addEventListener('keydown', (event) => {
        evt.preventDefault();
        if (event.key === 'Esc' || event.key === 'Escape') {
          closePopup(popup[i]);
        }
      });
    });
  }
};

const closePopup = (item) => {
  item.classList.add('visually-hidden');
};

const siteHeaderElement = document.querySelector('.header');
renderPage(siteHeaderElement, createProfileRatingTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.main');
renderPage(siteMainElement, createNavigationMenuTemplate(filter), 'beforeend');
renderPage(siteMainElement, createSortMenuTemplate(), 'beforeend');

renderPage(siteMainElement, filmsListContainer(), 'beforeend');

const filmsContainer = document.querySelector('.films');
renderPage(filmsContainer, createFilmListTemplate(), 'beforeend');

const filmList = document.querySelector('.films-list');
const filmCardContainer = filmList.querySelector('.films-list__container');
const filmListHiddenTitile = filmList.querySelector('.films-list__title');

if (films.length === 0) {
  filmListHiddenTitile.classList.remove('visually-hidden');
}
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderPage(filmCardContainer, createFilmCardsTemplate(films[i]), 'beforeend');
  renderPage(siteMainElement, createPopupTemplate(films[i]), 'beforeend');
}


if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  renderPage(filmList, createShowMoreButtonTemplate(), 'beforeend');
  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    for (let i = renderedFilmCount; i < renderedFilmCount + FILM_COUNT_PER_STEP; i++) {
      renderPage(filmCardContainer, createFilmCardsTemplate(films[i]), 'beforeend');
      renderPage(siteMainElement, createPopupTemplate(films[i]), 'beforeend');
      showPopups();
    }
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

renderPage(filmsContainer, createTopRatedFilmsListTemplate(), 'beforeend');
const topRatedFilmsElement = document.querySelector('.films-list--top-rated > .films-list__container');
for (let i = 0; i < topRatedFilms.length; i++) {
  renderPage(topRatedFilmsElement, createTopRatedFilmCardsTemplate(topRatedFilms[i]), 'beforeend');
  renderPage(siteMainElement, createPopupTemplate(topRatedFilms[i]), 'beforeend');
}

const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, MOST_COMMENTED_FILM_COUNT);

renderPage(filmsContainer, createMostCommentedFilmsListTemplate(), 'beforeend');
const mostCommentedFilmsElement = document.querySelector('.films-list--most-commented > .films-list__container');
for (let i = 0; i < mostCommentedFilms.length; i++) {
  renderPage(mostCommentedFilmsElement, createMostCommentedFilmsTemplate(mostCommentedFilms[i]), 'beforeend');
  renderPage(siteMainElement, createPopupTemplate(mostCommentedFilms[i]), 'beforeend');
  showPopups();
}

const siteFooterStatisticElement = document.querySelector('.footer__statistics');
renderPage(siteFooterStatisticElement, createFilmsCountTemplate(), 'beforeend');


