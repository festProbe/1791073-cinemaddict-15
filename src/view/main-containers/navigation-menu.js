import AbstractComponent from '../abstract-component';

const generateFilterItemTemlate = (filters) => {
  const { name, count } = filters;

  return `<a href="#${name}" class="main-navigation__item">${name}
  <span class="main-navigation__item-count">${count}</span></a>
  `;
};


const createNavigationMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => generateFilterItemTemlate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filters extends AbstractComponent{
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationMenuTemplate(this._filters);
  }
}
