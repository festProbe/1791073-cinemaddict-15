import AbstractComponent from '../abstract-component';

const generateFilterItemTemlate = (filters, currentFilterType) => {
  const { type, name, count } = filters;

  return `<a href="#${name}"
  data-type="${type}"
  class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">${name}
  <span class="main-navigation__item-count">${count}</span></a>`;
};


const createNavigationMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => generateFilterItemTemlate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filters extends AbstractComponent {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._changeFilterHandler = this._changeFilterHandler.bind(this);
  }

  getTemplate() {
    return createNavigationMenuTemplate(this._filters, this._currentFilterType);
  }

  _changeFilterHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  setFilterTypeChengeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._changeFilterHandler);
  }
}
