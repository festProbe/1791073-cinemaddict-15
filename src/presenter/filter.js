import { FiltersType, MenuItems, UpdateType } from '../utils/constants';
import { remove, renderElement, RenderPosition, replace } from '../utils/render';
import FilterView from '../view/main-containers/filters';
import { filter } from '../utils/filter';
import Statistic from '../view/main-containers/statistic';

export default class Filter {
  constructor(container, filterModel, filmsModel, moviesPresenter, setClickMenuHandler) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._moviesPresenter = moviesPresenter;
    this._setClickMenuHandler = setClickMenuHandler;

    this._filterComponent = null;
    this._statisticComponent = null;
    this._currentMenuItem = MenuItems.FILMS;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilter();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setMenuClick(this._handleSiteMenuClick);

    if (prevFilterComponent === null) {
      renderElement(this._container, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFilter() {
    const films = this._filmsModel.getFilms();
    return [
      {
        type: FiltersType.ALL,
        name: 'All movies',
        count: filter[FiltersType.ALL](films).length,
      },
      {
        type: FiltersType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FiltersType.WATCHLIST](films).length,
      },
      {
        type: FiltersType.HISTORY,
        name: 'History',
        count: filter[FiltersType.HISTORY](films).length,
      },
      {
        type: FiltersType.FAVORITES,
        name: 'Favorites',
        count: filter[FiltersType.FAVORITES](films).length,
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

    renderElement(this._container, this._statisticComponent, RenderPosition.BEFOREEND);
  }

  _destroyStatistic() {
    remove(this._statisticComponent);
    this._statisticComponent = null;
  }
}
