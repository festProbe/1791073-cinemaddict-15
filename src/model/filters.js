import AbstractObserver from '../utils/abstract-observer';
import { FiltersType } from '../utils/constants';

export default class FilterModel extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FiltersType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
