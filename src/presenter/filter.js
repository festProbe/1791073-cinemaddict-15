import { FiltersType, MenuItems, UpdateType } from '../utils/constants';
import { remove, renderElement, RenderPosition, replace } from '../utils/render';
import ProfileRatingView from '../view/main-containers/profile-rating';
import FilterView from '../view/main-containers/filters';
import Statistic from '../view/main-containers/statistic';
import { Filters } from '../utils/filter';

export default class Filter {
  constructor(container, filterModel, filmsModel, moviesPresenter, setClickMenuHandler) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._moviesPresenter = moviesPresenter;
    this._setClickMenuHandler = setClickMenuHandler;

    this._profileRankComponent = null;
    this._filterComponent = null;
    this._statisticComponent = null;
    this._films = null;
    this._currentMenuItem = MenuItems.FILMS;

    this._prevFilterComponent = null;
    this._prevProfileRankComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._films = this._filmsModel.getFilms();
    const filters = this._getFilter();
    const watchedFilms = this._films.filter((film) => film.userDetails.isAlreadyWatched).length;

    this._prevFilterComponent = this._filterComponent;
    this._prevProfileRankComponent = this._profileRankComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._profileRankComponent = new ProfileRatingView(watchedFilms);
    this._filterComponent.setMenuClick(this._handleSiteMenuClick);

    if (this._prevFilterComponent === null && this._prevProfileRankComponent === null) {
      renderElement(this._container, this._filterComponent, RenderPosition.AFTEREND);
      renderElement(this._container, this._profileRankComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, this._prevFilterComponent);
    replace(this._profileRankComponent, this._prevProfileRankComponent);
    remove(this._prevFilterComponent);
    remove(this._prevProfileRankComponent);
  }

  _getFilter() {

    return [
      {
        type: FiltersType.ALL,
        name: 'All movies',
        count: Filters[FiltersType.ALL](this._films).length,
      },
      {
        type: FiltersType.WATCHLIST,
        name: 'Watchlist',
        count: Filters[FiltersType.WATCHLIST](this._films).length,
      },
      {
        type: FiltersType.HISTORY,
        name: 'History',
        count: Filters[FiltersType.HISTORY](this._films).length,
      },
      {
        type: FiltersType.FAVORITES,
        name: 'Favorites',
        count: Filters[FiltersType.FAVORITES](this._films).length,
      },
    ];
  }

  _handleSiteMenuClick(filterType, menuItem) {

    switch (menuItem) {
      case MenuItems.FILMS:
        this._filterModel.setFilter(UpdateType.MAJOR, filterType);
        if (this._currentMenuItem === MenuItems.FILMS) {
          return;
        }
        this._currentMenuItem = MenuItems.FILMS;
        this._destroyStatistic();
        this._moviesPresenter.init();
        break;
      case MenuItems.STATISTIC:
        if (this._currentMenuItem === MenuItems.STATISTIC) {
          return;
        }
        this._currentMenuItem = MenuItems.STATISTIC;
        this._moviesPresenter.destroy();
        this._showStatistic();
        this._filterComponent.getElement().querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active');
        break;
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _showStatistic() {
    this._statisticComponent = new Statistic(this._filmsModel.getFilms());
    this._filterModel.setFilter(null);

    renderElement(document.querySelector('main'), this._statisticComponent, RenderPosition.BEFOREEND);
  }

  _destroyStatistic() {
    remove(this._statisticComponent);
    this._statisticComponent = null;
  }
}
