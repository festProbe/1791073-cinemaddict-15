import { renderTemplate, renderElement, RenderPosition } from './utils/utils';
import { genetateFilmCard } from './mock/film-card';
import { createFilmCardsTemplate } from './view/film-card';
import FilmContainerView from './view/films-container';
import FilmListView from './view/films-list-container';
import FilmsStatView from './view/films-count-stat';
import ProfileRatingView from './view/header';
import { createNavigationMenuTemplate } from './view/navigation-menu';
import { createPopupTemplate } from './view/popup';
import ShowMoreButtonView from './view/show-more-btn';
import SortMenuView from './view/sort-menu';
import TopRatedListView from './view/top-rated-films-container';
import MostCommentedListView from './view/most-commented-films-container';
import { generateFilter } from './mock/filters';
import { createControlsTemplate } from './view/film-controls';

const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);
const filter = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new ProfileRatingView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, createNavigationMenuTemplate(filter), 'beforeend');
renderElement(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);

const filmContainer = new FilmContainerView();
renderElement(siteMainElement, filmContainer.getElement(), RenderPosition.BEFOREEND);

const filmList = new FilmListView();
renderElement(filmContainer.getElement(), filmList.getElement(), RenderPosition.BEFOREEND);
const topRatedList = new TopRatedListView();
renderElement(filmContainer.getElement(), topRatedList.getElement(), RenderPosition.BEFOREEND);
const mostCommentedFilmList = new MostCommentedListView();
renderElement(filmContainer.getElement(), mostCommentedFilmList.getElement(), RenderPosition.BEFOREEND);

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

const filmListHiddenTitile = filmList.getElement().querySelector('.films-list__title');
if (films.length === 0) {
  filmListHiddenTitile.classList.remove('visually-hidden');
}

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  createFilmCard(filmList.getElement(), films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButton = new ShowMoreButtonView();
  renderElement(filmList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        createFilmCard(filmList.getElement(), film);
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
renderElement(siteFooterStatisticElement, new FilmsStatView().getElement(), RenderPosition.BEFOREEND);


