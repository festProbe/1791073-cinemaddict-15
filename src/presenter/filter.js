import { FiltersType, UpdateType } from '../utils/constants';
import { remove, renderElement, RenderPosition, replace } from '../utils/render';
import FilterView from '../view/main-containers/filters';
import { filter } from '../utils/filter';

export default class Filter {
  constructor(container, filterModel, filmsModel, moviesPresenter) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._moviesPresenter = moviesPresenter;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterChange = this._handleFilterChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilter();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChengeHandler(this._handleFilterChange);

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

  _handleFilterChange(filterType) {
    if (this._filtersType === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent() {
    this.init();
  }
}
