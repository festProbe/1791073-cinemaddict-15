import { SortTypes, SORT_ACTIVE_BUTTON_CLASS } from '../../utils/constants';
import AbstractComponent from '../abstract-component';

const createSortMenuTemplate = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === SortTypes.DEFAULT ? SORT_ACTIVE_BUTTON_CLASS : ''}" data-sort-type="${SortTypes.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortTypes.BY_DATE ? SORT_ACTIVE_BUTTON_CLASS : ''}" data-sort-type="${SortTypes.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortTypes.BY_RATE ? SORT_ACTIVE_BUTTON_CLASS : ''}" data-sort-type="${SortTypes.BY_RATE}">Sort by rating</a></li>
  </ul>`
);

export default class SortMenu extends AbstractComponent {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() { return createSortMenuTemplate(this._currentSortType); }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
