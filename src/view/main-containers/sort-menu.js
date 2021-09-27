import { SortTypes, SORT_ACTIVE_BUTTON_CLASS } from '../../utils/constants';
import AbstractComponent from '../abstract-default';

const createSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${SORT_ACTIVE_BUTTON_CLASS}" data-sort-type="${SortTypes.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortTypes.BY_RATE}">Sort by rating</a></li>
  </ul>`
);

export default class SortMenu extends AbstractComponent {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() { return createSortMenuTemplate(); }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }
    this.getElement().querySelectorAll('li>a').forEach((item) => item.classList.remove(SORT_ACTIVE_BUTTON_CLASS));
    evt.target.classList.add(SORT_ACTIVE_BUTTON_CLASS);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
