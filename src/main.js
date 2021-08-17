import { renderElement, RenderPosition } from './utils/utils';
import { genetateFilmCard } from './mock/film-card';
import { generateFilter } from './mock/filters';
import ProfileRatingView from './view/header';
import FIltersView from './view/navigation-menu';
import SortMenuView from './view/sort-menu';
import FilmContainerView from './view/films-container';
import FilmListView from './view/films-list-container';
import FilmCardView from './view/film-card';
import FilmCardControlsView from './view/film-controls';
import ShowMoreButtonView from './view/show-more-btn';
import FilmPopupView from './view/popup';
import TopRatedListView from './view/top-rated-films-container';
import MostCommentedListView from './view/most-commented-films-container';
import FilmsStatView from './view/films-count-stat';

const FILM_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const films = new Array(FILM_COUNT).fill('').map(genetateFilmCard);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new ProfileRatingView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderElement(siteMainElement, new FIltersView(filters).getElement(), RenderPosition.BEFOREEND);
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

const renderFilmCard = (container, film) => {
  const filmCard = new FilmCardView(film);
  const filmCardControls = new FilmCardControlsView(film);


  renderElement(filmCard.getElement(), filmCardControls.getElement(), RenderPosition.BEFOREEND);

  const showPopup = (filmData) => {
    const filmPopup = new FilmPopupView(filmData);
    renderElement(footerElement, filmPopup.getElement(), RenderPosition.AFTEREEND);

    const closePopupHandler = () => {
      document.querySelector('body').classList.remove('hide-overflow');
      filmPopup.removeElement();
    };

    const onEscKeydown = (evt) => {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        evt.preventDefault();
        closePopupHandler();
      }
    };

    document.addEventListener('keydown', onEscKeydown);

    filmPopup.setClickHandler(closePopupHandler);
  };

  const openPopupClickHandler = () => {
    showPopup(film);
  };

  filmCard.setClickHandler(openPopupClickHandler);

  return renderElement(container, filmCard.getElement(), RenderPosition.BEFOREEND);
};

const filmListContainer = filmList.getElement().querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilmCard(filmListContainer, films[i], RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButton = new ShowMoreButtonView();
  renderElement(filmList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.setClickHandler(() => {
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => {
        renderFilmCard(filmListContainer, film);
      });
    renderedFilmCount += FILM_COUNT_PER_STEP;
    if (renderedFilmCount >= films.length) {
      showMoreButton.removeElement();
    }
  });
}

const topRatedFilms = films
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, TOP_RATED_FILM_COUNT);


for (let i = 0; i < topRatedFilms.length; i++) {
  renderFilmCard(topRatedList.getElement().querySelector('.films-list__container'), topRatedFilms[i]);
}

const mostCommentedFilms = films
  .slice()
  .sort((a, b) => b.commentsCount - a.commentsCount)
  .slice(0, MOST_COMMENTED_FILM_COUNT);

for (let i = 0; i < mostCommentedFilms.length; i++) {
  renderFilmCard(mostCommentedFilmList.getElement().querySelector('.films-list__container'), mostCommentedFilms[i]);
}

const siteFooterStatisticElement = document.querySelector('.footer__statistics');
renderElement(siteFooterStatisticElement, new FilmsStatView().getElement(), RenderPosition.BEFOREEND);

const filmListHiddenTitile = filmList.getElement().querySelector('.films-list__title');
if (films.length === 0) {
  filmListHiddenTitile.classList.remove('visually-hidden');
  filmContainer.getElement().removeChild(topRatedList.getElement());
  filmContainer.getElement().removeChild(mostCommentedFilmList.getElement());
}
