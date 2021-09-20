import { MenuItems } from '../../utils/constants';
import AbstractComponent from '../abstract-component';

const generateFilterItemTemlate = (filters, currentFilterType) => {
  const { type, name, count } = filters;

  return `<a href="#${name}"
  data-type="${type}"
  data-menu="${MenuItems.FILMS}"
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
    <a href="#stats" class="main-navigation__additional" data-menu="${MenuItems.STATISTIC}">Stats</a>
  </nav>`;
};

export default class Filters extends AbstractComponent {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationMenuTemplate(this._filters, this._currentFilterType);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.type, evt.target.dataset.menu);
  }


  setMenuClick(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll('a').forEach((item) => item.addEventListener('click', this._menuClickHandler));
  }
}
