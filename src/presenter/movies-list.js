import FilmContainer from '../view/main-containers/films-container';
import FilmList from '../view/main-containers/films-list';
import FilmListContainer from '../view/film-card-components/film-list-container';
import SortMenu from '../view/main-containers/sort-menu';
import FilmCard from './film';
import ShowMoreButton from '../view/film-card-components/show-more-btn';
import TopRatedFilmsList from '../view/main-containers/top-rated-films-container';
import MostCommentedFilmsList from '../view/main-containers/most-commented-films-container';
import { remove, renderElement, RenderPosition } from '../utils/render';
import { FILM_COUNT_PER_STEP, FiltersType, MOST_COMMENTED_FILM_COUNT, SortTypes, TOP_RATED_FILM_COUNT, UpdateType, UserActions } from '../utils/constants';
import { sortByDate, sortByRating } from '../utils/common';
import { filter } from '../utils/filter';
import EmptyFilmList from '../view/film-card-components/empty-film-list';

export default class MovieList {
  constructor(mainContainer, filmsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._defualtSort = filmsModel;

    this._filmContainerComponent = new FilmContainer();
    this._filmsListComponent = new FilmList();
    this._filmsListContainer = new FilmListContainer();
    this._topRatedComponent = new TopRatedFilmsList();
    this._topRatedListContainer = new FilmListContainer();
    this._mostCommentedComponent = new MostCommentedFilmsList();
    this._mostCommentedListContainer = new FilmListContainer();

    this._filmPresenter = new Map();
    this._topRatedFilmPresenter = new Map();
    this._mostCommentedFilmPresenter = new Map();

    this._currentSortType = SortTypes.DEFAULT;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filterType = FiltersType.ALL;

    this._sortComponent = null;
    this._noFilmsComponent = null;
    this._showMoreButton = null;

    this._handleShowMoreBtnClick = this._handleShowMoreBtnClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    //this._handlePopupModeChange = this._handlePopupModeChange.bind(this);


    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsContainer();
    this._sortComponent = new SortMenu(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._mainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _getFilms() {
    this._filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[this._filterType](films);

    switch (this._currentSortType) {
      case SortTypes.BY_DATE:
        return filteredFilms.sort(sortByDate);

      case SortTypes.BY_RATE:
        return filteredFilms.sort(sortByRating);

      default:
        return filteredFilms.slice();
    }
  }

  _renderFilmsContainer() {
    if (this._getFilms().length === 0) {
      this._renderNoFilms();
      return;
    }

    renderElement(this._mainContainer, this._filmContainerComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmsListComponent, this._filmsListContainer, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._filmContainerComponent, this._mostCommentedComponent, RenderPosition.BEFOREEND);

    this._renderFilmsList();
    this._renderTopRatedFilms();
    this._renderMostCommentredFilms();
  }

  _renderFilmsList() {
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    const films = this._getFilms().slice(0, Math.min(filmsCount, FILM_COUNT_PER_STEP));
    this._renderFilmCards(this._filmsListContainer, films, this._filmPresenter);

    if (filmsCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreBtn();
    }
  }

  _renderFilmCards(container, films, presenter) {
    films.forEach((film) => this._renderFilmCard(container, film, presenter));
  }

  _renderFilmCard(container, film, presenter) {
    const filmPresenter = new FilmCard(
      container,
      this._handleViewAction,
      this._filterModel.getFilter(),
      this._commentsModel,
    );
    filmPresenter.init(film);
    presenter.set(film.id, filmPresenter);
  }

  _handleShowMoreBtnClick() {
    const filmsCount = this._getFilms().length;
    const newRenderFilmsCount = Math.min(filmsCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderFilmsCount);

    this._renderFilmCards(this._filmsListContainer, films, this._filmPresenter);
    this._renderedFilmCount = newRenderFilmsCount;

    if (this._renderedFilmCount >= filmsCount) {
      this._showMoreButton.getElement().removeEventListener('click', this._handleShowMoreBtnClick);
      this._showMoreButton.removeElement();
    }
  }

  _renderShowMoreBtn() {
    this._showMoreButton = new ShowMoreButton();
    renderElement(this._filmsListComponent, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreBtnClick);
  }


  _renderTopRatedFilms() {
    this._topRatedFilms = this._getFilms()
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, TOP_RATED_FILM_COUNT);
    renderElement(this._topRatedComponent, this._topRatedListContainer, RenderPosition.BEFOREEND);
    this._renderFilmCards(this._topRatedListContainer, this._topRatedFilms, this._topRatedFilmPresenter);
  }

  _renderMostCommentredFilms() {
    this._mostCommentedFilms = this._getFilms()
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, MOST_COMMENTED_FILM_COUNT);
    renderElement(this._mostCommentedComponent, this._mostCommentedListContainer, RenderPosition.BEFOREEND);
    this._renderFilmCards(this._mostCommentedListContainer, this._mostCommentedFilms, this._mostCommentedFilmPresenter);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({ resetRenderedFilmCount: true });
    this._renderFilmsList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserActions.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    const presenters = [this._filmPresenter, this._topRatedFilmPresenter, this._mostCommentedFilmPresenter];
    switch (updateType) {
      case UpdateType.PATCH:
        presenters.forEach((presenter) => {
          if (presenter.has(data.id)) {
            presenter.get(data.id).init(data);
          }
        });
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmsList();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({ resetRenderedFilmCount: true, resetSortType: true });
        this._renderFilmsList();
        break;
    }
  }

  _renderNoFilms() {
    this._noFilmsComponent = new EmptyFilmList(this._filterType);
    renderElement(this._mainContainer, this._noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  _clearFilmList({ resetRenderedFilmCount = false, resetSortType = false } = {}) {
    const filmsCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButton);

    if (this._noFilmsComponent) {
      remove(this._noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmsCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = null;
    }
  }

  destroy() {
    this._clearFilmList({ resetRenderedFilmCount: true, resetSortType: true });
  }

  /*_handlePopupModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
    this._topRatedFilmPresenter.forEach((presenter) => presenter.resetView());
    this._mostCommentedFilmPresenter.forEach((presenter) => presenter.resetView());
  }*/
}
