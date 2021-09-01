import FilmContainer from '../view/main-containers/films-container';
import FilmList from '../view/main-containers/films-list';
import FilmListContainer from '../view/film-card-components/film-list-container';
import SortMenu from '../view/main-containers/sort-menu';
import FilmCard from './film';
import ShowMoreButton from '../view/film-card-components/show-more-btn';
import TopRatedFilmsList from '../view/main-containers/top-rated-films-container';
import MostCommentedFilmsList from '../view/main-containers/most-commented-films-container';
import { remove, renderElement, RenderPosition } from '../utils/render';
import { FILM_COUNT_PER_STEP, MOST_COMMENTED_FILM_COUNT, TOP_RATED_FILM_COUNT } from '../utils/constants';
import { updateItem } from '../utils/common';

export default class MovieList {
  constructor(mainContainer, films) {
    this._mainContainer = mainContainer;
    this._films = films.slice();

    this._sortComponent = new SortMenu();
    this._filmContainerComponent = new FilmContainer();
    this._filmsListComponent = new FilmList();
    this._filmsListContainer = new FilmListContainer();
    this._topRatedComponent = new TopRatedFilmsList();
    this._topRatedListContainer = new FilmListContainer();
    this._mostCommentedComponent = new MostCommentedFilmsList();
    this._mostCommentedListContainer = new FilmListContainer();
    this._showMoreButton = new ShowMoreButton();

    this._handleShowMoreBtnClick = this._handleShowMoreBtnClick.bind(this);
    this._handleFilmDataChange = this._handleFilmDataChange.bind(this);
    this._handlePopupModeChange = this._handlePopupModeChange.bind(this);

    this._topRatedFilms = this._films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, TOP_RATED_FILM_COUNT);

    this._mostCommentedFilms = this._films
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, MOST_COMMENTED_FILM_COUNT);

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = new Map();
    this._topRatedFilmPresenter = new Map();
    this._mostCommentedFilmPresenter = new Map();

    this._renderFilmsContainer();
  }

  _handleFilmDataChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    if (this._filmPresenter.has(updatedFilm.id)) {
      this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
    }
    if (this._topRatedFilmPresenter.has(updatedFilm.id)) {
      this._topRatedFilmPresenter.get(updatedFilm.id).init(updatedFilm);
    }
    if (this._mostCommentedFilmPresenter.has(updatedFilm.id)) {
      this._mostCommentedFilmPresenter.get(updatedFilm.id).init(updatedFilm);
    }
  }

  _handlePopupModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
    this._topRatedFilmPresenter.forEach((presenter) => presenter.resetView());
    this._mostCommentedFilmPresenter.forEach((presenter) => presenter.resetView());
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

  _renderFilmsList() {
    this._renderFilmCards(0, Math.min(this._films.length, FILM_COUNT_PER_STEP), this._filmsListContainer, this._films, this._filmPresenter);
    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }

  _renderFilmCard(container, film, presenter) {
    const filmPresenter = new FilmCard(container, this._handleFilmDataChange, this._handlePopupModeChange);
    filmPresenter.init(film);
    presenter.set(film.id, filmPresenter);
  }

  _renderFilmCards(from, to, container, films, presenter) {
    films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilmCard(container, film, presenter);
      });
  }

  _handleShowMoreBtnClick() {
    this._renderFilmCards(this._renderedFilmCount, Math.min(this._films.length, this._renderedFilmCount + FILM_COUNT_PER_STEP), this._filmsListContainer, this._films, this._filmPresenter);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this._renderedFilmCount >= this._films.length) {
      this._showMoreButton.removeElement();
    }
  }

  _renderShowMoreBtn() {
    renderElement(this._filmsListComponent, this._showMoreButton, RenderPosition.BEFOREEND);

    this._showMoreButton.setClickHandler(this._handleShowMoreBtnClick);
  }

  _renderTopRatedFilms() {
    this._renderFilmCards(0, this._topRatedFilms.length, this._topRatedListContainer, this._topRatedFilms, this._topRatedFilmPresenter);
    renderElement(this._topRatedComponent, this._topRatedListContainer, RenderPosition.BEFOREEND);
  }

  _renderMostCommentredFilms() {
    renderElement(this._mostCommentedComponent, this._mostCommentedListContainer, RenderPosition.BEFOREEND);
    this._renderFilmCards(0, this._mostCommentedFilms.length, this._mostCommentedListContainer, this._mostCommentedFilms, this._mostCommentedFilmPresenter);
  }

  _renderFilmsContainer() {
    //проверка на пустой контейнер

    renderElement(this._mainContainer, this._sortComponent, RenderPosition.BEFOREEND);
    renderElement(this._mainContainer, this._filmContainerComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsListComponent, this._filmsListContainer, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._mostCommentedComponent, RenderPosition.BEFOREEND);


    this._renderFilmsList();
    this._renderTopRatedFilms();
    this._renderMostCommentredFilms();
  }
}
